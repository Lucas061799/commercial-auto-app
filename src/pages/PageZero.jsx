import { useState } from 'react'
import norbielinkLogo from '../assets/norbielink-logo.png'
import btisLogo from '../assets/btislogo.png'
import norbieCommercial from '../assets/norbie-pagezero-v2.png'
import bananaImg from '../assets/banana.png'

const ALL_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

const APPROVED_STATES = ['AZ', 'CA', 'CO', 'FL', 'GA', 'PA', 'TX']

const ALL_CATEGORIES = [
  'Contractors',
  'Food Trucks',
  'Service Vehicles (locksmiths, dry cleaners, pest control, etc.)',
  'Manufacturing, Wholesale, or Retail (without filings)',
  'Restaurants (No Delivery)',
  'Farming',
  'Tow Trucks / Roadside Assistance',
  'Passenger Transport (Limos, Taxis, Uber, etc.)',
  'Daycares / Sober Living Facilities',
  'Couriers / Package Delivery',
  'Dumpster Rentals / Trash Haulers',
  'Churches / Non-Profits',
  'Trucking with Truck Tractor/Trailer or Sand & Gravel Haulers',
  'Security Guards / Auto Haulers',
]

const APPROVED_CATEGORIES = [
  'Contractors',
  'Food Trucks',
  'Service Vehicles (locksmiths, dry cleaners, pest control, etc.)',
  'Manufacturing, Wholesale, or Retail (without filings)',
  'Restaurants (No Delivery)',
  'Farming',
]

export default function PageZero({ onStart }) {
  const [state, setState] = useState('')
  const [riskCategory, setRiskCategory] = useState('')
  const [declined, setDeclined] = useState(false)

  const canCheck = state && riskCategory

  const handleCheck = () => {
    if (!canCheck) return
    const approved = APPROVED_STATES.includes(state) && APPROVED_CATEGORIES.includes(riskCategory)
    if (approved) {
      onStart({ state, riskCategory })
    } else {
      setDeclined(true)
    }
  }

  const handleReset = () => {
    setState('')
    setRiskCategory('')
    setDeclined(false)
  }

  return (
    <div className="h-screen bg-white font-montserrat flex flex-col overflow-hidden">

      {/* Header */}
      <header className="flex items-center justify-between bg-white border-b border-gray-100 px-8 shrink-0" style={{ height: '56px' }}>
        <img src={norbielinkLogo} alt="NorbieLink" className="h-8" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 tracking-wide">POWERED BY</span>
          <img src={btisLogo} alt="btis" className="h-7" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Left — 50%, Norbie fills to divider */}
        <div className="bg-white relative overflow-hidden shrink-0" style={{ width: '50%', height: 'calc(100vh - 56px)' }}>
          <img
            src={norbieCommercial}
            alt="Norbie"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', objectFit: 'contain' }}
          />
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-100 shrink-0" />

        {/* Right — form */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="min-h-full flex flex-col justify-center items-start py-10 px-[10%]">
          <div className="w-full max-w-xl">

          {!declined ? (
            <>
              {/* Title */}
              <div className="mb-10">
                <p className="text-sm font-bold tracking-widest uppercase text-gradient mb-3">Commercial Auto Insurance</p>
                <h1 className="text-4xl font-bold text-navy leading-tight mb-3">
                  Get Multiple Quotes.<br />
                  <span className="text-gradient">One Easy Application.</span>
                </h1>
                <p className="text-base text-gray-500 leading-relaxed">
                  First, let's start with the basics...
                </p>
              </div>

              <div className="space-y-5">
                {/* State dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Location of Vehicle</label>
                  <div className="relative">
                    <select
                      value={state}
                      onChange={e => { setState(e.target.value); setDeclined(false) }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#A614C3]/20 focus:border-[#A614C3] appearance-none pr-9"
                    >
                      <option value="">Select which state the vehicle is located.</option>
                      {ALL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>

                {/* Risk category dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Acceptable Risk Categories</label>
                  <div className="relative">
                    <select
                      value={riskCategory}
                      onChange={e => { setRiskCategory(e.target.value); setDeclined(false) }}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#A614C3]/20 focus:border-[#A614C3] appearance-none pr-9"
                    >
                      <option value="">Select from our accepted categories.</option>
                      {APPROVED_CATEGORIES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>

                {/* Check Appetite button */}
                <button
                  onClick={handleCheck}
                  disabled={!canCheck}
                  className="w-full py-4 rounded-xl text-base font-bold text-white transition-all"
                  style={canCheck
                    ? { background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)', boxShadow: '0 4px 20px rgba(92,46,212,0.3)' }
                    : { background: '#E5E7EB', color: '#9CA3AF', cursor: 'not-allowed' }
                  }
                >
                  Check Appetite
                </button>
              </div>
            </>
          ) : (
            /* Decline message */
            <div className="text-center py-6">
              {/* 4 🍌 4 */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="font-black text-[#FCDF50] select-none" style={{ fontSize: '7rem', lineHeight: 1 }}>4</span>
                <img src={bananaImg} alt="banana" className="w-36 h-36 object-contain" />
                <span className="font-black text-[#FCDF50] select-none" style={{ fontSize: '7rem', lineHeight: 1 }}>4</span>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-2">
                Well banana...
              </h2>
              <p className="text-base text-gray-500 leading-relaxed mb-1">
                We don't have an appetite for that one.
              </p>
              <p className="text-sm text-gray-400 mb-7">
                {!APPROVED_STATES.includes(state)
                  ? `We're not currently writing in ${state}.`
                  : `That risk category isn't in our current appetite.`
                } Try a different selection.
              </p>
              <button
                onClick={handleReset}
                className="w-full py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(88.09deg, #5C2ED4 0.11%, #A614C3 63.8%)', boxShadow: '0 4px 20px rgba(92,46,212,0.3)' }}
              >
                Try Again
              </button>
            </div>
          )}

          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
