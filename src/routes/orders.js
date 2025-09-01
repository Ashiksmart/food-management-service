import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';

const router = Router();

// Create order (customer)
router.post('/', auth, async (req,res)=>{
  const { items, address } = req.body;
  // calculate total
  const ids = items.map(i => i.menuItemId);
  const menuItems = await MenuItem.find({ _id: { $in: ids } }).lean();
  let total = 0;
  for(const it of items){
    const m = menuItems.find(mi => String(mi._id) === String(it.menuItemId));
    if(!m) return res.status(400).json({ message: 'Invalid menu item' });
    total += m.price * it.qty;
  }
  const order = await Order.create({ userId: req.user.id, items, address, total });
  res.json(order);
});

// List my orders (customer)
router.get('/mine', auth, async (req,res)=>{
  const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
  res.json(orders);
});

// Admin list all
router.get('/', auth, async (req,res)=>{
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  res.json(orders);
});

// Update status (admin)
router.patch('/:id/status', auth, async (req,res)=>{
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

export default router;
