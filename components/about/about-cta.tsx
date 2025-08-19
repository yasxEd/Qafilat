"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutCTA() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative elements - contained */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/5 rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
                Prêt pour Votre Voyage Spirituel?
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
                Laissez Qafilat Tayba vous guider dans cette expérience transformatrice. Contactez-nous dès aujourd'hui
                pour planifier votre prochain pèlerinage.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="inline-block py-3 px-6 sm:px-8 bg-[#FFD700] text-black font-medium rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Contactez-nous
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/offers"
                    className="inline-flex items-center py-3 px-6 sm:px-8 bg-white text-gray-800 font-medium rounded-md border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Voir nos offres
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
