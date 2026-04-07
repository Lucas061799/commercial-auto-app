import { useState } from 'react'
import { RadioGroup } from '../components/FormField'
import norbieface from '../assets/norbieface.png'

const QUESTIONS = [
  { key: 'q3',  label: 'Are all the autos on the schedule owned by the applicant?' },
  { key: 'q4',  label: 'Are all auto records checked before employees are allowed to drive?' },
  { key: 'q9',  label: 'Does the applicant have an active auto safety program in place?' },
  { key: 'q10', label: 'Do all vehicles receive regular scheduled service and maintenance?' },
  { key: 'q1',  label: 'Is the applicant a subsidiary of another entity or does the applicant have any subsidiaries?' },
  { key: 'q2',  label: 'Are any vehicles leased to others by the applicant?' },
  { key: 'q5',  label: 'Are there any employees under the age of 18 with access to named vehicles?' },
  { key: 'q6',  label: 'Are there any family driver exposures?' },
  { key: 'q7',  label: 'Is non-business use of company vehicles allowed?' },
  { key: 'q8',  label: 'Do employees use their own autos in the business?' },
  { key: 'q11', label: 'Is the annual total mileage driven on any vehicle greater than 40,000 miles?' },
  { key: 'q12', label: 'Is there any exposure to flammables, explosives, or chemicals, or do operators involve transporting hazardous materials?' },
  { key: 'q13', label: 'Has any policy or coverage been declined, cancelled or non-renewed during the prior 3 years?' },
  { key: 'q14', label: 'Have there been any bankruptcies, tax or credit liens against the applicant in the past 5 years?' },
  { key: 'q15', label: 'Does the insured cross state lines?' },
]

const YES_KEYS = ['q3', 'q4', 'q9', 'q10']
const NO_KEYS  = ['q1', 'q2', 'q5', 'q6', 'q7', 'q8', 'q11', 'q12', 'q13', 'q14', 'q15']
const Q_MAP = Object.fromEntries(QUESTIONS.map(q => [q.key, q]))

const QUICK_FILL_DEFAULTS = {
  q1: 'No', q2: 'No', q3: 'Yes', q4: 'Yes', q5: 'No',
  q6: 'No', q7: 'No', q8: 'No', q9: 'Yes', q10: 'Yes',
  q11: 'No', q12: 'No', q13: 'No', q14: 'No', q15: 'No',
}

function QuestionCard({ q, value, onChange, autoFilled }) {
  return (
    <div className={`rounded-xl p-4 border transition-all ${autoFilled ? 'border-[#5C2ED4]/20 bg-[#F3F0FF]/40' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-gray-800 leading-relaxed flex-1">{q.label}</p>
        {autoFilled && (
          <span className="text-[9px] font-bold text-[#5C2ED4] bg-brand-light px-2 py-0.5 rounded-full shrink-0 mt-0.5">Auto-Filled</span>
        )}
      </div>
      <div className="mt-3">
        <RadioGroup options={['Yes', 'No']} value={value} onChange={onChange} />
      </div>
    </div>
  )
}

function CollapsibleGroup({ title, subtitle, keys, data, onChange, defaultColor, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: defaultColor + '33' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-all"
        style={{ background: defaultColor + '0D' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold" style={{ color: defaultColor }}>{title}</span>
          <span className="text-[10px] text-gray-400 font-medium">{subtitle}</span>
        </div>
        <svg
          className="w-4 h-4 transition-transform shrink-0"
          style={{ color: defaultColor, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div className="p-3 space-y-2 bg-white">
          {keys.map(key => (
            <QuestionCard
              key={key}
              q={Q_MAP[key]}
              value={data[key]}
              onChange={val => onChange(key, val)}
              autoFilled={data[key] === QUICK_FILL_DEFAULTS[key]}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function EligibilityInformation({ formData, updateFormData }) {
  const data = formData.eligibility || {}
  const [quickFilled, setQuickFilled] = useState(false)

  const handleQuickFill = () => {
    updateFormData('eligibility', QUICK_FILL_DEFAULTS)
    setQuickFilled(true)
  }

  const handleChange = (key, val) => {
    updateFormData('eligibility', { [key]: val })
  }

  const handleReset = () => {
    updateFormData('eligibility', {})
    setQuickFilled(false)
  }

  const allAnswered = QUESTIONS.every(q => data[q.key] !== undefined)

  return (
    <div className="w-full">
      <p className="text-xs text-gray-500 mb-5">Please answer all questions accurately. Your responses help determine coverage eligibility.</p>

      {/* Norbie Quick-Fill Banner */}
      {!quickFilled && (
        <div
          className="mb-5 flex items-center justify-between rounded-2xl px-5 py-3.5 border border-[#7C3AED]/10 gap-4"
          style={{ background: 'linear-gradient(to right, #F8F6FF, #F2FAF8)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <img src={norbieface} alt="Norbie" className="w-9 h-9 rounded-full shrink-0" />
            <div>
              <p className="text-sm font-bold text-navy leading-tight">Let Norbie pre-fill standard answers.</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Select <span className="font-semibold text-gradient">"All Yes"</span> in one click
              </p>
            </div>
          </div>
          <button
            onClick={handleQuickFill}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-full transition-all hover:opacity-90 shrink-0"
            style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)', boxShadow: '0 4px 14px rgba(92,46,212,0.3)' }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Quick-fill standard answers
          </button>
        </div>
      )}

      {/* After quick-fill: two collapsible dropdowns */}
      {quickFilled ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-[#5C2ED4] font-medium">
              Standard answers applied — expand each group to review or adjust.
            </p>
            <button onClick={handleReset} className="text-[10px] text-gray-400 hover:text-gray-600 underline shrink-0">Reset all</button>
          </div>
          <CollapsibleGroup
            title="Users usually select Yes to these questions"
            subtitle={`(${YES_KEYS.length} questions)`}
            keys={YES_KEYS}
            data={data}
            onChange={handleChange}
            defaultColor="#5C2ED4"
            defaultOpen={false}
          />
          <CollapsibleGroup
            title="Users usually select No to these questions"
            subtitle={`(${NO_KEYS.length} questions)`}
            keys={NO_KEYS}
            data={data}
            onChange={handleChange}
            defaultColor="#A614C3"
            defaultOpen={false}
          />
        </div>
      ) : (
        /* Before quick-fill: questions in two labeled groups */
        <div className="space-y-6">
          {/* YES group */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-white px-2.5 py-1 rounded-full" style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)' }}>
                Ideally answered Yes
              </span>
              <span className="text-[10px] text-gray-400">Low risk / Compliant</span>
            </div>
            <div className="space-y-2">
              {YES_KEYS.map(key => (
                <QuestionCard
                  key={key}
                  q={Q_MAP[key]}
                  value={data[key]}
                  onChange={val => handleChange(key, val)}
                  autoFilled={false}
                />
              ))}
            </div>
          </div>

          {/* NO group */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-white px-2.5 py-1 rounded-full" style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)' }}>
                Ideally answered No
              </span>
              <span className="text-[10px] text-gray-400">High risk / Warning indicators</span>
            </div>
            <div className="space-y-2">
              {NO_KEYS.map(key => (
                <QuestionCard
                  key={key}
                  q={Q_MAP[key]}
                  value={data[key]}
                  onChange={val => handleChange(key, val)}
                  autoFilled={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {allAnswered && (
        <div className="mt-5 p-3 bg-[#F3F0FF] rounded-xl border border-[#7C3AED]/20 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#7C3AED] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p className="text-[11px] text-gradient font-medium">All eligibility questions answered — you're good to continue!</p>
        </div>
      )}
    </div>
  )
}
