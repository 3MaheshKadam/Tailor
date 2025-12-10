'use client';

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-[1600px] mx-auto px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Everything You Need in One Place
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed specifically for tailoring businesses
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all hover:border-blue-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Digital Measurements</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Visual measurement entry with male/female body guides. Store permanently with chest, shoulder, waist, length, and custom notes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all hover:border-blue-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">3-Copy Auto System</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Automatically generates Admin copy (full details), Tailor copy (work only), and Customer copy (receipt + tracking link).
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all hover:border-blue-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">WhatsApp Automation</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Send order confirmations, delivery reminders (2-day and same-day), and ready-for-pickup notifications automatically via WhatsApp/SMS.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all hover:border-blue-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Multi-Role Access</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Shop Owner gets full control, Tailor sees only work details, Customer tracks orders with phone number. Perfect role separation.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all hover:border-blue-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Bulk Order Management</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Handle school uniforms, corporate orders, and wedding/function bulk orders with group measurements and multiple tailor assignments.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all hover:border-blue-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Order Tracking & Analytics</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Real-time status updates (Measuring → Tailoring → Ready → Delivered), complete order history, and business analytics dashboard.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}