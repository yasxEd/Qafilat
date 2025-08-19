"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  const phoneNumbers = [
    { city: "Marrakech", number: "+212524335508" },
    { city: "Casa", number: "+212522524337" },
    { city: "Rabat", number: "+212537713827" },
  ]

  // Close menu when scrolling
  useEffect(() => {
    if (!isOpen) return // Only add listener if menu is open

    const handleScroll = () => setIsOpen(false)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen])

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return // Only add listener if menu is open

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <div className="fixed bottom-8 left-8 z-40" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl p-4 w-48 mb-2"
          >
            <div className="flex flex-col space-y-3">
              {phoneNumbers.map((item, index) => (
                <motion.a
                  key={index}
                  href={`tel:${item.number}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="flex items-center p-2 hover:bg-gray-50 rounded-md group transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200">
                    <Phone size={14} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{item.city}</p>
                    <p className="text-sm font-medium text-gray-800">{item.number}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Decorative triangle */}
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {!isOpen && showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-14 left-0 bg-gradient-to-r from-[#FFD700] to-[#FFC107] text-black text-xs font-medium py-2 px-4 rounded-md shadow-lg whitespace-nowrap"
            >
              Contactez-nous
              <div className="absolute -bottom-1 left-7 w-2 h-2 bg-[#FFD700] rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`phone-bounce-button w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-gray-800" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isOpen ? <X size={24} className="text-white" /> : <Phone size={24} className="text-white" />}
        </button>
      </div>
    </div>
  )
}
