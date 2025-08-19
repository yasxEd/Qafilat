"use client"
import { motion } from "framer-motion"
import { Bell, Calendar, Package, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState([
    { title: "Clients", value: "0", icon: Users, color: "bg-blue-500" },
    { title: "Agences", value: "0", icon: Package, color: "bg-purple-500" },
    { title: "Réservations", value: "0", icon: Calendar, color: "bg-amber-500" },
  ])

  const [recentReservations, setRecentReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [recentNotifications, setRecentNotifications] = useState<any[]>([])
  const [loadingNotifications, setLoadingNotifications] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, agenciesRes, reservationsRes] = await Promise.all([
          fetch("http://localhost:5000/api/users"),
          fetch("http://localhost:5000/api/agencies"),
          fetch("http://localhost:5000/api/reservations"),
        ])
        const users = await usersRes.json()
        const agencies = await agenciesRes.json()
        const reservations = await reservationsRes.json()

        setStats([
          { title: "Clients", value: users.length.toString(), icon: Users, color: "bg-blue-500" },
          { title: "Agences", value: agencies.length.toString(), icon: Package, color: "bg-purple-500" },
          { title: "Réservations", value: reservations.length.toString(), icon: Calendar, color: "bg-amber-500" },
        ])
      } catch (error) {
        // Optionally handle error
      }
    }

    fetchStats()
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/api/reservations")
      .then(res => res.json())
      .then(data => {
        // Sort by date (descending) and take the 3 most recent
        const sorted = data.sort((a: any, b: any ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setRecentReservations(sorted.slice(0, 3))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/api/notifications")
      .then(res => res.json())
      .then(data => {
        // Sort by sentAt (descending) and take the 3 most recent
        const sorted = data.sort((a: any, b: any) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
        setRecentNotifications(sorted.slice(0, 3))
        setLoadingNotifications(false)
      })
      .catch(() => setLoadingNotifications(false))
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-sm md:text-base text-gray-600">Bienvenue dans votre espace d'administration</p>
      </div>

      {/* Stats Grid - Horizontal scrolling on mobile */}
      <div className="mb-6 overflow-x-auto md:overflow-visible pb-2">
        <div className="flex md:grid md:grid-cols-3 gap-4 min-w-max md:min-w-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-[180px] md:w-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mr-3`}>
                    <stat.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Two-column layout for tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <Calendar size={18} className="text-[#FFD700] mr-2" />
              <h2 className="font-semibold text-gray-800">Réservations récentes</h2>
            </div>
            <Link href="/admin/dashboard/reservations" className="text-sm text-[#FFD700] hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="p-4">
            {loading ? (
              <div className="text-gray-500 text-sm">Chargement...</div>
            ) : recentReservations.length === 0 ? (
              <div className="text-gray-500 text-sm">Aucune réservation récente.</div>
            ) : (
              recentReservations.map((reservation) => (
                <div key={reservation.id} className="border-b border-gray-100 pb-3 mb-3 last:mb-0 last:pb-0 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{reservation.travelerName || "-"}</p>
                      <p className="text-sm text-gray-600">
                        {reservation.packageType} - {reservation.departureCity}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      reservation.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : reservation.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {reservation.status === "confirmed"
                        ? "Confirmée"
                        : reservation.status === "pending"
                        ? "En attente"
                        : "Annulée"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <p className="text-gray-500">
                      {reservation.dateFrom
                        ? new Date(reservation.dateFrom).toLocaleDateString("fr-FR")
                        : "-"}
                    </p>
                    <Link
                      href={`/admin/dashboard/reservations/${reservation.id}`}
                      className="text-[#FFD700] hover:underline font-medium"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Notifications - Dynamic from API */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <Bell size={18} className="text-[#FFD700] mr-2" />
              <h2 className="font-semibold text-gray-800">Notifications</h2>
            </div>
            <Link href="/admin/dashboard/notifications" className="text-sm text-[#FFD700] hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="p-4">
            {loadingNotifications ? (
              <div className="text-gray-500 text-sm">Chargement...</div>
            ) : recentNotifications.length === 0 ? (
              <div className="text-gray-500 text-sm">Aucune notification récente.</div>
            ) : (
              recentNotifications.map((notification) => (
                <div key={notification.id} className="border-b border-gray-100 pb-3 mb-3 last:mb-0 last:pb-0 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.content.length > 50 ? `${notification.content.substring(0, 50)}...` : notification.content}</p>
                    </div>
                    <span className="text-xs text-gray-500">{notification.sentAt ? new Date(notification.sentAt).toLocaleDateString("fr-FR") : "-"}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <p className="text-gray-500">
                      {notification.recipientType === "all"
                        ? "Envoyé à tous les clients"
                        : `${notification.recipientUserIds?.length || 0} clients spécifiques`}
                    </p>
                    <Link href="/admin/dashboard/notifications" className="text-[#FFD700] hover:underline font-medium">
                      Voir détails
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
