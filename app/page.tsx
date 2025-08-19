import dynamic from "next/dynamic"
import Script from "next/script"

// Use dynamic imports with loading priority
const Loader = dynamic(() => import("@/components/loader"))
const Header = dynamic(() => import("@/components/header"))
const HeroSection = dynamic(() => import("@/components/hero-section"))
const AvailabilityContainer = dynamic(() => import("@/components/availability-container"))
const FeaturesSection = dynamic(() => import("@/components/features-section"), {
  loading: () => <div className="h-96 flex items-center justify-center">Chargement...</div>,
})
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"), {
  loading: () => <div className="h-96 flex items-center justify-center">Chargement...</div>,
})
const Footer = dynamic(() => import("@/components/footer"))
const FloatingContact = dynamic(() => import("@/components/floating-contact"))

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Loader />
      <Header />
      <HeroSection />
      <AvailabilityContainer />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
      <FloatingContact />
      {/* Load Swiper JS only when needed */}
      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy="lazyOnload" />
    </main>
  )
}
