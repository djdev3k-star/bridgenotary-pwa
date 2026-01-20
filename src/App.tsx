import React, { Suspense, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout'
import { ErrorBoundary, LoadingSpinner } from '@/components/common'
import { featureFlags } from '@/utils/featureFlags'
import { generalImages, ronImages, apostilleImages, loanSigningImages } from '@/assets/images'

// Lazy load pages
const HomePage = React.lazy(() => import('@/pages/home'))
const RONPage = React.lazy(() => import('@/pages/ron'))
const ApostillePage = featureFlags.enableApostille ? React.lazy(() => import('@/pages/apostille')) : null

// 404 Page with random hero images
const notFoundImages = [
  generalImages.notaryPublicStamp,
  ronImages.remoteNotaryProfessional,
  ...(featureFlags.enableApostille ? [apostilleImages.apostilleDocument] : []),
  loanSigningImages.stackLoanDocuments,
].filter(Boolean)

const NotFound = () => {
  const bgImage = useMemo(() => {
    const idx = Math.floor(Math.random() * notFoundImages.length)
    return notFoundImages[idx]
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative px-4"
      style={{
        background: `linear-gradient(rgba(255,255,255,0.85),rgba(0,70,250,0.08)), url('${bgImage}') center/cover no-repeat`,
      }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" aria-hidden="true"></div>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-4 text-proof drop-shadow">404 - Page Not Found</h1>
        <p className="mb-6 text-lg text-gray-700 max-w-xl text-center">
          Oops! The page you're looking for doesn't exist or has moved.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ron" element={<RONPage />} />
              {featureFlags.enableApostille && ApostillePage && (
                <Route path="/apostille" element={<ApostillePage />} />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}
