"use client"

import { motion } from "framer-motion"

export default function AboutHistory() {
  const timelineEvents = [
    {
      year: "1995",
      title: "Fondation",
      description:
        "Création de Qafilat Tayba à Marrakech avec une vision claire : faciliter le voyage sacré des pèlerins marocains.",
    },
    {
      year: "2000",
      title: "Expansion",
      description:
        "Ouverture de bureaux supplémentaires à Casablanca et Rabat pour mieux servir les pèlerins de tout le Maroc.",
    },
    {
      year: "2010",
      title: "Reconnaissance",
      description:
        "Obtention de certifications et reconnaissances officielles pour notre engagement envers l'excellence du service.",
    },
    {
      year: "2015",
      title: "Innovation",
      description: "Lancement de services numériques pour faciliter les réservations et améliorer l'expérience client.",
    },
    {
      year: "2023",
      title: "Aujourd'hui",
      description:
        "Qafilat Tayba continue de grandir, servant des milliers de pèlerins chaque année avec dévouement et excellence.",
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Notre Histoire</h2>
          <div className="w-16 sm:w-24 h-1 bg-[#FFD700] mx-auto mb-4 sm:mb-6"></div>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-gray-600">
            Fondée à Marrakech, Qafilat Tayba s'est imposée comme un nom de confiance dans le domaine des voyages de
            pèlerinage. Au fil des années, nous avons grandi en nous concentrant sur les besoins des pèlerins, bâtissant
            une réputation de fiabilité et d'attention.
          </p>
        </motion.div>

        {/* Timeline - Same layout for mobile and desktop, just scaled down */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 sm:w-1 bg-gradient-to-b from-[#FFD700] to-[#FFD700]/30"></div>

          {/* Timeline events */}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center mb-8 sm:mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-3 sm:pr-8" : "text-left pl-3 sm:pl-8"}`}>
                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-gray-900">{event.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">{event.description}</p>
                </div>

                {/* Center dot */}
                <div className="w-2/12 flex justify-center">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold text-xs sm:text-sm md:text-base z-10 relative">
                      {event.year}
                    </div>
                    <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/10 z-0"></div>
                  </div>
                </div>

                {/* Empty space for alignment */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
