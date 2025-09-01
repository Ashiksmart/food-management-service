import { Router } from 'express';
import Stock from '../models/Stock.js';

const router = Router();

// Create Stock
router.post("/", async (req, res) => {
  try {
    const inventory = new Stock(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Stocks
router.get("/", async (req, res) => {
  try {
    const inventories = await Stock.find();
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get One Stock
router.get("/:id", async (req, res) => {
  try {
    const inventory = await Stock.findById(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Stock
router.put("/:id", async (req, res) => {
  try {
    const inventory = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Stock
router.delete("/:id", async (req, res) => {
  try {
    const inventory = await Stock.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
