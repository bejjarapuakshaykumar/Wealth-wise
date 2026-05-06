import express from "express";
import Investment from "../models/Investment.js";
const router = express.Router();

// Get all investments
router.get("/", async (req, res) => {
  const investments = await Investment.find();
  res.json(investments);
});

// Add new investment
router.post("/", async (req, res) => {
  try {
    const investment = new Investment(req.body);
    const saved = await investment.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
