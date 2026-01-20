export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-proof"></div>
    </div>
  )
}

export function TawkChat() {
  return null // Placeholder for Tawk chat integration
}

export { ErrorBoundary } from './ErrorBoundary'
