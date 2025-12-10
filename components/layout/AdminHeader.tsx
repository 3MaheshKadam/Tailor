'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, text: 'New order from Rajesh Kumar', time: '5 min ago', unread: true },
    { id: 2, text: 'Order #1234 is ready for pickup', time: '1 hour ago', unread: true },
    { id: 3, text: 'Priya Sharma added to customers', time: '2 hours ago', unread: false },
  ];

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
      
      {/* Left - Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin!</h1>
        <p className="text-sm text-gray-500">Manage your tailoring business</p>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Unread badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      notif.unread ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="text-sm text-gray-900">{notif.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 text-center">
                <a href="/admin/notifications" className="text-sm text-blue-600 font-semibold hover:underline">
                  View all notifications
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              A
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Kumar Tailors</p>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="font-bold text-gray-900">Admin User</p>
                <p className="text-sm text-gray-500">admin@tailorpro.com</p>
              </div>
              <div className="p-2">
                <Link
                  href="/admin/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Settings
                </Link>
                <Link
                  href="/admin/shop-profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Shop Profile
                </Link>
                <a
                  href="/auth/logout"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-semibold"
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}