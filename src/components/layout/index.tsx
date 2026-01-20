import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        {/* Header content will be added */}
      </header>
      <main>{children}</main>
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        {/* Footer content will be added */}
      </footer>
    </div>
  )
}
