"use client"

import { useRef, useState } from "react"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  // Updated testimonials data with new content
  const testimonials = [
    {
      quote:
        "Ce fut un voyage merveilleux à Istanbul avec l'agence Qafila Tayba à tous les niveaux. L'organisation était excellente, les services luxueux, et les guides professionnels et chaleureux. Je recommande vivement cette agence pour les efforts considérables et le confort total que nous avons ressentis.",
      image: "https://plus.unsplash.com/premium_photo-1699534956883-a8e5c4746884?q=80&w=2070&auto=format&fit=crop",
      name: "Ahmed Benkirane",
      position: "Client satisfait",
    },
    {
      quote:
        "Je tiens à remercier l'agence Qafila Tayba pour mon voyage réussi pour accomplir la Omra. Tout était parfaitement organisé, de la réservation des vols à l'hébergement. Les guides étaient compétents et nous donnaient les orientations religieuses nécessaires. Une expérience inoubliable sans aucun doute.",
      image: "https://plus.unsplash.com/premium_photo-1666866587910-2f333c109ef7?q=80&w=1965&auto=format&fit=crop",
      name: "Leila El Idrissi",
      position: "Pèlerine",
    },
    {
      quote:
        "J'ai voyagé avec Qafila Tayba pour le Hajj 2024 et ce fut une expérience inoubliable. Le confort offert et le respect rigoureux des instructions religieuses sont parmi leurs plus grandes qualités. Merci à toute l'équipe pour leur attention et leur hospitalité. Nous nous préparons déjà à repartir avec eux.",
      image: "https://images.unsplash.com/photo-1681686587104-db9cdff707a9?q=80&w=1946&auto=format&fit=crop",
      name: "Youssef Mirhane",
      position: "Pèlerin",
    },
    {
      quote:
        "Les services de Qafila Tayba ont dépassé mes attentes. Les prix étaient raisonnables pour des prestations haut de gamme, et les hôtels choisis étaient luxueux et propres. Ils ont rendu mon voyage sûr et confortable, je suis très heureuse d'avoir choisi cette agence.",
      image: "https://plus.unsplash.com/premium_photo-1677965780516-5517453f2e48?q=80&w=1974&auto=format&fit=crop",
      name: "Fatima Raghib",
      position: "Cliente satisfaite",
    },
    {
      quote:
        "Je tiens à saluer l'esprit de coopération remarquable de l'équipe de Qafila Tayba. Ils étaient toujours prêts à répondre aimablement à toutes les questions, avec une attention incroyable aux moindres détails. Grâce à Dieu, mon voyage s'est déroulé dans la sérénité et en toute sécurité.",
      image: "https://plus.unsplash.com/premium_photo-1679065960816-77d101ec25f4?q=80&w=1974&auto=format&fit=crop",
      name: "Khadija Bennani",
      position: "Pèlerine",
    },
    {
      quote:
        "Un de mes meilleurs voyages a été avec l'agence Qafila Tayba, notamment pendant les voyages de Ramadan. Les déplacements étaient fluides et l'hébergement proche du Haram, ce qui a rendu l'expérience spirituelle de la Omra encore plus intense. Je recommande vivement cette agence pour leur excellente organisation et leur grande hospitalité.",
      image: "https://images.unsplash.com/photo-1511652019870-fbd8713560bf?q=80&w=1946&auto=format&fit=crop",
      name: "Rachid Jariri",
      position: "Client fidèle",
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title with underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            <span className="relative inline-block">
              Ce Que Disent Nos Pèlerins
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#FFD700] rounded-full"></span>
            </span>
          </h2>
        </motion.div>

        {/* Main container */}
        <div className="relative">
          {/* Enhanced Swiper */}
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={12}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            loop={true}
            speed={800}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex)
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} isActive={index === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        /* Base styles for all screens */
        .testimonial-swiper .swiper-slide {
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform: scale(0.95);
          height: auto;
          padding: 20px 0;
        }
        
        .testimonial-swiper .swiper-slide-active {
          transform: scale(1);
          z-index: 2;
        }
        
        /* Mobile styles - full opacity */
        @media (max-width: 767px) {
          .testimonial-swiper .swiper-slide {
            opacity: 1 !important;
          }
        }
        
        /* Desktop styles - opacity transitions */
        @media (min-width: 768px) {
          .testimonial-swiper .swiper-slide {
            opacity: 0.4;
            transform: scale(0.85);
          }
          
          .testimonial-swiper .swiper-slide-active {
            opacity: 1;
            transform: scale(1);
          }
          
          .testimonial-swiper .swiper-slide-prev,
          .testimonial-swiper .swiper-slide-next {
            opacity: 0.7;
            transform: scale(0.9);
          }
          
          .testimonial-swiper .swiper-slide:hover {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}

// Testimonial Card Component
const TestimonialCard = ({ testimonial, isActive }: { testimonial: any; isActive: boolean }) => {
  const { quote, image, name, position } = testimonial

  return (
    <div className="relative px-2 py-1 flex flex-col items-center h-full">
      {/* Speech bubble with quote - now all black */}
      <div className="rounded-2xl bg-gradient-to-br from-black to-gray-900 text-white p-5 shadow-lg relative mb-6 w-full h-[200px] flex flex-col">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -ml-10 -mb-10"></div>

        {/* Type indicator and rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/10">Témoignage</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
            ))}
          </div>
        </div>

        {/* Quote with word-by-word animation for active slide */}
        <div className="relative z-10 flex-1 overflow-hidden">
          <Quote className="h-8 w-8 text-white/20 rotate-180 absolute -left-1 -top-1" />
          <div className="pl-7 pt-2">
            {isActive ? (
              <AnimatedQuote quote={quote} />
            ) : (
              <p className="text-sm leading-relaxed font-light line-clamp-4">{quote}</p>
            )}
          </div>
        </div>

        {/* Speech bubble pointer - centered */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-gray-900"></div>
      </div>

      {/* Profile section - centered */}
      <div className="flex flex-col items-center text-center mt-auto">
        <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-[#FFD700]/30 shadow-md mb-2">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = "/placeholder.svg?height=150&width=150"
            }}
          />
        </div>
        <div>
          <motion.h3
            className="font-semibold text-black"
            initial={isActive ? { opacity: 0, y: 5 } : {}}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {name}
          </motion.h3>
          <motion.p
            className="text-xs text-gray-600"
            initial={isActive ? { opacity: 0, y: 5 } : {}}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {position}
          </motion.p>
        </div>
      </div>
    </div>
  )
}

// Animated Quote Component with reduced speed
const AnimatedQuote = ({ quote }: { quote: string }) => {
  return (
    <motion.p className="text-sm leading-relaxed font-light">
      {quote.split(" ").map((word, index) => (
        <motion.span
          key={index}
          initial={{
            filter: "blur(10px)",
            opacity: 0,
            y: 5,
          }}
          animate={{
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3, // Increased from 0.2 to 0.3
            ease: "easeInOut",
            delay: 0.03 * index, // Increased from 0.02 to 0.03
          }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  )
}
