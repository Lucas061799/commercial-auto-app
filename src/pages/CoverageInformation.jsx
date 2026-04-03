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

export default function CoverageInformation({ formData, updateFormData }) {
  const data = formData.coverage || {}
  const set = (key) => (val) => updateFormData('coverage', { [key]: val })

  return (
    <div className="w-full space-y-4">

      {/* BI/PD + UMBI */}
      <FormGrid>
        <Select
          label="BI/PD"
          required
          options={BIPD_OPTIONS}
          value={data.liabilityLimit}
          onChange={set('liabilityLimit')}
          placeholder="$10/20"
        />
        <Select
          label="UMBI"
          options={UMBI_OPTIONS}
          value={data.umbi}
          onChange={set('umbi')}
          placeholder="No Coverage"
        />
      </FormGrid>

      {/* Med Pay + PIP */}
      <FormGrid>
        <Select
          label="Med Pay"
          options={MEDPAY_OPTIONS}
          value={data.medPay}
          onChange={set('medPay')}
          placeholder="No Coverage"
        />
        <Select
          label="PIP (in states where available or mandatory)"
          options={PIP_OPTIONS}
          value={data.pip}
          onChange={set('pip')}
          placeholder="No Coverage"
        />
      </FormGrid>

      {/* Any Auto */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-3">Any Auto (symbol 1, may require copy of contract)</p>
        <RadioGroup options={['Yes', 'No']} value={data.anyAuto} onChange={set('anyAuto')} />
      </div>

      {/* Hired Auto */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-3">Hired Auto (symbol 8)</p>
        <RadioGroup options={['Yes', 'No']} value={data.hiredAuto} onChange={set('hiredAuto')} />
      </div>

      {/* Non-Owned Auto */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-3">Non-Owned Auto (symbol 9)</p>
        <RadioGroup options={['Yes', 'No']} value={data.nonOwnedAuto} onChange={set('nonOwnedAuto')} />
      </div>

      {/* Additional Driver Endorsement */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-3 leading-relaxed">
          Additional Driver Endorsement (drivers only need to be reported at new business and each renewal)
        </p>
        <RadioGroup options={['Yes', 'No']} value={data.additionalDriverEndorsement} onChange={set('additionalDriverEndorsement')} />
      </div>

      {/* Roadside Assistance */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-3">Roadside Assistance (limit varies with carrier)</p>
        <RadioGroup options={['Yes', 'No']} value={data.roadside} onChange={set('roadside')} />
      </div>

      {/* Rental Reimbursement */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-3">Rental Reimbursement?</p>
        <RadioGroup options={['Yes', 'No']} value={data.rentalReimbursement} onChange={set('rentalReimbursement')} />
        {data.rentalReimbursement === 'Yes' && (
          <div className="mt-3">
            <Select
              label="Rental Reimbursement"
              options={RENTAL_OPTIONS}
              value={data.rentalLimit}
              onChange={set('rentalLimit')}
            />
          </div>
        )}
      </div>

      {/* Cargo Coverage */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-3">Cargo Coverage?</p>
        <RadioGroup options={['Yes', 'No']} value={data.cargoCoverage} onChange={set('cargoCoverage')} />
        {data.cargoCoverage === 'Yes' && (
          <div className="mt-3">
            <Select
              label="Cargo (if available for classification)"
              options={CARGO_OPTIONS}
              value={data.cargoLimit}
              onChange={set('cargoLimit')}
            />
          </div>
        )}
      </div>

      {/* DOT# */}
      <Input
        label="DOT#"
        value={data.dot}
        onChange={set('dot')}
        placeholder=""
      />

      {/* State Filing */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-3">State Filing</p>
        <RadioGroup options={['Yes', 'No']} value={data.stateFiling} onChange={set('stateFiling')} />
        {data.stateFiling === 'Yes' && (
          <div className="mt-3">
            <Input
              label="State Filing Number"
              value={data.stateFilingNumber}
              onChange={set('stateFilingNumber')}
              placeholder=""
            />
          </div>
        )}
      </div>

      {/* Federal Filing */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-3">Federal Filing</p>
        <RadioGroup options={['Yes', 'No']} value={data.federalFiling} onChange={set('federalFiling')} />
      </div>

      {/* SR 22 */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-3">SR 22</p>
        <RadioGroup options={['Yes', 'No']} value={data.sr22} onChange={set('sr22')} />
        {data.sr22 === 'Yes' && (
          <div className="mt-3">
            <Input
              label="What Driver?"
              value={data.sr22Driver}
              onChange={set('sr22Driver')}
              placeholder=""
            />
          </div>
        )}
      </div>

    </div>
  )
}
