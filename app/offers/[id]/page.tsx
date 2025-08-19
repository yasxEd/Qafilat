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
  return {
    title: `Offre de Voyage | Qafilat Tayba`,
    description: "Détails de notre offre de voyage. Contactez-nous pour plus d'informations.",
    keywords: "voyage, offre, qafilat tayba, maroc",
  }
}

export default async function OfferPage({ params }: { params: { id: string } }) {
  const offerId = params.id

  return (
    <main className="min-h-screen">
      <Header />
      <OfferHero id={offerId} />
      <OfferDetails id={offerId} />
      <Footer />
      <FloatingContact />
    </main>
  )
}
