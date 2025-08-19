"use client"

import AgencyDashboardLayout from "@/components/agency/dashboard/layout"
import { motion } from "framer-motion"
import { Bell, ChevronDown, Loader2, Search, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function AgencyNotificationsPage() {
  const [allClients, setAllClients] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sentSuccess, setSentSuccess] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter clients based on search query
  const filteredClients = allClients.filter(
    (client) =>
      client.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getUserNameById = (id: string) => {
    const user = allClients.find((client) => client.id === id);
    return user ? user.fullName : id;
  };

  const getUserNamesByIds = (ids: string[] | string) => {
    if (Array.isArray(ids)) {
      return ids.map(id => getUserNameById(id)).join(", ");
    }
    return getUserNameById(ids);
  };

  const getUserEmailById = (id: string) => {
    const user = allClients.find((client) => client.id === id);
    return user ? user.email : id;
  };

  const getUserEmailsByIds = (ids: string[] | string) => {
    if (Array.isArray(ids)) {
      return ids.map(id => getUserEmailById(id)).join(", ");
    }
    return getUserEmailById(ids);
  };

  const handleSendNotification = () => {
    if (!selectedClient || !message.trim()) return

    setIsSending(true)

    // Simulate API call
    setTimeout(() => {
      setIsSending(false)
      setSentSuccess(true)

      // Add the new notification to the list
      const newNotification = {
        id: String(notifications.length + 1),
        clientName: selectedClient.fullName,
        clientEmail: selectedClient.email,
        subject: "Nouvelle notification",
        message: message,
        date: new Date().toISOString(),
        read: false,
      }

      setNotifications([newNotification, ...notifications])

      // Reset form after 3 seconds
      setTimeout(() => {
        setSentSuccess(false)
        setSelectedClient(null)
        setMessage("")
      }, 3000)
    }, 1500)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Invalid date
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  }

  return (
    <AgencyDashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500 mt-1">Envoyez des notifications à vos clients</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement des données...</p>
            </div>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Envoyer une notification</h2>
              </div>
              <div className="p-5">
                {sentSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Notification envoyée</h3>
                    <p className="text-gray-600 mb-4">Votre notification a été envoyée avec succès au client.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Client selection dropdown */}
                    <div className="space-y-1.5">
                      <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                        Sélectionner un client *
                      </label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="w-full p-2.5 flex justify-between items-center border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all"
                        >
                          <span className={selectedClient ? "text-gray-900" : "text-gray-500"}>
                            {selectedClient ? selectedClient.fullName : "Sélectionnez un client"}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-200 ${
                              dropdownOpen ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown menu */}
                        {dropdownOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">
                            <div className="p-2">
                              <div className="relative">
                                <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
                                <input
                                  type="text"
                                  placeholder="Rechercher un client..."
                                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                              {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                  <div
                                    key={client.id}
                                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                                      selectedClient?.id === client.id ? "bg-[#FFD700]/10 font-medium" : ""
                                    }`}
                                    onClick={() => {
                                      setSelectedClient(client)
                                      setDropdownOpen(false)
                                      setSearchQuery("")
                                    }}
                                  >
                                    <div className="font-medium">{client.fullName}</div>
                                    <div className="text-xs text-gray-500">{client.email}</div>
                                  </div>
                                ))
                              ) : (
                                <div className="px-3 py-2 text-sm text-gray-500">Aucun client trouvé</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FFD700] focus:border-[#FFD700]"
                        placeholder="Écrivez votre message ici..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Send button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSendNotification}
                        disabled={isSending || !selectedClient || !message.trim()}
                        className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                          isSending || !selectedClient || !message.trim()
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-[#FFD700] text-black hover:bg-[#E6C200] hover:text-white"
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

            {/* Notifications history */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Historique des notifications</h2>
              </div>
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0">
                          <Bell className="h-5 w-5 text-[#FFD700]" />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{notification.subject}</h3>
                            <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-gray-600">{notification.message}</p>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Envoyé à: {getUserNamesByIds(notification.recipientUserIds)} ({getUserEmailsByIds(notification.recipientUserIds)})
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">Aucune notification envoyée</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </AgencyDashboardLayout>
  )
}
