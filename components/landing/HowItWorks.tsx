'use client';

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Simple 3-step workflow that keeps everyone informed
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 relative">
          
          {/* Connection Line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200" style={{width: 'calc(100% - 12rem)', left: '6rem'}}></div>

          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-black shadow-lg z-10">
              1
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 pt-16 border border-blue-200 hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Admin Creates Order</h3>
              <p className="text-lg text-gray-700 text-center leading-relaxed">
                Shop owner enters customer details, takes measurements (chest, shoulder, waist, length), sets deadline, and creates billing. System auto-generates 3 copies.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-black shadow-lg z-10">
              2
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 pt-16 border border-indigo-200 hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Tailor Receives Work</h3>
              <p className="text-lg text-gray-700 text-center leading-relaxed">
                Worker gets notified with measurements and deadline. No billing or customer contact visible. Updates progress: Started → In Progress → Ready → Completed.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-3xl font-black shadow-lg z-10">
              3
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 pt-16 border border-purple-200 hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Customer Gets Updates</h3>
              <p className="text-lg text-gray-700 text-center leading-relaxed">
                Automatic WhatsApp/SMS with order confirmation, 2-day reminder, same-day reminder, and ready-for-pickup notification. Customer can track status anytime.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}