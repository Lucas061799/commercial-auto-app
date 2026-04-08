import { Input, Select, RadioGroup, FormGrid } from '../components/FormField'
import AddressAutocomplete from '../components/AddressAutocomplete'

const BODY_TYPES = ['Box/Straight', 'Private Passenger', 'Pick Up', 'Flatbed', 'Dump', 'Van', 'SUV', 'Trailer', 'Other']
const USE_OPTIONS = ['Business & Personal', 'Business Only', 'Personal Only']
const COMP_OPTIONS = ['$250', '$100', '$500', '$1,000', '$2,500']
const COLL_OPTIONS = ['$500', '$100', '$250', '$1,000', '$2,500']
const VEHICLE_REGISTERED = ['Business Name', 'Individual']

const defaultVehicle = () => ({
  id: Date.now(),
  year: '', make: '', model: '', vin: '',
  bodyType: '', primaryUse: '',
  gvw: '', radius: '',
  currentValue: '',
  physicalDamage: 'No',
  additionalEquipment: 'Yes',
  vehicleRegistered: '',
  garagingAddress: '', garagingSuite: '',
  garagingCity: '', garagingState: '', garagingZip: '',
})

export default function VehicleInformation({ formData, updateFormData }) {
  const data = formData.vehicles || { vehicles: [defaultVehicle()] }
  const vehicles = data.vehicles

  const setVehicles = (v) => updateFormData('vehicles', { vehicles: v })
  const setField = (idx, key) => (val) => {
    const updated = vehicles.map((v, i) => i === idx ? { ...v, [key]: val } : v)
    setVehicles(updated)
  }
  const handleGaragingSelect = (idx) => ({ address, city, state, zip }) => {
    const updated = vehicles.map((v, i) => i === idx ? { ...v, garagingAddress: address, garagingCity: city, garagingState: state, garagingZip: zip } : v)
    setVehicles(updated)
  }

  const addVehicle = () => setVehicles([...vehicles, defaultVehicle()])
  const removeVehicle = (idx) => setVehicles(vehicles.filter((_, i) => i !== idx))

  return (
    <div className="w-full">
      {vehicles.map((v, idx) => (
        <div key={v.id} className="bg-gray-50 rounded-xl p-5 mb-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-navy">Vehicle {idx + 1}</h3>
            {vehicles.length > 1 && (
              <button onClick={() => removeVehicle(idx)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
            )}
          </div>

          <div className="space-y-4">
            <FormGrid>
              <Input label="Year" required value={v.year} onChange={setField(idx, 'year')} placeholder="2024" />
              <Input label="Make" required value={v.make} onChange={setField(idx, 'make')} placeholder="Ford" />
            </FormGrid>
            <FormGrid>
              <Input label="Model" required value={v.model} onChange={setField(idx, 'model')} placeholder="F-150" />
              <Input label="VIN" value={v.vin} onChange={setField(idx, 'vin')} placeholder="1FTFW1ET..." />
            </FormGrid>
            <FormGrid>
              <Select label="Body Type" required options={BODY_TYPES} value={v.bodyType} onChange={setField(idx, 'bodyType')} />
              <Select label="Use" required options={USE_OPTIONS} value={v.primaryUse} onChange={setField(idx, 'primaryUse')} />
            </FormGrid>
            <FormGrid>
              <Input label="GVW (Lbs)" value={v.gvw} onChange={setField(idx, 'gvw')} placeholder="10,000" />
              <Input label="Radius" value={v.radius} onChange={setField(idx, 'radius')} placeholder="50" />
            </FormGrid>
            <Input label="Current Value" value={v.currentValue} onChange={setField(idx, 'currentValue')} placeholder="10,000" />
            <RadioGroup
              label="Physical damage coverage"
              options={['Yes', 'No']}
              value={v.physicalDamage}
              onChange={setField(idx, 'physicalDamage')}
            />
            {v.physicalDamage === 'Yes' && (
              <FormGrid>
                <Select label="Comprehensive" options={COMP_OPTIONS} value={v.comprehensive} onChange={setField(idx, 'comprehensive')} />
                <Select label="Collision" options={COLL_OPTIONS} value={v.collision} onChange={setField(idx, 'collision')} />
              </FormGrid>
            )}
            <RadioGroup
              label="Additional attached equipment"
              options={['Yes', 'No']}
              value={v.additionalEquipment}
              onChange={setField(idx, 'additionalEquipment')}
            />
            <Select
              label="Vehicle Registered"
              required
              options={VEHICLE_REGISTERED}
              value={v.vehicleRegistered}
              onChange={setField(idx, 'vehicleRegistered')}
            />
            <FormGrid>
              <AddressAutocomplete
                label="Garaging Address"
                value={v.garagingAddress}
                onChange={setField(idx, 'garagingAddress')}
                onSelect={handleGaragingSelect(idx)}
              />
              <Input label="Suite/Apt/Building" value={v.garagingSuite} onChange={setField(idx, 'garagingSuite')} />
            </FormGrid>
            <FormGrid cols={3}>
              <Input label="City" value={v.garagingCity} onChange={setField(idx, 'garagingCity')} />
              <Input label="State" value={v.garagingState} onChange={setField(idx, 'garagingState')} />
              <Input label="Zip" value={v.garagingZip} onChange={setField(idx, 'garagingZip')} />
            </FormGrid>
          </div>
        </div>
      ))}

      <button
        onClick={addVehicle}
        className="flex items-center gap-2 text-xs font-semibold border border-dashed border-[#A614C3]/30 rounded-xl px-4 py-3 mb-2 add-another-btn transition w-full justify-center"
      >
        <svg className="w-4 h-4" fill="none" stroke="#5C2ED4" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
        </svg>
        <span className="text-gradient">Add Another Vehicle</span>
      </button>
    </div>
  )
}
