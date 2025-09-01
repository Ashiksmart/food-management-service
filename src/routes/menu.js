import { Router } from 'express';
import MenuItem from '../models/MenuItem.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

// Public list
router.get('/', async (req,res)=>{
  const items = await MenuItem.find({ active: true }).lean();
  res.json(items);
});

// Admin CRUD
router.post('/', auth, requireRole('admin'), async (req,res)=>{
  const doc = await MenuItem.create(req.body);
  res.json(doc);
});

router.put('/:id', auth, requireRole('admin'), async (req,res)=>{
  const doc = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
});

router.delete('/:id', auth, requireRole('admin'), async (req,res)=>{
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
