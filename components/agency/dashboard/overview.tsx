"use client"
import { motion } from "framer-motion"
import { BarChart2, Bell, Calendar, Eye, PlusCircle, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface BaseBooking {
  id: string
  packageType: string
  departureCity: string
  travelerName: string
  date: string
}

interface HotelBooking extends BaseBooking {
  packageType: "hotel"
  destination: string
  duration: string
  rooms: number
  adults: number
}

interface OmraBooking extends BaseBooking {
  packageType: "omra"
}

type Booking = HotelBooking | OmraBooking

export default function AgencyDashboardOverview() {
  // State for API data
  const [stats, setStats] = useState([
    {
      title: "Clients",
      value: "-",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Réservations",
      value: "-",
      icon: Calendar,
      color: "bg-amber-500",
    },
    {
      title: "Rapports",
      value: "-",
      icon: BarChart2,
      color: "bg-purple-500",
    },
  ])

  // Add these state variables instead:
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])
  const [isLoadingBookings, setIsLoadingBookings] = useState(true)
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true)
  const [isLoadingReports, setIsLoadingReports] = useState(true)

  const getCityLabel = (cityValue: string) => {
    const cities = [
      { value: "casablanca", label: "Casablanca" },
      { value: "rabat", label: "Rabat" },
      { value: "marrakech", label: "Marrakech" },
      { value: "tanger", label: "Tanger" },
    ]

    return cities.find((city) => city.value === cityValue)?.label || cityValue
  }

  // Format booking display based on package type
  const formatBookingDisplay = (booking: Booking): string => {
    if (booking.packageType === "hotel") {
      return `${booking.packageType} - ${getCityLabel((booking as HotelBooking).destination)}`
    }
    return `${booking.packageType} - ${getCityLabel(booking.departureCity)}`
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}
    fetch("http://localhost:5000/api/agency/stats", { headers })
      .then((res) => res.json())
      .then((data) => {
        setStats([
          { ...stats[0], value: data.clients ?? "-" },
          { ...stats[1], value: data.reservations ?? "-" },
          { ...stats[2], value: data.reports ?? "-" },
        ])
      })
      .catch(() => {
        setStats([
          { ...stats[0], value: "-" },
          { ...stats[1], value: "-" },
          { ...stats[2], value: "-" },
        ])
      })
  }, [])

  // Add these useEffect hooks to fetch real data:
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    setIsLoadingBookings(true)
    fetch("http://localhost:5000/api/reservations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // Sort by date (descending) and take the most recent
        const sorted = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setRecentBookings(sorted.slice(0, 2))
        setIsLoadingBookings(false)
      })
      .catch(() => setIsLoadingBookings(false))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    setIsLoadingNotifications(true)
    fetch("http://localhost:5000/api/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data.slice(0, 1))
        setIsLoadingNotifications(false)
      })
      .catch(() => setIsLoadingNotifications(false))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    setIsLoadingReports(true)
    fetch("http://localhost:5000/api/reports", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setReports(data.slice(0, 1))
        setIsLoadingReports(false)
      })
      .catch(() => setIsLoadingReports(false))
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-sm md:text-base text-gray-600">Bienvenue dans votre espace agence</p>
      </div>

      {/* Stats Grid - Horizontal scrolling on mobile */}
      <div className="mb-6 overflow-x-auto pb-2">
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
            <Link href="/agency/dashboard/reservations" className="text-sm text-[#FFD700] hover:underline">
              Voir tout
            </Link>
          </div>
          {isLoadingBookings ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">Chargement...</p>
            </div>
          ) : recentBookings.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
                        <Calendar className="h-5 w-5 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 capitalize">
                          {formatBookingDisplay(booking)}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {booking.travelerName} • {booking.date}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/agency/dashboard/reservations/${booking.id}`}
                      className="text-sm text-[#FFD700] hover:text-[#E6C200] font-medium inline-flex items-center"
                    >
                      <Eye size={14} className="mr-1" />
                      Voir
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={24} className="text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-medium mb-1">Aucune réservation</h3>
              <p className="text-gray-600 text-sm mb-4">Les réservations de vos clients apparaîtront ici</p>
            </div>
          )}
        </motion.div>

        {/* Notifications */}
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
            <Link href="/agency/dashboard/notifications" className="text-sm text-[#FFD700] hover:underline">
              Voir tout
            </Link>
          </div>
          {isLoadingNotifications ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">Chargement...</p>
            </div>
          ) : notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
                        <Bell className="h-5 w-5 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.message} • {notification.date}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/agency/dashboard/notifications"
                      className="text-sm text-[#FFD700] hover:text-[#E6C200] font-medium inline-flex items-center"
                    >
                      <Eye size={14} className="mr-1" />
                      Voir
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell size={24} className="text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-medium mb-1">Aucune notification</h3>
              <p className="text-gray-600 text-sm mb-4">Les notifications apparaîtront ici</p>
              <Link
                href="/agency/dashboard/notifications"
                className="px-4 py-2 bg-[#FFD700] text-black text-sm font-medium rounded-md hover:bg-[#E6C200] hover:text-white transition-colors inline-flex items-center"
              >
                <PlusCircle size={16} className="mr-2" />
                Envoyer une notification
              </Link>
            </div>
          )}
        </motion.div>

        {/* Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <BarChart2 size={18} className="text-[#FFD700] mr-2" />
              <h2 className="font-semibold text-gray-800">Rapports</h2>
            </div>
            <Link href="/agency/dashboard/reports" className="text-sm text-[#FFD700] hover:underline">
              Voir tout
            </Link>
          </div>
          {isLoadingReports ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">Chargement...</p>
            </div>
          ) : reports.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {reports.map((report) => (
                <div key={report.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
                        <BarChart2 className="h-5 w-5 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{report.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {report.date} • <span className="capitalize">{report.status}</span>
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/agency/dashboard/reports/${report.id}`}
                      className="text-sm text-[#FFD700] hover:text-[#E6C200] font-medium inline-flex items-center"
                    >
                      <Eye size={14} className="mr-1" />
                      Voir
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BarChart2 size={24} className="text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-medium mb-1">Aucun rapport</h3>
              <p className="text-gray-600 text-sm mb-4">Les rapports apparaîtront ici</p>
              <Link
                href="/agency/dashboard/reports"
                className="px-4 py-2 bg-[#FFD700] text-black text-sm font-medium rounded-md hover:bg-[#E6C200] hover:text-white transition-colors inline-flex items-center"
              >
                <PlusCircle size={16} className="mr-2" />
                Créer un rapport
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
