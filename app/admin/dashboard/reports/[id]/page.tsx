"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Building2, Calendar, FileText, Loader2 } from "lucide-react"
import AdminDashboardLayout from "@/components/admin/dashboard/layout"

export default function AdminReportDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const reportId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [report, setReport] = useState<any>(null)

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

  // Fetch report data
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setIsLoading(true)
        // Replace with your actual API endpoint
        const response = await fetch(`/api/reports/${reportId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch report data")
        }

        const data = await response.json()
        setReport(data)
      } catch (error) {
        console.error("Error fetching report data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReportData()
  }, [reportId])

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Page header with back button */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-500" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {isLoading ? "Chargement..." : report?.title || "Détails du rapport"}
                </h1>
                <p className="text-sm text-gray-500 mt-1">Rapport soumis par une agence</p>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement du rapport...</p>
            </div>
          </div>
        ) : !report ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Rapport non trouvé</h3>
            <p className="text-gray-600 max-w-md mb-6">Ce rapport n'existe pas ou a été supprimé.</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-[#FFD700] text-black rounded-md text-sm font-medium hover:bg-[#E6C200] transition-colors"
            >
              Retour
            </button>
          </div>
        ) : (
          <>
            {/* Report metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Informations du rapport</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Building2 className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Agence</p>
                        <p className="text-gray-900">{report.agencyName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date de soumission</p>
                        <p className="text-gray-900">{formatDate(report.submittedAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Report content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Contenu du rapport</h2>
              </div>
              <div className="p-5">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{report.title}</h3>
                  <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-gray-700">{report.content}</div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </AdminDashboardLayout>
  )
}
