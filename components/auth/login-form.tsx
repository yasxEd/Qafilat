"use client"

import type React from "react"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Loader2, Lock, Mail, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface LoginFormProps {
  onToggleForm: () => void
}

export default function LoginForm({ onToggleForm }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [isSendingReset, setIsSendingReset] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowForgotPasswordModal(false)
      }
    }

    if (showForgotPasswordModal) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showForgotPasswordModal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      setIsLoading(false)

      if (response.ok) {
        // Save token, etc.
        localStorage.setItem('token', data.token);
        router.push('/client/dashboard');
      } else {
        // Show error message
        alert(data.error || 'Login failed')
      }
    } catch (error) {
      setIsLoading(false)
      alert('An error occurred. Please try again.')
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSendingReset(true)

    try {
      const response = await fetch('http://localhost:5000/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      })

      setIsSendingReset(false)

      if (response.ok) {
        setResetEmailSent(true)
        // Optionally, handle redirect or UI update
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to send reset email')
      }
    } catch (error) {
      setIsSendingReset(false)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl overflow-hidden shadow-lg">
      {/* Left side - Image with overlay */}
      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
        <Image
          src="https://i.pinimg.com/736x/19/cd/e8/19cde86b3a1d327f9db3830792acc983.jpg"
          alt="Kaaba in Mecca"
          fill
          className="object-cover"
        />
        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Nouveau Pèlerin?</h2>
          <p className="text-center mb-6 text-white/80">
            Créez un compte pour réserver votre voyage sacré et accéder à des offres exclusives.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleForm}
            className="px-6 py-2.5 bg-[#FFD700] text-black font-medium rounded-md hover:bg-[#E6C200] transition-colors"
          >
            Créer un Compte
          </motion.button>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="p-6 md:p-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bienvenue</h1>
            <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-sm text-[#FFD700] hover:text-[#E6C200]"
                >
                  Mot de passe oublié?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FFD700] hover:bg-[#E6C200] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700] transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Se Connecter <ArrowRight size={16} className="ml-2" />
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

            {/* Google login button */}
            <button
              type="button"
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

          {/* Mobile toggle to signup */}
          <div className="mt-8 text-center md:hidden">
            <p className="text-sm text-gray-600">
              Nouveau pèlerin?{" "}
              <button onClick={onToggleForm} className="text-[#FFD700] hover:text-[#E6C200] font-medium">
                Créer un compte
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => !resetEmailSent && setShowForgotPasswordModal(false)}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/5">
                <h2 className="text-xl font-bold text-gray-900">Réinitialisation du mot de passe</h2>
                <button
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {resetEmailSent ? (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Email envoyé</h3>
                    <p className="text-gray-600 mb-4">
                      Un lien de réinitialisation a été envoyé à votre adresse email. Veuillez vérifier votre boîte de
                      réception.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="h-6 w-6 text-[#FFD700]" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Mot de passe oublié?</h3>
                      <p className="text-gray-600">
                        Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                      </p>
                    </div>

                    <form onSubmit={handleForgotPassword}>
                      <div className="mb-4">
                        <label htmlFor="forgotPasswordEmail" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-400" />
                          </div>
                          <input
                            id="forgotPasswordEmail"
                            name="forgotPasswordEmail"
                            type="email"
                            required
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FFD700] focus:border-[#FFD700] sm:text-sm"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setShowForgotPasswordModal(false)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors text-sm font-medium"
                        >
                          Annuler
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={isSendingReset || !forgotPasswordEmail}
                          className={`px-4 py-2 ${
                            forgotPasswordEmail ? "bg-[#FFD700] hover:bg-[#E6C200]" : "bg-gray-200 cursor-not-allowed"
                          } text-black rounded-md transition-colors text-sm font-medium flex items-center`}
                        >
                          {isSendingReset ? (
                            <Loader2 size={16} className="animate-spin mr-2" />
                          ) : (
                            <>
                              Envoyer le lien
                              <ArrowRight size={16} className="ml-2" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
