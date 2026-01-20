import { useState } from 'react'
import { validateRequestForm, formatPhoneNumber } from '@/utils/formValidation'
import { submitRequestForm } from '@/services/formSubmissionService'

interface BookingFormData {
  fullName: string
  email: string
  phone: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  location: string
  documentType: string
  notes: string
  termsAccepted: boolean
}

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: 'notary',
    preferredDate: '',
    preferredTime: '',
    location: '',
    documentType: '',
    notes: '',
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<{ field: string; message: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }))

    // Clear error for this field
    setErrors((prev) => prev.filter((err) => err.field !== name))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors([])

    // Validate
    const result = validateRequestForm({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      documentType: formData.documentType,
      appointmentDateTime: `${formData.preferredDate}T${formData.preferredTime}`,
      location: formData.location,
      additionalNotes: formData.notes,
      termsAccepted: formData.termsAccepted,
    })

    if (!result.isValid) {
      setErrors(result.errors)
      setLoading(false)
      return
    }

    // Submit
    try {
      const response = await submitRequestForm(
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.serviceType as any,
          documentType: formData.documentType,
          appointmentDateTime: `${formData.preferredDate}T${formData.preferredTime}`,
          location: formData.location,
          additionalNotes: formData.notes,
          termsAccepted: formData.termsAccepted,
        },
        'notary'
      )

      if (response.success) {
        setSuccess(true)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          serviceType: 'notary',
          preferredDate: '',
          preferredTime: '',
          location: '',
          documentType: '',
          notes: '',
          termsAccepted: false,
        })
      }
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for scheduling your notary appointment. We'll contact you shortly to confirm the details.
            </p>
            <p className="text-gray-600 mb-8">
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="button-primary"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
          <p className="text-xl text-gray-600">Schedule your notary services with us</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-bold text-red-800 mb-2">Please fix the following errors:</h3>
              <ul className="list-disc list-inside text-red-700">
                {errors.map((err, idx) => (
                  <li key={idx}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Service Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="notary">Notary Service</option>
                    <option value="loan-signing">Loan Signing</option>
                    <option value="apostille">Apostille</option>
                    <option value="ron">Remote Notarization</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Document Type</label>
                  <input
                    type="text"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., Power of Attorney, Promissory Note"
                  />
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Appointment Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="input-field"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time *</label>
                    <input
                      type="time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your address or meeting location"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="input-field"
                rows={4}
                placeholder="Any special requests or additional information..."
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1"
              />
              <label className="text-sm text-gray-600">
                I agree to the terms and conditions and consent to being contacted about my appointment *
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
