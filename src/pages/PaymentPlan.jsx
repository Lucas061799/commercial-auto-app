import { Select, RadioGroup } from '../components/FormField'

const PLAN_OPTIONS_MAP = {
  '12 Months': [
    'Pay in full',
    'EFT 9% down 11 Installments',
    'Recurring Credit Card 9% down 11 Installments',
    '12% down 9 Installments',
    '16% down 9 Installments',
    '25% down 3 Installments',
  ],
  '6 Months': [
    'EFT 18% down 5 Installments',
    'Recurring Credit Card 18% down 5 Installments',
    '17% down 4 Installments',
    '20% down 4 Installments',
    '34% down 3 Installments',
  ],
}

export default function PaymentPlan({ formData, updateFormData, onSubmit }) {
  const data = formData.payment || {}
  const set = (key) => (val) => updateFormData('payment', { [key]: val })

  const handlePlanDuration = (val) => {
    updateFormData('payment', { planDuration: val, planOption: '' })
  }

  return (
    <div className="w-full">
      <p className="text-xs text-gray-500 mb-5">Choose a payment schedule that works best for your business.</p>

      {/* Paperless Notification */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-3">
        <RadioGroup
          label="Paperless Notification?"
          options={['Yes', 'No']}
          value={data.paperless}
          onChange={set('paperless')}
        />
      </div>

      {/* Payment Reminder */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-5">
        <RadioGroup
          label="Payment Reminder?"
          options={['Yes', 'No']}
          value={data.reminder}
          onChange={set('reminder')}
        />
      </div>

      {/* Step 1: Pick duration */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-3">
        <Select
          label="Payment Plans"
          options={['12 Months', '6 Months']}
          value={data.planDuration}
          onChange={handlePlanDuration}
          placeholder="Select..."
        />
      </div>

      {/* Step 2: Pick installment option based on duration */}
      {data.planDuration && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-8">
          <Select
            label={`${data.planDuration} Options`}
            options={PLAN_OPTIONS_MAP[data.planDuration]}
            value={data.planOption}
            onChange={set('planOption')}
            placeholder="Select..."
          />
        </div>
      )}

      <div className="pt-2">
        <button
          onClick={onSubmit}
          className="px-8 py-3 text-sm font-semibold text-white rounded-xl transition shadow-sm hover:opacity-90"
          style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)', boxShadow: '0 4px 14px rgba(92,46,212,0.3)' }}
        >
          Submit Application
        </button>
      </div>
    </div>
  )
}
