"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, ArrowUp, ExternalLink, Globe } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Social media links with hover animations
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

  // Simplified footer links - just Quick Links
  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "À Propos", href: "/about" },
    { name: "Forfaits Hajj", href: "/offers/hajj" },
    { name: "Forfaits Omra", href: "/offers/umrah" },
    { name: "FAQ", href: "/faq" },
    { name: "Contactez-nous", href: "/contact" },
    { name: "Espace Admin", href: "/admin/login" },
    { name: "Espace Agence", href: "/agency/login" },
  ]

  const contactInfo = [
    {
      icon: Phone,
      title: "Appelez-nous",
      content: (
        <div className="flex flex-col space-y-1">
          <a href="tel:+212524335508" className="hover:text-[#FFD700] transition-colors">
            <span className="inline-block w-20 font-medium">Marrakech</span>: <span>+212 524335508</span>
          </a>
          <a href="tel:+212522524337" className="hover:text-[#FFD700] transition-colors">
            <span className="inline-block w-20 font-medium">Casa</span>: <span>+212 522524337</span>
          </a>
          <a href="tel:+212537713827" className="hover:text-[#FFD700] transition-colors">
            <span className="inline-block w-20 font-medium">Rabat</span>: <span>+212 537713827</span>
          </a>
        </div>
      ),
    },
    {
      icon: Mail,
      title: "Écrivez-nous",
      content: (
        <a href="mailto:contact@qafilattayba.com" className="hover:text-[#FFD700] transition-colors">
          contact@qafilattayba.com
        </a>
      ),
    },
    {
      icon: MapPin,
      title: "Visitez-nous",
      content: (
        <div className="flex flex-col space-y-1 text-xs">
          <div>
            <span className="inline-block w-20 font-medium">Marrakech</span>: Bureau N° 1 mosquee Khaled Bnou Alwalid
            lot assanawbar
          </div>
          <div>
            <span className="inline-block w-20 font-medium">Casablanca</span>: Adresse de l'agence à Casablanca
          </div>
          <div>
            <span className="inline-block w-20 font-medium">Rabat</span>: Adresse de l'agence à Rabat
          </div>
        </div>
      ),
    },
  ]

  return (
    <footer className="bg-black text-white relative">
      {/* Gold accent line at top */}
      <div className="h-1 bg-gradient-to-r from-[#FFD700]/30 via-[#FFD700] to-[#FFD700]/30"></div>

      {/* Main footer content - reduced padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Column 1: Logo and About - reduced margins */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-md overflow-hidden border-2 border-[#FFD700]/30 mr-3">
                  <img src="/logo.jpg" alt="Qafilat Tayba Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Hajj & Umrah</h2>
                  <p className="text-[#FFD700] text-sm">Qafilat Tayba</p>
                </div>
              </div>

              <p className="text-white/70 text-sm leading-relaxed">
                Votre partenaire de confiance pour les voyages de Hajj et Omra depuis 1995. Nous fournissons des
                services complets pour assurer une expérience de pèlerinage spirituellement enrichissante.
              </p>
            </motion.div>

            {/* Social Media Links with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 mt-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300"
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon
                    size={16}
                    className={`transition-colors duration-300 ${
                      hoveredSocial === social.name ? "text-black" : "text-white"
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
            </motion.div>
          </div>

          {/* Column 2: Quick Links - simplified to just one section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base font-bold mb-3 text-white relative">
                Liens Rapides
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#FFD700]"></span>
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link
                      href={link.href}
                      className="text-white/70 inline-block text-sm transition-colors duration-300 hover:text-[#FFD700] relative"
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Column 3: Contact - reduced spacing */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base font-bold mb-3 text-white relative">
                Contactez-nous
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#FFD700]"></span>
              </h3>

              <div className="space-y-2">
                {contactInfo.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * idx }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-lg p-2.5 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-1.5 rounded-md bg-[#FFD700]/10 mr-3">
                        <item.icon size={14} className="text-[#FFD700]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-white/90">{item.title}</h4>
                        <div className="text-xs text-white/70 mt-0.5">{item.content}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom section with copyright - reduced padding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Globe size={14} className="text-[#FFD700] mr-2" />
              <p className="text-white/60 text-xs">&copy; {currentYear} Qafilat Tayba. Tous droits réservés.</p>
            </div>

            <div className="flex items-center">
              <span className="text-white/60 text-xs">Développé et conçu par </span>
              <Link
                href="https://ouz.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD700] hover:text-[#FFD700]/80 text-xs transition-colors flex items-center ml-1 group"
              >
                Ouz.ma
                <ExternalLink size={10} className="ml-1 text-[#FFD700] group-hover:text-[#FFD700]/80" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFC107] text-black flex items-center justify-center shadow-lg z-50"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  )
}
