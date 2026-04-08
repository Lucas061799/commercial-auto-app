import { Input, RadioGroup, FormGrid } from '../components/FormField'

const defaultInsured = () => ({
  id: Date.now(),
  name: '', addressType: 'Auto Fill',
  search: '', address: '', suite: '',
  city: '', state: '', zip: '',
  waiverVehicle: 'Vehicle 1',
})

export default function AdditionalInsured({ formData, updateFormData }) {
  const data = formData.additionalInsured || { hasAdditional: undefined, insureds: [] }
  const setInsureds = (list) => updateFormData('additionalInsured', { insureds: list })
  const setField = (idx, key) => (val) => {
    const updated = data.insureds.map((item, i) => i === idx ? { ...item, [key]: val } : item)
    setInsureds(updated)
  }

  return (
    <div className="w-full">
      {data.insureds.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
          <RadioGroup
            label="Are there any additional insureds to add?"
            options={['Yes', 'No']}
            value={data.hasAdditional}
            onChange={(val) => {
              updateFormData('additionalInsured', { hasAdditional: val, insureds: val === 'Yes' ? [defaultInsured()] : [] })
            }}
          />
        </div>
      )}

      {data.insureds.map((ins, idx) => (
        <div key={ins.id} className="bg-gray-50 rounded-xl p-5 mb-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-navy">Additional Insured #{idx + 1}</h3>
            {data.insureds.length > 1 && (
              <button onClick={() => setInsureds(data.insureds.filter((_, i) => i !== idx))} className="text-xs text-red-400 hover:text-red-600">Remove</button>
            )}
          </div>
          <div className="space-y-4">
            <Input label="Name" value={ins.name} onChange={setField(idx, 'name')} />
            <RadioGroup
              label="Address Entry Type"
              options={['Auto Fill', 'Manual Entry']}
              value={ins.addressType}
              onChange={setField(idx, 'addressType')}
            />
            {ins.addressType === 'Auto Fill' && (
              <Input label="Search" value={ins.search} onChange={setField(idx, 'search')} />
            )}
            <FormGrid>
              <Input label="Address" value={ins.address} onChange={setField(idx, 'address')} />
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

      {data.insureds.length > 0 && (
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
