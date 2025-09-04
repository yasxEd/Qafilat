import React, { useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, CalendarDays, ChevronLeft, ChevronRight, MapPin, Users } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday, isBefore, startOfDay } from "date-fns"
import { fr } from "date-fns/locale"

type Props = {
  tripDirection: string
  setTripDirection: (val: string) => void
  flightClass: string
  setFlightClass: (val: string) => void
  departureCity: string
  setDepartureCity: (val: string) => void
  arrivalCity: string
  setArrivalCity: (val: string) => void
  flightDateRange: { from: string; to: string }
  setFlightDateRange: (val: { from: string; to: string }) => void
  tripDirections: { value: string; label: string }[]
  flightClasses: { value: string; label: string }[]
  moroccanCities: { value: string; label: string }[]
  popularDestinations: { value: string; label: string }[]
  formTouched: boolean
  setFormTouched: (val: boolean) => void
  isMobile: boolean
  numVoyageurs: number
  setNumVoyageurs: (val: number) => void
}

// CustomCalendar reused from hajj-form
const CustomCalendar = ({ selected, onSelect, disabled }) => {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date())
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startDay = monthStart.getDay()
  const paddingDays = Array(startDay === 0 ? 6 : startDay - 1).fill(null)
  const allDays = [...paddingDays, ...days]
  const weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
  const handleDateSelect = (date) => {
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    onSelect(localDate)
  }
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-neutral-200 w-80">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
          <ChevronLeft size={16} className="text-neutral-600" />
        </button>
        <h3 className="text-lg font-semibold text-neutral-900">
          {format(currentMonth, 'MMMM yyyy', { locale: fr })}
        </h3>
        <button type="button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
          <ChevronRight size={16} className="text-neutral-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-neutral-500 py-2">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((day, index) => {
          if (!day) return <div key={index} className="aspect-square" />
          const isSelected = selected && isSameDay(day, selected)
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isTodayDate = isToday(day)
          const isDisabled = disabled && disabled(day)
          return (
            <motion.button
              key={day.toISOString()}
              type="button"
              onClick={() => !isDisabled && handleDateSelect(day)}
              disabled={isDisabled}
              whileHover={!isDisabled ? { scale: 1.05 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200
                ${isSelected 
                  ? 'bg-black text-white font-semibold shadow-md' 
                  : isDisabled
                    ? 'text-neutral-300 cursor-not-allowed'
                    : isTodayDate
                      ? 'bg-blue-100 text-blue-700 font-medium hover:bg-blue-200'
                      : isCurrentMonth
                        ? 'text-neutral-900 hover:bg-neutral-100 font-medium'
                        : 'text-neutral-400 hover:bg-neutral-50'
                }
              `}
            >
              {format(day, 'd')}
            </motion.button>
          )
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-neutral-200">
        <button
          type="button"
          onClick={() => handleDateSelect(new Date())}
          className="w-full py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
        >
          Aujourd'hui
        </button>
      </div>
    </div>
  )
}

export default function VolForm({
  tripDirection,
  setTripDirection,
  flightClass,
  setFlightClass,
  departureCity,
  setDepartureCity,
  arrivalCity,
  setArrivalCity,
  flightDateRange,
  setFlightDateRange,
  tripDirections,
  flightClasses,
  moroccanCities,
  popularDestinations,
  formTouched,
  setFormTouched,
  isMobile,
  numVoyageurs,
  setNumVoyageurs,
}: Props) {
  // Dropdown states/refs
  const [tripDropdownOpen, setTripDropdownOpen] = useState(false)
  const [classDropdownOpen, setClassDropdownOpen] = useState(false)
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [returnDatePickerOpen, setReturnDatePickerOpen] = useState(false)
  const tripDropdownRef = useRef<HTMLDivElement>(null)
  const classDropdownRef = useRef<HTMLDivElement>(null)
  const cityDropdownRef = useRef<HTMLDivElement>(null)

  const getSelectedTripDirectionLabel = () =>
    tripDirections.find((dir) => dir.value === tripDirection)?.label || ""
  const getSelectedFlightClassLabel = () =>
    flightClasses.find((cls) => cls.value === flightClass)?.label || ""
  const getSelectedDepartureCityLabel = () =>
    moroccanCities.find((city) => city.value === departureCity)?.label || ""

  // Date objects for calendar
  const selectedFromDateObj = flightDateRange.from ? new Date(flightDateRange.from + 'T12:00:00') : undefined
  const selectedToDateObj = flightDateRange.to ? new Date(flightDateRange.to + 'T12:00:00') : undefined

  return (
    <>
      {/* First three fields in a row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Trip Direction Dropdown */}
        <div className="space-y-2 flex-1">
          <label className="block text-sm font-normal text-neutral-700">
            Type de vol <span className="text-black">*</span>
          </label>
          <div className="relative" ref={tripDropdownRef}>
            <button
              type="button"
              onClick={() => setTripDropdownOpen(!tripDropdownOpen)}
              className={`
                w-full px-4 py-3 text-left border rounded-xl transition-all duration-200
                border-neutral-200 bg-white hover:border-neutral-300
                focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                flex items-center justify-between
              `}
            >
              <span className={tripDirection ? "text-neutral-900" : "text-neutral-400"}>
                {tripDirection ? getSelectedTripDirectionLabel() : "Type de vol"}
              </span>
              <ChevronDown
                size={18}
                className={`text-neutral-400 transition-transform duration-200 ${
                  tripDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {tripDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute z-50 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden"
                >
                  <div>
                    {tripDirections.map((dir) => (
                      <button
                        key={dir.value}
                        type="button"
                        className={`
                          w-full px-4 py-3 text-left transition-colors duration-150
                          ${tripDirection === dir.value 
                            ? "bg-neutral-50 text-neutral-900 font-medium" 
                            : "text-neutral-700 hover:bg-neutral-50"
                          }
                        `}
                        onClick={() => {
                          setTripDirection(dir.value)
                          setTripDropdownOpen(false)
                          setFormTouched(true)
                        }}
                      >
                        {dir.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Flight Class Dropdown */}
        <div className="space-y-2 flex-1">
          <label className="block text-sm font-normal text-neutral-700">
            Classe <span className="text-black">*</span>
          </label>
          <div className="relative" ref={classDropdownRef}>
            <button
              type="button"
              onClick={() => setClassDropdownOpen(!classDropdownOpen)}
              className={`
                w-full px-4 py-3 text-left border rounded-xl transition-all duration-200
                border-neutral-200 bg-white hover:border-neutral-300
                focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                flex items-center justify-between
              `}
            >
              <span className={flightClass ? "text-neutral-900" : "text-neutral-400"}>
                {flightClass ? getSelectedFlightClassLabel() : "Choisir classe"}
              </span>
              <ChevronDown
                size={18}
                className={`text-neutral-400 transition-transform duration-200 ${
                  classDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {classDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute z-50 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden"
                >
                  <div>
                    {flightClasses.map((cls) => (
                      <button
                        key={cls.value}
                        type="button"
                        className={`
                          w-full px-4 py-3 text-left transition-colors duration-150
                          ${flightClass === cls.value 
                            ? "bg-neutral-50 text-neutral-900 font-medium" 
                            : "text-neutral-700 hover:bg-neutral-50"
                        }
                        `}
                        onClick={() => {
                          setFlightClass(cls.value)
                          setClassDropdownOpen(false)
                          setFormTouched(true)
                        }}
                      >
                        {cls.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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
                border-neutral-200 bg-white hover:border-neutral-300
                focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                flex items-center justify-between
              `}
            >
              <span className={departureCity ? "text-neutral-900" : "text-neutral-400"}>
                {departureCity ? getSelectedDepartureCityLabel() : "Ville de départ"}
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
                          ${departureCity === city.value 
                            ? "bg-neutral-50 text-neutral-900 font-medium" 
                            : "text-neutral-700 hover:bg-neutral-50"
                        }
                        `}
                        onClick={() => {
                          setDepartureCity(city.value)
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
      </div>

      {/* Next four fields in a row */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* Arrival City Input */}
        <div className="space-y-2 flex-1">
          <label className="block text-sm font-normal text-neutral-700">
            Ville d'arrivée <span className="text-black">*</span>
          </label>
          <input
            type="text"
            value={arrivalCity}
            onChange={(e) => {
              setArrivalCity(e.target.value)
              setFormTouched(true)
            }}
            placeholder="Ville d'arrivée"
            className={`
              w-full px-4 py-3 border rounded-xl transition-all duration-200
              border-neutral-200 bg-white hover:border-neutral-300
              focus:outline-none focus:border-black focus:ring-1 focus:ring-black
              text-neutral-900 placeholder:text-neutral-400
            `}
          />
        </div>

        {/* Date Picker Aller */}
        <div className="space-y-2 flex-1">
          <label className="block text-sm font-normal text-neutral-700">
            {tripDirection === "round" ? <>Date aller <span className="text-black">*</span></> : <>Date de départ <span className="text-black">*</span></>}
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDatePickerOpen(!datePickerOpen)}
              className={`
                w-full px-4 py-3 border rounded-xl transition-all duration-200 text-left
                border-neutral-200 bg-white hover:border-neutral-300
                focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                text-neutral-900 placeholder:text-neutral-400
                flex items-center justify-between
              `}
            >
              <span className={flightDateRange.from ? "text-neutral-900" : "text-neutral-400"}>
                {flightDateRange.from
                  ? format(new Date(flightDateRange.from + 'T12:00:00'), "dd/MM/yyyy")
                  : "Choisir une date"
                }
              </span>
              <CalendarDays size={18} className="text-neutral-400" />
            </button>
            <AnimatePresence>
              {datePickerOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute z-50 mt-2 left-0"
                >
                  <CustomCalendar
                    selected={selectedFromDateObj}
                    onSelect={(date) => {
                      if (date) {
                        const formattedDate = format(date, 'yyyy-MM-dd')
                        setFlightDateRange({ ...flightDateRange, from: formattedDate })
                        setFormTouched(true)
                        setDatePickerOpen(false)
                      }
                    }}
                    disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Date Picker Retour (conditionally rendered) */}
        {tripDirection === "round" && (
          <div className="space-y-2 flex-1">
            <label className="block text-sm font-normal text-neutral-700">
              Date retour <span className="text-black">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setReturnDatePickerOpen(!returnDatePickerOpen)}
                className={`
                  w-full px-4 py-3 border rounded-xl transition-all duration-200 text-left
                  border-neutral-200 bg-white hover:border-neutral-300
                  focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                  text-neutral-900 placeholder:text-neutral-400
                  flex items-center justify-between
                `}
              >
                <span className={flightDateRange.to ? "text-neutral-900" : "text-neutral-400"}>
                  {flightDateRange.to
                    ? format(new Date(flightDateRange.to + 'T12:00:00'), "dd/MM/yyyy")
                    : "Choisir une date"
                  }
                </span>
                <CalendarDays size={18} className="text-neutral-400" />
              </button>
              <AnimatePresence>
                {returnDatePickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute z-50 mt-2 left-0"
                  >
                    <CustomCalendar
                      selected={selectedToDateObj}
                      onSelect={(date) => {
                        if (date) {
                          const formattedDate = format(date, 'yyyy-MM-dd')
                          setFlightDateRange({ ...flightDateRange, to: formattedDate })
                          setFormTouched(true)
                          setReturnDatePickerOpen(false)
                        }
                      }}
                      disabled={(date) => {
                        const minDate = flightDateRange.from ? startOfDay(new Date(flightDateRange.from + 'T12:00:00')) : startOfDay(new Date())
                        return isBefore(startOfDay(date), minDate)
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Number of Voyageurs */}
        <div className="space-y-2 flex-1">
          <label className="block text-sm font-normal text-neutral-700">
            Nombre de voyageurs
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={10}
              value={numVoyageurs}
              onChange={(e) => setNumVoyageurs(Number(e.target.value))}
              className="
                w-full px-4 py-3 border border-neutral-200 bg-white rounded-xl
                focus:outline-none focus:border-black focus:ring-1 focus:ring-black
                hover:border-neutral-300 transition-all duration-200
                text-neutral-900 placeholder:text-neutral-400
              "
              placeholder="1"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm pointer-events-none">
              <Users size={16} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}