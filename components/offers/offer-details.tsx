"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, Users, Plane, Hotel as HotelIcon, MapPin, Calendar, ArrowLeft, Star, Heart, Bookmark, Shield, Clock, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

interface OfferDetailsProps {
  id: string
  }


export default function OfferDetails({ id }: OfferDetailsProps) {
  const [offers, setOffers] = useState<any[]>([])
  const [selectedOffer, setSelectedOffer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("offres")
      if (saved) {
        const allOffers = JSON.parse(saved)
        let filtered: any[] = []
        const omraVariants = ["omra", "umrah", "omrah"]
        if (id === "hotel") {
            filtered = allOffers.filter((o: any) => o.hotels && o.hotels.length > 0)
        } else if (id === "flight") {
            filtered = allOffers.filter((o: any) => o.compagniesAeriennes)
        } else if (omraVariants.includes(id.toLowerCase())) {
          filtered = allOffers.filter(
            (o: any) => {
              const titre = o.titre?.toLowerCase() || ""
              const destination = o.destination?.toLowerCase() || ""
              return omraVariants.some(v =>
                titre.includes(v) || destination.includes(v)
              )
            }
          )
        } else if (id === "hajj") {
          filtered = allOffers.filter(
            (o: any) =>
              o.titre?.toLowerCase().includes("hajj") ||
              o.destination?.toLowerCase().includes("hajj")
          )
        } else {
          filtered = allOffers.filter(
            (o: any) =>
              o.id === id ||
              o.titre?.toLowerCase().includes(id.toLowerCase()) ||
              o.destination?.toLowerCase().includes(id.toLowerCase())
          )
        }
        setOffers(filtered)
      }
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex justify-center items-center">
        <div className="space-y-8 animate-pulse max-w-md w-full">
          <div className="h-16 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-xl w-4/5"></div>
            <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-3/5"></div>
            <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex justify-center items-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full mx-auto flex items-center justify-center shadow-inner">
            <MapPin className="w-10 h-10 text-neutral-400" />
          </div>
          <h2 className="text-3xl font-light text-neutral-700">Aucune information trouvée</h2>
          <p className="text-neutral-500 text-lg">Veuillez réessayer plus tard</p>
        </div>
      </div>
    )
  }

  // Premium hotel view
  if (id === "hotel") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        <div className="max-w-8xl mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <HotelIcon className="w-8 h-8 text-amber-600" />
                </div>
                <h1 className="text-6xl lg:text-7xl font-extralight text-neutral-800 tracking-tight">Hôtels</h1>
              </div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
              <p className="text-xl text-neutral-600 font-light max-w-lg mx-auto">
                {offers.reduce((acc, o) => acc + (o.hotels?.length || 0), 0)} établissements d'exception
              </p>
            </div>

            {/* Hotels Grid */}
            <div className="space-y-24">
              {offers.map((offer: any, idx: number) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-4 justify-center">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <h2 className="text-3xl font-extralight text-neutral-800 text-center">{offer.titre}</h2>
                    <span className="px-4 py-2 bg-neutral-100 text-neutral-600 text-sm rounded-full font-light">
                      {offer.hotels.length} hôtel{offer.hotels.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {offer.hotels?.map((hotel: any, idx: number) => (
                      <motion.div
                        key={hotel.id || idx}
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-neutral-200/60 overflow-hidden hover:shadow-2xl hover:border-neutral-300/60 transition-all duration-500"
                      >
                        <div className="p-8 border-b border-neutral-100">
                          <div className="flex items-start justify-between">
                            <h3 className="text-xl font-light text-neutral-800">{hotel.nom}</h3>
                            {hotel.distance && (
                              <span className="text-xs text-neutral-500 bg-neutral-50 px-3 py-1.5 rounded-full">
                                {hotel.distance}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-8 space-y-4">
                          {hotel.tarifsChambre &&
                            Object.entries(hotel.tarifsChambre).map(([type, prix]) =>
                              prix ? (
                                <div key={type} className="flex items-center gap-4">
                                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                  <span className="text-sm text-neutral-600 capitalize flex-1 font-light">{type}</span>
                                  <span className="font-medium text-neutral-800 text-lg">{typeof prix === "string" || typeof prix === "number" ? prix : ""} DH</span>
                                </div>
                              ) : null
                            )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Premium flight view
  if (id === "flight") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <Plane className="w-8 h-8 text-sky-600" />
                </div>
                <h1 className="text-6xl lg:text-7xl font-extralight text-neutral-800 tracking-tight">Vols</h1>
              </div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mb-8"></div>
              <p className="text-xl text-neutral-600 font-light max-w-lg mx-auto">
                {offers.length} offre{offers.length > 1 ? "s" : ""} de voyage disponible{offers.length > 1 ? "s" : ""}
              </p>
            </div>

            {/* Flights List */}
            <div className="space-y-8">
              {offers.map((offer: any, idx: number) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl border border-neutral-200/60 p-10 hover:shadow-2xl hover:border-neutral-300/60 transition-all duration-500"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                    <div className="flex-1 space-y-6">
                      <h2 className="text-2xl font-light text-neutral-800">{offer.titre}</h2>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-sky-100 rounded-xl flex items-center justify-center">
                            <Plane className="w-4 h-4 text-sky-600" />
                          </div>
                          <span className="text-neutral-600 font-light">
                            {offer.compagniesAeriennes || "Non renseigné"}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-amber-600" />
                          </div>
                          <span className="text-neutral-600 font-light">{offer.destination}</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-amber-400" />
                          </div>
                          <span className="text-neutral-600 font-light">{offer.periode}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-3">
                          <Users className="w-6 h-6 text-neutral-600" />
                        </div>
                        <span className="text-sm text-neutral-500 font-light">{offer.nombrePersonnes}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Card view for hajj and omra
  if (id === "hajj" || id === "omra" || ["omra", "umrah", "omrah"].includes(id.toLowerCase())) {
    // If an offer is selected, show detailed view
    if (selectedOffer) {
      return (
        <div className="min-h-screen bg-white">
          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-8 py-16">
            {/* Price Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-20"
            >
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-3xl p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-5xl lg:text-6xl font-light text-gray-900">{selectedOffer.prixBase}</span>
                      <div className="text-gray-600">
                        <p className="text-lg font-medium">par personne</p>
                        <p className="text-sm">Tout inclus</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-amber-500" />
                        <span>Garantie meilleur prix</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-amber-400" />
                        <span>Annulation gratuite 72h</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="bg-amber-400 text-white hover:bg-amber-300 px-8 py-4 h-auto rounded-2xl font-medium text-lg"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Nous appeler
                      </Button>
                    </Link>
                    <Link href="/direct-reservation">
                      <Button className="bg-black text-white px-8 py-4 h-auto rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                        Réserver maintenant
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            {selectedOffer.hebergement && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-20"
              >
                <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12">
                  <h2 className="text-3xl font-light text-gray-900 mb-6">À propos de ce voyage</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{selectedOffer.hebergement}</p>
                </div>
              </motion.div>
            )}

            {/* Services Grid */}
            {selectedOffer.servicesInclus && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-20"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-light text-gray-900 mb-4">Ce qui est inclus</h2>
                  <p className="text-lg text-gray-600">Profitez d'un voyage tout compris avec nos services premium</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedOffer.servicesInclus.map((service: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <Check className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{service}</h3>
                          <p className="text-sm text-gray-600">Service inclus dans votre forfait</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Enhanced Tabs Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-20"
            >
              <Tabs defaultValue="hotels" className="w-full">
                <div className="flex justify-center mb-12">
                  <TabsList className="bg-white p-2 rounded-2xl inline-flex">
                    <TabsTrigger
                      value="hotels"
                      className="rounded-xl px-6 py-3 font-medium text-lg data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      <HotelIcon className="w-5 h-5 mr-2" />
                      Hébergements
                    </TabsTrigger>
                    <TabsTrigger
                      value="dates"
                      className="rounded-xl px-6 py-3 font-medium text-lg data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Dates & Prix
                    </TabsTrigger>
                    <TabsTrigger
                      value="details"
                      className="rounded-xl px-6 py-3 font-medium text-lg data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm transition-all duration-200"
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      Détails
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Hotels Tab */}
                <TabsContent value="hotels" className="space-y-8">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-light text-gray-900 mb-2">Hébergements sélectionnés</h3>
                    <p className="text-gray-600">Des hôtels de qualité pour votre confort</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {selectedOffer.hotels?.map((hotel: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <HotelIcon className="w-12 h-12 text-blue-600" />
                          </div>
                          {hotel.distance && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
                                {hotel.distance}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-8">
                          <h4 className="text-xl font-medium text-gray-900 mb-6">{hotel.nom}</h4>
                          
                          <div className="space-y-4">
                            {hotel.tarifsChambre &&
                              Object.entries(hotel.tarifsChambre).map(([type, prix]) =>
                                prix ? (
                                  <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                      <span className="font-medium text-gray-900 capitalize">{type}</span>
                                      <p className="text-sm text-gray-600">Chambre {type}</p>
                                    </div>
                                    <span className="text-xl font-semibold text-gray-900">{typeof prix === "string" || typeof prix === "number" ? prix : ""} DH</span>
                                  </div>
                                ) : null
                              )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Dates Tab */}
                <TabsContent value="dates">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-light text-gray-900 mb-2">Dates disponibles</h3>
                    <p className="text-gray-600">Choisissez la période qui vous convient</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedOffer.datesDisponibles?.map((date: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                        className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-amber-300 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-200">
                            <Calendar className="w-8 h-8 text-amber-600" />
                          </div>
                          <h4 className="font-medium text-gray-900 mb-2">{date.periode}</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Du {new Date(date.dateDebut).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} au {new Date(date.dateFin).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                          </p>
                          <div className="text-lg font-semibold text-amber-600">{selectedOffer.prixBase}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Details Tab */}
                <TabsContent value="details">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Pricing Details */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-8">
                      <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                          <Users className="w-4 h-4 text-emerald-600" />
                        </div>
                        Tarification détaillée
                      </h3>
                      <div className="space-y-4">
                        {selectedOffer.tarifsChambre &&
                          Object.entries(selectedOffer.tarifsChambre).map(([type, prix]) =>
                            prix ? (
                              <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <span className="font-medium text-gray-700 capitalize">Chambre {type}</span>
                                <span className="text-xl font-semibold text-gray-900">{typeof prix === "string" || typeof prix === "number" ? prix : ""} DH</span>
                              </div>
                            ) : null
                          )}
                      
                        <div className="border-t pt-4 mt-6">
                          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
                            <span className="font-semibold text-gray-900">Prix de base par personne</span>
                            <span className="text-2xl font-bold text-amber-600">{selectedOffer.prixBase}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-8">
                      <div className="bg-white border border-gray-200 rounded-3xl p-8">
                        <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <Plane className="w-4 h-4 text-blue-600" />
                          </div>
                          Transport
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Compagnie aérienne</span>
                            <span className="font-medium text-gray-900">{selectedOffer.compagniesAeriennes || 'À confirmer'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Type de vol</span>
                            <span className="font-medium text-gray-900">Vol direct</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-3xl p-8">
                        <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            <Shield className="w-4 h-4 text-purple-600" />
                          </div>
                          Garanties
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-emerald-500" />
                            <span className="text-gray-700">Assurance voyage incluse</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-emerald-500" />
                            <span className="text-gray-700">Support 24h/24</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-emerald-500" />
                            <span className="text-gray-700">Guide francophone</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Enhanced Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-black rounded-3xl p-8 lg:p-12 text-white"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-light mb-4">Besoin d'aide pour réserver ?</h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Notre équipe d'experts est disponible pour vous accompagner dans votre projet de voyage spirituel
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="font-medium mb-2">Appelez-nous</h3>
                  <p className="text-gray-300 text-sm">Du lundi au vendredi 9h-18h</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="font-medium mb-2">Écrivez-nous</h3>
                  <p className="text-gray-300 text-sm">Réponse sous 24h garantie</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="font-medium mb-2">Rencontrez-nous</h3>
                  <p className="text-gray-300 text-sm">Agence ouverte 6j/7</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 h-auto rounded-2xl font-medium text-lg bg-transparent"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Nous contacter
                  </Button>
                </Link>
                <Link href="/direct-reservation">
                  <Button className="bg-amber-400 hover:bg-amber-500 text-white px-8 py-4 h-auto rounded-2xl font-medium text-lg shadow-lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Réserver en ligne
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      )
    }

    // Card view for hajj and omra offers
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        <div className="max-w-8xl mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <Calendar className="w-8 h-8 text-amber-400" />
                </div>
                <h1 className="text-6xl lg:text-7xl font-extralight text-neutral-800 tracking-tight">
                  {id === "hajj" ? "Offres Hajj" : "Offres Omra"}
                </h1>
              </div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
              <p className="text-xl text-neutral-600 font-light max-w-lg mx-auto">
                {offers.length} offre{offers.length > 1 ? "s" : ""} disponible{offers.length > 1 ? "s" : ""}
              </p>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map((offer: any, idx: number) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.7 }}
                  onClick={() => setSelectedOffer(offer)}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl border border-neutral-200/60 overflow-hidden hover:shadow-2xl hover:border-neutral-300/60 transition-all duration-500 cursor-pointer"
                >
                  <div>
                    <div className="relative">
                      <div className="h-64 bg-gradient-to-br from-neutral-200 to-neutral-300 relative overflow-hidden">
                        {offer.image && (
                          <img
                            src={offer.image}
                            alt={offer.titre}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                            offer.statut === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            offer.statut === 'inactive' ? 'bg-red-100 text-red-700' :
                            'bg-neutral-100 text-neutral-700'
                          }`}>
                            {offer.statut === 'active' ? 'Disponible' : offer.statut === 'inactive' ? 'Complet' : 'Brouillon'}
                          </span>
                        </div>
                        
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <span className="text-sm font-medium text-white">{offer.note}</span>
                          </div>
                        </div>

                        <div className="absolute bottom-4 right-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200">
                              <Heart className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200">
                              <Bookmark className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="mb-6">
                        <h3 className="text-2xl font-light text-neutral-800 mb-3 leading-tight">
                          {offer.titre}
                        </h3>
                        <p className="text-neutral-600 font-light">{offer.periode}</p>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-neutral-600">
                          <MapPin className="w-4 h-4 mr-3 text-emerald-500" />
                          <span className="font-light">{offer.destination}</span>
                        </div>
                        <div className="flex items-center text-sm text-neutral-600">
                          <Calendar className="w-4 h-4 mr-3 text-emerald-500" />
                          <span className="font-light">{offer.datesDisponibles.length > 0 ? `${offer.datesDisponibles.length} dates disponibles` : offer.duree}</span>
                        </div>
                        <div className="flex items-center text-sm text-neutral-600">
                          <Users className="w-4 h-4 mr-3 text-amber-400" />
                          <span className="font-light">{offer.nombrePersonnes} personnes • {offer.duree}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {offer.servicesInclus?.slice(0, 2).map((service: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-amber-50 text-amber-400 text-xs rounded-full font-light"
                          >
                            {service.length > 20 ? service.substring(0, 20) + '...' : service}
                          </span>
                        ))}
                        {offer.servicesInclus?.length > 2 && (
                          <span className="px-3 py-1.5 bg-neutral-100 text-neutral-600 text-xs rounded-full font-light">
                            +{offer.servicesInclus.length - 2}
                          </span>
                        )}
                      </div>

                      {offer.hotels?.length > 0 && (
                        <div className="mb-6">
                          <p className="text-xs text-neutral-500 mb-2 font-light">{offer.hotels.length} hôtel{offer.hotels.length > 1 ? 's' : ''} disponible{offer.hotels.length > 1 ? 's' : ''}</p>
                          <div className="flex flex-wrap gap-2">
                            {offer.hotels.slice(0, 2).map((hotel: any, index: number) => (
                              <span key={index} className="px-3 py-1 bg-sky-50 text-sky-700 text-xs rounded-full font-light">
                                {hotel.nom}
                              </span>
                            ))}
                            {offer.hotels.length > 2 && (
                              <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full font-light">
                                +{offer.hotels.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                        <div>
                          <p className="text-2xl font-light text-neutral-800">
                            {offer.prixBase}
                          </p>
                          <p className="text-xs text-neutral-500 font-light">par personne</p>
                        </div>
                        
                        <div className="flex items-center text-amber-400 group-hover:translate-x-1 transition-transform duration-300">
                          <span className="text-sm font-light mr-2">Voir détails</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Fallback for other types - show detailed view directly
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {offers.map((offerData: any, idx: number) => (
            <div key={offerData.id} className={idx > 0 ? "mt-32" : "pt-16"}>
              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-8 mb-16 text-center"
              >
                <p className="text-sm text-neutral-600 mb-2">À partir de</p>
                <p className="text-4xl font-light text-neutral-900 mb-2">{offerData.prixBase}</p>
                <p className="text-sm text-neutral-600">par personne</p>
                <Link href="/direct-reservation" className="mt-6 inline-block">
                  <Button className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105">
                    Réserver maintenant
                  </Button>
                </Link>
              </motion.div>

              {/* Services Grid */}
              {offerData.servicesInclus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mb-20"
                >
                  <h2 className="text-2xl font-light text-neutral-900 mb-8 text-center">Services inclus</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {offerData.servicesInclus.map((feature: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 transition-colors duration-200"
                      >
                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-amber-400" />
                        </div>
                        <span className="text-neutral-700 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tabs Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mb-20"
              >
                <Tabs defaultValue="packages" className="w-full">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-neutral-100 p-1 rounded-xl">
                    <TabsTrigger
                      value="packages"
                      className="rounded-lg font-medium text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Hôtels
                    </TabsTrigger>
                    <TabsTrigger
                      value="faqs"
                      className="rounded-lg font-medium text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Dates
                    </TabsTrigger>
                    <TabsTrigger
                      value="testimonials"
                      className="rounded-lg font-medium text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      Tarifs
                    </TabsTrigger>
                  </TabsList>

                  {/* Hotels Tab */}
                  <TabsContent value="packages" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {offerData.hotels?.map((hotel: any, index: number) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="bg-white border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 hover:shadow-lg transition-all duration-200"
                        >
                          <div className="mb-4">
                            <h3 className="text-lg font-medium text-neutral-900 mb-2">{hotel.nom}</h3>
                            {hotel.distance && (
                              <p className="text-sm text-neutral-600">{hotel.distance}</p>
                            )}
                          </div>

                          <div className="space-y-3">
                            {hotel.tarifsChambre &&
                              Object.entries(hotel.tarifsChambre).map(([type, prix]) =>
                                prix ? (
                                  <div key={type} className="flex items-center justify-between">
                                    <span className="text-sm text-neutral-600 capitalize">{type}</span>
                                    <span className="font-medium text-neutral-900">{typeof prix === "string" || typeof prix === "number" ? prix : ""} DH</span>
                                  </div>
                                ) : null
                              )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Dates Tab */}
                  <TabsContent value="faqs">
                    <div className="max-w-2xl mx-auto">
                      <div className="space-y-4">
                        {offerData.datesDisponibles?.map((date: any, index: number) => (
                          <div
                            key={index}
                            className="bg-white border border-neutral-200 rounded-xl p-6 hover:border-neutral-300 transition-colors duration-200"
                          >
                            <h3 className="font-medium text-neutral-900 mb-2">{date.periode}</h3>
                            <p className="text-sm text-neutral-600">Du {date.dateDebut} au {date.dateFin}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Tarifs Tab */}
                  <TabsContent value="testimonials">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <div className="bg-white border border-neutral-200 rounded-2xl p-8">
                        <h3 className="text-xl font-medium text-neutral-900 mb-6">Tarifs par chambre</h3>
                        <div className="space-y-4">
                          {offerData.tarifsChambre &&
                            Object.entries(offerData.tarifsChambre).map(([type, prix]) =>
                              prix ? (
                                <div key={type} className="flex items-center justify-between py-2">
                                  <span className="text-neutral-600 capitalize">{type}</span>
                                  <span className="font-medium text-neutral-900 text-lg">{typeof prix === "string" || typeof prix === "number" ? prix : ""} DH</span>
                                </div>
                              ) : null
                            )}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 text-center">
                        <h3 className="text-xl font-medium text-neutral-900 mb-6">Prix de base</h3>
                        <p className="text-4xl font-light text-neutral-900 mb-2">{offerData.prixBase}</p>
                        <p className="text-neutral-600">par personne</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="bg-neutral-50 rounded-2xl p-8 lg:p-12 mb-16"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-2xl font-light text-neutral-900 mb-4">Des questions ?</h2>
                  <p className="text-neutral-600 mb-8 leading-relaxed">
                    Notre équipe est à votre disposition pour vous accompagner dans votre projet de voyage.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="border-neutral-300 text-neutral-700 hover:bg-neutral-100 px-6 py-3 rounded-xl font-medium"
                      >
                        Nous contacter
                      </Button>
                    </Link>
                    <Link href="/direct-reservation">
                      <Button className="bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 rounded-xl font-medium">
                        Réserver maintenant
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
          </motion.div>
        </div>
      </div>
    )
  }