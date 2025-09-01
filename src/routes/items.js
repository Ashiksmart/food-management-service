import { Router } from 'express';
import Item from '../models/Item.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

// Create
router.post("/", auth, requireRole('admin'), async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read (with filter)
router.get("/", auth, requireRole('admin'), async (req, res) => {
  try {
    const { category, name } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (name) filter.name = new RegExp(name, "i");
    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put("/:id", auth, requireRole('admin'), async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", auth, requireRole('admin'), async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
