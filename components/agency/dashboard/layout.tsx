"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, Users, Calendar, LogOut, Menu, X, Bell, BarChart2, ChevronLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"

interface AgencyDashboardLayoutProps {
  children: React.ReactNode
}

export default function AgencyDashboardLayout({ children }: AgencyDashboardLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  // Initialize sidebar state based on device
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile])

  const menuItems = [
    { name: "Tableau de bord", icon: Home, href: "/agency/dashboard" },
    { name: "Clients", icon: Users, href: "/agency/dashboard/clients" },
    { name: "Réservations", icon: Calendar, href: "/agency/dashboard/reservations" },
    { name: "Notifications", icon: Bell, href: "/agency/dashboard/notifications" },
    { name: "Rapports", icon: BarChart2, href: "/agency/dashboard/reports" },
  ]

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64"
            : sidebarCollapsed
              ? "w-16"
              : "w-64"
        }`}
      >
        <div className="flex flex-col h-full">
          <div
            className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 ${sidebarCollapsed && !isMobile ? "justify-center px-2" : ""}`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md overflow-hidden border-2 border-[#FFD700]/30 mr-2">
                <img src="/logo.jpg" alt="Qafilat Tayba Logo" className="w-full h-full object-cover" />
              </div>
              {(!sidebarCollapsed || isMobile) && <span className="font-semibold text-gray-800">Espace Agence</span>}
            </div>
            {isMobile && (
              <button className="p-1 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(false)}>
                <X size={18} />
              </button>
            )}
          </div>

          {/* Toggle button - inside sidebar */}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center p-2 mx-auto my-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft
                size={18}
                className={`text-gray-500 transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`}
              />
            </button>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-[#FFD700]/10 text-[#FFD700]" : "text-gray-700 hover:bg-gray-100"
                  } ${sidebarCollapsed && !isMobile ? "justify-center px-2" : ""}`}
                  title={sidebarCollapsed && !isMobile ? item.name : ""}
                >
                  <item.icon
                    size={18}
                    className={`${isActive ? "text-[#FFD700]" : "text-gray-500"} ${sidebarCollapsed && !isMobile ? "" : "mr-3"}`}
                  />
                  {(!sidebarCollapsed || isMobile) && item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout button */}
          <div className={`p-4 border-t border-gray-200 ${sidebarCollapsed && !isMobile ? "p-2" : ""}`}>
            <Link
              href="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors ${
                sidebarCollapsed && !isMobile ? "justify-center px-2" : ""
              }`}
              title={sidebarCollapsed && !isMobile ? "Déconnexion" : ""}
            >
              <LogOut size={18} className={sidebarCollapsed && !isMobile ? "" : "mr-3"} />
              {(!sidebarCollapsed || isMobile) && "Déconnexion"}
            </Link>
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
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 lg:hidden">
          <button className="p-1 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Espace Agence</h1>
          <div className="w-8"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Page content */}
        <div className="p-4 md:p-6 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
