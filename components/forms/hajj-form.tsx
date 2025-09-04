import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday, isBefore, startOfDay } from "date-fns"
import { fr } from "date-fns/locale"

type Props = {
  selectedCity: string
  setSelectedCity: (val: string) => void
  selectedDate: string
  setSelectedDate: (val: string) => void
  moroccanCities: { value: string; label: string }[]
  formTouched: boolean
  setFormTouched: (val: boolean) => void
  cityDropdownOpen: boolean
  setCityDropdownOpen: (val: boolean) => void
  cityDropdownRef: React.RefObject<HTMLDivElement>
  isMobile: boolean
  numVoyageurs: number
  setNumVoyageurs: (val: number) => void
}

const CustomCalendar = ({ selected, onSelect, disabled }) => {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date())
  
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Add padding days for proper grid layout
  const startDay = monthStart.getDay()
  const paddingDays = Array(startDay === 0 ? 6 : startDay - 1).fill(null)
  
  const allDays = [...paddingDays, ...days]
  
  const weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
  
  const handleDateSelect = (date) => {
    // Fix timezone issue by using local date
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    onSelect(localDate)
  }
  
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-neutral-200 w-80">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={16} className="text-neutral-600" />
        </button>
        
        <h3 className="text-lg font-semibold text-neutral-900">
          {format(currentMonth, 'MMMM yyyy', { locale: fr })}
        </h3>
        
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ChevronRight size={16} className="text-neutral-600" />
        </button>
      </div>
      
      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-neutral-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((day, index) => {
          if (!day) {
            return <div key={index} className="aspect-square" />
          }
          
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
      
      {/* Today button */}
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

export default function HajjForm({
  selectedCity,
  setSelectedCity,
  selectedDate,
  setSelectedDate,
  moroccanCities,
  formTouched,
  setFormTouched,
  cityDropdownOpen,
  setCityDropdownOpen,
  cityDropdownRef,
  isMobile,
  numVoyageurs = 1,
  setNumVoyageurs = () => {},
}: Props) {
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  
  const getSelectedCityLabel = () =>
    moroccanCities.find((city) => city.value === selectedCity)?.label || ""

  // Convert selectedDate string to Date object for DatePicker
  const selectedDateObj = selectedDate ? new Date(selectedDate + 'T12:00:00') : undefined

  return (
    <>
      {/* Departure City Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-normal text-neutral-700 flex items-center gap-1">
          Ville de départ
          <span className="text-black">*</span>
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
            <span className={selectedCity ? "text-neutral-900" : "text-neutral-400"}>
              {selectedCity ? getSelectedCityLabel() : "Choisir une ville"}
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
                <div className="max-h-48 overflow-y-auto">
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

      {/* Date Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-normal text-neutral-700 flex items-center gap-1">
          Date de départ
          <span className="text-black">*</span>
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
            <span className={selectedDate ? "text-neutral-900" : "text-neutral-400"}>
              {selectedDate
                ? format(new Date(selectedDate + 'T12:00:00'), "dd/MM/yyyy")
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
                  selected={selectedDateObj}
                  onSelect={(date) => {
                    if (date) {
                      // Format date as YYYY-MM-DD to avoid timezone issues
                      const formattedDate = format(date, 'yyyy-MM-dd')
                      setSelectedDate(formattedDate)
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

      {/* Number of Voyageurs */}
      <div className="space-y-2">
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
          </div>
        </div>
      </div>
    </>
  )
}