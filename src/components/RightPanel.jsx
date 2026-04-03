import { useState, useRef } from 'react'
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
  results[10] = !!(formData.payment?.planDuration)
  return results
}

export default function RightPanel({ onFormReview, formData = {} }) {
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  const completion = getSectionCompletion(formData)
  const completedCount = Object.values(completion).filter(Boolean).length
  const progressPct = Math.round((completedCount / 10) * 100)

  const addFiles = (newFiles) => {
    const arr = Array.from(newFiles).map(f => ({ name: f.name, size: f.size, id: Math.random() }))
    setFiles(prev => [...prev, ...arr])
  }
  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id))
  const formatSize = (bytes) => bytes < 1024 ? bytes + ' bytes' : Math.round(bytes / 1024) + ' KB'

  return (
    <aside className="w-80 2xl:w-96 bg-white border-l border-gray-100 flex flex-col h-full sticky top-0 shrink-0">
      <div className="p-5 flex-1 overflow-y-auto sidebar-nav">

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-500">Progress</span>
            <span className="text-xs font-bold text-gradient">{progressPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)' }}
            />
          </div>
        </div>

        {/* Auto-saved indicator */}
        <div className="flex items-center gap-1.5 mb-4">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="autoGradRP" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5C2ED4"/>
                <stop offset="100%" stopColor="#A614C3"/>
              </linearGradient>
            </defs>
            <path d="M12 16V9m0 0l-3 3m3-3l3 3" stroke="url(#autoGradRP)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.5 18A4.5 4.5 0 016 9.1V9a6 6 0 0111.9-.9A4.5 4.5 0 0118 18H6.5z" stroke="url(#autoGradRP)" strokeWidth="1.8" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-medium text-gradient">All progress auto-saved</span>
        </div>

        {/* Form Review button */}
        <button
          onClick={onFormReview}
          className="w-full flex items-center justify-center gap-1.5 py-2 mb-5 rounded-xl text-xs font-semibold transition"
          style={{ color: '#A614C3', border: '1px solid rgba(166,20,195,0.3)', background: 'white' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(166,20,195,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'white'}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Form Review
        </button>

        {/* Quote in Progress */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-navy mb-3">Quote in Progress</h3>
          <button disabled className="w-full flex items-center justify-center gap-2 py-2 mb-3 border border-gray-200 rounded-xl text-xs text-gray-400 bg-gray-50 cursor-default">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh My Quote
          </button>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 border border-gray-100 rounded-xl bg-gray-50">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse shrink-0" />
                <div className="flex-1">
                  <div className="w-16 h-3.5 bg-gray-200 rounded animate-pulse mb-1.5" />
                  <div className="w-10 h-2.5 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="w-14 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-4 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(92,46,212,0.1)', background: 'linear-gradient(135deg, #F8F6FF 0%, #F0F9F7 100%)' }}>
          <div className="px-4 pt-4 pb-3">
            <h3 className="text-base font-bold text-navy leading-tight mb-1">Upload & Save Time</h3>
            <div className="flex items-center gap-1.5 mb-3">
              <p className="text-[11px] text-gray-500 font-medium whitespace-nowrap">Competitor quote or ACORD form?</p>
              <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-white text-[8px] font-bold" style={{ background: '#73C9B7' }}>i</div>
            </div>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer rounded-xl border-2 border-dashed transition-all flex flex-col items-center gap-1.5 py-4 px-3 ${dragging ? 'border-[#5C2ED4] bg-purple-50/50' : 'border-gray-200 hover:border-[#A614C3]/50 hover:bg-purple-50/20'}`}
            >
              <input ref={inputRef} type="file" multiple accept=".pdf,.jpg,.png" className="hidden" onChange={e => addFiles(e.target.files)} />
              {/* Paperclip icon */}
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
              </svg>
              <p className="text-[11px] font-semibold text-gray-500">Drop file here or click to upload</p>
              <p className="text-[10px] text-gray-400">PDF, JPG, PNG · Max 10MB</p>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mb-4 space-y-2">
            {files.map(f => (
              <div key={f.id} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-700 truncate max-w-[120px]">{f.name}</p>
                    <p className="text-[9px] text-gray-400">{formatSize(f.size)}</p>
                  </div>
                </div>
                <button onClick={e => { e.stopPropagation(); removeFile(f.id) }}>
                  <svg className="w-3.5 h-3.5 text-red-400 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat with Norbie */}
      <div className="px-4 py-4 border-t border-gray-100 shrink-0">
        <p className="text-xs text-gray-400 mb-2">Need assistance?</p>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
          <img src={norbieface} alt="Norbie" className="w-8 h-8 rounded-full shrink-0 object-cover" />
          <div>
            <p className="text-sm font-semibold text-gray-700">Chat with Norbie</p>
            <p className="text-xs text-gray-400">AI Assistant</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
