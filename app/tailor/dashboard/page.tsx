'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TailorDashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Dummy data for tailor
  const tailorStats = {
    totalAssigned: 8,
    pending: 5,
    inProgress: 3,
    completed: 12,
    avgCompletionTime: '4.5 days',
    rating: 4.8,
  };

  // Recent orders assigned to this tailor
  const recentOrders = [
    {
      id: 'ORD-1234',
      customer: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      items: '2 Shirts + 1 Pant',
      status: 'In Progress',
      priority: 'Normal',
      deadline: '15 Dec 2024',
      daysLeft: 5,
      startedOn: '9 Dec 2024',
    },
    {
      id: 'ORD-1235',
      customer: 'Priya Sharma',
      phone: '+91 98765 43211',
      items: '1 Blouse',
      status: 'Pending',
      priority: 'Urgent',
      deadline: '12 Dec 2024',
      daysLeft: 2,
      startedOn: null,
    },
    {
      id: 'ORD-1236',
      customer: 'Amit Patel',
      phone: '+91 98765 43212',
      items: '1 Kurta + 1 Pant',
      status: 'In Progress',
      priority: 'Normal',
      deadline: '18 Dec 2024',
      daysLeft: 8,
      startedOn: '10 Dec 2024',
    },
    {
      id: 'ORD-1237',
      customer: 'Sneha Reddy',
      phone: '+91 98765 43213',
      items: '2 Pants',
      status: 'Pending',
      priority: 'Normal',
      deadline: '16 Dec 2024',
      daysLeft: 6,
      startedOn: null,
    },
    {
      id: 'ORD-1238',
      customer: 'Vikram Singh',
      phone: '+91 98765 43214',
      items: '3 Shirts',
      status: 'In Progress',
      priority: 'Urgent',
      deadline: '13 Dec 2024',
      daysLeft: 3,
      startedOn: '8 Dec 2024',
    },
  ];

  const filteredOrders = recentOrders.filter(order => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pending') return order.status === 'Pending';
    if (selectedFilter === 'inProgress') return order.status === 'In Progress';
    if (selectedFilter === 'urgent') return order.priority === 'Urgent';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'Urgent'
      ? 'bg-red-100 text-red-700 border-red-200'
      : 'bg-gray-100 text-gray-500 border-gray-200';
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 2) return 'text-red-600';
    if (daysLeft <= 4) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-semibold">Assigned</p>
          <p className="text-3xl font-black text-gray-900">{tailorStats.totalAssigned}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-semibold">Pending</p>
          <p className="text-3xl font-black text-yellow-600">{tailorStats.pending}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-semibold">In Progress</p>
          <p className="text-3xl font-black text-blue-600">{tailorStats.inProgress}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-semibold">Completed</p>
          <p className="text-3xl font-black text-green-600">{tailorStats.completed}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-semibold">Avg Time</p>
          <p className="text-2xl font-black text-purple-600">{tailorStats.avgCompletionTime}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-semibold">Rating</p>
          <p className="text-3xl font-black text-amber-600">{tailorStats.rating}</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black mb-2">Ready to start working?</h2>
            <p className="text-indigo-100">You have {tailorStats.pending} pending orders waiting to be started</p>
          </div>
          <Link
            href="/tailor/orders"
            className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View All Orders
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Orders ({recentOrders.length})
          </button>
          <button
            onClick={() => setSelectedFilter('pending')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedFilter === 'pending'
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Pending ({recentOrders.filter(o => o.status === 'Pending').length})
          </button>
          <button
            onClick={() => setSelectedFilter('inProgress')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedFilter === 'inProgress'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            In Progress ({recentOrders.filter(o => o.status === 'In Progress').length})
          </button>
          <button
            onClick={() => setSelectedFilter('urgent')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedFilter === 'urgent'
                ? 'bg-red-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Urgent ({recentOrders.filter(o => o.priority === 'Urgent').length})
          </button>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all p-6"
          >
            {/* Order Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-indigo-600 mb-1">{order.id}</h3>
                <p className="text-sm text-gray-500">{order.customer}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* Priority Badge */}
            {order.priority === 'Urgent' && (
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(order.priority)}`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {order.priority}
                </span>
              </div>
            )}

            {/* Order Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="text-gray-900 font-semibold">{order.items}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">{order.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">Deadline: {order.deadline}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`font-bold ${getDaysLeftColor(order.daysLeft)}`}>
                  {order.daysLeft} days left
                </span>
              </div>

              {order.startedOn && (
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Started: {order.startedOn}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link
                href={`/tailor/orders/${order.id}`}
                className="block w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-center"
              >
                View Details
              </Link>
              {order.status === 'Pending' && (
                <button className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                  Start Working
                </button>
              )}
              {order.status === 'In Progress' && (
                <button className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Mark as Ready
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">No orders match the selected filter</p>
          <button
            onClick={() => setSelectedFilter('all')}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Show All Orders
          </button>
        </div>
      )}

    </div>
  );
}