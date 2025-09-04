"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Plane } from "lucide-react"

interface OfferHeroProps {
  id: string
}

export default function OfferHero({ id }: OfferHeroProps) {
  const [offerData, setOfferData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    setLoading(true)

    // This would normally be an API call
    setTimeout(() => {
      let data

      if (id === "hajj") {
        data = {
          title: "Offres Hajj Premium",
          subtitle: "Saison 1446H (2025)",
          description: "Accomplissez le cinquième pilier de l'Islam avec sérénité et dans les meilleures conditions d'excellence",
          image: "/f6.avif",
          icon: <Calendar className="h-16 w-16 text-amber-400" />,
        }
      } else if (id === "omra") {
        data = {
          title: "Offres Omra Exclusive",
          subtitle: "Programmes 2024-2025",
          description: "Des programmes premium adaptés à tous les budgets pour accomplir votre Omra en toute sérénité",
          image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1920&auto=format&fit=crop",
          icon: <MapPin className="h-16 w-16 text-amber-400" />,
        }
      } else if (id === "leisure") {
        data = {
          title: "Voyages Loisirs Premium",
          subtitle: "Découvrez Istanbul",
          description: "Explorez la magie d'Istanbul, ville à la croisée des cultures et des continents, avec un service d'exception",
          image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1920&auto=format&fit=crop",
          icon: <Plane className="h-16 w-16 text-amber-400" />,
        }
      } else if (id === "hotel") {
        data = {
          title: "Collection Hôtels",
          subtitle: "Sélection premium d'hébergements",
          description: "Découvrez notre sélection d'hôtels d'exception dans nos offres Omra et Hajj, avec leurs tarifs et emplacements privilégiés.",
          image: "/offers/hotels-bg.jpg",
          icon: <Calendar className="h-16 w-16 text-amber-400" />,
        }
      } else if (id === "flight") {
        data = {
          title: "Services Aériens Premium",
          subtitle: "Compagnies partenaires de prestige",
          description: "Consultez toutes les informations sur nos vols premium inclus dans nos offres, avec nos compagnies partenaires sélectionnées.",
          image: "/offers/flights-bg.jpg",
          icon: <Plane className="h-16 w-16 text-amber-400" />,
        }
      } else {
        data = {
          title: "Offre introuvable",
          description: "Désolé, nous n'avons pas trouvé l'offre que vous recherchez.",
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop",
        }
      }

      setOfferData(data)
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className="w-full h-[80vh] bg-gradient-to-br from-neutral-100 to-neutral-200 animate-pulse flex items-center justify-center">
        <div className="text-neutral-400 text-xl font-light">Chargement de l'expérience...</div>
      </div>
    )
  }

  if (!offerData) {
    return (
      <div className="w-full h-[80vh] bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
        <div className="text-neutral-500 text-xl font-light">Offre non trouvée</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${offerData.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          {/* Icon */}
          <div className="mb-8">{offerData.icon}</div>

          {/* Title and Description */}
          <h1 className="text-4xl md:text-6xl font-extralight text-white mb-4 tracking-tight leading-tight">{offerData.title}</h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mb-8"></div>
          <p className="text-xl md:text-2xl text-white/90 mb-6 font-light">{offerData.subtitle}</p>
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-xl">{offerData.description}</p>
        </motion.div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full border border-amber-400/30 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full border border-amber-400/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full border border-amber-400/20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  )
}
