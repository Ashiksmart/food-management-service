import { Router } from 'express';
import Transaction from '../models/Transaction.js';

const router = Router();

// Create Transaction
router.post("/", async (req, res) => {
  try {
    const inventory = new Transaction(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Transactions
router.get("/", async (req, res) => {
  try {
    const inventories = await Transaction.find();
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get One Transaction
router.get("/:id", async (req, res) => {
  try {
    const inventory = await Transaction.findById(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Transaction
router.put("/:id", async (req, res) => {
  try {
    const inventory = await Transaction.findByIdAndUpdate(
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

// Delete Transaction
router.delete("/:id", async (req, res) => {
  try {
    const inventory = await Transaction.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/count", async (req, res) => {
  try {
    const { mode, status, paymentStatus } = req.query;

    // Build filter object dynamically
    const filter = {};
    if (mode) filter.mode = mode; // online/offline
    if (status) filter.status = status; // checkedout, pending, etc.
    if (paymentStatus) filter.paymentStatus = paymentStatus; // pending, paid

    const count = await Transaction.countDocuments(filter);

    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Count Service (Summary stats)
// Count Summary
router.get("/count/summary", async (req, res) => {
  try {
    // Total transactions
    const totalTransactions = await Transaction.countDocuments();

    // Total revenue (sum of all totalAmount)
    const totalRevenueAgg = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // Orders by mode (online/offline)
    const orderTypeCount = await Transaction.aggregate([
      { $group: { _id: "$mode", count: { $sum: 1 } } }
    ]);

    // Category counts (veg/non-veg) → need to unwind items
    const categoryCount = await Transaction.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.category", count: { $sum: 1 } } }
    ]);

    // Top selling items (optional, useful for dashboard)
    const topItems = await Transaction.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalSold: { $sum: "$items.quantity" },
          revenue: { $sum: "$items.price" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalTransactions,
      totalRevenue,
      orderTypeCount,
      categoryCount,
      topItems
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
