import { useRef, useState, useEffect } from 'react'

// Phone formatter — produces (555) 000-0000
function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0,3)}) ${digits.slice(3)}`
  return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
}

// Reusable input
export function Input({ label, required, placeholder, type = 'text', value, onChange, className = '', error = false }) {
  const handleChange = (e) => {
    if (!onChange) return
    if (type === 'tel') {
      onChange(formatPhone(e.target.value))
    } else {
      onChange(e.target.value)
    }
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-wide">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <input
        type={type === 'tel' ? 'text' : type}
        inputMode={type === 'tel' ? 'numeric' : undefined}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-300 bg-red-50/50 focus:ring-red-100 focus:border-red-400'
            : 'border-gray-200 bg-white focus:ring-[#7C3AED]/10 focus:border-[#7C3AED]/40 hover:border-gray-300'
        }`}
      />
      {error && <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1"><span>⚠</span> This field is required</p>}
    </div>
  )
}

// Date formatter — produces MM/DD/YYYY as user types
function formatDateInput(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEK_DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa']

// Custom calendar popup
function CalendarPopup({ value, onChange, onClose, anchorRef }) {
  const today = new Date()
  const parsed = (() => {
    if (!value || value.length < 10) return null
    const [m, d, y] = value.split('/')
    if (!m || !d || !y || y.length !== 4) return null
    const dt = new Date(+y, +m - 1, +d)
    return isNaN(dt.getTime()) ? null : dt
  })()

  const [viewYear, setViewYear] = useState(parsed ? parsed.getFullYear() : today.getFullYear())
  const [viewMonth, setViewMonth] = useState(parsed ? parsed.getMonth() : today.getMonth())
  const popupRef = useRef()

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target) &&
          anchorRef.current && !anchorRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose, anchorRef])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const isSelected = (day) => parsed && parsed.getFullYear() === viewYear && parsed.getMonth() === viewMonth && parsed.getDate() === day
  const isToday = (day) => today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day

  const selectDay = (day) => {
    const m = String(viewMonth + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    onChange(`${m}/${d}/${viewYear}`)
    onClose()
  }

  const selectToday = () => {
    const m = String(today.getMonth() + 1).padStart(2, '0')
    const d = String(today.getDate()).padStart(2, '0')
    onChange(`${m}/${d}/${today.getFullYear()}`)
    onClose()
  }

  return (
    <div
      ref={popupRef}
      className="absolute right-0 top-full mt-2 z-50 rounded-2xl p-4 select-none"
      style={{
        background: 'white',
        border: '1px solid #E5E7EB',
        boxShadow: '0 12px 40px rgba(92,46,212,0.15), 0 2px 8px rgba(0,0,0,0.06)',
        width: '272px',
      }}
    >
      {/* Month / Year navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition hover:bg-gray-100"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <span className="text-[13px] font-bold text-gray-800">{MONTHS[viewMonth]} {viewYear}</span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition hover:bg-gray-100"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEK_DAYS.map(d => (
          <span key={d} className="text-center text-[10px] font-bold text-gray-400 pb-1.5">{d}</span>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          const selected = day && isSelected(day)
          const tod = day && isToday(day)
          return (
            <button
              key={i}
              type="button"
              disabled={!day}
              onClick={() => day && selectDay(day)}
              className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-xs font-medium transition-all ${
                !day ? 'invisible' :
                selected ? 'text-white font-bold scale-105' :
                tod ? 'font-bold hover:bg-gray-50' :
                'text-gray-700 hover:bg-gray-100'
              }`}
              style={
                selected ? { background: 'linear-gradient(88.09deg,#5C2ED4 0%,#A614C3 100%)', boxShadow: '0 2px 8px rgba(92,46,212,0.35)' } :
                tod ? { color: '#7C3AED', border: '1.5px solid #7C3AED' } :
                {}
              }
            >
              {day}
            </button>
          )
        })}
      </div>

    </div>
  )
}

// Date input with auto-format + custom calendar picker
export function DateInput({ label, required, value, onChange, className = '', error = false }) {
  const [showCal, setShowCal] = useState(false)
  const wrapRef = useRef()

  const handleTextChange = (e) => {
    if (!onChange) return
    onChange(formatDateInput(e.target.value))
  }

  return (
    <div className={`${className} relative`} ref={wrapRef}>
      {label && (
        <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-wide">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          value={value || ''}
          onChange={handleTextChange}
          placeholder="MM / DD / YYYY"
          maxLength={10}
          className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 transition-all pr-10 ${
            error
              ? 'border-red-300 bg-red-50/50 focus:ring-red-100 focus:border-red-400'
              : 'border-gray-200 bg-white focus:ring-[#7C3AED]/10 focus:border-[#7C3AED]/40 hover:border-gray-300'
          }`}
        />
        {/* Calendar icon */}
        <button
          type="button"
          onClick={() => setShowCal(v => !v)}
          className="absolute inset-y-0 right-0 flex items-center px-3 transition-colors"
          style={{ color: showCal ? '#7C3AED' : value ? '#7C3AED' : '#9CA3AF' }}
          onMouseEnter={e => e.currentTarget.style.color = '#7C3AED'}
          onMouseLeave={e => e.currentTarget.style.color = (showCal || value) ? '#7C3AED' : '#9CA3AF'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
        </button>
      </div>

      {/* Custom calendar popup */}
      {showCal && (
        <CalendarPopup
          value={value}
          onChange={(v) => { onChange && onChange(v) }}
          onClose={() => setShowCal(false)}
          anchorRef={wrapRef}
        />
      )}

      {error && <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1"><span>⚠</span> This field is required</p>}
    </div>
  )
}

// Textarea
export function Textarea({ label, required, placeholder, rows = 4, value, onChange, className = '', error = false }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-wide">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        value={value || ''}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 transition-all resize-none ${
          error
            ? 'border-red-300 bg-red-50/50 focus:ring-red-100 focus:border-red-400'
            : 'border-gray-200 bg-white focus:ring-[#7C3AED]/10 focus:border-[#7C3AED]/40 hover:border-gray-300'
        }`}
      />
      {error && <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1"><span>⚠</span> This field is required</p>}
    </div>
  )
}

// Select / Dropdown
export function Select({ label, required, options = [], value, onChange, placeholder = 'Select...', className = '', error = false }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-wide">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value || ''}
          onChange={e => onChange && onChange(e.target.value)}
          className={`w-full border rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all appearance-none bg-white pr-9 cursor-pointer ${
            value ? 'text-gray-800' : 'text-gray-400'
          } ${
            error
              ? 'border-red-300 bg-red-50/50 focus:ring-red-100 focus:border-red-400'
              : 'border-gray-200 focus:ring-[#7C3AED]/10 focus:border-[#7C3AED]/40 hover:border-gray-300'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
      {error && <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1"><span>⚠</span> This field is required</p>}
    </div>
  )
}

// Radio Group
export function RadioGroup({ label, required, options = [], value, onChange, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-[13px] font-semibold text-gray-600 mb-2.5 tracking-wide">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <div className="flex gap-4">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange && onChange(opt)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs font-medium ${
              value === opt
                ? 'border-[#5C2ED4] text-[#5C2ED4]'
                : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
            }`}
            style={value === opt ? { background: 'linear-gradient(88.09deg, rgba(92,46,212,0.08) 0%, rgba(166,20,195,0.08) 100%)' } : {}}
          >
            <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              value === opt ? 'border-[#A614C3]' : 'border-gray-300'
            }`}>
              {value === opt && <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0%, #A614C3 100%)' }} />}
            </div>
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

// Checkbox
export function Checkbox({ label, checked, onChange, className = '' }) {
  return (
    <label className={`flex items-start gap-2.5 cursor-pointer group ${className}`}>
      <div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${
          checked ? 'border-[#A614C3]' : 'border-gray-300 group-hover:border-[#5C2ED4]/40'
        }`}
        style={checked ? { background: 'linear-gradient(88.09deg, #5C2ED4 0%, #A614C3 100%)' } : {}}
        onClick={() => onChange && onChange(!checked)}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="text-xs text-gray-600">{label}</span>
    </label>
  )
}

// Two-column grid
export function FormGrid({ children, cols = 2, className = '' }) {
  const colClass = cols === 3 ? 'grid-cols-3' : cols === 1 ? 'grid-cols-1' : 'grid-cols-2'
  return (
    <div className={`grid ${colClass} gap-x-6 gap-y-5 ${className}`}>
      {children}
    </div>
  )
}
