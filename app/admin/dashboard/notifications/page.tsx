"use client"

import AdminDashboardLayout from "@/components/admin/dashboard/layout"
import { motion } from "framer-motion"
import { Bell, Loader2, Send, X } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminNotificationsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])

  // New notification form state
  const [showForm, setShowForm] = useState(false)
  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationContent, setNotificationContent] = useState("")
  const [recipientType, setRecipientType] = useState("all") // all, specific
  const [specificRecipients, setSpecificRecipients] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sentSuccess, setSentSuccess] = useState(false)

  const [allClients, setAllClients] = useState<any[]>([])
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([])

  // Fetch notifications from API
  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:5000/api/notifications")
      .then(res => res.json())
      .then(data => {
        setNotifications(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setAllClients(data))
  }, [])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Handle sending notification
  const handleSendNotification = async () => {
    if (!notificationTitle.trim() || !notificationContent.trim()) return

    setIsSending(true)
    try {
      const res = await fetch("http://localhost:5000/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: notificationTitle,
          content: notificationContent,
          recipientType,
          recipientUserIds: recipientType === "specific" ? selectedClientIds : [],
        }),
      })
      if (res.ok) {
        setSentSuccess(true)
        // Refetch notifications after sending
        fetch("http://localhost:5000/api/notifications")
          .then(res => res.json())
          .then(data => setNotifications(data))
      }
    } finally {
      setIsSending(false)
      setTimeout(() => {
        setSentSuccess(false)
        setNotificationTitle("")
        setNotificationContent("")
        setRecipientType("all")
        setSpecificRecipients("")
        setShowForm(false)
      }, 2000)
    }
  }

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500 mt-1">Gérez et envoyez des notifications aux clients</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-[#FFD700] text-black rounded-md text-sm font-medium hover:bg-[#E6C200] transition-colors flex items-center"
            >
              <Send size={16} className="mr-2" />
              Envoyer une notification
            </button>
          </div>
        </div>

        {/* New notification form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">Nouvelle notification</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <X size={18} />
              </button>
            </div>
            <div className="p-5">
              {sentSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Notification envoyée</h3>
                  <p className="text-gray-600 mb-4">
                    Votre notification a été envoyée avec succès aux destinataires sélectionnés.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Notification title */}
                  <div className="space-y-1.5">
                    <label htmlFor="notificationTitle" className="block text-sm font-medium text-gray-700">
                      Titre de la notification *
                    </label>
                    <input
                      type="text"
                      id="notificationTitle"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FFD700] focus:border-[#FFD700]"
                      placeholder="Entrez le titre de la notification"
                      value={notificationTitle}
                      onChange={(e) => setNotificationTitle(e.target.value)}
                    />
                  </div>

                  {/* Notification content */}
                  <div className="space-y-1.5">
                    <label htmlFor="notificationContent" className="block text-sm font-medium text-gray-700">
                      Contenu de la notification *
                    </label>
                    <textarea
                      id="notificationContent"
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FFD700] focus:border-[#FFD700]"
                      placeholder="Écrivez le contenu de votre notification ici..."
                      value={notificationContent}
                      onChange={(e) => setNotificationContent(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Recipient type */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">Destinataires *</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="allClients"
                          name="recipientType"
                          value="all"
                          checked={recipientType === "all"}
                          onChange={() => setRecipientType("all")}
                          className="h-4 w-4 text-[#FFD700] focus:ring-[#FFD700]"
                        />
                        <label htmlFor="allClients" className="ml-2 text-sm text-gray-700">
                          Tous les clients
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="specificClients"
                          name="recipientType"
                          value="specific"
                          checked={recipientType === "specific"}
                          onChange={() => setRecipientType("specific")}
                          className="h-4 w-4 text-[#FFD700] focus:ring-[#FFD700]"
                        />
                        <label htmlFor="specificClients" className="ml-2 text-sm text-gray-700">
                          Clients spécifiques (par email, séparés par des virgules)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Specific recipients */}
                  {recipientType === "specific" && (
                    <div className="space-y-1.5">
                      <label htmlFor="specificRecipients" className="block text-sm font-medium text-gray-700">
                        Sélectionner les destinataires *
                      </label>
                      <select
                        id="specificRecipients"
                        multiple
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FFD700] focus:border-[#FFD700]"
                        value={selectedClientIds}
                        onChange={e => {
                          const options = Array.from(e.target.selectedOptions);
                          setSelectedClientIds(options.map(option => option.value));
                        }}
                      >
                        {allClients.map(client => (
                          <option key={client.id} value={client.id}>
                            {client.fullName || client.email}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Send button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleSendNotification}
                      disabled={
                        isSending ||
                        !notificationTitle.trim() ||
                        !notificationContent.trim() ||
                        (recipientType === "specific" && selectedClientIds.length === 0)
                      }
                      className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                        isSending ||
                        !notificationTitle.trim() ||
                        !notificationContent.trim() ||
                        (recipientType === "specific" && selectedClientIds.length === 0)
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-[#FFD700] text-black hover:bg-[#E6C200]"
                      } transition-colors`}
                    >
                      {isSending ? (
                        <>
                          <Loader2 size={16} className="animate-spin mr-2" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          Envoyer la notification
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Notifications list */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement des notifications...</p>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Aucune notification</h3>
            <p className="text-gray-600 max-w-md mb-6">
              Les notifications envoyées s'afficheront ici. Utilisez le bouton ci-dessus pour envoyer une nouvelle
              notification.
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
                      Titre
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contenu
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destinataires
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date d'envoi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <tr key={notification.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{notification.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {notification.content.length > 50
                          ? `${notification.content.substring(0, 50)}...`
                          : notification.content}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {notification.recipientType === "all"
                          ? "Tous les clients"
                          : `${notification.recipientUserIds?.length || 0} clients spécifiques`}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{formatDate(notification.sentAt)}</td>
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
