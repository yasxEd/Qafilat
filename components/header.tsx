"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ChevronDown, ChevronRight, Facebook, Instagram, Mail, MapPin, Menu, X, Youtube, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function Header() {
  const pathname = usePathname()
  const isLoginPage = pathname ? pathname === "/login" : false
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Scroll detection
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  })

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Toggle body scroll when mobile menu is open/closed
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Update the navigation items to French
  const navItems = [
    { name: "Accueil", href: "/" },
    { name: "À Propos", href: "/about" },
    {
      name: "Nos Offres",
      href: "/offers",
      hasDropdown: true,
      dropdownItems: [
        { name: "Forfaits Hajj", href: "/offers/hajj" },
        { name: "Forfaits Omra", href: "/offers/omra" },
        { name: "Voyages Loisirs", href: "/offers/leisure" },
        { name: "Réservations Hôtel", href: "/offers/hotel" },
        { name: "Billets d'Avion", href: "/offers/flight" },
      ],
    },
    { name: "Contactez-nous", href: "/contact" },
  ]

  // Social media links
  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://web.facebook.com/QafilatTayba/", color: "#1877F2" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/qafilat.tayba/", color: "#E4405F" },
    { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@Qafilattayba", color: "#FF0000" },
  ]

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    setIsLoggedIn(!!token)
  }, [])

  return (
    <>
      {/* Premium Minimalist Top Bar - Non-sticky */}
      <div className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left side - Phone numbers */}
          <div className="flex items-center space-x-8">
            {[
              { city: "Marrakech", phone: "+212524335508" },
              { city: "Casa", phone: "+212522524337" },
              { city: "Rabat", phone: "+212537713827" }
            ].map((contact, index) => (
              <div key={contact.city} className="group">
                <div className="flex items-center space-x-2">
                  {/* Add yellow dot before Marrakech */}
                  {contact.city === "Marrakech" && (
                    <div className="w-1 h-1 rounded-full bg-[#FFD700] opacity-60 mr-2"></div>
                  )}
                  <span className="text-xs font-light text-white/70 uppercase tracking-widest">{contact.city}</span>
                  <div className="w-px h-3 bg-white/20"></div>
                  <a 
                    href={`tel:${contact.phone}`} 
                    className="text-sm font-light text-white hover:text-[#FFD700] transition-colors duration-300 tracking-wide"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Email */}
          <div className="group">
            <a 
              href="mailto:contact@qafilattayba.com" 
              className="flex items-center space-x-3 text-white hover:text-[#FFD700] transition-colors duration-300"
            >
              <span className="text-sm font-light tracking-wide">contact@qafilattayba.com</span>
              <div className="w-1 h-1 rounded-full bg-[#FFD700] opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
        
        {/* Enhanced separator line */}
        <div className="mt-4 mx-auto max-w-5xl h-px bg-gradient-to-r from-transparent via-white/60 to-transparent shadow-sm"></div>
      </div>

      {/* Main Header */}
      <motion.header
        ref={headerRef}
        // Move navbar slightly further down
        animate={{
          top: visible || isLoginPage ? 32 : 60,
        }}
        initial={false}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 40,
        }}
        className="fixed left-0 right-0 z-40 w-full"
        style={{ marginTop: "0px" }}
      >
        {/* Desktop Navigation */}
        <div className={cn(
          "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start px-4 py-2 lg:flex",
          "bg-transparent"
        )}>
          {/* Logo replaced with hero-logo.png */}
          <Link
            href="/"
            className="relative z-20 mr-4 flex items-center px-0 py-0"
          >
            <Image
              src="/hero-logo.png"
              alt="Logo"
              width={100}
              height={100}
              className={visible || isLoginPage ? "brightness-75" : ""}
              priority
            />
          </Link>

          {/* Nav Items - Only this section gets pill styling */}
          <motion.div
            onMouseLeave={() => setHovered(null)}
            animate={{
              backdropFilter: visible || isLoginPage ? "blur(10px)" : "none",
              boxShadow:
                visible || isLoginPage
                  ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                  : "none",
              borderRadius: visible || isLoginPage ? "2rem" : "0rem",
              backgroundColor: visible || isLoginPage ? "#FFFFFF" : "transparent",
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 50,
            }}
            className={cn(
              "flex flex-row items-center justify-center space-x-2 text-sm font-medium px-4 py-2",
              visible || isLoginPage ? "bg-white/80 shadow-lg" : "bg-transparent"
            )}
          >
            {navItems.map((item, idx) => (
              <div key={`nav-item-${idx}`} className="relative">
                {item.hasDropdown ? (
                  <div className="relative group">
                    <a
                      onMouseEnter={() => setHovered(idx)}
                      className={`relative flex items-center px-4 py-2 ${
                        visible || isLoginPage ? "text-neutral-600" : "text-white"
                      } ${pathname && pathname === item.href ? "font-semibold" : ""}`}
                      href={item.href}
                    >
                      {hovered === idx && (
                        <motion.div
                          layoutId="hovered"
                          className="absolute inset-0 h-full w-full rounded-full bg-[#FFD700]/10"
                        />
                      )}
                      <span className="relative z-20">{item.name}</span>
                      <ChevronDown size={16} className="ml-1 relative z-20" />
                    </a>

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-white/95 backdrop-blur-md rounded-md shadow-xl overflow-hidden z-20 border border-gray-100">
                        <div className="py-1">
                          {item.dropdownItems?.map((dropdownItem, idx) => (
                            <Link
                              key={idx}
                              href={dropdownItem.href}
                              className={`block px-4 py-3 text-sm text-gray-800 hover:bg-[#FFD700] hover:text-black transition-colors ${
                                pathname && pathname === dropdownItem.href ? "bg-[#FFD700]/20" : ""
                              }`}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    onMouseEnter={() => setHovered(idx)}
                    className={`relative px-4 py-2 ${
                      visible || isLoginPage ? "text-neutral-600" : "text-white"
                    } ${pathname && pathname === item.href ? "font-semibold" : ""}`}
                    href={item.href}
                  >
                    {hovered === idx && (
                      <motion.div
                        layoutId="hovered"
                        className="absolute inset-0 h-full w-full rounded-full bg-[#FFD700]/10"
                      />
                    )}
                    <span className="relative z-20">{item.name}</span>
                  </a>
                )}
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          {isLoggedIn ? (
            <Link
              href="/client/dashboard"
              className="px-4 py-2 rounded-md bg-[#FFD700] shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200"
            >
              Mon Compte
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-3 rounded-full bg-[#FFD700] shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200"
            >
              Pré-inscription
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <motion.div
          animate={{
            backdropFilter: visible || isLoginPage ? "blur(10px)" : "none",
            boxShadow:
              visible || isLoginPage
                ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                : "none",
            width: visible || isLoginPage ? "90%" : "100%",
            paddingRight: visible || isLoginPage ? "12px" : "16px",
            paddingLeft: visible || isLoginPage ? "12px" : "16px",
            borderRadius: visible || isLoginPage ? "2rem" : "0rem", // pill shape when visible
            y: visible || isLoginPage ? 0 : 20, // Animate upwards when visible
            backgroundColor: visible || isLoginPage ? "#FFFFFF" : "transparent",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 50,
          }}
          className={cn(
            "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-2 lg:hidden",
            visible || isLoginPage ? "bg-white/80 shadow-lg" : "bg-transparent",
          )}
        >
          <div className="flex w-full flex-row items-center justify-between">
            {/* Mobile Logo replaced with hero-logo.png */}
            <Link
              href="/"
              className="flex items-center"
            >
              <Image
                src="/hero-logo.png"
                alt="Logo"
                width={24}
                height={24}
                className={visible || isLoginPage ? "brightness-75" : ""}
                priority
              />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`p-2 rounded-full ${visible || isLoginPage ? "text-black" : "text-white"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Semi-transparent overlay */}
                <motion.div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                />

                {/* Mobile menu panel */}
                <motion.div
                  ref={menuRef}
                  className="absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Navigation Links */}
                  <div className="w-full space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                        className="w-full"
                      >
                        {item.hasDropdown ? (
                          <div className="mb-1">
                            <button
                              onClick={() => toggleDropdown(item.name)}
                              className={`w-full flex items-center justify-between py-3 px-4 rounded-lg font-medium text-base transition-all ${
                                activeDropdown === item.name
                                  ? "bg-[#FFD700]/10 text-black"
                                  : "text-gray-800 hover:bg-gray-50"
                              }`}
                            >
                              <span>{item.name}</span>
                              <ChevronDown
                                size={18}
                                className={`text-gray-400 transition-transform duration-300 ${
                                  activeDropdown === item.name ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Dropdown items with animation */}
                            <AnimatePresence>
                              {activeDropdown === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-200 space-y-1">
                                    {item.dropdownItems?.map((dropdownItem, idx) => (
                                      <motion.div
                                        key={dropdownItem.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 * idx, duration: 0.2 }}
                                      >
                                        <Link
                                          href={dropdownItem.href}
                                          className={`block py-2 px-3 rounded-md text-sm transition-colors ${
                                            pathname && pathname === dropdownItem.href
                                              ? "text-black font-medium"
                                              : "text-gray-600 hover:text-gray-900"
                                          }`}
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          <div className="flex items-center">
                                            <ChevronRight size={14} className="mr-2 text-gray-400" />
                                            <span>{dropdownItem.name}</span>
                                          </div>
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={`flex items-center py-3 px-4 rounded-lg font-medium text-base transition-all ${
                              pathname && pathname === item.href
                                ? "bg-gray-100 text-black"
                                : "text-gray-800 hover:bg-gray-50"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span>{item.name}</span>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Contact information */}
                  <div className="w-full mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start mb-4">
                      <MapPin size={16} className="text-gray-400 mt-1 mr-2" />
                      <p className="text-sm text-gray-600">
                        Bureau N° 1 mosquee Khaled Bnou Alwalid lot assanawbar, Marrakech
                      </p>
                    </div>
                    <a
                      href="mailto:contact@qafilattayba.com"
                      className="flex items-center mb-6 text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      <Mail size={16} className="text-gray-400 mr-2" />
                      contact@qafilattayba.com
                    </a>

                    {/* CTA Button */}
                    {isLoggedIn ? (
                      <Link
                        href="/client/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full py-3 px-4 bg-[#FFD700] text-black text-center rounded-md font-medium hover:-translate-y-0.5 transition duration-200"
                      >
                        Mon Compte
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full py-3 px-4 bg-[#FFD700] text-black text-center rounded-full font-medium hover:-translate-y-0.5 transition duration-200"
                      >
                        Pré-inscription
                      </Link>
                    )}

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 mt-6">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300"
                          whileHover={{
                            backgroundColor: social.color,
                            color: "white",
                            scale: 1.1,
                          }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.name}
                        >
                          <social.icon size={18} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>
    </>
  )
}