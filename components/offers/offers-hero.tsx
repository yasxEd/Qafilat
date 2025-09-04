"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function OffersHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Gradient Background + Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-violet-500 opacity-90"></div>
        <Image
          src="/hero-bg.avif"
          alt="Masjid al-Haram"
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
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full mt-26 md:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-extralight text-white mb-4 leading-tight tracking-tight">
              Nos Offres
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-white to-white/50 mb-6"></div>
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
              Découvrez nos forfaits premium Hajj et Omra conçus pour répondre à tous vos besoins spirituels et pratiques.
            </p>
            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Une attention particulière au détail pour une expérience inoubliable et sereine.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
