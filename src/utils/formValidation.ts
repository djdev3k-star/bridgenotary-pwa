/**
 * Form validation utilities
 */

interface ValidationError {
  field: string
  message: string
}

interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^\+?1?\d{10,14}$/

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 14
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

export interface RequestFormData {
  fullName: string
  email: string
  phone: string
  serviceType: string
  documentType?: string
  appointmentDateTime?: string
  location?: string
  additionalNotes?: string
  termsAccepted: boolean
}

export function validateRequestForm(data: RequestFormData): ValidationResult {
  const errors: ValidationError[] = []

  if (!data.fullName?.trim()) {
    errors.push({ field: 'fullName', message: 'Name is required' })
  }

  if (!data.email?.trim()) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email address' })
  }

  if (!data.phone?.trim()) {
    errors.push({ field: 'phone', message: 'Phone is required' })
  } else if (!validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone number' })
  }

  if (!data.serviceType?.trim()) {
    errors.push({ field: 'serviceType', message: 'Service type is required' })
  }

  if (!data.termsAccepted) {
    errors.push({ field: 'termsAccepted', message: 'You must accept the terms' })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
