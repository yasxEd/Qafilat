"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqData = {
  general: [
    {
      question: "Qu'est-ce que Qafilat Tayba?",
      answer:
        "Qafilat Tayba est une agence de voyage spécialisée dans l'organisation des pèlerinages d'Omra et de Hajj depuis 1995. Nous offrons des services complets pour vous accompagner dans votre voyage spirituel.",
    },
    {
      question: "Quels services proposez-vous?",
      answer:
        "Nous proposons des forfaits complets pour le Hajj et l'Omra incluant les vols, l'hébergement, les transferts, l'accompagnement spirituel, et l'assistance sur place. Nous offrons également des services personnalisés selon vos besoins.",
    },
    {
      question: "Êtes-vous une agence agréée?",
      answer:
        "Oui, Qafilat Tayba est une agence officiellement agréée par le Ministère du Hajj d'Arabie Saoudite et par les autorités marocaines pour l'organisation des pèlerinages.",
    },
    {
      question: "Où sont situés vos bureaux?",
      answer:
        "Notre siège principal est situé à Marrakech, et nous avons des bureaux à Casablanca et Rabat. Vous pouvez consulter notre page Contact pour les adresses exactes et les horaires d'ouverture.",
    },
  ],
  travel: [
    {
      question: "Quelles compagnies aériennes utilisez-vous?",
      answer:
        "Nous collaborons principalement avec Royal Air Maroc et Saudia Airlines pour garantir des vols directs et confortables vers l'Arabie Saoudite.",
    },
    {
      question: "Comment se déroulent les transferts sur place?",
      answer:
        "Tous nos forfaits incluent les transferts en bus climatisés entre l'aéroport, les hôtels, et les lieux saints. Nos représentants vous accueillent à l'aéroport et vous accompagnent tout au long de votre séjour.",
    },
    {
      question: "Quelle est la durée moyenne d'un voyage d'Omra?",
      answer:
        "Nos forfaits Omra varient généralement entre 10 et 15 jours, avec la possibilité de personnaliser la durée selon vos préférences et disponibilités.",
    },
    {
      question: "Proposez-vous des visites de Médine dans vos forfaits?",
      answer:
        "Oui, la plupart de nos forfaits incluent un séjour à Médine pour visiter la Mosquée du Prophète et les sites historiques environnants.",
    },
  ],
  payment: [
    {
      question: "Quels sont les modes de paiement acceptés?",
      answer:
        "Nous acceptons les paiements par virement bancaire, carte de crédit, et en espèces dans nos agences. Nous proposons également des facilités de paiement en plusieurs versements.",
    },
    {
      question: "Y a-t-il des frais supplémentaires non inclus dans le forfait?",
      answer:
        "Nos forfaits sont généralement tout compris. Les seuls frais supplémentaires peuvent concerner les dépenses personnelles, certains repas spécifiques, ou des services optionnels clairement indiqués.",
    },
    {
      question: "Quelle est votre politique d'annulation et de remboursement?",
      answer:
        "Notre politique d'annulation varie selon le type de forfait et la période avant le départ. En général, une annulation plus de 60 jours avant le départ permet un remboursement partiel. Nous vous recommandons de souscrire à une assurance voyage.",
    },
    {
      question: "Proposez-vous des réductions pour les groupes?",
      answer:
        "Oui, nous offrons des tarifs préférentiels pour les groupes à partir de 10 personnes. Contactez-nous pour obtenir un devis personnalisé.",
    },
  ],
  booking: [
    {
      question: "Comment réserver un voyage avec Qafilat Tayba?",
      answer:
        "Vous pouvez réserver en ligne via notre site web, par téléphone, ou en vous rendant directement dans l'une de nos agences. Notre équipe vous guidera tout au long du processus.",
    },
    {
      question: "Quel est le délai minimum pour réserver avant le départ?",
      answer:
        "Pour l'Omra, nous recommandons de réserver au moins 1 mois à l'avance. Pour le Hajj, les réservations doivent être effectuées plusieurs mois à l'avance en raison des quotas limités.",
    },
    {
      question: "Puis-je modifier ma réservation après confirmation?",
      answer:
        "Des modifications peuvent être apportées selon disponibilité et délais. Des frais peuvent s'appliquer selon la nature des changements et la proximité de la date de départ.",
    },
    {
      question: "Comment savoir si ma réservation est confirmée?",
      answer:
        "Après votre réservation, vous recevrez une confirmation par email. Votre réservation n'est définitivement confirmée qu'après réception de l'acompte ou du paiement complet selon les conditions.",
    },
  ],
  documents: [
    {
      question: "Quels documents sont nécessaires pour le Hajj et l'Omra?",
      answer:
        "Vous aurez besoin d'un passeport valide au moins 6 mois après la date de retour, des photos d'identité, du formulaire de demande de visa complété, et d'un certificat de vaccination contre la méningite ACWY.",
    },
    {
      question: "Comment obtenir un visa pour le Hajj ou l'Omra?",
      answer:
        "Qafilat Tayba s'occupe de toutes les formalités de visa pour vous. Nous vous fournirons la liste des documents à nous soumettre et nous gérerons l'ensemble du processus.",
    },
    {
      question: "Faut-il des vaccinations spécifiques?",
      answer:
        "Le vaccin contre la méningite ACWY est obligatoire pour tous les pèlerins. D'autres vaccinations peuvent être recommandées selon la saison et les exigences sanitaires en vigueur.",
    },
    {
      question: "Quand dois-je soumettre mes documents pour le traitement du visa?",
      answer:
        "Nous recommandons de soumettre tous les documents nécessaires au moins 4 à 6 semaines avant la date de départ pour éviter tout retard dans le traitement.",
    },
  ],
  groups: [
    {
      question: "Proposez-vous des forfaits spéciaux pour les familles?",
      answer:
        "Oui, nous proposons des forfaits familiaux avec des chambres communicantes ou des suites familiales, ainsi que des tarifs préférentiels pour les enfants selon leur âge.",
    },
    {
      question: "Comment sont organisés les groupes pendant le voyage?",
      answer:
        "Nos groupes sont généralement composés de 25 à 30 personnes, accompagnés par un guide spirituel et un représentant de notre agence pour assurer un voyage serein et bien organisé.",
    },
    {
      question: "Peut-on voyager en groupe privé?",
      answer:
        "Absolument, nous organisons des voyages pour des groupes privés comme des associations, des mosquées ou des familles élargies. Contactez-nous pour un forfait personnalisé.",
    },
    {
      question: "Y a-t-il des guides francophones dans vos groupes?",
      answer:
        "Oui, tous nos groupes sont accompagnés par des guides parlant français et arabe, et certains groupes disposent également de guides parlant d'autres langues selon la composition du groupe.",
    },
  ],
}

export default function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState("general")
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
          <div className="w-16 h-1 bg-[#FFD700] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus fréquemment posées par nos clients.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {Object.keys(faqData).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category ? "bg-[#FFD700] text-black" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => {
                setActiveCategory(category)
                setOpenItems([])
              }}
            >
              {category === "general" && "Général"}
              {category === "travel" && "Voyage"}
              {category === "payment" && "Paiement"}
              {category === "booking" && "Réservations"}
              {category === "documents" && "Documents"}
              {category === "groups" && "Groupes"}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          {faqData[activeCategory as keyof typeof faqData].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full p-4 text-left bg-white flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openItems.includes(index) ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
