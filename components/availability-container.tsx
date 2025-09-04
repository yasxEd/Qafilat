"use client"

import type React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useOffersData } from "@/lib/useOffersData"

// Import form components
import HajjForm from "@/components/forms/hajj-form"
import OmrahForm from "@/components/forms/omrah-form"
import LeisureForm from "@/components/forms/leisure-form"
import HotelForm from "@/components/forms/hotel-form"
import VolForm from "@/components/forms/vol-form"

// Example definition for moroccanCities
const moroccanCities = [
  { value: "casablanca", label: "Casablanca" },
  { value: "rabat", label: "Rabat" },
  { value: "marrakech", label: "Marrakech" },
  { value: "fes", label: "Fès" },
  { value: "agadir", label: "Agadir" },
]

const hotelDestinations = [
  { value: "makkah", label: "Makkah" },
  { value: "madinah", label: "Madinah" },
  { value: "jeddah", label: "Jeddah" },
]
const popularDestinations = [
  { value: "istanbul", label: "Istanbul" },
  { value: "dubai", label: "Dubai" },
  { value: "paris", label: "Paris" },
  { value: "makkah", label: "Makkah" },
  { value: "madinah", label: "Madinah" },
]
const tripDirections = [
  { value: "round", label: "Aller-retour" },
  { value: "oneway", label: "Aller simple" },
]
const flightClasses = [
  { value: "economy", label: "Économique" },
  { value: "business", label: "Business" },
  { value: "first", label: "Première" },
]
const tripTypes = [
  { value: "culture", label: "Culturel" },
  { value: "adventure", label: "Aventure" },
  { value: "relax", label: "Détente" },
]
const tripDurations = [
  { value: "3", label: "3 jours" },
  { value: "5", label: "5 jours" },
  { value: "7", label: "7 jours" },
]

type AvailableDestination = {
  value: string
  label: string
}
type AvailableDate = {
  date: string
  label: string
}

