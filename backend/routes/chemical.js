// chemicalRoutes.js
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

// Multer setup
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

// GET all chemicals
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM chemicals");
    const data = rows.map((item) => ({
      ...item,
      date_received: formatDbDate(item.date_received),
      date_opened: formatDbDate(item.date_opened),
      expiration_date: formatDbDate(item.expiration_date),
      msds_file: item.msds_file || null

    }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE chemical with file upload
router.post("/", upload.single("msds_file"), async (req, res) => {
  try {
    const {
      name,
      item_code,
      category,
      brand,
      quantity,
      container_type,
      container_size,
      form,
      date_received,
      date_opened,
      expiration_date,
      location,
      status,
      hazard_level,
      disposal_method,
      remarks,
    } = req.body;

    const msds_file = req.file ? req.file.filename : null;

    const [result] = await db.query(
      `INSERT INTO chemicals 
      (name, item_code, category, brand, quantity, container_type, container_size, form, date_received, date_opened, expiration_date, location, status, hazard_level, msds_file, disposal_method, remarks)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        item_code,
        category,
        brand,
        quantity,
        container_type,
        container_size,
        form,
        normalizeDate(date_received),
        normalizeDate(date_opened),
        normalizeDate(expiration_date),
        location,
        status,
        hazard_level,
        msds_file,
        disposal_method,
        remarks,
      ]
    );

    // Fetch full inserted row
    const [rows] = await db.query(
      "SELECT * FROM chemicals WHERE chemical_id = ?",
      [result.insertId]
    );

    res.status(201).json({
      message: "Chemical reagent added successfully",
      chemical: rows[0],
    });
  } catch (error) {
    console.error("POST /api/chemical error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// UPDATE chemical// UPDATE chemical with optional file
router.put("/:id", upload.single("msds_file"), async (req, res) => {
  try {
    const id = req.params.id;

    const {
      name,
      item_code,
      category,
      brand,
      quantity,
      container_type,
      container_size,
      form,
      date_received,
      date_opened,
      expiration_date,
      location,
      status,
      hazard_level,
      disposal_method,
      remarks,
    } = req.body;

    // get old file name
    const [[existing]] = await db.query("SELECT msds_file FROM chemicals WHERE chemical_id = ?", [id]);

    // if new file uploaded, replace it
    let newFilename = existing.msds_file;
    if (req.file) {
      newFilename = req.file.filename;

      // optional: delete old file
      if (existing.msds_file) {
        const oldPath = path.join("uploads", existing.msds_file);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const updated = {
      name,
      item_code,
      category,
      brand,
      quantity,
      container_type,
      container_size,
      form,
      date_received: normalizeDate(date_received),
      date_opened: normalizeDate(date_opened),
      expiration_date: normalizeDate(expiration_date),
      location,
      status,
      hazard_level,
      msds_file: newFilename,
      disposal_method,
      remarks,
    };

    await db.query("UPDATE chemicals SET ? WHERE chemical_id = ?", [updated, id]);
    res.json({ message: "Chemical reagent updated successfully" });
  } catch (error) {
    console.error("PUT /api/chemical/:id error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// DELETE chemical
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.query("DELETE FROM chemicals WHERE chemical_id = ?", [id]);
    res.json({ message: "Chemical reagent deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/chemical/:id error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
