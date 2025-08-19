"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Mail, MapPin, User, Eye, Loader2 } from "lucide-react"
import AdminDashboardLayout from "@/components/admin/dashboard/layout"
import { useState, useEffect } from "react"

export default function AdminClientDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const clientId = params.id
  const [client, setClient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch client data
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setIsLoading(true)
        // Replace with your actual API endpoint
        const response = await fetch(`/api/clients/${clientId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch client data")
        }

        const data = await response.json()
        setClient(data)
      } catch (error) {
        console.error("Error fetching client data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClientData()
  }, [clientId])

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  // Helper function to get status label and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "confirmed":
        return { label: "Confirmée", color: "bg-green-100 text-green-800" }
      case "pending":
        return { label: "En attente", color: "bg-yellow-100 text-yellow-800" }
      case "cancelled":
        return { label: "Annulée", color: "bg-red-100 text-red-800" }
      default:
        return { label: "Inconnue", color: "bg-gray-100 text-gray-800" }
    }
  }

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Page header with back button */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-500" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {client?.fullName || "Détails du client"}
                </h1>
                <p className="text-sm text-gray-500 mt-1">Informations détaillées du client</p>
              </div>
            </div>
          </div>
        </div>

        {/* Client information */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement des informations client...</p>
            </div>
          </div>
        ) : !client ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Client non trouvé</h3>
            <p className="text-gray-600 max-w-md mb-6">Ce client n'existe pas ou a été supprimé.</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-[#FFD700] text-black rounded-md text-sm font-medium hover:bg-[#E6C200] transition-colors"
            >
              Retour
            </button>
          </div>
        ) : (
          <>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Nom complet</p>
                        <p className="text-gray-900">{client?.fullName || "Non spécifié"}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-gray-900">{client?.email || "Non spécifié"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Ville</p>
                        <p className="text-gray-900">{client?.city || "Non spécifié"}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date d'inscription</p>
                        <p className="text-gray-900">
                          {client?.registrationDate ? formatDate(client.registrationDate) : "Non spécifié"}
                        </p>
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
                <h2 className="font-semibold text-gray-800">Réservations</h2>
              </div>
              <div className="p-5">
                {client?.reservations?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Agence
                          </th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {client.reservations.map((reservation: any) => {
                          const statusInfo = getStatusInfo(reservation.status)
                          return (
                            <tr key={reservation.id} className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm text-gray-900">{reservation.packageType}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">{formatDate(reservation.date)}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {getStatusInfo(reservation.status).label}
                              </td>
                              <td className="py-3 px-4 text-sm">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
                                >
                                  {statusInfo.label}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm text-right">
                                <Link
                                  href={`/admin/dashboard/reservations/${reservation.id}`}
                                  className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-white hover:bg-[#FFD700] hover:border-[#FFD700] transition-colors"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">Voir la réservation</span>
                                </Link>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Ce client n'a pas encore de réservations.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </AdminDashboardLayout>
  )
}
