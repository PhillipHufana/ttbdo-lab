// routes/{resource}.js
import express from "express";
const router = express.Router();

// Temporary route for placeholder response
router.get("/", (req, res) => {
  res.json({ message: "This route is under construction." });
});

export default router;
