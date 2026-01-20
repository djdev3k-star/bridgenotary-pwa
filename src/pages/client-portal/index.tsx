import { useState, useEffect } from 'react'

interface Appointment {
  id: string
  serviceType: string
  date: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  location: string
  documentType?: string
}

interface ClientProfile {
  name: string
  email: string
  phone: string
  joinDate: string
  totalAppointments: number
  completedAppointments: number
}

export default function ClientPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState<'appointments' | 'profile' | 'documents'>('appointments')

  const [profile] = useState<ClientProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    joinDate: 'January 2024',
    totalAppointments: 5,
    completedAppointments: 3,
  })

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      serviceType: 'Loan Signing',
      date: '2024-02-15T10:00',
      status: 'confirmed',
      location: 'Downtown Office',
      documentType: 'Mortgage Documents',
    },
    {
      id: '2',
      serviceType: 'Notary Service',
      date: '2024-02-20T14:00',
      status: 'pending',
      location: 'Virtual Meeting',
      documentType: 'Power of Attorney',
    },
    {
      id: '3',
      serviceType: 'Apostille',
      date: '2024-01-25T09:00',
      status: 'completed',
      location: 'Downtown Office',
      documentType: 'Birth Certificate',
    },
  ])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter email and password')
      return
    }
    // Demo authentication - in production, validate against backend
    if (loginEmail && loginPassword.length >= 6) {
      setIsAuthenticated(true)
      setLoginError('')
      setLoginEmail('')
      setLoginPassword('')
    } else {
      setLoginError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginEmail('')
    setLoginPassword('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '✓'
      case 'pending':
        return '⏳'
      case 'completed':
        return '✓✓'
      case 'cancelled':
        return '✕'
      default:
        return '•'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Client Portal</h1>
            <p className="text-gray-600 text-center mb-8">Sign in to manage your appointments</p>

            {loginError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="w-full button-primary">
                Sign In
              </button>
            </form>

            <p className="text-sm text-gray-600 text-center mt-6">
              Demo: Use any email and password (min 6 chars)
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {profile.name}!</h1>
            <p className="text-gray-600">Manage your notary appointments and documents</p>
          </div>
          <button onClick={handleLogout} className="button-secondary">
            Sign Out
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl font-bold text-proof mb-2">{profile.totalAppointments}</div>
            <div className="text-gray-600">Total Appointments</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl font-bold text-green-600 mb-2">{profile.completedAppointments}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-xl font-semibold text-proof mb-2">Member Since</div>
            <div className="text-gray-600">{profile.joinDate}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            {['appointments', 'profile', 'documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === tab
                    ? 'text-proof border-b-2 border-proof'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Appointments</h2>
                {appointments.length === 0 ? (
                  <div className="text-center py-12 text-gray-600">
                    <p className="text-lg mb-4">No appointments yet</p>
                    <a href="/book" className="button-primary inline-block">
                      Book an Appointment
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{apt.serviceType}</h3>
                            {apt.documentType && (
                              <p className="text-sm text-gray-600 mt-1">Document: {apt.documentType}</p>
                            )}
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                              apt.status
                            )}`}
                          >
                            {getStatusIcon(apt.status)} {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p className="font-semibold text-gray-900">Date & Time</p>
                            <p>
                              {new Date(apt.date).toLocaleDateString()} at{' '}
                              {new Date(apt.date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Location</p>
                            <p>{apt.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <div className="text-lg text-gray-900">{profile.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <div className="text-lg text-gray-900">{profile.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <div className="text-lg text-gray-900">{profile.phone}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Member Since</label>
                    <div className="text-lg text-gray-900">{profile.joinDate}</div>
                  </div>
                </div>
                <button className="button-secondary">Edit Profile</button>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Documents</h2>
                <div className="text-center py-12 text-gray-600">
                  <p className="text-lg mb-4">Documents will appear here after your appointments</p>
                  <p className="text-sm">
                    Notarized documents can be downloaded from this page for 30 days after completion
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
