"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Autoplay } from "swiper/modules"
import "swiper/css"

export default function FeaturesSection() {
  const swiperRef = useRef<SwiperType | null>(null)

  // Updated offers with consistent text length and new Unsplash images
  const features = [
    {
      title: "Istanbul Découverte",
      description: "Séjour de 8 jours/7 nuits avec vols, hôtel et transferts inclus à partir de 6 900 MAD.",
      image:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Omra Sha'bân",
      description: "Programmes spéciaux avec hébergement près des Lieux Saints et accompagnement religieux.",
      image:
        "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
      title: "Omra Ramadan",
      description: "Forfaits tout compris à partir de 13 000 MAD avec vols et hôtels à proximité du Haram.",
      image:
        "/f3.avif?q=80&w=1374&auto=format&fit=crop",
    },
    {
      title: "Hajj 2025",
      description: "Inscriptions ouvertes pour le Hajj 1446H avec hébergement confortable et accompagnement.",
      image:
        "/f4.avif?q=80&w=1374&auto=format&fit=crop",
    },
    {
      title: "Voyages de Groupe",
      description: "Excursions saisonnières et circuits multi-villes avec options de paiement flexibles.",
      image:
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Offres Spéciales",
      description: "Promotions exclusives pour l'Aïd et l'été avec possibilité de paiement échelonné.",
      image:
        "/f5.avif?q=80&w=1374&auto=format&fit=crop",
    },
  ]

  return (
    <section className="py-16 mt-0 md:mt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Offres</h2>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          </motion.div>
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          className="features-swiper"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="h-80 relative rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-white">
                  <h3 className="text-xl font-bold mb-2 text-[#FFD700]">{feature.title}</h3>
                  <div className="h-[60px] flex items-center">
                    <p className="text-sm text-white/90">{feature.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
