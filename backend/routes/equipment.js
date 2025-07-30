// routes/equipment.js
import express from "express";
import db from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const normalizeDate = (str) => str?.slice(0, 10) || null;

const formatDbDate = (d) => {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-CA");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });


router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM equipment");
    const data = rows.map((item) => ({
      ...item,
      date_received: formatDbDate(item.date_received),
      last_updated: formatDbDate(item.last_updated),
      last_calibration_date: formatDbDate(item.last_calibration_date),
      next_calibration_date: formatDbDate(item.next_calibration_date),
      // manual_available: !!item.manual_available,
    }));
    res.json(data);
  } catch (err) {
    console.error("GET /api/equipment error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/equipment
// POST /api/equipment
router.post("/", upload.single("manual_file"), async (req, res) => {
  try {
    console.log("🧪 equipment_code:", req.body.equipment_code);
    console.log("🧪 name:", req.body.name);

    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const equipment_code =
      typeof req.body.equipment_code === "string"
        ? req.body.equipment_code.trim()
        : "";

    if (!name || !equipment_code) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const manual_file = req.file ? req.file.filename : null;

    const parsedPrice = parseFloat(req.body.purchase_price);
    const price = isNaN(parsedPrice) ? null : parsedPrice;

    const [insertResult] = await db.query(
      `INSERT INTO equipment (
        equipment_code, name, other_name, location, brand, model, serial_no,
        other_details, status, remarks,
        date_received, po_no, purchase_price, fund_source, supplier,
        supplier_contact, last_updated, maintenance_schedule,
        last_calibration_date, next_calibration_date, manual_file
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        equipment_code,
        name,
        req.body.other_name || null,
        req.body.location || null,
        req.body.brand || null,
        req.body.model || null,
        req.body.serial_no || null,
        req.body.other_details || null,
        req.body.status || null,
        req.body.remarks || null,
        normalizeDate(req.body.date_received),
        req.body.po_no || null,
        price,
        req.body.fund_source || null,
        req.body.supplier || null,
        req.body.supplier_contact || null,
        normalizeDate(req.body.last_updated),
        req.body.maintenance_schedule || null,
        normalizeDate(req.body.last_calibration_date),
        normalizeDate(req.body.next_calibration_date),
        manual_file,
      ]
    );

    // ✅ Fetch the newly inserted row
    const [rows] = await db.query("SELECT * FROM equipment WHERE equipment_id = ?", [insertResult.insertId]);

    const item = rows[0];

    // ✅ Format the dates like your GET endpoint
    const formatted = {
      ...item,
      date_received: formatDbDate(item.date_received),
      last_updated: formatDbDate(item.last_updated),
      last_calibration_date: formatDbDate(item.last_calibration_date),
      next_calibration_date: formatDbDate(item.next_calibration_date),
    };

    res.status(201).json(formatted); // ✅ return full object
  } catch (error) {
    console.error("🔥 POST /api/equipment error:", error.message);
    res.status(500).json({ error: error.message });
  }
});



router.put("/:id", upload.single("manual_file"), async (req, res) => {
  try {
    const id = req.params.id;

    const [[existing]] = await db.query("SELECT manual_file FROM equipment WHERE equipment_id = ?", [id]);

    let manual_file = existing.manual_file;
    if (req.file) {
      manual_file = req.file.filename;
      if (existing.manual_file) {
        const oldPath = path.join("uploads", existing.manual_file);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const updated = {
      ...req.body,
      manual_file,
      // manual_available: req.body.manual_available ? 1 : 0,
      date_received: normalizeDate(req.body.date_received),
      last_updated: normalizeDate(req.body.last_updated),
      last_calibration_date: normalizeDate(req.body.last_calibration_date),
      next_calibration_date: normalizeDate(req.body.next_calibration_date),
      other_name: req.body.other_name || null,
    };

    await db.query("UPDATE equipment SET ? WHERE equipment_id = ?", [updated, id]);
    res.json({ message: "Equipment updated successfully" });
  } catch (error) {
    console.error("PUT /api/equipment/:id error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [[existing]] = await db.query("SELECT manual_file FROM equipment WHERE equipment_id = ?", [id]);

    if (existing.manual_file) {
      const oldPath = path.join("uploads", existing.manual_file);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await db.query("DELETE FROM equipment WHERE equipment_id = ?", [id]);
    res.json({ message: "Equipment deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/equipment/:id error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;