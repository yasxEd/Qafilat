"use client"

import ClientDashboardLayout from "@/components/client/dashboard/layout"
import { motion } from "framer-motion"
import { AlertCircle, ArrowLeft, Bell, Calendar, CheckCircle, ChevronRight, Info, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

function getUserIdFromToken(token: string | null) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch {
    return null;
  }
}

export default function ClientNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken(token);
    if (!token || !userId) {
      setIsLoading(false);
      setNotifications([]);
      return;
    }
    fetch(`http://localhost:5000/api/notifications/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setIsLoading(false);
      })
      .catch(() => {
        setNotifications([]);
        setIsLoading(false);
      });
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // Get background color based on notification type
  const getNotificationBgColor = (type: string, isRead: boolean) => {
    if (isRead) return "bg-white"

    switch (type) {
      case "success":
        return "bg-green-50"
      case "warning":
        return "bg-amber-50"
      case "info":
        return "bg-blue-50"
      default:
        return "bg-gray-50"
    }
  }

  const handleViewNotification = (notification: any) => {
    setSelectedNotification(notification)

    // Mark as read
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)),
    )
  }

  const handleCloseNotification = () => {
    setSelectedNotification(null)
  }

  const markAllAsRead = () => {
    setNotifications((prevNotifications) => prevNotifications.map((n) => ({ ...n, isRead: true })))
  }

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        {/* Page header with improved styling */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {selectedNotification ? (
                <div className="flex items-center">
                  <button
                    onClick={handleCloseNotification}
                    className="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Détail de la notification</h1>
                    <p className="text-sm text-gray-500 mt-1">Message complet</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
                  <p className="text-sm text-gray-500 mt-1">Restez informé des mises à jour importantes</p>
                </div>
              )}
            </div>

            {notifications.length > 0 && !selectedNotification && (
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors shadow-sm self-start sm:self-center"
              >
                Tout marquer comme lu
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement de vos notifications...</p>
            </div>
          </div>
        ) : selectedNotification ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-gray-100 flex items-center">
              {getNotificationIcon(selectedNotification.type)}
              <h2 className="font-semibold text-gray-800 ml-2">{selectedNotification.title}</h2>
            </div>

            <div className="p-5">
              <div className="mb-4 text-sm text-gray-500">{formatDate(selectedNotification.sentAt)}</div>
              <p className="text-gray-700 mb-6">{selectedNotification.content}</p>

              {selectedNotification.relatedTo === "reservation" && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    className="px-4 py-2 bg-[#FFD700] text-black text-sm font-medium rounded-md hover:bg-[#E6C200] transition-colors inline-flex items-center shadow-sm"
                    onClick={() => {
                      handleCloseNotification()
                      // Navigate to the reservations page
                      window.location.href = "/client/dashboard/reservations"
                    }}
                  >
                    <Calendar size={16} className="mr-2" />
                    Voir la réservation
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ) : notifications.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Vos notifications ({notifications.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${getNotificationBgColor(notification.type, notification.isRead)}`}
                  onClick={() => handleViewNotification(notification)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className={`font-medium ${notification.isRead ? "text-gray-700" : "text-gray-900"}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">{formatDate(notification.sentAt).split(" à")[0]}</span>
                      </div>
                      <p
                        className={`text-sm mt-1 line-clamp-2 ${notification.isRead ? "text-gray-500" : "text-gray-700"}`}
                      >
                        {notification.content}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 flex-shrink-0 self-center" />
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
              <h2 className="font-semibold text-gray-800">Vos notifications</h2>
            </div>
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                <Bell size={24} className="text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-medium mb-2">Aucune notification</h3>
              <p className="text-gray-600 text-sm mb-4 max-w-xs mx-auto">
                Vous n'avez pas de nouvelles notifications. Les mises à jour importantes apparaîtront ici.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </ClientDashboardLayout>
  )
}
