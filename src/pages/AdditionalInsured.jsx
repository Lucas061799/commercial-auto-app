import { Input, RadioGroup, FormGrid } from '../components/FormField'
import AddressAutocomplete from '../components/AddressAutocomplete'

const defaultInsured = () => ({
  id: Date.now(),
  name: '',
  address: '', suite: '',
  city: '', state: '', zip: '',
  waiverVehicle: 'Vehicle 1',
})

const BLANKET_OPTIONS = [
  { key: 'blanketAI',  label: 'Blanket Additional Insured' },
  { key: 'blanketWOS', label: 'Blanket Waiver of Subrogation' },
]

export default function AdditionalInsured({ formData, updateFormData }) {
  const data = formData.additionalInsured || { hasAdditional: undefined, insureds: [] }
  const blanket = formData.blanket || {}
  const anyBlanket = BLANKET_OPTIONS.some(o => blanket[o.key])

  const toggleBlanket = (key) => updateFormData('blanket', { [key]: !blanket[key] })

  const setInsureds = (list) => updateFormData('additionalInsured', { insureds: list })
  const setField = (idx, key) => (val) => {
    const updated = data.insureds.map((item, i) => i === idx ? { ...item, [key]: val } : item)
    setInsureds(updated)
  }
  const handleAddressSelect = (idx) => ({ address, city, state, zip }) => {
    const updated = data.insureds.map((item, i) => i === idx ? { ...item, address, city, state, zip } : item)
    setInsureds(updated)
  }

  return (
    <div className="w-full">

      {/* Always-visible question */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
        <RadioGroup
          label="Are there any additional insureds to add?"
          options={['Yes', 'No']}
          value={data.hasAdditional}
          onChange={(val) => {
            updateFormData('additionalInsured', {
              hasAdditional: val,
              insureds: val === 'Yes' && data.insureds.length === 0 ? [defaultInsured()] : val === 'No' ? [] : data.insureds,
            })
          }}
        />
      </div>

      {/* Blanket coverages card — only after Yes */}
      {data.hasAdditional === 'Yes' && (
        <div className="rounded-2xl mb-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8F6FF 0%, #F0F9F7 100%)', border: '1px solid rgba(92,46,212,0.1)' }}>
          <div className="px-5 py-4">
            <p className="text-[13px] font-semibold text-navy mb-3">Do you require any of the following blanket coverages?</p>
            <div className="flex flex-wrap gap-3">
              {BLANKET_OPTIONS.map(({ key, label }) => {
                const checked = !!blanket[key]
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleBlanket(key)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border text-xs font-medium transition-all ${
                      checked ? 'border-[#5C2ED4] text-[#5C2ED4]' : 'border-gray-200 text-gray-500 hover:border-gray-300 bg-white'
                    }`}
                    style={checked ? { background: 'linear-gradient(88.09deg, rgba(92,46,212,0.08) 0%, rgba(166,20,195,0.08) 100%)' } : {}}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded border-2 flex items-center justify-center shrink-0 transition-all"
                      style={checked
                        ? { background: 'linear-gradient(88.09deg, #5C2ED4 0%, #A614C3 100%)', borderColor: 'transparent' }
                        : { borderColor: '#d1d5db', background: 'white' }}
                    >
                      {checked && (
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    {label}
                  </button>
                )
              })}
            </div>
            {anyBlanket && (
              <div className="mt-3 flex items-start gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(92,46,212,0.06)', border: '1px solid rgba(92,46,212,0.12)' }}>
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="url(#infoG)" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="infoG" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5C2ED4"/><stop offset="100%" stopColor="#A614C3"/>
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-[11px] leading-relaxed text-gradient font-medium">
                  Since you've selected blanket coverage, the specific insured details below are optional — you may leave them blank if they apply broadly.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {data.hasAdditional === 'Yes' && data.insureds.map((ins, idx) => (
        <div key={ins.id} className="bg-gray-50 rounded-xl p-5 mb-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-navy">Additional Insured #{idx + 1}</h3>
            {data.insureds.length > 1 && (
              <button onClick={() => setInsureds(data.insureds.filter((_, i) => i !== idx))} className="text-xs text-red-400 hover:text-red-600">Remove</button>
            )}
          </div>
          <div className="space-y-4">
            <Input label="Name" value={ins.name} onChange={setField(idx, 'name')} />
            <FormGrid>
              <AddressAutocomplete
                label="Address"
                value={ins.address}
                onChange={setField(idx, 'address')}
                onSelect={handleAddressSelect(idx)}
              />
              <Input label="Suite/Apt/Building" value={ins.suite} onChange={setField(idx, 'suite')} />
            </FormGrid>
            <FormGrid cols={3}>
              <Input label="City" value={ins.city} onChange={setField(idx, 'city')} />
              <Input label="State" value={ins.state} onChange={setField(idx, 'state')} />
              <Input label="Zip" value={ins.zip} onChange={setField(idx, 'zip')} />
            </FormGrid>
            <div>
              <p className="text-[13px] font-semibold text-gray-600 mb-2.5 tracking-wide">Waiver of Subrogation?</p>
              <RadioGroup
                options={['Yes', 'No']}
                value={ins.waiverVehicle}
                onChange={setField(idx, 'waiverVehicle')}
              />
            </div>
          </div>
        </div>
      ))}

      {data.hasAdditional === 'Yes' && data.insureds.length > 0 && (
        <button
          onClick={() => setInsureds([...data.insureds, defaultInsured()])}
          className="flex items-center gap-2 text-xs font-semibold border border-dashed border-[#A614C3]/30 rounded-xl px-4 py-3 mb-2 add-another-btn transition w-full justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="#5C2ED4" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
          </svg>
          <span className="text-gradient">Add Another</span>
        </button>
      )}
    </div>
  )
}
