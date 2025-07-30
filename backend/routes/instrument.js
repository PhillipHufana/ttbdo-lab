// routes/instrument.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// GET all instruments
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM instruments");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new instrument
router.post("/", async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      location,
      quantity,
      unit,
      capacity,
      status,
      condition,
      remarks,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO instruments 
        (name, brand, description, location, quantity, unit, capacity, status, \`condition\`, remarks)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        brand,
        description,
        location,
        quantity,
        unit,
        capacity,
        status,
        condition,
        remarks,
      ]
    );

    res.status(201).json({ instrument_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update instrument by id
router.put("/:id", async (req, res) => {
  try {
    const instrumentId = req.params.id;
    const updatedFields = req.body;

    const [result] = await db.query(
      `UPDATE instruments SET ? WHERE instrument_id = ?`,
      [updatedFields, instrumentId]
    );

    res.status(200).json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE instrument by id
router.delete("/:id", async (req, res) => {
  try {
    const instrumentId = req.params.id;
    await db.query("DELETE FROM instruments WHERE instrument_id = ?", [
      instrumentId,
    ]);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
