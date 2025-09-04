"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Calendar, Users, Star, Plane, Hotel } from "lucide-react"

// Types for offers
interface TarifsChambre {
  quintuple: string;
  quadruple: string;
  triple: string;
  double: string;
}

interface Hotel {
  id: string;
  nom: string;
  distance?: string;
  tarifsChambre: TarifsChambre;
}

interface DateDisponible {
  id: string;
  dateDebut: string;
  dateFin: string;
  periode: string;
}

interface Offre {
  id: string;
  titre: string;
  periode: string;
  datesDisponibles: DateDisponible[];
  prixBase: string;
  compagniesAeriennes: string;
  hebergement: string;
  hotels: Hotel[];
  tarifsChambre: TarifsChambre;
  servicesInclus: string[];
  image: string;
  destination: string;
  duree: string;
  note: number;
  nombrePersonnes: string;
  dateCreation: string;
  statut: 'active' | 'inactive' | 'brouillon';
  category: 'omra' | 'hajj';
}

export default function HeroSection() {
	const parallaxRef = useRef<HTMLDivElement>(null)
	const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const [offers, setOffers] = useState<Offre[]>([])

	// Load offers from localStorage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedOffres = JSON.parse(localStorage.getItem('offres') || '[]');
			// Filter only active offers
			const activeOffers = savedOffres.filter((offer: Offre) => offer.statut === 'active');
			setOffers(activeOffers);
		}
	}, []);

	// Handle offer rotation
	useEffect(() => {
		if (offers.length > 0) {
			const interval = setInterval(() => {
				setCurrentOfferIndex((prev) => (prev + 1) % offers.length)
			}, 5000)
			return () => clearInterval(interval)
		}
	}, [offers.length])

	// Set isVisible to true after mount for animation
	useEffect(() => {
		setIsVisible(true)
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

	const currentOffer = offers[currentOfferIndex];

	// If no offers, show loading or empty state
	if (offers.length === 0) {
		return (
			<section className="relative min-h-screen bg-neutral-950 flex items-center justify-center">
				<div className="text-center space-y-12">
					<div className="space-y-8">
						<h1 className="text-8xl lg:text-9xl font-extralight tracking-[0.25em] text-white">
							Q
						</h1>
						<div className="w-16 h-px bg-amber-400 mx-auto"></div>
						<p className="text-sm tracking-[0.4em] text-neutral-400 font-light">TAYBA</p>
					</div>
					<p className="text-neutral-500 text-sm tracking-wide">Chargement...</p>
				</div>
			</section>
		)
	}

	return (
		<section className="relative min-h-screen overflow-hidden bg-neutral-950">
			{/* Dynamic Background */}
			<div className="absolute inset-0 z-0" ref={parallaxRef}>
				{offers.map((offer, index) => (
					<div
						key={offer.id}
						className={`absolute inset-0 transition-opacity duration-2000 ${
							currentOfferIndex === index ? "opacity-100" : "opacity-0"
						}`}
					>
						<Image
							src={offer.image || 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop'}
							alt={offer.titre}
							fill
							className="object-cover scale-110"
							priority={index === 0}
						/>
					</div>
				))}
				<div className="absolute inset-0 bg-neutral-950/80"></div>
				<div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/20"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 min-h-screen flex items-center">
				<div className="w-full max-w-[95%] mx-auto px-4 mt-16">
					<div className="flex flex-col lg:flex-row items-center justify-between">
						
						{/* Brand Section */}
						<div className="lg:col-span-5">
							<div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`}>
								<div className="mb-12">
									<h1 className="text-5xl lg:text-7xl font-thin tracking-[0.2em] text-white mb-6 leading-none">
										QAFILAT
									</h1>
									<div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6"></div>
									<h2 className="text-2xl lg:text-3xl font-light tracking-[0.3em] text-amber-400 mb-8">
										TAYBA
									</h2>
								</div>
							
							</div>
						</div>

						{/* Offer */}
						<div className="w-full lg:w-2/3">
							<div className={`${isVisible ? "animate-slide-in" : "opacity-0"}`} style={{ animationDelay: "0.8s" }}>
								<div className="glass-container">
									
									{/* Header */}
									<div className="space-y-8">
										<div className="flex items-start justify-between">
											<div className="space-y-3">
												<div className="text-xs tracking-widest text-amber-400 font-medium">
													{currentOffer.category === 'hajj' ? 'HAJJ' : 'OMRA'}
												</div>
												<h3 className="text-2xl font-extralight text-white leading-tight">
													{currentOffer.titre}
												</h3>
											</div>
											<div className="text-right space-y-1">
												<div className="text-xs text-neutral-500 tracking-wide">DÈS</div>
												<div className="text-2xl font-extralight text-white">
													{currentOffer.prixBase}
												</div>
											</div>
										</div>

										<div className="flex flex-col space-y-2">
											<div className="flex items-center space-x-2 text-neutral-400">
												<MapPin className="w-3 h-3" />
												<span className="text-sm font-light">{currentOffer.destination}</span>
												{/* Vol and Hôtel inline */}
												{currentOffer.compagniesAeriennes && (
													<>
														<span className="mx-2 text-neutral-500">|</span>
														<Plane className="w-3 h-3" />
														<span className="text-xs font-light text-neutral-300">
															{currentOffer.compagniesAeriennes.split('(')[0]}
														</span>
													</>
												)}
												{currentOffer.hotels.length > 0 && (
													<>
														<span className="mx-2 text-neutral-500">|</span>
														<Hotel className="w-3 h-3" />
														<span className="text-xs font-light text-neutral-300">
															{currentOffer.hotels[0].nom}
														</span>
													</>
												)}
											</div>
											<div className="flex items-center space-x-6">
												{currentOffer.duree && (
													<div className="flex items-center space-x-2">
														<Calendar className="w-4 h-4 text-amber-400" />
														<span className="text-xs font-light text-neutral-300">
															{currentOffer.duree}
														</span>
													</div>
												)}
												{currentOffer.nombrePersonnes && (
													<div className="flex items-center space-x-2">
														<Users className="w-4 h-4 text-amber-400" />
														<span className="text-xs font-light text-neutral-300">
															{currentOffer.nombrePersonnes}
														</span>
													</div>
												)}
												{typeof currentOffer.note === "number" && (
													<div className="flex items-center space-x-2">
														<Star className="w-4 h-4 text-amber-400 fill-current" />
														<span className="text-xs font-light text-neutral-300">
															{currentOffer.note}/5
														</span>
													</div>
												)}
											</div>
										</div>
									</div>

									{/* Divider */}
									<div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8"></div>

									
									{/* Services */}
									<div className="space-y-6 my-8">
										<div className="text-xs tracking-widest text-neutral-500">INCLUS</div>
										<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
											{currentOffer.servicesInclus.slice(0, 2).map((service, index) => (
												<span key={index} className="text-sm text-neutral-300 font-light">
													{service.length > 30 ? service.substring(0, 30) + '...' : service}
													{index < Math.min(1, currentOffer.servicesInclus.length - 1) && <span className="mx-2 text-amber-400">•</span>}
												</span>
											))}
											{currentOffer.servicesInclus.length > 2 && (
												<span className="text-xs text-amber-400">
													+{currentOffer.servicesInclus.length - 2} services
												</span>
											)}
										</div>
									</div>

									{/* CTA */}
									<Link href={`/offers?selected=${currentOffer.id}`} passHref legacyBehavior>
										<a className="group block w-full">
											<div className="glass-button text-center py-6 space-y-2">
												<div className="flex items-center justify-center space-x-3">
													<span className="text-sm tracking-wide font-light">DÉCOUVRIR</span>
													<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
												</div>
											</div>
										</a>
									</Link>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Progress */}
			<div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex space-x-4">
					{offers.map((_, index) => (
						<div
							key={index}
							className={`h-px transition-all duration-700 ${
								index === currentOfferIndex
									? "w-16 bg-amber-400"
									: "w-4 bg-neutral-600"
							}`}
						/>
					))}
				</div>
			</div>

			<style jsx>{`
				@keyframes fade-in {
					from { opacity: 0; transform: translateY(40px); }
					to { opacity: 1; transform: translateY(0); }
				}

				@keyframes slide-in {
					from { opacity: 0; transform: translateX(40px); }
					to { opacity: 1; transform: translateX(0); }
				}

				.animate-fade-in {
					animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
				}

				.animate-slide-in {
					animation: slide-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
				}

				.glass-container {
					background: rgba(255, 255, 255, 0.02);
					backdrop-filter: blur(40px) saturate(200%);
					border: 1px solid rgba(255, 255, 255, 0.05);
					border-radius: 2rem;
					padding: 3rem;
					transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.glass-container:hover {
					background: rgba(255, 255, 255, 0.03);
					border-color: rgba(251, 191, 36, 0.1);
				}

				.glass-button {
					background: rgba(251, 191, 36, 0.08);
					backdrop-filter: blur(20px);
					border: 1px solid rgba(251, 191, 36, 0.15);
					border-radius: 1.5rem;
					color: rgba(251, 191, 36, 0.9);
					transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.glass-button:hover {
					background: rgba(251, 191, 36, 0.12);
					border-color: rgba(251, 191, 36, 0.3);
					transform: translateY(-1px);
				}

				@supports not (backdrop-filter: blur()) {
					.glass-container {
						background: rgba(0, 0, 0, 0.8);
					}
					.glass-button {
						background: rgba(251, 191, 36, 0.15);
					}
				}
			`}</style>
		</section>
	)
}