/**
 * Feature flags for enabling/disabling features
 */
export const featureFlags = {
  enableApostille: import.meta.env.VITE_ENABLE_APOSTILLE !== 'false',
  enableRON: import.meta.env.VITE_ENABLE_RON !== 'false',
  enableLoanSigning: import.meta.env.VITE_ENABLE_LOAN_SIGNING !== 'false',
}
