"use client"

import AdminDashboardLayout from "@/components/admin/dashboard/layout"
import { motion } from "framer-motion"
import { Calendar, ChevronDown, Eye, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminReservationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [reservations, setReservations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:5000/api/reservations")
      .then((res) => res.json())
      .then((data) => {
        setReservations(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  // Filter reservations based on search term and status
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.travelerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      "" ||
      reservation.packageType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      "" ||
      reservation.agencyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ""

    if (filterStatus === "all") return matchesSearch
    return matchesSearch && reservation.status === filterStatus
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString("fr-FR") : "-"
  }

  // Get status badge color and label
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return { color: "bg-green-100 text-green-800", label: "Confirmée" }
      case "pending":
        return { color: "bg-yellow-100 text-yellow-800", label: "En attente" }
      case "cancelled":
        return { color: "bg-red-100 text-red-800", label: "Annulée" }
      default:
        return { color: "bg-gray-100 text-gray-800", label: "Inconnue" }
    }
  }

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Réservations</h1>
              <p className="text-sm text-gray-500 mt-1">Gérez toutes les réservations</p>
            </div>
          </div>
        </div>

        {/* Filters and search */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher par client, type ou agence..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="pl-4 pr-10 py-2 border border-gray-200 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="confirmed">Confirmées</option>
                <option value="pending">En attente</option>
                <option value="cancelled">Annulées</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Reservations list */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Calendar className="h-12 w-12 text-gray-300 mb-4 animate-spin" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Chargement des réservations...</h3>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Agence
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Statut
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => {
                      const statusBadge = getStatusBadge(reservation.status)
                      return (
                        <tr key={reservation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{reservation.travelerName || "-"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{reservation.packageType || "-"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {reservation.packageType === "hotel"
                                ? `${formatDate(reservation.dateFrom)} - ${formatDate(reservation.dateTo)}`
                                : formatDate(reservation.dateFrom || reservation.date)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{reservation.agencyName || "-"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}
                            >
                              {statusBadge.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`/admin/dashboard/reservations/${reservation.id}`}>
                              <button className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-white hover:bg-[#FFD700] hover:border-[#FFD700] transition-colors">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Voir la réservation</span>
                              </button>
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <Calendar className="h-12 w-12 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune réservation trouvée</h3>
                          <p className="text-gray-500 max-w-sm">
                            Aucune réservation ne correspond à vos critères de recherche.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </AdminDashboardLayout>
  )
}
