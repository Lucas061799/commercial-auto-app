import { useMemo } from 'react'
import sidebarBg from '../assets/sidebar-bg.png'

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

export default function Sidebar({ steps, activeStep, onStepClick, formData = {}, onCheckErrors, showSubmission }) {
  const completion = useMemo(() => getSectionCompletion(formData), [formData])
  const completedCount = Object.values(completion).filter(Boolean).length
  const totalCount = steps.length
  const progressPct = Math.round((completedCount / totalCount) * 100)

  const allSteps = showSubmission
    ? [...steps, { id: 11, label: 'Submission', key: 'submission' }]
    : steps

  return (
    <aside className="w-64 2xl:w-72 border-r border-gray-100 flex flex-col h-full sticky top-0 shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #ffffff 55%, rgba(255,255,255,0.6) 75%, rgba(255,255,255,0) 100%)' }}>

      {/* Title */}
      <div className="px-5 pt-5 pb-3 relative z-10">
        <h2 className="text-base font-bold text-navy leading-tight">Commercial Auto</h2>
        <p className="text-xs text-gray-400 mt-0.5">Submission Number: CA0094894</p>
        <div className="mt-3 border-b border-gray-100" />
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
                style={isActive ? {
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%) border-box',
                  border: '1.5px solid transparent'
                } : {
                  border: '1.5px solid transparent',
                  background: 'transparent'
                }}
              >
                {isDone && !isActive ? (
                  <span className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(166, 20, 195, 0.10)' }}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                      <defs>
                        <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#5C2ED4"/>
                          <stop offset="100%" stopColor="#A614C3"/>
                        </linearGradient>
                      </defs>
                      <path d="M2.5 7l3 3 6-6" stroke="url(#checkGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                ) : (
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0"
                    style={isActive
                      ? { background: 'rgba(166, 20, 195, 0.10)', color: '#7B2FBE' }
                      : { background: 'rgba(255,255,255,0.85)', color: '#9CA3AF' }
                    }
                  >
                    {isSubmissionStep ? '✓' : step.id}
                  </span>
                )}
                <span
                  className={`text-xs truncate ${isActive ? 'font-semibold' : isDone ? 'text-gray-600 font-medium' : 'text-gray-400'}`}
                  style={isActive ? {
                    background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  } : {}}
                >
                  {step.label}
                </span>
              </button>
            </div>
          )
        })}
      </nav>

      {/* Jungle background image — full height, shows through transparent nav */}
      <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none select-none">
        <img
          src={sidebarBg}
          alt=""
          className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom opacity-30"
        />
      </div>
    </aside>
  )
}
