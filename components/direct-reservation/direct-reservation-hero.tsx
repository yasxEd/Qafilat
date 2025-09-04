"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DirectReservationHero() {
  const router = useRouter()
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Gradient Background + Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-violet-500 opacity-90"></div>
        <Image
          src="/hero-bg.avif"
          alt="Kaaba in Mecca"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-white/20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border border-white/10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full border border-white/30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Retour</span>
            </button>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-extralight text-white mb-4 leading-tight tracking-tight">
              Réservation Directe
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-white to-white/50 mb-6"></div>
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
              Créez votre voyage personnalisé avec notre équipe d'experts.
            </p>
            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Nous nous occupons de tous les détails pour que vous puissiez vous concentrer sur l'essentiel.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
