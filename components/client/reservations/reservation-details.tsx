"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, FileText, CheckCircle, X, Upload, MapPin, Clock, User } from "lucide-react"
import type { Reservation } from "@/types/schema"

interface ReservationDetailsProps {
  reservation: Partial<Reservation> & { forfait?: string }
  onClose: () => void
}

export default function ReservationDetails({ reservation, onClose }: ReservationDetailsProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    passportNumber: "",
    passportExpiry: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
    medicalConditions: "",
  })

  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: boolean }>({
    passport: false,
    photo: false,
    vaccination: false,
    identity: false,
  })

  // Required document types
  const requiredDocuments = [
    {
      id: "passport",
      name: "Passeport",
      description: "Copie de votre passeport valide (validité min. 6 mois)",
      icon: FileText,
    },
    {
      id: "photo",
      name: "Photo d'identité",
      description: "Photo récente sur fond blanc (format 4x4cm)",
      icon: Upload,
    },
    {
      id: "vaccination",
      name: "Carnet de vaccination",
      description: "Certificat de vaccination à jour",
      icon: FileText,
    },
    {
      id: "identity",
      name: "Pièce d'identité",
      description: "Copie de votre carte d'identité nationale",
      icon: FileText,
    },
  ]

  // Initialize form data from reservation
  useEffect(() => {
    if (reservation) {
      setFormData({
        fullName: reservation.travelerName || "",
        birthDate: reservation.birthDate || "",
        passportNumber: reservation.passportNumber || "",
        passportExpiry: reservation.passportExpiry || "",
        phoneNumber: reservation.travelerPhone || "",
        address: reservation.address || "",
        emergencyContact: reservation.emergencyContact || "",
        medicalConditions: reservation.medicalConditions || "",
      })

      // Initialize uploaded files from reservation
      if (reservation.documents) {
        setUploadedFiles({
          passport: reservation.documents.passport?.exists || false,
          photo: reservation.documents.photo?.exists || false,
          vaccination: reservation.documents.vaccination?.exists || false,
          identity: reservation.documents.identity?.exists || false,
        })
      }
    }
  }, [reservation])

  // Get city label from value
  const getCityLabel = (cityValue: string) => {
    const cities = [
      { value: "casablanca", label: "Casablanca" },
      { value: "rabat", label: "Rabat" },
      { value: "marrakech", label: "Marrakech" },
      { value: "tanger", label: "Tanger" },
    ]

    return cities.find((city) => city.value === cityValue)?.label || cityValue
  }

  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Update the getPackageTypeLabel function to handle undefined values
  const getPackageTypeLabel = (type: string | undefined) => {
    if (!type) return ""

    const types = {
      hajj: "Hajj",
      umrah: "Omra",
      leisure: "Loisirs",
      hotel: "Hôtel",
      vol: "Vol",
    }
    return types[type as keyof typeof types] || type
  }

  // Update the getDestinationLabel function to handle undefined values
  const getDestinationLabel = (destination: string | undefined) => {
    if (!destination) return ""

    const destinations = [
      { value: "paris", label: "Paris, France" },
      { value: "istanbul", label: "Istanbul, Turquie" },
      { value: "dubai", label: "Dubaï, UAE" },
      { value: "london", label: "Londres, UK" },
      { value: "marrakech", label: "Marrakech, Maroc" },
      { value: "casablanca", label: "Casablanca, Maroc" },
      { value: "barcelona", label: "Barcelone, Espagne" },
      { value: "cairo", label: "Le Caire, Égypte" },
    ]

    return destinations.find((d) => d.value === destination)?.label || destination
  }

  // Update the getTripTypeLabel function to handle undefined values
  const getTripTypeLabel = (tripType: string | undefined) => {
    if (!tripType) return ""

    const types = [
      { value: "beach", label: "Vacances Plage" },
      { value: "city", label: "Tour de Ville" },
      { value: "cultural", label: "Expérience Culturelle" },
      { value: "adventure", label: "Voyage Aventure" },
      { value: "relaxation", label: "Séjour Détente" },
    ]

    return types.find((t) => t.value === tripType)?.label || tripType
  }

  // Update the getDurationLabel function to handle undefined values
  const getDurationLabel = (duration: string | undefined) => {
    if (!duration) return ""

    const durations = [
      { value: "3-5", label: "3-5 jours" },
      { value: "1-week", label: "1 semaine" },
      { value: "2-weeks", label: "2 semaines" },
      { value: "custom", label: "Personnalisé" },
    ]

    return durations.find((d) => d.value === duration)?.label || duration
  }

  // Update the getTripDirectionLabel function to handle undefined values
  const getTripDirectionLabel = (direction: string | undefined) => {
    if (!direction) return ""

    const directions = [
      { value: "round", label: "Aller-Retour" },
      { value: "oneway", label: "Aller Simple" },
    ]

    return directions.find((d) => d.value === direction)?.label || direction
  }

  // Update the getFlightClassLabel function to handle undefined values
  const getFlightClassLabel = (flightClass: string | undefined) => {
    if (!flightClass) return ""

    const classes = [
      { value: "economy", label: "Économique" },
      { value: "business", label: "Business" },
      { value: "premium", label: "Premium" },
    ]

    return classes.find((c) => c.value === flightClass)?.label || flightClass
  }

  // Get forfait label
  const getForfaitLabel = (forfait: string | undefined) => {
    if (!forfait) return ""

    const forfaits = [
      { value: "economique", label: "Économique" },
      { value: "standard", label: "Standard" },
      { value: "premium", label: "Premium" },
    ]

    return forfaits.find((f) => f.value === forfait)?.label || forfait
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div className="flex items-center">
          <Calendar size={18} className="text-[#FFD700] mr-2" />
          <h2 className="font-semibold text-gray-800">Détails de la réservation</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 transition-colors" aria-label="Fermer">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 md:p-6">
        {/* Travel info */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-2 text-sm">
            <div className="font-medium text-gray-700">Type:</div>
            <div className="text-gray-900">{getPackageTypeLabel(reservation.packageType)}</div>

            {reservation.destination && (
              <>
                <div className="mx-2 text-gray-300">|</div>
                <div className="font-medium text-gray-700">Destination:</div>
                <div className="text-gray-900">{getDestinationLabel(reservation.destination)}</div>
              </>
            )}

            {reservation.tripType && (
              <>
                <div className="mx-2 text-gray-300">|</div>
                <div className="font-medium text-gray-700">Type de séjour:</div>
                <div className="text-gray-900">{getTripTypeLabel(reservation.tripType)}</div>
              </>
            )}

            {reservation.duration && reservation.packageType !== "hotel" && (
              <>
                <div className="mx-2 text-gray-300">|</div>
                <div className="font-medium text-gray-700">Durée:</div>
                <div className="text-gray-900">{getDurationLabel(reservation.duration)}</div>
              </>
            )}

            {reservation.tripDirection && (
              <>
                <div className="mx-2 text-gray-300">|</div>
                <div className="font-medium text-gray-700">Vol:</div>
                <div className="text-gray-900">{getTripDirectionLabel(reservation.tripDirection)}</div>
              </>
            )}

            {reservation.flightClass && (
              <>
                <div className="mx-2 text-gray-300">|</div>
                <div className="font-medium text-gray-700">Classe:</div>
                <div className="text-gray-900">{getFlightClassLabel(reservation.flightClass)}</div>
              </>
            )}

            {(reservation.packageType === "hajj" || reservation.packageType === "umrah") && reservation.forfait && (
              <>
                <div className="mx-2 text-gray-300">|</div>
                <div className="font-medium text-gray-700">Forfait:</div>
                <div className="text-gray-900">{getForfaitLabel(reservation.forfait)}</div>
              </>
            )}

            {reservation.departureCity && reservation.packageType !== "hotel" && (
              <>
                <div className="mx-2 text-gray-300">|</div>
                <div className="font-medium text-gray-700">Départ:</div>
                <div className="text-gray-900">{getCityLabel(reservation.departureCity || "")}</div>
              </>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {reservation.dateFrom && (
              <div className="flex items-center">
                <Clock size={14} className="mr-1 text-gray-400" />
                <span className="text-gray-900">
                  {reservation.packageType === "hotel"
                    ? "Check-in: "
                    : reservation.tripDirection === "round"
                      ? "Aller: "
                      : "Départ: "}
                  {formatDate(reservation.dateFrom)}
                </span>
              </div>
            )}

            {reservation.dateTo && (
              <div className="flex items-center">
                <Clock size={14} className="mr-1 text-gray-400" />
                <span className="text-gray-900">
                  {reservation.packageType === "hotel" ? "Check-out: " : "Retour: "}
                  {formatDate(reservation.dateTo)}
                </span>
              </div>
            )}

            {/* Handle legacy date field for backward compatibility */}
            {!reservation.dateFrom && !reservation.dateTo && (reservation as any).date && (
              <div className="flex items-center">
                <Clock size={14} className="mr-1 text-gray-400" />
                <span className="text-gray-900">Date: {formatDate((reservation as any).date)}</span>
              </div>
            )}

            {reservation.adults && (
              <div className="flex items-center">
                <User size={14} className="mr-1 text-gray-400" />
                <span className="text-gray-900">
                  {reservation.adults} {Number(reservation.adults) > 1 ? "adultes" : "adulte"}
                  {reservation.children &&
                    Number(reservation.children) > 0 &&
                    `, ${reservation.children} ${Number(reservation.children) > 1 ? "enfants" : "enfant"}`}
                </span>
              </div>
            )}

            {reservation.rooms && (
              <div className="flex items-center">
                <MapPin size={14} className="mr-1 text-gray-400" />
                <span className="text-gray-900">
                  {reservation.rooms} {Number(reservation.rooms) > 1 ? "chambres" : "chambre"}
                </span>
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center">
            <div className="font-medium text-gray-700 mr-2">Statut:</div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {reservation.status === "confirmed" ? "Confirmée" : "En attente"}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-2">
                <span className="text-[#FFD700] font-bold text-xs">1</span>
              </div>
              Informations Personnelles
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 mb-1">
                  Nom Complet
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  readOnly
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 bg-gray-50 rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="birthDate" className="block text-xs font-medium text-gray-700 mb-1">
                    Date de Naissance
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    readOnly
                    className="w-full px-3 py-1.5 text-sm border border-gray-200 bg-gray-50 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    readOnly
                    className="w-full px-3 py-1.5 text-sm border border-gray-200 bg-gray-50 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="passportNumber" className="block text-xs font-medium text-gray-700 mb-1">
                    N° Passeport
                  </label>
                  <input
                    type="text"
                    id="passportNumber"
                    name="passportNumber"
                    value={formData.passportNumber}
                    readOnly
                    className="w-full px-3 py-1.5 text-sm border border-gray-200 bg-gray-50 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="passportExpiry" className="block text-xs font-medium text-gray-700 mb-1">
                    Expiration Passeport
                  </label>
                  <input
                    type="date"
                    id="passportExpiry"
                    name="passportExpiry"
                    value={formData.passportExpiry}
                    readOnly
                    className="w-full px-3 py-1.5 text-sm border border-gray-200 bg-gray-50 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  readOnly
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 bg-gray-50 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="emergencyContact" className="block text-xs font-medium text-gray-700 mb-1">
                  Contact d'Urgence
                </label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  readOnly
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 bg-gray-50 rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-1">
                Conditions Médicales
              </label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions || "Aucune condition médicale spécifiée"}
                readOnly
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md"
              />
            </div>
          </div>

          {/* Document Upload Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-2">
                <span className="text-[#FFD700] font-bold text-xs">2</span>
              </div>
              Documents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {requiredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={`border rounded-lg p-2 ${
                    uploadedFiles[doc.id] ? "border-green-300 bg-green-50" : "border-gray-200"
                  } transition-colors`}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                        uploadedFiles[doc.id] ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {uploadedFiles[doc.id] ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <doc.icon className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-medium text-gray-900">{doc.name}</h4>
                      <div className="text-xs text-gray-500 mt-1">
                        {uploadedFiles[doc.id] ? "Document téléchargé" : "Document manquant"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
