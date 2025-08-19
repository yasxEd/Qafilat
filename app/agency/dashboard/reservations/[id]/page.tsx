"use client"

import AgencyDashboardLayout from "@/components/agency/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Clock, Download, Eye, FileText, Upload, User, X } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ReservationDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const reservationId = params.id as string
  const [reservation, setReservation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [previewDocument, setPreviewDocument] = useState<{
    id: string
    name: string
    url: string
  } | null>(null)

  useEffect(() => {
    setIsLoading(true)
    const token = localStorage.getItem("token")
    if (!token) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/reservations/${reservationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setReservation(data)
        setIsLoading(false)
      })
      .catch(() => {
        setReservation(null)
        setIsLoading(false)
      })
  }, [reservationId])

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Get city label from value
  const getCityLabel = (cityValue: string | undefined) => {
    if (!cityValue) return ""

    const cities = [
      { value: "casablanca", label: "Casablanca" },
      { value: "rabat", label: "Rabat" },
      { value: "marrakech", label: "Marrakech" },
      { value: "tanger", label: "Tanger" },
    ]

    return cities.find((city) => city.value === cityValue)?.label || cityValue
  }

  // Get forfait label from value
  const getForfaitLabel = (forfaitValue: string | undefined) => {
    if (!forfaitValue) return ""

    const forfaits = [
      { value: "economique", label: "Économique" },
      { value: "standard", label: "Standard" },
      { value: "premium", label: "Premium" },
    ]

    return forfaits.find((forfait) => forfait.value === forfaitValue)?.label || forfaitValue
  }

  // Required document types
  const requiredDocuments = [
    {
      id: "passport",
      name: "Passeport",
      description: "Copie de votre passeport valide (validité min. 6 mois)",
      icon: FileText,
    },
    {
      id: "photo",
      name: "Photo d'identité",
      description: "Photo récente sur fond blanc (format 4x4cm)",
      icon: Upload,
    },
    {
      id: "vaccination",
      name: "Carnet de vaccination",
      description: "Certificat de vaccination à jour",
      icon: FileText,
    },
    {
      id: "identity",
      name: "Pièce d'identité",
      description: "Copie de votre carte d'identité nationale",
      icon: FileText,
    },
  ]

  // Handle document download
  const handleDownload = (docId: string) => {
    if (!reservation?.documents[docId]?.url) return

    // In a real application, this would trigger a download
    alert(`Téléchargement du document: ${reservation.documents[docId].filename}`)
  }

  // Handle document preview
  const handlePreview = (docId: string) => {
    if (!reservation?.documents[docId]?.url) return
    const docInfo = requiredDocuments.find((doc) => doc.id === docId)
    setPreviewDocument({
      id: docId,
      name: docInfo ? docInfo.name : docId.charAt(0).toUpperCase() + docId.slice(1),
      url: reservation.documents[docId].url,
    })
  }

  if (isLoading) {
    return (
      <AgencyDashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
        </div>
      </AgencyDashboardLayout>
    )
  }

  if (!reservation) {
    return (
      <AgencyDashboardLayout>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Réservation non trouvée</h2>
          <p className="text-gray-600 mb-4">La réservation que vous recherchez n'existe pas ou a été supprimée.</p>
          <Link
            href="/agency/dashboard/reservations"
            className="inline-flex items-center px-4 py-2 bg-[#FFD700] text-black rounded-md hover:bg-[#E6C200] transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour à la liste des réservations
          </Link>
        </div>
      </AgencyDashboardLayout>
    )
  }

  return (
    <AgencyDashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Retour"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Détails de la réservation</h1>
              <p className="text-sm text-gray-500 mt-1">Informations complètes de la réservation</p>
            </div>
          </div>
        </div>

        {/* Reservation details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Informations de la réservation</h2>
          </div>
          <div className="p-5">
            {/* Package info */}
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-2 text-sm">
                <div className="font-medium text-gray-700">Type:</div>
                <div className="text-gray-900 capitalize">{reservation.packageType}</div>

                {reservation.packageType !== "hotel" && (
                  <>
                    <div className="mx-2 text-gray-300">|</div>
                    <div className="font-medium text-gray-700">Départ:</div>
                    <div className="text-gray-900 capitalize">{getCityLabel(reservation.departureCity)}</div>
                  </>
                )}

                {reservation.packageType === "hotel" && reservation.destination && (
                  <>
                    <div className="mx-2 text-gray-300">|</div>
                    <div className="font-medium text-gray-700">Destination:</div>
                    <div className="text-gray-900 capitalize">{reservation.destination}</div>
                  </>
                )}

                {(reservation.packageType === "hajj" || reservation.packageType === "umrah") && reservation.forfait && (
                  <>
                    <div className="mx-2 text-gray-300">|</div>
                    <div className="font-medium text-gray-700">Forfait:</div>
                    <div className="text-gray-900 capitalize">{getForfaitLabel(reservation.forfait)}</div>
                  </>
                )}

                {reservation.packageType === "hotel" ? (
                  <>
                    <div className="mx-2 text-gray-300">|</div>
                    <div className="font-medium text-gray-700">Dates:</div>
                    <div className="text-gray-900">
                      {formatDate(reservation.dateFrom)} - {formatDate(reservation.dateTo)}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mx-2 text-gray-300">|</div>
                    <div className="font-medium text-gray-700">Date:</div>
                    <div className="text-gray-900">{formatDate(reservation.dateFrom || reservation.date)}</div>
                  </>
                )}
              </div>

              {reservation.packageType === "hotel" && (
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  <div className="font-medium text-gray-700">Chambres:</div>
                  <div className="text-gray-900">{reservation.rooms}</div>
                  <div className="mx-2 text-gray-300">|</div>
                  <div className="font-medium text-gray-700">Adultes:</div>
                  <div className="text-gray-900">{reservation.adults}</div>
                  {reservation.children && Number(reservation.children) > 0 && (
                    <>
                      <div className="mx-2 text-gray-300">|</div>
                      <div className="font-medium text-gray-700">Enfants:</div>
                      <div className="text-gray-900">{reservation.children}</div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <User size={16} className="mr-2 text-[#FFD700]" />
                  Informations du voyageur
                </h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Nom complet</p>
                    <p className="text-sm text-gray-900">{reservation.travelerName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Téléphone</p>
                    <p className="text-sm text-gray-900">{reservation.travelerPhone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Date de naissance</p>
                    <p className="text-sm text-gray-900">{formatDate(reservation.birthDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Adresse</p>
                    <p className="text-sm text-gray-900">{reservation.address}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Contact d'urgence</p>
                    <p className="text-sm text-gray-900">{reservation.emergencyContact}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <FileText size={16} className="mr-2 text-[#FFD700]" />
                  Informations du passeport
                </h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Numéro de passeport</p>
                    <p className="text-sm text-gray-900">{reservation.passportNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Date d'expiration</p>
                    <p className="text-sm text-gray-900">{formatDate(reservation.passportExpiry)}</p>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-3 mt-6 flex items-center">
                  <Clock size={16} className="mr-2 text-[#FFD700]" />
                  Conditions médicales
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-900">
                    {reservation.medicalConditions || "Aucune condition spécifiée"}
                  </p>
                </div>
              </div>
            </div>

            {/* Document section */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <FileText size={16} className="mr-2 text-[#FFD700]" />
                Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reservation.documents &&
                  Object.entries(reservation.documents).map(([docKey, docData]: [string, any]) => {
                    const isUploaded = docData?.exists
                    return (
                      <div
                        key={docKey}
                        className={`border rounded-lg p-3 ${isUploaded ? "border-green-300 bg-green-50" : "border-gray-200"} transition-colors`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${isUploaded ? "bg-green-100" : "bg-gray-100"}`}
                          >
                            {isUploaded ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <FileText className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xs font-medium text-gray-900">
                              {docKey.charAt(0).toUpperCase() + docKey.slice(1)}
                            </h4>
                            <div className="text-xs text-gray-500 mt-1">
                              {isUploaded ? "Document téléchargé" : "Document manquant"}
                            </div>
                            {isUploaded && (
                              <div className="flex space-x-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2 text-xs hover:text-white"
                                  onClick={() => handlePreview(docKey)}
                                >
                                  <Eye size={14} className="mr-1" />
                                  Voir
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2 text-xs hover:text-white"
                                  onClick={() => handleDownload(docKey)}
                                >
                                  <Download size={14} className="mr-1" />
                                  Télécharger
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Document Preview Dialog */}
      <Dialog open={!!previewDocument} onOpenChange={(open) => !open && setPreviewDocument(null)}>
        <DialogContent className="sm:max-w-[700px] p-0">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-lg">{previewDocument?.name}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
              onClick={() => setPreviewDocument(null)}
            >
              <X size={16} />
              <span className="sr-only">Fermer</span>
            </Button>
          </div>
          <div className="p-6 flex flex-col items-center">
            {previewDocument && (
              <>
                <div className="w-full max-h-[500px] overflow-auto border rounded-md mb-4">
                  <img
                    src={previewDocument.url || "/placeholder.svg"}
                    alt={previewDocument.name}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="flex justify-end w-full">
                  <Button
                    variant="default"
                    className="bg-[#FFD700] hover:bg-[#E6C200] text-black"
                    onClick={() => handleDownload(previewDocument.id)}
                  >
                    <Download size={16} className="mr-2" />
                    Télécharger
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AgencyDashboardLayout>
  )
}
