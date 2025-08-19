"use client"

import type React from "react"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Check, ChevronDown, Lock, Mail, MapPin, User, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"


interface SignupFormProps {
  onToggleForm: () => void
}

export default function SignupForm({ onToggleForm }: SignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [showGoogleCityModal, setShowGoogleCityModal] = useState(false)
  const [googleCitySelection, setGoogleCitySelection] = useState("")
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false)
  const [googleCityDropdownOpen, setGoogleCityDropdownOpen] = useState(false)
  const [cityDropdownRef, setCityDropdownRef] = useState<React.RefObject<HTMLDivElement>>(useRef(null))
  const [googleCityDropdownRef, setGoogleCityDropdownRef] = useState<React.RefObject<HTMLDivElement>>(useRef(null))

  // Moroccan cities
  const cities = [
    { value: "casablanca", label: "Casablanca" },
    { value: "rabat", label: "Rabat" },
    { value: "marrakech", label: "Marrakech" },
    { value: "tanger", label: "Tanger" },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false)
      }
      if (googleCityDropdownRef.current && !googleCityDropdownRef.current.contains(event.target as Node)) {
        setGoogleCityDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Check password strength
    if (name === "password") {
      let strength = 0
      if (value.length >= 8) strength += 1
      if (/[A-Z]/.test(value)) strength += 1
      if (/[0-9]/.test(value)) strength += 1
      if (/[^A-Za-z0-9]/.test(value)) strength += 1
      setPasswordStrength(strength)
    }

    // Check if passwords match
    if (name === "confirmPassword" || name === "password") {
      if (name === "confirmPassword") {
        setPasswordMatch(value === formData.password)
      } else {
        setPasswordMatch(value === formData.confirmPassword || formData.confirmPassword === "")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false)
      return
    }

    setIsLoading(true)

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        city: formData.city,
        registrationDate: new Date().toISOString(),
      }

      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      setIsLoading(false)

      if (response.ok) {
        // Reset form data
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          city: "",
        })

        // Redirect or show success message
        window.location.href = "/client/dashboard"
      } else {
        alert(data.error || "Erreur lors de l'inscription")
      }
    } catch (error: any) {
      setIsLoading(false)
      alert(error.message || "Erreur lors de l'inscription")
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl overflow-hidden shadow-lg">
      {/* Left side - Signup form */}
      <div className="p-6 md:p-8 order-2 md:order-1">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Créer un Compte</h1>
            <p className="text-gray-600 mt-2">Rejoignez-nous pour votre voyage spirituel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name field */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nom Complet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm"
                  placeholder="Votre nom complet"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* City field */}
            <div className="space-y-1.5">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Ville de Départ
              </label>
              <div className="relative" ref={cityDropdownRef}>
                <button
                  type="button"
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  className="w-full p-2.5 flex justify-between items-center border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all"
                >
                  <span className={formData.city ? "text-gray-900" : "text-gray-500"}>
                    {formData.city
                      ? cities.find((city) => city.value === formData.city)?.label
                      : "Sélectionnez votre ville"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${cityDropdownOpen ? "transform rotate-180" : ""}`}
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
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1"
                    >
                      {cities.map((city) => (
                        <div
                          key={city.value}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                            formData.city === city.value ? "bg-[#FFD700]/10 font-medium" : ""
                          }`}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, city: city.value }))
                            setCityDropdownOpen(false)
                          }}
                        >
                          {city.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm"
                  placeholder="••••••••"
                />
              </div>

              {/* Password strength indicator */}
              <div className="mt-0.5">
                <div className="flex space-x-1 mb-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < passwordStrength
                          ? passwordStrength === 1
                            ? "bg-red-400"
                            : passwordStrength === 2
                              ? "bg-orange-400"
                              : passwordStrength === 3
                                ? "bg-yellow-400"
                                : "bg-green-400"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {passwordStrength === 0 && "Très faible"}
                  {passwordStrength === 1 && "Faible"}
                  {passwordStrength === 2 && "Moyen"}
                  {passwordStrength === 3 && "Fort"}
                  {passwordStrength === 4 && "Très fort"}
                </p>
              </div>
            </div>

            {/* Confirm Password field */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    !passwordMatch && formData.confirmPassword ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              {!passwordMatch && formData.confirmPassword && (
                <p className="text-xs text-red-500 flex items-center mt-0.5">
                  <X size={12} className="mr-1" /> Les mots de passe ne correspondent pas
                </p>
              )}
              {passwordMatch && formData.confirmPassword && (
                <p className="text-xs text-green-500 flex items-center mt-0.5">
                  <Check size={12} className="mr-1" /> Les mots de passe correspondent
                </p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || !passwordMatch}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FFD700] hover:bg-[#E6C200] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700] transition-colors ${
                isLoading || !passwordMatch ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  S'inscrire <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
              </div>
            </div>

            {/* Google signup button */}
            <button
              type="button"
              onClick={() => setShowGoogleCityModal(true)}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700]"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continuer avec Google
            </button>
          </form>

          {/* Mobile toggle to login */}
          <div className="mt-8 text-center md:hidden">
            <p className="text-sm text-gray-600">
              Déjà un compte?{" "}
              <button onClick={onToggleForm} className="text-[#FFD700] hover:text-[#E6C200] font-medium">
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>

      {showGoogleCityModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowGoogleCityModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/5">
              <h2 className="text-xl font-bold text-gray-900">Sélectionnez votre ville de départ</h2>
              <button
                onClick={() => setShowGoogleCityModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-[#FFD700]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Ville de départ</h3>
              <p className="text-gray-600 mb-4">Veuillez sélectionner votre ville de départ pour continuer.</p>

              <div className="mb-6">
                <div className="grid grid-cols-2 gap-2">
                  {cities.map((city) => (
                    <div
                      key={city.value}
                      onClick={() => setGoogleCitySelection(city.value)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        googleCitySelection === city.value
                          ? "border-[#FFD700] bg-[#FFD700]/10 font-medium"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                            googleCitySelection === city.value ? "border-[#FFD700]" : "border-gray-400"
                          }`}
                        >
                          {googleCitySelection === city.value && (
                            <div className="w-2 h-2 rounded-full bg-[#FFD700]"></div>
                          )}
                        </div>
                        <span>{city.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowGoogleCityModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors text-sm font-medium"
                >
                  Annuler
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (googleCitySelection) {
                      // In a real implementation, you would save the user data with the selected city
                      console.log("Selected city:", googleCitySelection)
                      // Redirect to homepage
                      window.location.href = "/"
                    } else {
                      alert("Veuillez sélectionner une ville")
                    }
                  }}
                  disabled={!googleCitySelection}
                  className={`px-4 py-2 ${
                    googleCitySelection ? "bg-[#FFD700] hover:bg-[#E6C200]" : "bg-gray-200 cursor-not-allowed"
                  } text-black rounded-md transition-colors text-sm font-medium flex items-center`}
                >
                  Continuer
                  <ArrowRight size={16} className="ml-2" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Right side - Image with overlay */}
      <div className="relative hidden md:block order-1 md:order-2">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
        <Image
          src="https://i.pinimg.com/736x/19/cd/e8/19cde86b3a1d327f9db3830792acc983.jpg"
          alt="Pilgrims at Hajj"
          fill
          className="object-cover"
        />
        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Déjà Inscrit?</h2>
          <p className="text-center mb-6 text-white/80">
            Connectez-vous à votre compte pour gérer vos réservations et accéder à votre espace personnel.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleForm}
            className="px-6 py-2.5 bg-[#FFD700] text-black font-medium rounded-md hover:bg-[#E6C200] transition-colors"
          >
            Se Connecter
          </motion.button>
        </div>
      </div>
    </div>
  )
}
