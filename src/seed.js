import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from './config.js';
import User from './models/User.js';

await mongoose.connect(config.mongoUri);
console.log('Seeding DB...');

const adminEmail = 'admin@biryani.local';
const passwordHash = await bcrypt.hash('admin123', 10);

await User.deleteMany({});
await User.create({ name: 'Admin', email: adminEmail, passwordHash, role: 'admin' });
console.log('Seeded. Admin login:', adminEmail, '/ admin123');
process.exit(0);
