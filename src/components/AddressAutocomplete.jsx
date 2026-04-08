import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * AddressAutocomplete
 * Uses OpenStreetMap Nominatim (free, no API key).
 * onSelect({ address, suite, city, state, zip }) fills parent fields.
 */
export default function AddressAutocomplete({ value, onChange, onSelect, label = 'Address', required, error }) {
  const [query, setQuery] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const debounceRef = useRef(null)
  const containerRef = useRef(null)

  // Keep query in sync if parent changes value externally
  useEffect(() => { setQuery(value || '') }, [value])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const search = useCallback(async (q) => {
    if (!q || q.length < 3) { setSuggestions([]); setOpen(false); return }
    setLoading(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=6&countrycodes=us`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const data = await res.json()
      setSuggestions(data)
      setOpen(data.length > 0)
      setHighlighted(-1)
    } catch {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    onChange && onChange(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 350)
  }

  const handleSelect = (item) => {
    const a = item.address || {}
    const road     = a.road || a.pedestrian || a.footway || ''
    const houseNo  = a.house_number ? `${a.house_number} ` : ''
    const street   = `${houseNo}${road}`.trim()
    const city     = a.city || a.town || a.village || a.county || ''
    const state    = a.state || ''
    const zip      = a.postcode || ''

    setQuery(street)
    setOpen(false)
    setSuggestions([])
    onSelect && onSelect({ address: street, city, state, zip })
  }

  const handleKeyDown = (e) => {
    if (!open) return
    if (e.key === 'ArrowDown')  { e.preventDefault(); setHighlighted(h => Math.min(h + 1, suggestions.length - 1)) }
    if (e.key === 'ArrowUp')    { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)) }
    if (e.key === 'Enter' && highlighted >= 0) { e.preventDefault(); handleSelect(suggestions[highlighted]) }
    if (e.key === 'Escape')     { setOpen(false) }
  }

  const focusStyle = {
    outline: 'none',
    borderColor: '#A614C3',
    boxShadow: '0 0 0 3px rgba(166,20,195,0.12)',
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (suggestions.length > 0) setOpen(true) }}
          placeholder="Start typing an address…"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 transition-all"
          style={error ? { borderColor: '#EF4444', outline: 'none' } : {}}
          onFocusCapture={e => Object.assign(e.target.style, focusStyle)}
          onBlurCapture={e => { e.target.style.boxShadow = ''; e.target.style.borderColor = error ? '#EF4444' : '#e5e7eb'; e.target.style.outline = '' }}
        />
        {/* Search / loading icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {loading
            ? <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            : <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
              </svg>
          }
        </div>
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((item, idx) => {
            const a = item.address || {}
            const road    = a.road || a.pedestrian || a.footway || ''
            const houseNo = a.house_number ? `${a.house_number} ` : ''
            const city    = a.city || a.town || a.village || ''
            const state   = a.state || ''
            const zip     = a.postcode || ''
            const line1   = `${houseNo}${road}`.trim() || item.display_name.split(',')[0]
            const line2   = [city, state, zip].filter(Boolean).join(', ')

            return (
              <button
                key={item.place_id}
                type="button"
                onMouseDown={() => handleSelect(item)}
                className="w-full text-left px-4 py-2.5 flex items-start gap-3 transition-all"
                style={idx === highlighted
                  ? { background: 'linear-gradient(88.09deg, rgba(92,46,212,0.07) 0%, rgba(166,20,195,0.07) 100%)' }
                  : { background: 'white' }
                }
                onMouseEnter={() => setHighlighted(idx)}
              >
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{line1}</p>
                  {line2 && <p className="text-[10px] text-gray-400 mt-0.5">{line2}</p>}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}
