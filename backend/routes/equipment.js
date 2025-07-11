import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ Normalize input date → keep YYYY-MM-DD only
const normalizeDate = (str) => str?.slice(0, 10) || null;

// ✅ Format DB date → force YYYY-MM-DD, local timezone to avoid offset
const formatDbDate = (d) => {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-CA");
};

// ✅ GET all equipment
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM equipment");
    const data = rows.map((item) => ({
      ...item,
      date_received: formatDbDate(item.date_received),
      last_updated: formatDbDate(item.last_updated),
      last_calibration_date: formatDbDate(item.last_calibration_date),
      next_calibration_date: formatDbDate(item.next_calibration_date),
      manual_available: !!item.manual_available,
    }));
    res.json(data);
  } catch (err) {
    console.error("GET /api/equipment error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ CREATE equipment
router.post("/", async (req, res) => {
  try {
    const {
      equipment_code,
      name,
      other_name,
      location,
      brand,
      model,
      serial_no,
      other_details,
      status,
      remarks,
      manual_available,
      date_received,
      po_no,
      purchase_price,
      fund_source,
      supplier,
      supplier_contact,
      last_updated,
      maintenance_schedule,
      last_calibration_date,
      next_calibration_date,
    } = req.body;

    await db.query(
      `INSERT INTO equipment 
      (equipment_code, name, other_name, location, brand, model, serial_no, other_details, status, remarks,
       manual_available, date_received, po_no, purchase_price, fund_source, supplier,
       supplier_contact, last_updated, maintenance_schedule, last_calibration_date, next_calibration_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        equipment_code,
        name,
        other_name,
        location,
        brand,
        model,
        serial_no,
        other_details,
        status,
        remarks,
        manual_available ? 1 : 0,
        normalizeDate(date_received),
        po_no,
        purchase_price,
        fund_source,
        supplier,
        supplier_contact,
        normalizeDate(last_updated),
        maintenance_schedule,
        normalizeDate(last_calibration_date),
        normalizeDate(next_calibration_date),
      ]
    );

    res.status(201).json({ message: "Equipment added successfully" });
  } catch (error) {
    console.error("POST /api/equipment error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE equipment
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updated = {
      ...req.body,
      manual_available: req.body.manual_available ? 1 : 0,
      date_received: normalizeDate(req.body.date_received),
      last_updated: normalizeDate(req.body.last_updated),
      last_calibration_date: normalizeDate(req.body.last_calibration_date),
      next_calibration_date: normalizeDate(req.body.next_calibration_date),
      other_name: req.body.other_name || null,
    };

    await db.query("UPDATE equipment SET ? WHERE equipment_id = ?", [
      updated,
      id,
    ]);
    res.json({ message: "Equipment updated successfully" });
  } catch (error) {
    console.error("PUT /api/equipment/:id error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE equipment
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.query("DELETE FROM equipment WHERE equipment_id = ?", [id]);
    res.json({ message: "Equipment deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/equipment/:id error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
