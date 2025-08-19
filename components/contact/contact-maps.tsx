"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { MapPin } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ContactMaps() {
  const [activeLocation, setActiveLocation] = useState("marrakech")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const locations = [
    {
      id: "marrakech",
      name: "Marrakech",
      address: "Bureau N° 1 mosquee Khaled Bnou Alwalid lot assanawbar, Marrakech",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54339.97685304364!2d-8.0387103!3d31.6294723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakech!5e0!3m2!1sfr!2sma!4v1650000000000!5m2!1sfr!2sma",
    },
    {
      id: "casablanca",
      name: "Casablanca",
      address: "Adresse de l'agence à Casablanca",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72692335998!2d-7.6684295!3d33.5731104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sfr!2sma!4v1650000000000!5m2!1sfr!2sma",
    },
    {
      id: "rabat",
      name: "Rabat",
      address: "Adresse de l'agence à Rabat",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72692335998!2d-6.8498129!3d33.9715904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b871f50c5c1%3A0x7ac946ed7408076b!2sRabat!5e0!3m2!1sfr!2sma!4v1650000000000!5m2!1sfr!2sma",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Nos Agences</h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">
            Visitez l'une de nos agences pour discuter de vos projets de voyage en personne.
          </p>
        </motion.div>

        {/* Location tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setActiveLocation(location.id)}
              className={`px-2 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                activeLocation === location.id
                  ? "bg-[#FFD700] text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {location.name}
              </div>
            </button>
          ))}
        </div>

        {/* Maps row - conditional rendering based on screen size */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {locations.map((location) => {
            // On mobile, only show the active location
            if (isMobile && location.id !== activeLocation) {
              return null
            }

            return (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`rounded-xl overflow-hidden shadow-md border border-gray-100 ${
                  activeLocation === location.id ? "ring-2 ring-[#FFD700]" : ""
                }`}
              >
                <div className="h-64 w-full">
                  <iframe
                    src={location.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Carte de ${location.name}`}
                  ></iframe>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-gray-900">{location.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
