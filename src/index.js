import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';
import dailyRoutes from './routes/daily.js';
import itemsRoutes from './routes/items.js';


import inventoryRoutes from "./routes/inventory.js";
import stockRoutes from "./routes/stock.js";
import productRoutes from "./routes/product.js";
import wastageRoutes from "./routes/wastage.js";
import transactionRoutes from "./routes/transaction.js";
import deliveryRoutes from "./routes/delivery.js";



const app = express();

// Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: config.origin, credentials: true }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15*60*1000, max: 300 }));

// Health check
app.get('/api/health', (req,res)=>res.json({ ok: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/daily', dailyRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/inventories", inventoryRoutes);

// New models
app.use("/api/stock", stockRoutes);
app.use("/api/product", productRoutes);
app.use("/api/wastage", wastageRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/delivery", deliveryRoutes);



// Start
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log('MongoDB connected');
  app.listen(config.port, ()=> console.log('Server running on port', config.port));
}).catch(err=>{
  console.error('MongoDB connection error', err);
  process.exit(1);
});
