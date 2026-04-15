import norbielinkLogo from '../assets/norbielink-logo.png'
import btisLogo from '../assets/btislogo.png'
import sellMoreBg from '../assets/sell-more-bg.png'

function SectionHeader({ title }) {
  return (
    <div>
      <div style={{ height: 2, background: 'linear-gradient(88deg, #5C2ED4 0%, #A614C3 100%)' }} />
      <div
        className="flex items-center px-4 py-3"
        style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}
      >
        <h3 className="text-[11px] font-bold tracking-widest uppercase" style={{ color: '#111827' }}>{title}</h3>
      </div>
    </div>
  )
}

function Field({ label, value }) {
  if (!value && value !== 0) return null
  return (
    <div className="py-2 px-4 flex gap-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
      <span className="text-[10px] font-semibold uppercase tracking-wider shrink-0" style={{ color: '#6B7280', paddingTop: '1px', width: '9rem' }}>{label}</span>
      <span className="text-[13px] font-medium" style={{ color: '#111827' }}>{value}</span>
    </div>
  )
}

function YesNoField({ label, value }) {
  if (value === undefined || value === null || value === '') return null
  const isYes = value === 'Yes'
  return (
    <div className="py-2 px-4 flex items-center gap-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
      <span className="text-[10px] font-semibold uppercase tracking-wider shrink-0" style={{ color: '#6B7280', width: '9rem' }}>{label}</span>
      <span
        className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
        style={{
          background: isYes ? 'rgba(52,211,153,0.12)' : 'rgba(156,163,175,0.12)',
          color: isYes ? '#059669' : '#6B7280',
        }}
      >
        {value}
      </span>
    </div>
  )
}

function SectionCard({ children }) {
  return (
    <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid #E5E7EB' }}>
      {children}
    </div>
  )
}

function SubHeader({ label }) {
  return (
    <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: '#5C2ED4', background: 'rgba(92,46,212,0.04)' }}>
      {label}
    </div>
  )
}

const ELIG_QUESTIONS = [
  ['q1',  'Long-haul trucking (>300 miles)?'],
  ['q2',  'Hauling hazardous materials?'],
  ['q3',  'Commercial trailers or semi-trucks?'],
  ['q4',  'Snow plowing?'],
  ['q5',  '2+ losses in last 3 years?'],
  ['q6',  'Rideshare (Uber, Lyft)?'],
  ['q7',  'Food/beverage delivery?'],
  ['q8',  'Drivers under age 21?'],
  ['q9',  'DUI/DWI in past 5 years?'],
  ['q10', 'Suspended licenses in past 3 years?'],
  ['q11', 'Vehicles used outside US/Canada?'],
  ['q12', 'Racing or exhibition?'],
  ['q13', 'Salvage or rebuilt titles?'],
  ['q14', 'Towing/recovery operations?'],
  ['q15', 'Mobile business (food truck, etc.)?'],
]

