// User (Client) type
export interface User {
  id: string
  fullName: string
  email: string
  password?: string // Hashed, not exposed in frontend
  city: string
  registrationDate: string
  phoneNumber?: string
  agencyId: string // Reference to agency
}

// Agency type
export interface Agency {
  id: string
  name: string
  email: string
  password?: string // Hashed, not exposed in frontend
  city: string
  address: string
  phone: string
  status: "active" | "inactive"
}

// Admin type
export interface Admin {
  id: string
  name: string
  email: string
  password?: string // Hashed, not exposed in frontend
}

// Document type
export interface Document {
  exists: boolean
  filePath?: string
  uploadedAt?: string
  filename?: string // For backward compatibility
  url?: string // For backward compatibility
}

// Documents collection type
export interface Documents {
  passport: Document
  photo: Document
  identity: Document
  vaccination: Document
}

// Reservation type
export type Reservation = {
  id: string
  userId: string
  agencyId: string
  packageType: string
  departureCity: string
  destination?: string
  tripType?: string
  duration?: string
  dateFrom?: string
  dateTo?: string
  tripDirection?: string
  flightClass?: string
  adults?: string
  children?: string
  rooms?: string
  travelerName: string
  travelerPhone: string
  birthDate: string
  passportNumber: string
  passportExpiry: string
  address: string
  emergencyContact: string
  medicalConditions?: string
  status: string
  forfait?: string
  documents: {
    passport: { exists: boolean }
    photo: { exists: boolean }
    vaccination: { exists: boolean }
    identity: { exists: boolean }
  }
  createdAt: string
  updatedAt: string
}
