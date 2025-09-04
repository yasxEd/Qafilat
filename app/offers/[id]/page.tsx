import dynamic from "next/dynamic"
import type { Metadata } from "next"
import OfferHero from "@/components/offers/offer-hero"
import OfferDetails from "@/components/offers/offer-details"

// Use dynamic imports for header and footer
const Header = dynamic(() => import("@/components/header"))
const Footer = dynamic(() => import("@/components/footer"))
const FloatingContact = dynamic(() => import("@/components/floating-contact"))

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const titles = {
    hajj: "Offres Hajj Premium | Qafilat Tayba",
    omra: "Offres Omra Exclusive | Qafilat Tayba", 
    hotel: "Hôtels Premium | Qafilat Tayba",
    flight: "Vols Premium | Qafilat Tayba"
  }

  return {
    title: titles[params.id as keyof typeof titles] || `Offre Premium | Qafilat Tayba`,
    description: "Découvrez notre sélection d'offres premium pour votre pèlerinage. Excellence et sérénité garanties.",
    keywords: "voyage premium, offre exclusive, qafilat tayba, hajj, omra, luxe, maroc",
  }
}

export default async function OfferPage({ params }: { params: { id: string } }) {
  const offerId = params.id

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <Header />
      <OfferHero id={offerId} />
      <OfferDetails id={offerId} />
      <Footer />
      <FloatingContact />
    </main>
  )
}
