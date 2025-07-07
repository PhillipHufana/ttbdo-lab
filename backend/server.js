import express from "express";
import cors from "cors";

import inventoryRoutes from "./routes/inventory.js";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route mounts
app.use("/api/inventory", inventoryRoutes);

// Health check
app.get("/api/ping", (req, res) => res.send("pong"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
