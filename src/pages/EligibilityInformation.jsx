import { useState } from 'react'
import { RadioGroup } from '../components/FormField'
import norbieface from '../assets/norbieface.png'

const QUESTIONS = [
  { key: 'q1',  label: 'Is the applicant a subsidiary of another entity or does the applicant have any subsidiaries?' },
  { key: 'q2',  label: 'Are any vehicles leased to others by the applicant?' },
  { key: 'q3',  label: 'Are all the autos on the schedule owned by the applicant?' },
  { key: 'q4',  label: 'Are all auto records checked before employees are allowed to drive?' },
  { key: 'q5',  label: 'Are there any employees under the age of 18 with access to named vehicles?' },
  { key: 'q6',  label: 'Are there any family driver exposures?' },
  { key: 'q7',  label: 'Is non-business use of company vehicles allowed?' },
  { key: 'q8',  label: 'Do employees use their own autos in the business?' },
  { key: 'q9',  label: 'Does the applicant have an active auto safety program in place?' },
  { key: 'q10', label: 'Do all vehicles receive regular scheduled service and maintenance?' },
  { key: 'q11', label: 'Is the annual total mileage driven on any vehicle greater than 40,000 miles?' },
  { key: 'q12', label: 'Is there any exposure to flammables, explosives, or chemicals, or do operators involve transporting hazardous materials?' },
  { key: 'q13', label: 'Has any policy or coverage been declined, cancelled or non-renewed during the prior 3 years?' },
  { key: 'q14', label: 'Have there been any bankruptcies, tax or credit liens against the applicant in the past 5 years?' },
  { key: 'q15', label: 'Does the insured cross state lines?' },
]

const QUICK_FILL_DEFAULTS = {
  q1: 'Yes', q2: 'Yes', q3: 'Yes', q4: 'Yes', q5: 'Yes',
  q6: 'Yes', q7: 'Yes', q8: 'Yes', q9: 'Yes', q10: 'Yes',
  q11: 'Yes', q12: 'Yes', q13: 'Yes', q14: 'Yes', q15: 'Yes',
}

export default function EligibilityInformation({ formData, updateFormData }) {
  const data = formData.eligibility || {}
  const [quickFilled, setQuickFilled] = useState(false)
  const [quickFillKeys, setQuickFillKeys] = useState([])

  const handleQuickFill = () => {
    updateFormData('eligibility', QUICK_FILL_DEFAULTS)
    setQuickFilled(true)
    setQuickFillKeys(Object.keys(QUICK_FILL_DEFAULTS))
  }

  const handleManualChange = (key, val) => {
    updateFormData('eligibility', { [key]: val })
    setQuickFillKeys(prev => prev.filter(k => k !== key))
  }

  const allAnswered = QUESTIONS.every(q => data[q.key] !== undefined)

  return (
    <div className="w-full">
      <p className="text-xs text-gray-500 mb-5">Please answer all questions accurately. Your responses help determine coverage eligibility.</p>

      {/* Norbie Quick-Fill Banner — large */}
      {!quickFilled && (
        <div className="mb-5 bg-gradient-to-r from-[#F8F6FF] to-[#F2FAF8] rounded-2xl p-4 border border-[#7C3AED]/10 flex items-start gap-3">
          <img src={norbieface} alt="Norbie" className="w-9 h-9 rounded-full shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-bold text-navy mb-0.5">👋 Hey, I'm Norbie! Let me help speed this up.</p>
            <p className="text-[11px] text-gray-600 mb-3 leading-relaxed">
              Most standard commercial auto applicants answer "No" to risks and "Yes" to safety practices. I can pre-fill the typical safe answers — you can review and adjust anything that doesn't apply.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleQuickFill}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-full transition-all hover:opacity-90 shadow-md"
                style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)', boxShadow: '0 4px 14px rgba(92,46,212,0.35)' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Quick-fill standard answers
              </button>
              <span className="text-xs text-gray-400">or answer each question below</span>
            </div>
          </div>
        </div>
      )}

      {/* Norbie Quick-Fill Banner — compact */}
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

      {/* Quick-fill confirmation */}
      {quickFilled && quickFillKeys.length > 0 && (
        <div className="mb-5 bg-[#E8F5F3] rounded-xl p-3 border border-teal/20 flex items-center gap-2">
          <svg className="w-4 h-4 text-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p className="text-[11px] text-teal font-medium">
            Norbie filled {quickFillKeys.length} answers with standard defaults. Review below and adjust anything that doesn't match your situation.
          </p>
          <button
            onClick={() => { updateFormData('eligibility', {}); setQuickFilled(false); setQuickFillKeys([]) }}
            className="ml-auto text-[10px] text-gray-500 hover:text-gray-700 underline shrink-0"
          >
            Reset all
          </button>
        </div>
      )}

      <div className="space-y-3">
        {QUESTIONS.map((q) => {
          const isAutoFilled = quickFillKeys.includes(q.key)
          return (
            <div
              key={q.key}
              className={`rounded-xl p-4 border transition-all ${
                isAutoFilled
                  ? 'border-teal/30 bg-[#E8F5F3]/40'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-semibold text-gray-800 leading-relaxed flex-1">{q.label}</p>
                {isAutoFilled && (
                  <span className="text-[9px] font-bold text-teal bg-teal-light px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                    Auto-Filled
                  </span>
                )}
              </div>
              <div className="mt-3">
                <RadioGroup
                  options={['Yes', 'No']}
                  value={data[q.key]}
                  onChange={(val) => handleManualChange(q.key, val)}
                />
              </div>
            </div>
          )
        })}
      </div>

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
