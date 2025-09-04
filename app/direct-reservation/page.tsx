import DirectReservationHero from "@/components/direct-reservation/direct-reservation-hero"
import DirectReservationForm from "@/components/direct-reservation/direct-reservation-form"
import Footer from "@/components/footer"
import Header from "@/components/header"
import FloatingContact from "@/components/floating-contact"

export default function DirectReservationPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <DirectReservationHero />
      <DirectReservationForm />
      <Footer />
      <FloatingContact />
    </main>
  )
}
