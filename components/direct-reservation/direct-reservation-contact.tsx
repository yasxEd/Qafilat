import { motion } from "framer-motion"
import { Mail, MapPin, Phone, ArrowRight, Clock, CheckCircle } from "lucide-react"

export default function PremiumContactSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Minimal Header */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-1 h-16 bg-neutral-900 mx-auto mb-8"
            />
            <h2 className="text-5xl md:text-6xl font-thin text-neutral-900 mb-4 tracking-[-0.02em]">
              Contact
            </h2>
            <p className="text-lg text-neutral-500 font-light max-w-lg mx-auto">
              Notre équipe vous accompagne dans votre voyage spirituel
            </p>
          </div>

          <motion.div variants={container} initial="hidden" animate="show">
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
              <motion.div variants={item} className="group">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-neutral-100 rounded-full group-hover:scale-110 transition-transform duration-500" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-neutral-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-neutral-900 font-light">+212 522 123 456</p>
                    <p className="text-lg text-neutral-900 font-light">+212 661 987 654</p>
                  </div>
                  <p className="text-sm text-neutral-400 flex items-center justify-center gap-2">
                    <Clock className="w-3 h-3" />
                    24h/7j
                  </p>
                </div>
              </motion.div>

              <motion.div variants={item} className="group">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-neutral-100 rounded-full group-hover:scale-110 transition-transform duration-500" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-neutral-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-neutral-900 font-light">contact@qafilattayba.com</p>
                    <p className="text-lg text-neutral-900 font-light">reservation@qafilattayba.com</p>
                  </div>
                  <p className="text-sm text-neutral-400 flex items-center justify-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    Réponse sous 2h
                  </p>
                </div>
              </motion.div>

              <motion.div variants={item} className="group">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-neutral-100 rounded-full group-hover:scale-110 transition-transform duration-500" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-neutral-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-neutral-900 font-light">Casablanca • Rabat</p>
                    <p className="text-lg text-neutral-900 font-light">Marrakech • Tanger</p>
                  </div>
                  <p className="text-sm text-neutral-400 flex items-center justify-center gap-2">
                    <Clock className="w-3 h-3" />
                    Lun-Ven: 9h-18h
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Separator Line */}
            <motion.div
              variants={item}
              className="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent mb-20"
            />

            {/* Premium CTA */}
            <motion.div variants={item} className="text-center">
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-thin text-neutral-900 tracking-tight">
                    Rencontrez nos experts
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed">
                    Visitez l'une de nos agences pour un accompagnement personnalisé
                  </p>
                </div>
                
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-3 text-neutral-900 hover:text-neutral-600 transition-colors duration-300 border-b border-neutral-900 hover:border-neutral-400 pb-1"
                  >
                    <span className="font-light">Voir nos agences</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}