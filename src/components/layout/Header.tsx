import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Book Appointment', path: '/book' },
    { label: 'Client Portal', path: '/client-portal' },
    { label: 'Remote Notarization', path: '/ron' },
    { label: 'Services', path: '/services' },
  ]

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-proof to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🔏</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BridgeNotary</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-proof'
                    : 'text-gray-600 hover:text-proof'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/book" className="button-primary">
              Schedule Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className={`w-6 h-6 transition-transform ${mobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 font-semibold ${
                  isActive(link.path)
                    ? 'text-proof'
                    : 'text-gray-600 hover:text-proof'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="block button-primary w-full text-center"
            >
              Schedule Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
