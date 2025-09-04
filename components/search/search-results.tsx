"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Check, 
  ChevronRight, 
  Users, 
  Plane, 
  Phone,
  Hotel as HotelIcon, 
  MapPin, 
  Calendar, 
  ArrowLeft, 
  Star, 
  Heart, 
  Bookmark,
  Filter,
  SlidersHorizontal,
  Search,
  Clock,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"

interface TarifsChambre {
  quintuple: string;
  quadruple: string;
  triple: string;
  double: string;
}

interface Hotel {
  id: string;
  nom: string;
  distance?: string;
  tarifsChambre: TarifsChambre;
  offerTitle?: string; // Added to fix compile error
  offerDestination?: string;
  offerDates?: DateDisponible[];
  offerId?: string;
  offerImage?: string; // Added to fix compile error
  offerHebergement?: string; // Added to fix compile error
  offerPrixBase?: string;
  offerNote?: number;
  offerCompagniesAeriennes?: string;
  offerDuree?: string;
  offerNombrePersonnes?: string;
}

interface DateDisponible {
  id: string;
  dateDebut: string;
  dateFin: string;
  periode: string;
}

interface Offre {
  id: string;
  titre: string;
  periode: string;
  datesDisponibles: DateDisponible[];
  prixBase: string;
  compagniesAeriennes: string;
  hebergement: string;
  hotels: Hotel[];
  tarifsChambre: TarifsChambre;
  servicesInclus: string[];
  image: string;
  destination: string;
  duree: string;
  note: number;
  nombrePersonnes: string;
  dateCreation: string;
  statut: 'active' | 'inactive' | 'brouillon';
  category?: string; // Added to fix compile error
}

