"use client";
import React from 'react'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden py-20 px-4">
      
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content - Wider */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-700">For Tailoring Shops & Boutiques</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Manage Your 
              <span className="block text-blue-600">Tailoring Shop Digitally</span>
            </h1>

            <p className="text-2xl text-gray-700 mb-10 leading-relaxed">
              Complete system to handle <strong>customer measurements</strong>, <strong>order tracking</strong>, <strong>tailor assignments</strong>, and <strong>WhatsApp notifications</strong> — all in one place.
            </p>

            {/* Key Features List */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-1">Digital Measurement Entry</h3>
                  <p className="text-gray-600 text-lg">Store customer body measurements permanently with visual guides for shirts, pants, kurtas, blouses</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-1">3-Copy Auto System</h3>
                  <p className="text-gray-600 text-lg">Admin copy (full details), Tailor copy (work only), Customer copy (receipt + tracking)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-1">WhatsApp Order Updates</h3>
                  <p className="text-gray-600 text-lg">Customers get automatic SMS/WhatsApp with order details, delivery reminders, and tracking links</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-1">Bulk Uniform Orders</h3>
                  <p className="text-gray-600 text-lg">Perfect for school uniforms, corporate orders, and wedding/function bulk orders</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                href="/auth/login"
                className="px-10 py-5 bg-blue-600 text-white text-xl font-bold rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/features"
                className="px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all text-center"
              >
                See All Features
              </Link>
            </div>

            <p className="text-base text-gray-500 mt-6">No credit card required • Free 14-day trial • Cancel anytime</p>
          </div>

          {/* Right Side - Wider Dashboard Preview */}
          <div className="relative w-full">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              
              {/* Admin Dashboard Preview */}
              <div className="bg-blue-600 px-8 py-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-2xl">Admin Dashboard</h3>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">Live Preview</span>
                </div>
              </div>

              <div className="p-8 space-y-5">
                {/* Order Card 1 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-xl">Order #1234 - Rajesh Kumar</h4>
                      <p className="text-base text-gray-600 mt-1">2 Shirts + 1 Pant • ₹2,500</p>
                    </div>
                    <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-base font-semibold">In Progress</span>
                  </div>
                  <div className="flex items-center gap-3 text-base text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Due: 15 Dec 2024</span>
                    <span className="ml-auto text-gray-500">Assigned to: Ramesh (Tailor)</span>
                  </div>
                </div>

                {/* Order Card 2 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-xl">Order #1235 - Priya Sharma</h4>
                      <p className="text-base text-gray-600 mt-1">1 Blouse • ₹800</p>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-base font-semibold">Ready</span>
                  </div>
                  <div className="flex items-center gap-3 text-base text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ready for pickup</span>
                    <span className="ml-auto text-green-600 font-semibold">WhatsApp sent ✓</span>
                  </div>
                </div>

                {/* Order Card 3 */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-xl">Bulk Order #1236 - DPS School</h4>
                      <p className="text-base text-gray-600 mt-1">50 Uniforms • ₹35,000</p>
                    </div>
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-base font-semibold">Measuring</span>
                  </div>
                  <div className="flex items-center gap-3 text-base text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Due: 30 Dec 2024</span>
                    <span className="ml-auto text-gray-500">3 Tailors assigned</span>
                  </div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600 mt-1">Active Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600 mt-1">Ready Today</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-gray-600 mt-1">Total Customers</div>
                </div>
              </div>
            </div>

            {/* Floating WhatsApp notification */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-5 border border-gray-200 max-w-sm animate-bounce">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">WhatsApp sent ✓</p>
                  <p className="text-sm text-gray-600 mt-1">"Your order is ready for pickup!"</p>
                  <p className="text-xs text-gray-500 mt-1">Sent to: +91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection