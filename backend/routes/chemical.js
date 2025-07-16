// chemicalRoutes.js
import express from "express";
import db from "../db.js";

const router = express.Router();

const normalizeDate = (str) => str?.slice(0, 10) || null;

const formatDbDate = (d) => {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-CA"); // always YYYY-MM-DD, local timezone
};


// GET all chemicals
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM chemicals");
    const data = rows.map((item) => ({
      ...item,
      date_received: formatDbDate(item.date_received),
      date_opened: formatDbDate(item.date_opened),
      expiration_date: formatDbDate(item.expiration_date),
      msds_file: !!item.msds_file,
    }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE chemical
router.post("/", async (req, res) => {
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
      msds_file,
      disposal_method,
      remarks,
    } = req.body;

    await db.query(
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
        msds_file ? 1 : 0,
        disposal_method,
        remarks,
      ]
    );

    res.status(201).json({ message: "Chemical reagent added successfully" });
  } catch (error) {
    console.error("POST /api/chemical error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE chemical
router.put("/:id", async (req, res) => {
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
      msds_file,
      disposal_method,
      remarks,
    } = req.body;

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
      msds_file: msds_file ? 1 : 0,
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
