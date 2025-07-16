import express from "express";
import cors from "cors";

import chemicalRoutes from "./routes/chemical.js";
import consumableRoutes from "./routes/consumable.js";
import equipmentRoutes from "./routes/equipment.js";
import instrumentRoutes from "./routes/instrument.js";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Route mounts
app.use("/api/chemical", chemicalRoutes);
app.use("/api/consumable", consumableRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/instrument", instrumentRoutes);

// Health check
app.get("/api/ping", (req, res) => res.send("pong"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
