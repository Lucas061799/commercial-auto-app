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

export default function Submission({ formData, onBack, isDark = false, onToggleDark }) {
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4500)
    return () => clearTimeout(t)
  }, [])
  const applicant = formData.applicant || {}
  const vehicles  = formData.vehicles?.vehicles || []
  const coverage  = formData.coverage || {}
  const comments  = formData.comments?.text || ''

  return (
    <div className="flex flex-col h-screen font-montserrat overflow-hidden" style={{ background: isDark ? '#131629' : 'white' }}>
      {showConfetti && <Confetti />}

      {/* Full-width top header */}
      <header
        className="flex items-center justify-between shrink-0 z-10"
        style={{
          height: '56px',
          background: isDark ? '#191D35' : 'white',
          borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #F3F4F6',
        }}
      >
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

      {/* Three-column layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar */}
        <aside
          className="w-64 2xl:w-72 flex flex-col h-full shrink-0 relative overflow-hidden"
          style={{
            background: isDark
              ? '#191D35'
              : 'linear-gradient(to bottom, #ffffff 55%, rgba(255,255,255,0.6) 75%, rgba(255,255,255,0) 100%)',
            borderRight: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #F3F4F6',
          }}
        >

          {/* Title */}
          <div className="px-5 pt-5 pb-3 relative z-10">
            <h2 className="text-base font-bold leading-tight" style={{ color: isDark ? '#F9FAFB' : undefined }}>Commercial Auto</h2>
            <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>Submission Number: {SUBMISSION_ID}</p>
            <div className="mt-3" style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#F3F4F6'}` }} />
          </div>

          {/* Steps */}
          <nav className="flex-1 py-1 px-3 overflow-y-auto sidebar-nav relative z-10">
            {[...STEP_LABELS, 'Submission'].map((label, i) => {
              const isLast = i === STEP_LABELS.length
              return (
                <div key={label} className="relative mb-0.5">
                  {isLast && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full z-20"
                      style={{ background: 'linear-gradient(180deg, #5C2ED4 0%, #A614C3 100%)' }}
                    />
                  )}
                  <div
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={isLast ? isDark ? {
                      background: 'linear-gradient(180deg, rgba(166,20,195,0.68) 0%, rgba(42,28,70,0.28) 100%)',
                      border: '1.5px solid rgba(166,20,195,0.65)',
                      boxShadow: '0 4px 24px rgba(166,20,195,0.25)',
                    } : {
                      background: 'linear-gradient(white, white) padding-box, linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%) border-box',
                      border: '1.5px solid transparent',
                      boxShadow: '0 2px 12px rgba(92,46,212,0.15)',
                    } : { border: '1.5px solid transparent' }}
                  >
                    {/* Badge — checkmark for all */}
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: isLast ? 'linear-gradient(135deg, #5C2ED4 0%, #A614C3 100%)' : (isDark ? 'rgba(166,20,195,0.15)' : 'rgba(166, 20, 195, 0.10)') }}
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
                      className={`text-xs truncate ${isLast ? 'font-semibold' : 'font-medium'}`}
                      style={isLast
                        ? isDark
                          ? { color: '#FFFFFF' }
                          : {
                              background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }
                        : { color: isDark ? '#9CA3AF' : '#6B7280' }
                      }
                    >
                      {label}
                    </span>
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Chat with Norbie */}
          <div className="px-3 pb-2 relative z-10">
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#f9fafb' }}
            >
              <img src={norbieface} alt="Norbie" className="w-8 h-8 rounded-full shrink-0 object-cover" />
              <div>
                <p className="text-sm font-semibold" style={{ color: isDark ? '#F9FAFB' : '#374151' }}>Chat with Norbie</p>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>AI Assistant</p>
              </div>
            </div>
          </div>

          {/* Dark Mode toggle */}
          <div className="px-3 pb-4 relative z-10">
            <button
              onClick={onToggleDark}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
              style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#f9fafb' }}
            >
              <div className="flex items-center gap-3">
                {isDark ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#F9FAFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                )}
                <span className="text-sm font-semibold" style={{ color: isDark ? '#F9FAFB' : '#374151' }}>Dark Mode</span>
              </div>
              <div
                className="w-10 h-5 rounded-full relative transition-all"
                style={{ background: isDark ? 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)' : '#e5e7eb' }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
                  style={{ left: isDark ? '22px' : '2px' }}
                />
              </div>
            </button>
          </div>

          {/* Background image — light mode only */}
          {!isDark && (
            <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none select-none">
              <img src={sidebarBg} alt="" className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom opacity-30" />
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto custom-scroll" style={{ background: isDark ? '#131629' : 'white' }}>
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-10 py-8 space-y-6">

            {/* Submission Complete Card */}
            <div className="rounded-2xl overflow-hidden" style={{ background: isDark ? '#1A1E38' : 'white', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #F3F4F6' }}>
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
                <div className="px-6 pb-6 pt-4" style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #f9fafb' }}>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                  <SummarySection title="Applicant Information" icon="user" isDark={isDark}>
                    <SummaryRow label="Business Name" value={applicant.namedInsured || 'Acme Corporation'} isDark={isDark} />
                    <SummaryRow label="Industry" value={applicant.description || 'Transportation'} isDark={isDark} />
                    <SummaryRow label="Years in Business" value={applicant.yearsInBusiness || '5 Years'} isDark={isDark} />
                  </SummarySection>
                  <SummarySection title="Vehicle Information" icon="truck" isDark={isDark}>
                    <SummaryRow label="Total Vehicles" value={`${vehicles.length || 1} Vehicles`} isDark={isDark} />
                    <SummaryRow label="Vehicle Types" value="Light Trucks" isDark={isDark} />
                    <SummaryRow label="Primary Use" value="Service/Repair" isDark={isDark} />
                  </SummarySection>
                  <SummarySection title="Coverage Details" icon="shield" isDark={isDark}>
                    <SummaryRow label="Liability Limit" value={coverage.liabilityLimit || '$1M/$2M'} isDark={isDark} />
                    <SummaryRow label="Deductible" value={coverage.deductible || '$500'} isDark={isDark} />
                    <SummaryRow label="Policy Term" value={coverage.policyTerm || '12 Months'} isDark={isDark} />
                  </SummarySection>
                  </div>

                  {/* Print button */}
                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition border"
                    style={{ borderColor: 'rgba(92,46,212,0.2)', background: isDark ? 'rgba(255,255,255,0.04)' : 'white' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(88.09deg, rgba(92,46,212,0.08) 0%, rgba(166,20,195,0.08) 100%)'}
                    onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'white'}
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

            {/* Comments received card — only if user left a comment */}
            {comments && (
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(92,46,212,0.12)' }}>
                <div className="h-1" style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)' }} />
                <div className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(88.09deg, rgba(92,46,212,0.1) 0%, rgba(166,20,195,0.1) 100%)' }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          stroke="url(#msgG)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <defs>
                          <linearGradient id="msgG" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#5C2ED4"/><stop offset="100%" stopColor="#A614C3"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-navy">We received your comments!</p>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)' }}>NOTED</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">Our team will review your notes and follow up if needed.</p>
                      <div className="rounded-xl px-4 py-3 border" style={{ background: 'linear-gradient(88.09deg, rgba(92,46,212,0.04) 0%, rgba(166,20,195,0.04) 100%)', borderColor: 'rgba(92,46,212,0.1)' }}>
                        <p className="text-xs text-gray-600 leading-relaxed italic">"{comments}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Complete Your Coverage */}
            <div className="rounded-2xl px-10 py-8" style={{ background: isDark ? '#1A1E38' : 'white', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #F3F4F6' }}>
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
                  <div key={item.name} className="flex items-center justify-between px-5 py-4 rounded-2xl hover:shadow-sm transition" style={{ border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #F3F4F6' }}>
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
        <aside className="w-80 flex flex-col shrink-0" style={{ background: isDark ? '#191D35' : 'white', borderLeft: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #F3F4F6' }}>
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

        </aside>
      </div>
    </div>
  )
}

function SummarySection({ title, icon, children, isDark = false }) {
  const icons = {
    user:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>,
    truck:    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1M13 16l2 1m0-11l3 5h2a1 1 0 011 1v4"/>,
    shield:   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
    building: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>,
  }
  return (
    <div className="rounded-xl p-4" style={{ background: isDark ? '#252948' : 'white', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #F3F4F6' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: isDark ? 'rgba(92,46,212,0.2)' : '#e6f7f4' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke={isDark ? '#73C9B7' : '#73C9B7'} viewBox="0 0 24 24">
            {icons[icon]}
          </svg>
        </div>
        <h3 className="text-xs font-bold" style={{ color: isDark ? '#F9FAFB' : '#1f2937' }}>{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function SummaryRow({ label, value, bold, isDark = false }) {
  return (
    <div className="flex justify-between">
      <span className="text-[10px] text-gray-400">{label}</span>
      <span className="text-[10px] font-semibold" style={{ color: isDark ? (bold ? '#F9FAFB' : '#D1D5DB') : (bold ? '#1f2937' : '#374151') }}>{value}</span>
    </div>
  )
}
