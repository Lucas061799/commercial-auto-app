import { useMemo } from 'react'
import sidebarBg from '../assets/sidebar-bg.png'
import norbieface from '../assets/norbieface.png'

function getSectionCompletion(formData) {
  const results = {}
  const a = formData.applicant || {}
  results[1] = !!(a.namedInsured && a.entity && a.effectiveDate && a.email && a.phone)
  const vs = formData.vehicles?.vehicles || []
  results[2] = vs.length > 0 && vs.every(v => v.year && v.make && v.model)
  const ds = formData.drivers?.drivers || []
  results[3] = ds.length > 0 && ds.every(d => d.firstName && d.lastName)
  const e = formData.eligibility || {}
  results[4] = Object.keys(e).length >= 7
  const c = formData.coverage || {}
  results[5] = !!(c.liabilityLimit)
  results[6] = formData.additionalInsured?.hasAdditional !== undefined
  results[7] = formData.lossPayee?.hasPayee !== undefined
  results[8] = formData.priorHistory?.hasCurrent !== undefined
  results[9] = formData.claims?.hasClaims !== undefined
  results[10] = !!(formData.payment?.plan)
  return results
}

export default function Sidebar({ steps, activeStep, onStepClick, formData = {}, onCheckErrors, showSubmission, isDark, onToggleDark }) {
  const completion = useMemo(() => getSectionCompletion(formData), [formData])
  const completedCount = Object.values(completion).filter(Boolean).length
  const totalCount = steps.length
  const progressPct = Math.round((completedCount / totalCount) * 100)

  const allSteps = showSubmission
    ? [...steps, { id: 11, label: 'Submission', key: 'submission' }]
    : steps

  return (
    <aside
      className="w-64 2xl:w-72 flex flex-col h-full sticky top-0 shrink-0 relative overflow-hidden"
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
        <p className="text-xs mt-0.5" style={{ color: isDark ? '#9CA3AF' : '#9CA3AF' }}>Submission Number: CA0094894</p>
        <div className="mt-3" style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#F3F4F6'}` }} />
      </div>

      {/* Step Navigation */}
      <nav className="flex-1 py-1 px-3 overflow-y-auto sidebar-nav relative z-10">
        {allSteps.map((step) => {
          const isActive = step.id === activeStep
          const isDone = step.id <= 10 ? completion[step.id] : false
          const isSubmissionStep = step.id === 11

          return (
            <div key={step.id} className="relative mb-0.5">
              {/* Active left accent bar */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full"
                  style={{ background: 'linear-gradient(180deg, #5C2ED4 0%, #A614C3 100%)' }}
                />
              )}
              <button
                onClick={() => onStepClick(step.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
                style={isActive ? isDark ? {
                  background: 'linear-gradient(180deg, rgba(42,28,70,0.28) 0%, rgba(166,20,195,0.68) 100%)',
                  border: '1.5px solid rgba(166,20,195,0.65)',
                  boxShadow: '0 4px 24px rgba(166,20,195,0.25)',
                } : {
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%) border-box',
                  border: '1.5px solid transparent',
                  boxShadow: '0 2px 12px rgba(92,46,212,0.15)',
                } : {
                  border: '1.5px solid transparent',
                  background: 'transparent'
                }}
              >
                {isDone && !isActive ? (
                  <span className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: isDark ? 'rgba(166,20,195,0.28)' : 'rgba(166,20,195,0.10)' }}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                      <defs>
                        <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#5C2ED4"/>
                          <stop offset="100%" stopColor="#A614C3"/>
                        </linearGradient>
                      </defs>
                      <path d="M2.5 7l3 3 6-6" stroke={isDark ? '#D8A8F0' : 'url(#checkGrad)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                ) : (
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0"
                    style={isActive
                      ? { background: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }
                      : { background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.85)', color: isDark ? '#C4B5D4' : '#9CA3AF' }
                    }
                  >
                    {isSubmissionStep ? '✓' : step.id}
                  </span>
                )}
                <span
                  className={`text-xs truncate ${isActive ? 'font-semibold' : isDone ? 'font-medium' : ''}`}
                  style={isActive
                    ? isDark
                      ? { color: '#FFFFFF' }
                      : {
                          background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                    : { color: isDark ? (isDone ? '#D1D5DB' : '#8B8FA8') : (isDone ? '#4B5563' : '#9CA3AF') }
                  }
                >
                  {step.label}
                </span>
              </button>
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
            {/* Sun / Moon icon */}
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
          {/* Toggle pill */}
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

      {/* Background image — only shown in light mode */}
      {!isDark && (
        <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none select-none">
          <img
            src={sidebarBg}
            alt=""
            className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom opacity-30"
          />
        </div>
      )}
    </aside>
  )
}
