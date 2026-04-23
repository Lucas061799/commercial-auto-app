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

export default function PaymentPlan({ formData, updateFormData, onSubmit, isDark = false }) {
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
          <div className="w-full border-t border-dashed" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb' }} />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 text-[11px] font-semibold text-gray-400 tracking-widest uppercase" style={{ background: isDark ? '#131629' : 'white' }}>Not related to payment</span>
        </div>
      </div>

      {/* Comments section */}
      <div className="rounded-2xl overflow-hidden" style={isDark ? {
        background: 'linear-gradient(to top, rgba(166,20,195,0.55) 0%, rgba(92,46,212,0.35) 22%, transparent 58%), #1A1B35',
        border: 'none',
      } : {
        background: 'linear-gradient(to right, #F8F6FF, #F2FAF8)',
        border: '1px solid rgba(124,58,237,0.1)',
      }}>

        {/* Header row */}
        <div className="flex items-center gap-3.5 px-5 pt-5 pb-4">
          <img src={norbieface} alt="Norbie" className="w-10 h-10 rounded-full object-cover shrink-0" />
          <div>
            <p className="text-sm font-bold text-navy leading-tight">Anything else you'd like us to know?</p>
            <p className="text-xs text-gray-500 mt-0.5">Comments, special instructions, or questions —<br />we read every one.</p>
          </div>
        </div>

        {/* Textarea area */}
        <div className="px-5 pb-5">
          <div className="rounded-xl overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.75)', border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(92,46,212,0.1)'}` }}>
            <textarea
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="e.g. The client prefers email contact. Fleet has seasonal usage April–October. Any additional drivers expected next quarter..."
              rows={6}
              className="w-full px-4 pt-3.5 pb-2 text-sm text-gray-700 placeholder-gray-300 bg-transparent focus:outline-none resize-none transition-all"
              style={{ display: 'block' }}
            />
            <div className="flex items-center justify-between px-4 py-2 border-t gap-2" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(92,46,212,0.08)', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(92,46,212,0.02)' }}>
              {/* Left: optional tag + auto-saved */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 min-w-0">
                <span className="text-[10px] text-gray-400 truncate">Optional — won't affect your submission</span>
                <span className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400 shrink-0">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Auto-saved · submitted with your application
                </span>
                <span className="sm:hidden flex items-center gap-1 text-[10px] text-gray-400">
                  <svg className="w-2.5 h-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Auto-saved
                </span>
              </div>
              {/* Right: char count */}
              <span className="text-[10px] font-medium shrink-0" style={{ color: comments.length > 0 ? '#5C2ED4' : '#9CA3AF' }}>{comments.length} chars</span>
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
