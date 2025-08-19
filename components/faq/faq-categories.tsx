"use client"

import { motion } from "framer-motion"
import { BookOpen, Plane, CreditCard, Calendar, FileText, Users } from "lucide-react"
import { useState } from "react"

const categories = [
  {
    id: "general",
    title: "Informations Générales",
    icon: <BookOpen className="h-6 w-6" />,
    description: "Questions générales sur nos services et notre agence",
  },
  {
    id: "travel",
    title: "Voyage & Transport",
    icon: <Plane className="h-6 w-6" />,
    description: "Informations sur les vols, transferts et déplacements",
  },
  {
    id: "payment",
    title: "Paiement & Tarifs",
    icon: <CreditCard className="h-6 w-6" />,
    description: "Questions sur les tarifs, modes de paiement et remboursements",
  },
  {
    id: "booking",
    title: "Réservations",
    icon: <Calendar className="h-6 w-6" />,
    description: "Processus de réservation et conditions",
  },
  {
    id: "documents",
    title: "Documents & Visas",
    icon: <FileText className="h-6 w-6" />,
    description: "Informations sur les documents nécessaires et visas",
  },
  {
    id: "groups",
    title: "Groupes & Familles",
    icon: <Users className="h-6 w-6" />,
    description: "Questions sur les voyages en groupe ou en famille",
  },
]

export default function FaqCategories() {
  const [activeCategory, setActiveCategory] = useState("general")

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Catégories</h2>
          <div className="w-16 h-1 bg-[#FFD700] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sélectionnez une catégorie pour trouver rapidement les réponses à vos questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                activeCategory === category.id
                  ? "border-[#FFD700] bg-[#FFD700]/5"
                  : "border-gray-200 hover:border-[#FFD700]/50"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`p-3 rounded-full mr-4 ${activeCategory === category.id ? "bg-[#FFD700]" : "bg-gray-100"}`}
                >
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg">{category.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
