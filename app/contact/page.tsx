import dynamic from "next/dynamic"
import type { Metadata } from "next"
import ContactHero from "@/components/contact/contact-hero"
import ContactForm from "@/components/contact/contact-form"
import ContactDetails from "@/components/contact/contact-details"
import ContactMaps from "@/components/contact/contact-maps"

// Use dynamic imports for header and footer
const Header = dynamic(() => import("@/components/header"))
const Footer = dynamic(() => import("@/components/footer"))
const FloatingContact = dynamic(() => import("@/components/floating-contact"))

export const metadata: Metadata = {
  title: "Contactez-Nous | Qafilat Tayba",
  description:
    "Contactez Qafilat Tayba pour toutes vos questions concernant les voyages de Hajj et Omra. Nos équipes sont à votre disposition pour vous aider dans vos démarches.",
  keywords: "contact, hajj, omra, qafilat tayba, marrakech, casablanca, rabat, pèlerinage",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactHero />
      <ContactDetails />
      <ContactForm />
      <ContactMaps />
      <Footer />
      <FloatingContact />
    </main>
  )
}
