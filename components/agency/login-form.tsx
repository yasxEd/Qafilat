"use client"

import type React from "react"

import { motion } from "framer-motion"
import { AlertCircle, ArrowRight, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AgencyLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:5000/api/agencies/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      setIsLoading(false);
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        router.push("/agency/dashboard");
      } else {
        setError(data.error || "Identifiants invalides. Veuillez réessayer.");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Erreur de connexion au serveur. Veuillez réessayer.");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="p-6 md:p-8">
        <div className="text-center mb-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-[#FFD700]/30">
              <img src="/logo.jpg" alt="Qafilat Tayba Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Espace Agence</h1>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte agence</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertCircle size={18} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

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
                placeholder="agency@qafilattayba.com"
              />
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

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-[#FFD700]">
              Retour à l'accueil
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
