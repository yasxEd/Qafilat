import dynamic from "next/dynamic"
import type { Metadata } from "next"
import FaqHero from "@/components/faq/faq-hero"
import FaqCategories from "@/components/faq/faq-categories"
import FaqAccordion from "@/components/faq/faq-accordion"
import FaqCTA from "@/components/faq/faq-cta"

// Use dynamic imports for header and footer
const Header = dynamic(() => import("@/components/header"))
const Footer = dynamic(() => import("@/components/footer"))
const FloatingContact = dynamic(() => import("@/components/floating-contact"))

export const metadata: Metadata = {
  title: "FAQ | Qafilat Tayba",
  description:
    "Trouvez des réponses à toutes vos questions concernant les voyages de Hajj et Omra avec Qafilat Tayba. Informations pratiques, préparation, et plus encore.",
  keywords: "faq, questions fréquentes, hajj, omra, qafilat tayba, pèlerinage, préparation, voyage, maroc",
}

export default function FaqPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <FaqHero />
      <FaqCategories />
      <FaqAccordion />
      <FaqCTA />
      <Footer />
      <FloatingContact />
    </main>
  )
}
