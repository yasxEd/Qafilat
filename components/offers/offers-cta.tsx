import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

export default function OffersCTA() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vous ne trouvez pas l'offre qui vous convient ?
            </h2>
            <p className="text-gray-300 mb-8">
              Contactez-nous pour une offre personnalisée adaptée à vos besoins spécifiques. Notre équipe est à votre
              disposition pour créer le voyage spirituel parfait pour vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  <Phone className="mr-2 h-4 w-4" />
                  Nous contacter
                </Button>
              </Link>
              <Link href="mailto:contact@qafilattayba.com">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Mail className="mr-2 h-4 w-4" />
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
