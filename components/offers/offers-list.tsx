"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, Plane } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OffersList() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const offers = [
    {
      id: "hajj",
      title: "Hajj",
      subtitle: "Saison 1446H (2025)",
      icon: <Calendar className="h-6 w-6 text-[#FFD700]" />,
      description:
        "Inscriptions ouvertes pour le Hajj 2025 avec des programmes complets incluant transport, hébergement et accompagnement spirituel. Nos forfaits sont conçus pour vous offrir une expérience spirituelle inoubliable avec un accompagnement de qualité.",
      image: "/f6.avif",
    },
    {
      id: "omra",
      title: "Omra",
      subtitle: "Programmes 2024-2025",
      icon: <MapPin className="h-6 w-6 text-[#FFD700]" />,
      description:
        "Programmes d'Omra pour toutes les saisons, incluant Ramadan et Chaabane, avec des forfaits tout compris à des prix avantageux. Profitez de notre expertise pour accomplir votre Omra dans les meilleures conditions avec un service personnalisé.",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "leisure",
      title: "Voyages Loisirs",
      subtitle: "Découvrez Istanbul",
      icon: <Plane className="h-6 w-6 text-[#FFD700]" />,
      description:
        "Circuits touristiques en Turquie à partir de 7800 MAD, incluant hébergement 4★, vols et transferts pour juin 2025. Explorez les merveilles d'Istanbul avec nos guides expérimentés et profitez d'un séjour inoubliable à la croisée des cultures.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Nos Offres de Voyage</h2>
          <div className="w-16 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-muted-foreground">
            Découvrez nos forfaits exclusifs pour le Hajj, l'Omra et les voyages de loisirs, soigneusement conçus pour
            répondre à vos besoins.
          </p>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col space-y-12">
          {offers.map((offer, index) => (
            <motion.div key={offer.id} variants={item} className="group">
              <div
                className={`flex flex-col ${
                  index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300`}
              >
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 h-80 md:h-[400px]">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                  <div className="absolute bottom-0 left-0 p-4 md:hidden">
                    <div className="flex items-center gap-2 mb-1">
                      {offer.icon}
                      <span className="font-medium text-white">{offer.title}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{offer.subtitle}</h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                  <div className="hidden md:flex items-center gap-2 mb-2">
                    {offer.icon}
                    <span className="font-medium text-gray-500">{offer.title}</span>
                  </div>
                  <h3 className="hidden md:block text-2xl font-bold mb-4">{offer.subtitle}</h3>
                  <p className="text-muted-foreground mb-6">{offer.description}</p>
                  <div>
                    <Link href={`/offers/${offer.id}`}>
                      <Button
                        variant="outline"
                        className="group-hover:border-[#FFD700] group-hover:text-[#FFD700] transition-colors"
                      >
                        Voir les détails
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
