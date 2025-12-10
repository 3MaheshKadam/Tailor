'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    
    // Redirect based on role after a short delay for visual feedback
    setTimeout(() => {
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else if (role === 'tailor') {
        router.push('/tailor/dashboard');
      } else if (role === 'customer') {
        router.push('/customer');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <span className="text-3xl font-black text-gray-900">TailorPro</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Welcome Back</h1>
          <p className="text-xl text-gray-600">Select your role to continue</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          
          {/* Admin Card */}
          <button
            onClick={() => handleRoleSelect('admin')}
            className={`group relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
              selectedRole === 'admin' ? 'border-blue-600 shadow-2xl scale-105' : 'border-gray-200'
            }`}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Admin / Shop Owner</h3>
            <p className="text-gray-600 mb-4">Manage customers, orders, and tailors</p>
            <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
              <span>Continue as Admin</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

          {/* Tailor Card */}
          <button
            onClick={() => handleRoleSelect('tailor')}
            className={`group relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
              selectedRole === 'tailor' ? 'border-indigo-600 shadow-2xl scale-105' : 'border-gray-200'
            }`}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tailor / Worker</h3>
            <p className="text-gray-600 mb-4">View assigned orders and update status</p>
            <div className="flex items-center justify-center gap-2 text-indigo-600 font-semibold">
              <span>Continue as Tailor</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

          {/* Customer Card */}
          <button
            onClick={() => handleRoleSelect('customer')}
            className={`group relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
              selectedRole === 'customer' ? 'border-purple-600 shadow-2xl scale-105' : 'border-gray-200'
            }`}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Customer</h3>
            <p className="text-gray-600 mb-4">Track your orders with phone number</p>
            <div className="flex items-center justify-center gap-2 text-purple-600 font-semibold">
              <span>Continue as Customer</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline">
              Register your shop
            </Link>
          </p>
          <Link href="/" className="inline-block text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}