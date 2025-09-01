import { Router } from 'express';
import Delivery from '../models/Delivery.js';

const router = Router();

// Create Delivery
router.post("/", async (req, res) => {
  try {
    const inventory = new Delivery(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Delivery
router.get("/", async (req, res) => {
  try {
    const inventories = await Delivery.find();
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get One Delivery
router.get("/:id", async (req, res) => {
  try {
    const inventory = await Delivery.findById(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Delivery
router.put("/:id", async (req, res) => {
  try {
    const inventory = await Delivery.findByIdAndUpdate(
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

// Delete Delivery
router.delete("/:id", async (req, res) => {
  try {
    const inventory = await Delivery.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
