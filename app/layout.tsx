import type React from "react"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: {
    default: "Qafilat Tayba",
    template: "%s | Qafilat Tayba",
  },
  description:
    "Réservez votre voyage de Hajj et Omra avec Qafilat Tayba. Vivez un pèlerinage spirituellement enrichissant avec nos services complets depuis 1995.",
  keywords: "hajj, omra, pèlerinage, mecque, médine, voyage islamique, pèlerinage musulman, qafilat tayba, maroc",
  authors: [{ name: "Qafilat Tayba" }],
  creator: "Qafilat Tayba",
  publisher: "Qafilat Tayba",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://qafilattayba.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Qafilat Tayba",
    description:
      "Réservez votre voyage de Hajj et Omra avec Qafilat Tayba. Vivez un pèlerinage spirituellement enrichissant avec nos services complets depuis 1995.",
    url: "https://qafilattayba.com",
    siteName: "Qafilat Tayba",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "Qafilat Tayba Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qafilat Tayba | Hajj & Omra - Voyages Spirituels",
    description:
      "Réservez votre voyage de Hajj et Omra avec Qafilat Tayba. Vivez un pèlerinage spirituellement enrichissant avec nos services complets depuis 1995.",
    images: ["/logo.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/logo.jpg" sizes="any" />
      </head>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>

        {/* Structured data for organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Qafilat Tayba",
              url: "https://qafilattayba.com",
              logo: "/logo.jpg",
              description:
                "Agence de voyage spécialisée dans l'organisation des pèlerinages d'Omra et de Hajj depuis 1995.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bureau N° 1 mosquee Khaled Bnou Alwalid lot assanawbar",
                addressLocality: "Marrakech",
                addressRegion: "Marrakech-Safi",
                addressCountry: "MA",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+212-524-335508",
                contactType: "customer service",
              },
              sameAs: [
                "https://web.facebook.com/QafilatTayba/",
                "https://www.instagram.com/qafilat.tayba/",
                "https://www.youtube.com/@Qafilattayba",
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
