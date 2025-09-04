"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, Plane, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useOffersData } from "@/lib/useOffersData"

export default function OffersList() {
  const { offres: offers, isLoaded: loading } = useOffersData()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  if (!loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-32">
        <div className="max-w-8xl mx-auto px-8">
          <div className="text-center mb-28">
            <div className="space-y-6 animate-pulse">
              <div className="h-16 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-2xl w-96 mx-auto"></div>
              <div className="w-40 h-0.5 bg-gradient-to-r from-neutral-200 to-neutral-300 mx-auto"></div>
              <div className="h-8 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-xl w-[480px] mx-auto"></div>
            </div>
          </div>
          
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden animate-pulse border border-neutral-200/60">
                <div className="flex flex-col lg:flex-row h-[500px]">
                  <div className="w-full lg:w-3/5 bg-gradient-to-r from-neutral-200 to-neutral-300"></div>
                  <div className="w-full lg:w-2/5 p-12 space-y-6">
                    <div className="h-8 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-xl w-3/4"></div>
                    <div className="h-10 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-xl w-1/2"></div>
                    <div className="space-y-3">
                      <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg"></div>
                      <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-5/6"></div>
                    </div>
                    <div className="h-12 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-2xl w-40"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-32">
      <div className="max-w-8xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-28"
        >
          <h2 className="text-6xl lg:text-7xl font-extralight text-neutral-800 mb-8 tracking-tight">
            Nos Offres Premium
          </h2>
          <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-10"></div>
          <p className="text-2xl text-neutral-600 font-light max-w-3xl mx-auto leading-relaxed">
            Découvrez nos forfaits exclusifs pour le Hajj, l'Omra et les voyages de loisirs, soigneusement conçus pour
            une expérience d'exception.
          </p>
        </motion.div>

        {offers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-28"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
              <Star className="w-16 h-16 text-neutral-400" />
            </div>
            <h3 className="text-3xl font-light text-neutral-800 mb-6">Aucune offre trouvée</h3>
            <p className="text-neutral-600 mb-10 max-w-lg mx-auto leading-relaxed font-light text-lg">
              Commencez par créer votre première offre de voyage dans le dashboard.
            </p>
            <Link href="/offer-dashboard">
              <Button className="bg-neutral-900 hover:bg-neutral-800 text-white px-10 py-6 h-auto rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 font-light text-lg">
                Accéder au dashboard
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-16">
            {offers.map((offer, index) => (
              <motion.div key={offer.id} variants={item}>
                <div
                  className={`group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-neutral-200/60 hover:shadow-2xl hover:border-neutral-300/60 transition-all duration-700 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex flex-col lg:flex-row min-h-[600px]">
                    {/* Image Section */}
                    <div className={`relative w-full lg:w-3/5 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="relative h-96 lg:h-full overflow-hidden">
                        <Image
                          src={offer.image || "/placeholder.svg"}
                          alt={offer.titre}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        
                        {/* Mobile overlay content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 lg:hidden">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                              {offer.destination?.toLowerCase().includes("turquie") || offer.destination?.toLowerCase().includes("istanbul") ? (
                                <Plane className="h-5 w-5 text-white" />
                              ) : offer.titre?.toLowerCase().includes("hajj") ? (
                                <Calendar className="h-5 w-5 text-white" />
                              ) : (
                                <MapPin className="h-5 w-5 text-white" />
                              )}
                            </div>
                            <span className="text-white/90 font-light text-lg">{offer.titre}</span>
                          </div>
                          <h3 className="text-3xl font-light text-white">{offer.periode}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`w-full lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      {/* Desktop content */}
                      <div className="hidden lg:block">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center">
                            {offer.destination?.toLowerCase().includes("turquie") || offer.destination?.toLowerCase().includes("istanbul") ? (
                              <Plane className="h-6 w-6 text-neutral-600" />
                            ) : offer.titre?.toLowerCase().includes("hajj") ? (
                              <Calendar className="h-6 w-6 text-neutral-600" />
                            ) : (
                              <MapPin className="h-6 w-6 text-neutral-600" />
                            )}
                          </div>
                          <span className="text-neutral-600 font-light text-lg">{offer.titre}</span>
                        </div>
                        
                        <h3 className="text-4xl font-light text-neutral-800 mb-8 leading-tight">
                          {offer.periode}
                        </h3>
                      </div>

                      <p className="text-neutral-600 mb-10 leading-relaxed text-lg font-light">
                        {offer.hebergement}
                      </p>

                      <div className="flex items-center gap-6">
                        <Link href={`/offers/${offer.id}`}>
                          <Button
                            variant="outline"
                            className="group/btn border-neutral-300 text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 px-8 py-4 rounded-2xl font-light text-base"
                          >
                            Voir les détails
                            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                        
                        {/* Optional: Add price if available */}
                        {offer.prixBase && (
                          <div className="text-right">
                            <div className="text-sm text-neutral-500 font-light">À partir de</div>
                            <div className="text-2xl font-light text-neutral-800">{offer.prixBase}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}