import express from "express";
import Investment from "../models/Investment.js";

const router = express.Router();

// ✅ Get all investments for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.params.userId });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Add a new investment
router.post("/", async (req, res) => {
  try {
    const newInvestment = new Investment(req.body);
    const savedInvestment = await newInvestment.save();
    res.status(201).json(savedInvestment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Update an existing investment
router.put("/:id", async (req, res) => {
  try {
    const updatedInvestment = await Investment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedInvestment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Delete an investment
router.delete("/:id", async (req, res) => {
  try {
    await Investment.findByIdAndDelete(req.params.id);
    res.json({ message: "Investment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
