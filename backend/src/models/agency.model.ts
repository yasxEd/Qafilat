import mongoose from 'mongoose';
import { Agency } from '../entities/agency.entity';

const agencySchema = new mongoose.Schema<Agency>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, {
  timestamps: true
});

export const AgencyModel = mongoose.model<Agency>('Agency', agencySchema); 