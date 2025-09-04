import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

export default function OffersCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <div className="container mx-auto px-8">
        <div className="bg-black rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden">
          
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Vous ne trouvez pas l'offre qui vous convient ?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-4 rounded-2xl font-light text-base transition-all duration-300 hover:scale-105">
                  <Phone className="mr-3 h-5 w-5" />
                  Nous contacter
                </Button>
              </Link>
              <Link href="mailto:contact@qafilattayba.com">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white px-8 py-4 rounded-2xl font-light text-base transition-all duration-300"
                >
                  <Mail className="mr-3 h-5 w-5" />
                  Envoyer un email
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
