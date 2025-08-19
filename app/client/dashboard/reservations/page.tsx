"use client"

import ClientDashboardLayout from "@/components/client/dashboard/layout"
import ReservationDetails from "@/components/client/reservations/reservation-details"
import ReservationForm from "@/components/client/reservations/reservation-form"
import { deleteCookie, getCookie } from "@/lib/cookies"
import { motion } from "framer-motion"
import { AlertCircle, ArrowLeft, Calendar, ChevronRight, Clock, Loader2, MapPin, PlusCircle, User } from "lucide-react"
import { useEffect, useState } from "react"
// Add import for types at the top of the file
import type { Reservation } from "@/types/schema"

export default function ClientReservationsPage() {
  const [pendingReservation, setPendingReservation] = useState<any>(null)
  const [reservations, setReservations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showNewReservationForm, setShowNewReservationForm] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)

  // Decode userId from token
  const getUserIdFromToken = (token: string | null) => {
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return payload.id
    } catch {
      return null
    }
  }

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)

      // Check for pending reservation in cookie
      const reservationData = getCookie("pendingReservation")
      if (reservationData) {
        try {
          setPendingReservation(JSON.parse(reservationData))
        } catch (error) {
          console.error("Error parsing reservation data:", error)
          deleteCookie("pendingReservation")
        }
      }

      // Fetch the current user's reservations from the API
      const token = localStorage.getItem("token")
      if (!token) {
        alert("Vous devez être connecté pour voir vos réservations")
        setIsLoading(false)
        return
      }

      const userId = getUserIdFromToken(token)
      if (!userId) {
        alert("Impossible de récupérer l'utilisateur depuis le token.")
        setIsLoading(false)
        return
      }

      fetch(`http://localhost:5000/api/reservations/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((reservationsData) => {
          console.log("Fetched reservations:", reservationsData)
          setReservations(reservationsData)
          setIsLoading(false)
        })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Update the handleReservationComplete function to include the new fields
  const handleReservationComplete = async (formData: any) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("Vous devez être connecté pour créer une réservation")
        return
      }

      // Get the current user's ID
      const userResponse = await fetch("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const userData = await userResponse.json()

      // Create a new reservation object with form data and some additional info
      const newReservation: Partial<Reservation> = {
        id: `res-${Date.now()}`,
        userId: userData.id, // Use the actual user ID
        agencyId: "agency-1", // Default agency ID
        packageType: formData.packageType || pendingReservation?.packageType || "hajj",
        // Only include departureCity if not hotel type
        ...(formData.packageType !== "hotel"
          ? {
              departureCity: formData.departureCity || pendingReservation?.departureCity || "casablanca",
            }
          : {}),
        destination: formData.destination || pendingReservation?.destination || "",
        tripType: formData.tripType || pendingReservation?.tripType || "",
        duration: formData.duration || pendingReservation?.duration || "",
        dateFrom: formData.dateFrom || pendingReservation?.dateFrom || "",
        dateTo: formData.dateTo || pendingReservation?.dateTo || "",
        tripDirection: formData.tripDirection || pendingReservation?.tripDirection || "",
        flightClass: formData.flightClass || pendingReservation?.flightClass || "",
        adults: formData.adults || pendingReservation?.adults || "1",
        children: formData.children || pendingReservation?.children || "0",
        rooms: formData.rooms || pendingReservation?.rooms || "1",
        travelerName: formData.fullName,
        travelerPhone: formData.phoneNumber,
        birthDate: formData.birthDate,
        passportNumber: formData.passportNumber,
        passportExpiry: formData.passportExpiry,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        medicalConditions: formData.medicalConditions,
        forfait: formData.forfait || pendingReservation?.forfait || "",
        status: "confirmed",
        documents: formData.documents || {
          passport: { exists: true },
          photo: { exists: true },
          vaccination: { exists: true },
          identity: { exists: true },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Create the reservation through the API
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newReservation),
      })

      if (!response.ok) {
        throw new Error("Failed to create reservation")
      }

      // Refresh the reservations list
      const reservationsResponse = await fetch(`http://localhost:5000/api/reservations/user/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const reservationsData = await reservationsResponse.json()
      setReservations(reservationsData)

      // Clear the pending reservation
      deleteCookie("pendingReservation")
      setPendingReservation(null)
      setShowNewReservationForm(false)

      // Show success message
      alert("Réservation complétée avec succès!")
    } catch (error) {
      //console.error("Error creating reservation:", error);
      //alert("Erreur lors de la création de la réservation");
    }
  }

  const startNewReservation = () => {
    // Create an empty reservation to trigger the form
    setPendingReservation({
      packageType: "hajj",
      departureCity: "casablanca",
    })
    setShowNewReservationForm(true)
  }

  const handleViewDetails = (reservation: any) => {
    setSelectedReservation(reservation)
  }

  const handleCloseDetails = () => {
    setSelectedReservation(null)
  }

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

  // Get package type label
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

  // Get destination label
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

  const createReservation = async (reservationData: any) => {
    try {
      const token = localStorage.getItem("token")
      const userId = getUserIdFromToken(token)
      if (!token || !userId) {
        alert("Vous devez être connecté pour créer une réservation")
        return
      }

      // Get the current user's data
      const userResponse = await fetch(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const userData = await userResponse.json()

      // For hotel type, ensure departureCity is not required
      const reservationWithUserId = {
        ...reservationData,
        userId: userData.id, // Use the actual user ID
        // Only include departureCity if not hotel type
        ...(reservationData.packageType !== "hotel" ? { departureCity: reservationData.departureCity } : {}),
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationWithUserId),
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh the reservations list
        const reservationsResponse = await fetch(`http://localhost:5000/api/reservations/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const reservationsData = await reservationsResponse.json()
        setReservations(reservationsData)

        alert("Réservation créée avec succès!")
        setShowNewReservationForm(false)
      } else {
        alert(data.error || "Erreur lors de la création de la réservation")
      }
    } catch (error) {
      console.error("Error creating reservation:", error)
      alert("Erreur réseau")
    }
  }

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        {/* Page header with improved styling */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {selectedReservation ? (
                <div className="flex items-center">
                  <button
                    onClick={handleCloseDetails}
                    className="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Détails de la réservation</h1>
                    <p className="text-sm text-gray-500 mt-1">Informations complètes</p>
                  </div>
                </div>
              ) : pendingReservation || showNewReservationForm ? (
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Nouvelle réservation</h1>
                  <p className="text-sm text-gray-500 mt-1">Complétez les informations requises</p>
                </div>
              ) : (
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mes Réservations</h1>
                  <p className="text-sm text-gray-500 mt-1">Gérez vos réservations de voyages</p>
                </div>
              )}
            </div>

            {/* Only show the button when not showing form or details */}
            {!pendingReservation && !showNewReservationForm && !selectedReservation && (
              <button
                onClick={startNewReservation}
                className="inline-flex items-center justify-center px-4 py-2 bg-[#FFD700] text-black text-sm font-medium rounded-md hover:bg-[#E6C200] transition-colors shadow-sm self-start sm:self-center"
              >
                <PlusCircle size={16} className="mr-2" />
                Nouvelle réservation
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement de vos réservations...</p>
            </div>
          </div>
        ) : selectedReservation ? (
          <ReservationDetails reservation={selectedReservation} onClose={handleCloseDetails} />
        ) : pendingReservation || showNewReservationForm ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Réservation en attente</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>Veuillez compléter votre réservation ci-dessous.</p>
                  </div>
                </div>
              </div>
            </div>

            <ReservationForm initialData={pendingReservation} onComplete={handleReservationComplete} />
          </motion.div>
        ) : reservations.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Vos réservations ({reservations.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {reservations.map((reservation) => (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {getPackageTypeLabel(reservation.packageType)}
                          {reservation.destination && ` - ${getDestinationLabel(reservation.destination)}`}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1 text-gray-400" />
                            <span>{getCityLabel(reservation.departureCity || "")}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1 text-gray-400" />
                            <span>{formatDate(reservation.dateFrom || reservation.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <User size={14} className="mr-1 text-gray-400" />
                            <span>{reservation.travelerName}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0 flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {reservation.status === "confirmed" ? "Confirmée" : "En attente"}
                      </span>
                      <button
                        onClick={() => handleViewDetails(reservation)}
                        className="ml-4 text-sm text-[#FFD700] hover:text-[#E6C200] font-medium inline-flex items-center"
                      >
                        Détails
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Vos réservations</h2>
            </div>
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                <Calendar size={24} className="text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-medium mb-2">Aucune réservation</h3>
              <p className="text-gray-600 text-sm mb-5 max-w-xs mx-auto">
                Vous n'avez pas encore de réservations. Commencez par réserver votre voyage dès maintenant.
              </p>
              <button
                onClick={startNewReservation}
                className="px-4 py-2.5 bg-[#FFD700] text-black text-sm font-medium rounded-md hover:bg-[#E6C200] transition-colors inline-flex items-center shadow-sm hover:shadow"
              >
                <PlusCircle size={16} className="mr-2" />
                Réserver maintenant
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </ClientDashboardLayout>
  )
}
