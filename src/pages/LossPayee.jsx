import { Input, RadioGroup, FormGrid } from '../components/FormField'

const defaultPayee = () => ({
  id: Date.now(),
  name: '', additionalInterest: 'No',
  addressType: 'Auto Fill',
  search: '', address: '', suite: '',
  city: '', state: '', zip: '',
  vehicle: 'Vehicle 1',
})

export default function LossPayee({ formData, updateFormData }) {
  const data = formData.lossPayee || { hasPayee: undefined, payees: [] }
  const setPayees = (list) => updateFormData('lossPayee', { payees: list })
  const setField = (idx, key) => (val) => {
    const updated = data.payees.map((item, i) => i === idx ? { ...item, [key]: val } : item)
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
            <RadioGroup
              label="Address Entry Type"
              options={['Auto Fill', 'Manual Entry']}
              value={p.addressType}
              onChange={setField(idx, 'addressType')}
            />
            {p.addressType === 'Auto Fill' && (
              <Input label="Search" value={p.search} onChange={setField(idx, 'search')} />
            )}
            <FormGrid>
              <Input label="Address" value={p.address} onChange={setField(idx, 'address')} />
              <Input label="Suite/Apt/Building" value={p.suite} onChange={setField(idx, 'suite')} />
            </FormGrid>
            <FormGrid cols={3}>
              <Input label="City" value={p.city} onChange={setField(idx, 'city')} />
              <Input label="State" value={p.state} onChange={setField(idx, 'state')} />
              <Input label="Zip" value={p.zip} onChange={setField(idx, 'zip')} />
            </FormGrid>
            <div>
              <p className="text-[11px] font-semibold text-gray-600 mb-2.5 tracking-wide">Check All The Vehicles That Applies To This Payee</p>
              <RadioGroup
                options={Array.from({ length: Math.max(1, (formData.vehicles?.vehicles || []).length) }, (_, i) => `Vehicle ${i + 1}`)}
                value={p.vehicle}
                onChange={setField(idx, 'vehicle')}
              />
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