export default function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [offers, setOffers] = useState<Offre[]>([])
  const [filteredOffers, setFilteredOffers] = useState<Offre[]>([])
  const [hotelResults, setHotelResults] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOffer, setSelectedOffer] = useState<Offre | null>(null)
  const [alternativeOffers, setAlternativeOffers] = useState<Offre[]>([])
  const [showAlternatives, setShowAlternatives] = useState(false)

  // Get search parameters
  const searchType = searchParams.get("type") || ""
  const departureCity = searchParams.get("departureCity") || ""
  const destination = searchParams.get("destination") || ""
  const forfait = searchParams.get("forfait") || ""
  const tripType = searchParams.get("tripType") || ""
  const duration = searchParams.get("duration") || ""
  const flightClass = searchParams.get("class") || ""
  const checkIn = searchParams.get("checkIn") || ""
  const checkOut = searchParams.get("checkOut") || ""
  const rooms = searchParams.get("rooms") || ""
  const adults = searchParams.get("adults") || ""
  const children = searchParams.get("children") || ""

  // Load and filter offers
  useEffect(() => {
    setLoading(true)

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("offres")
      if (saved) {
        const allOffers = JSON.parse(saved) as Offre[]

        if (searchType === "hotel") {
          // Extract all hotels from all offers, including those from hebergement
          const allHotels: Hotel[] = []

          allOffers.forEach(offer => {
            if (offer.statut === 'active') {
              // Add hotels from hotels array
              if (offer.hotels && offer.hotels.length > 0) {
                offer.hotels.forEach(hotel => {
                  allHotels.push({
                    ...hotel,
                    offerTitle: offer.titre,
                    offerDestination: offer.destination,
                    offerDates: offer.datesDisponibles,
                    offerId: offer.id,
                    offerImage: offer.image,
                    offerHebergement: offer.hebergement,
                    offerPrixBase: offer.prixBase,
                    offerNote: offer.note,
                    offerCompagniesAeriennes: offer.compagniesAeriennes,
                    offerDuree: offer.duree,
                    offerNombrePersonnes: offer.nombrePersonnes
                  })
                })
              }
              // Extract hotels from hebergement field if not already in hotels array
              if (offer.hebergement && offer.hebergement.trim()) {
                const hebergementText = offer.hebergement.toLowerCase()
                const hotelKeywords = [
                  'hôtel', 'hotel', 'résidence', 'palace', 'towers', 'crown plaza', 'marriott', 'hilton', 'fairmont',
                  'swiss', 'intercontinental', 'dar al-iman', 'abraj', 'rotana', 'sofitel', 'shaza', 'ajyad', 'pullman', 'mövenpick'
                ]
                const hasHotelKeywords = hotelKeywords.some(keyword => hebergementText.includes(keyword))
                if (hasHotelKeywords || hebergementText.includes('médine') || hebergementText.includes('la mecque') || hebergementText.includes('makkah') || hebergementText.includes('madinah')) {
                  // Avoid duplicates: only add if not already in hotels array
                  const alreadyExists = offer.hotels.some(hotel => offer.hebergement.includes(hotel.nom))
                  if (!alreadyExists) {
                    allHotels.push({
                      id: `${offer.id}-hebergement`,
                      nom: offer.hebergement.split('-')[0]?.trim() || offer.hebergement.substring(0, 50),
                      distance: offer.hebergement.includes('mosquée') || offer.hebergement.includes('haram') ? 'Proche des lieux saints' : '',
                      tarifsChambre: offer.tarifsChambre || { quintuple: '', quadruple: '', triple: '', double: '' },
                      offerTitle: offer.titre,
                      offerDestination: offer.destination,
                      offerDates: offer.datesDisponibles,
                      offerId: offer.id,
                      offerImage: offer.image,
                      offerHebergement: offer.hebergement,
                      offerPrixBase: offer.prixBase,
                      offerNote: offer.note,
                      offerCompagniesAeriennes: offer.compagniesAeriennes,
                      offerDuree: offer.duree,
                      offerNombrePersonnes: offer.nombrePersonnes
                    })
                  }
                }
              }
            }
          })

          // Filter hotels by destination if specified
          let filteredHotels = allHotels
          if (destination) {
            filteredHotels = allHotels.filter(hotel =>
              hotel.offerDestination?.toLowerCase().includes(destination.toLowerCase()) ||
              hotel.nom.toLowerCase().includes(destination.toLowerCase()) ||
              hotel.offerHebergement?.toLowerCase().includes(destination.toLowerCase())
            )
          }

          // Do NOT filter by check-in/check-out dates, show all hotels
          setHotelResults(filteredHotels)
          setFilteredOffers([])
        } else if (searchType === "vol") {
          // Show all vols matching the destination (ignore dates)
          const vols = allOffers.filter(offer =>
            offer.statut === 'active' &&
            offer.compagniesAeriennes &&
            (
              (destination && (
                offer.destination.toLowerCase().includes(destination.toLowerCase()) ||
                offer.titre.toLowerCase().includes(destination.toLowerCase())
              )) ||
              !destination // If no destination, show all vols
            )
          )
          setFilteredOffers(vols)
          setHotelResults([])
        } else {
          // Regular offer filtering logic
          const filtered = allOffers.filter((offer) => {
            if (offer.statut !== 'active') return false

            const titleLower = offer.titre.toLowerCase()
            const destinationLower = offer.destination.toLowerCase()
            
            let typeMatch = false
            if (searchType === "hajj") {
              typeMatch = offer.category === 'hajj' || titleLower.includes("hajj")
            } else if (searchType === "umrah") {
              typeMatch = offer.category === 'omra' || 
                         titleLower.includes("omra") || 
                         titleLower.includes("umrah") || 
                         titleLower.includes("omrah")
            } else if (searchType === "leisure") {
              typeMatch = !titleLower.includes("hajj") && 
                         !titleLower.includes("omra") && 
                         !titleLower.includes("umrah") &&
                         (titleLower.includes("voyage") || 
                          titleLower.includes("loisir") ||
                          titleLower.includes("istanbul") ||
                          titleLower.includes("turquie"))
            } else if (searchType === "vol") {
              typeMatch = offer.compagniesAeriennes !== ""
            } else {
              typeMatch = true
            }

            if (!typeMatch) return false

            if (destination && !destinationLower.includes(destination.toLowerCase())) {
              return false
            }

            return true
          })

          // Check for exact date matches for non-hotel searches
          let exactDateMatches = filtered
          let hasDateFilter = false

          if (checkIn && checkOut) {
            hasDateFilter = true
            const searchCheckIn = new Date(checkIn)
            const searchCheckOut = new Date(checkOut)
            
            exactDateMatches = filtered.filter(offer => {
              if (offer.datesDisponibles && offer.datesDisponibles.length > 0) {
                return offer.datesDisponibles.some(date => {
                  const offerStart = new Date(date.dateDebut)
                  const offerEnd = new Date(date.dateFin)
                  return searchCheckIn >= offerStart && searchCheckOut <= offerEnd
                })
              }
              return true
            })
          }

          if (hasDateFilter && exactDateMatches.length === 0 && destination) {
            const destinationMatches = allOffers.filter(offer => 
              offer.statut === 'active' && 
              offer.destination.toLowerCase().includes(destination.toLowerCase())
            )
            
            if (destinationMatches.length > 0) {
              setAlternativeOffers(destinationMatches)
              setShowAlternatives(true)
            }
          } else {
            setShowAlternatives(false)
            setAlternativeOffers([])
          }

          setFilteredOffers(exactDateMatches)
          setHotelResults([]) // Clear hotel results for non-hotel searches
        }

        setOffers(allOffers)
      }
    }
    
    setLoading(false)
  }, [searchParams])

  const getSearchTypeLabel = () => {
    switch (searchType) {
      case "hajj": return "Hajj"
      case "umrah": return "Omra"
      case "leisure": return "Voyages Loisirs"
      case "hotel": return "Hôtels"
      case "vol": return "Vols"
      default: return "Offres"
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Hero Section Component
  const SearchHero = () => {
    const getHeroContent = () => {
      switch (searchType) {
        case "hajj":
          return {
            title: "Offres Hajj",
            subtitle: "Accomplissez le cinquième pilier de l'Islam",
            gradient: "from-amber-600 via-amber-500 to-orange-500"
          }
        case "umrah":
        case "omra":
          return {
            title: "Offres Omra",
            subtitle: "La petite pèlerinage à votre portée",
            gradient: "from-emerald-600 via-emerald-500 to-teal-500"
          }
        case "leisure":
          return {
            title: "Voyages Loisirs",
            subtitle: "Découvrez de nouvelles destinations",
            gradient: "from-blue-600 via-blue-500 to-indigo-500"
          }
        case "hotel":
          return {
            title: "Hôtels Premium",
            subtitle: "Hébergements d'exception",
            gradient: "from-purple-600 via-purple-500 to-violet-500"
          }
        case "vol":
          return {
            title: "Vols Premium",
            subtitle: "Voyagez en toute sérénité",
            gradient: "from-sky-600 via-sky-500 to-cyan-500"
          }
        default:
          return {
            title: "Résultats de recherche",
            subtitle: "Trouvez votre voyage idéal",
            gradient: "from-neutral-600 via-neutral-500 to-gray-500"
          }
      }
    }

    const heroContent = getHeroContent()

    return (
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${heroContent.gradient} opacity-90`}></div>
          <Image
            src="/hero-bg.avif"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-white/20 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full border border-white/10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full border border-white/30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Modifier la recherche</span>
              </button>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-4 leading-tight tracking-tight">
                {heroContent.title}
              </h1>
              <div className="w-24 h-0.5 bg-gradient-to-r from-white to-white/50 mb-6"></div>
              <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
                {heroContent.subtitle}
              </p>
              <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                {/* {heroContent.description} */}
              </p>
            </motion.div>

            {/* Search criteria summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 flex flex-wrap gap-3"
            >
              {destination && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {destination}
                </div>
              )}
              {adults && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {adults} adulte{parseInt(adults) > 1 ? "s" : ""}
                </div>
              )}
              {checkIn && checkOut && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(checkIn).toLocaleDateString("fr-FR", { month: 'short', day: 'numeric' })} - {new Date(checkOut).toLocaleDateString("fr-FR", { month: 'short', day: 'numeric' })}
                </div>
              )}
              {flightClass && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  {flightClass}
                </div>
              )}
            </motion.div>

            {/* Results count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <p className="text-white/90 text-lg font-light">
                <span className="font-medium">{searchType === "hotel" ? hotelResults.length : filteredOffers.length}</span> {searchType === "hotel" ? "hôtel" : "offre"}{(searchType === "hotel" ? hotelResults.length : filteredOffers.length) > 1 ? "s" : ""} trouvé{(searchType === "hotel" ? hotelResults.length : filteredOffers.length) > 1 ? "s" : ""}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="space-y-4 animate-pulse">
              <div className="h-12 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-xl w-96 mx-auto"></div>
              <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-64 mx-auto"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse border border-neutral-200/60">
                <div className="h-48 bg-gradient-to-r from-neutral-200 to-neutral-300"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg"></div>
                    <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // If an offer is selected, show detailed view
  if (selectedOffer) {
    return (
      <div className="min-h-screen bg-white">
        {/* Enhanced Hero Section with Image */}
        <div className="relative h-[70vh] overflow-hidden">
          {selectedOffer.image && (
            <div className="absolute inset-0">
              <img
                src={selectedOffer.image}
                alt={selectedOffer.titre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
            </div>
          )}
          
          {/* Back Button */}
          <div className="absolute top-8 left-8 z-20">
            <button
              onClick={() => setSelectedOffer(null)}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200 group px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Retour aux résultats</span>
            </button>
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-8 pb-16 w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
              >
               
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
                  {selectedOffer.titre}
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed">
                  {selectedOffer.periode}
                </p>
                
                <div className="flex flex-wrap gap-6 text-white/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Destination</p>
                      <p className="font-medium">{selectedOffer.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Groupe</p>
                      <p className="font-medium">{selectedOffer.nombrePersonnes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Durée</p>
                      <p className="font-medium">{selectedOffer.duree}</p>
                    </div>
                  </div>
                </div>
                
                {selectedOffer.hebergement && (
                  <p className="text-white/80 mt-8 max-w-3xl leading-relaxed text-lg">
                    {selectedOffer.hebergement}
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-8 right-8 flex items-center gap-3">
            <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200 rounded-full">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200 rounded-full">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Price Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-br from-amber-50 to-amber-50 border border-amber-200/50 rounded-3xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-5xl lg:text-6xl font-light text-gray-900">{selectedOffer.prixBase}</span>
                    <div className="text-gray-600">
                      <p className="text-lg font-medium">par personne</p>
                      <p className="text-sm">Tout inclus</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span>Garantie meilleur prix</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400" />
                      <span>Annulation gratuite 72h</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-amber-300 text-white bg-amber-400 hover:bg-amber-50 px-8 py-4 h-auto rounded-2xl font-medium text-lg"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Nous appeler
                    </Button>
                  </Link>
                  <Link href="/direct-reservation">
                    <Button className="bg-black hover:bg-amber-500 text-white px-8 py-4 h-auto rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                      Réserver maintenant
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          {selectedOffer.servicesInclus && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-gray-900 mb-4">Ce qui est inclus</h2>
                <p className="text-lg text-gray-600">Profitez d'un voyage tout compris avec nos services premium</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedOffer.servicesInclus.map((service: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Check className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{service}</h3>
                        <p className="text-sm text-gray-600">Service inclus dans votre forfait</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Enhanced Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-20"
          >
            <Tabs defaultValue="packages" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-white p-2 rounded-2xl inline-flex">
                  <TabsTrigger
                    value="packages"
                    className="rounded-xl px-6 py-3 font-medium text-lg data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    <HotelIcon className="w-5 h-5 mr-2" />
                    Hôtels
                  </TabsTrigger>
                  <TabsTrigger
                    value="faqs"
                    className="rounded-xl px-6 py-3 font-medium text-lg data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Dates
                  </TabsTrigger>
                  <TabsTrigger
                    value="testimonials"
                    className="rounded-xl px-6 py-3 font-medium text-lg data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Tarifs
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Hotels Tab with enhanced design */}
              <TabsContent value="packages" className="space-y-8">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-light text-gray-900 mb-2">Hébergements sélectionnés</h3>
                  <p className="text-gray-600">Des hôtels de qualité pour votre confort</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {selectedOffer.hotels?.map((hotel: Hotel, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-100 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <HotelIcon className="w-12 h-12 text-amber-400" />
                        </div>
                        {hotel.distance && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
                              {hotel.distance}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-8">
                        <h4 className="text-xl font-medium text-gray-900 mb-6">{hotel.nom}</h4>
                        
                        <div className="space-y-4">
                          {hotel.tarifsChambre &&
                            Object.entries(hotel.tarifsChambre).map(([type, prix]) =>
                              prix ? (
                                <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                  <div>
                                    <span className="font-medium text-gray-900 capitalize">{type}</span>
                                    <p className="text-sm text-gray-600">Chambre {type}</p>
                                  </div>
                                  <span className="text-xl font-semibold text-gray-900">{prix} DH</span>
                                </div>
                              ) : null
                            )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Enhanced Dates Tab */}
              <TabsContent value="faqs">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-light text-gray-900 mb-2">Dates disponibles</h3>
                  <p className="text-gray-600">Choisissez la période qui vous convient</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedOffer.datesDisponibles?.map((date: DateDisponible, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-amber-400 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors duration-200">
                          <Calendar className="w-8 h-8 text-amber-400" />
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">{date.periode}</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Du {new Date(date.dateDebut).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} au {new Date(date.dateFin).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                        </p>
                        <div className="text-lg font-semibold text-amber-400">{selectedOffer.prixBase}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Enhanced Tarifs Tab */}
              <TabsContent value="testimonials">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="bg-white border border-gray-200 rounded-3xl p-8">
                    <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-amber-400" />
                      </div>
                      Tarifs par chambre
                    </h3>
                    <div className="space-y-4">
                      {selectedOffer.tarifsChambre &&
                        Object.entries(selectedOffer.tarifsChambre).map(([type, prix]) =>
                          prix ? (
                            <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <span className="font-medium text-gray-700 capitalize">Chambre {type}</span>
                              <span className="text-xl font-semibold text-gray-900">{prix} DH</span>
                            </div>
                          ) : null
                        )}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-amber-50 border border-amber-200 rounded-3xl p-8 text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Star className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-4">Prix de base</h3>
                    <p className="text-5xl font-light text-gray-900 mb-2">{selectedOffer.prixBase}</p>
                    <p className="text-gray-600 mb-6">par personne</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 text-amber-400" />
                        <span>Tout inclus</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 text-amber-400" />
                        <span>Sans frais cachés</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Enhanced Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 lg:p-12 text-white"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light mb-4">Des questions ?</h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Notre équipe d'experts est disponible pour vous accompagner dans votre projet de voyage
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 h-auto rounded-2xl font-medium text-lg bg-transparent"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Nous contacter
                </Button>
              </Link>
              <Link href="/direct-reservation">
                <Button className="bg-amber-400 hover:bg-amber-500 text-white px-8 py-4 h-auto rounded-2xl font-medium text-lg shadow-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Réserver maintenant
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Hotel Results Component
  const HotelResults = () => (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {hotelResults.map((hotel, idx) => (
        <motion.div key={`${hotel.nom}-${hotel.offerId}-${idx}`} variants={item}>
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl border border-neutral-200/60 overflow-hidden hover:shadow-2xl hover:border-neutral-300/60 transition-all duration-500">
            <div className="relative">
              <div className="h-64 bg-gradient-to-br from-neutral-200 to-neutral-300 relative overflow-hidden">
                <img
                  src={hotel.offerImage || `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&auto=format&q=80`}
                  alt={hotel.nom}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&auto=format&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    Hôtel
                  </span>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-white">{hotel.offerNote || 4.5}</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-light text-neutral-800 mb-2 leading-tight">
                  {hotel.nom}
                </h3>
                {hotel.distance && (
                  <p className="text-neutral-600 font-light text-sm">{hotel.distance}</p>
                )}
                {hotel.offerHebergement && hotel.offerHebergement !== hotel.nom && (
                  <p className="text-neutral-500 font-light text-xs mt-1 line-clamp-2">
                    {hotel.offerHebergement}
                  </p>
                )}
                <p className="text-neutral-500 font-light text-sm mt-2">
                  Disponible dans: <span className="font-medium">{hotel.offerTitle}</span>
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 mr-3 text-emerald-500" />
                  <span className="font-light">{hotel.offerDestination}</span>
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <Calendar className="w-4 h-4 mr-3 text-emerald-500" />
                  <span className="font-light">
                    {hotel.offerDates?.length ? `${hotel.offerDates.length} dates disponibles` : hotel.offerDuree || 'Dates flexibles'}
                  </span>
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <HotelIcon className="w-4 h-4 mr-3 text-emerald-500" />
                  <span className="font-light">
                    {hotel.offerNombrePersonnes ? `${hotel.offerNombrePersonnes} personnes` : 'Capacité variable'}
                  </span>
                </div>
                {hotel.offerCompagniesAeriennes && (
                  <div className="flex items-center text-sm text-neutral-600">
                    <Plane className="w-4 h-4 mr-3 text-emerald-500" />
                    <span className="font-light text-xs">{hotel.offerCompagniesAeriennes}</span>
                  </div>
                )}
              </div>
              
              {/* Room prices */}
              {hotel.tarifsChambre && Object.values(hotel.tarifsChambre).some(p => p && p !== "") && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-neutral-700 mb-3">Tarifs par chambre</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(hotel.tarifsChambre).map(([type, prix]) => (
                      prix && prix !== "" && (
                        <div key={type} className="flex items-center justify-between text-xs">
                          <span className="text-neutral-600 capitalize">{type}:</span>
                          <span className="font-medium text-neutral-800">{prix} DH</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                <div>
                  {(() => {
                    const validPrices = Object.values(hotel.tarifsChambre || {}).filter(p => p && p !== "").map(p => parseInt(p.toString()))
                    const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0
                    return (
                      <>
                        <p className="text-lg font-medium text-neutral-800">
                          À partir de {minPrice > 0 ? `${minPrice} DH` : hotel.offerPrixBase || 'Prix sur demande'}
                        </p>
                        <p className="text-xs text-neutral-500 font-light">
                          {minPrice > 0 ? 'par chambre/nuit' : 'par personne'}
                        </p>
                      </>
                    )
                  })()}
                </div>
                
                <button
                  onClick={() => {
                    // Find and select the parent offer
                    const parentOffer = offers.find(o => o.id === hotel.offerId)
                    if (parentOffer) {
                      setSelectedOffer(parentOffer)
                      if (typeof window !== "undefined") {
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    }
                  }}
                  className="flex items-center text-emerald-600 hover:translate-x-1 transition-transform duration-300"
                >
                  <span className="text-sm font-light mr-2">Voir l'offre</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )

  // Main search results view with hero
  return (
    <Suspense fallback={
      <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="space-y-4 animate-pulse">
              <div className="h-12 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-xl w-96 mx-auto"></div>
              <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-64 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse border border-neutral-200/60">
                <div className="h-48 bg-gradient-to-r from-neutral-200 to-neutral-300"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg"></div>
                    <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    }>
      <SearchHero />
      
      <section className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-16">
        <div className="max-w-8xl mx-auto px-8">
          {/* Show hotel results for hotel searches */}
          {searchType === "hotel" ? (
            hotelResults.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center py-28"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <HotelIcon className="w-16 h-16 text-neutral-400" />
                </div>
                <h3 className="text-3xl font-light text-neutral-800 mb-6">Aucun hôtel trouvé</h3>
                <p className="text-neutral-600 mb-10 max-w-lg mx-auto leading-relaxed font-light text-lg">
                  Aucun hôtel ne correspond à vos critères de recherche. Essayez de modifier votre destination.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.back()}
                    className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 h-auto rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 font-light text-lg"
                  >
                    Modifier la recherche
                  </button>
                </div>
              </motion.div>
            ) : (
              <HotelResults />
            )
          ) : searchType === "vol" ? (
            filteredOffers.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center py-28"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <Plane className="w-16 h-16 text-neutral-400" />
                </div>
                <h3 className="text-3xl font-light text-neutral-800 mb-6">Aucun vol trouvé</h3>
                <p className="text-neutral-600 mb-10 max-w-lg mx-auto leading-relaxed font-light text-lg">
                  Aucun vol ne correspond à vos critères de recherche. Essayez de modifier votre destination.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => router.back()}
                    className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 h-auto rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 font-light text-lg"
                  >
                    Modifier la recherche
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredOffers.map((offer, idx) => (
                  <motion.div key={offer.id} variants={item}>
                    <div
                      onClick={() => {
                        setSelectedOffer(offer)
                        if (typeof window !== "undefined") {
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      }}
                      className="group bg-white/80 backdrop-blur-sm rounded-3xl border border-neutral-200/60 overflow-hidden hover:shadow-2xl hover:border-neutral-300/60 transition-all duration-500 cursor-pointer"
                    >
                      <div className="relative">
                        <div className="h-64 bg-gradient-to-br from-sky-200 to-blue-300 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Plane className="w-16 h-16 text-white/80" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-sky-100 text-sky-700">
                              Vol
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                              <Star className="w-4 h-4 text-amber-400 fill-current" />
                              <span className="text-sm font-medium text-white">{offer.note}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <div className="mb-6">
                          <h3 className="text-2xl font-light text-neutral-800 mb-3 leading-tight">
                            Vol vers {offer.destination}
                          </h3>
                          <p className="text-neutral-600 font-light">{offer.periode}</p>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                          <div className="bg-sky-50 rounded-lg p-4">
                            <div className="flex items-center text-sm text-sky-700 mb-2">
                              <Plane className="w-4 h-4 mr-2" />
                              <span className="font-medium">Compagnie aérienne</span>
                            </div>
                            <p className="text-neutral-800 font-medium">{offer.compagniesAeriennes}</p>
                          </div>
                          
                          <div className="flex items-center text-sm text-neutral-600">
                            <MapPin className="w-4 h-4 mr-3 text-emerald-500" />
                            <span className="font-light">Destination: {offer.destination}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-neutral-600">
                            <Calendar className="w-4 h-4 mr-3 text-emerald-500" />
                            <span className="font-light">
                              {offer.datesDisponibles.length > 0 ? `${offer.datesDisponibles.length} dates disponibles` : offer.duree}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-neutral-600">
                            <Users className="w-4 h-4 mr-3 text-emerald-500" />
                            <span className="font-light">{offer.nombrePersonnes} personnes • {offer.duree}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                          <div>
                            <p className="text-2xl font-light text-neutral-800">
                              {offer.prixBase}
                            </p>
                            <p className="text-xs text-neutral-500 font-light">par personne</p>
                          </div>
                          
                          <div className="flex items-center text-sky-600 group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-sm font-light mr-2">Voir vol</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )
          ) : (
            /* Regular offer results */
            filteredOffers.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center py-28"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <Star className="w-16 h-16 text-neutral-400" />
                </div>
                <h3 className="text-3xl font-light text-neutral-800 mb-6">
                  {showAlternatives ? "Dates non disponibles" : "Aucune offre trouvée"}
                </h3>
                <p className="text-neutral-600 mb-10 max-w-lg mx-auto leading-relaxed font-light text-lg">
                  {showAlternatives 
                    ? `Les dates sélectionnées ne sont pas disponibles pour ${destination}. Voici d'autres offres dans cette destination :` 
                    : "Aucune offre ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou explorez toutes nos offres."
                  }
                </p>
                
                {/* Show alternative offers if dates don't match */}
                {showAlternatives && alternativeOffers.length > 0 && (
                  <div className="mt-12">
                    <h4 className="text-xl font-medium text-neutral-800 mb-8">Offres alternatives à {destination}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {alternativeOffers.slice(0, 6).map((offer) => (
                        <motion.div
                          key={offer.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          onClick={() => setSelectedOffer(offer)}
                          className="group bg-white/80 backdrop-blur-sm rounded-3xl border border-amber-200 overflow-hidden hover:shadow-2xl hover:border-amber-300 transition-all duration-500 cursor-pointer"
                        >
                          <div className="relative">
                            <div className="h-48 bg-gradient-to-br from-neutral-200 to-neutral-300 relative overflow-hidden">
                              <img
                                src={offer.image || "/placeholder.svg"}
                                alt={offer.titre}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                              
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                  Alternative
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="mb-4">
                              <h3 className="text-lg font-medium text-neutral-800 mb-2 leading-tight">
                                {offer.titre}
                              </h3>
                              <p className="text-neutral-600 font-light text-sm">{offer.periode}</p>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-sm text-neutral-600">
                                <MapPin className="w-4 h-4 mr-2 text-amber-400" />
                                <span className="font-light">{offer.destination}</span>
                              </div>
                              <div className="flex items-center text-sm text-neutral-600">
                                <Calendar className="w-4 h-4 mr-2 text-amber-400" />
                                <span className="font-light">{offer.datesDisponibles.length > 0 ? `${offer.datesDisponibles.length} dates disponibles` : offer.duree}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                              <div>
                                <p className="text-lg font-medium text-neutral-800">
                                  {offer.prixBase}
                                </p>
                                <p className="text-xs text-neutral-500 font-light">par personne</p>
                              </div>
                              
                              <div className="flex items-center text-amber-600 group-hover:translate-x-1 transition-transform duration-300">
                                <span className="text-sm font-light mr-2">Voir détails</span>
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <button
                    onClick={() => router.back()}
                    className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 h-auto rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 font-light text-lg"
                  >
                    Modifier la recherche
                  </button>
                  <Link href="/offers">
                    <Button
                      variant="outline"
                      className="border-neutral-300 text-neutral-700 hover:bg-neutral-100 px-8 py-4 h-auto rounded-2xl font-light text-lg"
                    >
                      Voir toutes les offres
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredOffers.map((offer, idx) => (
                  <motion.div key={offer.id} variants={item}>
                    <div
                      onClick={() => {
                        setSelectedOffer(offer)
                        if (typeof window !== "undefined") {
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      }}
                      className="group bg-white/80 backdrop-blur-sm rounded-3xl border border-neutral-200/60 overflow-hidden hover:shadow-2xl hover:border-neutral-300/60 transition-all duration-500 cursor-pointer"
                    >
                      <div className="relative">
                        <div className="h-64 bg-gradient-to-br from-neutral-200 to-neutral-300 relative overflow-hidden">
                          <img
                            src={offer.image || "/placeholder.svg"}
                            alt={offer.titre}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                              Disponible
                            </span>
                          </div>
                          
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                              <Star className="w-4 h-4 text-amber-400 fill-current" />
                              <span className="text-sm font-medium text-white">{offer.note}</span>
                            </div>
                          </div>

                          <div className="absolute bottom-4 right-4">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                              >
                                <Heart className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                              >
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <div className="mb-6">
                          <h3 className="text-2xl font-light text-neutral-800 mb-3 leading-tight">
                            {offer.titre}
                          </h3>
                          <p className="text-neutral-600 font-light">{offer.periode}</p>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-sm text-neutral-600">
                            <MapPin className="w-4 h-4 mr-3 text-emerald-500" />
                            <span className="font-light">{offer.destination}</span>
                          </div>
                          <div className="flex items-center text-sm text-neutral-600">
                            <Calendar className="w-4 h-4 mr-3 text-emerald-500" />
                            <span className="font-light">{offer.datesDisponibles.length > 0 ? `${offer.datesDisponibles.length} dates disponibles` : offer.duree}</span>
                          </div>
                          <div className="flex items-center text-sm text-neutral-600">
                            <Users className="w-4 h-4 mr-3 text-emerald-500" />
                            <span className="font-light">{offer.nombrePersonnes} personnes • {offer.duree}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {offer.servicesInclus?.slice(0, 2).map((service: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-full font-light"
                            >
                              {service.length > 20 ? service.substring(0, 20) + '...' : service}
                            </span>
                          ))}
                          {offer.servicesInclus?.length > 2 && (
                            <span className="px-3 py-1.5 bg-neutral-100 text-neutral-600 text-xs rounded-full font-light">
                              +{offer.servicesInclus.length - 2}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                          <div>
                            <p className="text-2xl font-light text-neutral-800">
                              {offer.prixBase}
                            </p>
                            <p className="text-xs text-neutral-500 font-light">par personne</p>
                          </div>
                          
                          <div className="flex items-center text-emerald-600 group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-sm font-light mr-2">Voir détails</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )
          )}
        </div>
      </section>
    </Suspense>
  );
}