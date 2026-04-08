import { Input, Select, RadioGroup, FormGrid } from '../components/FormField'

const MARITAL_STATUS = ['Married', 'Single', 'Widowed', 'Divorced', 'Separated']
const GENDER = ['Male', 'Female', 'Non-Binary', 'Prefer Not To Say']
const RELATIONSHIP = ['Owner/Officer', 'Employee', 'Family Member', 'Other']

const defaultDriver = () => ({
  id: Date.now(),
  firstName: '', lastName: '',
  mailingAddressType: 'Auto Fill',
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
            <RadioGroup
              label="Mailing Address Entry Type"
              options={['Auto Fill', 'Manual Entry']}
              value={d.mailingAddressType}
              onChange={setField(idx, 'mailingAddressType')}
            />
            {(d.mailingAddressType === 'Auto Fill' || !d.mailingAddressType) && (
              <Input label="Search" value={d.search || ''} onChange={setField(idx, 'search')} placeholder="" />
            )}
            <FormGrid>
              <Select label="Marital Status" options={MARITAL_STATUS} value={d.maritalStatus} onChange={setField(idx, 'maritalStatus')} />
              <Select label="Gender" options={GENDER} value={d.gender} onChange={setField(idx, 'gender')} />
            </FormGrid>
            <FormGrid>
              <Select label="Relationship To Insured" options={RELATIONSHIP} value={d.relationshipToInsured} onChange={setField(idx, 'relationshipToInsured')} />
              <Input label="Date Of Birth" placeholder="MM/DD/YYYY" value={d.dob} onChange={setField(idx, 'dob')} />
            </FormGrid>
            <RadioGroup
              label="Exclude Driver"
              options={['Yes', 'No']}
              value={d.excludeDriver}
              onChange={setField(idx, 'excludeDriver')}
            />
            <Input label="Driver License Number" value={d.licenseNumber} onChange={setField(idx, 'licenseNumber')} placeholder="D1234567" />
            <FormGrid>
              <RadioGroup
                label="State or Foreign License"
                options={['State', 'Foreign']}
                value={d.licenseType || 'State'}
                onChange={setField(idx, 'licenseType')}
              />
              <Input label="State" value={d.licenseState || ''} onChange={setField(idx, 'licenseState')} placeholder="" />
            </FormGrid>
            <FormGrid>
              <RadioGroup
                label="Commercial Driver's License"
                options={['Yes', 'No']}
                value={d.cdl || 'No'}
                onChange={setField(idx, 'cdl')}
              />
              {d.cdl === 'Yes' && (
                <Input label="Date CDL Received" value={d.cdlDate || ''} onChange={setField(idx, 'cdlDate')} placeholder="MM/DD/YYYY" />
              )}
            </FormGrid>
            <RadioGroup
              label="Relation To Business"
              options={['Employee', 'Owner', 'Contractor']}
              value={d.relation}
              onChange={setField(idx, 'relation')}
            />
            <RadioGroup
              label="Any Violations In Last 3 Years?"
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
