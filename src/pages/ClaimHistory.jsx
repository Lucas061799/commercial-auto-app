import { Input, Select, RadioGroup, FormGrid } from '../components/FormField'

const defaultClaim = () => ({
  id: Date.now(),
  dateOfLoss: '', payoutAmount: '',
  addressType: 'Auto Fill',
  descriptionOfLoss: '',
  driverOfLoss: '', claimStatus: '',
  lostAtFault: 'No',
})

const DRIVERS = ['Driver 1', 'Driver 2', 'Driver 3', 'Other']
const CLAIM_STATUSES = ['Open', 'Closed', 'Pending']

export default function ClaimHistory({ formData, updateFormData }) {
  const data = formData.claims || { hasClaims: undefined, claims: [] }
  const setClaims = (list) => updateFormData('claims', { claims: list })
  const setField = (idx, key) => (val) => {
    const updated = data.claims.map((c, i) => i === idx ? { ...c, [key]: val } : c)
    setClaims(updated)
  }

  return (
    <div className="w-full">
      <p className="text-xs text-gray-500 mb-5">List all claims in the past 3 years for all commercial auto policies.</p>

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-5">
        <RadioGroup
          label="Do You Have Any Claim History?"
          options={['Yes', 'No']}
          value={data.hasClaims}
          onChange={(val) => updateFormData('claims', { hasClaims: val, claims: val === 'Yes' ? [defaultClaim()] : [] })}
        />
      </div>

      {data.hasClaims === 'Yes' && data.claims.map((c, idx) => (
        <div key={c.id} className="bg-gray-50 rounded-xl p-5 mb-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-navy">Claim History #{idx + 1}</h3>
            {data.claims.length > 1 && (
              <button onClick={() => setClaims(data.claims.filter((_, i) => i !== idx))} className="text-xs text-red-400 hover:text-red-600">Remove</button>
            )}
          </div>
          <div className="space-y-4">
            <FormGrid>
              <Input label="Date Of Loss" placeholder="MM/DD/YYYY" value={c.dateOfLoss} onChange={setField(idx, 'dateOfLoss')} />
              <Input label="Payout Amount" placeholder="$0.00" value={c.payoutAmount} onChange={setField(idx, 'payoutAmount')} />
            </FormGrid>
            <RadioGroup
              label="Mailing Address Entry Type"
              options={['Auto Fill', 'Manual Entry']}
              value={c.addressType}
              onChange={setField(idx, 'addressType')}
            />
            <Input label="Description Of Loss" value={c.descriptionOfLoss} onChange={setField(idx, 'descriptionOfLoss')} placeholder="" />
            <FormGrid>
              <Select label="Driver Of Loss" options={DRIVERS} value={c.driverOfLoss} onChange={setField(idx, 'driverOfLoss')} />
              <Select label="Claim Status" options={CLAIM_STATUSES} value={c.claimStatus} onChange={setField(idx, 'claimStatus')} />
            </FormGrid>
            <RadioGroup
              label="Lost At Fault"
              options={['Yes', 'No']}
              value={c.lostAtFault}
              onChange={setField(idx, 'lostAtFault')}
            />
          </div>
        </div>
      ))}

      {data.hasClaims === 'Yes' && (
        <button
          onClick={() => setClaims([...data.claims, defaultClaim()])}
          className="flex items-center gap-2 text-xs font-semibold border border-dashed border-[#A614C3]/30 rounded-xl px-4 py-3 mb-2 hover:bg-[#FDF0FF] transition w-full justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="#5C2ED4" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
          </svg>
          <span className="text-gradient">Add Another Claim</span>
        </button>
      )}
    </div>
  )
}
