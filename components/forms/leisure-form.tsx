import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, MapPin, Calendar } from "lucide-react"

type Props = {
  selectedCity: string
  setSelectedCity: (val: string) => void
  destinationCity: string
  setDestinationCity: (val: string) => void
  tripType: string
  setTripType: (val: string) => void
  tripDuration: string
  setTripDuration: (val: string) => void
  moroccanCities: { value: string; label: string }[]
  popularDestinations: { value: string; label: string }[]
  tripTypes: { value: string; label: string }[]
  tripDurations: { value: string; label: string }[]
  formTouched: boolean
  setFormTouched: (val: boolean) => void
  cityDropdownOpen: boolean
  setCityDropdownOpen: (val: boolean) => void
  cityDropdownRef: React.RefObject<HTMLDivElement>
  tripTypeDropdownOpen: boolean
  setTripTypeDropdownOpen: (val: boolean) => void
  tripTypeDropdownRef: React.RefObject<HTMLDivElement>
  durationDropdownOpen: boolean
  setDurationDropdownOpen: (val: boolean) => void
  durationDropdownRef: React.RefObject<HTMLDivElement>
  isMobile: boolean
}

export default function LeisureForm({
  selectedCity,
  setSelectedCity,
  destinationCity,
  setDestinationCity,
  tripType,
  setTripType,
  tripDuration,
  setTripDuration,
  moroccanCities,
  popularDestinations,
  tripTypes,
  tripDurations,
  formTouched,
  setFormTouched,
  cityDropdownOpen,
  setCityDropdownOpen,
  cityDropdownRef,
  tripTypeDropdownOpen,
  setTripTypeDropdownOpen,
  tripTypeDropdownRef,
  durationDropdownOpen,
  setDurationDropdownOpen,
  durationDropdownRef,
  isMobile,
}: Props) {
  const getSelectedCityLabel = () =>
    moroccanCities.find((city) => city.value === selectedCity)?.label || ""
  const getSelectedTripTypeLabel = () =>
    tripTypes.find((type) => type.value === tripType)?.label || ""
  const getSelectedDurationLabel = () =>
    tripDurations.find((d) => d.value === tripDuration)?.label || ""

  return (
    <>
      {/* First row: Departure City, Trip Type, Trip Duration */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Departure City Dropdown */}
        <div className="space-y-2 flex-1">
          <label className="block text-sm font-normal text-neutral-700">
            Ville de départ <span className="text-black">*</span>
          </label>
          <div className="relative" ref={cityDropdownRef}>
            <button
              type="button"
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className={`
                w-full px-4 py-3 text-left border rounded-xl transition-all duration-200
                border-neutral-200 bg-white
                hover:border-neutral-300
                focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                flex items-center justify-between
              `}
            >
              <span className={selectedCity ? "text-neutral-900" : "text-neutral-400"}>
                {selectedCity ? getSelectedCityLabel() : "Sélectionnez votre ville"}
              </span>
              <ChevronDown
                size={18}
                className={`text-neutral-400 transition-transform duration-200 ${
                  cityDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {cityDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute z-50 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden"
                >
                  <div>
                    {moroccanCities.map((city) => (
                      <button
                        key={city.value}
                        type="button"
                        className={`
                          w-full px-4 py-3 text-left transition-colors duration-150
                          ${selectedCity === city.value 
                            ? "bg-neutral-50 text-neutral-900 font-medium" 
                            : "text-neutral-700 hover:bg-neutral-50"
                          }
                        `}
                        onClick={() => {
                          setSelectedCity(city.value)
                          setCityDropdownOpen(false)
                          setFormTouched(true)
                        }}
                      >
                        {city.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Trip Type Dropdown */}
        <div className="space-y-2 flex-1">
          <label className="block text-sm font-normal text-neutral-700">
            Type de voyage <span className="text-black">*</span>
          </label>
          <div className="relative" ref={tripTypeDropdownRef}>
            <button
              type="button"
              onClick={() => setTripTypeDropdownOpen(!tripTypeDropdownOpen)}
              className={`
                w-full px-4 py-3 text-left border rounded-xl transition-all duration-200
                border-neutral-200 bg-white
                hover:border-neutral-300
                focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                flex items-center justify-between
              `}
            >
              <span className={tripType ? "text-neutral-900" : "text-neutral-400"}>
                {tripType ? getSelectedTripTypeLabel() : "Sélectionnez un type"}
              </span>
              <ChevronDown
                size={18}
                className={`text-neutral-400 transition-transform duration-200 ${
                  tripTypeDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {tripTypeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute z-50 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden"
                >
                  <div>
                    {tripTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        className={`
                          w-full px-4 py-3 text-left transition-colors duration-150
                          ${tripType === type.value 
                            ? "bg-neutral-50 text-neutral-900 font-medium" 
                            : "text-neutral-700 hover:bg-neutral-50"
                          }
                        `}
                        onClick={() => {
                          setTripType(type.value)
                          setTripTypeDropdownOpen(false)
                          setFormTouched(true)
                        }}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Trip Duration Dropdown */}
        <div className="space-y-2 flex-1">
          <label className="block text-sm font-normal text-neutral-700">
            Durée du voyage <span className="text-black">*</span>
          </label>
          <div className="relative" ref={durationDropdownRef}>
            <button
              type="button"
              onClick={() => setDurationDropdownOpen(!durationDropdownOpen)}
              className={`
                w-full px-4 py-3 text-left border rounded-xl transition-all duration-200
                border-neutral-200 bg-white
                hover:border-neutral-300
                focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                flex items-center justify-between
              `}
            >
              <span className={tripDuration ? "text-neutral-900" : "text-neutral-400"}>
                {tripDuration ? getSelectedDurationLabel() : "Sélectionnez une durée"}
              </span>
              <ChevronDown
                size={18}
                className={`text-neutral-400 transition-transform duration-200 ${
                  durationDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {durationDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute z-50 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden"
                >
                  <div>
                    {tripDurations.map((duration) => (
                      <button
                        key={duration.value}
                        type="button"
                        className={`
                          w-full px-4 py-3 text-left transition-colors duration-150
                          ${tripDuration === duration.value 
                            ? "bg-neutral-50 text-neutral-900 font-medium" 
                            : "text-neutral-700 hover:bg-neutral-50"
                          }
                        `}
                        onClick={() => {
                          setTripDuration(duration.value)
                          setDurationDropdownOpen(false)
                          setFormTouched(true)
                        }}
                      >
                        {duration.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Second row: Destination City */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* Destination City Input */}
        <div className="space-y-2 flex-1">
          <label className="block text-sm font-normal text-neutral-700">
            Destination <span className="text-black">*</span>
          </label>
          <input
            type="text"
            value={destinationCity}
            onChange={(e) => {
              setDestinationCity(e.target.value)
              setFormTouched(true)
            }}
            placeholder="Entrez une destination"
            className={`
              w-full px-4 py-3 border rounded-xl transition-all duration-200
              border-neutral-200 bg-white
              hover:border-neutral-300
              focus:outline-none focus:border-black focus:ring-1 focus:ring-black
              text-neutral-900 placeholder:text-neutral-400
            `}
          />
        </div>
      </div>
    </>
  )
}