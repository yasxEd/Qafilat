"use client"

import ClientDashboardLayout from "@/components/client/dashboard/layout";
import { motion } from "framer-motion";
import { Bell, Calendar, ChevronRight, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getUserIdFromToken(token: string | null) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch {
    return null;
  }
}

export default function ClientDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userReservations, setUserReservations] = useState<any[]>([]);
  const [userNotifications, setUserNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("currentUser:", currentUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken(token);

    if (!token || !userId) {
      router.replace("/login?redirect=/client/dashboard");
      return;
    } else {
      fetch(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(userData => {
          setCurrentUser(userData);
          // Fetch reservations for the current user
          fetch(`http://localhost:5000/api/reservations/user/${userData.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(res => res.json())
            .then(reservationsData => {
              setUserReservations(reservationsData);
              fetch(`http://localhost:5000/api/notifications/user/${userData.id}`, {
                headers: { Authorization: `Bearer ${token}` }
              })
                .then(res => res.json())
                .then(notificationsData => {
                  setUserNotifications(notificationsData);
                  setLoading(false);
                });
            });
        });
    }
  }, [router]);

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        {/* Page header with improved styling */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-sm text-gray-500 mt-1">Bienvenue dans votre espace client</p>
            </div>
            <Link
              href="/client/dashboard/reservations"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#FFD700] text-black text-sm font-medium rounded-md hover:bg-[#E6C200] transition-colors shadow-sm self-start sm:self-center"
            >
              <PlusCircle size={16} className="mr-2" />
              Nouvelle réservation
            </Link>
          </div>
        </div>

        {/* User welcome card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-[#FFD700]/10 to-[#FFD700]/5 p-6 rounded-lg border border-[#FFD700]/20"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
              <User size={24} className="text-[#FFD700]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Bienvenue dans votre espace</h2>
              <p className="text-sm text-gray-600">Gérez vos réservations et suivez vos notifications</p>
            </div>
          </div>
        </motion.div>
        

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current User's Reservations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center">
                <Calendar size={18} className="text-[#FFD700] mr-2" />
                <h2 className="font-semibold text-gray-800">Mes réservations</h2>
              </div>
              <Link
                href="/client/dashboard/reservations"
                className="text-sm text-[#FFD700] hover:text-[#E6C200] font-medium inline-flex items-center"
              >
                Voir tout
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-gray-500 text-center">Chargement...</div>
              ) : userReservations.length === 0 ? (
                <div className="text-gray-500 text-center">Aucune réservation trouvée.</div>
              ) : (
                <ul className="space-y-4">
                  {userReservations.map(res => (
                    <li key={res.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="font-medium text-gray-900">{res.packageType}</div>
                      <div className="text-sm text-gray-600">Statut: {res.status}</div>
                      <div className="text-sm text-gray-600">Date: {res.dateFrom}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center">
                <Bell size={18} className="text-[#FFD700] mr-2" />
                <h2 className="font-semibold text-gray-800">Notifications</h2>
              </div>
              <Link
                href="/client/dashboard/notifications"
                className="text-sm text-[#FFD700] hover:text-[#E6C200] font-medium inline-flex items-center"
              >
                Voir tout
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center w-full">
              {loading ? (
                <div className="text-gray-500 text-center">Chargement...</div>
              ) : Array.isArray(userNotifications) && userNotifications.length > 0 ? (
                <ul className="space-y-4 w-full">
                  {userNotifications.map((notif: any) => (
                    <li key={notif.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 w-full text-left">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-gray-900">{notif.title || 'Notification'}</div>
                        {notif.recipientType === 'all' && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30">Globale</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{notif.content}</div>
                      <div className="text-xs text-gray-400 mt-1">{notif.sentAt ? new Date(notif.sentAt).toLocaleString() : ''}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                    <Bell size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-gray-900 font-medium mb-2">Aucune notification</h3>
                  <p className="text-gray-600 text-sm mb-5 max-w-xs mx-auto">
                    Vous n'avez pas de nouvelles notifications. Les mises à jour importantes apparaîtront ici.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick links section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Accès rapide</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/client/dashboard/reservations"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar size={24} className="text-[#FFD700] mb-2" />
              <span className="text-sm font-medium text-gray-700">Réservations</span>
            </Link>
            <Link
              href="/client/dashboard/notifications"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell size={24} className="text-[#FFD700] mb-2" />
              <span className="text-sm font-medium text-gray-700">Notifications</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </ClientDashboardLayout>
  )
}
