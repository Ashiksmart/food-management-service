import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

// Create Product
router.post("/", async (req, res) => {
  try {
    const inventory = new Product(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const inventories = await Product.find();
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get One Product
router.get("/:id", async (req, res) => {
  try {
    const inventory = await Product.findById(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Product
router.put("/:id", async (req, res) => {
  try {
    const inventory = await Product.findByIdAndUpdate(
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

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const inventory = await Product.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
