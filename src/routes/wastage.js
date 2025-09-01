import { Router } from 'express';
import Wastage from '../models/Wastage.js';

const router = Router();

// Create Wastage
router.post("/", async (req, res) => {
  try {
    const inventory = new Wastage(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Wastages
router.get("/", async (req, res) => {
  try {
    const inventories = await Wastage.find();
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get One Wastage
router.get("/:id", async (req, res) => {
  try {
    const inventory = await Wastage.findById(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Wastage
router.put("/:id", async (req, res) => {
  try {
    const inventory = await Wastage.findByIdAndUpdate(
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

// Delete Wastage
router.delete("/:id", async (req, res) => {
  try {
    const inventory = await Wastage.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
