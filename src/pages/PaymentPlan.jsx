import { Select, RadioGroup } from '../components/FormField'
import norbieface from '../assets/norbieface.png'

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
  const comments = formData.comments?.text || ''
  const set = (key) => (val) => updateFormData('payment', { [key]: val })
  const setComments = (val) => updateFormData('comments', { text: val })

  const handlePlanDuration = (val) => {
    updateFormData('payment', { planDuration: val, planOption: '' })
  }

  return (
    <div className="w-full">
      <p className="text-xs text-gray-500 mb-5">Choose a payment schedule that works best for your business.</p>

      {/* Paperless Notification */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-3">
        <RadioGroup
          label="Paperless notification?"
          options={['Yes', 'No']}
          value={data.paperless}
          onChange={set('paperless')}
        />
      </div>

      {/* Payment Reminder */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-5">
        <RadioGroup
          label="Payment reminder?"
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

      {/* ── Divider separating payment from comments ── */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dashed border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-[11px] font-semibold text-gray-400 tracking-widest uppercase">Not related to payment</span>
        </div>
      </div>

      {/* Comments section */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(92,46,212,0.12)' }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ background: 'linear-gradient(88.09deg, rgba(92,46,212,0.05) 0%, rgba(166,20,195,0.05) 100%)' }}>
          <img src={norbieface} alt="Norbie" className="w-8 h-8 rounded-full shrink-0 object-cover" />
          <div>
            <p className="text-sm font-bold text-navy leading-tight">Anything else you'd like us to know?</p>
            <p className="text-xs text-gray-400 mt-0.5">Comments, special instructions, or questions — we read every one.</p>
          </div>
        </div>

        {/* Textarea */}
        <div className="p-5">
          <textarea
            value={comments}
            onChange={e => setComments(e.target.value)}
            placeholder="e.g. The client prefers to be contacted by email. The fleet has seasonal usage from April to October..."
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/10 focus:border-[#7C3AED]/40 hover:border-gray-300 resize-none transition-all"
          />
          <p className="text-[10px] text-gray-400 mt-2 text-right">{comments.length} characters</p>
        </div>
      </div>

      <div className="pt-6">
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