export default function PrintSummary({ formData, visible, onClose }) {
  if (!visible) return null

  const applicant = formData.applicant || {}
  const vehicles  = formData.vehicles?.vehicles || []
  const drivers   = formData.drivers?.drivers || []
  const eligibility = formData.eligibility || {}
  const coverage  = formData.coverage || {}
  const ai        = formData.additionalInsured || {}
  const lp        = formData.lossPayee || {}
  const prior     = formData.priorHistory || {}
  const claims    = formData.claims || {}
  const payment   = formData.payment || {}
  const blanket   = formData.blanket || {}
  const comments  = formData.comments?.text || ''

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div
      id="print-summary"
      className="fixed inset-0 z-[9999] overflow-y-auto"
      style={{ background: 'white', fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Toolbar — hidden on print */}
      <div
        className="no-print sticky top-0 z-10 flex items-center justify-between px-6 py-3"
        style={{ background: 'white', borderBottom: '1px solid #E5E7EB', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(88deg, #5C2ED4, #A614C3)' }} />
          <span className="text-sm font-semibold" style={{ color: '#111827' }}>
            Application Summary{applicant.namedInsured ? ` — ${applicant.namedInsured}` : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: 'linear-gradient(88deg, #5C2ED4 0%, #A614C3 100%)', boxShadow: '0 2px 10px rgba(92,46,212,0.3)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            Print / Save as PDF
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition hover:bg-gray-50"
            style={{ color: '#6B7280', border: '1px solid #E5E7EB' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Close
          </button>
        </div>
      </div>

      {/* Print body */}
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-5" style={{ borderBottom: '2px solid #F3F4F6' }}>
          <img src={norbielinkLogo} alt="NorbieLink" className="h-8" />
          <img src={btisLogo} alt="btis" className="h-9" />
        </div>

        {/* Hero */}
        <div
          className="rounded-2xl overflow-hidden mb-6 relative"
          style={{ background: 'white', border: '1px solid #E5E7EB' }}
        >
          {/* Gradient top bar */}
          <div style={{ height: 4, background: 'linear-gradient(88deg, #5C2ED4 0%, #A614C3 100%)' }} />

          {/* sell-more-bg illustration — right side */}
          <img
            src={sellMoreBg}
            alt=""
            className="absolute right-0 top-0 h-full object-cover object-right pointer-events-none select-none"
            style={{ opacity: 1 }}
          />
          {/* White gradient mask so left-side text stays readable */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, white 38%, rgba(255,255,255,0.7) 60%, transparent 100%)' }} />

          <div className="relative z-10 px-8 py-5 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold tracking-widest uppercase mb-1.5" style={{ color: '#4B5563' }}>Named Insured</p>
              <h1 className="text-xl font-bold leading-tight" style={{ color: '#000000' }}>{applicant.namedInsured || '—'}</h1>
              <p className="text-xs mt-1 font-medium" style={{ color: '#374151' }}>
                {[applicant.entity, applicant.effectiveDate ? `Effective ${applicant.effectiveDate}` : null].filter(Boolean).join(' · ')}
              </p>
            </div>
            <p className="text-[10px] text-right shrink-0 ml-8 font-medium" style={{ color: '#374151' }}>
              Submission #CA0094894<br />{today}
            </p>
          </div>
        </div>

        {/* 1 · Applicant */}
        <SectionCard>
          <SectionHeader title="1 · Applicant Information" />
          <Field label="Named Insured" value={applicant.namedInsured} />
          <Field label="Entity Type" value={applicant.entity} />
          <Field label="Effective Date" value={applicant.effectiveDate} />
          <Field label="Email" value={applicant.email} />
          <Field label="Phone" value={applicant.phone} />
          <Field label="Address" value={[applicant.address, applicant.suite].filter(Boolean).join(', ')} />
          <Field label="City / State / Zip" value={[applicant.city, applicant.state, applicant.zip].filter(Boolean).join(', ')} />
          <Field label="Years in Business" value={applicant.yearsInBusiness} />
          <Field label="Business Description" value={applicant.businessDesc} />
        </SectionCard>

        {/* 2 · Vehicles */}
        <SectionCard>
          <SectionHeader title="2 · Vehicles" />
          {vehicles.length === 0 ? (
            <p className="px-4 py-3 text-sm" style={{ color: '#9CA3AF' }}>No vehicles added.</p>
          ) : vehicles.map((v, i) => (
            <div key={i} style={{ borderBottom: i < vehicles.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
              <SubHeader label={`Vehicle #${i + 1}`} />
              <Field label="Year / Make / Model" value={[v.year, v.make, v.model].filter(Boolean).join(' ')} />
              <Field label="VIN" value={v.vin} />
              <Field label="Use" value={v.use} />
              <Field label="Radius" value={v.radius} />
              <Field label="GVW" value={v.gvw} />
              <Field label="Garaging Zip" value={v.garagingZip} />
              <Field label="Comp / Collision" value={[v.comprehensive, v.collision].filter(Boolean).join(' / ')} />
            </div>
          ))}
        </SectionCard>

        {/* 3 · Drivers */}
        <SectionCard>
          <SectionHeader title="3 · Drivers" />
          {drivers.length === 0 ? (
            <p className="px-4 py-3 text-sm" style={{ color: '#9CA3AF' }}>No drivers added.</p>
          ) : drivers.map((d, i) => (
            <div key={i} style={{ borderBottom: i < drivers.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
              <SubHeader label={`Driver #${i + 1}`} />
              <Field label="Name" value={[d.firstName, d.lastName].filter(Boolean).join(' ')} />
              <Field label="Date of Birth" value={d.dob} />
              <Field label="License #" value={d.licenseNumber} />
              <Field label="License State" value={d.licenseState} />
              <Field label="Years Licensed" value={d.yearsLicensed} />
              <Field label="SR-22?" value={d.sr22} />
            </div>
          ))}
        </SectionCard>

        {/* 4 · Eligibility */}
        <SectionCard>
          <SectionHeader title="4 · Eligibility" />
          {ELIG_QUESTIONS.map(([key, question]) =>
            eligibility[key] !== undefined && eligibility[key] !== '' ? (
              <YesNoField key={key} label={question} value={eligibility[key]} />
            ) : null
          )}
        </SectionCard>

        {/* 5 · Coverage */}
        <SectionCard>
          <SectionHeader title="5 · Coverage" />
          <Field label="Liability Limit" value={coverage.liabilityLimit} />
          <Field label="Medical Payments" value={coverage.medicalPayments} />
          <Field label="Uninsured Motorist" value={coverage.uninsuredMotorist} />
          <Field label="Hired Auto" value={coverage.hiredAuto} />
          <Field label="Non-Owned Auto" value={coverage.nonOwnedAuto} />
          <Field label="Towing & Labor" value={coverage.towingLabor} />
        </SectionCard>

        {/* 6 · Additional Insured */}
        <SectionCard>
          <SectionHeader title="6 · Additional Insured" />
          <YesNoField label="Any additional insureds?" value={ai.hasAdditional} />
          {blanket.blanketAI  && <Field label="Blanket AI" value="Selected" />}
          {blanket.blanketWOS && <Field label="Blanket WOS" value="Selected" />}
          {(ai.insureds || []).map((ins, i) => (
            <div key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
              <SubHeader label={`Insured #${i + 1}`} />
              <Field label="Name" value={ins.name} />
              <Field label="Address" value={[ins.address, ins.suite].filter(Boolean).join(', ')} />
              <Field label="City / State / Zip" value={[ins.city, ins.state, ins.zip].filter(Boolean).join(', ')} />
              <YesNoField label="Waiver of Subrogation?" value={ins.waiverSubrogation} />
            </div>
          ))}
        </SectionCard>

        {/* 7 · Loss Payee */}
        <SectionCard>
          <SectionHeader title="7 · Loss Payee" />
          <YesNoField label="Any loss payees?" value={lp.hasPayee} />
          {(lp.payees || []).map((p, i) => (
            <div key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
              <SubHeader label={`Loss Payee #${i + 1}`} />
              <Field label="Name" value={p.name} />
              <Field label="Address" value={[p.address, p.suite].filter(Boolean).join(', ')} />
              <Field label="City / State / Zip" value={[p.city, p.state, p.zip].filter(Boolean).join(', ')} />
              <Field label="Type" value={p.type} />
            </div>
          ))}
        </SectionCard>

        {/* 8 · Prior History */}
        <SectionCard>
          <SectionHeader title="8 · Prior Insurance History" />
          <YesNoField label="Currently insured?" value={prior.hasCurrent} />
          <Field label="Prior Carrier" value={prior.carrier} />
          <Field label="Policy Number" value={prior.policyNumber} />
          <Field label="Expiration Date" value={prior.expirationDate} />
          <YesNoField label="Continuous coverage?" value={prior.continuous} />
          <Field label="Reason for lapse" value={prior.lapseReason} />
        </SectionCard>

        {/* 9 · Claims */}
        <SectionCard>
          <SectionHeader title="9 · Claims History" />
          <YesNoField label="Any claims (3 yrs)?" value={claims.hasClaims} />
          {(claims.claims || []).map((c, i) => (
            <div key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
              <SubHeader label={`Claim #${i + 1}`} />
              <Field label="Date of Loss" value={c.date} />
              <Field label="Type" value={c.type} />
              <Field label="Description" value={c.description} />
              <Field label="Amount Paid" value={c.amount} />
            </div>
          ))}
        </SectionCard>

        {/* 10 · Payment */}
        <SectionCard>
          <SectionHeader title="10 · Payment Plan" />
          <YesNoField label="Paperless?" value={payment.paperless} />
          <YesNoField label="Payment reminder?" value={payment.reminder} />
          <Field label="Plan Duration" value={payment.planDuration} />
          <Field label="Selected Plan" value={payment.planOption} />
        </SectionCard>

        {/* Comments */}
        {comments && (
          <SectionCard>
            <SectionHeader title="Comments / Special Instructions" />
            <div className="px-4 py-4">
              <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{comments}</p>
            </div>
          </SectionCard>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #E5E7EB' }}>
          <p className="text-[10px]" style={{ color: '#9CA3AF' }}>Generated by NorbieLink · {today}</p>
          <p className="text-[10px]" style={{ color: '#9CA3AF' }}>Submission #CA0094894 · Confidential</p>
        </div>
      </div>
    </div>
  )
}
