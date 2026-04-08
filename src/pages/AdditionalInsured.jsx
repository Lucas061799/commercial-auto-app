import { useState } from 'react'
import { Input, RadioGroup, FormGrid } from '../components/FormField'
import AddressAutocomplete from '../components/AddressAutocomplete'

const defaultInsured = () => ({
  id: Date.now(),
  name: '',
  address: '', suite: '',
  city: '', state: '', zip: '',
  waiverSubrogation: '',
  sameAsApplicant: false,
})

const BLANKET_OPTIONS = [
  { key: 'blanketAI',  label: 'Blanket Additional Insured',    desc: 'Applies coverage broadly to all qualifying parties' },
  { key: 'blanketWOS', label: 'Blanket Waiver of Subrogation', desc: 'Waives subrogation rights across all covered parties' },
]

function InsuredCard({ ins, idx, total, anyBlanket, blanketWOS, applicant, onField, onAddressSelect, onRemove }) {
  const [open, setOpen] = useState(!anyBlanket)

  const applyApplicantAddress = (checked) => {
    if (checked && applicant) {
      onField('address')(applicant.address || '')
      onField('city')(applicant.city || '')
      onField('state')(applicant.state || '')
      onField('zip')(applicant.zip || '')
    } else {
      onField('address')('')
      onField('city')('')
      onField('state')('')
      onField('zip')('')
    }
    onField('sameAsApplicant')(checked)
  }

  return (
    <div className="rounded-xl border mb-3 overflow-hidden transition-all" style={{ borderColor: anyBlanket ? 'rgba(92,46,212,0.12)' : '#e5e7eb', background: anyBlanket ? 'rgba(248,246,255,0.5)' : '#f9fafb' }}>
      {/* Accordion header */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-navy">Additional Insured #{idx + 1}</span>
          {ins.name && <span className="text-xs text-gray-400 font-normal">— {ins.name}</span>}
          {anyBlanket && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0%, #A614C3 100%)' }}>
              OPTIONAL
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {total > 1 && (
            <span
              onClick={e => { e.stopPropagation(); onRemove() }}
              className="text-[10px] text-red-400 hover:text-red-600 cursor-pointer"
            >
              Remove
            </span>
          )}
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
          <div className="pt-4">
            <Input label="Name" value={ins.name} onChange={onField('name')} placeholder="Company or individual name" />
          </div>

          {/* Same as applicant toggle */}
          {applicant?.address && (
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <div
                onClick={() => applyApplicantAddress(!ins.sameAsApplicant)}
                className="w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0"
                style={ins.sameAsApplicant
                  ? { background: 'linear-gradient(88.09deg, #5C2ED4 0%, #A614C3 100%)', borderColor: 'transparent' }
                  : { borderColor: '#d1d5db', background: 'white' }}
              >
                {ins.sameAsApplicant && (
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10">
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-xs text-gray-500">Same as applicant address
                <span className="ml-1 text-gray-400">({applicant.address}{applicant.city ? `, ${applicant.city}` : ''})</span>
              </span>
            </label>
          )}

          <FormGrid>
            <AddressAutocomplete
              label="Address"
              value={ins.address}
              onChange={v => { onField('sameAsApplicant')(false); onField('address')(v) }}
              onSelect={({ address, city, state, zip }) => {
                onField('sameAsApplicant')(false)
                onAddressSelect({ address, city, state, zip })
              }}
            />
            <Input label="Suite/Apt/Building" value={ins.suite} onChange={onField('suite')} />
          </FormGrid>
          <FormGrid cols={3}>
            <Input label="City" value={ins.city} onChange={onField('city')} />
            <Input label="State" value={ins.state} onChange={onField('state')} />
            <Input label="Zip" value={ins.zip} onChange={onField('zip')} />
          </FormGrid>

          {/* Waiver — hide or pre-filled if blanket WOS selected */}
          {blanketWOS ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(92,46,212,0.05)', border: '1px solid rgba(92,46,212,0.1)' }}>
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" stroke="url(#wosCheck)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs><linearGradient id="wosCheck" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#5C2ED4"/><stop offset="100%" stopColor="#A614C3"/></linearGradient></defs>
              </svg>
              <p className="text-[11px] text-gradient font-medium">Waiver of Subrogation covered by blanket selection</p>
            </div>
          ) : (
            <RadioGroup
              label="Waiver of Subrogation?"
              options={['Yes', 'No']}
              value={ins.waiverSubrogation}
              onChange={onField('waiverSubrogation')}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default function AdditionalInsured({ formData, updateFormData }) {
  const data = formData.additionalInsured || { hasAdditional: undefined, insureds: [] }
  const blanket = formData.blanket || {}
  const anyBlanket = BLANKET_OPTIONS.some(o => blanket[o.key])
  const blanketWOS = !!blanket.blanketWOS
  const applicant = formData.applicant || null

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

      {/* Always-visible Yes/No */}
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

      {data.hasAdditional === 'Yes' && (
        <>
          {/* Blanket coverages */}
          <div className="rounded-2xl mb-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8F6FF 0%, #F0F9F7 100%)', border: '1px solid rgba(92,46,212,0.1)' }}>
            <div className="px-5 py-4">
              <p className="text-[13px] font-semibold text-navy mb-1">Do you require any of the following blanket coverages?</p>
              <p className="text-[11px] text-gray-400 mb-3">Select all that apply — both can be chosen simultaneously.</p>
              <div className="flex flex-wrap gap-3">
                {BLANKET_OPTIONS.map(({ key, label, desc }) => {
                  const checked = !!blanket[key]
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleBlanket(key)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
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
                      <div>
                        <p>{label}</p>
                        <p className="text-[10px] text-gray-400 font-normal mt-0.5">{desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {anyBlanket && (
                <div className="mt-3 flex items-start gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(92,46,212,0.06)', border: '1px solid rgba(92,46,212,0.12)' }}>
                  <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="url(#infoG)" strokeWidth="2" strokeLinecap="round"/>
                    <defs><linearGradient id="infoG" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#5C2ED4"/><stop offset="100%" stopColor="#A614C3"/></linearGradient></defs>
                  </svg>
                  <p className="text-[11px] leading-relaxed text-gradient font-medium">
                    Blanket coverage applies broadly — the specific insured details below are <strong>optional</strong>. Expand each card only if you need to name specific parties.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Individual insured cards */}
          {data.insureds.map((ins, idx) => (
            <InsuredCard
              key={ins.id}
              ins={ins}
              idx={idx}
              total={data.insureds.length}
              anyBlanket={anyBlanket}
              blanketWOS={blanketWOS}
              applicant={applicant}
              onField={setField(idx)}
              onAddressSelect={handleAddressSelect(idx)}
              onRemove={() => setInsureds(data.insureds.filter((_, i) => i !== idx))}
            />
          ))}

          <button
            onClick={() => setInsureds([...data.insureds, defaultInsured()])}
            className="flex items-center gap-2 text-xs font-semibold border border-dashed border-[#A614C3]/30 rounded-xl px-4 py-3 mb-2 add-another-btn transition w-full justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="#5C2ED4" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
            </svg>
            <span className="text-gradient">Add Another</span>
          </button>
        </>
      )}
    </div>
  )
}
