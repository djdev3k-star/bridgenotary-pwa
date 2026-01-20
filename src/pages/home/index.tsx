import { Link } from 'react-router-dom'
import { featureFlags } from '@/utils/featureFlags'

const services = [
  {
    icon: '📋',
    title: 'Loan Signing',
    desc: 'Purchase, refinance, reverse mortgage & more',
    link: '/loan-signing',
  },
  ...(featureFlags.enableApostille
    ? [
        {
          icon: '🌍',
          title: 'Apostille Services',
          desc: 'Official document authentication worldwide',
          link: '/apostille',
        },
      ]
    : []),
  {
    icon: '🚚',
    title: 'Mobile Notarization',
    desc: 'Come to you for convenience',
    link: '/services',
  },
  ...(featureFlags.enableRON
    ? [
        {
          icon: '💻',
          title: 'Remote Notarization',
          desc: 'Online notarization via secure video',
          link: '/ron',
        },
      ]
    : []),
]

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="z-10">
              <div className="inline-block mb-4 px-4 py-2 bg-proof/10 text-proof rounded-full text-sm font-semibold">
                Professional Notary Services
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Notary Services <span className="text-proof">You Can Trust</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                {featureFlags.enableApostille
                  ? 'Reliable loan signings, mobile notarization, and apostille services for individuals and businesses.'
                  : 'Professional loan signings and mobile notarization services available.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center gap-2 bg-proof text-white hover:bg-proof/90 font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  📅 Book an Appointment
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-proof text-proof hover:bg-proof/5 font-semibold py-4 px-8 rounded-lg transition-all"
                >
                  ✉️ Get in Touch
                </Link>
              </div>
            </div>

            {/* Right Side - Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-lg mb-2">Fast Service</h3>
                <p className="text-gray-600 text-sm">Same-day appointments available</p>
              </div>
              <div className="bg-white/80 backdrop-blur p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">📍</div>
                <h3 className="font-bold text-lg mb-2">Mobile Ready</h3>
                <p className="text-gray-600 text-sm">We come to your location</p>
              </div>
              <div className="bg-white/80 backdrop-blur p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="font-bold text-lg mb-2">Secure</h3>
                <p className="text-gray-600 text-sm">Protected & verified documents</p>
              </div>
              <div className="bg-white/80 backdrop-blur p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">💎</div>
                <h3 className="font-bold text-lg mb-2">Professional</h3>
                <p className="text-gray-600 text-sm">Certified notary public</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional notary solutions for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Link key={idx} to={service.link} className="group">
                <div className="card p-8 h-full hover:shadow-lg hover:border-proof transition-all">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <span className="text-proof font-semibold text-sm group-hover:translate-x-2 transition-transform inline-block">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get your documents notarized</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Schedule', desc: 'Book online or call us' },
              { num: '2', title: 'Meet', desc: 'We come to you' },
              { num: '3', title: 'Verify', desc: 'ID verification & review' },
              { num: '4', title: 'Sign', desc: 'Documents notarized' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-proof text-white flex items-center justify-center text-2xl font-bold mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-proof/20 -z-10 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-proof to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Book your notary appointment today and experience professional, reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center bg-white text-proof hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all"
            >
              📅 Book Now
            </Link>
            <Link
              to="/client-portal"
              className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg transition-all"
            >
              👤 Client Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
