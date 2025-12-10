'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CustomerHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/customer" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <span className="text-2xl font-black text-gray-900">TailorPro</span>
              <p className="text-xs text-gray-500 font-semibold">Kumar Tailors</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/customer"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
            >
              My Orders
            </Link>
            <Link
              href="/customer/profile"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
            >
              Profile
            </Link>
          </nav>

          {/* Desktop Profile & Logout */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-gray-900">Rajesh Kumar</p>
              <p className="text-sm text-gray-500">+91 98765 43210</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              RK
            </div>
            <Link
              href="/auth/login"
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors"
            >
              Logout
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 space-y-2">
            <Link
              href="/customer"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Orders
            </Link>
            <Link
              href="/customer/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <div className="px-4 py-3 bg-gray-50 rounded-lg">
              <p className="font-bold text-gray-900">Rajesh Kumar</p>
              <p className="text-sm text-gray-500">+91 98765 43210</p>
            </div>
            <Link
              href="/auth/login"
              className="block px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}