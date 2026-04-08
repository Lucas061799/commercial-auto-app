import { useState, useRef, useEffect, useCallback } from 'react'
import norbielinkLogo from './assets/norbielink-logo.png'
import btisLogo from './assets/btislogo.png'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import ApplicantInformation from './pages/ApplicantInformation'
import VehicleInformation from './pages/VehicleInformation'
import DriverInformation from './pages/DriverInformation'
import EligibilityInformation from './pages/EligibilityInformation'
import CoverageInformation from './pages/CoverageInformation'
import AdditionalInsured from './pages/AdditionalInsured'
import LossPayee from './pages/LossPayee'
import PriorHistory from './pages/PriorHistory'
import ClaimHistory from './pages/ClaimHistory'
import PaymentPlan from './pages/PaymentPlan'
import Submission from './pages/Submission'
import PageZero from './pages/PageZero'

const STEPS = [
  { id: 1, label: 'Applicant',          key: 'applicant' },
  { id: 2, label: 'Vehicles',           key: 'vehicles' },
  { id: 3, label: 'Driver',             key: 'driver' },
  { id: 4, label: 'Eligibility',        key: 'eligibility' },
  { id: 5, label: 'Coverage',           key: 'coverage' },
  { id: 6, label: 'Additional Insured', key: 'additionalInsured' },
  { id: 7, label: 'Loss Payee',         key: 'lossPayee' },
  { id: 8, label: 'Prior History',      key: 'priorHistory' },
  { id: 9, label: 'Claims',             key: 'claims' },
  { id: 10, label: 'Payment Plan',      key: 'paymentPlan' },
]

