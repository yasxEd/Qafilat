"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Mail, Clock, Calendar, Facebook, Instagram, Youtube, ExternalLink } from "lucide-react"

export default function ContactDetails() {
  const [activeDay, setActiveDay] = useState<string | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  // Get current day to highlight by default
  const today = new Date().getDay() // 0 is Sunday, 1 is Monday, etc.
  const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
  const currentDay = daysOfWeek[today]

  // Set current day as active by default
  useEffect(() => {
    setActiveDay(currentDay)
  }, [currentDay])

  const businessHours = [
    { day: "Lundi", hours: "9:00 AM - 7:00 PM", isOpen: true },
    { day: "Mardi", hours: "9:00 AM - 7:00 PM", isOpen: true },
    { day: "Mercredi", hours: "9:00 AM - 7:00 PM", isOpen: true },
    { day: "Jeudi", hours: "9:00 AM - 7:00 PM", isOpen: true },
    { day: "Vendredi", hours: "9:00 AM - 7:00 PM", isOpen: true },
    { day: "Samedi", hours: "9:00 AM - 12:00 PM", isOpen: true },
    { day: "Dimanche", hours: "FERMÉ", isOpen: false },
  ]

  const contactInfo = [
    {
      title: "Marrakech",
      icon: MapPin,
      content: "Bureau N° 1 mosquee Khaled Bnou Alwalid lot assanawbar, Marrakech",
      action: {
        text: "+212 524335508",
        url: "tel:+212524335508",
      },
    },
    {
      title: "Casablanca",
      icon: MapPin,
      content: "Adresse de l'agence à Casablanca",
      action: {
        text: "+212 522524337",
        url: "tel:+212522524337",
      },
    },
    {
      title: "Rabat",
      icon: MapPin,
      content: "Adresse de l'agence à Rabat",
      action: {
        text: "+212 537713827",
        url: "tel:+212537713827",
      },
    },
    {
      title: "Email",
      icon: Mail,
      content: "Pour toute demande d'information",
      action: {
        text: "contact@qafilattayba.com",
        url: "mailto:contact@qafilattayba.com",
      },
    },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://web.facebook.com/QafilatTayba/",
      hoverColor: "#1877F2",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/qafilat.tayba/",
      hoverColor: "#E4405F",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@Qafilattayba",
      hoverColor: "#FF0000",
    },
  ]

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Contactez-Nous</h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-4"></div>
          <p className="max-w-3xl mx-auto text-gray-600">
            Plusieurs façons de nous contacter. Choisissez celle qui vous convient le mieux.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Contact Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md h-full flex flex-col">
              <div className="p-4 bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-[#FFD700]" />
                  Nos Coordonnées
                </h3>
              </div>

              <div className="p-4 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-start">
                        <div className="w-9 h-9 rounded-full bg-[#FFD700]/10 flex items-center justify-center mr-3 group-hover:bg-[#FFD700]/20 transition-colors">
                          <item.icon className="h-4 w-4 text-[#FFD700]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-600 mb-1.5">{item.content}</p>
                          <a
                            href={item.action.url}
                            className="text-xs font-medium text-[#FFD700] hover:underline flex items-center"
                          >
                            {item.action.text}
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Media Links with hover effects like in footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6 pt-4 border-t border-gray-100"
                >
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Suivez-nous sur les réseaux sociaux</h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300"
                        onMouseEnter={() => setHoveredSocial(social.name)}
                        onMouseLeave={() => setHoveredSocial(null)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.name}
                      >
                        <social.icon
                          size={16}
                          className={`transition-colors duration-300 ${
                            hoveredSocial === social.name ? "text-black" : "text-gray-600"
                          }`}
                        />
                        <AnimatePresence>
                          {hoveredSocial === social.name && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute inset-0 rounded-full -z-10"
                              style={{ backgroundColor: social.hoverColor }}
                            />
                          )}
                        </AnimatePresence>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right side - Business Hours */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md h-full flex flex-col">
              <div className="p-4 bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[#FFD700]" />
                  Heures d'Ouverture
                </h3>
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-[#FFD700] mr-2" />
                    <span className="text-xs font-medium text-gray-700">Jours de service</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-xs text-gray-500">Ouvert</span>
                    <span className="w-2 h-2 rounded-full bg-red-500 ml-2"></span>
                    <span className="text-xs text-gray-500">Fermé</span>
                  </div>
                </div>

                <div className="space-y-2 flex-grow">
                  {businessHours.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-2.5 rounded-lg flex justify-between items-center cursor-pointer transition-colors ${
                        activeDay === item.day
                          ? "bg-[#FFD700]/10 border border-[#FFD700]/30"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                      onClick={() => setActiveDay(item.day)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${item.isOpen ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                        <span
                          className={`text-sm font-medium ${item.day === currentDay ? "text-[#FFD700]" : "text-gray-800"}`}
                        >
                          {item.day}
                        </span>
                      </div>
                      <span className={`text-xs ${item.isOpen ? "text-gray-600" : "text-red-500"}`}>{item.hours}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 pt-3 border-t border-gray-100 text-center"
                >
                  <p className="text-xs text-gray-500 italic">
                    Les horaires peuvent être modifiés pendant les jours fériés.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
