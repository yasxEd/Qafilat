import mongoose from 'mongoose';
import { Admin } from '../entities/admin.entity';

const adminSchema = new mongoose.Schema<Admin>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

export const AdminModel = mongoose.model<Admin>('Admin', adminSchema); 