export default function AvailabilityContainer() {
  // Tabs
  const [activeTab, setActiveTab] = useState("hajj")

  // City dropdown state and ref (for Hajj/Omrah/Leisure forms)
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false)
  const cityDropdownRef = useRef<HTMLDivElement>(null)

  // Hotel tab states
  const [hotelDestination, setHotelDestination] = useState("")
  const [hotelDepartureCity, setHotelDepartureCity] = useState("")
  const [hotelDateRange, setHotelDateRange] = useState({ from: "", to: "" })
  const [hotelDuration, setHotelDuration] = useState("")
  const [roomsCount, setRoomsCount] = useState("1")
  const [hotelDestinationDropdownOpen, setHotelDestinationDropdownOpen] = useState(false)
  const [hotelDepartureCityDropdownOpen, setHotelDepartureCityDropdownOpen] = useState(false)
  const hotelDestinationDropdownRef = useRef<HTMLDivElement>(null)
  const hotelDepartureCityDropdownRef = useRef<HTMLDivElement>(null)
  const [hotelDestinationInput, setHotelDestinationInput] = useState("")
  const [hotelDestinationSuggestions, setHotelDestinationSuggestions] = useState<string[]>([])
  const [showHotelDestinationSuggestions, setShowHotelDestinationSuggestions] = useState(false)

  // Flight tab states
  const [tripDirection, setTripDirection] = useState("round")
  const [flightClass, setFlightClass] = useState("")
  const [departureCity, setDepartureCity] = useState("")
  const [arrivalCity, setArrivalCity] = useState("")
  const [flightDateRange, setFlightDateRange] = useState({ from: "", to: "" })
  const [tripDirectionDropdownOpen, setTripDirectionDropdownOpen] = useState(false)
  const [flightClassDropdownOpen, setFlightClassDropdownOpen] = useState(false)
  const [departureCityDropdownOpen, setDepartureCityDropdownOpen] = useState(false)
  const [arrivalCityDropdownOpen, setArrivalCityDropdownOpen] = useState(false)
  const tripDirectionDropdownRef = useRef<HTMLDivElement>(null)
  const flightClassDropdownRef = useRef<HTMLDivElement>(null)
  const departureCityDropdownRef = useRef<HTMLDivElement>(null)
  const arrivalCityDropdownRef = useRef<HTMLDivElement>(null)
  const [departureCityInput, setDepartureCityInput] = useState("")
  const [departureCitySuggestions, setDepartureCitySuggestions] = useState<string[]>([])
  const [showDepartureCitySuggestions, setShowDepartureCitySuggestions] = useState(false)
  const [arrivalCityInput, setArrivalCityInput] = useState("")
  const [arrivalCitySuggestions, setArrivalCitySuggestions] = useState<string[]>([])
  const [showArrivalCitySuggestions, setShowArrivalCitySuggestions] = useState(false)

  // Leisure tab states
  const [destinationCity, setDestinationCity] = useState("")
  const [tripType, setTripType] = useState("")
  const [tripDuration, setTripDuration] = useState("")
  const [tripTypeDropdownOpen, setTripTypeDropdownOpen] = useState(false)
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false)
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false)
  const tripTypeDropdownRef = useRef<HTMLDivElement>(null)
  const durationDropdownRef = useRef<HTMLDivElement>(null)
  const destinationDropdownRef = useRef<HTMLDivElement>(null)
  const [destinationCityInput, setDestinationCityInput] = useState("")
  const [destinationCitySuggestions, setDestinationCitySuggestions] = useState<string[]>([])
  const [showDestinationCitySuggestions, setShowDestinationCitySuggestions] = useState(false)

  // Common states
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [adultsCount, setAdultsCount] = useState("1")
  const [childrenCount, setChildrenCount] = useState("0")
  const [numVoyageurs, setNumVoyageurs] = useState(1)
  const [passengersDropdownOpen, setPassengersDropdownOpen] = useState(false)
  const passengersDropdownRef = useRef<HTMLDivElement>(null)
  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [showDateSuggestions, setShowDateSuggestions] = useState(false)

  // Detect if the device is mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Get selected city label
  const getSelectedCityLabel = () => {
    if (!selectedCity) return ""
    return moroccanCities.find((city) => city.value === selectedCity)?.label || ""
  }

  // Helper functions for dropdowns
  const getSelectedHotelDestinationLabel = () => {
    if (!hotelDestination) return ""
    return hotelDestinations.find((city) => city.value === hotelDestination)?.label || ""
  }
  const getSelectedHotelDepartureCityLabel = () => {
    if (!hotelDepartureCity) return ""
    return moroccanCities.find((city) => city.value === hotelDepartureCity)?.label || ""
  }
  const getSelectedTripDirectionLabel = () => {
    if (!tripDirection) return ""
    return tripDirections.find((dir) => dir.value === tripDirection)?.label || ""
  }
  const getSelectedFlightClassLabel = () => {
    if (!flightClass) return ""
    return flightClasses.find((cls) => cls.value === flightClass)?.label || ""
  }
  const getSelectedDepartureCityLabel = () => {
    if (!departureCity) return ""
    return moroccanCities.find((city) => city.value === departureCity)?.label || ""
  }
  const getSelectedArrivalCityLabel = () => {
    if (!arrivalCity) return ""
    return popularDestinations.find((city) => city.value === arrivalCity)?.label || ""
  }
  const getSelectedDestinationLabel = () => {
    if (!destinationCity) return ""
    return popularDestinations.find((city) => city.value === destinationCity)?.label || ""
  }
  const getSelectedTripTypeLabel = () => {
    if (!tripType) return ""
    return tripTypes.find((type) => type.value === tripType)?.label || ""
  }
  const getSelectedDurationLabel = () => {
    const duration = activeTab === "hotel" ? hotelDuration : tripDuration
    if (!duration) return ""
    return tripDurations.find((d) => d.value === duration)?.label || ""
  }

  // Handle adults count increment/decrement
  const incrementAdults = () => {
    const currentCount = Number.parseInt(adultsCount || "0")
    if (currentCount < 10) {
      setAdultsCount((currentCount + 1).toString())
      setFormTouched(true)
    }
  }
  const decrementAdults = () => {
    const currentCount = Number.parseInt(adultsCount || "0")
    if (currentCount > 1) {
      setAdultsCount((currentCount - 1).toString())
      setFormTouched(true)
    }
  }
  const handleAdultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^[0-9]*$/.test(value)) {
      const numValue = value === "" ? "" : Number.parseInt(value)
      if (numValue === "" || (numValue >= 1 && numValue <= 10)) {
        setAdultsCount(value)
        setFormTouched(true)
      }
    }
  }

  // Hotel destination autocomplete
  const handleHotelDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setHotelDestinationInput(value)
    setHotelDestination(value)
    setFormTouched(true)
    if (value.length > 1) {
      const filteredSuggestions = hotelDestinations
        .filter((city) => city.label.toLowerCase().includes(value.toLowerCase()))
        .map((city) => city.label)
      setHotelDestinationSuggestions(filteredSuggestions)
      setShowHotelDestinationSuggestions(filteredSuggestions.length > 0)
    } else {
      setShowHotelDestinationSuggestions(false)
    }
  }
  const handleHotelDestinationSelect = (suggestion: string) => {
    setHotelDestinationInput(suggestion)
    const selectedCity = hotelDestinations.find((city) => city.label === suggestion)
    if (selectedCity) {
      setHotelDestination(selectedCity.value)
    }
    setShowHotelDestinationSuggestions(false)
    setFormTouched(true)
  }

  // Departure city autocomplete
  const handleDepartureCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDepartureCityInput(value)
    setDepartureCity(value)
    setFormTouched(true)
    if (value.length > 1) {
      const filteredSuggestions = moroccanCities
        .filter((city) => city.label.toLowerCase().includes(value.toLowerCase()))
        .map((city) => city.label)
      setDepartureCitySuggestions(filteredSuggestions)
      setShowDepartureCitySuggestions(filteredSuggestions.length > 0)
    } else {
      setShowDepartureCitySuggestions(false)
    }
  }
  const handleDepartureCitySelect = (suggestion: string) => {
    setDepartureCityInput(suggestion)
    const selectedCity = moroccanCities.find((city) => city.label === suggestion)
    if (selectedCity) {
      setDepartureCity(selectedCity.value)
    }
    setShowDepartureCitySuggestions(false)
    setFormTouched(true)
  }

  // Arrival city autocomplete
  const handleArrivalCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setArrivalCityInput(value)
    setArrivalCity(value)
    setFormTouched(true)
    if (value.length > 1) {
      const filteredSuggestions = popularDestinations
        .filter((city) => city.label.toLowerCase().includes(value.toLowerCase()))
        .map((city) => city.label)
      setArrivalCitySuggestions(filteredSuggestions)
      setShowArrivalCitySuggestions(filteredSuggestions.length > 0)
    } else {
      setShowArrivalCitySuggestions(false)
    }
  }
  const handleArrivalCitySelect = (suggestion: string) => {
    setArrivalCityInput(suggestion)
    const selectedCity = popularDestinations.find((city) => city.label === suggestion)
    if (selectedCity) {
      setArrivalCity(selectedCity.value)
    }
    setShowArrivalCitySuggestions(false)
    setFormTouched(true)
  }

  // Leisure destination autocomplete
  const handleDestinationCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDestinationCityInput(value)
    setDestinationCity(value)
    setFormTouched(true)
    if (value.length > 1) {
      const filteredSuggestions = popularDestinations
        .filter((city) => city.label.toLowerCase().includes(value.toLowerCase()))
        .map((city) => city.label)
      setDestinationCitySuggestions(filteredSuggestions)
      setShowDestinationCitySuggestions(filteredSuggestions.length > 0)
    } else {
      setShowDestinationCitySuggestions(false)
    }
  }
  const handleDestinationCitySelect = (suggestion: string) => {
    setDestinationCityInput(suggestion)
    const selectedCity = popularDestinations.find((city) => city.label === suggestion)
    if (selectedCity) {
      setDestinationCity(selectedCity.value)
    }
    setShowDestinationCitySuggestions(false)
    setFormTouched(true)
  }

  // Room count increment/decrement
  const incrementRooms = () => {
    const currentCount = Number.parseInt(roomsCount || "0")
    if (currentCount < 5) {
      setRoomsCount((currentCount + 1).toString())
      setFormTouched(true)
    }
  }
  const decrementRooms = () => {
    const currentCount = Number.parseInt(roomsCount || "0")
    if (currentCount > 1) {
      setRoomsCount((currentCount - 1).toString())
      setFormTouched(true)
    }
  }
  const handleRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^[0-9]*$/.test(value)) {
      const numValue = value === "" ? "" : Number.parseInt(value)
      if (numValue === "" || (numValue >= 1 && numValue <= 5)) {
        setRoomsCount(value)
        setFormTouched(true)
      }
    }
  }

  // Form validation logic
  useEffect(() => {
    const validAdults = adultsCount !== "" && Number.parseInt(adultsCount) > 0
    if (activeTab === "hajj" || activeTab === "umrah") {
      setFormValid(selectedCity !== "")
    } else if (activeTab === "leisure") {
      setFormValid(selectedCity !== "" && destinationCity !== "" && tripType !== "" && tripDuration !== "")
    } else if (activeTab === "hotel") {
      setFormValid(
        hotelDestination !== "" &&
        hotelDateRange.from !== "" &&
        hotelDateRange.to !== "" &&
        validAdults &&
        roomsCount !== "",
      )
    } else if (activeTab === "vol") {
      const isRoundTrip = tripDirection === "round"
      setFormValid(
        departureCity !== "" &&
        arrivalCity !== "" &&
        flightClass !== "" &&
        flightDateRange.from !== "" &&
        (isRoundTrip ? flightDateRange.to !== "" : true) &&
        validAdults,
      )
    } else {
      setFormValid(selectedCity !== "" && selectedDate !== "" && validAdults)
    }
    if (
      selectedCity !== "" ||
      selectedDate !== "" ||
      adultsCount !== "1" ||
      childrenCount !== "0" ||
      destinationCity !== "" ||
      tripType !== "" ||
      tripDuration !== "" ||
      hotelDestination !== "" ||
      hotelDateRange.from !== "" ||
      hotelDateRange.to !== "" ||
      roomsCount !== "1" ||
      departureCity !== "" ||
      arrivalCity !== "" ||
      flightClass !== "" ||
      flightDateRange.from !== "" ||
      flightDateRange.to !== ""
    ) {
      setFormTouched(true)
    }
  }, [
    selectedCity,
    selectedDate,
    adultsCount,
    childrenCount,
    destinationCity,
    tripType,
    tripDuration,
    activeTab,
    hotelDestination,
    hotelDateRange,
    roomsCount,
    departureCity,
    arrivalCity,
    flightClass,
    flightDateRange,
    tripDirection,
  ])

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false)
      }
      if (passengersDropdownRef.current && !passengersDropdownRef.current.contains(event.target as Node)) {
        setPassengersDropdownOpen(false)
      }
      if (tripTypeDropdownRef.current && !tripTypeDropdownRef.current.contains(event.target as Node)) {
        setTripTypeDropdownOpen(false)
      }
      if (durationDropdownRef.current && !durationDropdownRef.current.contains(event.target as Node)) {
        setDurationDropdownOpen(false)
      }
      if (destinationDropdownRef.current && !destinationDropdownRef.current.contains(event.target as Node)) {
        setDestinationDropdownOpen(false)
      }
      if (hotelDestinationDropdownRef.current && !hotelDestinationDropdownRef.current.contains(event.target as Node)) {
        setHotelDestinationDropdownOpen(false)
      }
      if (
        hotelDepartureCityDropdownRef.current &&
        !hotelDepartureCityDropdownRef.current.contains(event.target as Node)
      ) {
        setHotelDepartureCityDropdownOpen(false)
      }
      if (tripDirectionDropdownRef.current && !tripDirectionDropdownRef.current.contains(event.target as Node)) {
        setTripDirectionDropdownOpen(false)
      }
      if (flightClassDropdownRef.current && !flightClassDropdownRef.current.contains(event.target as Node)) {
        setFlightClassDropdownOpen(false)
      }
      if (departureCityDropdownRef.current && !departureCityDropdownRef.current.contains(event.target as Node)) {
        setDepartureCityDropdownOpen(false)
      }
      if (arrivalCityDropdownRef.current && !arrivalCityDropdownRef.current.contains(event.target as Node)) {
        setArrivalCityDropdownOpen(false)
      }
      // Suggestion dropdowns
      if (!event.target || !(event.target as Element).closest(".hotel-destination-autocomplete")) {
        setShowHotelDestinationSuggestions(false)
      }
      if (!event.target || !(event.target as Element).closest(".arrival-city-autocomplete")) {
        setShowArrivalCitySuggestions(false)
      }
      if (!event.target || !(event.target as Element).closest(".destination-city-autocomplete")) {
        setShowDestinationCitySuggestions(false)
      }
      if (!event.target || !(event.target as Element).closest('input[type="date"]')) {
        setShowDateSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Reservation click handler
  const router = useRouter()
  const handleReservationClick = async () => {
    if (!formValid) {
      setFormTouched(true)
      return
    }
    const searchParams = new URLSearchParams()
    
    // Add the search type based on active tab
    searchParams.set("type", activeTab)
    
    if (activeTab === "hajj" || activeTab === "umrah") {
      if (selectedCity) searchParams.set("departureCity", selectedCity)
      if (selectedDate) searchParams.set("date", selectedDate)
    } else if (activeTab === "leisure") {
      if (selectedCity) searchParams.set("departureCity", selectedCity)
      if (destinationCity) searchParams.set("destination", destinationCity)
      if (tripType) searchParams.set("tripType", tripType)
      if (tripDuration) searchParams.set("duration", tripDuration)
    } else if (activeTab === "hotel") {
      if (hotelDepartureCity) searchParams.set("departureCity", hotelDepartureCity)
      if (hotelDestination) searchParams.set("destination", hotelDestination)
      if (hotelDateRange.from) searchParams.set("checkIn", hotelDateRange.from)
      if (hotelDateRange.to) searchParams.set("checkOut", hotelDateRange.to)
      if (roomsCount) searchParams.set("rooms", roomsCount)
    } else if (activeTab === "vol") {
      if (departureCity) searchParams.set("departureCity", departureCity)
      if (arrivalCity) searchParams.set("destination", arrivalCity)
      if (flightClass) searchParams.set("class", flightClass)
      if (tripDirection) searchParams.set("tripType", tripDirection)
      if (flightDateRange.from) searchParams.set("departureDate", flightDateRange.from)
      if (flightDateRange.to) searchParams.set("returnDate", flightDateRange.to)
    }
    if (adultsCount) searchParams.set("adults", adultsCount)
    if (childrenCount) searchParams.set("children", childrenCount)
    router.push(`/search-results?${searchParams.toString()}`)
  }

  const [travelerName, setTravelerName] = useState("")
  const [travelerPhone, setTravelerPhone] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [passportNumber, setPassportNumber] = useState("")
  const [passportExpiry, setPassportExpiry] = useState("")
  const [address, setAddress] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")
  const [medicalConditions, setMedicalConditions] = useState("")

  // Add new state for availability suggestions
  const [availableDestinations, setAvailableDestinations] = useState<AvailableDestination[]>([])
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([])
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)

  // Results state for hotel and vol tabs
  const [hotelResults, setHotelResults] = useState<any[]>([])
  const [volResults, setVolResults] = useState<any[]>([])

  // Use centralized data management
  const { offres: allOffers, isLoaded } = useOffersData()

  // Get offers from centralized data instead of localStorage
  const getLocalOffers = () => {
    return isLoaded ? allOffers : []
  }

  // Search hotels when hotel tab and destination selected
  useEffect(() => {
    if (activeTab === "hotel" && hotelDestination && isLoaded) {
      const offers = getLocalOffers()
      const results = offers
        .filter((o: any) => o.category === "omra" || o.category === "hajj")
        .filter((o: any) =>
          o.hotels?.some((hotel: any) =>
            hotel.nom.toLowerCase().includes(hotelDestinationInput.toLowerCase()) ||
            hotelDestination === o.destination.toLowerCase() ||
            hotelDestination === o.destination
          )
        )
        .map((o: any) => ({
          titre: o.titre,
          destination: o.destination,
          hotels: o.hotels,
          datesDisponibles: o.datesDisponibles,
        }))
      setHotelResults(results)
    } else {
      setHotelResults([])
    }
  }, [activeTab, hotelDestination, hotelDestinationInput, isLoaded, allOffers])

  // Search vols when vol tab and cities selected
  useEffect(() => {
    if (activeTab === "vol" && departureCity && arrivalCity && isLoaded) {
      const offers = getLocalOffers()
      const results = offers
        .filter((o: any) =>
          (o.destination?.toLowerCase().includes(arrivalCityInput.toLowerCase()) ||
           o.destination?.toLowerCase() === arrivalCity.toLowerCase() ||
           o.destination === arrivalCity) &&
          (o.compagniesAeriennes?.toLowerCase().includes(departureCityInput.toLowerCase()) ||
           o.compagniesAeriennes?.toLowerCase().includes(departureCity.toLowerCase()))
        )
        .map((o: any) => ({
          titre: o.titre,
          destination: o.destination,
          compagniesAeriennes: o.compagniesAeriennes,
          datesDisponibles: o.datesDisponibles,
        }))
      setVolResults(results)
    } else {
      setVolResults([])
    }
  }, [activeTab, departureCity, arrivalCity, departureCityInput, arrivalCityInput, isLoaded, allOffers])

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Ultra-minimalistic top section */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl">
          
          {/* Minimal header */}
          <div className="text-center mb-16">
            <TypedTitle />
          </div>

          {/* Clean tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1 border border-neutral-200">
              {[
                { id: "hajj", label: "Hajj" },
                { id: "umrah", label: "Omra" },
                { id: "leisure", label: "Loisirs" },
                { id: "hotel", label: "Hôtel" },
                { id: "vol", label: "Vol" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-black text-white"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form container */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-neutral-200 p-8 mb-8"
          >
            <div className={`${
              activeTab === "leisure" ? "space-y-6" :
              activeTab === "hotel" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" :
              activeTab === "vol" ? "space-y-6" :
              "grid grid-cols-1 md:grid-cols-3 gap-6"
            }`}>
              {activeTab === "hajj" && (
                <HajjForm
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  moroccanCities={moroccanCities}
                  formTouched={formTouched}
                  setFormTouched={setFormTouched}
                  cityDropdownOpen={cityDropdownOpen}
                  setCityDropdownOpen={setCityDropdownOpen}
                  cityDropdownRef={cityDropdownRef}
                  isMobile={isMobile}
                  numVoyageurs={numVoyageurs}
                  setNumVoyageurs={setNumVoyageurs}
                />
              )}
              {activeTab === "umrah" && (
                <OmrahForm
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  moroccanCities={moroccanCities}
                  formTouched={formTouched}
                  setFormTouched={setFormTouched}
                  cityDropdownOpen={cityDropdownOpen}
                  setCityDropdownOpen={setCityDropdownOpen}
                  cityDropdownRef={cityDropdownRef}
                  isMobile={isMobile}
                  numVoyageurs={numVoyageurs}
                  setNumVoyageurs={setNumVoyageurs}
                />
              )}
              {activeTab === "leisure" && (
                <LeisureForm
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  destinationCity={destinationCity}
                  setDestinationCity={setDestinationCity}
                  tripType={tripType}
                  setTripType={setTripType}
                  tripDuration={tripDuration}
                  setTripDuration={setTripDuration}
                  moroccanCities={moroccanCities}
                  popularDestinations={popularDestinations}
                  tripTypes={tripTypes}
                  tripDurations={tripDurations}
                  formTouched={formTouched}
                  setFormTouched={setFormTouched}
                  cityDropdownOpen={cityDropdownOpen}
                  setCityDropdownOpen={setCityDropdownOpen}
                  cityDropdownRef={cityDropdownRef}
                  tripTypeDropdownOpen={tripTypeDropdownOpen}
                  setTripTypeDropdownOpen={setTripTypeDropdownOpen}
                  tripTypeDropdownRef={tripTypeDropdownRef}
                  durationDropdownOpen={durationDropdownOpen}
                  setDurationDropdownOpen={setDurationDropdownOpen}
                  durationDropdownRef={durationDropdownRef}
                  isMobile={isMobile}
                />
              )}
              {activeTab === "hotel" && (
                <HotelForm
                  hotelDestination={hotelDestination}
                  setHotelDestination={setHotelDestination}
                  hotelDepartureCity={hotelDepartureCity}
                  setHotelDepartureCity={setHotelDepartureCity}
                  hotelDateRange={hotelDateRange}
                  setHotelDateRange={setHotelDateRange}
                  roomsCount={roomsCount}
                  setRoomsCount={setRoomsCount}
                  hotelDestinations={hotelDestinations}
                  moroccanCities={moroccanCities}
                  formTouched={formTouched}
                  setFormTouched={setFormTouched}
                  isMobile={isMobile}
                />
              )}
              {activeTab === "vol" && (
                <VolForm
                  tripDirection={tripDirection}
                  setTripDirection={setTripDirection}
                  flightClass={flightClass}
                  setFlightClass={setFlightClass}
                  departureCity={departureCity}
                  setDepartureCity={setDepartureCity}
                  arrivalCity={arrivalCity}
                  setArrivalCity={setArrivalCity}
                  flightDateRange={flightDateRange}
                  setFlightDateRange={setFlightDateRange}
                  tripDirections={tripDirections}
                  flightClasses={flightClasses}
                  moroccanCities={moroccanCities}
                  popularDestinations={popularDestinations}
                  formTouched={formTouched}
                  setFormTouched={setFormTouched}
                  isMobile={isMobile}
                  numVoyageurs={numVoyageurs}
                  setNumVoyageurs={setNumVoyageurs}
                />
              )}
            </div>
          </motion.div>

          {/* Minimal CTA */}
          <div className="text-center">
            <button
              onClick={handleReservationClick}
              disabled={!formValid}
              className={`inline-flex items-center px-12 py-4 text-sm font-medium rounded-full transition-all duration-200 ${
                formValid
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              Réserver Maintenant
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

type TypedTitleProps = {
  text?: string
}

const TypedTitle: React.FC<TypedTitleProps> = ({ text }) => {
  const words = ["Sacré", "Spirituel", "de Taqwa", "de Tawbah"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentWord = words[currentWordIndex]

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000) // Pause for 2 seconds when word is complete
    } else if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false)
        setCurrentCharIndex(0)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 80) // Slightly slower deletion
      }
    } else {
      if (currentCharIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + currentWord[currentCharIndex])
          setCurrentCharIndex(currentCharIndex + 1)
        }, 150) // Typing speed
      } else {
        setIsPaused(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentWordIndex, displayedText, currentCharIndex, isDeleting, isPaused, words])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight">
        <span>Trouvez Votre Voyage </span>
        <span className="inline-block min-w-[200px] text-left">
          {displayedText}
          <span className="inline-block w-0.5 h-8 md:h-10 lg:h-12 bg-black ml-1 animate-pulse"></span>
        </span>
      </h1>
      <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">
        Une expérience de réservation épurée et intuitive
      </p>
    </div>
  )
}