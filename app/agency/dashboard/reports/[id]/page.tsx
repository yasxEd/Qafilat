"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, Loader2, Building, MapPin } from "lucide-react"
import AgencyDashboardLayout from "@/components/agency/dashboard/layout"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function AgencyReportDetailsPage() {
  const params = useParams()
  const reportId = params.id
  const [report, setReport] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    fetch(`${apiUrl}/api/reports/${reportId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Rapport non trouvé")
        }
        return res.json()
      })
      .then((data) => {
        setReport(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching report:", error)
        setError("Impossible de charger le rapport demandé")
        setIsLoading(false)
      })
  }, [reportId])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Format markdown content
  const formatContent = (content: string) => {
    if (!content) return []

    const lines = content.split("\n")
    const formattedContent = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith("# ")) {
        formattedContent.push(
          <h1 key={i} className="text-2xl font-bold mb-4">
            {line.substring(2)}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        formattedContent.push(
          <h2 key={i} className="text-xl font-semibold mt-6 mb-3">
            {line.substring(3)}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        formattedContent.push(
          <h3 key={i} className="text-lg font-medium mt-5 mb-2">
            {line.substring(4)}
          </h3>,
        )
      } else if (line.startsWith("- ")) {
        formattedContent.push(
          <li key={i} className="ml-6 mb-1">
            {line.substring(2)}
          </li>,
        )
      } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
        formattedContent.push(
          <li key={i} className="ml-6 mb-1 list-decimal">
            {line.substring(3)}
          </li>,
        )
      } else if (line.trim() === "") {
        formattedContent.push(<div key={i} className="h-2"></div>)
      } else {
        formattedContent.push(
          <p key={i} className="mb-3">
            {line}
          </p>,
        )
      }
    }

    return formattedContent
  }

  return (
    <AgencyDashboardLayout>
      <div className="space-y-6">
        {/* Back button */}
        <div>
          <Link
            href="/agency/dashboard/reports"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour aux rapports
          </Link>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement du rapport...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <FileText size={24} className="text-red-500" />
            </div>
            <h3 className="text-gray-900 font-medium mb-2">{error}</h3>
            <p className="text-gray-600 text-sm mb-5">Le rapport que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link
              href="/agency/dashboard/reports"
              className="px-4 py-2 bg-[#FFD700] text-black text-sm font-medium rounded-md hover:bg-[#E6C200] transition-colors"
            >
              Retour aux rapports
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar with agency info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 sticky top-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-[#FFD700]" />
                  </div>
                  <h3 className="font-medium text-gray-900">Détails du rapport</h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Statut</p>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {report?.status || "En attente"}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-500 mb-1">Date de soumission</p>
                    <p className="text-gray-900">{report?.date ? formatDate(report.date) : "Non disponible"}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-gray-500 mb-2">Informations de l'agence</p>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Building size={14} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-gray-900">{report?.agency?.name || "Non disponible"}</p>
                      </div>
                      <div className="flex items-start">
                        <MapPin size={14} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-gray-900">{report?.agency?.city || "Non disponible"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">{report?.title || "Rapport sans titre"}</h1>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">{formatContent(report?.content || "Aucun contenu disponible")}</div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AgencyDashboardLayout>
  )
}
