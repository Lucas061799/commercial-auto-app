import { useState, useEffect } from 'react'
import norbielinkLogo from '../assets/norbielink-logo.png'
import btisLogo from '../assets/btislogo.png'
import norbieface from '../assets/norbieface.png'
import sidebarBg from '../assets/sidebar-bg.png'
import iconWorker from '../assets/icon-worker.png'
import iconGL from '../assets/icon-general-liability.png'
import iconBO from '../assets/icon-business-owner.png'
import sellMoreBg from '../assets/sell-more-bg.png'

const SUBMISSION_ID = 'CA0094894'
const STEP_LABELS = ['Applicant','Vehicles','Driver','Eligibility','Coverage','Additional Insured','Loss Payee','Prior History','Claims','Payment Plan']

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 2,
    color: ['#5C2ED4','#A614C3','#ACD697','#75C9B7','#FFD700','#FF6B6B','#4ECDC4'][i % 7],
    size: 6 + Math.random() * 8,
    rotate: Math.random() * 360,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-20px',
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.id % 3 === 0 ? '50%' : '2px',
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotate}deg)`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
        }
      `}</style>
    </div>
  )
}

export default function Submission({ formData, onBack }) {
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4500)
    return () => clearTimeout(t)
  }, [])
  const applicant = formData.applicant || {}
  const vehicles  = formData.vehicles?.vehicles || []
  const coverage  = formData.coverage || {}

  return (
    <div className="flex flex-col h-screen bg-white font-montserrat overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Full-width top header — identical to homepage */}
      <header className="flex items-center justify-between bg-white border-b border-gray-100 shrink-0 z-10" style={{ height: '56px' }}>
        <div className="w-64 shrink-0 px-5 flex items-center h-full">
          <button onClick={onBack} className="focus:outline-none">
            <img src={norbielinkLogo} alt="NorbieLink" className="h-8" />
          </button>
        </div>
        <div className="flex items-center gap-2 px-8">
          <span className="text-xs text-gray-400 tracking-wide">POWERED BY</span>
          <img src={btisLogo} alt="btis" className="h-7" />
        </div>
      </header>

      {/* Three-column layout — identical to homepage */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar — identical structure to main Sidebar component */}
        <aside className="w-64 border-r border-gray-100 flex flex-col h-full shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #ffffff 55%, rgba(255,255,255,0.6) 75%, rgba(255,255,255,0) 100%)' }}>

          {/* Title — left-aligned with logo above */}
          <div className="px-5 pt-5 pb-3 relative z-10">
            <h2 className="text-base font-bold text-navy leading-tight">Commercial Auto</h2>
            <p className="text-xs text-gray-400 mt-0.5">Submission Number: {SUBMISSION_ID}</p>
            <div className="mt-3 border-b border-gray-100" />
          </div>

          {/* Steps */}
          <nav className="flex-1 py-1 px-3 overflow-y-auto sidebar-nav relative z-10">
            {[...STEP_LABELS, 'Submission'].map((label, i) => {
              const isLast = i === STEP_LABELS.length
              return (
                <div key={label} className="relative mb-0.5">
                  {/* Active left bar for last step */}
                  {isLast && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full z-20"
                      style={{ background: 'linear-gradient(180deg, #5C2ED4 0%, #A614C3 100%)' }}
                    />
                  )}
                  <div
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={isLast ? {
                      background: 'linear-gradient(white, white) padding-box, linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%) border-box',
                      border: '1.5px solid transparent',
                    } : { border: '1.5px solid transparent' }}
                  >
                    {/* Badge */}
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(166, 20, 195, 0.10)' }}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                        <defs>
                          <linearGradient id={`cg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#5C2ED4"/>
                            <stop offset="100%" stopColor="#A614C3"/>
                          </linearGradient>
                        </defs>
                        <path d="M2.5 7l3 3 6-6" stroke={`url(#cg${i})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {/* Label */}
                    <span
                      className={`text-xs truncate ${isLast ? 'font-semibold' : 'text-gray-500 font-medium'}`}
                      style={isLast ? {
                        background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      } : {}}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Jungle bg */}
          <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none select-none">
            <img src={sidebarBg} alt="" className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom opacity-30" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto custom-scroll bg-white">
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-10 py-8 space-y-6">

            {/* Submission Complete Card */}
            <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">
              {/* Gradient top accent bar */}
              <div className="h-1" style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)' }} />

              {/* Header row */}
              <div className="flex items-start gap-4 px-6 pt-5 pb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(88.09deg, rgba(92,46,212,0.1) 0%, rgba(166,20,195,0.1) 100%)' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke="url(#checkG)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="checkG" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#5C2ED4"/><stop offset="100%" stopColor="#A614C3"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-navy mb-1">Submission Complete!</h1>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Your commercial auto insurance application has been received and is being processed. You'll receive a confirmation email shortly.
                  </p>
                </div>
              </div>

              {/* Info row — Submission ID · Date · Status */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
                {[
                  { label: 'Submission ID', value: SUBMISSION_ID },
                  { label: 'Date Submitted', value: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                  { label: 'Status', value: 'Under Review', highlight: true },
                ].map(item => (
                  <div key={item.label} className="px-5 py-4">
                    <p className="text-[10px] text-gray-400 mb-1">{item.label}</p>
                    {item.highlight
                      ? <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <p className="text-sm font-semibold text-amber-500">{item.value}</p>
                        </span>
                      : <p className="text-sm font-semibold text-navy">{item.value}</p>
                    }
                  </div>
                ))}
              </div>

              {/* Expandable details + print */}
              <button
                onClick={() => setSummaryOpen(o => !o)}
                className="w-full flex items-center justify-between px-6 py-3 border-t border-gray-100 transition text-xs font-medium text-gray-500"
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(92,46,212,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                  </svg>
                  Print &amp; View Full Submission
                </span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {summaryOpen && (
                <div className="px-6 pb-6 border-t border-gray-50 pt-4">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                  <SummarySection title="Applicant Information" icon="user">
                    <SummaryRow label="Business Name" value={applicant.namedInsured || 'Acme Corporation'} />
                    <SummaryRow label="Industry" value={applicant.description || 'Transportation'} />
                    <SummaryRow label="Years in Business" value={applicant.yearsInBusiness || '5 Years'} />
                  </SummarySection>
                  <SummarySection title="Vehicle Information" icon="truck">
                    <SummaryRow label="Total Vehicles" value={`${vehicles.length || 3} Vehicles`} />
                    <SummaryRow label="Vehicle Types" value="Light Trucks" />
                    <SummaryRow label="Primary Use" value="Service/Repair" />
                  </SummarySection>
                  <SummarySection title="Coverage Details" icon="shield">
                    <SummaryRow label="Liability Limit" value={coverage.liabilityLimit || '$1M/$2M'} />
                    <SummaryRow label="Deductible" value={coverage.deductible || '$500'} />
                    <SummaryRow label="Policy Term" value={coverage.policyTerm || '12 Months'} />
                  </SummarySection>
                  </div>

                  {/* Print button */}
                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition border"
                    style={{ borderColor: 'rgba(92,46,212,0.2)', background: 'white' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(88.09deg, rgba(92,46,212,0.08) 0%, rgba(166,20,195,0.08) 100%)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="printG" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#5C2ED4"/><stop offset="100%" stopColor="#A614C3"/>
                        </linearGradient>
                      </defs>
                      <path stroke="url(#printG)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                    </svg>
                    <span style={{
                      background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>Print Submission</span>
                  </button>
                </div>
              )}
            </div>

            {/* Complete Your Coverage */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-10 py-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(166,20,195,0.10)' }}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="url(#lgBolt)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                      <defs>
                        <linearGradient id="lgBolt" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#5C2ED4"/>
                          <stop offset="100%" stopColor="#A614C3"/>
                        </linearGradient>
                      </defs>
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gradient">Complete Your Coverage</span>
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">We Already Have Your Client's Info—Get Quotes Faster!</h3>
                <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
                  Add essential coverages in minutes. Your business information is already saved, so getting additional quotes is quick and easy.
                </p>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { name: "Workers' Compensation", desc: 'Required coverage for employees',        price: '$1,200/year', badge: 'TOP PICK',    badgeClass: 'btn-gradient', icon: iconWorker },
                  { name: 'General Liability',      desc: 'Protect against third-party claims',    price: '$450/year',   badge: 'RECOMMENDED', badgeClass: 'bg-teal',      icon: iconGL },
                  { name: 'Business Owners',        desc: 'Bundle and save on multiple coverages', price: '$850/year',   badge: 'BEST VALUE',  badgeClass: 'bg-teal',      icon: iconBO },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between px-5 py-4 border border-gray-100 rounded-2xl hover:shadow-sm transition">
                    <div className="flex items-center gap-4">
                      {/* Icon at 0.5x — w-6 h-6 instead of w-12 h-12 */}
                      <div className="w-6 h-6 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                        <img src={item.icon} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <p className="text-sm font-bold text-navy">{item.name}</p>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded text-white ${item.badgeClass}`}>{item.badge}</span>
                        </div>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 ml-4">
                      <div className="text-right">
                        <p className="text-base font-bold text-gradient">{item.price}</p>
                        <p className="text-[10px] text-gray-400">estimated</p>
                      </div>
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl transition btn-gradient">
                        Get Quote Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Return to the Jungle CTA */}
            <div
              className="rounded-2xl relative cursor-pointer hover:opacity-95 transition overflow-hidden"
              onClick={onBack}
              style={{ minHeight: '100px' }}
            >
              <img src={sellMoreBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="px-8 py-6 relative z-10">
                <p className="text-lg font-bold text-navy mb-1">Return to the Jungle?</p>
                <p className="text-xs text-gray-400">Head back to <span className="font-semibold text-gradient underline underline-offset-2">Norbielink</span></p>
              </div>
            </div>
          </div>
        </main>

        {/* Right Panel */}
        <aside className="w-80 bg-white border-l border-gray-100 flex flex-col shrink-0">
          <div className="p-5 flex-1 overflow-y-auto custom-scroll">

            {/* Title */}
            <h2 className="text-lg font-bold text-navy mb-3">Quote Submitted</h2>

            {/* Auto-saved + % row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="autoGradSub" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5C2ED4"/>
                      <stop offset="100%" stopColor="#A614C3"/>
                    </linearGradient>
                  </defs>
                  <path d="M12 16V9m0 0l-3 3m3-3l3 3" stroke="url(#autoGradSub)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 18A4.5 4.5 0 016 9.1V9a6 6 0 0111.9-.9A4.5 4.5 0 0118 18H6.5z" stroke="url(#autoGradSub)" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs font-medium text-gradient">All progress auto-saved</span>
              </div>
              <span className="text-xs font-bold text-gradient">100%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div className="h-full rounded-full w-full transition-all duration-500" style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)' }} />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-5" />

            {/* What's Next */}
            <h3 className="text-sm font-bold text-navy mb-5">What's Next?</h3>
            <div className="space-y-6 mb-6">
              {[
                { n: 1, title: 'Review & Processing', desc: 'Your application will be reviewed within 24-48 hours' },
                { n: 2, title: 'Email Confirmation',  desc: "You'll receive detailed quote confirmation via email" },
              ].map(item => (
                <div key={item.n} className="flex gap-4">
                  <span className="w-9 h-9 rounded-full text-sm font-bold flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(88.09deg, rgba(92,46,212,0.1) 0%, rgba(166,20,195,0.1) 100%)' }}><span className="text-gradient">{item.n}</span></span>
                  <div>
                    <p className="text-sm font-medium text-navy">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="px-4 py-4 border-t border-gray-100 shrink-0 space-y-3">
            <p className="text-xs text-gray-400">Need assistance?</p>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <img src={norbieface} alt="Norbie" className="w-8 h-8 rounded-full shrink-0 object-cover" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Chat with Norbie</p>
                <p className="text-xs text-gray-400">AI Assistant</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function SummarySection({ title, icon, children }) {
  const icons = {
    user:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>,
    truck:    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1M13 16l2 1m0-11l3 5h2a1 1 0 011 1v4"/>,
    shield:   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
    building: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>,
  }
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-teal-light rounded-lg flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icons[icon]}
          </svg>
        </div>
        <h3 className="text-xs font-bold text-navy">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function SummaryRow({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span className="text-[10px] text-gray-400">{label}</span>
      <span className={`text-[10px] ${bold ? 'font-bold text-navy' : 'font-semibold text-gray-700'}`}>{value}</span>
    </div>
  )
}