function UploadPopup({ onDismiss }) {
  const inputRef = useRef()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(15,10,40,0.35)', backdropFilter: 'blur(2px)' }}>
      <div className="w-80 rounded-2xl shadow-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8F6FF 0%, #EEF9F7 100%)', border: '1px solid rgba(92,46,212,0.12)' }}>
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-0">
          <div>
            <h3 className="text-lg font-bold text-navy leading-tight">Upload &amp; Save Time!</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <p className="text-xs text-gray-500 font-medium">Competitor quote or ACORD form?</p>
              <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-white text-[8px] font-bold" style={{ background: '#73C9B7' }}>i</div>
            </div>
          </div>
          <button onClick={onDismiss} className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Upload button */}
        <div className="px-5 pt-4 pb-2">
          <input ref={inputRef} type="file" multiple accept=".pdf,.jpg,.png" className="hidden" />
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)', boxShadow: '0 4px 14px rgba(92,46,212,0.3)' }}
          >
            Upload Here
          </button>
          <p className="text-[10px] text-center text-gray-400 mt-2">PDF, JPG, PNG · Max 10MB</p>
        </div>

        {/* Dismiss */}
        <div className="px-5 pb-4 pt-1 text-center">
          <button onClick={onDismiss} className="text-xs text-gray-400 hover:text-gray-600 transition underline underline-offset-2">
            Maybe later — I'll fill it manually
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [formData, setFormData] = useState({})
  const [activeStep, setActiveStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [pageZeroDone, setPageZeroDone] = useState(false)
  const [showUploadPopup, setShowUploadPopup] = useState(false)
  const [pulseUpload, setPulseUpload] = useState(false)
  const [errorFields, setErrorFields] = useState([])
  const sectionRefs = useRef({})
  const scrollContainerRef = useRef(null)
  const isScrollingToRef = useRef(false)

  const updateFormData = (section, data) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], ...data } }))
    // Clear errors for updated fields
    if (errorFields.length > 0) setErrorFields([])
  }

  const goToStep = useCallback((stepId) => {
    if (stepId === 11) {
      setSubmitted(true)
      return
    }
    const el = sectionRefs.current[stepId]
    if (!el || !scrollContainerRef.current) return
    isScrollingToRef.current = true
    setActiveStep(stepId)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => { isScrollingToRef.current = false }, 800)
  }, [])

  // Check errors: find all required empty fields and scroll to first
  const handleCheckErrors = useCallback(() => {
    const errors = []

    const a = formData.applicant || {}
    if (!a.namedInsured) errors.push({ section: 1, field: 'applicant-namedInsured' })
    if (!a.entity) errors.push({ section: 1, field: 'applicant-entity' })
    if (!a.effectiveDate) errors.push({ section: 1, field: 'applicant-effectiveDate' })
    if (!a.email) errors.push({ section: 1, field: 'applicant-email' })
    if (!a.phone) errors.push({ section: 1, field: 'applicant-phone' })

    const vs = formData.vehicles?.vehicles || []
    if (vs.length === 0) errors.push({ section: 2, field: 'vehicles' })

    const ds = formData.drivers?.drivers || []
    if (ds.length === 0) errors.push({ section: 3, field: 'drivers' })

    const c = formData.coverage || {}
    if (!c.liabilityLimit) errors.push({ section: 5, field: 'coverage-liabilityLimit' })

    if (!formData.payment?.plan) errors.push({ section: 10, field: 'payment-plan' })

    setErrorFields(errors.map(e => e.field))

    if (errors.length > 0) {
      // Scroll to first error section
      const firstSection = errors[0].section
      const el = sectionRefs.current[firstSection]
      if (el && scrollContainerRef.current) {
        isScrollingToRef.current = true
        setActiveStep(firstSection)
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setTimeout(() => { isScrollingToRef.current = false }, 800)
      }
    }
  }, [formData])

  const handleMainScroll = useCallback(() => {
    if (isScrollingToRef.current) return
    const container = scrollContainerRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()
    const threshold = containerRect.height * 0.35
    let current = STEPS[0].id
    STEPS.forEach(step => {
      const el = sectionRefs.current[step.id]
      if (el) {
        const top = el.getBoundingClientRect().top - containerRect.top
        if (top <= threshold) current = step.id
      }
    })
    setActiveStep(current)
  }, [])

  // Show upload popup once when first entering the form
  useEffect(() => {
    if (pageZeroDone) setShowUploadPopup(true)
  }, [pageZeroDone])

  const handleDismissPopup = () => {
    setShowUploadPopup(false)
    setPulseUpload(true)
    setTimeout(() => setPulseUpload(false), 3000)
  }

  if (!pageZeroDone) {
    return <PageZero onStart={(data) => { updateFormData('pageZero', data); setPageZeroDone(true) }} />
  }

  if (submitted) {
    return <Submission formData={formData} onBack={() => setSubmitted(false)} />
  }

  return (
    <div className="flex flex-col h-screen bg-white font-montserrat overflow-hidden">
      {showUploadPopup && <UploadPopup onDismiss={handleDismissPopup} />}
      {/* Full-width top header */}
      <header className="flex items-center justify-between bg-white border-b border-gray-100 shrink-0 z-10" style={{ height: '56px' }}>
        {/* Left: logo — same width as sidebar, left-aligned with Commercial Auto below */}
        <div className="w-64 2xl:w-72 shrink-0 px-5 flex items-center h-full">
          <img src={norbielinkLogo} alt="NorbieLink" className="h-8" />
        </div>
        {/* Right: powered by btis — pushed to far right */}
        <div className="flex items-center gap-2 px-8">
          <span className="text-xs text-gray-400 tracking-wide">POWERED BY</span>
          <img src={btisLogo} alt="btis" className="h-7" />
        </div>
      </header>

      {/* Three-column layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          steps={STEPS}
          activeStep={activeStep}
          onStepClick={goToStep}
          formData={formData}
          onCheckErrors={handleCheckErrors}
          showSubmission={submitted || false}
        />

        {/* Scrollable main content */}
        <main ref={scrollContainerRef} onScroll={handleMainScroll} className="flex-1 overflow-y-auto custom-scroll bg-white">
          <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-10 py-8 space-y-8">

            {[
              { id: 1, title: 'Applicant Information',  el: <ApplicantInformation formData={formData} updateFormData={updateFormData} errorFields={errorFields} /> },
              { id: 2, title: 'Vehicle Information',    el: <VehicleInformation formData={formData} updateFormData={updateFormData} errorFields={errorFields} /> },
              { id: 3, title: 'Driver Information',     el: <DriverInformation formData={formData} updateFormData={updateFormData} /> },
              { id: 4, title: 'Eligibility Information',el: <EligibilityInformation formData={formData} updateFormData={updateFormData} /> },
              { id: 5, title: 'Coverage Information',   el: <CoverageInformation formData={formData} updateFormData={updateFormData} errorFields={errorFields} /> },
              { id: 6, title: 'Additional Insured',     el: <AdditionalInsured formData={formData} updateFormData={updateFormData} /> },
              { id: 7, title: 'Loss Payee Information', el: <LossPayee formData={formData} updateFormData={updateFormData} /> },
              { id: 8, title: 'Prior History',          el: <PriorHistory formData={formData} updateFormData={updateFormData} /> },
              { id: 9, title: 'Claim History',          el: <ClaimHistory formData={formData} updateFormData={updateFormData} /> },
              { id: 10, title: 'Payment Plan',          el: <PaymentPlan formData={formData} updateFormData={updateFormData} onSubmit={() => setSubmitted(true)} errorFields={errorFields} /> },
            ].map(section => (
              <section
                key={section.id}
                ref={el => sectionRefs.current[section.id] = el}
                id={`section-${section.id}`}
                className="bg-white rounded-2xl overflow-hidden"
              >
                <SectionHeader title={section.title} />
                <div className="px-10 pt-5 pb-10">
                  {section.el}
                </div>
              </section>
            ))}

            <div className="pb-8" />
          </div>
        </main>

        <RightPanel onFormReview={handleCheckErrors} formData={formData} pulseUpload={pulseUpload} />
      </div>
    </div>
  )
}

// Section header — sits at top of each card
function SectionHeader({ title }) {
  return (
    <div className="px-10 pt-8 pb-0">
      <div className="flex items-center justify-between pb-4 border-b border-gray-300">
        <h2 className="text-lg font-bold text-navy">{title}</h2>
      </div>
    </div>
  )
}

export default App
