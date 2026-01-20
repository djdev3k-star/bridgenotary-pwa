/**
 * Form submission service
 * Handles API calls for form submissions with offline support
 */

import { RequestFormData, formatPhoneNumber } from '@/utils/formValidation'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export interface SubmissionResponse {
  success: boolean
  message: string
  id?: string
}

/**
 * Submit a request form
 */
export async function submitRequestForm(
  formData: RequestFormData,
  formType: 'notary' | 'courier' | 'inquiry'
): Promise<SubmissionResponse> {
  const formatted = {
    ...formData,
    phone: formatPhoneNumber(formData.phone),
    formType,
    submittedAt: new Date().toISOString(),
  }

  try {
    const response = await fetch(`${API_BASE_URL}/request-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatted),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      message: 'Form submitted successfully',
      id: data.id,
    }
  } catch (error) {
    // Attempt to save for offline sync
    await savePendingSubmission(formatted)

    return {
      success: false,
      message: 'Submission saved for offline sync. Will submit when connection restored.',
    }
  }
}

/**
 * Save submission to IndexedDB for later sync
 */
async function savePendingSubmission(formData: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('bridgenotary', 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['pendingSubmissions'], 'readwrite')
      const store = transaction.objectStore('pendingSubmissions')
      store.add({
        id: Date.now().toString(),
        data: formData,
        timestamp: new Date().toISOString(),
      })
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains('pendingSubmissions')) {
        db.createObjectStore('pendingSubmissions', { keyPath: 'id' })
      }
    }
  })
}
