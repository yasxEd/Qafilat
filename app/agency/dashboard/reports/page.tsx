"use client"

import AgencyDashboardLayout from "@/components/agency/dashboard/layout"
import { motion } from "framer-motion"
import { Eye, FileText, Filter, Loader2, Search, Send } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AgencyReportsPage() {
  const [reportTitle, setReportTitle] = useState("")
  const [reportContent, setReportContent] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [sentSuccess, setSentSuccess] = useState(false)
  const [reports, setReports] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/reports")
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Filter reports based on search query
  const filteredReports = reports.filter((report) => report.title?.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSendReport = () => {
    if (!reportTitle.trim() || !reportContent.trim()) return;

    setIsSending(true);

    // Get agencyId from localStorage (adjust if you use context or another method)
    const agencyId = typeof window !== "undefined" ? localStorage.getItem("agencyId") : null;
    if (!agencyId) {
      setIsSending(false);
      alert("Impossible de trouver l'agence connectée.");
      return;
    }

    fetch("http://localhost:5000/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: reportTitle,
        content: reportContent,
        agencyId: agencyId,
      }),
    })
      .then(res => res.json())
      .then(newReport => {
        setIsSending(false);
        setSentSuccess(true);
        setReports([newReport, ...reports]);
        setTimeout(() => {
          setSentSuccess(false);
          setReportTitle("");
          setReportContent("");
        }, 3000);
      })
      .catch(() => setIsSending(false));
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; bg: string }> = {
      soumis: { color: "text-blue-800", bg: "bg-blue-100" },
      approuvé: { color: "text-green-800", bg: "bg-green-100" },
      rejeté: { color: "text-red-800", bg: "bg-red-100" },
    }

    const statusStyle = statusMap[status] || { color: "text-gray-800", bg: "bg-gray-100" }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.color}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <AgencyDashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Rapports</h1>
              <p className="text-sm text-gray-500 mt-1">Envoyez des rapports à l'administration</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <Loader2 size={40} className="animate-spin text-[#FFD700] mb-4" />
              <p className="text-gray-500">Chargement des rapports...</p>
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
                <h2 className="font-semibold text-gray-800">Créer un rapport</h2>
              </div>
              <div className="p-5">
                {sentSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Rapport envoyé</h3>
                    <p className="text-gray-600 mb-4">Votre rapport a été envoyé avec succès à l'administration.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Report title */}
                    <div className="space-y-1.5">
                      <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-700">
                        Titre du rapport *
                      </label>
                      <input
                        type="text"
                        id="reportTitle"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FFD700] focus:border-[#FFD700]"
                        placeholder="Entrez le titre du rapport"
                        value={reportTitle}
                        onChange={(e) => setReportTitle(e.target.value)}
                      />
                    </div>

                    {/* Report content */}
                    <div className="space-y-1.5">
                      <label htmlFor="reportContent" className="block text-sm font-medium text-gray-700">
                        Contenu du rapport *
                      </label>
                      <textarea
                        id="reportContent"
                        rows={10}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FFD700] focus:border-[#FFD700]"
                        placeholder="Écrivez le contenu de votre rapport ici..."
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Send button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSendReport}
                        disabled={isSending || !reportTitle.trim() || !reportContent.trim()}
                        className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                          isSending || !reportTitle.trim() || !reportContent.trim()
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
                            Envoyer le rapport
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Reports history */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un rapport..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] sm:text-sm">
                  <Filter size={16} className="mr-2" />
                  Filtres
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Historique des rapports</h2>
              </div>
              {filteredReports.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0 mr-3">
                                <FileText className="h-4 w-4 text-[#FFD700]" />
                              </div>
                              <div className="text-sm font-medium text-gray-900">{report.title}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(report.date)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(report.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/agency/dashboard/reports/${report.id}`}
                              className="px-3 py-1 bg-[#FFD700] text-black rounded hover:bg-[#E6C200] hover:text-white transition-colors inline-flex items-center"
                            >
                              <Eye size={14} className="mr-1" />
                              Voir
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500">Aucun rapport trouvé</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </AgencyDashboardLayout>
  )
}
