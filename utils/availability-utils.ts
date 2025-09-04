export interface AvailableDestination {
  label: string
  value: string
  count: number
  isAvailable: boolean
  type?: 'hajj' | 'umrah' | 'hotel' | 'flight' | 'leisure'
}

export interface AvailableDate {
  date: string
  label: string
  count: number
  destination?: string
}

// Get destinations from dashboard offers
export function getAvailableDestinations(type?: string): AvailableDestination[] {
  if (typeof window === 'undefined') return []
  
  try {
    const offersData = localStorage.getItem('offres')
    if (!offersData) return getDefaultDestinations(type)
    
    const offers = JSON.parse(offersData)
    const destinationMap = new Map()
    
    offers.forEach((offer: any) => {
      if (offer.statut !== 'active') return
      
      // Filter by type if specified
      const offerTitle = offer.titre.toLowerCase()
      let matchesType = true
      
      if (type === 'hajj') {
        matchesType = offerTitle.includes('hajj')
      } else if (type === 'umrah' || type === 'omra') {
        matchesType = offerTitle.includes('omra') || offerTitle.includes('umrah')
      } else if (type === 'hotel') {
        matchesType = offer.hotels && offer.hotels.length > 0
      } else if (type === 'vol') {
        matchesType = offer.compagniesAeriennes !== ""
      }
      
      if (!matchesType) return
      
      const destination = offer.destination
      if (destination) {
        const key = destination.toLowerCase()
        if (destinationMap.has(key)) {
          destinationMap.get(key).count++
        } else {
          destinationMap.set(key, {
            label: destination,
            value: key.replace(/\s+/g, '-'),
            count: 1,
            isAvailable: true,
            type
          })
        }
      }
    })
    
    // Convert to array and sort by count
    const destinations = Array.from(destinationMap.values())
      .sort((a, b) => b.count - a.count)
    
    // Add some default destinations if not enough
    const defaults = getDefaultDestinations(type)
    const existingValues = new Set(destinations.map(d => d.value))
    
    defaults.forEach(def => {
      if (!existingValues.has(def.value)) {
        destinations.push({ ...def, isAvailable: false })
      }
    })
    
    return destinations.slice(0, 15)
  } catch (error) {
    console.error('Error loading destinations:', error)
    return getDefaultDestinations(type)
  }
}

// Get available dates from dashboard offers
export function getAvailableDates(destination?: string): AvailableDate[] {
  if (typeof window === 'undefined') return []
  
  try {
    const offersData = localStorage.getItem('offres')
    if (!offersData) return []
    
    const offers = JSON.parse(offersData)
    const dateMap = new Map()
    
    offers.forEach((offer: any) => {
      if (offer.statut !== 'active') return
      
      // Filter by destination if specified
      if (destination && !offer.destination.toLowerCase().includes(destination.toLowerCase())) {
        return
      }
      
      if (offer.datesDisponibles && offer.datesDisponibles.length > 0) {
        offer.datesDisponibles.forEach((dateInfo: any) => {
          const startDate = dateInfo.dateDebut
          if (startDate) {
            const key = startDate
            if (dateMap.has(key)) {
              dateMap.get(key).count++
            } else {
              const date = new Date(startDate)
              const label = date.toLocaleDateString('fr-FR', { 
                weekday: 'short',
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })
              
              dateMap.set(key, {
                date: startDate,
                label,
                count: 1,
                destination: offer.destination
              })
            }
          }
        })
      }
    })
    
    // Convert to array and sort by date
    return Array.from(dateMap.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 10)
  } catch (error) {
    console.error('Error loading dates:', error)
    return []
  }
}

// Default destinations based on type
function getDefaultDestinations(type?: string): AvailableDestination[] {
  const hotelDestinations = [
    { label: "Arabie Saoudite", value: "arabie-saoudite", count: 0, isAvailable: false },
    { label: "Istanbul, Turquie", value: "istanbul", count: 0, isAvailable: false },
    { label: "Dubaï, UAE", value: "dubai", count: 0, isAvailable: false },
    { label: "Paris, France", value: "paris", count: 0, isAvailable: false },
    { label: "Londres, UK", value: "london", count: 0, isAvailable: false },
    { label: "Rome, Italie", value: "rome", count: 0, isAvailable: false },
    { label: "Madrid, Espagne", value: "madrid", count: 0, isAvailable: false },
    { label: "Le Caire, Égypte", value: "cairo", count: 0, isAvailable: false }
  ]
  
  const flightDestinations = [
    { label: "Arabie Saoudite", value: "arabie-saoudite", count: 0, isAvailable: false },
    { label: "Istanbul, Turquie", value: "istanbul", count: 0, isAvailable: false },
    { label: "Dubaï, UAE", value: "dubai", count: 0, isAvailable: false },
    { label: "Paris, France", value: "paris", count: 0, isAvailable: false },
    { label: "New York, USA", value: "newyork", count: 0, isAvailable: false },
    { label: "Tokyo, Japon", value: "tokyo", count: 0, isAvailable: false },
    { label: "Singapour", value: "singapore", count: 0, isAvailable: false }
  ]
  
  const religiousDestinations = [
    { label: "Arabie Saoudite", value: "arabie-saoudite", count: 0, isAvailable: false },
    { label: "La Mecque", value: "la-mecque", count: 0, isAvailable: false },
    { label: "Médine", value: "medine", count: 0, isAvailable: false }
  ]
  
  if (type === 'hotel') return hotelDestinations
  if (type === 'vol') return flightDestinations
  if (type === 'hajj' || type === 'umrah') return religiousDestinations
  
  return [...religiousDestinations, ...hotelDestinations].slice(0, 10)
}

// Get hotels for a specific destination
export function getAvailableHotels(destination: string): any[] {
  if (typeof window === 'undefined') return []
  
  try {
    const offersData = localStorage.getItem('offres')
    if (!offersData) return []
    
    const offers = JSON.parse(offersData)
    const hotels = new Set()
    
        offers.forEach((offer: any) => {
          // Add your condition here or remove this line if not needed
          // Example: if (offer.statut !== 'active') return;
          // Example implementation:
          if (offer.statut !== 'active') return;
          if (
            offer.destination &&
            offer.destination.toLowerCase().includes(destination.toLowerCase()) &&
            offer.hotels &&
            Array.isArray(offer.hotels)
          ) {
            offer.hotels.forEach((hotel: any) => {
              hotels.add(hotel);
            });
          }
        });
    
        return Array.from(hotels);
      } catch (error) {
        console.error('Error loading hotels:', error);
        return [];
      }
    }
