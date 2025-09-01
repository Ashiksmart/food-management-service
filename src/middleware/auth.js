import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import User from '../models/User.js';

export const auth = async (req,res,next)=>{
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'No token' });
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(payload.id).lean();
    if(!user) return res.status(401).json({ message: 'Invalid user' });
    req.user = user;
    next();
  } catch(err){
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const requireRole = (role)=>(req,res,next)=>{
  if(req.user?.role !== role) return res.status(403).json({ message: 'Forbidden' });
  next();
};
