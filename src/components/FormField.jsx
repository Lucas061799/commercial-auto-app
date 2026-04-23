import { useRef } from 'react'

// ─── Helpers ────────────────────────────────────────────────
function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (!digits.length) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0,3)}) ${digits.slice(3)}`
  return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
}

function formatDateInput(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0,2)}/${digits.slice(2)}`
  return `${digits.slice(0,2)}/${digits.slice(2,4)}/${digits.slice(4)}`
}

// Shared field classes
const base = `w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-300
  transition-all duration-150 focus:outline-none`
const normal = `border-gray-200 hover:border-gray-300
  focus:border-[#A614C3]/50 focus:shadow-[0_0_0_3px_rgba(166,20,195,0.10)]`
const err    = `border-red-300 bg-red-50/40
  focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.10)]`

function Label({ text, required }) {
  if (!text) return null
  return (
    <label className="block text-[11px] font-bold text-gray-400 mb-1.5 tracking-widest uppercase">
      {text}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )
}
function ErrorMsg() {
  return (
    <p className="text-[10px] text-red-500 mt-1.5 flex items-center gap-1">
      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
      Required
    </p>
  )
}

// ─── Input ──────────────────────────────────────────────────
export function Input({ label, required, placeholder, type = 'text', value, onChange, className = '', error = false }) {
  const handleChange = (e) => {
    if (!onChange) return
    onChange(type === 'tel' ? formatPhone(e.target.value) : e.target.value)
  }
  return (
    <div className={className}>
      <Label text={label} required={required} />
      <input
        type={type === 'tel' ? 'text' : type}
        inputMode={type === 'tel' ? 'numeric' : undefined}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${base} ${error ? err : normal}`}
      />
      {error && <ErrorMsg />}
    </div>
  )
}

// ─── DateInput ──────────────────────────────────────────────
export function DateInput({ label, required, value, onChange, className = '', error = false }) {
  const pickerRef = useRef()

  const handlePickerChange = (e) => {
    if (!onChange || !e.target.value) return
    const [y, m, d] = e.target.value.split('-')
    onChange(`${m}/${d}/${y}`)
  }

  const pickerValue = (() => {
    if (!value || value.length < 10) return ''
    const [m, d, y] = value.split('/')
    if (!m || !d || !y || y.length !== 4) return ''
    return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`
  })()

  return (
    <div className={className}>
      <Label text={label} required={required} />
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          value={value || ''}
          onChange={e => onChange && onChange(formatDateInput(e.target.value))}
          placeholder="MM / DD / YYYY"
          maxLength={10}
          className={`${base} pr-10 ${error ? err : normal}`}
        />
        <button
          type="button"
          onClick={() => pickerRef.current?.showPicker?.() ?? pickerRef.current?.click()}
          className="absolute inset-y-0 right-0 flex items-center px-3 transition-colors"
          style={{ color: value ? '#A614C3' : '#CBD5E1' }}
          onMouseEnter={e => e.currentTarget.style.color = '#A614C3'}
          onMouseLeave={e => e.currentTarget.style.color = value ? '#A614C3' : '#CBD5E1'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
        </button>
        <input ref={pickerRef} type="date" value={pickerValue} onChange={handlePickerChange}
          className="absolute opacity-0 pointer-events-none" style={{ top:0,right:0,width:1,height:1 }} tabIndex={-1} />
      </div>
      {error && <ErrorMsg />}
    </div>
  )
}

// ─── Textarea ───────────────────────────────────────────────
export function Textarea({ label, required, placeholder, rows = 4, value, onChange, className = '', error = false }) {
  return (
    <div className={className}>
      <Label text={label} required={required} />
      <textarea
        value={value || ''}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`${base} resize-none ${error ? err : normal}`}
      />
      {error && <ErrorMsg />}
    </div>
  )
}

// ─── Select ─────────────────────────────────────────────────
export function Select({ label, required, options = [], value, onChange, placeholder = 'Select...', className = '', error = false }) {
  return (
    <div className={className}>
      <Label text={label} required={required} />
      <div className="relative">
        <select
          value={value || ''}
          onChange={e => onChange && onChange(e.target.value)}
          className={`${base} appearance-none pr-9 cursor-pointer ${value ? 'text-gray-800' : 'text-gray-400'} ${error ? err : normal}`}
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
      {error && <ErrorMsg />}
    </div>
  )
}

// ─── RadioGroup ─────────────────────────────────────────────
export function RadioGroup({ label, required, options = [], value, onChange, className = '' }) {
  return (
    <div className={className}>
      <Label text={label} required={required} />
      <div className="flex gap-2.5 flex-wrap">
        {options.map(opt => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange && onChange(opt)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-150"
              style={active ? {
                background: 'linear-gradient(88.09deg,rgba(92,46,212,0.08) 0%,rgba(166,20,195,0.08) 100%)',
                borderColor: '#A614C3',
                color: '#5C2ED4',
                boxShadow: '0 0 0 3px rgba(166,20,195,0.08)',
              } : {
                background: 'white',
                borderColor: '#E5E7EB',
                color: '#9CA3AF',
              }}
            >
              <div className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{ borderColor: active ? '#A614C3' : '#D1D5DB' }}>
                {active && <div className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'linear-gradient(88.09deg,#5C2ED4 0%,#A614C3 100%)' }} />}
              </div>
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Checkbox ───────────────────────────────────────────────
export function Checkbox({ label, checked, onChange, className = '' }) {
  return (
    <label className={`flex items-start gap-2.5 cursor-pointer group ${className}`}>
      <div
        className="w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all"
        style={checked
          ? { background: 'linear-gradient(88.09deg,#5C2ED4 0%,#A614C3 100%)', borderColor: '#A614C3' }
          : { borderColor: '#D1D5DB' }}
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

// ─── FormGrid ───────────────────────────────────────────────
export function FormGrid({ children, cols = 2, className = '' }) {
  const colClass = cols === 3 ? 'grid-cols-1 sm:grid-cols-3' : cols === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
  return (
    <div className={`grid ${colClass} gap-x-5 gap-y-4 ${className}`}>
      {children}
    </div>
  )
}

// ─── FieldCard — clean container for radio/toggle groups ────
export function FieldCard({ children, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {children}
    </div>
  )
}
