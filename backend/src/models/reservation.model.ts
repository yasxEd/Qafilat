import mongoose from 'mongoose';
import { Documents, Reservation } from '../../../types/schema';

const documentSchema = new mongoose.Schema({
  exists: { type: Boolean, required: true },
  filePath: { type: String },
  uploadedAt: { type: String },
  filename: { type: String },
  url: { type: String }
});

const documentsSchema = new mongoose.Schema<Documents>({
  passport: documentSchema,
  photo: documentSchema,
  identity: documentSchema,
  vaccination: documentSchema
});

const reservationSchema = new mongoose.Schema<Reservation>({
  userId: { type: String, required: true },
  agencyId: { type: String, required: true },
  packageType: { 
    type: String, 
    enum: ['hajj', 'umrah', 'leisure', 'hotel', 'vol'],
    required: true 
  },
  departureCity: { type: String, required: true },
  destination: { type: String },
  tripType: { type: String },
  duration: { type: String },
  dateFrom: { type: String, required: true },
  dateTo: { type: String },
  tripDirection: { type: String, enum: ['round', 'oneway'] },
  flightClass: { type: String },
  adults: { type: String, required: true },
  children: { type: String, required: true },
  rooms: { type: String },
  status: { 
    type: String, 
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'pending'
  },
  travelerName: { type: String, required: true },
  travelerPhone: { type: String, required: true },
  birthDate: { type: String, required: true },
  passportNumber: { type: String, required: true },
  passportExpiry: { type: String, required: true },
  address: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  medicalConditions: { type: String },
  documents: documentsSchema
}, {
  timestamps: true
});

export const ReservationModel = mongoose.model<Reservation>('Reservation', reservationSchema); 