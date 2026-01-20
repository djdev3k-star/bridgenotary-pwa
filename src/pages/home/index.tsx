import { Link } from 'react-router-dom'
import { featureFlags } from '@/utils/featureFlags'

const services = [
  {
    title: 'Loan Signing',
    desc: 'Purchase, refinance, reverse mortgage & more',
    link: '/loan-signing',
  },
  ...(featureFlags.enableApostille
    ? [
        {
          title: 'Apostille',
          desc: 'International document authentication',
          link: '/apostille',
        },
      ]
    : []),
  ...(featureFlags.enableRON
    ? [
        {
          title: 'Remote Online',
          desc: 'Notarize from anywhere, anytime',
          link: '/ron',
        },
      ]
    : []),
  {
    title: 'Mobile Notary',
    desc: 'We come to you—home, office, or hospital',
    link: '/services/mobile',
  },
]

const features = [
  {
    title: '24/7 Availability',
    desc: 'Last-minute appointments honored. Evening & weekend service available.',
  },
  {
    title: 'NNA Certified Professional',
    desc: 'Latest industry standards maintained. Continuing education completed.',
  },
  {
    title: '$100K E&O Insurance',
    desc: 'Full liability coverage. Your transactions protected.',
  },
  {
    title: '100% Accuracy Rate',
    desc: 'Zero re-signings in 2024. Precise attention to detail.',
  },
  {
    title: 'Secure Digital Platform',
    desc: 'RON compliant with all state laws. Full audit trail & e-journal.',
  },
  {
    title: 'Professional Communication',
    desc: 'Same-day confirmation & status updates. Direct notary contact.',
  },
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Professional Notary Services You Can Trust
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Reliable loan signings, mobile notarization, and apostille services for individuals and 
                businesses across the Dallas-Fort Worth area.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center bg-proof text-white hover:bg-proof/90 font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Book an Appointment
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center border-2 border-proof text-proof hover:bg-proof/5 font-semibold py-4 px-8 rounded-lg transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Right Side - Image placeholder */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-200 shadow-lg p-8 aspect-square flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-proof to-blue-700 rounded-lg flex items-center justify-center">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Professional Notary Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-proof uppercase tracking-wide mb-2">OUR SERVICES</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Professional Notary Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From loan signings to international document authentication—we handle every notarization need with expertise and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Link key={idx} to={service.link} className="group">
                <div className="card p-8 h-full hover:shadow-lg hover:border-proof transition-all">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{service.desc}</p>
                  <span className="text-proof font-semibold text-sm group-hover:translate-x-2 transition-transform inline-block">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Built for Professional Excellence */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-proof uppercase tracking-wide mb-2">WHY PARTNERS TRUST US</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Built for Professional Excellence</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by lenders, title companies, and individuals throughout DFW. We maintain the highest standards of professionalism and compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-proof/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-proof" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-proof uppercase tracking-wide mb-2">WHY BRIDGE NOTARY</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">More Than Just a Signature</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We understand that behind every document is a story—a new home, a business deal, a legal matter. 
              That's why we treat every signing with the care and attention it deserves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-proof mb-2">99%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-proof mb-2">99%</div>
              <div className="text-gray-600 font-medium">On-Time Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-proof mb-2">100%</div>
              <div className="text-gray-600 font-medium">Document Accuracy</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Punctual, professional, and prepared—every time',
                'Clear communication from booking to completion',
                'Expertise in complex loan documents',
                'Flexible scheduling including evenings & weekends',
                'Same-day and rush service available',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-proof flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-proof to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Work With a Notary You Can Trust?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Whether it's a simple notarization or a complex loan signing, we're here to make it seamless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center bg-white text-proof hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all"
            >
              Schedule Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
