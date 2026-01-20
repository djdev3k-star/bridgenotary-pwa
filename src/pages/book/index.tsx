import { useState } from 'react'
import { validateRequestForm } from '@/utils/formValidation'
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 md:py-32">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-white/20">
            <div className="text-7xl mb-6 animate-fade-in">✅</div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-lg mx-auto">
              Thank you for scheduling your notary appointment. We'll contact you shortly to confirm the details.
            </p>
            <p className="text-gray-600 mb-8">
              A confirmation email has been sent to <strong className="text-proof">{formData.email}</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSuccess(false)}
                className="button-primary"
              >
                Book Another Appointment
              </button>
              <a href="/" className="button-outline">
                Return Home
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 md:py-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">Schedule your notary services with us today</p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20">
          {errors.length > 0 && (
            <div className="mb-8 p-4 bg-red-50/80 border-l-4 border-red-500 rounded-lg backdrop-blur">
              <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <span>⚠️</span> Please fix the following errors:
              </h3>
              <ul className="space-y-1 text-red-700">
                {errors.map((err, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{err.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">👤 Personal Information</h3>
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
              <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">📋 Service Details</h3>
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
              <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">📅 Appointment Details</h3>
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
            <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1 w-5 h-5 accent-proof rounded"
              />
              <label className="text-sm text-gray-700 font-medium">
                I agree to the terms and conditions and consent to being contacted about my appointment *
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg font-bold transition-all transform hover:scale-105 active:scale-95"
            >
              {loading ? '⏳ Booking...' : '✓ Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
