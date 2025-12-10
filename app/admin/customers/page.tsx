'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState('all');

  // Dummy data for customers
  const allCustomers = [
    {
      id: 'CUST-001',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@email.com',
      address: 'Shop No. 12, MG Road, Mumbai',
      gender: 'Male',
      totalOrders: 8,
      lastOrder: '5 Dec 2024',
      avatar: 'RK',
      status: 'Active',
    },
    {
      id: 'CUST-002',
      name: 'Priya Sharma',
      phone: '+91 98765 43211',
      email: 'priya@email.com',
      address: '45, Connaught Place, Delhi',
      gender: 'Female',
      totalOrders: 12,
      lastOrder: '8 Dec 2024',
      avatar: 'PS',
      status: 'Active',
    },
    {
      id: 'CUST-003',
      name: 'Amit Patel',
      phone: '+91 98765 43212',
      email: 'amit@email.com',
      address: '78, CG Road, Ahmedabad',
      gender: 'Male',
      totalOrders: 5,
      lastOrder: '2 Dec 2024',
      avatar: 'AP',
      status: 'Active',
    },
    {
      id: 'CUST-004',
      name: 'Sneha Reddy',
      phone: '+91 98765 43213',
      email: 'sneha@email.com',
      address: '23, Jubilee Hills, Hyderabad',
      gender: 'Female',
      totalOrders: 15,
      lastOrder: '9 Dec 2024',
      avatar: 'SR',
      status: 'Active',
    },
    {
      id: 'CUST-005',
      name: 'Vikram Singh',
      phone: '+91 98765 43214',
      email: 'vikram@email.com',
      address: '56, Lajpat Nagar, New Delhi',
      gender: 'Male',
      totalOrders: 3,
      lastOrder: '1 Dec 2024',
      avatar: 'VS',
      status: 'Active',
    },
    {
      id: 'CUST-006',
      name: 'Anita Desai',
      phone: '+91 98765 43215',
      email: 'anita@email.com',
      address: '89, Koramangala, Bangalore',
      gender: 'Female',
      totalOrders: 20,
      lastOrder: '10 Dec 2024',
      avatar: 'AD',
      status: 'Active',
    },
    {
      id: 'CUST-007',
      name: 'Rahul Mehta',
      phone: '+91 98765 43216',
      email: 'rahul@email.com',
      address: '34, FC Road, Pune',
      gender: 'Male',
      totalOrders: 6,
      lastOrder: '7 Dec 2024',
      avatar: 'RM',
      status: 'Active',
    },
    {
      id: 'CUST-008',
      name: 'Kavita Iyer',
      phone: '+91 98765 43217',
      email: 'kavita@email.com',
      address: '12, T Nagar, Chennai',
      gender: 'Female',
      totalOrders: 9,
      lastOrder: '6 Dec 2024',
      avatar: 'KI',
      status: 'Active',
    },
  ];

  // Filter customers based on search and gender
  const filteredCustomers = allCustomers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGender = filterGender === 'all' || customer.gender.toLowerCase() === filterGender;
    
    return matchesSearch && matchesGender;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer database</p>
        </div>
        <Link
          href="/admin/customers/new"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Customer
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total Customers</p>
              <p className="text-3xl font-black text-gray-900">{allCustomers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Active Customers</p>
              <p className="text-3xl font-black text-gray-900">{allCustomers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total Orders</p>
              <p className="text-3xl font-black text-gray-900">
                {allCustomers.reduce((sum, c) => sum + c.totalOrders, 0)}
              </p>
            </div>
          </div>
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
                placeholder="Search by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none text-lg"
              />
            </div>
          </div>

          {/* Gender Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterGender('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filterGender === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterGender('male')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filterGender === 'male'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setFilterGender('female')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filterGender === 'female'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing <span className="font-bold text-gray-900">{filteredCustomers.length}</span> of{' '}
          <span className="font-bold text-gray-900">{allCustomers.length}</span> customers
        </div>
      </div>

      {/* Customers Grid */}
      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {customer.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.id}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    {customer.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{customer.phone}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm truncate">{customer.email}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{customer.address}</span>
                </div>

                <div className="pt-3 border-t border-gray-200 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                    <p className="text-xl font-bold text-gray-900">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Order</p>
                    <p className="text-sm font-semibold text-gray-700">{customer.lastOrder}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-2">
                <Link
                  href={`/admin/customers/${customer.id}`}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  View Details
                </Link>
                <Link
                  href={`/admin/orders/new?customerId=${customer.id}`}
                  className="flex-1 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors text-center"
                >
                  New Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterGender('all');
            }}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination (Dummy) */}
      {filteredCustomers.length > 0 && (
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