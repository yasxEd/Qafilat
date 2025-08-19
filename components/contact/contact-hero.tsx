"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function ContactHero() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.avif"
          alt="Kaaba in Mecca"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contactez-Nous</h1>
          <div className="w-16 h-1 bg-[#FFD700] mb-4"></div>
          <p className="text-white/80 text-sm md:text-base">
            Nous sommes là pour répondre à toutes vos questions concernant nos services de pèlerinage.
          </p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-[#FFD700]/30"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full border-2 border-[#FFD700]/20"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full border-2 border-[#FFD700]/40"></div>
      </div>
    </section>
  )
}
