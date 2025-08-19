"use client"

import AgencyDashboardLayout from "@/components/agency/dashboard/layout"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Mail, MapPin, User } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ClientDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.id as string
  const [client, setClient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [reservation, setReservation] = useState<any>(null)
  const reservationId = params.id as string



  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/api/reservations/${reservationId}`)
      .then(res => res.json())
      .then(data => {
        setReservation(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [reservationId]);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
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

  // Format reservation display based on package type
  const formatReservationDisplay = (reservation: any) => {
    if (reservation.packageType === "hotel") {
      return `${reservation.packageType} - ${getCityLabel(reservation.destination)}`
    }
    return `${reservation.packageType} - ${getCityLabel(reservation.departureCity)}`
  }

  if (isLoading) {
    return (
      <AgencyDashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
        </div>
      </AgencyDashboardLayout>
    )
  }

  if (!client) {
    return (
      <AgencyDashboardLayout>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Client non trouvé</h2>
          <p className="text-gray-600 mb-4">Le client que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link
            href="/agency/dashboard/clients"
            className="inline-flex items-center px-4 py-2 bg-[#FFD700] text-black rounded-md hover:bg-[#E6C200] transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour à la liste des clients
          </Link>
        </div>
      </AgencyDashboardLayout>
    )
  }

  return (
    <AgencyDashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Retour"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Détails du client</h1>
              <p className="text-sm text-gray-500 mt-1">Informations complètes du client</p>
            </div>
          </div>
        </div>

        {/* Client information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Informations personnelles</h2>
          </div>
          <div className="p-5">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#FFD700]/10 flex items-center justify-center mb-4 md:mb-0">
                <User className="h-8 w-8 text-[#FFD700]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{client.fullName}</h3>
                <p className="text-gray-500">Client depuis {formatDate(client.registrationDate)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900">{client.email}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ville</p>
                    <p className="text-gray-900">{getCityLabel(client.city)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Client reservations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Réservations ({client.reservations?.length || 0})</h2>
          </div>
          {client.reservations?.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {client.reservations.map((reservation: any) => (
                <div key={reservation.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 capitalize">
                          {formatReservationDisplay(reservation)}
                        </h3>
                        <div className="mt-1 text-sm text-gray-500">Date de départ: {formatDate(reservation.date)}</div>
                        {reservation.packageType === "hotel" && (
                          <div className="mt-1 text-xs text-gray-500">
                            Durée: {reservation.duration} • {reservation.rooms} chambre(s) • {reservation.adults}{" "}
                            adulte(s)
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <Link
                        href={`/agency/dashboard/reservations/${reservation.id}`}
                        className="text-sm text-[#FFD700] hover:text-[#E6C200] font-medium inline-flex items-center"
                      >
                        Voir détails
                        <ArrowLeft size={16} className="ml-1 transform rotate-180" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">Ce client n'a pas encore de réservations.</p>
            </div>
          )}
        </motion.div>
      </div>
    </AgencyDashboardLayout>
  )
}
