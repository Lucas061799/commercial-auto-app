// Reusable input
export function Input({ label, required, placeholder, type = 'text', value, onChange, className = '', error = false }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-wide">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange && onChange(e.target.value)}
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
            style={value === opt ? { background: 'rgba(92,46,212,0.08)' } : {}}
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
