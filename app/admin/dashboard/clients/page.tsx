"use client"

import AdminDashboardLayout from "@/components/admin/dashboard/layout"
import { motion } from "framer-motion"
import { Eye, Loader2, Search, UserRound } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => {
        setClients(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  // Filter clients based on search query
  const filteredClients = clients.filter(
    (client) =>
      client.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.city.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Clients</h1>
              <p className="text-sm text-gray-500 mt-1">Gérez tous les clients de la plateforme</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher un client..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFD700] focus:border-[#FFD700]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Clients list */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement des clients...</p>
            </div>
          </div>
        ) : clients.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <UserRound className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Aucun client trouvé</h3>
            <p className="text-gray-600 max-w-md mb-6">
              Les clients s'afficheront ici une fois qu'ils se seront inscrits sur la plateforme.
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
                      Nom complet
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ville
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date d'inscription
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{client.fullName}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{client.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{client.city}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {client.registrationDate ? new Date(client.registrationDate).toLocaleDateString("fr-FR") : "-"}
                      </td>
                      <td className="py-3 px-4 text-sm text-right">
                        <Link
                          href={`/admin/dashboard/clients/${client.id}`}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-white hover:bg-[#FFD700] hover:border-[#FFD700] transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir le client</span>
                        </Link>
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
