"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  AlertCircle,
  CheckCircle2,
  Plane,
  MapPin,
  Calendar,
  Users,
  Building,
  Clock,
  Star,
  ArrowRight,
  CreditCard,
  QrCode,
  Copy,
  Check
} from "lucide-react"
import { Listbox, RadioGroup, Switch } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid"

// Define types for form data
interface ReservationSummary {
  packageType: string
  forfaitType: string
  departureCity: string
  destination: string
  dateFrom: string
  dateTo: string
  adults: string
  children: string
  rooms: string
  tripDirection: string
  flightClass: string
  tripType: string
  tripDuration: string
}

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
}

interface SelectOption {
  value: string
  label: string
}

interface FormStatus {
  status: "idle" | "loading" | "success" | "error"
  message: string
}

interface PaymentInfo {
  method: "consultation" | "direct"
  paymentConfirmed: boolean
}

export default function PremiumReservationForm() {
  // Reservation summary state (editable)
  const [reservationSummary, setReservationSummary] = useState<ReservationSummary>({
    packageType: "hajj",
    forfaitType: "standard",
    departureCity: "casablanca",
    destination: "",
    dateFrom: "",
    dateTo: "",
    adults: "2",
    children: "0",
    rooms: "1",
    tripDirection: "round",
    flightClass: "economy",
    tripType: "",
    tripDuration: "",
  })

  // Personal information
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
  })

  // Form status
  const [formStatus, setFormStatus] = useState<FormStatus>({
    status: "idle",
    message: "",
  })

  // Payment information
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "consultation",
    paymentConfirmed: false,
  })

  // Copy state for RIB
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Package types and their labels
  const packageTypes: SelectOption[] = [
    { value: "hajj", label: "Hajj" },
    { value: "umrah", label: "Omra" },
    { value: "leisure", label: "Loisirs" },
    { value: "hotel", label: "Hôtel" },
    { value: "vol", label: "Vol" },
  ]

  // Forfait options
  const forfaitOptions: SelectOption[] = [
    { value: "economic", label: "Forfait Économique" },
    { value: "standard", label: "Forfait Standard" },
    { value: "premium", label: "Forfait Premium" },
  ]

  // Moroccan cities
  const moroccanCities: SelectOption[] = [
    { value: "casablanca", label: "Casablanca" },
    { value: "rabat", label: "Rabat" },
    { value: "marrakech", label: "Marrakech" },
    { value: "tanger", label: "Tanger" },
  ]

  // Flight classes
  const flightClasses: SelectOption[] = [
    { value: "economy", label: "Économique" },
    { value: "business", label: "Business" },
    { value: "premium", label: "Premium" },
  ]

  // Trip directions
  const tripDirections: SelectOption[] = [
    { value: "round", label: "Aller-Retour" },
    { value: "oneway", label: "Aller Simple" },
  ]

  // Trip types
  const tripTypes: SelectOption[] = [
    { value: "beach", label: "Vacances Plage" },
    { value: "city", label: "Tour de Ville" },
    { value: "cultural", label: "Expérience Culturelle" },
    { value: "adventure", label: "Voyage Aventure" },
    { value: "relaxation", label: "Séjour Détente" },
  ]

  // Trip durations
  const tripDurations: SelectOption[] = [
    { value: "3-5", label: "3-5 jours" },
    { value: "1-week", label: "1 semaine" },
    { value: "2-weeks", label: "2 semaines" },
    { value: "custom", label: "Personnalisé" },
  ]

  // RIB Information
  const ribInfo = {
    bankName: "Banque Populaire du Maroc",
    accountHolder: "HAJJ UMRAH SERVICES",
    rib: "230 780 2110014500000167 35",
    swift: "BCPOMAMC",
    iban: "MA64 2307 8021 1001 4500 0001 6735"
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  // Update handlers for Headless UI
  const handleSummaryChange = (name: string, value: string) => {
    setReservationSummary({
      ...reservationSummary,
      [name]: value,
    })
  }

  const handlePersonalInfoChange = (name: string, value: string) => {
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    })
  }

  const handlePaymentChange = (name: string, value: any) => {
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    })
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const generateQRCodeData = () => {
    return `BankTransfer:${ribInfo.accountHolder}:${ribInfo.rib}:${ribInfo.bankName}`
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    setFormStatus({
      status: "loading",
      message: "Envoi de votre demande en cours...",
    })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setFormStatus({
        status: "success",
        message: "Votre demande de réservation a été envoyée avec succès!",
      })
      
      setPersonalInfo({
        fullName: "",
        email: "",
        phone: "",
      })
    } catch (error) {
      setFormStatus({
        status: "error",
        message: "Une erreur est survenue lors de l'envoi de votre demande.",
      })
    }
  }

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Minimal Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-1 h-16 bg-neutral-900 mx-auto mb-8"
            />
            <h2 className="text-4xl md:text-5xl font-thin text-neutral-900 mb-6 tracking-[-0.02em]">
              Personnalisez votre voyage
            </h2>
            <p className="text-neutral-500 font-light max-w-lg mx-auto">
              Notre équipe vous contactera pour finaliser votre réservation
            </p>
          </div>

          {/* Status Alerts */}
          {formStatus.status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-4 border border-green-200 rounded-2xl bg-green-50"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">Demande envoyée avec succès</p>
                  <p className="text-green-600 text-sm mt-1">{formStatus.message}</p>
                </div>
              </div>
            </motion.div>
          )}

          {formStatus.status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-4 border border-red-200 rounded-2xl bg-red-50"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium">Erreur</p>
                  <p className="text-red-600 text-sm mt-1">{formStatus.message}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-16">
              {/* Trip Type Selection */}
              <motion.div variants={item}>
                <h3 className="text-xl font-light text-neutral-900 mb-8">Type de voyage</h3>
                <RadioGroup
                  value={reservationSummary.packageType}
                  onChange={val => handleSummaryChange("packageType", val)}
                  className="grid grid-cols-2 md:grid-cols-5 gap-4"
                >
                  {packageTypes.map((type) => (
                    <RadioGroup.Option key={type.value} value={type.value} className="focus:outline-none">
                      {({ checked }) => (
                        <div className={`p-6 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                          checked
                            ? 'border-neutral-900 bg-neutral-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}>
                          <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
                            {type.value === 'hajj' && <Calendar className="w-5 h-5 text-neutral-600" />}
                            {type.value === 'umrah' && <MapPin className="w-5 h-5 text-neutral-600" />}
                            {type.value === 'leisure' && <Star className="w-5 h-5 text-neutral-600" />}
                            {type.value === 'hotel' && <Building className="w-5 h-5 text-neutral-600" />}
                            {type.value === 'vol' && <Plane className="w-5 h-5 text-neutral-600" />}
                          </div>
                          <span className="text-sm font-light text-neutral-700">
                            {type.label}
                          </span>
                        </div>
                      )}
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
              </motion.div>

              {/* Trip Details */}
              <motion.div variants={item}>
                <h3 className="text-xl font-light text-neutral-900 mb-8">Détails du voyage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Forfait Type - Only for Hajj/Umrah */}
                  {(reservationSummary.packageType === "hajj" || reservationSummary.packageType === "umrah") && (
                    <div>
                      <label className="text-sm text-neutral-600 mb-2 block">Forfait</label>
                      <Listbox
                        value={reservationSummary.forfaitType}
                        onChange={val => handleSummaryChange("forfaitType", val)}
                      >
                        <div className="relative">
                          <Listbox.Button className="w-full p-4 border border-neutral-200 rounded-xl text-sm bg-white flex justify-between items-center">
                            {forfaitOptions.find(o => o.value === reservationSummary.forfaitType)?.label || "Choisir un forfait"}
                            <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg">
                            {forfaitOptions.map(option => (
                              <Listbox.Option key={option.value} value={option.value} className="cursor-pointer p-2 hover:bg-neutral-100">
                                {option.label}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      </Listbox>
                    </div>
                  )}

                  {/* Departure City - Not for Hotel */}
                  {reservationSummary.packageType !== "hotel" && (
                    <div>
                      <label className="text-sm text-neutral-600 mb-2 block">Ville de départ</label>
                      <Listbox
                        value={reservationSummary.departureCity}
                        onChange={val => handleSummaryChange("departureCity", val)}
                      >
                        <div className="relative">
                          <Listbox.Button className="w-full p-4 border border-neutral-200 rounded-xl text-sm bg-white flex justify-between items-center">
                            {moroccanCities.find(o => o.value === reservationSummary.departureCity)?.label || "Choisir une ville"}
                            <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg">
                            {moroccanCities.map(city => (
                              <Listbox.Option key={city.value} value={city.value} className="cursor-pointer p-2 hover:bg-neutral-100">
                                {city.label}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      </Listbox>
                    </div>
                  )}

                  {/* Destination */}
                  {(reservationSummary.packageType === "hotel" ||
                    reservationSummary.packageType === "vol" ||
                    reservationSummary.packageType === "leisure") && (
                    <div>
                      <label className="text-sm text-neutral-600 mb-2 block">Destination</label>
                      <input
                        type="text"
                        name="destination"
                        value={reservationSummary.destination}
                        onChange={e => handleSummaryChange("destination", e.target.value)}
                        placeholder="Entrez une destination"
                        className="w-full p-4 border border-neutral-200 rounded-xl text-sm"
                      />
                    </div>
                  )}

                  {/* Flight specific fields */}
                  {reservationSummary.packageType === "vol" && (
                    <>
                      <div>
                        <label className="text-sm text-neutral-600 mb-2 block">Type de vol</label>
                        <Listbox
                          value={reservationSummary.tripDirection}
                          onChange={val => handleSummaryChange("tripDirection", val)}
                        >
                          <div className="relative">
                            <Listbox.Button className="w-full p-4 border border-neutral-200 rounded-xl text-sm bg-white flex justify-between items-center">
                              {tripDirections.find(o => o.value === reservationSummary.tripDirection)?.label || "Type de vol"}
                              <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                            </Listbox.Button>
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg">
                              {tripDirections.map(dir => (
                                <Listbox.Option key={dir.value} value={dir.value} className="cursor-pointer p-2 hover:bg-neutral-100">
                                  {dir.label}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-600 mb-2 block">Classe</label>
                        <Listbox
                          value={reservationSummary.flightClass}
                          onChange={val => handleSummaryChange("flightClass", val)}
                        >
                          <div className="relative">
                            <Listbox.Button className="w-full p-4 border border-neutral-200 rounded-xl text-sm bg-white flex justify-between items-center">
                              {flightClasses.find(o => o.value === reservationSummary.flightClass)?.label || "Classe"}
                              <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                            </Listbox.Button>
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg">
                              {flightClasses.map(cls => (
                                <Listbox.Option key={cls.value} value={cls.value} className="cursor-pointer p-2 hover:bg-neutral-100">
                                  {cls.label}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                    </>
                  )}

                  {/* Leisure specific fields */}
                  {reservationSummary.packageType === "leisure" && (
                    <>
                      <div>
                        <label className="text-sm text-neutral-600 mb-2 block">Type de voyage</label>
                        <Listbox
                          value={reservationSummary.tripType}
                          onChange={val => handleSummaryChange("tripType", val)}
                        >
                          <div className="relative">
                            <Listbox.Button className="w-full p-4 border border-neutral-200 rounded-xl text-sm bg-white flex justify-between items-center">
                              {tripTypes.find(o => o.value === reservationSummary.tripType)?.label || "Sélectionnez un type"}
                              <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                            </Listbox.Button>
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg">
                              <Listbox.Option value="" className="cursor-pointer p-2 hover:bg-neutral-100">
                                Sélectionnez un type
                              </Listbox.Option>
                              {tripTypes.map(type => (
                                <Listbox.Option key={type.value} value={type.value} className="cursor-pointer p-2 hover:bg-neutral-100">
                                  {type.label}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-600 mb-2 block">Durée</label>
                        <Listbox
                          value={reservationSummary.tripDuration}
                          onChange={val => handleSummaryChange("tripDuration", val)}
                        >
                          <div className="relative">
                            <Listbox.Button className="w-full p-4 border border-neutral-200 rounded-xl text-sm bg-white flex justify-between items-center">
                              {tripDurations.find(o => o.value === reservationSummary.tripDuration)?.label || "Sélectionnez une durée"}
                              <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                            </Listbox.Button>
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg">
                              <Listbox.Option value="" className="cursor-pointer p-2 hover:bg-neutral-100">
                                Sélectionnez une durée
                              </Listbox.Option>
                              {tripDurations.map(duration => (
                                <Listbox.Option key={duration.value} value={duration.value} className="cursor-pointer p-2 hover:bg-neutral-100">
                                  {duration.label}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Dates and Travelers */}
              <motion.div variants={item}>
                <h3 className="text-xl font-light text-neutral-900 mb-8">Dates et voyageurs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Date fields */}
                  {(reservationSummary.packageType === "hotel" || reservationSummary.packageType === "vol") && (
                    <>
                      <div>
                        <label className="text-sm text-neutral-600 mb-2 block">
                          {reservationSummary.packageType === "hotel"
                            ? "Check-in"
                            : reservationSummary.tripDirection === "round"
                            ? "Date aller"
                            : "Date de départ"}
                        </label>
                        <input
                          type="date"
                          name="dateFrom"
                          value={reservationSummary.dateFrom}
                          onChange={e => handleSummaryChange("dateFrom", e.target.value)}
                          className="w-full p-4 border border-neutral-200 rounded-xl text-sm"
                        />
                      </div>
                      {(reservationSummary.packageType === "hotel" ||
                        (reservationSummary.packageType === "vol" && reservationSummary.tripDirection === "round")) && (
                        <div>
                          <label className="text-sm text-neutral-600 mb-2 block">
                            {reservationSummary.packageType === "hotel" ? "Check-out" : "Date retour"}
                          </label>
                          <input
                            type="date"
                            name="dateTo"
                            value={reservationSummary.dateTo}
                            onChange={e => handleSummaryChange("dateTo", e.target.value)}
                            className="w-full p-4 border border-neutral-200 rounded-xl text-sm"
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Travelers */}
                  <div>
                    <label className="text-sm text-neutral-600 mb-2 block">Adultes</label>
                    <Listbox
                      value={reservationSummary.adults}
                      onChange={val => handleSummaryChange("adults", val)}
                    >
                      <div className="relative">
                        <Listbox.Button className="w-full p-4 border border-neutral-200 rounded-xl text-sm bg-white flex justify-between items-center">
                          {reservationSummary.adults} {parseInt(reservationSummary.adults) > 1 ? "adultes" : "adulte"}
                          <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg">
                          {[...Array(10)].map((_, i) => (
                            <Listbox.Option key={i + 1} value={(i + 1).toString()} className="cursor-pointer p-2 hover:bg-neutral-100">
                              {i + 1} {i + 1 > 1 ? "adultes" : "adulte"}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                  <div>
                    <label className="text-sm text-neutral-600 mb-2 block">Enfants</label>
                    <Listbox
                      value={reservationSummary.children}
                      onChange={val => handleSummaryChange("children", val)}
                    >
                      <div className="relative">
                        <Listbox.Button className="w-full p-4 border border-neutral-200 rounded-xl text-sm bg-white flex justify-between items-center">
                          {reservationSummary.children} {parseInt(reservationSummary.children) > 1 ? "enfants" : "enfant"}
                          <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg">
                          {[...Array(11)].map((_, i) => (
                            <Listbox.Option key={i} value={i.toString()} className="cursor-pointer p-2 hover:bg-neutral-100">
                              {i} {i > 1 ? "enfants" : "enfant"}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>

                  {/* Rooms - For hotel */}
                  {reservationSummary.packageType === "hotel" && (
                    <div>
                      <label className="text-sm text-neutral-600 mb-2 block">Chambres</label>
                      <Listbox
                        value={reservationSummary.rooms}
                        onChange={val => handleSummaryChange("rooms", val)}
                      >
                        <div className="relative">
                          <Listbox.Button className="w-full p-4 border border-neutral-200 rounded-xl text-sm bg-white flex justify-between items-center">
                            {reservationSummary.rooms} {parseInt(reservationSummary.rooms) > 1 ? "chambres" : "chambre"}
                            <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                          </Listbox.Button>
                          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg">
                            {[...Array(5)].map((_, i) => (
                              <Listbox.Option key={i + 1} value={(i + 1).toString()} className="cursor-pointer p-2 hover:bg-neutral-100">
                                {i + 1} {i + 1 > 1 ? "chambres" : "chambre"}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      </Listbox>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Personal Information */}
              <motion.div variants={item}>
                <h3 className="text-xl font-light text-neutral-900 mb-8">Vos coordonnées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-neutral-600 mb-2 block">Nom complet *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={personalInfo.fullName}
                      onChange={e => handlePersonalInfoChange("fullName", e.target.value)}
                      required
                      className="w-full p-4 border border-neutral-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-600 mb-2 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={personalInfo.email}
                      onChange={e => handlePersonalInfoChange("email", e.target.value)}
                      className="w-full p-4 border border-neutral-200 rounded-xl"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-neutral-600 mb-2 block">Téléphone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={personalInfo.phone}
                      onChange={e => handlePersonalInfoChange("phone", e.target.value)}
                      required
                      className="w-full p-4 border border-neutral-200 rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment Method Selection */}
              <motion.div variants={item}>
                <h3 className="text-xl font-light text-neutral-900 mb-8">Mode de paiement</h3>
                <RadioGroup
                  value={paymentInfo.method}
                  onChange={val => handlePaymentChange("method", val)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <RadioGroup.Option value="consultation" className="focus:outline-none">
                    {({ checked }) => (
                      <div className={`p-6 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                        checked
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}>
                        <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
                          <Users className="w-5 h-5 text-neutral-600" />
                        </div>
                        <h4 className="font-medium text-neutral-900 mb-2">Consultation gratuite</h4>
                        <p className="text-sm text-neutral-600">
                          Notre équipe vous contactera pour discuter de votre voyage et établir un devis personnalisé
                        </p>
                      </div>
                    )}
                  </RadioGroup.Option>
                  <RadioGroup.Option value="direct" className="focus:outline-none">
                    {({ checked }) => (
                      <div className={`p-6 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                        checked
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}>
                        <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-neutral-600" />
                        </div>
                        <h4 className="font-medium text-neutral-900 mb-2">Paiement direct</h4>
                        <p className="text-sm text-neutral-600">
                          Effectuez un virement bancaire pour confirmer votre réservation immédiatement
                        </p>
                      </div>
                    )}
                  </RadioGroup.Option>
                </RadioGroup>
              </motion.div>

              {/* Direct Payment Details */}
              {paymentInfo.method === "direct" && (
                <motion.div
                  variants={item}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
                    <h3 className="text-xl font-light text-neutral-900 mb-8">Informations de paiement</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* RIB Information */}
                      <div>
                        <h4 className="font-medium text-neutral-900 mb-6">Coordonnées bancaires (RIB)</h4>
                        <div className="space-y-4">
                          <div className="bg-white rounded-xl p-4 border border-neutral-200">
                            <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                              Banque
                            </label>
                            <p className="font-medium text-neutral-900">{ribInfo.bankName}</p>
                          </div>
                          
                          <div className="bg-white rounded-xl p-4 border border-neutral-200">
                            <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                              Bénéficiaire
                            </label>
                            <p className="font-medium text-neutral-900">{ribInfo.accountHolder}</p>
                          </div>
                          
                          <div className="bg-white rounded-xl p-4 border border-neutral-200">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                                  RIB
                                </label>
                                <p className="font-mono text-sm text-neutral-900">{ribInfo.rib}</p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => copyToClipboard(ribInfo.rib, 'rib')}
                                className="ml-3 p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                              >
                                {copiedField === 'rib' ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </motion.button>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-4 border border-neutral-200">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                                  IBAN
                                </label>
                                <p className="font-mono text-sm text-neutral-900">{ribInfo.iban}</p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => copyToClipboard(ribInfo.iban, 'iban')}
                                className="ml-3 p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                              >
                                {copiedField === 'iban' ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </motion.button>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-4 border border-neutral-200">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <label className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                                  Code SWIFT
                                </label>
                                <p className="font-mono text-sm text-neutral-900">{ribInfo.swift}</p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => copyToClipboard(ribInfo.swift, 'swift')}
                                className="ml-3 p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                              >
                                {copiedField === 'swift' ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* QR Code */}
                      <div className="flex flex-col items-center">
                        <h4 className="font-medium text-neutral-900 mb-6">QR Code pour paiement mobile</h4>
                        <div className="bg-white rounded-2xl p-6 border border-neutral-200 mb-4">
                          <div className="w-48 h-48 bg-neutral-100 rounded-xl flex items-center justify-center">
                            <QrCode className="w-32 h-32 text-neutral-400" />
                          </div>
                        </div>
                        <p className="text-sm text-neutral-600 text-center max-w-xs">
                          Scannez ce QR code avec votre application bancaire mobile pour effectuer le virement
                        </p>
                      </div>
                    </div>

                    {/* Payment Confirmation */}
                    <div className="mt-8 pt-6 border-t border-neutral-200">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentInfo.paymentConfirmed}
                          onChange={e => handlePaymentChange("paymentConfirmed", e.target.checked)}
                          className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900"
                          id="paymentConfirmed"
                        />
                        <span className="text-sm text-neutral-700">
                          J'ai effectué le virement bancaire et je confirme le paiement
                        </span>
                      </label>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Important :</strong> Votre réservation sera confirmée une fois le paiement reçu et vérifié par notre équipe. 
                        Vous recevrez une confirmation par email dans les 24h suivant la réception du virement.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div variants={item} className="text-center pt-8">
                <motion.button
                  onClick={handleSubmit}
                  disabled={formStatus.status === "loading" || (paymentInfo.method === "direct" && !paymentInfo.paymentConfirmed)}
                  whileHover={{ y: formStatus.status === "loading" ? 0 : -2 }}
                  whileTap={{ scale: formStatus.status === "loading" ? 1 : 0.98 }}
                  className={`inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-2xl font-light transition-all duration-300 hover:bg-neutral-800 ${
                    formStatus.status === "loading" || (paymentInfo.method === "direct" && !paymentInfo.paymentConfirmed)
                      ? "opacity-70 cursor-not-allowed" 
                      : ""
                  }`}
                >
                  {formStatus.status === "loading" 
                    ? "Envoi en cours..." 
                    : paymentInfo.method === "direct" 
                      ? "Confirmer la réservation avec paiement"
                      : "Demander une consultation gratuite"
                  }
                  {formStatus.status !== "loading" && (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </motion.button>
                <p className="text-neutral-400 text-sm mt-4">
                  {paymentInfo.method === "direct" 
                    ? "Votre réservation sera confirmée après vérification du paiement"
                    : "Notre équipe vous contactera dans les 24h"
                  }
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}