import mongoose from 'mongoose';
import { User } from '../entities/user.entity';

const userSchema = new mongoose.Schema<User>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  registrationDate: { type: String, required: false },
  phoneNumber: { type: String },
  agencyId: { type: String, required: false }
}, {
  timestamps: true
});

export const UserModel = mongoose.model<User>('User', userSchema); 