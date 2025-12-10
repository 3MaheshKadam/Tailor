'use client';

export default function UseCasesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="w-full max-w-[1600px] mx-auto px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Perfect For Every Business Type
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Whether you run a small shop or large supplier, TailorPro adapts to your needs
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Use Case 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 border border-blue-200 hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Local Tailoring Shops</h3>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Perfect for daily walk-in orders with quick measurement entry, customer database, and instant WhatsApp notifications.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Customer profiles with permanent measurements
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Quick order creation in 2 minutes
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Automatic delivery reminders to customers
              </li>
            </ul>
          </div>

          {/* Use Case 2 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 border border-purple-200 hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Premium Boutiques</h3>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              High-end custom fitting with detailed measurements, design preferences, and premium customer service management.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Detailed custom measurement templates
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Design notes and fabric preferences
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Professional billing and invoicing
              </li>
            </ul>
          </div>

          {/* Use Case 3 */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 border border-green-200 hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Uniform Suppliers</h3>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Manage bulk school and corporate uniform orders with standardized sizing and group measurements.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Bulk order management (50+ uniforms)
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Group measurements for entire classes
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Assign multiple tailors per order
              </li>
            </ul>
          </div>

          {/* Use Case 4 */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 border border-orange-200 hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Wedding & Function Orders</h3>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Handle multi-garment wedding orders with family packages and tight deadline management.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Multiple garments per customer (Kurta + Pant + Sherwani)
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Family package orders (10-15 people)
              </li>
              <li className="flex items-center gap-3 text-lg text-gray-700">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority deadline tracking and reminders
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  )
}