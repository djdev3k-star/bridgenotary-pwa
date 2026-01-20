/**
 * Remote Online Notarization (RON) page
 */
export default function RONPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-4xl font-bold text-proof mb-8">Remote Online Notarization</h1>
        <p className="text-lg text-gray-600 mb-12">
          Complete your notarization needs from the comfort of your home or office.
        </p>
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-600">
              <li>Submit your document for notarization</li>
              <li>Schedule a video call with our notary</li>
              <li>Complete the notarization process online</li>
              <li>Receive your certified document</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
