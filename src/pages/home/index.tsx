/**
 * Home page
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h1 className="text-5xl font-bold text-proof mb-6">Bridge Notary</h1>
        <p className="text-2xl text-gray-600 mb-12">Progressive Web App for Digital Notarization</p>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="card p-8">
            <h2 className="text-xl font-bold mb-4">Remote Notarization</h2>
            <p className="text-gray-600">Get documents notarized online from anywhere</p>
          </div>
          <div className="card p-8">
            <h2 className="text-xl font-bold mb-4">Offline Ready</h2>
            <p className="text-gray-600">Continue working even without internet connection</p>
          </div>
          <div className="card p-8">
            <h2 className="text-xl font-bold mb-4">Fast & Reliable</h2>
            <p className="text-gray-600">Lightning-fast performance on all devices</p>
          </div>
        </div>
      </div>
    </div>
  )
}
