"use client"

import { Mail, MapPin, Phone } from "lucide-react"

export default function DirectReservationContact() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Besoin d'aide?</h2>
            <p className="text-gray-600">
              Notre équipe est disponible pour répondre à toutes vos questions concernant votre réservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-[#FFD700]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Téléphone</h3>
              <p className="text-gray-600">+212 522 123 456</p>
              <p className="text-gray-600">+212 661 987 654</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-[#FFD700]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">contact@qafilattayba.com</p>
              <p className="text-gray-600">reservation@qafilattayba.com</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-[#FFD700]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Nos Agences</h3>
              <p className="text-gray-600">Casablanca, Rabat, Marrakech</p>
              <p className="text-gray-600">Lun-Ven: 9h-18h</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">
              Vous préférez nous rencontrer en personne? Visitez l'une de nos agences.
            </p>
            <a href="/contact" className="inline-flex items-center text-[#FFD700] hover:text-[#E6C200] font-medium">
              Voir toutes nos agences
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
