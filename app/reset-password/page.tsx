"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Check, X, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [isTokenChecking, setIsTokenChecking] = useState(true)
  const [resetSuccess, setResetSuccess] = useState(false)

  // Simulate token validation
  useEffect(() => {
    // In a real app, you would validate the token with your backend
    const validateToken = async () => {
      setIsTokenChecking(true)

      // Simulate API call delay
      setTimeout(() => {
        // For demo purposes, consider any token that's at least 6 chars as valid
        const valid = !!(token && token.length >= 6)
        setIsTokenValid(valid)
        setIsTokenChecking(false)
      }, 1000)
    }

    validateToken()
  }, [token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false)
      setResetSuccess(true)

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }, 1500)
  }

  // Show loading state while checking token
  if (isTokenChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
            <Lock className="h-8 w-8 text-[#FFD700]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Vérification du lien</h1>
          <p className="text-gray-600 mb-4">
            Veuillez patienter pendant que nous vérifions votre lien de réinitialisation...
          </p>
          <div className="w-8 h-8 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  // Show error if token is invalid
  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <X className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Lien invalide ou expiré</h1>
          <p className="text-gray-600 mb-6">
            Le lien de réinitialisation que vous avez utilisé est invalide ou a expiré. Veuillez demander un nouveau
            lien.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 bg-[#FFD700] text-black rounded-md hover:bg-[#E6C200] transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Retour à la connexion
          </Link>
        </div>
      </div>
    )
  }

  // Show success message after password reset
  if (resetSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mot de passe réinitialisé</h1>
          <p className="text-gray-600 mb-6">
            Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.
          </p>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#FFD700]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
            />
          </div>
        </div>
      </div>
    )
  }

  // Main reset password form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Left side - Form */}
        <div className="p-6 md:p-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-[#FFD700]" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Réinitialisation du mot de passe</h1>
              <p className="text-gray-600 mt-2">Veuillez créer un nouveau mot de passe</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password field */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
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

              {/* Password requirements */}
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-xs font-medium text-gray-700 mb-2">Le mot de passe doit contenir :</p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${formData.password.length >= 8 ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    Au moins 8 caractères
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${/[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    Une lettre majuscule
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${/[0-9]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    Un chiffre
                  </li>
                  <li className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${/[^A-Za-z0-9]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    Un caractère spécial
                  </li>
                </ul>
              </div>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading || !passwordMatch || formData.password.length < 8}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FFD700] hover:bg-[#E6C200] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700] transition-colors ${
                  isLoading || !passwordMatch || formData.password.length < 8 ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Réinitialiser le mot de passe <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </motion.button>

              <div className="text-center mt-4">
                <Link href="/login" className="text-sm text-gray-600 hover:text-[#FFD700]">
                  Retour à la connexion
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Image with overlay */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
          <Image
            src="https://i.pinimg.com/736x/19/cd/e8/19cde86b3a1d327f9db3830792acc983.jpg"
            alt="Kaaba in Mecca"
            fill
            className="object-cover"
          />
          <div className="relative z-20 flex flex-col justify-center items-center h-full text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Sécurisez Votre Compte</h2>
            <p className="text-center mb-6 text-white/80">
              Créez un mot de passe fort pour protéger votre compte et vos informations personnelles.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
