"use client"

import type React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Calendar, ChevronDown, MapPin, Minus, Plus, Users, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function AvailabilityContainer() {
  // Update the activeTab state to include "hotel" and "vol" as possible values
  const [activeTab, setActiveTab] = useState("hajj")

  // Add new state variables for hotel tab
  const [hotelDestination, setHotelDestination] = useState("")
  const [hotelDepartureCity, setHotelDepartureCity] = useState("")
  const [hotelDateRange, setHotelDateRange] = useState({ from: "", to: "" })
  const [hotelDuration, setHotelDuration] = useState("")
  const [roomsCount, setRoomsCount] = useState("1")
  const [hotelDestinationDropdownOpen, setHotelDestinationDropdownOpen] = useState(false)
  const [hotelDepartureCityDropdownOpen, setHotelDepartureCityDropdownOpen] = useState(false)
  const hotelDestinationDropdownRef = useRef<HTMLDivElement>(null)
  const hotelDepartureCityDropdownRef = useRef<HTMLDivElement>(null)

  // Add new state variables for flight tab
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

  // Add these new state variables and refs after the existing state declarations (around line 50)
  const [selectedForfait, setSelectedForfait] = useState("")
  const [forfaitDropdownOpen, setForfaitDropdownOpen] = useState(false)
  const forfaitDropdownRef = useRef<HTMLDivElement>(null)

  // Add new state variables for leisure tours after the existing state variables
  const [destinationCity, setDestinationCity] = useState("")
  const [tripType, setTripType] = useState("")
  const [tripDuration, setTripDuration] = useState("")
  const [tripTypeDropdownOpen, setTripTypeDropdownOpen] = useState(false)
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false)
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false)
  const tripTypeDropdownRef = useRef<HTMLDivElement>(null)
  const durationDropdownRef = useRef<HTMLDivElement>(null)
  const destinationDropdownRef = useRef<HTMLDivElement>(null)
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [adultsCount, setAdultsCount] = useState("1")
  const [childrenCount, setChildrenCount] = useState("0")
  const [passengersDropdownOpen, setPassengersDropdownOpen] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Simulate authentication state - in a real app, this would come from your auth system
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Custom dropdown states
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false)
  const cityDropdownRef = useRef<HTMLDivElement>(null)
  const passengersDropdownRef = useRef<HTMLDivElement>(null)
  const loginPromptRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Check if screen is mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Add new arrays for hotel destinations and flight classes
  const hotelDestinations = [
    { value: "paris", label: "Paris, France" },
    { value: "istanbul", label: "Istanbul, Turquie" },
    { value: "dubai", label: "Dubaï, UAE" },
    { value: "london", label: "Londres, UK" },
    { value: "marrakech", label: "Marrakech, Maroc" },
    { value: "casablanca", label: "Casablanca, Maroc" },
    { value: "rome", label: "Rome, Italie" },
    { value: "madrid", label: "Madrid, Espagne" },
    { value: "barcelona", label: "Barcelone, Espagne" },
    { value: "cairo", label: "Le Caire, Égypte" },
    { value: "newyork", label: "New York, USA" },
    { value: "tokyo", label: "Tokyo, Japon" },
    { value: "singapore", label: "Singapour" },
    { value: "kualalumpur", label: "Kuala Lumpur, Malaisie" },
    { value: "bangkok", label: "Bangkok, Thaïlande" },
  ]

  const flightClasses = [
    { value: "economy", label: "Économique" },
    { value: "business", label: "Business" },
    { value: "premium", label: "Premium" },
  ]

  const tripDirections = [
    { value: "round", label: "Aller-Retour" },
    { value: "oneway", label: "Aller Simple" },
  ]

  // Updated list of Moroccan cities
  const moroccanCities = [
    { value: "casablanca", label: "Casablanca" },
    { value: "rabat", label: "Rabat" },
    { value: "marrakech", label: "Marrakech" },
    { value: "tanger", label: "Tanger" },
  ]

  // Add destination cities array
  const popularDestinations = [
    { value: "paris", label: "Paris, France" },
    { value: "istanbul", label: "Istanbul, Turquie" },
    { value: "dubai", label: "Dubaï, UAE" },
    { value: "london", label: "Londres, UK" },
    { value: "barcelona", label: "Barcelone, Espagne" },
    { value: "cairo", label: "Le Caire, Égypte" },
    { value: "rome", label: "Rome, Italie" },
    { value: "madrid", label: "Madrid, Espagne" },
    { value: "newyork", label: "New York, USA" },
    { value: "tokyo", label: "Tokyo, Japon" },
    { value: "singapore", label: "Singapour" },
    { value: "kualalumpur", label: "Kuala Lumpur, Malaisie" },
    { value: "bangkok", label: "Bangkok, Thaïlande" },
    { value: "sydney", label: "Sydney, Australie" },
    { value: "capetown", label: "Le Cap, Afrique du Sud" },
    { value: "riodejaneiro", label: "Rio de Janeiro, Brésil" },
  ]

  // Add trip types array
  const tripTypes = [
    { value: "beach", label: "Vacances Plage" },
    { value: "city", label: "Tour de Ville" },
    { value: "cultural", label: "Expérience Culturelle" },
    { value: "adventure", label: "Voyage Aventure" },
    { value: "relaxation", label: "Séjour Détente" },
  ]

  // Add trip durations array
  const tripDurations = [
    { value: "3-5", label: "3-5 jours" },
    { value: "1-week", label: "1 semaine" },
    { value: "2-weeks", label: "2 semaines" },
    { value: "custom", label: "Personnalisé" },
  ]

  // Add this new array of forfait options after the other arrays like moroccanCities, popularDestinations, etc. (around line 130)
  const forfaitOptions = [
    { value: "economic", label: "Forfait Économique" },
    { value: "standard", label: "Forfait Standard" },
    { value: "premium", label: "Forfait Premium" },
  ]

  // Get selected city label
  const getSelectedCityLabel = () => {
    if (!selectedCity) return ""
    return moroccanCities.find((city) => city.value === selectedCity)?.label || ""
  }

  // Add helper functions for the new dropdowns
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

  // 4. Fix the getSelectedFlightClassLabel function (around line 180) - there's a bug in the comparison
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

  // Helper functions for the new dropdowns
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

  // Add this helper function with the other helper functions (around line 180)
  const getSelectedForfaitLabel = () => {
    if (!selectedForfait) return ""
    return forfaitOptions.find((forfait) => forfait.value === selectedForfait)?.label || ""
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
    // Only allow numbers between 1 and 10
    if (/^[0-9]*$/.test(value)) {
      const numValue = value === "" ? "" : Number.parseInt(value)
      if (numValue === "" || (numValue >= 1 && numValue <= 10)) {
        setAdultsCount(value)
        setFormTouched(true)
      }
    }
  }

  // Handle children count increment/decrement
  const incrementChildren = () => {
    const currentCount = Number.parseInt(childrenCount || "0")
    if (currentCount < 10) {
      setChildrenCount((currentCount + 1).toString())
      setFormTouched(true)
    }
  }

  const decrementChildren = () => {
    const currentCount = Number.parseInt(childrenCount || "0")
    if (currentCount > 0) {
      setChildrenCount((currentCount - 1).toString())
      setFormTouched(true)
    }
  }

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers between 0 and 10
    if (/^[0-9]*$/.test(value)) {
      const numValue = value === "" ? "" : Number.parseInt(value)
      if (numValue === "" || (numValue >= 0 && numValue <= 10)) {
        setChildrenCount(value)
        setFormTouched(true)
      }
    }
  }

  // Update the getPassengerSummary function to include room count for hotel tab
  const getPassengerSummary = () => {
    const adults = Number.parseInt(adultsCount || "0")
    const children = Number.parseInt(childrenCount || "0")
    const rooms = Number.parseInt(roomsCount || "0")

    if (adults === 0 && children === 0) {
      return "Sélectionnez les voyageurs"
    }

    const parts = []
    if (adults > 0) {
      parts.push(`${adults} ${adults > 1 ? "adultes" : "adulte"}`)
    }
    if (children > 0) {
      parts.push(`${children} ${children > 1 ? "enfants" : "enfant"}`)
    }
    if (activeTab === "hotel" && rooms > 0) {
      parts.push(`${rooms} ${rooms > 1 ? "chambres" : "chambre"}`)
    }

    return parts.join(", ")
  }

  // Add new state variables for autocomplete
  const [hotelDestinationInput, setHotelDestinationInput] = useState("")
  const [hotelDestinationSuggestions, setHotelDestinationSuggestions] = useState<string[]>([])
  const [showHotelDestinationSuggestions, setShowHotelDestinationSuggestions] = useState(false)

  const [departureCityInput, setDepartureCityInput] = useState("")
  const [departureCitySuggestions, setDepartureCitySuggestions] = useState<string[]>([])
  const [showDepartureCitySuggestions, setShowDepartureCitySuggestions] = useState(false)

  const [arrivalCityInput, setArrivalCityInput] = useState("")
  const [arrivalCitySuggestions, setArrivalCitySuggestions] = useState<string[]>([])
  const [showArrivalCitySuggestions, setShowArrivalCitySuggestions] = useState(false)

  // Add functions to handle autocomplete
  const handleHotelDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setHotelDestinationInput(value)
    setHotelDestination(value) // Set the value directly
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

  const handleDepartureCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDepartureCityInput(value)
    setDepartureCity(value) // Set the value directly
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

  const handleArrivalCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setArrivalCityInput(value)
    setArrivalCity(value) // Set the value directly
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

  const [destinationCityInput, setDestinationCityInput] = useState("")
  const [destinationCitySuggestions, setDestinationCitySuggestions] = useState<string[]>([])
  const [showDestinationCitySuggestions, setShowDestinationCitySuggestions] = useState(false)

  const handleDestinationCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDestinationCityInput(value)
    setDestinationCity(value) // Set the value directly
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

  // Add a function to handle room count increment/decrement
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
    // Only allow numbers between 1 and 5
    if (/^[0-9]*$/.test(value)) {
      const numValue = value === "" ? "" : Number.parseInt(value)
      if (numValue === "" || (numValue >= 1 && numValue <= 5)) {
        setRoomsCount(value)
        setFormTouched(true)
      }
    }
  }

  // Update the form validation logic to include the new tabs
  useEffect(() => {
    const validAdults = adultsCount !== "" && Number.parseInt(adultsCount) > 0

    if (activeTab === "hajj" || activeTab === "umrah") {
      setFormValid(selectedCity !== "" && selectedForfait !== "")
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
      flightDateRange.to !== "" ||
      selectedForfait !== ""
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
    selectedForfait,
  ])

  // Update the useEffect for click outside to include the new autocomplete dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Add this line with the other dropdown refs
      if (forfaitDropdownRef.current && !forfaitDropdownRef.current.contains(event.target as Node)) {
        setForfaitDropdownOpen(false)
      }

      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false)
      }
      if (passengersDropdownRef.current && !passengersDropdownRef.current.contains(event.target as Node)) {
        setPassengersDropdownOpen(false)
      }
      if (loginPromptRef.current && !loginPromptRef.current.contains(event.target as Node)) {
        setShowLoginPrompt(false)
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

      // Add handlers for autocomplete dropdowns
      if (!event.target || !(event.target as Element).closest(".hotel-destination-autocomplete")) {
        setShowHotelDestinationSuggestions(false)
      }
      if (!event.target || !(event.target as Element).closest(".departure-city-autocomplete")) {
        setShowDepartureCitySuggestions(false)
      }
      if (!event.target || !(event.target as Element).closest(".arrival-city-autocomplete")) {
        setShowArrivalCitySuggestions(false)
      }
      if (!event.target || !(event.target as Element).closest(".destination-city-autocomplete")) {
        setShowDestinationCitySuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Update the handleReservationClick function to include the new tabs
  // 5. Update the handleReservationClick function to ensure all fields are properly included for each tab
  // This function is around line 500
  const handleReservationClick = async () => {
    if (!formValid) {
      setFormTouched(true)
      return
    }

    // Build reservationData based on the active tab
    const reservationData = {
      userId,
      agencyId,
      packageType: activeTab,
      // Common fields
      adults: adultsCount,
      children: childrenCount,
      status: "pending",
      travelerName,
      travelerPhone,
      birthDate,
      passportNumber,
      passportExpiry,
      address,
      emergencyContact,
      medicalConditions,
      documents: {
        passport: { exists: false },
        photo: { exists: false },
        identity: { exists: false },
        vaccination: { exists: false },
      },
    }

    // Add tab-specific fields
    if (activeTab === "hajj" || activeTab === "umrah") {
      Object.assign(reservationData, {
        departureCity: selectedCity,
        forfaitType: selectedForfait,
        dateFrom: selectedDate,
      })
    } else if (activeTab === "leisure") {
      Object.assign(reservationData, {
        departureCity: selectedCity,
        destination: destinationCity,
        tripType: tripType,
        tripDuration: tripDuration,
      })
    } else if (activeTab === "hotel") {
      Object.assign(reservationData, {
        departureCity: hotelDepartureCity,
        destination: hotelDestination,
        dateFrom: hotelDateRange.from,
        dateTo: hotelDateRange.to,
        rooms: roomsCount,
      })
    } else if (activeTab === "vol") {
      Object.assign(reservationData, {
        departureCity: departureCity,
        destination: arrivalCity,
        dateFrom: flightDateRange.from,
        dateTo: flightDateRange.to,
        tripDirection: tripDirection,
        flightClass: flightClass,
      })
    }

    console.log("Sending reservation data:", reservationData)

    if (isLoggedIn) {
      try {
        const response = await fetch("http://localhost:5000/api/reservations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if needed
          },
          body: JSON.stringify(reservationData),
        })

        if (response.ok) {
          // Optionally show a success message or redirect
          router.push("/client/dashboard/reservations")
        } else {
          router.push("/client/dashboard/reservations")
          // const errorData = await response.json();
          // console.error(errorData);
          // alert(errorData.error || "Erreur lors de la réservation.");
        }
      } catch (error) {
        alert("Erreur réseau lors de la réservation.")
      }
    } else {
      setShowLoginPrompt(true)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    }
  }, [])

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null
  const agencyId = typeof window !== "undefined" ? localStorage.getItem("agencyId") : null

  const [travelerName, setTravelerName] = useState("")
  const [travelerPhone, setTravelerPhone] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [passportNumber, setPassportNumber] = useState("")
  const [passportExpiry, setPassportExpiry] = useState("")
  const [address, setAddress] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")
  const [medicalConditions, setMedicalConditions] = useState("")

  return (
    <>

      {/* Availability Card as its own section */}
      <section className="w-full py-12 bg-white relative">
        {/* REMOVE Decorative gradient overlays for glass effect */}
        {/* <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
        </div> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`
              bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-2xl
              relative
            `}
          >
            {/* Title with glow effect */}
            <div className="text-center mb-0">
              {/* TypedTitle as a standalone section */}
      <section className="w-full flex justify-center mt-0 mb-0 z-30 relative">
        <TypedTitle text="Trouvez Votre Voyage Sacré" />
      </section>
              
            </div>

            {/* Tabs */}
            <div
              className={`flex mb-8 p-1 bg-gray-100 rounded-xl border border-gray-200 max-w-md mx-auto`}
            >
              {[
                { id: "hajj", label: "Hajj" },
                { id: "umrah", label: "Omra" },
                { id: "leisure", label: "Loisirs" },
                { id: "hotel", label: "Hôtel" },
                { id: "vol", label: "Vol" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`flex-1 py-2.5 px-2 text-sm text-center font-medium rounded-lg transition-all duration-300
                    ${activeTab === tab.id
                      ? "bg-amber-400 text-gray-900 shadow-xl scale-105"
                      : "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div
              className={`grid grid-cols-1 ${
                activeTab === "leisure"
                  ? "md:grid-cols-5 gap-3"
                  : activeTab === "hotel"
                  ? "md:grid-cols-4 gap-3"
                  : activeTab === "vol"
                  ? "md:grid-cols-6 gap-3"
                  : "md:grid-cols-3 gap-4"
              } items-start`}
            >
              {activeTab === "hajj" || activeTab === "umrah" ? (
                <>
                  {/* Departure City - Custom Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                      <MapPin size={16} className="mr-2 text-amber-400" />
                      Ville de Départ
                    </label>
                    <div className="relative" ref={cityDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                        className={`
                          w-full p-2.5 flex justify-between items-center border
                          ${formTouched && !selectedCity ? "border-red-300 bg-red-50" : "border-gray-200"}
                          rounded-lg bg-gray-50 text-sm text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all
                          hover:bg-gray-100
                        `}
                      >
                        <span className={selectedCity ? "text-gray-900" : "text-gray-500"}>
                          {selectedCity ? getSelectedCityLabel() : "Sélectionnez votre ville"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-200 ${
                            cityDropdownOpen ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown menu */}
                      <AnimatePresence>
                        {cityDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                              isMobile ? "py-0.5" : "py-1"
                            }`}
                          >
                            {moroccanCities.map((city) => (
                              <div
                                key={city.value}
                                className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100 ${
                                  selectedCity === city.value ? "bg-[#FFD700]/10 font-medium" : ""
                                }`}
                                onClick={() => {
                                  setSelectedCity(city.value)
                                  setCityDropdownOpen(false)
                                  setFormTouched(true)
                                }}
                              >
                                {city.label}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {formTouched && !selectedCity && (
                        <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                          Veuillez sélectionner une ville
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Forfait Dropdown - New component for hajj/umrah */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                      <Calendar size={16} className="mr-2 text-amber-400" />
                      Forfait
                    </label>
                    <div className="relative" ref={forfaitDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setForfaitDropdownOpen(!forfaitDropdownOpen)}
                        className={`
                          w-full p-2.5 flex justify-between items-center border
                          ${formTouched && !selectedForfait ? "border-red-300 bg-red-50" : "border-gray-200"}
                          rounded-lg bg-gray-50 text-sm text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all
                          hover:bg-gray-100
                        `}
                      >
                        <span className={selectedForfait ? "text-gray-900" : "text-gray-500"}>
                          {selectedForfait ? getSelectedForfaitLabel() : "Sélectionnez un forfait"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-200 ${
                            forfaitDropdownOpen ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown menu */}
                      <AnimatePresence>
                        {forfaitDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                              isMobile ? "py-0.5" : "py-1"
                            }`}
                          >
                            {forfaitOptions.map((forfait) => (
                              <div
                                key={forfait.value}
                                className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100 ${
                                  selectedForfait === forfait.value ? "bg-[#FFD700]/10 font-medium" : ""
                                }`}
                                onClick={() => {
                                  setSelectedForfait(forfait.value)
                                  setForfaitDropdownOpen(false)
                                  setFormTouched(true)
                                }}
                              >
                                {forfait.label}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {formTouched && !selectedForfait && (
                        <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                          Veuillez sélectionner un forfait
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : activeTab === "leisure" ? (
                <>
                  {/* Departure City - Custom Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                      <MapPin size={16} className="mr-2 text-amber-400" />
                      Ville de Départ
                    </label>
                    <div className="relative" ref={cityDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                        className={`
                          w-full p-2.5 flex justify-between items-center border
                          ${formTouched && !selectedCity ? "border-red-300 bg-red-50" : "border-gray-200"}
                          rounded-lg bg-gray-50 text-sm text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all
                          hover:bg-gray-100
                        `}
                      >
                        <span className={selectedCity ? "text-gray-900" : "text-gray-500"}>
                          {selectedCity ? getSelectedCityLabel() : "Sélectionnez votre ville"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-200 ${
                            cityDropdownOpen ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown menu */}
                      <AnimatePresence>
                        {cityDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                              isMobile ? "py-0.5" : "py-1"
                            }`}
                          >
                            {moroccanCities.map((city) => (
                              <div
                                key={city.value}
                                className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100 ${
                                  selectedCity === city.value ? "bg-[#FFD700]/10 font-medium" : ""
                                }`}
                                onClick={() => {
                                  setSelectedCity(city.value)
                                  setCityDropdownOpen(false)
                                  setFormTouched(true)
                                }}
                              >
                                {city.label}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {formTouched && !selectedCity && (
                        <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                          Veuillez sélectionner une ville
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Destination City - Only for Leisure Tours */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                      <MapPin size={16} className="mr-2 text-amber-400" />
                      Destination
                    </label>
                    <div className="relative destination-city-autocomplete">
                      <input
                        type="text"
                        value={destinationCityInput}
                        onChange={handleDestinationCityChange}
                        placeholder="Entrez une destination"
                        className={`w-full ${isMobile ? "py-2 px-2" : "p-2.5"} border ${
                          formTouched && !destinationCity ? "border-red-300 bg-red-50" : "border-gray-200"
                        } rounded-lg bg-gray-50 text-sm text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                      />

                      {/* Suggestions dropdown */}
                      <AnimatePresence>
                        {showDestinationCitySuggestions && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                              isMobile ? "py-0.5" : "py-1"
                            } max-h-48 overflow-y-auto`}
                          >
                            {destinationCitySuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100`}
                                onClick={() => handleDestinationCitySelect(suggestion)}
                              >
                                {suggestion}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {formTouched && !destinationCity && activeTab === "leisure" && (
                        <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                          Veuillez sélectionner une destination
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Trip Type - Only for Leisure Tours */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                      <Calendar size={16} className="mr-2 text-amber-400" />
                      Type de Voyage
                    </label>
                    <div className="relative" ref={tripTypeDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setTripTypeDropdownOpen(!tripTypeDropdownOpen)}
                        className={`
                          w-full p-2.5 flex justify-between items-center border
                          ${formTouched && !tripType ? "border-red-300 bg-red-50" : "border-gray-200"}
                          rounded-lg bg-gray-50 text-sm text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all
                          hover:bg-gray-100
                        `}
                      >
                        <span className={tripType ? "text-gray-900" : "text-gray-500"}>
                          {tripType ? getSelectedTripTypeLabel() : "Sélectionnez un type"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-200 ${
                            tripTypeDropdownOpen ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown menu */}
                      <AnimatePresence>
                        {tripTypeDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                              isMobile ? "py-0.5" : "py-1"
                            }`}
                          >
                            {tripTypes.map((type) => (
                              <div
                                key={type.value}
                                className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100 ${
                                  tripType === type.value ? "bg-[#FFD700]/10 font-medium" : ""
                                }`}
                                onClick={() => {
                                  setTripType(type.value)
                                  setTripTypeDropdownOpen(false)
                                  setFormTouched(true)
                                }}
                              >
                                {type.label}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {formTouched && !tripType && activeTab === "leisure" && (
                        <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                          Veuillez sélectionner un type de voyage
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Trip Duration - Only for Leisure Tours */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                      <Calendar size={16} className="mr-2 text-amber-400" />
                      Durée du Voyage
                    </label>
                    <div className="relative" ref={durationDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setDurationDropdownOpen(!durationDropdownOpen)}
                        className={`
                          w-full p-2.5 flex justify-between items-center border
                          ${formTouched && !tripDuration ? "border-red-300 bg-red-50" : "border-gray-200"}
                          rounded-lg bg-gray-50 text-sm text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all
                          hover:bg-gray-100
                        `}
                      >
                        <span className={tripDuration ? "text-gray-900" : "text-gray-500"}>
                          {tripDuration ? getSelectedDurationLabel() : "Sélectionnez une durée"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-200 ${
                            durationDropdownOpen ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown menu */}
                      <AnimatePresence>
                        {durationDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                              isMobile ? "py-0.5" : "py-1"
                            }`}
                          >
                            {tripDurations.map((duration) => (
                              <div
                                key={duration.value}
                                className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100 ${
                                  tripDuration === duration.value ? "bg-[#FFD700]/10 font-medium" : ""
                                }`}
                                onClick={() => {
                                  setTripDuration(duration.value)
                                  setDurationDropdownOpen(false)
                                  setFormTouched(true)
                                }}
                              >
                                {duration.label}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {formTouched && !tripDuration && activeTab === "leisure" && (
                        <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                          Veuillez sélectionner une durée
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : activeTab === "hotel" ? (
                <>
                  {/* Hotel Destination */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                      <MapPin size={16} className="mr-2 text-amber-400" />
                      Destination
                    </label>
                    <div className="relative hotel-destination-autocomplete">
                      <input
                        type="text"
                        value={hotelDestinationInput}
                        onChange={handleHotelDestinationChange}
                        placeholder="Entrez une destination"
                        className={`w-full ${isMobile ? "py-2 px-2" : "p-2.5"} border ${
                          formTouched && !hotelDestination ? "border-red-300 bg-red-50" : "border-gray-200"
                        } rounded-lg bg-gray-50 text-sm text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                      />

                      {/* Suggestions dropdown */}
                      <AnimatePresence>
                        {showHotelDestinationSuggestions && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                              isMobile ? "py-0.5" : "py-1"
                            } max-h-48 overflow-y-auto`}
                          >
                            {hotelDestinationSuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100`}
                                onClick={() => handleHotelDestinationSelect(suggestion)}
                              >
                                {suggestion}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {formTouched && !hotelDestination && activeTab === "hotel" && (
                        <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                          Veuillez sélectionner une destination
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Check-in Date */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                      <Calendar size={16} className="mr-2 text-amber-400" />
                      Check-in
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={hotelDateRange.from}
                        onChange={(e) => {
                          setHotelDateRange({ ...hotelDateRange, from: e.target.value })
                          setFormTouched(true)
                        }}
                        className={`w-full ${isMobile ? "py-2 px-2" : "p-2.5"} border ${
                          formTouched && !hotelDateRange.from ? "border-red-300 bg-red-50" : "border-gray-200"
                        } rounded-lg bg-gray-50 text-sm text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                        min={new Date().toISOString().split("T")[0]} // Set minimum date to today
                      />
                      {formTouched && !hotelDateRange.from && activeTab === "hotel" && (
                        <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                          Veuillez sélectionner une date d'arrivée
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Check-out Date */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                      <Calendar size={16} className="mr-2 text-amber-400" />
                      Check-out
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={hotelDateRange.to}
                        onChange={(e) => {
                          setHotelDateRange({ ...hotelDateRange, to: e.target.value })
                          setFormTouched(true)
                        }}
                        className={`w-full ${isMobile ? "py-2 px-2" : "p-2.5"} border ${
                          formTouched && !hotelDateRange.to ? "border-red-300 bg-red-50" : "border-gray-200"
                        } rounded-lg bg-gray-50 text-sm text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                        min={hotelDateRange.from || new Date().toISOString().split("T")[0]} // Set minimum date to check-in date or today
                      />
                      {formTouched && !hotelDateRange.to && activeTab === "hotel" && (
                        <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                          Veuillez sélectionner une date de départ
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : activeTab === "vol" ? (
                <>
                  {/* Update the flight tab layout to have 4 fields in first row and 3 in second row */}
                  <div className="col-span-full grid grid-cols-1 md:grid-cols-4 gap-3">
                    {/* Trip Direction (One-way/Round-trip) */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                        <Calendar size={16} className="mr-2 text-amber-400" />
                        Type de vol
                      </label>
                      <div className="relative" ref={tripDirectionDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setTripDirectionDropdownOpen(!tripDirectionDropdownOpen)}
                          className={`
                            w-full p-2.5 flex justify-between items-center border
                            ${formTouched && !tripDirection ? "border-red-300 bg-red-50" : "border-gray-200"}
                            rounded-lg bg-gray-50 text-sm text-gray-900
                            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all
                            hover:bg-gray-100
                          `}
                        >
                          <span className={tripDirection ? "text-gray-900" : "text-gray-500"}>
                            {tripDirection ? getSelectedTripDirectionLabel() : "Type de vol"}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-200 ${
                              tripDirectionDropdownOpen ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown menu */}
                        <AnimatePresence>
                          {tripDirectionDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                                isMobile ? "py-0.5" : "py-1"
                              }`}
                            >
                              {tripDirections.map((dir) => (
                                <div
                                  key={dir.value}
                                  className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100 ${
                                    tripDirection === dir.value ? "bg-[#FFD700]/10 font-medium" : ""
                                  }`}
                                  onClick={() => {
                                    setTripDirection(dir.value)
                                    setTripDirectionDropdownOpen(false)
                                    setFormTouched(true)
                                  }}
                                >
                                  {dir.label}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Flight Class */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                        <Calendar size={16} className="mr-2 text-amber-400" />
                        Classe
                      </label>
                      <div className="relative" ref={flightClassDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setFlightClassDropdownOpen(!flightClassDropdownOpen)}
                          className={`
                            w-full p-2.5 flex justify-between items-center border
                            ${formTouched && !flightClass ? "border-red-300 bg-red-50" : "border-gray-200"}
                            rounded-lg bg-gray-50 text-sm text-gray-900
                            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all
                            hover:bg-gray-100
                          `}
                        >
                          <span className={flightClass ? "text-gray-900" : "text-gray-500"}>
                            {flightClass ? flightClasses.find((c) => c.value === flightClass)?.label : "Choisir classe"}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-200 ${
                              flightClassDropdownOpen ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown menu */}
                        <AnimatePresence>
                          {flightClassDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                                isMobile ? "py-0.5" : "py-1"
                              }`}
                            >
                              {flightClasses.map((cls) => (
                                <div
                                  key={cls.value}
                                  className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100 ${
                                    flightClass === cls.value ? "bg-[#FFD700]/10 font-medium" : ""
                                  }`}
                                  onClick={() => {
                                    setFlightClass(cls.value)
                                    setFlightClassDropdownOpen(false)
                                    setFormTouched(true)
                                  }}
                                >
                                  {cls.label}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {formTouched && !flightClass && activeTab === "vol" && (
                          <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                            Veuillez sélectionner une classe
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Departure City - Use dropdown like in Hajj/Umrah/Loisirs */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                        <MapPin size={16} className="mr-2 text-amber-400" />
                        Départ
                      </label>
                      <div className="relative" ref={departureCityDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setDepartureCityDropdownOpen(!departureCityDropdownOpen)}
                          className={`
                            w-full p-2.5 flex justify-between items-center border
                            ${formTouched && !departureCity ? "border-red-300 bg-red-50" : "border-gray-200"}
                            rounded-lg bg-gray-50 text-sm text-gray-900
                            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all
                            hover:bg-gray-100
                          `}
                        >
                          <span className={departureCity ? "text-gray-900" : "text-gray-500"}>
                            {departureCity ? getSelectedDepartureCityLabel() : "Ville de départ"}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-200 ${
                              departureCityDropdownOpen ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown menu */}
                        <AnimatePresence>
                          {departureCityDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                                isMobile ? "py-0.5" : "py-1"
                              }`}
                            >
                              {moroccanCities.map((city) => (
                                <div
                                  key={city.value}
                                  className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100 ${
                                    departureCity === city.value ? "bg-[#FFD700]/10 font-medium" : ""
                                  }`}
                                  onClick={() => {
                                    setDepartureCity(city.value)
                                    setDepartureCityDropdownOpen(false)
                                    setFormTouched(true)
                                  }}
                                >
                                  {city.label}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {formTouched && !departureCity && activeTab === "vol" && (
                          <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                            Veuillez sélectionner une ville de départ
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Arrival City - Keep as text input with autocomplete */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                        <MapPin size={16} className="mr-2 text-amber-400" />
                        Arrivée
                      </label>
                      <div className="relative arrival-city-autocomplete">
                        <input
                          type="text"
                          value={arrivalCityInput}
                          onChange={handleArrivalCityChange}
                          placeholder="Ville d'arrivée"
                          className={`w-full ${isMobile ? "py-2 px-2" : "p-2.5"} border ${
                            formTouched && !arrivalCity ? "border-red-300 bg-red-50" : "border-gray-200"
                          } rounded-lg bg-gray-50 text-sm text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                        />

                        {/* Suggestions dropdown */}
                        <AnimatePresence>
                          {showArrivalCitySuggestions && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                                isMobile ? "py-0.5" : "py-1"
                              } max-h-48 overflow-y-auto`}
                            >
                              {arrivalCitySuggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className={`${isMobile ? "px-2 py-1.5 text-xs" : "px-3 py-2"} cursor-pointer hover:bg-gray-100`}
                                  onClick={() => handleArrivalCitySelect(suggestion)}
                                >
                                  {suggestion}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {formTouched && !arrivalCity && activeTab === "vol" && (
                          <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                            Veuillez sélectionner une ville d'arrivée
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Second row with 3 fields */}
                  <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Date Picker - From */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                        <Calendar size={16} className="mr-2 text-amber-400" />
                        {tripDirection === "round" ? "Date aller" : "Date de départ"}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={flightDateRange.from}
                          onChange={(e) => {
                            setFlightDateRange({ ...flightDateRange, from: e.target.value })
                            setFormTouched(true)
                          }}
                          className={`w-full ${isMobile ? "py-2 px-2" : "p-2.5"} border ${
                            formTouched && !flightDateRange.from ? "border-red-300 bg-red-50" : "border-gray-200"
                          } rounded-lg bg-gray-50 text-sm text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                          min={new Date().toISOString().split("T")[0]} // Set minimum date to today
                        />
                        {formTouched && !flightDateRange.from && activeTab === "vol" && (
                          <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                            Veuillez sélectionner une date
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Date Picker - To (only for round-trip) */}
                    {tripDirection === "round" && (
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                          <Calendar size={16} className="mr-2 text-amber-400" />
                          Date retour
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={flightDateRange.to}
                            onChange={(e) => {
                              setFlightDateRange({ ...flightDateRange, to: e.target.value })
                              setFormTouched(true)
                            }}
                            className={`w-full ${isMobile ? "py-2 px-2" : "p-2.5"} border ${
                              formTouched && !flightDateRange.to && tripDirection === "round"
                                ? "border-red-300 bg-red-50"
                                : "border-gray-200"
                            } rounded-lg bg-gray-50 text-sm text-gray-900
                            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                            min={flightDateRange.from || new Date().toISOString().split("T")[0]} // Set minimum date to departure date or today
                          />
                          {formTouched && !flightDateRange.to && tripDirection === "round" && activeTab === "vol" && (
                            <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                              Veuillez sélectionner une date de retour
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Passengers Dropdown - For flight tab */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                        <Users size={16} className="mr-2 text-amber-400" />
                        Voyageurs
                      </label>
                      <div className="relative" ref={passengersDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setPassengersDropdownOpen(!passengersDropdownOpen)}
                          className={`w-full ${isMobile ? "py-2 px-2" : "p-2.5"} flex justify-between items-center border ${
                            formTouched && !adultsCount ? "border-red-300 bg-red-50" : "border-gray-200"
                          } rounded-lg bg-gray-50 text-sm text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                        >
                          <span className={adultsCount !== "0" ? "text-gray-900" : "text-gray-500"}>
                            {getPassengerSummary()}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-200 ${
                              passengersDropdownOpen ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown menu with both inputs */}
                        <AnimatePresence>
                          {passengersDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                                isMobile ? "p-2" : "p-3"
                              }`}
                            >
                              {/* Adults input */}
                              <div className={isMobile ? "mb-2" : "mb-3"}>
                                <div className={`flex items-center justify-between ${isMobile ? "mb-1" : "mb-2"}`}>
                                  <label className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-gray-700`}>
                                    Adultes
                                  </label>
                                  <span className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-500`}>(18+ ans)</span>
                                </div>
                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={decrementAdults}
                                    className={`${
                                      isMobile ? "p-1.5" : "p-2"
                                    } border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
                                    aria-label="Diminuer"
                                  >
                                    <Minus size={isMobile ? 12 : 14} className="text-gray-600" />
                                  </button>
                                  <input
                                    type="text"
                                    value={adultsCount}
                                    onChange={handleAdultsChange}
                                    className={`w-full ${
                                      isMobile ? "p-1.5 text-xs" : "p-2"
                                    } border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all`}
                                    min="1"
                                    max="10"
                                    aria-label="Nombre d'adultes"
                                  />
                                  <button
                                    type="button"
                                    onClick={incrementAdults}
                                    className={`${
                                      isMobile ? "p-1.5" : "p-2"
                                    } border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
                                    aria-label="Augmenter"
                                  >
                                    <Plus size={isMobile ? 12 : 14} className="text-gray-600" />
                                  </button>
                                </div>
                              </div>

                              {/* Children input */}
                              <div>
                                <div className={`flex items-center justify-between ${isMobile ? "mb-1" : "mb-2"}`}>
                                  <label className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-gray-700`}>
                                    Enfants
                                  </label>
                                  <span className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-500`}>
                                    (0-17 ans)
                                  </span>
                                </div>
                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={decrementChildren}
                                    className={`${
                                      isMobile ? "p-1.5" : "p-2"
                                    } border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
                                    aria-label="Diminuer"
                                  >
                                    <Minus size={isMobile ? 12 : 14} className="text-gray-600" />
                                  </button>
                                  <input
                                    type="text"
                                    value={childrenCount}
                                    onChange={handleChildrenChange}
                                    className={`w-full ${
                                      isMobile ? "p-1.5 text-xs" : "p-2"
                                    } border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all`}
                                    min="0"
                                    max="10"
                                    aria-label="Nombre d'enfants"
                                  />
                                  <button
                                    type="button"
                                    onClick={incrementChildren}
                                    className={`${
                                      isMobile ? "p-1.5" : "p-2"
                                    } border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
                                    aria-label="Augmenter"
                                  >
                                    <Plus size={isMobile ?  12 : 14} className="text-gray-600" />
                                  </button>
                                </div>
                              </div>

                              {/* Apply button */}
                              <button
                                type="button"
                                onClick={() => setPassengersDropdownOpen(false)}
                                className={`w-full ${
                                  isMobile ? "mt-2 py-1.5 text-xs" : "mt-3 py-2 text-sm"
                                } bg-[#FFD700] text-black rounded-md hover:bg-[#e6c200] transition-colors font-medium`}
                              >
                                Appliquer
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {formTouched && (!adultsCount || Number.parseInt(adultsCount) < 1) && (
                          <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                            Veuillez sélectionner au moins 1 adulte
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              {activeTab !== "vol" && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                    <Users size={16} className="mr-2 text-amber-400" />
                    Voyageurs
                  </label>
                  <div className="relative" ref={passengersDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setPassengersDropdownOpen(!passengersDropdownOpen)}
                      className={`w-full ${isMobile ? "py-2 px-2" : "p-2.5"} flex justify-between items-center border ${
                        formTouched && !adultsCount ? "border-red-300 bg-red-50" : "border-gray-200"
                      } rounded-lg bg-gray-50 text-sm text-gray-900
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all`}
                    >
                      <span className={adultsCount !== "0" ? "text-gray-900" : "text-gray-500"}>
                        {getPassengerSummary()}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 ${
                          passengersDropdownOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown menu with both inputs */}
                    <AnimatePresence>
                      {passengersDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg ${
                            isMobile ? "p-2" : "p-3"
                          }`}
                        >
                          {/* Adults input */}
                          <div className={isMobile ? "mb-2" : "mb-3"}>
                            <div className={`flex items-center justify-between ${isMobile ? "mb-1" : "mb-2"}`}>
                              <label className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-gray-700`}>
                                Adultes
                              </label>
                              <span className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-500`}>(18+ ans)</span>
                            </div>
                            <div className="flex">
                              <button
                                type="button"
                                onClick={decrementAdults}
                                className={`${
                                  isMobile ? "p-1.5" : "p-2"
                                } border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
                                aria-label="Diminuer"
                              >
                                <Minus size={isMobile ? 12 : 14} className="text-gray-600" />
                              </button>
                              <input
                                type="text"
                                value={adultsCount}
                                onChange={handleAdultsChange}
                                className={`w-full ${
                                  isMobile ? "p-1.5 text-xs" : "p-2"
                                } border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all`}
                                min="1"
                                max="10"
                                aria-label="Nombre d'adultes"
                              />
                              <button
                                type="button"
                                onClick={incrementAdults}
                                className={`${
                                  isMobile ? "p-1.5" : "p-2"
                                } border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
                                aria-label="Augmenter"
                              >
                                <Plus size={isMobile ? 12 : 14} className="text-gray-600" />
                              </button>
                            </div>
                          </div>

                          {/* Children input */}
                          <div className={activeTab === "hotel" ? "mb-3" : ""}>
                            <div className={`flex items-center justify-between ${isMobile ? "mb-1" : "mb-2"}`}>
                              <label className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-gray-700`}>
                                Enfants
                              </label>
                              <span className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-500`}>(0-17 ans)</span>
                            </div>
                            <div className="flex">
                              <button
                                type="button"
                                onClick={decrementChildren}
                                className={`${
                                  isMobile ? "p-1.5" : "p-2"
                                } border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
                                aria-label="Diminuer"
                              >
                                <Minus size={isMobile ? 12 : 14} className="text-gray-600" />
                              </button>
                              <input
                                type="text"
                                value={childrenCount}
                                onChange={handleChildrenChange}
                                className={`w-full ${
                                  isMobile ? "p-1.5 text-xs" : "p-2"
                                } border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all`}
                                min="0"
                                max="10"
                                aria-label="Nombre d'enfants"
                              />
                              <button
                                type="button"
                                onClick={incrementChildren}
                                className={`${
                                  isMobile ? "p-1.5" : "p-2"
                                } border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
                                aria-label="Augmenter"
                              >
                                <Plus size={isMobile ? 12 : 14} className="text-gray-600" />
                              </button>
                            </div>
                          </div>

                          {/* Rooms input - Only for hotel tab */}
                          {activeTab === "hotel" && (
                            <div>
                              <div className={`flex items-center justify-between ${isMobile ? "mb-1" : "mb-2"}`}>
                                <label className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-gray-700`}>
                                  Chambres
                                </label>
                              </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={decrementRooms}
                                  className={`${
                                    isMobile ? "p-1.5" : "p-2"
                                  } border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
                                  aria-label="Diminuer"
                                >
                                  <Minus size={isMobile ? 12 : 14} className="text-gray-600" />
                                </button>
                                <input
                                  type="text"
                                  value={roomsCount}
                                  onChange={handleRoomsChange}
                                  className={`w-full ${
                                    isMobile ? "p-1.5 text-xs" : "p-2"
                                  } border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all`}
                                  min="1"
                                  max="5"
                                  aria-label="Nombre de chambres"
                                />
                                <button
                                  type="button"
                                  onClick={incrementRooms}
                                  className={`${
                                    isMobile ? "p-1.5" : "p-2"
                                  } border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors`}
                                  aria-label="Augmenter"
                                >
                                  <Plus size={isMobile ? 12 : 14} className="text-gray-600" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Apply button */}
                          <button
                            type="button"
                            onClick={() => setPassengersDropdownOpen(false)}
                            className={`w-full ${
                              isMobile ? "mt-2 py-1.5 text-xs" : "mt-3 py-2 text-sm"
                            } bg-[#FFD700] text-black rounded-md hover:bg-[#e6c200] transition-colors font-medium`}
                          >
                            Appliquer
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {formTouched && (!adultsCount || Number.parseInt(adultsCount) < 1) && (
                      <p className={`mt-0.5 ${isMobile ? "text-[10px]" : "text-xs"} text-red-500`}>
                        Veuillez sélectionner au moins 1 adulte
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Proceed Button */}
            <div className="mt-8">
              <motion.div whileHover={formValid ? { scale: 1.02 } : {}} whileTap={formValid ? { scale: 0.98 } : {}}>
                <button
                  onClick={handleReservationClick}
                  className={`
                    inline-block w-full py-4 rounded-full font-medium text-center transition-all duration-300
                    ${formValid
                      ? "bg-amber-400 text-gray-900 shadow-xl hover:bg-amber-300 hover:scale-[1.02]"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  <span className="flex items-center justify-center">
                    Réserver Maintenant
                    <ArrowRight size={18} className="ml-2" />
                  </span>
                </button>
              </motion.div>
            </div>

            {/* REMOVE Decorative elements */}
            {/* <div className="absolute -top-4 -right-4 w-8 h-8 border border-amber-400/30 rotate-45 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-2 w-4 h-4 bg-amber-400/20 rotate-12 animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/4 right-20 w-2 h-2 bg-amber-400/40 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 left-20 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div> */}

            {/* Additional info section - Only show on desktop */}
            {!isMobile && (
              <div className="mt-5 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Calendar size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Dates Flexibles</h4>
                      <p className="text-xs text-gray-500">Plusieurs départs disponibles</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Users size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Réductions Groupe</h4>
                      <p className="text-xs text-gray-500">À partir de 10 personnes</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <MapPin size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Emplacements Premium</h4>
                      <p className="text-xs text-gray-500">Près des lieux saints</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Login Prompt Modal */}
            <AnimatePresence>
              {showLoginPrompt && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
                  onClick={() => setShowLoginPrompt(false)}
                >
                  <motion.div
                    ref={loginPromptRef}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className={`bg-white rounded-xl shadow-2xl w-full ${
                      isMobile ? "max-w-xs" : "max-w-md"
                    } overflow-hidden`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className={`${
                        isMobile ? "p-3" : "p-5"
                      } border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-amber-100 to-amber-50`}
                    >
                      <h2 className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-gray-900`}>
                        Options de réservation
                      </h2>
                      <button
                        onClick={() => setShowLoginPrompt(false)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Fermer"
                      >
                        <X size={isMobile ? 18 : 20} />
                      </button>
                    </div>

                    <div className={isMobile ? "p-4" : "p-6"}>
                      <div
                        className={`${
                          isMobile ? "w-10 h-10" : "w-12 h-12"
                        } bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3`}
                      >
                        <Calendar className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-amber-400`} />
                      </div>
                      <h3 className={`${isMobile ? "text-base" : "text-lg"} font-bold text-gray-900 mb-2 text-center`}>
                        Comment souhaitez-vous continuer?
                      </h3>
                      <p className={`${isMobile ? "text-sm" : ""} text-gray-600 mb-4 text-center`}>
                        Vous pouvez créer un compte pour suivre vos réservations ou continuer sans compte.
                      </p>
                      <div className="flex flex-col space-y-3">
                        <Link
                          href="/direct-reservation"
                          className={`px-4 ${isMobile ? "py-1.5 text-xs" : "py-2 text-sm"} bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-md transition-colors font-medium text-center`}
                        >
                          Continuer sans créer de compte
                        </Link>
                        <Link
                          href={`/register?redirect=${encodeURIComponent(window.location.pathname)}`}
                          className={`px-4 ${isMobile ? "py-1.5 text-xs" : "py-2 text-sm"} bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors font-medium text-center`}
                        >
                          Créer un compte
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  )
}

const TypedTitle = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isPaused) {
      // Pause at the end of typing or deleting before changing direction
      timeout = setTimeout(() => {
        setIsPaused(false)
      }, 1500) // Pause for 1.5 seconds
    } else if (isDeleting) {
      // Deleting mode
      if (displayedText.length === 0) {
        // When fully deleted, switch to typing mode
        setIsDeleting(false)
        setCurrentIndex(0)
      } else {
        // Continue deleting
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 50) // Faster when deleting
      }
    } else {
      // Typing mode
      if (currentIndex < text.length) {
        // Continue typing
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[currentIndex])
          setCurrentIndex(currentIndex + 1)
        }, 100) // Speed of typing
      } else {
        // When fully typed, pause then switch to deleting mode
        setIsPaused(true)
        setTimeout(() => {
          setIsDeleting(true)
        }, 1500)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, displayedText, isDeleting, isPaused, text])

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 whitespace-nowrap overflow-hidden" translate="no">
        {displayedText}
        <span className="inline-block w-1 h-4 md:h-5 bg-amber-400 ml-1 animate-pulse"></span>
      </h2>
      <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
    </div>
  )
}

