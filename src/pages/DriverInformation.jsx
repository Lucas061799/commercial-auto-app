import { Input, Select, RadioGroup, FormGrid } from '../components/FormField'

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
import AddressAutocomplete from '../components/AddressAutocomplete'

const MARITAL_STATUS = ['Married', 'Single', 'Widowed', 'Divorced', 'Separated']
const GENDER = ['Male', 'Female', 'Non-Binary', 'Prefer Not To Say']
const RELATIONSHIP = ['Owner/Officer', 'Employee', 'Family Member', 'Other']

const defaultDriver = () => ({
  id: Date.now(),
  firstName: '', lastName: '',
  mailingAddress: '', mailingSuite: '',
  mailingCity: '', mailingState: '', mailingZip: '',
  maritalStatus: '', gender: '',
  relationshipToInsured: '',
  dob: '',
  excludeDriver: 'No',
  licenseNumber: '',
  relation: 'Employee',
  hasViolations: 'No',
})

export default function DriverInformation({ formData, updateFormData }) {
  const data = formData.drivers || { drivers: [defaultDriver()] }
  const drivers = data.drivers

  const setDrivers = (d) => updateFormData('drivers', { drivers: d })
  const setField = (idx, key) => (val) => {
    const updated = drivers.map((d, i) => i === idx ? { ...d, [key]: val } : d)
    setDrivers(updated)
  }
  const handleMailingSelect = (idx) => ({ address, city, state, zip }) => {
    const updated = drivers.map((d, i) => i === idx ? { ...d, mailingAddress: address, mailingCity: city, mailingState: state, mailingZip: zip } : d)
    setDrivers(updated)
  }

  const addDriver = () => setDrivers([...drivers, defaultDriver()])
  const removeDriver = (idx) => setDrivers(drivers.filter((_, i) => i !== idx))

  return (
    <div className="w-full">
      {drivers.map((d, idx) => (
        <div key={d.id} className="bg-gray-50 rounded-xl p-5 mb-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-navy">Driver {idx + 1}</h3>
            {drivers.length > 1 && (
              <button onClick={() => removeDriver(idx)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
            )}
          </div>

          <div className="space-y-4">
            <FormGrid>
              <Input label="Owner First Name" required value={d.firstName} onChange={setField(idx, 'firstName')} placeholder="John" />
              <Input label="Owner Last Name" required value={d.lastName} onChange={setField(idx, 'lastName')} placeholder="Smith" />
            </FormGrid>
            <FormGrid>
              <AddressAutocomplete
                label="Mailing Address"
                value={d.mailingAddress}
                onChange={setField(idx, 'mailingAddress')}
                onSelect={handleMailingSelect(idx)}
              />
              <Input label="Suite/Apt/Building" value={d.mailingSuite} onChange={setField(idx, 'mailingSuite')} />
            </FormGrid>
            <FormGrid cols={3}>
              <Input label="City" value={d.mailingCity} onChange={setField(idx, 'mailingCity')} />
              <Input label="State" value={d.mailingState} onChange={setField(idx, 'mailingState')} />
              <Input label="Zip" value={d.mailingZip} onChange={setField(idx, 'mailingZip')} />
            </FormGrid>
            <FormGrid>
              <Select label="Marital status" options={MARITAL_STATUS} value={d.maritalStatus} onChange={setField(idx, 'maritalStatus')} />
              <Select label="Gender" options={GENDER} value={d.gender} onChange={setField(idx, 'gender')} />
            </FormGrid>
            <Input label="Date of birth" placeholder="MM/DD/YYYY" value={d.dob} onChange={setField(idx, 'dob')} />
            <RadioGroup
              label="Exclude driver"
              options={['Yes', 'No']}
              value={d.excludeDriver}
              onChange={setField(idx, 'excludeDriver')}
            />
            <Input label="Driver license number" value={d.licenseNumber} onChange={setField(idx, 'licenseNumber')} placeholder="D1234567" />
            <FormGrid>
              <RadioGroup
                label="State or foreign license"
                options={['State', 'Foreign']}
                value={d.licenseType || 'State'}
                onChange={setField(idx, 'licenseType')}
              />
              <Select label="License state" options={US_STATES} value={d.licenseState || ''} onChange={setField(idx, 'licenseState')} placeholder="Select state..." />
            </FormGrid>
            <FormGrid>
              <RadioGroup
                label="Commercial driver's license"
                options={['Yes', 'No']}
                value={d.cdl || 'No'}
                onChange={setField(idx, 'cdl')}
              />
              {d.cdl === 'Yes' && (
                <Input label="Date CDL received" value={d.cdlDate || ''} onChange={setField(idx, 'cdlDate')} placeholder="MM/DD/YYYY" />
              )}
            </FormGrid>
            <Select
              label="Relationship to insured"
              options={RELATIONSHIP}
              value={d.relationshipToInsured}
              onChange={setField(idx, 'relationshipToInsured')}
            />
            <RadioGroup
              label="Relation to business"
              options={['Employee', 'Owner', 'Contractor']}
              value={d.relation}
              onChange={setField(idx, 'relation')}
            />
            <RadioGroup
              label="Any violations in the last 3 years?"
              options={['Yes', 'No']}
              value={d.hasViolations}
              onChange={setField(idx, 'hasViolations')}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addDriver}
        className="flex items-center gap-2 text-xs font-semibold border border-dashed border-[#A614C3]/30 rounded-xl px-4 py-3 mb-2 add-another-btn transition w-full justify-center"
      >
        <svg className="w-4 h-4" fill="none" stroke="#5C2ED4" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
        </svg>
        <span className="text-gradient">Add Another Driver</span>
      </button>
    </div>
  )
}
