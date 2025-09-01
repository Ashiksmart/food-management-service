import { Router } from 'express';
import Daily from '../models/Daily.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

// Upsert daily entry (admin)
router.post('/', auth, requireRole('admin'), async (req,res)=>{
  const { date, rawMaterial=0, wastage=0, otherExpenses=0, platesSold=0, sellingPricePerPlate=0 } = req.body;
  const totalSales = platesSold * sellingPricePerPlate;
  const netProfit = totalSales - rawMaterial - wastage - otherExpenses;
  const doc = await Daily.findOneAndUpdate(
    { date },
    { $set: { rawMaterial, wastage, otherExpenses, platesSold, sellingPricePerPlate, totalSales, netProfit } },
    { new: true, upsert: true }
  );
  res.json(doc);
});

// Get daily list with pagination
router.get('/', auth, requireRole('admin'), async (req,res)=>{
  const page = parseInt(req.query.page || '1');
  const limit = parseInt(req.query.limit || '20');
  const skip = (page-1)*limit;
  const [items, count] = await Promise.all([
    Daily.find().sort({ date: -1 }).skip(skip).limit(limit).lean(),
    Daily.countDocuments()
  ]);
  res.json({ items, page, pages: Math.ceil(count/limit), count });
});

// Summary between dates
router.get('/summary', auth, requireRole('admin'), async (req,res)=>{
  const { from, to } = req.query; // YYYY-MM-DD
  const match = {};
  if(from) match.date = { $gte: from };
  if(to) match.date = { $gte: (match.date?.$gte) || from, $lte: to };
  // Fix malformed dict in Python, we will construct in JS string; replaced below in file.
  const docs = await Daily.find(match).lean();
const summary = docs.reduce((acc, d)=>{
  acc.rawMaterial += d.rawMaterial||0;
  acc.wastage += d.wastage||0;
  acc.otherExpenses += d.otherExpenses||0;
  acc.totalSales += d.totalSales||0;
  acc.netProfit += d.netProfit||0;
  acc.platesSold += d.platesSold||0;
  return acc;
}, { rawMaterial:0, wastage:0, otherExpenses:0, totalSales:0, netProfit:0, platesSold:0 });
res.json({ range: { from, to }, summary, days: docs.length });
;
});

export default router;
