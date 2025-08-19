import dynamic from "next/dynamic"
import type { Metadata } from "next"
import AboutHero from "@/components/about/about-hero"
import AboutOverview from "@/components/about/about-overview"
import AboutHistory from "@/components/about/about-history"
import AboutStats from "@/components/about/about-stats"
import AboutCTA from "@/components/about/about-cta"

// Use dynamic imports for header and footer
const Header = dynamic(() => import("@/components/header"))
const Footer = dynamic(() => import("@/components/footer"))
const FloatingContact = dynamic(() => import("@/components/floating-contact"))

export const metadata: Metadata = {
  title: "À Propos | Qafilat Tayba",
  description:
    "Découvrez Qafilat Tayba, votre partenaire de confiance pour les voyages de Hajj et Omra depuis 1995. Une agence expérimentée avec plus de 17 000 pèlerins satisfaits.",
  keywords: "à propos, hajj, omra, qafilat tayba, histoire, agence de voyage, pèlerinage, maroc",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <AboutOverview />
      <AboutHistory />
      <AboutStats />
      <AboutCTA />
      <Footer />
      <FloatingContact />
    </main>
  )
}
