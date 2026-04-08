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
      <div className="rounded-2xl overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(92,46,212,0.06) 0%, rgba(166,20,195,0.04) 50%, rgba(92,46,212,0.06) 100%)',
        border: '1px solid rgba(92,46,212,0.12)',
      }}>
        {/* Header row */}
        <div className="flex items-center gap-3.5 px-5 pt-5 pb-4">
          <div className="relative shrink-0">
            <img src={norbieface} alt="Norbie" className="w-10 h-10 rounded-full object-cover ring-2" style={{ ringColor: 'rgba(92,46,212,0.2)' }} />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center" style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0%, #A614C3 100%)' }}>
              <svg className="w-1.5 h-1.5" fill="white" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3"/></svg>
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-navy leading-tight">Anything else you'd like us to know?</p>
            <p className="text-xs text-gray-500 mt-0.5">Comments, special instructions, or questions — we read every one.</p>
          </div>
        </div>

        {/* Textarea area */}
        <div className="px-5 pb-5">
          <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(92,46,212,0.1)' }}>
            <textarea
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="e.g. The client prefers email contact. Fleet has seasonal usage April–October. Any additional drivers expected next quarter..."
              rows={4}
              className="w-full px-4 pt-3.5 pb-2 text-sm text-gray-700 placeholder-gray-300 bg-transparent focus:outline-none resize-none transition-all"
            />
            <div className="flex items-center justify-between px-4 py-2 border-t" style={{ borderColor: 'rgba(92,46,212,0.08)', background: 'rgba(92,46,212,0.02)' }}>
              <span className="text-[10px] text-gray-400">Optional — won't affect your submission</span>
              <span className="text-[10px] font-medium" style={{ color: comments.length > 0 ? '#5C2ED4' : '#9CA3AF' }}>{comments.length} chars</span>
            </div>
          </div>
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
