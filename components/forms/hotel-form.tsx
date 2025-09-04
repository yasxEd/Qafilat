import React, { useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday, isBefore, startOfDay } from "date-fns"
import { fr } from "date-fns/locale"

type Props = {
  hotelDestination: string
  setHotelDestination: (val: string) => void
  hotelDepartureCity: string
  setHotelDepartureCity: (val: string) => void
  hotelDateRange: { from: string; to: string }
  setHotelDateRange: (val: { from: string; to: string }) => void
  roomsCount: string
  setRoomsCount: (val: string) => void
  hotelDestinations: { value: string; label: string }[]
  moroccanCities: { value: string; label: string }[]
  formTouched: boolean
  setFormTouched: (val: boolean) => void
  isMobile: boolean
}

// CustomCalendar reused from hajj-form
type CustomCalendarProps = {
  selected?: Date
  onSelect: (date: Date) => void
  disabled?: (date: Date) => boolean
}

const CustomCalendar = ({ selected, onSelect, disabled }: CustomCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date())
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startDay = monthStart.getDay()
  const paddingDays = Array(startDay === 0 ? 6 : startDay - 1).fill(null)
  const allDays = [...paddingDays, ...days]
  const weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
  interface HandleDateSelectProps {
    date: Date
  }

  const handleDateSelect = (date: Date): void => {
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

export default function HotelForm({
  hotelDestination,
  setHotelDestination,
  hotelDepartureCity,
  setHotelDepartureCity,
  hotelDateRange,
  setHotelDateRange,
  roomsCount,
  setRoomsCount,
  hotelDestinations,
  moroccanCities = [], // Add default empty array
  formTouched,
  setFormTouched,
  isMobile,
}: Props) {
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false)
  const [departureCityDropdownOpen, setDepartureCityDropdownOpen] = useState(false)
  const [checkinPickerOpen, setCheckinPickerOpen] = useState(false)
  const [checkoutPickerOpen, setCheckoutPickerOpen] = useState(false)
  const destinationDropdownRef = useRef<HTMLDivElement>(null)
  const departureCityDropdownRef = useRef<HTMLDivElement>(null)

  const getSelectedDestinationLabel = () =>
    hotelDestinations.find((dest) => dest.value === hotelDestination)?.label || ""
  
  const getSelectedDepartureCityLabel = () =>
    moroccanCities.find((city) => city.value === hotelDepartureCity)?.label || ""

  const selectedCheckinDateObj = hotelDateRange.from ? new Date(hotelDateRange.from + 'T12:00:00') : undefined
  const selectedCheckoutDateObj = hotelDateRange.to ? new Date(hotelDateRange.to + 'T12:00:00') : undefined

  return (
    <>
      {/* Departure City Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-normal text-neutral-700">
          Ville de départ
        </label>
        <div className="relative" ref={departureCityDropdownRef}>
          <button
            type="button"
            onClick={() => setDepartureCityDropdownOpen(!departureCityDropdownOpen)}
            className={`
              w-full px-4 py-3 text-left border rounded-xl transition-all duration-200
              border-neutral-200 bg-white hover:border-neutral-300
              focus:outline-none focus:border-black focus:ring-1 focus:ring-black
              flex items-center justify-between
            `}
          >
            <span className={hotelDepartureCity ? "text-neutral-900" : "text-neutral-400"}>
              {hotelDepartureCity ? getSelectedDepartureCityLabel() : "Ville de départ"}
            </span>
            <ChevronDown
              size={18}
              className={`text-neutral-400 transition-transform duration-200 ${
                departureCityDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {departureCityDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute z-50 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="max-h-48 overflow-y-auto">
                  {moroccanCities.length > 0 ? moroccanCities.map((city) => (
                    <button
                      key={city.value}
                      type="button"
                      className={`
                        w-full px-4 py-3 text-left transition-colors duration-150
                        ${hotelDepartureCity === city.value 
                          ? "bg-neutral-50 text-neutral-900 font-medium" 
                          : "text-neutral-700 hover:bg-neutral-50"
                        }
                      `}
                      onClick={() => {
                        setHotelDepartureCity(city.value)
                        setDepartureCityDropdownOpen(false)
                        setFormTouched(true)
                      }}
                    >
                      {city.label}
                    </button>
                  )) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      Aucune ville disponible
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Destination Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-normal text-neutral-700">
          Destination <span className="text-black">*</span>
        </label>
        <div className="relative" ref={destinationDropdownRef}>
          <button
            type="button"
            onClick={() => setDestinationDropdownOpen(!destinationDropdownOpen)}
            className={`
              w-full px-4 py-3 text-left border rounded-xl transition-all duration-200
              border-neutral-200 bg-white hover:border-neutral-300
              focus:outline-none focus:border-black focus:ring-1 focus:ring-black
              flex items-center justify-between
            `}
          >
            <span className={hotelDestination ? "text-neutral-900" : "text-neutral-400"}>
              {hotelDestination ? getSelectedDestinationLabel() : "Destination"}
            </span>
            <ChevronDown
              size={18}
              className={`text-neutral-400 transition-transform duration-200 ${
                destinationDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {destinationDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute z-50 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="max-h-48 overflow-y-auto">
                  {hotelDestinations.map((dest) => (
                    <button
                      key={dest.value}
                      type="button"
                      className={`
                        w-full px-4 py-3 text-left transition-colors duration-150
                        ${hotelDestination === dest.value 
                          ? "bg-neutral-50 text-neutral-900 font-medium" 
                          : "text-neutral-700 hover:bg-neutral-50"
                        }
                      `}
                      onClick={() => {
                        setHotelDestination(dest.value)
                        setDestinationDropdownOpen(false)
                        setFormTouched(true)
                      }}
                    >
                      {dest.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Check-in Date Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-normal text-neutral-700">
          Check-in <span className="text-black">*</span>
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setCheckinPickerOpen(!checkinPickerOpen)}
            className={`
              w-full px-4 py-3 border rounded-xl transition-all duration-200 text-left
              border-neutral-200 bg-white hover:border-neutral-300
              focus:outline-none focus:border-black focus:ring-1 focus:ring-black
              text-neutral-900 placeholder:text-neutral-400
              flex items-center justify-between
            `}
          >
            <span className={hotelDateRange.from ? "text-neutral-900" : "text-neutral-400"}>
              {hotelDateRange.from
                ? format(new Date(hotelDateRange.from + 'T12:00:00'), "dd/MM/yyyy")
                : "Choisir une date"
              }
            </span>
            <CalendarDays size={18} className="text-neutral-400" />
          </button>
          <AnimatePresence>
            {checkinPickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute z-50 mt-2 left-0"
              >
                <CustomCalendar
                  selected={selectedCheckinDateObj}
                  onSelect={(date) => {
                    if (date) {
                      const formattedDate = format(date, 'yyyy-MM-dd')
                      setHotelDateRange({ ...hotelDateRange, from: formattedDate })
                      setFormTouched(true)
                      setCheckinPickerOpen(false)
                    }
                  }}
                  disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Check-out Date Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-normal text-neutral-700">
          Check-out <span className="text-black">*</span>
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setCheckoutPickerOpen(!checkoutPickerOpen)}
            className={`
              w-full px-4 py-3 border rounded-xl transition-all duration-200 text-left
              border-neutral-200 bg-white hover:border-neutral-300
              focus:outline-none focus:border-black focus:ring-1 focus:ring-black
              text-neutral-900 placeholder:text-neutral-400
              flex items-center justify-between
            `}
          >
            <span className={hotelDateRange.to ? "text-neutral-900" : "text-neutral-400"}>
              {hotelDateRange.to
                ? format(new Date(hotelDateRange.to + 'T12:00:00'), "dd/MM/yyyy")
                : "Choisir une date"
              }
            </span>
            <CalendarDays size={18} className="text-neutral-400" />
          </button>
          <AnimatePresence>
            {checkoutPickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute z-50 mt-2 left-0"
              >
                <CustomCalendar
                  selected={selectedCheckoutDateObj}
                  onSelect={(date) => {
                    if (date) {
                      const formattedDate = format(date, 'yyyy-MM-dd')
                      setHotelDateRange({ ...hotelDateRange, to: formattedDate })
                      setFormTouched(true)
                      setCheckoutPickerOpen(false)
                    }
                  }}
                  disabled={(date) => {
                    const minDate = hotelDateRange.from ? startOfDay(new Date(hotelDateRange.from + 'T12:00:00')) : startOfDay(new Date())
                    return isBefore(startOfDay(date), minDate)
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Rooms Count Input */}
      <div className="space-y-2">
        <label className="block text-sm font-normal text-neutral-700">
          Chambres
        </label>
        <input
          type="number"
          value={roomsCount}
          onChange={(e) => {
            setRoomsCount(e.target.value)
            setFormTouched(true)
          }}
          min={1}
          max={5}
          className="
            w-full px-4 py-3 border border-neutral-200 bg-white rounded-xl
            focus:outline-none focus:border-black focus:ring-1 focus:ring-black
            hover:border-neutral-300 transition-all duration-200
            text-neutral-900 placeholder:text-neutral-400
          "
          placeholder="1"
        />
      </div>
    </>
  )
}