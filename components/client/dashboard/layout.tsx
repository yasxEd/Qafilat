"use client"

import type React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Bell, Calendar, ChevronLeft, ExternalLink, Home, LogOut, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Initialize sidebar state based on device
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile])

  const menuItems = [
    { name: "Tableau de bord", icon: Home, href: "/client/dashboard" },
    { name: "Mes réservations", icon: Calendar, href: "/client/dashboard/reservations" },
    { name: "Notifications", icon: Bell, href: "/client/dashboard/notifications" },
  ]

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    // Remove other user data if needed
    router.push("/") // Redirect to home page
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0 w-64 shadow-xl"
              : "-translate-x-full w-64"
            : sidebarCollapsed
              ? "w-16 shadow-sm"
              : "w-64 shadow-sm"
        }`}
      >
        <div className="flex flex-col h-full">
          <div
            className={`flex items-center justify-between px-4 py-4 border-b border-gray-100 ${sidebarCollapsed && !isMobile ? "justify-center px-2" : ""}`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md overflow-hidden border-2 border-[#FFD700]/30 mr-2 shadow-sm">
                <img src="/logo.jpg" alt="Qafilat Tayba Logo" className="w-full h-full object-cover" />
              </div>
              {(!sidebarCollapsed || isMobile) && (
                <span className="font-semibold text-gray-800 text-sm">Espace Client</span>
              )}
            </div>
            {isMobile && (
              <button
                className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Toggle button - inside sidebar */}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center p-2 mx-auto my-2 rounded-full hover:bg-gray-100 transition-colors group"
            >
              <ChevronLeft
                size={16}
                className={`text-gray-500 transition-transform duration-300 group-hover:text-gray-700 ${sidebarCollapsed ? "rotate-180" : ""}`}
              />
            </button>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-hide">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#FFD700]/10 text-[#FFD700] border-l-2 border-[#FFD700]"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  } ${sidebarCollapsed && !isMobile ? "justify-center px-2" : ""}`}
                  title={sidebarCollapsed && !isMobile ? item.name : ""}
                >
                  <item.icon
                    size={18}
                    className={`${isActive ? "text-[#FFD700]" : "text-gray-500"} ${sidebarCollapsed && !isMobile ? "" : "mr-3"} transition-colors`}
                  />
                  {(!sidebarCollapsed || isMobile) && (
                    <span className={`transition-opacity duration-200 ${isActive ? "font-medium" : ""}`}>
                      {item.name}
                    </span>
                  )}
                  {isActive && !sidebarCollapsed && !isMobile && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FFD700]"></div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Logout and Home buttons */}
          <div className={`p-4 border-t border-gray-200 ${sidebarCollapsed && !isMobile ? "p-2" : ""}`}>
            <Link
              href="/"
              className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors mb-2 ${
                sidebarCollapsed && !isMobile ? "justify-center px-2" : ""
              }`}
              title={sidebarCollapsed && !isMobile ? "Page d'accueil" : ""}
            >
              <ExternalLink
                size={18}
                className={`transition-transform ${sidebarCollapsed && !isMobile ? "" : "mr-3"}`}
              />
              {(!sidebarCollapsed || isMobile) && "Page d'accueil"}
            </Link>
            <button
              onClick={handleLogout}
              className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors ${
                sidebarCollapsed && !isMobile ? "justify-center px-2" : ""
              }`}
              title={sidebarCollapsed && !isMobile ? "Déconnexion" : ""}
            >
              <LogOut size={18} className={`transition-transform ${sidebarCollapsed && !isMobile ? "" : "mr-3"}`} />
              {(!sidebarCollapsed || isMobile) && "Déconnexion"}
            </button>
          </div>
        </div>
      </div>

      {/* Main content - adjusts based on sidebar state */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Mobile header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 lg:hidden shadow-sm">
          <button
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 flex items-center">
            <div className="w-6 h-6 rounded-md overflow-hidden border-2 border-[#FFD700]/30 mr-2">
              <img src="/logo.jpg" alt="Qafilat Tayba Logo" className="w-full h-full object-cover" />
            </div>
            Espace Client
          </h1>
          <div className="w-8"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Page content */}
        <div className="p-4 md:p-6 overflow-auto max-h-[calc(100vh-56px)] lg:max-h-screen">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}
