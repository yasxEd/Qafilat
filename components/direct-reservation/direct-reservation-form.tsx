"use client"

import type React from "react"

import { useState, type ChangeEvent } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define types for form data
interface ReservationSummary {
  packageType: string
  forfaitType: string
  departureCity: string
  destination: string
  dateFrom: string
  dateTo: string
  adults: string
  children: string
  rooms: string
  tripDirection: string
  flightClass: string
  tripType: string
  tripDuration: string
}

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
}

interface SelectOption {
  value: string
  label: string
}

interface FormStatus {
  status: "idle" | "loading" | "success" | "error"
  message: string
}

export default function DirectReservationForm() {
  // Reservation summary state (editable)
  const [reservationSummary, setReservationSummary] = useState<ReservationSummary>({
    packageType: "hajj",
    forfaitType: "standard",
    departureCity: "casablanca",
    destination: "",
    dateFrom: "",
    dateTo: "",
    adults: "2",
    children: "0",
    rooms: "1",
    tripDirection: "round",
    flightClass: "economy",
    tripType: "",
    tripDuration: "",
  })

  // Personal information
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
  })

  // Form status
  const [formStatus, setFormStatus] = useState<FormStatus>({
    status: "idle",
    message: "",
  })

  // Package types and their labels
  const packageTypes: SelectOption[] = [
    { value: "hajj", label: "Hajj" },
    { value: "umrah", label: "Omra" },
    { value: "leisure", label: "Loisirs" },
    { value: "hotel", label: "Hôtel" },
    { value: "vol", label: "Vol" },
  ]

  // Forfait options
  const forfaitOptions: SelectOption[] = [
    { value: "economic", label: "Forfait Économique" },
    { value: "standard", label: "Forfait Standard" },
    { value: "premium", label: "Forfait Premium" },
  ]

  // Moroccan cities
  const moroccanCities: SelectOption[] = [
    { value: "casablanca", label: "Casablanca" },
    { value: "rabat", label: "Rabat" },
    { value: "marrakech", label: "Marrakech" },
    { value: "tanger", label: "Tanger" },
  ]

  // Popular destinations
  const popularDestinations: SelectOption[] = [
    { value: "paris", label: "Paris, France" },
    { value: "istanbul", label: "Istanbul, Turquie" },
    { value: "dubai", label: "Dubaï, UAE" },
    { value: "london", label: "Londres, UK" },
    { value: "barcelona", label: "Barcelone, Espagne" },
    { value: "cairo", label: "Le Caire, Égypte" },
  ]

  // Flight classes
  const flightClasses: SelectOption[] = [
    { value: "economy", label: "Économique" },
    { value: "business", label: "Business" },
    { value: "premium", label: "Premium" },
  ]

  // Trip directions
  const tripDirections: SelectOption[] = [
    { value: "round", label: "Aller-Retour" },
    { value: "oneway", label: "Aller Simple" },
  ]

  // Trip types
  const tripTypes: SelectOption[] = [
    { value: "beach", label: "Vacances Plage" },
    { value: "city", label: "Tour de Ville" },
    { value: "cultural", label: "Expérience Culturelle" },
    { value: "adventure", label: "Voyage Aventure" },
    { value: "relaxation", label: "Séjour Détente" },
  ]

  // Trip durations
  const tripDurations: SelectOption[] = [
    { value: "3-5", label: "3-5 jours" },
    { value: "1-week", label: "1 semaine" },
    { value: "2-weeks", label: "2 semaines" },
    { value: "custom", label: "Personnalisé" },
  ]

  const handleSummaryChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setReservationSummary({
      ...reservationSummary,
      [name]: value,
    })
  }

  const handlePersonalInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Set loading state
    setFormStatus({
      status: "loading",
      message: "Envoi de votre demande en cours...",
    })

    try {
      // Send form data to API route
      const response = await fetch("/api/send-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservationSummary,
          personalInfo,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Success state
        setFormStatus({
          status: "success",
          message: "Votre demande de réservation a été envoyée avec succès!",
        })

        // Reset form after successful submission
        setPersonalInfo({
          fullName: "",
          email: "",
          phone: "",
        })
      } else {
        // Error state
        setFormStatus({
          status: "error",
          message: data.message || "Une erreur est survenue lors de l'envoi de votre demande.",
        })
      }
    } catch (error) {
      // Error state
      setFormStatus({
        status: "error",
        message: "Une erreur est survenue lors de l'envoi de votre demande.",
      })
    }
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails de votre voyage</h2>

          {/* Status alerts */}
          {formStatus.status === "success" && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Succès</AlertTitle>
              <AlertDescription className="text-green-700">{formStatus.message}</AlertDescription>
            </Alert>
          )}

          {formStatus.status === "error" && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Erreur</AlertTitle>
              <AlertDescription className="text-red-700">{formStatus.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Reservation Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Package Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de voyage</label>
                  <select
                    name="packageType"
                    value={reservationSummary.packageType}
                    onChange={handleSummaryChange}
                    className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                  >
                    {packageTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Forfait Type - Only for Hajj/Umrah */}
                {(reservationSummary.packageType === "hajj" || reservationSummary.packageType === "umrah") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Forfait</label>
                    <select
                      name="forfaitType"
                      value={reservationSummary.forfaitType}
                      onChange={handleSummaryChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                    >
                      {forfaitOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Departure City - Not for Hotel */}
                {reservationSummary.packageType !== "hotel" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville de départ</label>
                    <select
                      name="departureCity"
                      value={reservationSummary.departureCity}
                      onChange={handleSummaryChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                    >
                      {moroccanCities.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Destination - For hotel, vol, leisure */}
                {(reservationSummary.packageType === "hotel" ||
                  reservationSummary.packageType === "vol" ||
                  reservationSummary.packageType === "leisure") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={reservationSummary.destination}
                      onChange={handleSummaryChange}
                      placeholder="Entrez une destination"
                      className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                    />
                  </div>
                )}

                {/* Trip Direction - For vol */}
                {reservationSummary.packageType === "vol" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de vol</label>
                    <select
                      name="tripDirection"
                      value={reservationSummary.tripDirection}
                      onChange={handleSummaryChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                    >
                      {tripDirections.map((dir) => (
                        <option key={dir.value} value={dir.value}>
                          {dir.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Flight Class - For vol */}
                {reservationSummary.packageType === "vol" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                    <select
                      name="flightClass"
                      value={reservationSummary.flightClass}
                      onChange={handleSummaryChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                    >
                      {flightClasses.map((cls) => (
                        <option key={cls.value} value={cls.value}>
                          {cls.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Trip Type - For leisure */}
                {reservationSummary.packageType === "leisure" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de voyage</label>
                    <select
                      name="tripType"
                      value={reservationSummary.tripType}
                      onChange={handleSummaryChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                    >
                      <option value="">Sélectionnez un type</option>
                      {tripTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Trip Duration - Only for leisure */}
                {reservationSummary.packageType === "leisure" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
                    <select
                      name="tripDuration"
                      value={reservationSummary.tripDuration}
                      onChange={handleSummaryChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                    >
                      <option value="">Sélectionnez une durée</option>
                      {tripDurations.map((duration) => (
                        <option key={duration.value} value={duration.value}>
                          {duration.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Date From - Only for hotel and vol */}
                {(reservationSummary.packageType === "hotel" || reservationSummary.packageType === "vol") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {reservationSummary.packageType === "hotel"
                        ? "Check-in"
                        : reservationSummary.tripDirection === "round"
                          ? "Date aller"
                          : "Date de départ"}
                    </label>
                    <input
                      type="date"
                      name="dateFrom"
                      value={reservationSummary.dateFrom}
                      onChange={handleSummaryChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                    />
                  </div>
                )}

                {/* Date To - For hotel and round-trip flights */}
                {(reservationSummary.packageType === "hotel" ||
                  (reservationSummary.packageType === "vol" && reservationSummary.tripDirection === "round")) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {reservationSummary.packageType === "hotel" ? "Check-out" : "Date retour"}
                    </label>
                    <input
                      type="date"
                      name="dateTo"
                      value={reservationSummary.dateTo}
                      onChange={handleSummaryChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                      min={reservationSummary.dateFrom}
                    />
                  </div>
                )}

                {/* Travelers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voyageurs</label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <select
                        name="adults"
                        value={reservationSummary.adults}
                        onChange={handleSummaryChange}
                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={(i + 1).toString()}>
                            {i + 1} {i + 1 > 1 ? "adultes" : "adulte"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <select
                        name="children"
                        value={reservationSummary.children}
                        onChange={handleSummaryChange}
                        className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                      >
                        {[...Array(11)].map((_, i) => (
                          <option key={i} value={i.toString()}>
                            {i} {i > 1 ? "enfants" : "enfant"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Rooms - For hotel */}
                {reservationSummary.packageType === "hotel" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chambres</label>
                    <select
                      name="rooms"
                      value={reservationSummary.rooms}
                      onChange={handleSummaryChange}
                      className="w-full p-2.5 border border-gray-300 rounded-md text-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
                    >
                      {[...Array(5)].map((_, i) => (
                        <option key={i + 1} value={(i + 1).toString()}>
                          {i + 1} {i + 1 > 1 ? "chambres" : "chambre"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Vos coordonnées</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={formStatus.status === "loading"}
                className={`px-6 py-2.5 bg-[#FFD700] text-black rounded-md font-medium hover:bg-[#E6C200] transition-colors ${
                  formStatus.status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {formStatus.status === "loading" ? "Envoi en cours..." : "Envoyer la demande"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
