import { Input, RadioGroup, FormGrid } from '../components/FormField'
import AddressAutocomplete from '../components/AddressAutocomplete'

const defaultPayee = () => ({
  id: Date.now(),
  name: '', additionalInterest: 'No',
  address: '', suite: '',
  city: '', state: '', zip: '',
  vehicles: [],
})

export default function LossPayee({ formData, updateFormData }) {
  const data = formData.lossPayee || { hasPayee: undefined, payees: [] }
  const setPayees = (list) => updateFormData('lossPayee', { payees: list })
  const setField = (idx, key) => (val) => {
    const updated = data.payees.map((item, i) => i === idx ? { ...item, [key]: val } : item)
    setPayees(updated)
  }
  const handleAddressSelect = (idx) => ({ address, city, state, zip }) => {
    const updated = data.payees.map((item, i) => i === idx ? { ...item, address, city, state, zip } : item)
    setPayees(updated)
  }

  return (
    <div className="w-full">
      {data.payees.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
          <RadioGroup
            label="Are there any loss payees or lienholders?"
            options={['Yes', 'No']}
            value={data.hasPayee}
            onChange={(val) => updateFormData('lossPayee', { hasPayee: val, payees: val === 'Yes' ? [defaultPayee()] : [] })}
          />
        </div>
      )}

      {data.payees.map((p, idx) => (
        <div key={p.id} className="bg-gray-50 rounded-xl p-5 mb-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-navy">Loss Payee #{idx + 1}</h3>
            {data.payees.length > 1 && (
              <button onClick={() => setPayees(data.payees.filter((_, i) => i !== idx))} className="text-xs text-red-400 hover:text-red-600">Remove</button>
            )}
          </div>
          <div className="space-y-4">
            <Input label="Payee Name" value={p.name} onChange={setField(idx, 'name')} />
            <RadioGroup
              label="Additional Interest"
              options={['Yes', 'No']}
              value={p.additionalInterest}
              onChange={setField(idx, 'additionalInterest')}
            />
            <FormGrid>
              <AddressAutocomplete
                label="Address"
                value={p.address}
                onChange={setField(idx, 'address')}
                onSelect={handleAddressSelect(idx)}
              />
              <Input label="Suite/Apt/Building" value={p.suite} onChange={setField(idx, 'suite')} />
            </FormGrid>
            <FormGrid cols={3}>
              <Input label="City" value={p.city} onChange={setField(idx, 'city')} />
              <Input label="State" value={p.state} onChange={setField(idx, 'state')} />
              <Input label="Zip" value={p.zip} onChange={setField(idx, 'zip')} />
            </FormGrid>
            <div>
              <p className="text-[11px] font-semibold text-gray-600 mb-2.5 tracking-wide">Check All The Vehicles That Applies To This Payee</p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: Math.max(1, (formData.vehicles?.vehicles || []).length) }, (_, i) => `Vehicle ${i + 1}`).map(v => {
                  const selected = (p.vehicles || []).includes(v)
                  const toggleVehicle = () => {
                    const current = p.vehicles || []
                    const next = selected ? current.filter(x => x !== v) : [...current, v]
                    setField(idx, 'vehicles')(next)
                  }
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={toggleVehicle}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all"
                      style={selected ? {
                        background: 'linear-gradient(88.09deg, rgba(92,46,212,0.08) 0%, rgba(166,20,195,0.08) 100%) padding-box, linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%) border-box',
                        border: '1.5px solid transparent',
                        color: '#5C2ED4',
                      } : {
                        background: 'white',
                        border: '1.5px solid #E5E7EB',
                        color: '#6B7280',
                      }}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border transition-all"
                        style={selected ? {
                          background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)',
                          borderColor: 'transparent',
                        } : {
                          background: 'white',
                          borderColor: '#D1D5DB',
                        }}
                      >
                        {selected && (
                          <svg className="w-2.5 h-2.5" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                          </svg>
                        )}
                      </span>
                      {v}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ))}

      {data.payees.length > 0 && (
        <button
          onClick={() => setPayees([...data.payees, defaultPayee()])}
          className="flex items-center gap-2 text-xs font-semibold border border-dashed border-[#A614C3]/30 rounded-xl px-4 py-3 mb-2 add-another-btn transition w-full justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="#5C2ED4" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
          </svg>
          <span className="text-gradient">Add More</span>
        </button>
      )}
    </div>
  )
}
