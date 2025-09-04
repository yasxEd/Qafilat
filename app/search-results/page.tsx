import dynamic from "next/dynamic"
import type { Metadata } from "next"
import SearchResults from "@/components/search/search-results"

// Use dynamic imports for header and footer
const Header = dynamic(() => import("@/components/header"))
const Footer = dynamic(() => import("@/components/footer"))
const FloatingContact = dynamic(() => import("@/components/floating-contact"))

export const metadata: Metadata = {
  title: "Résultats de recherche | Qafilat Tayba",
  description: "Découvrez nos offres correspondant à vos critères de recherche.",
  keywords: "recherche, offres, hajj, omra, voyages, qafilat tayba",
}

export default function SearchResultsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <SearchResults />
      <Footer />
      <FloatingContact />
    </main>
  )
}
