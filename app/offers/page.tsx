import dynamic from "next/dynamic"
import type { Metadata } from "next"
import OffersHero from "@/components/offers/offers-hero"
import OffersList from "@/components/offers/offers-list"
import OffersCTA from "@/components/offers/offers-cta"

// Use dynamic imports for header and footer
const Header = dynamic(() => import("@/components/header"))
const Footer = dynamic(() => import("@/components/footer"))
const FloatingContact = dynamic(() => import("@/components/floating-contact"))

export const metadata: Metadata = {
  title: "Nos Offres Premium | Qafilat Tayba",
  description:
    "Découvrez nos offres exclusives de voyages pour le Hajj et l'Omra. Des forfaits premium adaptés à tous les budgets avec un service d'exception pour un pèlerinage serein.",
  keywords: "offres premium, hajj, omra, qafilat tayba, voyage luxe, pèlerinage, forfaits exclusifs, makkah, médine, maroc",
}

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <Header />
      <OffersHero />
      <OffersList />
      <OffersCTA />
      <Footer />
      <FloatingContact />
    </main>
  )
}
