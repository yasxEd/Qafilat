"use client"

import type React from "react"

import { motion } from "framer-motion"
import { AlertCircle, Calendar, CheckCircle, ChevronDown, FileText, Loader2, Upload } from "lucide-react"
import { useEffect, useRef, useState } from "react"
// Add import for types at the top of the file

// Update the interface ReservationFormProps to include userId and agencyId
interface ReservationFormProps {
  initialData: {
    packageType?: string
    departureCity?: string
    destination?: string
    tripType?: string
    duration?: string
    dateFrom?: string
    dateTo?: string
    tripDirection?: string
    flightClass?: string
    adults?: string
    children?: string
    rooms?: string
    userId?: string
    agencyId?: string
    forfait?: string
  }
  onComplete: (formData: any) => void
}

const uploadToCloudinary = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "unsigned_preset") // Use your new preset name

  const res = await fetch(`https://api.cloudinary.com/v1_1/dqiwvsqeu/upload`, {
    method: "POST",
    body: formData,
  })
  const data = await res.json()
  if (!res.ok) {
    // Log the error for debugging
    console.error("Cloudinary upload error:", data)
    throw new Error(data.error?.message || "Cloudinary upload failed")
  }
  return data.secure_url // This is the Cloudinary URL
}

export default function ReservationForm({ initialData, onComplete }: ReservationFormProps) {
  // Personal information form data
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    passportNumber: "",
    passportExpiry: "",
    phoneNumber: "",
    address: "",
    emergencyContact: "",
    medicalConditions: "",
  })

  // Travel details
  const [packageType, setPackageType] = useState(initialData?.packageType || "hajj")
  const [departureCity, setDepartureCity] = useState(initialData?.departureCity || "")
  const [destination, setDestination] = useState(initialData?.destination || "")
  const [tripType, setTripType] = useState(initialData?.tripType || "")
  const [duration, setDuration] = useState(initialData?.duration || "")
  const [dateFrom, setDateFrom] = useState(initialData?.dateFrom || "")
  const [dateTo, setDateTo] = useState(initialData?.dateTo || "")
  const [tripDirection, setTripDirection] = useState(initialData?.tripDirection || "round")
  const [flightClass, setFlightClass] = useState(initialData?.flightClass || "")
  const [adults, setAdults] = useState(initialData?.adults || "1")
  const [children, setChildren] = useState(initialData?.children || "0")
  const [rooms, setRooms] = useState(initialData?.rooms || "1")
  const [forfait, setForfait] = useState(initialData?.forfait || "")

  // UI state
  // Update the uploadedFiles state to match the new document structure
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: { exists: boolean; file: File | null; uploadedAt?: string }
  }>({
    passport: { exists: false, file: null },
    photo: { exists: false, file: null },
    vaccination: { exists: false, file: null },
    identity: { exists: false, file: null },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formTouched, setFormTouched] = useState(false)

  // Dropdown states
  const [packageTypeDropdownOpen, setPackageTypeDropdownOpen] = useState(false)
  const [departureCityDropdownOpen, setDepartureCityDropdownOpen] = useState(false)
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false)
  const [tripTypeDropdownOpen, setTripTypeDropdownOpen] = useState(false)
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false)
  const [tripDirectionDropdownOpen, setTripDirectionDropdownOpen] = useState(false)
  const [flightClassDropdownOpen, setFlightClassDropdownOpen] = useState(false)
  const [passengersDropdownOpen, setPassengersDropdownOpen] = useState(false)
  const [forfaitDropdownOpen, setForfaitDropdownOpen] = useState(false)

  // Refs for dropdowns
  const packageTypeRef = useRef<HTMLDivElement>(null)
  const departureCityRef = useRef<HTMLDivElement>(null)
  const destinationRef = useRef<HTMLDivElement>(null)
  const tripTypeRef = useRef<HTMLDivElement>(null)
  const durationRef = useRef<HTMLDivElement>(null)
  const tripDirectionRef = useRef<HTMLDivElement>(null)
  const flightClassRef = useRef<HTMLDivElement>(null)
  const passengersRef = useRef<HTMLDivElement>(null)
  const forfaitRef = useRef<HTMLDivElement>(null)

  // Autocomplete states
  const popularDestinations = [
    { value: "paris", label: "Paris, France" },
    { value: "istanbul", label: "Istanbul, Turquie" },
    { value: "dubai", label: "Dubaï, UAE" },
    { value: "london", label: "Londres, UK" },
    { value: "marrakech", label: "Marrakech, Maroc" },
    { value: "casablanca", label: "Casablanca, Maroc" },
    { value: "barcelona", label: "Barcelone, Espagne" },
    { value: "cairo", label: "Le Caire, Égypte" },
  ]
  const [destinationInput, setDestinationInput] = useState(
    initialData?.destination
      ? popularDestinations.find((d) => d.value === initialData.destination)?.label || initialData.destination
      : "",
  )
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([])
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)

  const forfaitOptions = [
    { value: "economique", label: "Économique" },
    { value: "standard", label: "Standard" },
    { value: "premium", label: "Premium" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (packageTypeRef.current && !packageTypeRef.current.contains(event.target as Node)) {
        setPackageTypeDropdownOpen(false)
      }
      if (departureCityRef.current && !departureCityRef.current.contains(event.target as Node)) {
        setDepartureCityDropdownOpen(false)
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setDestinationDropdownOpen(false)
      }
      if (tripTypeRef.current && !tripTypeRef.current.contains(event.target as Node)) {
        setTripTypeDropdownOpen(false)
      }
      if (durationRef.current && !durationRef.current.contains(event.target as Node)) {
        setDurationDropdownOpen(false)
      }
      if (tripDirectionRef.current && !tripDirectionRef.current.contains(event.target as Node)) {
        setTripDirectionDropdownOpen(false)
      }
      if (flightClassRef.current && !flightClassRef.current.contains(event.target as Node)) {
        setFlightClassDropdownOpen(false)
      }
      if (passengersRef.current && !passengersRef.current.contains(event.target as Node)) {
        setPassengersDropdownOpen(false)
      }
      if (forfaitRef.current && !forfaitRef.current.contains(event.target as Node)) {
        setForfaitDropdownOpen(false)
      }

      // Handle autocomplete
      if (!event.target || !(event.target as Element).closest(".destination-autocomplete")) {
        setShowDestinationSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Required document types
  const requiredDocuments = [
    {
      id: "passport",
      name: "Passeport",
      description: "Copie de votre passeport valide (validité min. 6 mois)",
      icon: FileText,
    },
    {
      id: "photo",
      name: "Photo d'identité",
      description: "Photo récente sur fond blanc (format 4x4cm)",
      icon: Upload,
    },
    {
      id: "vaccination",
      name: "Carnet de vaccination",
      description: "Certificat de vaccination à jour",
      icon: FileText,
    },
    {
      id: "identity",
      name: "Pièce d'identité",
      description: "Copie de votre carte d'identité nationale",
      icon: FileText,
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Data arrays
  const packageTypes = [
    { value: "hajj", label: "Hajj" },
    { value: "umrah", label: "Omra" },
    { value: "leisure", label: "Loisirs" },
    { value: "hotel", label: "Hôtel" },
    { value: "vol", label: "Vol" },
  ]

  const moroccanCities = [
    { value: "casablanca", label: "Casablanca" },
    { value: "rabat", label: "Rabat" },
    { value: "marrakech", label: "Marrakech" },
    { value: "tanger", label: "Tanger" },
  ]

  const tripTypes = [
    { value: "beach", label: "Vacances Plage" },
    { value: "city", label: "Tour de Ville" },
    { value: "cultural", label: "Expérience Culturelle" },
    { value: "adventure", label: "Voyage Aventure" },
    { value: "relaxation", label: "Séjour Détente" },
  ]

  const tripDurations = [
    { value: "3-5", label: "3-5 jours" },
    { value: "1-week", label: "1 semaine" },
    { value: "2-weeks", label: "2 semaines" },
    { value: "custom", label: "Personnalisé" },
  ]

  const tripDirections = [
    { value: "round", label: "Aller-Retour" },
    { value: "oneway", label: "Aller Simple" },
  ]

  const flightClasses = [
    { value: "economy", label: "Économique" },
    { value: "business", label: "Business" },
    { value: "premium", label: "Premium" },
  ]

  // Helper functions for labels
  const getSelectedPackageTypeLabel = () => {
    return packageTypes.find((type) => type.value === packageType)?.label || ""
  }

  const getSelectedDepartureCityLabel = () => {
    return moroccanCities.find((city) => city.value === departureCity)?.label || ""
  }

  const getSelectedDestinationLabel = () => {
    return popularDestinations.find((dest) => dest.value === destination)?.label || ""
  }

  const getSelectedTripTypeLabel = () => {
    return tripTypes.find((type) => type.value === tripType)?.label || ""
  }

  const getSelectedDurationLabel = () => {
    return tripDurations.find((dur) => dur.value === duration)?.label || ""
  }

  const getSelectedTripDirectionLabel = () => {
    return tripDirections.find((dir) => dir.value === tripDirection)?.label || ""
  }

  const getSelectedFlightClassLabel = () => {
    return flightClasses.find((cls) => cls.value === flightClass)?.label || ""
  }

  const getSelectedForfaitLabel = () => {
    return forfaitOptions.find((option) => option.value === forfait)?.label || ""
  }

  // Handle destination autocomplete
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDestinationInput(value)
    setDestination(value) // Set the value directly without requiring selection
    setFormTouched(true)

    if (value.length > 1) {
      const filteredSuggestions = popularDestinations
        .filter((dest) => dest.label.toLowerCase().includes(value.toLowerCase()))
        .map((dest) => dest.label)
      setDestinationSuggestions(filteredSuggestions)
      setShowDestinationSuggestions(filteredSuggestions.length > 0)
    } else {
      setShowDestinationSuggestions(false)
    }
  }

  const handleDestinationSelect = (suggestion: string) => {
    setDestinationInput(suggestion)
    const selectedDest = popularDestinations.find((dest) => dest.label === suggestion)
    if (selectedDest) {
      setDestination(selectedDest.value)
    }
    setShowDestinationSuggestions(false)
    setFormTouched(true)
  }

  // Handle passengers count
  const incrementAdults = () => {
    const currentCount = Number.parseInt(adults || "0")
    if (currentCount < 10) {
      setAdults((currentCount + 1).toString())
      setFormTouched(true)
    }
  }

  const decrementAdults = () => {
    const currentCount = Number.parseInt(adults || "0")
    if (currentCount > 1) {
      setAdults((currentCount - 1).toString())
      setFormTouched(true)
    }
  }

  const handleAdultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^[0-9]*$/.test(value)) {
      const numValue = value === "" ? "" : Number.parseInt(value)
      if (numValue === "" || (numValue >= 1 && numValue <= 10)) {
        setAdults(value)
        setFormTouched(true)
      }
    }
  }

  const incrementChildren = () => {
    const currentCount = Number.parseInt(children || "0")
    if (currentCount < 10) {
      setChildren((currentCount + 1).toString())
      setFormTouched(true)
    }
  }

  const decrementChildren = () => {
    const currentCount = Number.parseInt(children || "0")
    if (currentCount > 0) {
      setChildren((currentCount - 1).toString())
      setFormTouched(true)
    }
  }

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^[0-9]*$/.test(value)) {
      const numValue = value === "" ? "" : Number.parseInt(value)
      if (numValue === "" || (numValue >= 0 && numValue <= 10)) {
        setChildren(value)
        setFormTouched(true)
      }
    }
  }

  const incrementRooms = () => {
    const currentCount = Number.parseInt(rooms || "0")
    if (currentCount < 5) {
      setRooms((currentCount + 1).toString())
      setFormTouched(true)
    }
  }

  const decrementRooms = () => {
    const currentCount = Number.parseInt(rooms || "0")
    if (currentCount > 1) {
      setRooms((currentCount - 1).toString())
      setFormTouched(true)
    }
  }

  const handleRoomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^[0-9]*$/.test(value)) {
      const numValue = value === "" ? "" : Number.parseInt(value)
      if (numValue === "" || (numValue >= 1 && numValue <= 5)) {
        setRooms(value)
        setFormTouched(true)
      }
    }
  }

  // Get passenger summary
  const getPassengerSummary = () => {
    const adultsNum = Number.parseInt(adults || "0")
    const childrenNum = Number.parseInt(children || "0")
    const roomsNum = Number.parseInt(rooms || "0")

    if (adultsNum === 0 && childrenNum === 0) {
      return "Sélectionnez les voyageurs"
    }

    const parts = []
    if (adultsNum > 0) {
      parts.push(`${adultsNum} ${adultsNum > 1 ? "adultes" : "adulte"}`)
    }
    if (childrenNum > 0) {
      parts.push(`${childrenNum} ${childrenNum > 1 ? "enfants" : "enfant"}`)
    }
    if (packageType === "hotel" && roomsNum > 0) {
      parts.push(`${roomsNum} ${roomsNum > 1 ? "chambres" : "chambre"}`)
    }

    return parts.join(", ")
  }

  // Handle file uploads
  // Update the handleFileUpload function
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles({
        ...uploadedFiles,
        [fileType]: {
          exists: true,
          file: e.target.files[0],
          uploadedAt: new Date().toISOString(),
        },
      })
    }
  }

  // Check if all required files are uploaded
  // Update the allFilesUploaded check
  const allFilesUploaded = Object.values(uploadedFiles).every((file) => file.exists)

  // Check if form is complete based on package type
  const isFormComplete = () => {
    const requiredFields = [
      "fullName",
      "birthDate",
      "passportNumber",
      "passportExpiry",
      "phoneNumber",
      "address",
      "emergencyContact",
    ]

    const personalInfoComplete = requiredFields.every((field) => formData[field as keyof typeof formData] !== "")

    if (!personalInfoComplete) return false

    // Check travel details based on package type
    switch (packageType) {
      case "hajj":
      case "umrah":
        return departureCity !== "" && forfait !== "" && adults !== ""
      case "leisure":
        return (
          departureCity !== "" &&
          destinationInput !== "" &&
          tripType !== "" &&
          duration !== "" &&
          dateFrom !== "" &&
          adults !== ""
        )
      case "hotel":
        return destinationInput !== "" && dateFrom !== "" && dateTo !== "" && adults !== "" && rooms !== ""
      case "vol":
        return (
          departureCity !== "" &&
          destinationInput !== "" &&
          flightClass !== "" &&
          dateFrom !== "" &&
          (tripDirection === "oneway" || dateTo !== "") &&
          adults !== ""
        )
      default:
        return false
    }
  }

  // Update the handleSubmit function to include the new fields
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormComplete()) {
      alert("Veuillez remplir tous les champs obligatoires.")
      setFormTouched(true)
      return
    }

    setIsSubmitting(true)

    // 1. Upload files to Cloudinary and get URLs
    const documentUrls: any = {}
    for (const key of Object.keys(uploadedFiles)) {
      const fileObj = uploadedFiles[key]
      if (fileObj.exists && fileObj.file) {
        documentUrls[key] = {
          exists: true,
          url: await uploadToCloudinary(fileObj.file),
          filename: fileObj.file.name,
          uploadedAt: fileObj.uploadedAt,
        }
      } else {
        documentUrls[key] = { exists: false }
      }
    }

    // 2. Prepare the payload with Cloudinary URLs
    const payload = {
      ...formData,
      travelerName: formData.fullName,
      travelerPhone: formData.phoneNumber,
      packageType,
      departureCity,
      destination: destinationInput,
      tripType,
      duration,
      dateFrom,
      dateTo,
      tripDirection,
      flightClass,
      adults,
      children,
      rooms,
      forfait,
      documents: documentUrls,
      userId: initialData.userId || "user-" + Date.now(),
      agencyId: initialData.agencyId || "agency-1",
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const token = localStorage.getItem("token")
    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      setIsSubmitting(false)

      if (response.ok) {
        alert("Réservation créée avec succès!")
        onComplete(payload)
      } else {
        console.error("Reservation error details:", data)
        throw new Error("Failed to create reservation")
      }
    } catch (error) {
      setIsSubmitting(false)
      alert("Erreur réseau")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <Calendar size={18} className="text-[#FFD700] mr-2" />
          <h2 className="font-semibold text-gray-800">Compléter votre réservation</h2>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Travel Type Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-2">
              <span className="text-[#FFD700] font-bold text-xs">1</span>
            </div>
            Type de Voyage
          </h3>
          <div className="relative" ref={packageTypeRef}>
            <label className="block text-xs font-medium text-gray-700 mb-1">Type de Voyage*</label>
            <button
              type="button"
              onClick={() => setPackageTypeDropdownOpen(!packageTypeDropdownOpen)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md flex justify-between items-center focus:ring-[#FFD700] focus:border-[#FFD700]"
            >
              <span className="capitalize">{getSelectedPackageTypeLabel()}</span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${packageTypeDropdownOpen ? "transform rotate-180" : ""}`}
              />
            </button>
            {packageTypeDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">
                {packageTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      packageType === type.value ? "bg-[#FFD700]/10 font-medium" : ""
                    }`}
                    onClick={() => {
                      setPackageType(type.value)
                      setPackageTypeDropdownOpen(false)
                      setFormTouched(true)
                    }}
                  >
                    {type.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Travel Details Section - changes based on package type */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-2">
              <span className="text-[#FFD700] font-bold text-xs">2</span>
            </div>
            Détails du Voyage
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Departure City - Common for all types except hotel */}
            {packageType !== "hotel" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ville de Départ*</label>
                <div className="relative" ref={departureCityRef}>
                  <button
                    type="button"
                    onClick={() => setDepartureCityDropdownOpen(!departureCityDropdownOpen)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md flex justify-between items-center focus:ring-[#FFD700] focus:border-[#FFD700]"
                  >
                    <span>{departureCity ? getSelectedDepartureCityLabel() : "Sélectionnez une ville"}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${departureCityDropdownOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>
                  {departureCityDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      {moroccanCities.map((city) => (
                        <div
                          key={city.value}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
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
                    </div>
                  )}
                  {formTouched && !departureCity && packageType !== "hotel" && (
                    <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner une ville de départ</p>
                  )}
                </div>
              </div>
            )}

            {/* Destination - For leisure, hotel, vol */}
            {(packageType === "leisure" || packageType === "hotel" || packageType === "vol") && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Destination*</label>
                <div className="relative destination-autocomplete">
                  <input
                    type="text"
                    value={destinationInput}
                    onChange={handleDestinationChange}
                    placeholder="Entrez une destination"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  />
                  {showDestinationSuggestions && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1 max-h-48 overflow-y-auto">
                      {destinationSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleDestinationSelect(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                  {formTouched &&
                    !destinationInput &&
                    (packageType === "leisure" || packageType === "hotel" || packageType === "vol") && (
                      <p className="mt-0.5 text-xs text-red-500">Veuillez entrer une destination</p>
                    )}
                </div>
              </div>
            )}

            {/* Trip Type - For leisure */}
            {packageType === "leisure" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Type de Séjour*</label>
                <div className="relative" ref={tripTypeRef}>
                  <button
                    type="button"
                    onClick={() => setTripTypeDropdownOpen(!tripTypeDropdownOpen)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md flex justify-between items-center focus:ring-[#FFD700] focus:border-[#FFD700]"
                  >
                    <span>{tripType ? getSelectedTripTypeLabel() : "Sélectionnez un type"}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${tripTypeDropdownOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>
                  {tripTypeDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      {tripTypes.map((type) => (
                        <div
                          key={type.value}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
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
                    </div>
                  )}
                  {formTouched && !tripType && packageType === "leisure" && (
                    <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner un type de séjour</p>
                  )}
                </div>
              </div>
            )}

            {/* Duration - For leisure only */}
            {packageType === "leisure" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Durée du Séjour*</label>
                <div className="relative" ref={durationRef}>
                  <button
                    type="button"
                    onClick={() => setDurationDropdownOpen(!durationDropdownOpen)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md flex justify-between items-center focus:ring-[#FFD700] focus:border-[#FFD700]"
                  >
                    <span>{duration ? getSelectedDurationLabel() : "Sélectionnez une durée"}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${durationDropdownOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>
                  {durationDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      {tripDurations.map((dur) => (
                        <div
                          key={dur.value}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                            duration === dur.value ? "bg-[#FFD700]/10 font-medium" : ""
                          }`}
                          onClick={() => {
                            setDuration(dur.value)
                            setDurationDropdownOpen(false)
                            setFormTouched(true)
                          }}
                        >
                          {dur.label}
                        </div>
                      ))}
                    </div>
                  )}
                  {formTouched && !duration && packageType === "leisure" && (
                    <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner une durée</p>
                  )}
                </div>
              </div>
            )}

            {/* Check-in date - For hotel */}
            {packageType === "hotel" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Check-in*</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value)
                    setFormTouched(true)
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  min={new Date().toISOString().split("T")[0]}
                />
                {formTouched && !dateFrom && packageType === "hotel" && (
                  <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner une date de check-in</p>
                )}
              </div>
            )}

            {/* Check-out date - For hotel */}
            {packageType === "hotel" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Check-out*</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value)
                    setFormTouched(true)
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  min={dateFrom || new Date().toISOString().split("T")[0]}
                />
                {formTouched && !dateTo && packageType === "hotel" && (
                  <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner une date de check-out</p>
                )}
              </div>
            )}

            {/* Date From - For leisure */}
            {packageType === "leisure" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date de départ*</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value)
                    setFormTouched(true)
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  min={new Date().toISOString().split("T")[0]}
                />
                {formTouched && !dateFrom && packageType === "leisure" && (
                  <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner une date de départ</p>
                )}
              </div>
            )}

            {/* Trip Direction - For vol */}
            {packageType === "vol" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Type de Vol*</label>
                <div className="relative" ref={tripDirectionRef}>
                  <button
                    type="button"
                    onClick={() => setTripDirectionDropdownOpen(!tripDirectionDropdownOpen)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md flex justify-between items-center focus:ring-[#FFD700] focus:border-[#FFD700]"
                  >
                    <span>{tripDirection ? getSelectedTripDirectionLabel() : "Sélectionnez un type"}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${tripDirectionDropdownOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>
                  {tripDirectionDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      {tripDirections.map((dir) => (
                        <div
                          key={dir.value}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
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
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Flight Class - For vol */}
            {packageType === "vol" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Classe*</label>
                <div className="relative" ref={flightClassRef}>
                  <button
                    type="button"
                    onClick={() => setFlightClassDropdownOpen(!flightClassDropdownOpen)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md flex justify-between items-center focus:ring-[#FFD700] focus:border-[#FFD700]"
                  >
                    <span>{flightClass ? getSelectedFlightClassLabel() : "Sélectionnez une classe"}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${flightClassDropdownOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>
                  {flightClassDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      {flightClasses.map((cls) => (
                        <div
                          key={cls.value}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
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
                    </div>
                  )}
                  {formTouched && !flightClass && packageType === "vol" && (
                    <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner une classe</p>
                  )}
                </div>
              </div>
            )}

            {/* Date From - For vol */}
            {packageType === "vol" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {tripDirection === "round" ? "Date aller*" : "Date de départ*"}
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value)
                    setFormTouched(true)
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  min={new Date().toISOString().split("T")[0]}
                />
                {formTouched && !dateFrom && packageType === "vol" && (
                  <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner une date</p>
                )}
              </div>
            )}

            {/* Date To - For vol with round trip */}
            {packageType === "vol" && tripDirection === "round" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date retour*</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value)
                    setFormTouched(true)
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  min={dateFrom || new Date().toISOString().split("T")[0]}
                />
                {formTouched && !dateTo && packageType === "vol" && tripDirection === "round" && (
                  <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner une date de retour</p>
                )}
              </div>
            )}

            {/* Forfait - For hajj and umrah */}
            {(packageType === "hajj" || packageType === "umrah") && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Forfait*</label>
                <div className="relative" ref={forfaitRef}>
                  <button
                    type="button"
                    onClick={() => setForfaitDropdownOpen(!forfaitDropdownOpen)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md flex justify-between items-center focus:ring-[#FFD700] focus:border-[#FFD700]"
                  >
                    <span>{forfait ? getSelectedForfaitLabel() : "Sélectionnez un forfait"}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${forfaitDropdownOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>
                  {forfaitDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">
                      {forfaitOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                            forfait === option.value ? "bg-[#FFD700]/10 font-medium" : ""
                          }`}
                          onClick={() => {
                            setForfait(option.value)
                            setForfaitDropdownOpen(false)
                            setFormTouched(true)
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                  {formTouched && !forfait && (packageType === "hajj" || packageType === "umrah") && (
                    <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner un forfait</p>
                  )}
                </div>
              </div>
            )}

            {/* Passengers */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Voyageurs*</label>
              <div className="relative" ref={passengersRef}>
                <button
                  type="button"
                  onClick={() => setPassengersDropdownOpen(!passengersDropdownOpen)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md flex justify-between items-center focus:ring-[#FFD700] focus:border-[#FFD700]"
                >
                  <span>{getPassengerSummary()}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${passengersDropdownOpen ? "transform rotate-180" : ""}`}
                  />
                </button>
                {passengersDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3">
                    {/* Adults */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Adultes</label>
                        <span className="text-xs text-gray-500">(18+ ans)</span>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          onClick={decrementAdults}
                          className="p-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-600"
                          >
                            <path d="M5 12h14"></path>
                          </svg>
                        </button>
                        <input
                          type="text"
                          value={adults}
                          onChange={handleAdultsChange}
                          className="w-full p-2 border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700]"
                          min="1"
                          max="10"
                        />
                        <button
                          type="button"
                          onClick={incrementAdults}
                          className="p-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-600"
                          >
                            <path d="M12 5v14M5 12h14"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className={packageType === "hotel" ? "mb-3" : ""}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Enfants</label>
                        <span className="text-xs text-gray-500">(0-17 ans)</span>
                      </div>
                      <div className="flex">
                        <button
                          type="button"
                          onClick={decrementChildren}
                          className="p-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-600"
                          >
                            <path d="M5 12h14"></path>
                          </svg>
                        </button>
                        <input
                          type="text"
                          value={children}
                          onChange={handleChildrenChange}
                          className="w-full p-2 border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700]"
                          min="0"
                          max="10"
                        />
                        <button
                          type="button"
                          onClick={incrementChildren}
                          className="p-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-600"
                          >
                            <path d="M12 5v14M5 12h14"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Rooms - Only for hotel */}
                    {packageType === "hotel" && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700">Chambres</label>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            onClick={decrementRooms}
                            className="p-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-600"
                            >
                              <path d="M5 12h14"></path>
                            </svg>
                          </button>
                          <input
                            type="text"
                            value={rooms}
                            onChange={handleRoomsChange}
                            className="w-full p-2 border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700]"
                            min="1"
                            max="5"
                          />
                          <button
                            type="button"
                            onClick={incrementRooms}
                            className="p-2 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-600"
                            >
                              <path d="M12 5v14M5 12h14"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Apply button */}
                    <button
                      type="button"
                      onClick={() => setPassengersDropdownOpen(false)}
                      className="w-full mt-3 py-2 text-sm bg-[#FFD700] text-black rounded-md hover:bg-[#e6c200] transition-colors font-medium"
                    >
                      Appliquer
                    </button>
                  </div>
                )}
                {formTouched && (!adults || Number.parseInt(adults) < 1) && (
                  <p className="mt-0.5 text-xs text-red-500">Veuillez sélectionner au moins 1 adulte</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-2">
                <span className="text-[#FFD700] font-bold text-xs">3</span>
              </div>
              Informations Personnelles
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 mb-1">
                  Nom Complet*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="birthDate" className="block text-xs font-medium text-gray-700 mb-1">
                    Date de Naissance*
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-700 mb-1">
                    Téléphone*
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="passportNumber" className="block text-xs font-medium text-gray-700 mb-1">
                    N° Passeport*
                  </label>
                  <input
                    type="text"
                    id="passportNumber"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  />
                </div>
                <div>
                  <label htmlFor="passportExpiry" className="block text-xs font-medium text-gray-700 mb-1">
                    Expiration Passeport*
                  </label>
                  <input
                    type="date"
                    id="passportExpiry"
                    name="passportExpiry"
                    value={formData.passportExpiry}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-medium text-gray-700 mb-1">
                  Adresse*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label htmlFor="emergencyContact" className="block text-xs font-medium text-gray-700 mb-1">
                  Contact d'Urgence*
                </label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                  placeholder="Nom et numéro"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-1">
                Conditions Médicales (optionnel)
              </label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                rows={3}
                placeholder="Veuillez indiquer toute condition médicale ou allergie"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
              />
            </div>
          </div>

          {/* Document Upload Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-2">
                <span className="text-[#FFD700] font-bold text-xs">4</span>
              </div>
              Documents Requis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {requiredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={`border rounded-lg p-2 ${
                    uploadedFiles[doc.id]?.exists
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 hover:border-[#FFD700]/50"
                  } transition-colors`}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                        uploadedFiles[doc.id]?.exists ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {uploadedFiles[doc.id]?.exists ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <doc.icon className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-medium text-gray-900">{doc.name}</h4>
                      <label
                        htmlFor={`upload-${doc.id}`}
                        className={`inline-flex items-center px-2 py-1 mt-1 text-xs font-medium rounded-md cursor-pointer ${
                          uploadedFiles[doc.id]?.exists
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {uploadedFiles[doc.id]?.exists ? "Fichier chargé" : "Choisir fichier"}
                        <input
                          type="file"
                          id={`upload-${doc.id}`}
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, doc.id)}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!allFilesUploaded && (
              <div className="mt-2 flex items-center text-amber-600 text-xs">
                <AlertCircle size={12} className="mr-1" />
                Veuillez télécharger tous les documents requis
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-[#FFD700] border-gray-300 rounded focus:ring-[#FFD700]"
                />
              </div>
              <div className="ml-2 text-xs">
                <label htmlFor="terms" className="text-gray-700">
                  J'accepte les{" "}
                  <a href="#" className="text-[#FFD700] hover:underline">
                    conditions générales
                  </a>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={isSubmitting || !allFilesUploaded || !isFormComplete()}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                isSubmitting || !allFilesUploaded || !isFormComplete()
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#FFD700] text-black hover:bg-[#E6C200]"
              } transition-colors`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Traitement...
                </>
              ) : (
                "Soumettre ma Réservation"
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
