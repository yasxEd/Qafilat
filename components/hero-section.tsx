"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const offers = [
	{
		id: "hajj",
		title: "",
		subtitle: "",
		icon: null,
		description: "",
		image: "/f4.avif?q=80&w=1374&auto=format&fit=crop",
		price: "",
		href: "",
	},
	{
		id: "omra-shaban",
		title: "",
		subtitle: "",
		icon: null,
		description: "",
		image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
		price: "",
		href: "",
	},
	{
		id: "omra-ramadan",
		title: "",
		subtitle: "",
		icon: null,
		description: "",
		image: "/hero-background3.png?q=80&w=1374&auto=format&fit=crop",
		price: "",
		href: "",
	},
	{
		id: "istanbul",
		title: "",
		subtitle: "",
		icon: null,
		description: "",
		image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
		price: "",
		href: "",
	},
	{
		id: "groupe",
		title: "",
		subtitle: "",
		icon: null,
		description: "",
		image: "hero-background1.png?q=80&w=1374&auto=format&fit=crop",
		price: "",
		href: "",
	},
	{
		id: "speciales",
		title: "",
		subtitle: "",
		icon: null,
		description: "",
		image: "/hero-bg.avif?q=80&w=1374&auto=format&fit=crop",
		price: "",
		href: "",
	},
]

export default function HeroSection() {
	const parallaxRef = useRef<HTMLDivElement>(null)
	const [currentOfferIndex, setCurrentOfferIndex] = useState(0)

	// Handle offer rotation
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentOfferIndex((prev) => (prev + 1) % offers.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	// Parallax effect
	useEffect(() => {
		if (typeof window === "undefined") return

		let ticking = false
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (parallaxRef.current) {
						const scrollY = window.scrollY
						parallaxRef.current.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`
					}
					ticking = false
				})
				ticking = true
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<section className="relative min-h-screen overflow-hidden bg-black">
			<div className="absolute inset-0 z-0" ref={parallaxRef}>
				{offers.map((offer, index) => (
					<div
						key={offer.id}
						className={`absolute inset-0 transition-opacity duration-1000 ${
							currentOfferIndex === index ? "opacity-100" : "opacity-0"
						}`}
					>
						<Image
							src={offer.image}
							alt={offer.title}
							fill
							className="object-cover scale-105"
							priority={index === 0}
						/>
					</div>
				))}
				<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
			</div>
		</section>
	)
}