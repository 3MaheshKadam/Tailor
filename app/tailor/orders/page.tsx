'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TailorOrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Dummy orders data
  const allOrders = [
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
      amount: 3500,
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
      amount: 800,
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
      amount: 2500,
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
      amount: 2000,
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
      amount: 3600,
    },
    {
      id: 'ORD-1239',
      customer: 'Anita Desai',
      phone: '+91 98765 43215',
      items: '1 Kurta',
      status: 'Ready',
      priority: 'Normal',
      deadline: '11 Dec 2024',
      daysLeft: 1,
      startedOn: '7 Dec 2024',
      amount: 1500,
    },
    {
      id: 'ORD-1240',
      customer: 'Rahul Mehta',
      phone: '+91 98765 43216',
      items: '2 Shirts + 2 Pants',
      status: 'Ready',
      priority: 'Normal',
      deadline: '14 Dec 2024',
      daysLeft: 4,
      startedOn: '6 Dec 2024',
      amount: 4400,
    },
    {
      id: 'ORD-1241',
      customer: 'Kavita Iyer',
      phone: '+91 98765 43217',
      items: '1 Blouse + 1 Kurta',
      status: 'Measuring',
      priority: 'Normal',
      deadline: '17 Dec 2024',
      daysLeft: 7,
      startedOn: null,
      amount: 2300,
    },
  ];

  // Filter and search
  const filteredOrders = allOrders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);
    
    return matchesStatus && matchesSearch;
  });

  // Stats
  const stats = {
    all: allOrders.length,
    measuring: allOrders.filter(o => o.status === 'Measuring').length,
    pending: allOrders.filter(o => o.status === 'Pending').length,
    inProgress: allOrders.filter(o => o.status === 'In Progress').length,
    ready: allOrders.filter(o => o.status === 'Ready').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Measuring':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'In Progress':
        return 'bg-indigo-100 text-indigo-700';
      case 'Ready':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 2) return 'text-red-600';
    if (daysLeft <= 4) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-1">All orders assigned to you</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold mb-1">All Orders</p>
          <p className="text-3xl font-black text-gray-900">{stats.all}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold mb-1">Measuring</p>
          <p className="text-3xl font-black text-blue-600">{stats.measuring}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold mb-1">Pending</p>
          <p className="text-3xl font-black text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold mb-1">In Progress</p>
          <p className="text-3xl font-black text-indigo-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 font-semibold mb-1">Ready</p>
          <p className="text-3xl font-black text-green-600">{stats.ready}</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        
        {/* Search and View Toggle */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by Order ID, customer name, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none text-lg"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-3 rounded-xl border-2 transition-all ${
                viewMode === 'cards'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : 'border-gray-200 text-gray-600 hover:border-indigo-300'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-3 rounded-xl border-2 transition-all ${
                viewMode === 'table'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : 'border-gray-200 text-gray-600 hover:border-indigo-300'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedStatus === 'all'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({stats.all})
          </button>
          <button
            onClick={() => setSelectedStatus('Measuring')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedStatus === 'Measuring'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Measuring ({stats.measuring})
          </button>
          <button
            onClick={() => setSelectedStatus('Pending')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedStatus === 'Pending'
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setSelectedStatus('In Progress')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedStatus === 'In Progress'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            In Progress ({stats.inProgress})
          </button>
          <button
            onClick={() => setSelectedStatus('Ready')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedStatus === 'Ready'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Ready ({stats.ready})
          </button>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 pt-2 border-t border-gray-200">
          Showing <span className="font-bold text-gray-900">{filteredOrders.length}</span> of{' '}
          <span className="font-bold text-gray-900">{allOrders.length}</span> orders
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' && filteredOrders.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-indigo-600 mb-1">{order.id}</h3>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {order.priority === 'Urgent' && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Urgent
                  </span>
                </div>
              )}

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="text-gray-900 font-semibold">{order.items}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">₹{order.amount.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">Due: {order.deadline}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={`font-bold ${getDaysLeftColor(order.daysLeft)}`}>
                    {order.daysLeft} days left
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Link
                  href={`/tailor/orders/${order.id}`}
                  className="block w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && filteredOrders.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Deadline</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-indigo-600">{order.id}</p>
                        {order.priority === 'Urgent' && (
                          <span className="text-xs text-red-600 font-semibold">URGENT</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">{order.items}</td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">₹{order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{order.deadline}</p>
                        <p className={`text-sm font-bold ${getDaysLeftColor(order.daysLeft)}`}>
                          {order.daysLeft} days left
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/tailor/orders/${order.id}`}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('all');
            }}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
}