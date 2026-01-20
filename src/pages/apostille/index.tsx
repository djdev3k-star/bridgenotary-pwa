/**
 * Apostille page
 */
export default function ApostillePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-4xl font-bold text-proof mb-8">Apostille Services</h1>
        <p className="text-lg text-gray-600 mb-12">
          Get official apostille certification for your documents for international use.
        </p>
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">What is an Apostille?</h2>
            <p className="text-gray-600">
              An apostille is a special certification that authenticates the origin of a public document.
              It is one of the easiest ways to make a document valid for use in foreign countries.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
