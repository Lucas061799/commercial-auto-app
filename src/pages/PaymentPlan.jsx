import { useState } from 'react'
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

/* ── Preview Modal ──────────────────────────────────────────── */
function PreviewRow({ label, value }) {
  if (!value && value !== 0) return null
  return (
    <div className="flex gap-2 py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-[11px] text-gray-400 w-36 shrink-0">{label}</span>
      <span className="text-[11px] font-semibold text-gray-700 flex-1">{value}</span>
    </div>
  )
}

function PreviewSection({ title, children, isEmpty }) {
  if (isEmpty) return null
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3.5 w-[3px] rounded-full" style={{ background: 'linear-gradient(180deg,#5C2ED4,#A614C3)' }} />
        <p className="text-xs font-bold tracking-wide uppercase" style={{ color: '#5C2ED4' }}>{title}</p>
      </div>
      <div className="rounded-xl px-3 py-1" style={{ background: '#F9FAFB', border: '1px solid #F3F4F6' }}>
        {children}
      </div>
    </div>
  )
}

function PreviewModal({ formData, onClose, onSubmit }) {
  const a   = formData.applicant || {}
  const vs  = formData.vehicles?.vehicles || []
  const ds  = formData.drivers?.drivers || []
  const e   = formData.eligibility || {}
  const cov = formData.coverage || {}
  const ai  = formData.additionalInsured || {}
  const lp  = formData.lossPayee || {}
  const ph  = formData.priorHistory || {}
  const cl  = formData.claims || {}
  const pay = formData.payment || {}
  const comments = formData.comments?.text || ''

  const ELIG_LABELS = {
    q1: 'Subsidiary of another entity?', q2: 'Vehicles leased to others?',
    q3: 'All autos owned by applicant?', q4: 'Auto records checked before driving?',
    q5: 'Employees under 18 with access?', q6: 'Family driver exposures?',
    q7: 'Non-business use allowed?', q8: 'Employees use own autos?',
    q9: 'Active auto safety program?', q10: 'Regular scheduled maintenance?',
    q11: 'Annual mileage > 40,000?', q12: 'Exposure to flammables/hazmat?',
    q13: 'Policy declined/cancelled in 3 yrs?', q14: 'Bankruptcies/liens in 5 yrs?',
    q15: 'Crosses state lines?',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,10,40,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{ maxHeight: '90vh', background: 'white', border: '1px solid rgba(92,46,212,0.12)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 px-6 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(88.09deg,#5C2ED4 0%,#A614C3 100%)' }}>
          <div>
            <p className="text-white font-bold text-base leading-tight">Application Preview</p>
            <p className="text-white/70 text-xs mt-0.5">Review everything before submitting</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 custom-scroll">

          {/* Applicant */}
          <PreviewSection title="Applicant Information" isEmpty={!a.namedInsured}>
            <PreviewRow label="Named Insured" value={a.namedInsured} />
            <PreviewRow label="Entity Type" value={a.entity} />
            <PreviewRow label="Effective Date" value={a.effectiveDate} />
            <PreviewRow label="Email" value={a.email} />
            <PreviewRow label="Phone" value={a.phone} />
            <PreviewRow label="Address" value={[a.address, a.city, a.state, a.zip].filter(Boolean).join(', ')} />
          </PreviewSection>

          {/* Vehicles */}
          {vs.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3.5 w-[3px] rounded-full" style={{ background: 'linear-gradient(180deg,#5C2ED4,#A614C3)' }} />
                <p className="text-xs font-bold tracking-wide uppercase" style={{ color: '#5C2ED4' }}>Vehicles ({vs.length})</p>
              </div>
              <div className="space-y-2">
                {vs.map((v, i) => (
                  <div key={i} className="rounded-xl px-3 py-1" style={{ background: '#F9FAFB', border: '1px solid #F3F4F6' }}>
                    <p className="text-[11px] font-bold text-gray-600 py-1.5 border-b border-gray-100">Vehicle {i + 1}</p>
                    <PreviewRow label="Year / Make / Model" value={[v.year, v.make, v.model].filter(Boolean).join(' ')} />
                    <PreviewRow label="VIN" value={v.vin} />
                    <PreviewRow label="Use" value={v.use} />
                    <PreviewRow label="Garaging State" value={v.garagingState} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Drivers */}
          {ds.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3.5 w-[3px] rounded-full" style={{ background: 'linear-gradient(180deg,#5C2ED4,#A614C3)' }} />
                <p className="text-xs font-bold tracking-wide uppercase" style={{ color: '#5C2ED4' }}>Drivers ({ds.length})</p>
              </div>
              <div className="space-y-2">
                {ds.map((d, i) => (
                  <div key={i} className="rounded-xl px-3 py-1" style={{ background: '#F9FAFB', border: '1px solid #F3F4F6' }}>
                    <p className="text-[11px] font-bold text-gray-600 py-1.5 border-b border-gray-100">Driver {i + 1}</p>
                    <PreviewRow label="Name" value={[d.firstName, d.lastName].filter(Boolean).join(' ')} />
                    <PreviewRow label="License #" value={d.licenseNumber} />
                    <PreviewRow label="Date of Birth" value={d.dob} />
                    <PreviewRow label="Years Licensed" value={d.yearsLicensed} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Eligibility */}
          {Object.keys(e).length > 0 && (
            <PreviewSection title="Eligibility">
              {Object.entries(ELIG_LABELS).map(([key, label]) =>
                e[key] ? <PreviewRow key={key} label={label} value={e[key]} /> : null
              )}
            </PreviewSection>
          )}

          {/* Coverage */}
          <PreviewSection title="Coverage" isEmpty={!cov.liabilityLimit}>
            <PreviewRow label="Liability Limit" value={cov.liabilityLimit} />
            <PreviewRow label="Medical Payments" value={cov.medicalPayments} />
            <PreviewRow label="Uninsured Motorist" value={cov.uninsuredMotorist} />
            <PreviewRow label="Comprehensive Ded." value={cov.comprehensiveDeductible} />
            <PreviewRow label="Collision Ded." value={cov.collisionDeductible} />
            <PreviewRow label="Hired Auto" value={cov.hiredAuto} />
            <PreviewRow label="Non-Owned Auto" value={cov.nonOwnedAuto} />
          </PreviewSection>

          {/* Additional Insured */}
          <PreviewSection title="Additional Insured" isEmpty={ai.hasAdditional === undefined}>
            <PreviewRow label="Has Additional Insured?" value={ai.hasAdditional} />
            {ai.hasAdditional === 'Yes' && <PreviewRow label="Name" value={ai.name} />}
          </PreviewSection>

          {/* Loss Payee */}
          <PreviewSection title="Loss Payee" isEmpty={lp.hasPayee === undefined}>
            <PreviewRow label="Has Loss Payee?" value={lp.hasPayee} />
            {lp.hasPayee === 'Yes' && <PreviewRow label="Name" value={lp.name} />}
          </PreviewSection>

          {/* Prior History */}
          <PreviewSection title="Prior History" isEmpty={ph.hasCurrent === undefined}>
            <PreviewRow label="Has Current Policy?" value={ph.hasCurrent} />
            <PreviewRow label="Carrier" value={ph.carrier} />
            <PreviewRow label="Expiration Date" value={ph.expirationDate} />
            <PreviewRow label="Years with Carrier" value={ph.yearsWithCarrier} />
          </PreviewSection>

          {/* Claims */}
          <PreviewSection title="Claim History" isEmpty={cl.hasClaims === undefined}>
            <PreviewRow label="Has Claims?" value={cl.hasClaims} />
            {(cl.claims || []).map((c, i) => (
              <PreviewRow key={i} label={`Claim ${i + 1}`} value={[c.date, c.type, c.amount ? `$${c.amount}` : ''].filter(Boolean).join(' · ')} />
            ))}
          </PreviewSection>

          {/* Payment Plan */}
          <PreviewSection title="Payment Plan" isEmpty={!pay.planDuration}>
            <PreviewRow label="Plan Duration" value={pay.planDuration} />
            <PreviewRow label="Payment Option" value={pay.planOption} />
            <PreviewRow label="Paperless" value={pay.paperless} />
            <PreviewRow label="Payment Reminder" value={pay.reminder} />
          </PreviewSection>

          {/* Comments */}
          {comments && (
            <PreviewSection title="Additional Comments">
              <div className="py-2">
                <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-wrap">{comments}</p>
              </div>
            </PreviewSection>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 flex items-center justify-between gap-3" style={{ borderTop: '1px solid #F3F4F6', background: 'white' }}>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition"
            style={{ color: '#6B7280', border: '1px solid #E5E7EB', background: 'white' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
          >
            Back to Edit
          </button>
          <button
            onClick={() => { onClose(); onSubmit() }}
            className="px-8 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
            style={{ background: 'linear-gradient(88.09deg,#5C2ED4 0.11%,#A614C3 63.8%)', boxShadow: '0 4px 14px rgba(92,46,212,0.3)' }}
          >
            Submit Application →
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── PaymentPlan ─────────────────────────────────────────────── */
export default function PaymentPlan({ formData, updateFormData, onSubmit, isDark = false }) {
  const data = formData.payment || {}
  const comments = formData.comments?.text || ''
  const set = (key) => (val) => updateFormData('payment', { [key]: val })
  const setComments = (val) => updateFormData('comments', { text: val })
  const [showPreview, setShowPreview] = useState(false)

  const handlePlanDuration = (val) => {
    updateFormData('payment', { planDuration: val, planOption: '' })
  }

  return (
    <div className="w-full">
      {showPreview && (
        <PreviewModal
          formData={formData}
          onClose={() => setShowPreview(false)}
          onSubmit={onSubmit}
        />
      )}

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
              <span className="text-[10px] font-medium shrink-0" style={{ color: comments.length > 0 ? '#5C2ED4' : '#9CA3AF' }}>{comments.length} chars</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="pt-6 flex items-center justify-end gap-3">
        {/* Preview — outline gradient */}
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-semibold transition hover:opacity-80"
          style={{
            border: '1.5px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#previewG)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="previewG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5C2ED4"/>
                <stop offset="100%" stopColor="#A614C3"/>
              </linearGradient>
            </defs>
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          <span className="text-gradient">Preview</span>
        </button>

        {/* Submit — solid gradient */}
        <button
          onClick={onSubmit}
          className="flex items-center gap-1.5 px-8 py-3 text-sm font-semibold text-white rounded-xl transition hover:opacity-90"
          style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)' }}
        >
          Submit Application
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
