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
function YesNoBadge({ value }) {
  if (!value) return null
  const isYes = value === 'Yes'
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold"
      style={isYes
        ? { background: 'rgba(92,46,212,0.1)', color: '#5C2ED4' }
        : { background: 'rgba(107,114,128,0.1)', color: '#6B7280' }
      }
    >
      {isYes ? '✓ Yes' : '✕ No'}
    </span>
  )
}

function PreviewField({ label, value, yesno = false }) {
  if (!value && value !== 0) return null
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{label}</span>
      {yesno
        ? <YesNoBadge value={value} />
        : <span className="text-[12px] font-semibold text-gray-800 leading-snug">{value}</span>
      }
    </div>
  )
}

function PreviewCard({ children, accent }) {
  return (
    <div
      className="rounded-xl p-4 space-y-3"
      style={{
        background: 'white',
        border: '1px solid #F0EDFF',
        borderLeft: `3px solid ${accent || '#5C2ED4'}`,
        boxShadow: '0 1px 4px rgba(92,46,212,0.06)',
      }}
    >
      {children}
    </div>
  )
}

function PreviewGrid({ children }) {
  return <div className="grid grid-cols-2 gap-x-6 gap-y-3">{children}</div>
}

function SectionHeader({ icon, title, count }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] shrink-0"
        style={{ background: 'linear-gradient(135deg,#5C2ED4,#A614C3)' }}
      >
        {icon}
      </div>
      <span className="text-xs font-bold text-gray-700 tracking-wide">{title}</span>
      {count != null && (
        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(92,46,212,0.08)', color: '#5C2ED4' }}>
          {count}
        </span>
      )}
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
  const histories = ph.histories || []
  const cl  = formData.claims || {}
  const pay = formData.payment || {}
  const comments = formData.comments?.text || ''

  const ELIG_LABELS = {
    q1: 'Subsidiary?', q2: 'Leased to others?',
    q3: 'All autos owned?', q4: 'Records checked?',
    q5: 'Employees under 18?', q6: 'Family drivers?',
    q7: 'Non-business use?', q8: 'Own autos in business?',
    q9: 'Safety program?', q10: 'Regular maintenance?',
    q11: 'Mileage > 40k?', q12: 'Hazmat exposure?',
    q13: 'Policy declined in 3yr?', q14: 'Bankruptcies in 5yr?',
    q15: 'Crosses state lines?',
  }

  const eligEntries = Object.entries(ELIG_LABELS).filter(([k]) => e[k])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,10,40,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{ maxHeight: '92vh', background: '#FAFAFA', border: '1px solid rgba(92,46,212,0.15)' }}
        onClick={ev => ev.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 px-6 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(88.09deg,#5C2ED4 0%,#A614C3 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.18)' }}>
              <svg className="w-4.5 h-4.5 text-white w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Application Preview</p>
              <p className="text-white/65 text-[11px] mt-0.5">Review all details before submitting</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            onMouseEnter={ev => ev.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
            onMouseLeave={ev => ev.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 custom-scroll" style={{ background: '#F7F6FB' }}>

          {/* Applicant */}
          {a.namedInsured && (
            <div>
              <SectionHeader icon="👤" title="Applicant Information" />
              <PreviewCard>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Named Insured</p>
                    <p className="text-[15px] font-bold text-gray-900">{a.namedInsured}</p>
                    {a.entity && <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(92,46,212,0.08)', color: '#5C2ED4' }}>{a.entity}</span>}
                  </div>
                  {a.effectiveDate && (
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Effective</p>
                      <p className="text-[12px] font-bold text-gray-800">{a.effectiveDate}</p>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <PreviewGrid>
                    <PreviewField label="Email" value={a.email} />
                    <PreviewField label="Phone" value={a.phone} />
                    <div className="col-span-2">
                      <PreviewField label="Address" value={[a.address, a.city, a.state, a.zip].filter(Boolean).join(', ')} />
                    </div>
                  </PreviewGrid>
                </div>
              </PreviewCard>
            </div>
          )}

          {/* Vehicles */}
          {vs.length > 0 && (
            <div>
              <SectionHeader icon="🚗" title="Vehicles" count={vs.length} />
              <div className="space-y-2">
                {vs.map((v, i) => (
                  <PreviewCard key={i} accent="#7C3AED">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: 'linear-gradient(88deg,#5C2ED4,#A614C3)' }}>Vehicle {i + 1}</span>
                      {v.year && v.make && <span className="text-[12px] font-bold text-gray-800">{[v.year, v.make, v.model].filter(Boolean).join(' ')}</span>}
                    </div>
                    <PreviewGrid>
                      <PreviewField label="VIN" value={v.vin} />
                      <PreviewField label="Use" value={v.use} />
                      <PreviewField label="Garaging State" value={v.garagingState} />
                    </PreviewGrid>
                  </PreviewCard>
                ))}
              </div>
            </div>
          )}

          {/* Drivers */}
          {ds.length > 0 && (
            <div>
              <SectionHeader icon="🪪" title="Drivers" count={ds.length} />
              <div className="space-y-2">
                {ds.map((d, i) => (
                  <PreviewCard key={i} accent="#A614C3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: 'linear-gradient(88deg,#5C2ED4,#A614C3)' }}>Driver {i + 1}</span>
                      {(d.firstName || d.lastName) && <span className="text-[12px] font-bold text-gray-800">{[d.firstName, d.lastName].filter(Boolean).join(' ')}</span>}
                    </div>
                    <PreviewGrid>
                      <PreviewField label="License #" value={d.licenseNumber} />
                      <PreviewField label="Date of Birth" value={d.dob} />
                      <PreviewField label="Years Licensed" value={d.yearsLicensed} />
                    </PreviewGrid>
                  </PreviewCard>
                ))}
              </div>
            </div>
          )}

          {/* Coverage */}
          {cov.liabilityLimit && (
            <div>
              <SectionHeader icon="🛡" title="Coverage" />
              <PreviewCard>
                <PreviewGrid>
                  <PreviewField label="BI/PD Limit" value={cov.liabilityLimit} />
                  <PreviewField label="UMBI" value={cov.umbi} />
                  <PreviewField label="Med Pay" value={cov.medPay} />
                  <PreviewField label="PIP" value={cov.pip} />
                  <PreviewField label="DOT #" value={cov.dot} />
                  <PreviewField label="Cargo Limit" value={cov.cargoLimit} />
                  <PreviewField label="Rental Limit" value={cov.rentalLimit} />
                  <PreviewField label="State Filing #" value={cov.stateFilingNumber} />
                  <PreviewField label="Any Auto (sym 1)" value={cov.anyAuto} yesno />
                  <PreviewField label="Hired Auto (sym 8)" value={cov.hiredAuto} yesno />
                  <PreviewField label="Non-Owned (sym 9)" value={cov.nonOwnedAuto} yesno />
                  <PreviewField label="Cargo Coverage" value={cov.cargoCoverage} yesno />
                  <PreviewField label="Rental Reimb." value={cov.rentalReimbursement} yesno />
                  <PreviewField label="State Filing" value={cov.stateFiling} yesno />
                  <PreviewField label="Federal Filing" value={cov.federalFiling} yesno />
                  <PreviewField label="SR 22" value={cov.sr22} yesno />
                </PreviewGrid>
                {cov.sr22 === 'Yes' && cov.sr22Driver && (
                  <div className="border-t border-gray-100 pt-3">
                    <PreviewField label="SR 22 Driver" value={cov.sr22Driver} />
                  </div>
                )}
              </PreviewCard>
            </div>
          )}

          {/* Eligibility */}
          {eligEntries.length > 0 && (
            <div>
              <SectionHeader icon="✅" title="Eligibility Questions" count={`${eligEntries.length}/15`} />
              <PreviewCard>
                <div className="space-y-1.5">
                  {eligEntries.map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between gap-3 py-1 border-b border-gray-50 last:border-0">
                      <span className="text-[11px] text-gray-600 flex-1 leading-snug">{label}</span>
                      <YesNoBadge value={e[key]} />
                    </div>
                  ))}
                </div>
              </PreviewCard>
            </div>
          )}

          {/* Prior History */}
          {ph.hasCurrent && (
            <div>
              <SectionHeader icon="📋" title="Prior Insurance History" />
              <PreviewCard>
                <PreviewField label="Has Prior History" value={ph.hasCurrent} yesno />
                {histories.length > 0 && (
                  <div className="border-t border-gray-100 pt-3 space-y-3">
                    {histories.map((h, i) => (
                      <div key={i} className="space-y-2">
                        {histories.length > 1 && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Policy {i + 1}</p>}
                        <PreviewGrid>
                          <PreviewField label="Carrier" value={h.carrierName} />
                          <PreviewField label="Policy #" value={h.policyNumber} />
                          <PreviewField label="BI Limits" value={h.biLimits} />
                          <PreviewField label="Premium" value={h.premium} />
                          <PreviewField label="Effective" value={h.effectiveDate} />
                          <PreviewField label="Expiration" value={h.expirationDate} />
                          <PreviewField label="Type" value={h.policyType} />
                        </PreviewGrid>
                      </div>
                    ))}
                  </div>
                )}
                {ph.hasOtherPolicy && (
                  <div className="border-t border-gray-100 pt-3">
                    <PreviewField label="Has GL/WC/BOP?" value={ph.hasOtherPolicy} yesno />
                  </div>
                )}
              </PreviewCard>
            </div>
          )}

          {/* Claims */}
          {cl.hasClaims && (
            <div>
              <SectionHeader icon="📁" title="Claim History" />
              <PreviewCard>
                <PreviewField label="Has Claims" value={cl.hasClaims} yesno />
                {(cl.claims || []).length > 0 && (
                  <div className="border-t border-gray-100 pt-3 space-y-2">
                    {(cl.claims || []).map((c, i) => (
                      <div key={i} className="flex items-center gap-3 py-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: '#F3F0FF', color: '#5C2ED4' }}>#{i + 1}</span>
                        <span className="text-[11px] text-gray-700 flex-1">{[c.date, c.type, c.amount ? `$${c.amount}` : ''].filter(Boolean).join(' · ')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </PreviewCard>
            </div>
          )}

          {/* Additional Insured */}
          {ai.hasAdditional && (
            <div>
              <SectionHeader icon="➕" title="Additional Insured" />
              <PreviewCard>
                <PreviewField label="Has Additional Insured" value={ai.hasAdditional} yesno />
                {ai.hasAdditional === 'Yes' && (
                  <div className="border-t border-gray-100 pt-3">
                    <PreviewGrid>
                      <PreviewField label="Name" value={ai.name} />
                      <PreviewField label="Address" value={ai.address} />
                    </PreviewGrid>
                  </div>
                )}
              </PreviewCard>
            </div>
          )}

          {/* Loss Payee */}
          {lp.hasPayee && (
            <div>
              <SectionHeader icon="🏦" title="Loss Payee" />
              <PreviewCard>
                <PreviewField label="Has Loss Payee" value={lp.hasPayee} yesno />
                {lp.hasPayee === 'Yes' && (
                  <div className="border-t border-gray-100 pt-3">
                    <PreviewGrid>
                      <PreviewField label="Name" value={lp.name} />
                      <PreviewField label="Address" value={lp.address} />
                    </PreviewGrid>
                  </div>
                )}
              </PreviewCard>
            </div>
          )}

          {/* Payment Plan */}
          {pay.planDuration && (
            <div>
              <SectionHeader icon="💳" title="Payment Plan" />
              <PreviewCard>
                <div className="flex items-start gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Duration</p>
                    <p className="text-[13px] font-bold text-gray-800">{pay.planDuration}</p>
                  </div>
                  {pay.planOption && (
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">Option</p>
                      <p className="text-[12px] font-semibold text-gray-700 leading-snug">{pay.planOption}</p>
                    </div>
                  )}
                </div>
                {(pay.paperless || pay.reminder) && (
                  <div className="border-t border-gray-100 pt-3 flex gap-4">
                    <PreviewField label="Paperless" value={pay.paperless} yesno />
                    <PreviewField label="Payment Reminder" value={pay.reminder} yesno />
                  </div>
                )}
              </PreviewCard>
            </div>
          )}

          {/* Comments */}
          {comments && (
            <div>
              <SectionHeader icon="💬" title="Additional Comments" />
              <div className="rounded-xl p-4" style={{ background: 'white', border: '1px solid #F0EDFF', borderLeft: '3px solid #E879F9', boxShadow: '0 1px 4px rgba(92,46,212,0.06)' }}>
                <p className="text-[12px] text-gray-600 leading-relaxed whitespace-pre-wrap">{comments}</p>
              </div>
            </div>
          )}

          <div className="h-1" />
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 flex items-center justify-between gap-3" style={{ borderTop: '1px solid #EEEBFF', background: 'white' }}>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
            style={{ color: '#6B7280', border: '1px solid #E5E7EB', background: 'white' }}
            onMouseEnter={ev => ev.currentTarget.style.background = '#F9FAFB'}
            onMouseLeave={ev => ev.currentTarget.style.background = 'white'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
            </svg>
            Back to Edit
          </button>
          <button
            onClick={() => { onClose(); onSubmit() }}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
            style={{ background: 'linear-gradient(88.09deg,#5C2ED4 0.11%,#A614C3 63.8%)', boxShadow: '0 4px 14px rgba(92,46,212,0.3)' }}
          >
            Submit Application
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
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
