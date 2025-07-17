import express from "express";
import db from "../db.js";

const router = express.Router();

// Normalize input (strip time)
const normalizeDate = (str) => str?.slice(0, 10) || null;

// Format output to YYYY-MM-DD
const formatDbDate = (d) => {
  if (!d) return null;
  const [year, month, day] = new Date(d).toLocaleDateString("en-CA").split("-");
  return `${year}-${month}-${day}`;
};


// GET all consumables
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM supplies");
    const data = rows.map((item) => ({
      ...item,
      date_received: formatDbDate(item.date_received),
      date_opened: formatDbDate(item.date_opened),
      expiration_date: formatDbDate(item.expiration_date),
    }));
    res.json(data);
  } catch (err) {
    console.error("GET /api/consumable error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      description,
      remaining_qty,
      unit,
      date_received,
      date_opened,
      expiration_date,
      received_by,
      po_no,
      unit_price,
      quantity,
      total_price,
      supplier,
      location,
    } = req.body;

    const receivedDate = normalizeDate(date_received);
    const openedDate = normalizeDate(date_opened);
    const expirationDate = normalizeDate(expiration_date);

    await db.query(
      `INSERT INTO supplies 
      (name, category, brand, description, remaining_qty, unit, date_received, date_opened,
       expiration_date, received_by, po_no, unit_price, quantity, total_price, supplier, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        brand,
        description,
        remaining_qty,
        unit,
        receivedDate,
        openedDate,
        expirationDate,
        received_by,
        po_no,
        unit_price,
        quantity,
        total_price,
        supplier,
        location,
      ]
    );

    res.status(201).json({ message: "Consumable added successfully" });
  } catch (error) {
    console.error("POST /api/consumable error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updated = {
      ...req.body,
      date_received: normalizeDate(req.body.date_received),
      date_opened: normalizeDate(req.body.date_opened),
      expiration_date: normalizeDate(req.body.expiration_date),
    };

    await db.query("UPDATE supplies SET ? WHERE supply_id = ?", [updated, id]);
    res.json({ message: "Consumable updated successfully" });
  } catch (error) {
    console.error("PUT /api/consumable/:id error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.query("DELETE FROM supplies WHERE supply_id = ?", [id]);
    res.json({ message: "Consumable deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/consumable/:id error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
