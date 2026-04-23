import { Select, Input, RadioGroup, FormGrid } from '../components/FormField'

const BIPD_OPTIONS = ['$10/20', '$15/30', '$25/50', '$30/60', '$50/100']
const UMBI_OPTIONS = ['No Coverage', '$10/20', '$15/30', '$25/50', '$30/60']
const MEDPAY_OPTIONS = ['No Coverage', '$500', '$1,000', '$2,000', '$5,000']
const PIP_OPTIONS = ['No Coverage', '$2,500', '$5,000', '$10,000']
const RENTAL_OPTIONS = [
  '$30 per day $900 and or 30-day max',
  '$40 per day $1200 and or 30-day max',
  '$50 per day $1500 and or 30-day max',
  '$60 per day 1800 and or 30-day max',
  '$70 per day $2100 and or 30-day max',
]
const CARGO_OPTIONS = [
  '$10,000 w/$500 deductible',
  '$25,000 w/$500 deductible',
  '$50,000 w/$500 deductible',
  '$10,000 w/$1,000 deductible',
  '$25,000 w/$1,000 deductible',
]

function InlineRadio({ label, note, radioValue, options, onChange, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-gray-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-700 leading-snug">{label}</p>
        {note && <p className="text-[11px] text-gray-400 mt-0.5">{note}</p>}
        {children}
      </div>
      <RadioGroup options={options} value={radioValue} onChange={onChange} />
    </div>
  )
}

export default function CoverageInformation({ formData, updateFormData }) {
  const data = formData.coverage || {}
  const set = (key) => (val) => updateFormData('coverage', { [key]: val })

  return (
    <div className="w-full space-y-5">

      {/* Limits row */}
      <FormGrid>
        <Select label="BI/PD" required options={BIPD_OPTIONS} value={data.liabilityLimit} onChange={set('liabilityLimit')} placeholder="Select limit" />
        <Select label="UMBI" options={UMBI_OPTIONS} value={data.umbi} onChange={set('umbi')} placeholder="No Coverage" />
      </FormGrid>

      <FormGrid>
        <Select label="Med Pay" options={MEDPAY_OPTIONS} value={data.medPay} onChange={set('medPay')} placeholder="No Coverage" />
        <Select label="PIP (where available / mandatory)" options={PIP_OPTIONS} value={data.pip} onChange={set('pip')} placeholder="No Coverage" />
      </FormGrid>

      <Input label="DOT #" value={data.dot} onChange={set('dot')} className="max-w-xs" />

      {/* Radio toggles — clean inline rows, no gray cards */}
      <div className="rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden" style={{ background: '#FAFAFA' }}>
        <div className="px-5">
          <InlineRadio label="Any auto" note="Symbol 1 — may require copy of contract" radioValue={data.anyAuto} options={['Yes','No']} onChange={set('anyAuto')} />
          <InlineRadio label="Hired auto" note="Symbol 8" radioValue={data.hiredAuto} options={['Yes','No']} onChange={set('hiredAuto')} />
          <InlineRadio label="Non-owned auto" note="Symbol 9" radioValue={data.nonOwnedAuto} options={['Yes','No']} onChange={set('nonOwnedAuto')} />
          <InlineRadio label="Additional driver endorsement" note="Drivers reported at new business and each renewal" radioValue={data.additionalDriverEndorsement} options={['Yes','No']} onChange={set('additionalDriverEndorsement')} />
          <InlineRadio label="Roadside assistance" note="Limit varies with carrier" radioValue={data.roadside} options={['Yes','No']} onChange={set('roadside')} />

          <InlineRadio label="Rental reimbursement" radioValue={data.rentalReimbursement} options={['Yes','No']} onChange={set('rentalReimbursement')}>
            {data.rentalReimbursement === 'Yes' && (
              <div className="mt-3 mb-1">
                <Select options={RENTAL_OPTIONS} value={data.rentalLimit} onChange={set('rentalLimit')} placeholder="Select limit" />
              </div>
            )}
          </InlineRadio>

          <InlineRadio label="Cargo coverage" radioValue={data.cargoCoverage} options={['Yes','No']} onChange={set('cargoCoverage')}>
            {data.cargoCoverage === 'Yes' && (
              <div className="mt-3 mb-1">
                <Select options={CARGO_OPTIONS} value={data.cargoLimit} onChange={set('cargoLimit')} placeholder="Select limit" />
              </div>
            )}
          </InlineRadio>

          <InlineRadio label="State filing" radioValue={data.stateFiling} options={['Yes','No']} onChange={set('stateFiling')}>
            {data.stateFiling === 'Yes' && (
              <div className="mt-3 mb-1">
                <Input value={data.stateFilingNumber} onChange={set('stateFilingNumber')} placeholder="Filing number" />
              </div>
            )}
          </InlineRadio>

          <InlineRadio label="Federal filing" radioValue={data.federalFiling} options={['Yes','No']} onChange={set('federalFiling')} />

          <InlineRadio label="SR 22" radioValue={data.sr22} options={['Yes','No']} onChange={set('sr22')}>
            {data.sr22 === 'Yes' && (
              <div className="mt-3 mb-1">
                <Input value={data.sr22Driver} onChange={set('sr22Driver')} placeholder="Driver name" />
              </div>
            )}
          </InlineRadio>
        </div>
      </div>

    </div>
  )
}
