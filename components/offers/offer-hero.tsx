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
          title: "Offres Hajj",
          subtitle: "Saison 1446H (2025)",
          description: "Accomplissez le cinquième pilier de l'Islam avec sérénité et dans les meilleures conditions",
          image: "/f6.avif",
          icon: <Calendar className="h-12 w-12 text-[#FFD700]" />,
        }
      } else if (id === "omra") {
        data = {
          title: "Offres Omra",
          subtitle: "Programmes 2024-2025",
          description: "Des programmes adaptés à tous les budgets pour accomplir votre Omra en toute sérénité",
          image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1920&auto=format&fit=crop",
          icon: <MapPin className="h-12 w-12 text-[#FFD700]" />,
        }
      } else if (id === "leisure") {
        data = {
          title: "Voyages Loisirs",
          subtitle: "Découvrez Istanbul",
          description: "Explorez la magie d'Istanbul, ville à la croisée des cultures et des continents",
          image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1920&auto=format&fit=crop",
          icon: <Plane className="h-12 w-12 text-[#FFD700]" />,
        }
      } else {
        data = {
          title: "Offre non trouvée",
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
      <div className="w-full h-[70vh] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Chargement...</div>
      </div>
    )
  }

  if (!offerData) {
    return (
      <div className="w-full h-[70vh] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Offre non trouvée</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${offerData.image})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          {/* Icon */}
          <div className="mb-4">{offerData.icon}</div>

          {/* Title and Description */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{offerData.title}</h1>
          <div className="w-16 h-1 bg-[#FFD700] mb-4"></div>
          <p className="text-lg md:text-2xl text-white/90 mb-4">{offerData.subtitle}</p>
          <p className="text-white/80 text-base md:text-lg">{offerData.description}</p>
        </motion.div>
      </div>
    </div>
  )
}
