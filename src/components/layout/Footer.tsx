import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-proof to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🔏</span>
              </div>
              <span className="text-xl font-bold text-white">BridgeNotary</span>
            </div>
            <p className="text-sm text-gray-400">
              Professional notary services connecting you with certified notaries nationwide.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/book" className="hover:text-white transition-colors">
                  Loan Signing
                </Link>
              </li>
              <li>
                <Link to="/ron" className="hover:text-white transition-colors">
                  Remote Notarization
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Mobile Notarization
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Apostille Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@bridgenotary.com" className="hover:text-white transition-colors">
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} BridgeNotary. All rights reserved. Notaries are licensed in their respective states.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                <span className="text-sm">Twitter</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="text-sm">LinkedIn</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="text-sm">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
