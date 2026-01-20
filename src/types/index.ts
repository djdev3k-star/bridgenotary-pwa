/**
 * Type definitions for common request/response objects
 */

export interface RequestForm {
  id: string
  fullName: string
  email: string
  phone: string
  serviceType: 'notary' | 'courier' | 'inquiry' | 'apostille' | 'ron'
  documentType?: string
  appointmentDateTime?: string
  location?: string
  additionalNotes?: string
  termsAccepted: boolean
  createdAt: string
  updatedAt: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'customer' | 'notary' | 'admin'
  createdAt: string
}

export interface Document {
  id: string
  userId: string
  title: string
  type: string
  status: 'draft' | 'submitted' | 'signed' | 'completed'
  createdAt: string
  updatedAt: string
}

export interface NotarySession {
  id: string
  documentId: string
  userId: string
  notaryId: string
  startTime: string
  endTime?: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
}
