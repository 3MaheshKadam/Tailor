'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Dummy data for orders
  const allOrders = [
    {
      id: 'ORD-1234',
      customer: {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
      },
      items: '2 Shirts + 1 Pant',
      itemsCount: 3,
      amount: 2500,
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-700',
      deadline: '15 Dec 2024',
      orderDate: '8 Dec 2024',
      assignedTo: 'Ramesh (Tailor)',
      advance: 1000,
      remaining: 1500,
    },
    {
      id: 'ORD-1235',
      customer: {
        name: 'Priya Sharma',
        phone: '+91 98765 43211',
      },
      items: '1 Blouse',
      itemsCount: 1,
      amount: 800,
      status: 'Ready',
      statusColor: 'bg-green-100 text-green-700',
      deadline: '10 Dec 2024',
      orderDate: '3 Dec 2024',
      assignedTo: 'Suresh (Tailor)',
      advance: 800,
      remaining: 0,
    },
    {
      id: 'ORD-1236',
      customer: {
        name: 'Amit Patel',
        phone: '+91 98765 43212',
      },
      items: '3 Shirts',
      itemsCount: 3,
      amount: 3600,
      status: 'Measuring',
      statusColor: 'bg-blue-100 text-blue-700',
      deadline: '20 Dec 2024',
      orderDate: '9 Dec 2024',
      assignedTo: 'Not Assigned',
      advance: 1500,
      remaining: 2100,
    },
    {
      id: 'ORD-1237',
      customer: {
        name: 'Sneha Reddy',
        phone: '+91 98765 43213',
      },
      items: '1 Kurta + 1 Pant',
      itemsCount: 2,
      amount: 2200,
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-700',
      deadline: '18 Dec 2024',
      orderDate: '7 Dec 2024',
      assignedTo: 'Ramesh (Tailor)',
      advance: 1000,
      remaining: 1200,
    },
    {
      id: 'ORD-1238',
      customer: {
        name: 'Vikram Singh',
        phone: '+91 98765 43214',
      },
      items: '2 Pants',
      itemsCount: 2,
      amount: 1800,
      status: 'Ready',
      statusColor: 'bg-green-100 text-green-700',
      deadline: '12 Dec 2024',
      orderDate: '5 Dec 2024',
      assignedTo: 'Suresh (Tailor)',
      advance: 1800,
      remaining: 0,
    },
    {
      id: 'ORD-1239',
      customer: {
        name: 'Anita Desai',
        phone: '+91 98765 43215',
      },
      items: '1 Blouse + 1 Kurta',
      itemsCount: 2,
      amount: 2000,
      status: 'Delivered',
      statusColor: 'bg-gray-100 text-gray-700',
      deadline: '5 Dec 2024',
      orderDate: '28 Nov 2024',
      assignedTo: 'Ramesh (Tailor)',
      advance: 2000,
      remaining: 0,
    },
    {
      id: 'ORD-1240',
      customer: {
        name: 'Rahul Mehta',
        phone: '+91 98765 43216',
      },
      items: '4 Shirts',
      itemsCount: 4,
      amount: 4800,
      status: 'Pending',
      statusColor: 'bg-orange-100 text-orange-700',
      deadline: '25 Dec 2024',
      orderDate: '10 Dec 2024',
      assignedTo: 'Not Assigned',
      advance: 2000,
      remaining: 2800,
    },
    {
      id: 'ORD-1241',
      customer: {
        name: 'Kavita Iyer',
        phone: '+91 98765 43217',
      },
      items: '2 Kurtas + 2 Pants',
      itemsCount: 4,
      amount: 4400,
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-700',
      deadline: '22 Dec 2024',
      orderDate: '9 Dec 2024',
      assignedTo: 'Suresh (Tailor)',
      advance: 2000,
      remaining: 2400,
    },
  ];

  // Filter orders
  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    
    const matchesStatus = 
      filterStatus === 'all' || 
      order.status.toLowerCase().replace(' ', '-') === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    all: allOrders.length,
    pending: allOrders.filter(o => o.status === 'Pending').length,
    measuring: allOrders.filter(o => o.status === 'Measuring').length,
    inProgress: allOrders.filter(o => o.status === 'In Progress').length,
    ready: allOrders.filter(o => o.status === 'Ready').length,
    delivered: allOrders.filter(o => o.status === 'Delivered').length,
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage all customer orders</p>
        </div>
        <Link
          href="/admin/orders/new"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Order
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-600 font-semibold mb-1">All Orders</p>
          <p className="text-3xl font-black text-gray-900">{stats.all}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <p className="text-xs text-orange-600 font-semibold mb-1">Pending</p>
          <p className="text-3xl font-black text-orange-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <p className="text-xs text-blue-600 font-semibold mb-1">Measuring</p>
          <p className="text-3xl font-black text-blue-600">{stats.measuring}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <p className="text-xs text-yellow-600 font-semibold mb-1">In Progress</p>
          <p className="text-3xl font-black text-yellow-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <p className="text-xs text-green-600 font-semibold mb-1">Ready</p>
          <p className="text-3xl font-black text-green-600">{stats.ready}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-600 font-semibold mb-1">Delivered</p>
          <p className="text-3xl font-black text-gray-600">{stats.delivered}</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by Order ID, customer name, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none text-lg"
              />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-3 rounded-xl transition-all ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-3 rounded-xl transition-all ${
                viewMode === 'cards'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({stats.all})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'pending'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilterStatus('measuring')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'measuring'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Measuring ({stats.measuring})
          </button>
          <button
            onClick={() => setFilterStatus('in-progress')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'in-progress'
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            In Progress ({stats.inProgress})
          </button>
          <button
            onClick={() => setFilterStatus('ready')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'ready'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Ready ({stats.ready})
          </button>
          <button
            onClick={() => setFilterStatus('delivered')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'delivered'
                ? 'bg-gray-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Delivered ({stats.delivered})
          </button>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing <span className="font-bold text-gray-900">{filteredOrders.length}</span> of{' '}
          <span className="font-bold text-gray-900">{allOrders.length}</span> orders
        </div>
      </div>

      {/* Orders Display */}
      {filteredOrders.length > 0 ? (
        <>
          {/* Table View */}
          {viewMode === 'table' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Items</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Deadline</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Assigned To</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-blue-600">{order.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">{order.customer.name}</p>
                            <p className="text-sm text-gray-500">{order.customer.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{order.items}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold text-gray-900">₹{order.amount.toLocaleString()}</p>
                            {order.remaining > 0 && (
                              <p className="text-xs text-red-600">Pending: ₹{order.remaining}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{order.deadline}</td>
                        <td className="px-6 py-4">
                          <span className={`text-sm ${order.assignedTo === 'Not Assigned' ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>
                            {order.assignedTo}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors inline-block"
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

          {/* Cards View */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-blue-600">{order.id}</h3>
                        <p className="text-sm text-gray-500">{order.orderDate}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{order.customer.name}</p>
                      <p className="text-sm text-gray-600">{order.customer.phone}</p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Items</span>
                      <span className="font-semibold text-gray-900">{order.items}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Amount</span>
                      <span className="font-bold text-gray-900">₹{order.amount.toLocaleString()}</span>
                    </div>
                    {order.remaining > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Remaining</span>
                        <span className="font-semibold text-red-600">₹{order.remaining.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Deadline</span>
                      <span className="font-semibold text-gray-900">{order.deadline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Assigned To</span>
                      <span className={`text-sm font-semibold ${order.assignedTo === 'Not Assigned' ? 'text-red-600' : 'text-gray-900'}`}>
                        {order.assignedTo}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="block w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('all');
            }}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200">
          <button className="px-4 py-2 text-gray-400 font-semibold rounded-lg cursor-not-allowed" disabled>
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-blue-600 text-white font-bold rounded-lg">1</button>
            <button className="w-10 h-10 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg">2</button>
            <button className="w-10 h-10 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg">3</button>
          </div>
          <button className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors">
            Next
          </button>
        </div>
      )}

    </div>
  );
}