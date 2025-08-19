"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function FaqCTA() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Vous n'avez pas trouvé votre réponse?</h2>
          <div className="w-16 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions et vous aider à planifier votre voyage
            spirituel dans les meilleures conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
            >
              Contactez-Nous
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="tel:+212524335508"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-black text-base font-medium rounded-md text-black bg-transparent hover:bg-black hover:text-white transition-colors"
            >
              Appelez-Nous
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
