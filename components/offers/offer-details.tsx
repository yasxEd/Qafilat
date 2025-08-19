"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

interface OfferDetailsProps {
  id: string
}

export default function OfferDetails({ id }: OfferDetailsProps) {
  const [offerData, setOfferData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    setLoading(true)

    // This would normally be an API call
    setTimeout(() => {
      let data

      if (id === "hajj") {
        data = {
          title: "Offres Hajj",
          subtitle: "Saison 1446H (2025)",
          description:
            "L'agence Qafilat Tayba Voyages est fière d'annoncer l'ouverture des inscriptions pour la saison du Hajj 2025 (1446 H). Nos programmes ont été soigneusement élaborés pour vous offrir une expérience spirituelle inoubliable.",
          features: [
            "Vols directs ou avec une seule escale selon le forfait choisi",
            "Hébergement dans des hôtels de qualité à proximité des lieux saints",
            "Accompagnement par des guides expérimentés parlant français et arabe",
            "Transport terrestre en bus climatisés entre les différents sites",
            "Repas traditionnels préparés selon les normes d'hygiène internationales",
            "Assistance médicale disponible 24h/24",
            "Sessions préparatoires avant le départ pour vous familiariser avec les rituels",
          ],
          packages: [
            {
              name: "Forfait Standard",
              price: "À partir de 75 000 MAD",
              description:
                "Notre forfait standard offre tous les services essentiels pour accomplir votre Hajj dans de bonnes conditions.",
              features: ["Hôtels 3★ à Médine et La Mecque", "Tentes climatisées à Mina", "Repas inclus"],
            },
            {
              name: "Forfait Premium",
              price: "À partir de 95 000 MAD",
              description: "Notre forfait premium vous garantit un confort optimal tout au long de votre pèlerinage.",
              features: [
                "Hôtels 4★ à Médine et La Mecque",
                "Tentes VIP climatisées à Mina",
                "Repas gastronomiques inclus",
              ],
            },
            {
              name: "Forfait VIP",
              price: "À partir de 120 000 MAD",
              description:
                "Pour ceux qui recherchent l'excellence, notre forfait VIP offre des prestations haut de gamme.",
              features: ["Hôtels 5★ à Médine et La Mecque", "Tentes luxueuses à Mina", "Service personnalisé"],
            },
          ],
          faqs: [
            {
              question: "Quand commencent les inscriptions pour le Hajj 2025?",
              answer:
                "Les inscriptions sont ouvertes dès maintenant. Nous vous recommandons de vous inscrire le plus tôt possible car les places sont limitées.",
            },
            {
              question: "Quels documents sont nécessaires pour l'inscription?",
              answer:
                "Vous aurez besoin d'un passeport valide au moins 6 mois après la date de retour, de photos d'identité récentes, d'un certificat de vaccination contre la méningite et d'un acompte pour réserver votre place.",
            },
            {
              question: "Y a-t-il des facilités de paiement?",
              answer: "Oui, nous proposons des plans de paiement échelonnés. Contactez-nous pour plus de détails.",
            },
          ],
          testimonials: [
            {
              name: "Mohammed Alami",
              year: "2023",
              text: "Une organisation impeccable. Les guides étaient très professionnels et attentionnés. Je recommande vivement Qafilat Tayba pour le Hajj.",
            },
            {
              name: "Fatima Benali",
              year: "2023",
              text: "Grâce à Qafilat Tayba, j'ai pu accomplir mon Hajj dans les meilleures conditions. Tout était parfaitement organisé.",
            },
          ],
        }
      } else if (id === "omra") {
        data = {
          title: "Offres Omra",
          subtitle: "Programmes 2024-2025",
          description:
            "Qafilat Tayba Voyages vous propose des programmes d'Omra tout au long de l'année, avec une attention particulière pour les périodes sacrées comme le Ramadan et Chaabane.",
          features: [
            "Billets d'avion aller-retour avec des compagnies aériennes réputées",
            "Hébergement dans des hôtels soigneusement sélectionnés à proximité des lieux saints",
            "Assistance pour l'obtention du visa Omra",
            "Transport entre l'aéroport, Médine et La Mecque",
            "Accompagnement spirituel par des guides expérimentés",
            "Visites des sites historiques à Médine et La Mecque",
          ],
          packages: [
            {
              name: "Omra Chaabane 1446",
              price: "À partir de 15 000 MAD",
              description:
                "Programme spécial pour Chaabane 1446 (février 2025), une période bénie pour accomplir l'Omra.",
              features: ["Départ le 22 février 2025", "Séjour de 12 jours", "Hôtels 4★"],
            },
            {
              name: "Omra Ramadan 1446",
              price: "À partir de 25 000 MAD",
              description: "Vivez l'expérience unique de l'Omra pendant le mois sacré de Ramadan 1446 (mars 2025).",
              features: [
                "Plusieurs dates de départ dès le 6 mars 2025",
                "Séjour de 10 à 15 jours",
                "Hôtels 3★ à 5★ selon votre choix",
              ],
            },
            {
              name: "Omra Janvier 2024",
              price: "À partir de 12 000 MAD",
              description:
                "Programme spécial Miqat Dhul Akhdar, une période idéale pour accomplir l'Omra en toute sérénité.",
              features: ["Du 18 au 30 janvier 2024", "Séjour de 12 jours", "Hôtels 3★"],
            },
          ],
          faqs: [
            {
              question: "Quelle est la meilleure période pour faire l'Omra?",
              answer:
                "Chaque période a ses avantages. Le Ramadan est particulièrement béni, mais aussi plus fréquenté. Les mois comme Chaabane offrent une expérience plus sereine avec moins de foule.",
            },
            {
              question: "Les repas sont-ils inclus dans les forfaits?",
              answer:
                "Cela dépend du forfait choisi. Certains incluent tous les repas, d'autres seulement le petit-déjeuner. Consultez les détails de chaque offre ou contactez-nous pour plus d'informations.",
            },
            {
              question: "Comment se déroule la préparation avant le départ?",
              answer:
                "Nous organisons des sessions d'information pour tous nos pèlerins, où nous expliquons en détail les rituels de l'Omra et fournissons des conseils pratiques pour votre voyage.",
            },
          ],
          testimonials: [
            {
              name: "Ahmed Tazi",
              year: "Ramadan 2023",
              text: "L'Omra pendant le Ramadan avec Qafilat Tayba a été une expérience spirituelle extraordinaire. L'organisation était parfaite malgré la foule.",
            },
            {
              name: "Khadija Mansouri",
              year: "Janvier 2023",
              text: "J'ai apprécié la qualité des services et l'accompagnement spirituel. Les hôtels étaient bien situés et confortables.",
            },
          ],
        }
      } else if (id === "leisure") {
        data = {
          title: "Voyages Loisirs",
          subtitle: "Découvrez Istanbul",
          description:
            "Qafilat Tayba Voyages vous invite à découvrir les merveilles d'Istanbul avec nos circuits touristiques spécialement conçus pour allier confort, découverte culturelle et détente.",
          features: [
            "Vols directs entre le Maroc et Istanbul",
            "Hébergement dans des hôtels 4★ idéalement situés",
            "Transferts aéroport-hôtel inclus",
            "Visites guidées des principaux sites touristiques",
            "Temps libre pour le shopping et les découvertes personnelles",
            "Guide francophone expérimenté",
          ],
          packages: [
            {
              name: "Circuit Istanbul Juin 2025",
              price: "À partir de 8 700 MAD",
              description: "Un voyage de 8 jours pour découvrir les trésors d'Istanbul, entre Orient et Occident.",
              features: ["Du 5 au 12 juin ou du 15 au 22 juin 2025", "Hôtel 4★", "Visites guidées incluses"],
            },
            {
              name: "Escapade Istanbul 2024",
              price: "À partir de 7 800 MAD",
              description:
                "Une semaine pour s'immerger dans l'atmosphère unique d'Istanbul, à la croisée des cultures.",
              features: ["Plusieurs dates disponibles en 2024", "Hôtel 4★", "Programme complet de visites"],
            },
            {
              name: "Istanbul Shopping & Culture",
              price: "À partir de 9 500 MAD",
              description:
                "Un programme équilibré entre visites culturelles et temps libre pour le shopping dans les célèbres bazars.",
              features: ["Dates flexibles", "Hôtel 4★ en centre-ville", "Guide spécialisé en histoire et culture"],
            },
          ],
          faqs: [
            {
              question: "Faut-il un visa pour se rendre en Turquie?",
              answer:
                "Les ressortissants marocains sont exemptés de visa pour des séjours touristiques de moins de 90 jours en Turquie.",
            },
            {
              question: "Quelle est la meilleure période pour visiter Istanbul?",
              answer:
                "Le printemps (avril-mai) et l'automne (septembre-octobre) offrent des températures agréables et moins de touristes. L'été peut être chaud et très fréquenté, tandis que l'hiver est plus frais mais offre des prix plus avantageux.",
            },
            {
              question: "La monnaie utilisée en Turquie?",
              answer:
                "La monnaie locale est la livre turque (TRY). Les cartes de crédit sont largement acceptées dans les hôtels, restaurants et grands magasins, mais il est conseillé d'avoir un peu d'argent liquide pour les petits commerces.",
            },
          ],
          testimonials: [
            {
              name: "Karim Benjelloun",
              year: "Juin 2023",
              text: "Un voyage parfaitement organisé. L'hôtel était idéalement situé, les visites très intéressantes et le guide excellent. Je recommande vivement!",
            },
            {
              name: "Nadia El Fassi",
              year: "Octobre 2023",
              text: "Istanbul est une ville fascinante et Qafilat Tayba nous a permis de la découvrir dans les meilleures conditions. Un excellent rapport qualité-prix.",
            },
          ],
        }
      } else {
        data = {
          title: "Offre non trouvée",
          description: "Désolé, nous n'avons pas trouvé l'offre que vous recherchez.",
        }
      }

      setOfferData(data)
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/5 mb-2"></div>
        </div>
      </div>
    )
  }

  if (!offerData) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center">Offre non trouvée</h2>
      </div>
    )
  }

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Overview Section */}
          <div className="mb-12">
            <div className="flex flex-col items-center text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{offerData.title}</h1>
              <div className="w-16 h-1 bg-[#FFD700] mb-4"></div>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">{offerData.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl">{offerData.description}</p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {offerData.features?.map((feature: string, index: number) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link href="/direct-reservation">
                <Button className="bg-[#FFD700] hover:bg-[#E6C200] text-black px-6 py-6 h-auto text-base">
                  Réserver maintenant
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <Tabs defaultValue="packages" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger
                  value="packages"
                  className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black"
                >
                  Forfaits
                </TabsTrigger>
                <TabsTrigger value="faqs" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">
                  FAQ
                </TabsTrigger>
                <TabsTrigger
                  value="testimonials"
                  className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black"
                >
                  Témoignages
                </TabsTrigger>
              </TabsList>

              {/* Packages Tab */}
              <TabsContent value="packages" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {offerData.packages?.map((pkg: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
                    >
                      {/* Package Header */}
                      <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 border-b border-gray-100">
                        <h3 className="font-bold text-lg">{pkg.name}</h3>
                      </div>

                      {/* Package Content */}
                      <div className="p-5 flex-grow">
                        <p className="text-muted-foreground mb-4 text-sm">{pkg.description}</p>

                        {/* Features List */}
                        <ul className="space-y-2 mt-4">
                          {pkg.features?.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <Check className="h-4 w-4 text-[#FFD700] mr-2 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Package Footer */}
                      <div className="px-5 pb-5 pt-2 mt-auto">
                        <Link href="/direct-reservation">
                          <Button
                            variant="outline"
                            className="w-full border-[#FFD700] hover:bg-[#FFD700] hover:text-black text-sm"
                          >
                            Réserver ce forfait
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* FAQs Tab */}
              <TabsContent value="faqs">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <Accordion type="single" collapsible className="w-full">
                    {offerData.faqs?.map((faq: any, index: number) => (
                      <AccordionItem key={index} value={`faq-${index}`} className="border-b border-gray-100 px-4">
                        <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>

              {/* Testimonials Tab */}
              <TabsContent value="testimonials">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {offerData.testimonials?.map((testimonial: any, index: number) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mr-4">
                          <Users size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.year}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground italic text-sm">"{testimonial.text}"</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-1 mb-6 md:mb-0 md:mr-6">
                <h2 className="text-xl font-semibold mb-2">Besoin de plus d'informations?</h2>
                <p className="text-muted-foreground text-sm">
                  Notre équipe est à votre disposition pour répondre à toutes vos questions et vous aider à choisir le
                  forfait qui correspond le mieux à vos besoins.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-[#FFD700] text-black hover:bg-[#FFD700] hover:text-black w-full sm:w-auto"
                  >
                    Contactez-nous
                  </Button>
                </Link>
                <Link href="/direct-reservation">
                  <Button className="bg-[#FFD700] hover:bg-[#E6C200] text-black w-full sm:w-auto">
                    Réserver maintenant
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
