import dynamic from "next/dynamic"
import { Suspense } from "react"
import type { Metadata } from "next"
import SearchResults from "@/components/search/search-results"
// Ensure SearchResults is a valid React component that returns JSX

// Use dynamic imports for header and footer
const Header = dynamic(() => import("@/components/header"))
const Footer = dynamic(() => import("@/components/footer"))
const FloatingContact = dynamic(() => import("@/components/floating-contact"))

export const metadata: Metadata = {
  title: "Résultats de recherche | Qafilat Tayba",
  description: "Découvrez nos offres correspondant à vos critères de recherche.",
  keywords: "recherche, offres, hajj, omra, voyages, qafilat tayba",
}

// Loading component for search results
function SearchResultsLoading() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <div className="space-y-4 animate-pulse">
            <div className="h-12 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-xl w-96 mx-auto"></div>
            <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-64 mx-auto"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse border border-neutral-200/60">
              <div className="h-48 bg-gradient-to-r from-neutral-200 to-neutral-300"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg"></div>
                  <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-lg w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function SearchResultsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <Suspense fallback={<SearchResultsLoading />}>
        <SearchResults />
      </Suspense>
      <Footer />
      <FloatingContact />
    </main>
  )
}
