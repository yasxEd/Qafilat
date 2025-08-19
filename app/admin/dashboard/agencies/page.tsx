"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Loader2, Building2 } from "lucide-react"
import AdminDashboardLayout from "@/components/admin/dashboard/layout"

export default function AdminAgenciesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [agencies, setAgencies] = useState<any[]>([])

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:5000/api/agencies")
      .then((res) => res.json())
      .then((data) => {
        setAgencies(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  // Filter agencies based on search query
  const filteredAgencies = agencies.filter(
    (agency) =>
      agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.city.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Agences</h1>
              <p className="text-sm text-gray-500 mt-1">Gérez les agences partenaires</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher une agence..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFD700] focus:border-[#FFD700]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Agencies list */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement des agences...</p>
            </div>
          </div>
        ) : agencies.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Aucune agence trouvée</h3>
            <p className="text-gray-600 max-w-md mb-6">
              Les agences partenaires s'afficheront ici une fois qu'elles seront ajoutées à la plateforme.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom de l'agence
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ville
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre de clients
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre de réservations
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date d'ajout
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAgencies.map((agency) => (
                    <tr key={agency.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{agency.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{agency.city}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{agency.clientCount}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{agency.reservationCount}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(agency.createdAt).toLocaleDateString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </AdminDashboardLayout>
  )
}
