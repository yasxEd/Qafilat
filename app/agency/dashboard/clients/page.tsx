"use client"

import AgencyDashboardLayout from "@/components/agency/dashboard/layout"
import { Eye, Filter, Loader2, Search, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AgencyClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const agencyId = payload.id;
    setIsLoading(true);
    // Fetch agency profile to get city
    fetch(`http://localhost:5000/api/agencies/profile/${agencyId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(agency => {
        if (!agency.city) {
          setClients([]);
          setIsLoading(false);
          return;
        }
        // Fetch users with matching city
        fetch(`http://localhost:5000/api/users?city=${encodeURIComponent(agency.city)}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(users => {
            setClients(users);
            setIsLoading(false);
          })
          .catch(() => {
            setClients([]);
            setIsLoading(false);
          });
      })
      .catch(() => {
        setClients([]);
        setIsLoading(false);
      });
  }, []);

  // Filter clients based on search query
  const filteredClients = clients.filter(
    (client) =>
      client.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <AgencyDashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Clients</h1>
              <p className="text-sm text-gray-500 mt-1">Gérez vos clients et leurs informations</p>
            </div>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un client..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] sm:text-sm">
              <Filter size={16} className="mr-2" />
              Filtres
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement des clients...</p>
            </div>
          </div>
        ) : filteredClients.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Liste des clients ({filteredClients.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date d'inscription
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Réservations
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0 mr-3">
                            <Users className="h-4 w-4 text-[#FFD700]" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{client.fullName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{client.city}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(client.registrationDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{client.reservations}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/agency/dashboard/clients/${client.id}`}
                          className="px-3 py-1 bg-[#FFD700] text-black rounded hover:bg-[#E6C200] hover:text-white transition-colors inline-flex items-center"
                        >
                          <Eye size={14} className="mr-1" />
                          Voir
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
              <Users size={24} className="text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-medium mb-2">Aucun client trouvé</h3>
            <p className="text-gray-600 text-sm mb-5 max-w-xs mx-auto">
              {searchQuery
                ? "Aucun client ne correspond à votre recherche. Essayez avec d'autres termes."
                : "Vous n'avez pas encore de clients associés à votre agence."}
            </p>
          </div>
        )}
      </div>
    </AgencyDashboardLayout>
  )
}
