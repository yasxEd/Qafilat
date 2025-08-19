"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Facebook, Users, Award } from "lucide-react"

export default function AboutOverview() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Qafilat Tayba
              <span className="block text-lg font-normal text-gray-600 mt-2">
                Votre guide pour un voyage spirituel enrichissant
              </span>
            </h2>

            <div className="space-y-6 text-gray-700">
              <p>
                Qafilat Tayba est une agence de voyage dédiée basée à Marrakech, au Maroc, spécialisée dans
                l'organisation des pèlerinages d'Omra et de Hajj. Nous nous engageons à offrir aux pèlerins un voyage
                spirituellement enrichissant et sans tracas, en veillant à ce que chaque aspect du voyage reflète notre
                passion pour offrir une valeur exceptionnelle.
              </p>

              <p>
                Avec une forte présence communautaire, comme en témoigne notre engagement auprès de plus de 17 000
                abonnés sur Facebook, nous nous efforçons de faire de votre pèlerinage une expérience mémorable et
                enrichissante.
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6 mt-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Award className="h-6 w-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Agréé & Autorisé</h3>
                    <p className="text-sm text-gray-600">Par le Ministère du Hajj</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Users className="h-6 w-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Expérience</h3>
                    <p className="text-sm text-gray-600">Plus de 25 ans</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Facebook className="h-6 w-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Communauté</h3>
                    <p className="text-sm text-gray-600">+17,000 abonnés</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://i.pinimg.com/736x/19/cd/e8/19cde86b3a1d327f9db3830792acc983.jpg"
                alt="Kaaba in Mecca"
                fill
                className="object-cover"
              />

              {/* Decorative elements - contained within parent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FFD700]/10 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FFD700]/10 rounded-full"></div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

              {/* Quote */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="italic text-lg font-light">
                  "Nous rendons votre voyage sacré aussi enrichissant que possible."
                </p>
              </div>
            </div>

            {/* Floating card - adjusted for mobile */}
            <div className="absolute -bottom-8 left-0 sm:-left-8 bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-md overflow-hidden border-2 border-[#FFD700]/30 mr-3">
                  <img
                    src="/logo.jpg"
                    alt="Qafilat Tayba Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Qafilat Tayba</h4>
                  <p className="text-xs text-gray-500">Depuis 1995</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
