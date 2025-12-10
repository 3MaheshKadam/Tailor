'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CustomerDashboardPage() {
  const [selectedTab, setSelectedTab] = useState('all');

  // Dummy customer data
  const customerInfo = {
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@email.com',
    totalOrders: 8,
    activeOrders: 3,
  };

  // Dummy orders
  const allOrders = [
    {
      id: 'ORD-1234',
      date: '8 Dec 2024',
      items: '2 Shirts + 1 Pant',
      amount: 3500,
      paid: 1500,
      remaining: 2000,
      status: 'In Progress',
      deadline: '15 Dec 2024',
      daysLeft: 5,
      tailor: 'Ramesh Kumar',
    },
    {
      id: 'ORD-1198',
      date: '25 Nov 2024',
      items: '1 Kurta',
      amount: 1500,
      paid: 1500,
      remaining: 0,
      status: 'Ready',
      deadline: '5 Dec 2024',
      daysLeft: 0,
      tailor: 'Ramesh Kumar',
    },
    {
      id: 'ORD-1156',
      date: '10 Nov 2024',
      items: '2 Pants',
      amount: 2000,
      paid: 2000,
      remaining: 0,
      status: 'Delivered',
      deadline: '20 Nov 2024',
      daysLeft: 0,
      tailor: 'Suresh Patil',
    },
    {
      id: 'ORD-1089',
      date: '28 Oct 2024',
      items: '3 Shirts',
      amount: 3600,
      paid: 3600,
      remaining: 0,
      status: 'Delivered',
      deadline: '8 Nov 2024',
      daysLeft: 0,
      tailor: 'Ramesh Kumar',
    },
    {
      id: 'ORD-1034',
      date: '15 Oct 2024',
      items: '1 Blouse',
      amount: 800,
      paid: 800,
      remaining: 0,
      status: 'Delivered',
      deadline: '25 Oct 2024',
      daysLeft: 0,
      tailor: 'Ramesh Kumar',
    },
  ];

  const filteredOrders = allOrders.filter(order => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'active') return ['In Progress', 'Ready', 'Measuring'].includes(order.status);
    if (selectedTab === 'delivered') return order.status === 'Delivered';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Measuring':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Ready':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Delivered':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Measuring':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'In Progress':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'Ready':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'Delivered':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black mb-2">Welcome back, {customerInfo.name}! 👋</h1>
            <p className="text-blue-100 text-lg">Track your tailoring orders and manage your profile</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total Orders</p>
              <p className="text-3xl font-black text-gray-900">{customerInfo.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Active Orders</p>
              <p className="text-3xl font-black text-green-600">{customerInfo.activeOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Customer Since</p>
              <p className="text-xl font-black text-purple-600">Jan 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Shop Button */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Need help with your order?</h3>
              <p className="text-gray-600">Contact us on WhatsApp for quick assistance</p>
            </div>
          </div>
          
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        
        {/* Tabs */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedTab === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Orders ({allOrders.length})
            </button>
            <button
              onClick={() => setSelectedTab('active')}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedTab === 'active'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Active ({allOrders.filter(o => ['In Progress', 'Ready', 'Measuring'].includes(o.status)).length})
            </button>
            <button
              onClick={() => setSelectedTab('delivered')}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedTab === 'delivered'
                  ? 'bg-gray-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Delivered ({allOrders.filter(o => o.status === 'Delivered').length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="p-6 space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${getStatusColor(order.status).replace('text-', 'bg-').replace('-700', '-100')}`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-600">{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl text-sm font-bold border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-gray-600">Items:</span>
                    <span className="font-semibold text-gray-900">{order.items}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-600">Tailor:</span>
                    <span className="font-semibold text-gray-900">{order.tailor}</span>
                  </div>
                  {order.status !== 'Delivered' && (
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-semibold text-gray-900">{order.deadline}</span>
                      {order.daysLeft > 0 && (
                        <span className={`ml-2 font-bold ${
                          order.daysLeft <= 2 ? 'text-red-600' : 
                          order.daysLeft <= 4 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          ({order.daysLeft} days left)
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="font-bold text-gray-900">₹{order.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm text-gray-600">Paid</span>
                    <span className="font-bold text-green-600">₹{order.paid.toLocaleString()}</span>
                  </div>
                  {order.remaining > 0 && (
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <span className="text-sm text-orange-700 font-semibold">Remaining</span>
                      <span className="font-bold text-orange-700">₹{order.remaining.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/customer/orders/${order.id}`}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  View Details
                </Link>
                {order.status === 'Ready' && (
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    Ready for Pickup
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}