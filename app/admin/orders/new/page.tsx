'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function NewOrderStep1Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedCustomerId = searchParams.get('customerId');

  const [selectionMode, setSelectionMode] = useState<'existing' | 'new'>(
    preSelectedCustomerId ? 'existing' : 'existing'
  );
  const [selectedCustomerId, setSelectedCustomerId] = useState(preSelectedCustomerId || '');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New customer form data
  const [newCustomerData, setNewCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    gender: 'Male',
  });

  const [errors, setErrors] = useState<any>({});

  // Dummy customers data
  const allCustomers = [
    {
      id: 'CUST-001',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@email.com',
      address: 'Shop No. 12, MG Road, Mumbai',
      gender: 'Male',
      totalOrders: 8,
      avatar: 'RK',
    },
    {
      id: 'CUST-002',
      name: 'Priya Sharma',
      phone: '+91 98765 43211',
      email: 'priya@email.com',
      address: '45, Connaught Place, Delhi',
      gender: 'Female',
      totalOrders: 12,
      avatar: 'PS',
    },
    {
      id: 'CUST-003',
      name: 'Amit Patel',
      phone: '+91 98765 43212',
      email: 'amit@email.com',
      address: '78, CG Road, Ahmedabad',
      gender: 'Male',
      totalOrders: 5,
      avatar: 'AP',
    },
    {
      id: 'CUST-004',
      name: 'Sneha Reddy',
      phone: '+91 98765 43213',
      email: 'sneha@email.com',
      address: '23, Jubilee Hills, Hyderabad',
      gender: 'Female',
      totalOrders: 15,
      avatar: 'SR',
    },
    {
      id: 'CUST-005',
      name: 'Vikram Singh',
      phone: '+91 98765 43214',
      email: 'vikram@email.com',
      address: '56, Lajpat Nagar, New Delhi',
      gender: 'Male',
      totalOrders: 3,
      avatar: 'VS',
    },
  ];

  // Filter customers based on search
  const filteredCustomers = allCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewCustomerData({
      ...newCustomerData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateNewCustomer = () => {
    const newErrors: any = {};

    if (!newCustomerData.name.trim()) newErrors.name = 'Name is required';
    if (!newCustomerData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(newCustomerData.phone)) {
      newErrors.phone = 'Enter valid 10-digit phone number';
    }
    if (!newCustomerData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (selectionMode === 'existing') {
      if (!selectedCustomerId) {
        alert('Please select a customer');
        return;
      }
      // Store customer ID in session storage and navigate
      sessionStorage.setItem('orderCustomerId', selectedCustomerId);
      router.push('/admin/orders/new/measurements');
    } else {
      if (validateNewCustomer()) {
        // Store new customer data and navigate
        sessionStorage.setItem('orderNewCustomer', JSON.stringify(newCustomerData));
        router.push('/admin/orders/new/measurements');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Create New Order</h1>
          <p className="text-gray-600 mt-1">Step 1 of 4: Select or create customer</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              1
            </div>
            <span className="font-bold text-blue-600">Customer</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <span className="font-semibold text-gray-500">Measurements</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <span className="font-semibold text-gray-500">Billing</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <span className="font-semibold text-gray-500">Review</span>
          </div>
        </div>
      </div>

      {/* Selection Mode Toggle */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Customer Option</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectionMode('existing')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectionMode === 'existing'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectionMode === 'existing' ? 'border-blue-600' : 'border-gray-300'
              }`}>
                {selectionMode === 'existing' && (
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 text-lg">Select Existing Customer</h3>
                <p className="text-sm text-gray-600">Choose from your customer database</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectionMode('new')}
            className={`p-6 rounded-xl border-2 transition-all ${
              selectionMode === 'new'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectionMode === 'new' ? 'border-blue-600' : 'border-gray-300'
              }`}>
                {selectionMode === 'new' && (
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 text-lg">Create New Customer</h3>
                <p className="text-sm text-gray-600">Add a new customer to database</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Existing Customer Selection */}
      {selectionMode === 'existing' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Customer</h2>
            
            {/* Search Bar */}
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

          {/* Customers List */}
          <div className="p-6 max-h-96 overflow-y-auto space-y-3">
            {filteredCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => setSelectedCustomerId(customer.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedCustomerId === customer.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedCustomerId === customer.id ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {selectedCustomerId === customer.id && (
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {customer.avatar}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-600">{customer.phone}</p>
                    <p className="text-xs text-gray-500">{customer.address}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600">{customer.totalOrders} orders</p>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                      {customer.gender}
                    </span>
                  </div>
                </div>
              </button>
            ))}

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No customers found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search</p>
                <button
                  onClick={() => setSelectionMode('new')}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create New Customer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Customer Form */}
      {selectionMode === 'new' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">New Customer Details</h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCustomerData.name}
                  onChange={handleNewCustomerChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                  placeholder="Rajesh Kumar"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={newCustomerData.phone}
                    onChange={handleNewCustomerChange}
                    maxLength={10}
                    className={`w-full pl-14 pr-4 py-3 rounded-xl border-2 ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    } focus:border-blue-600 focus:outline-none text-lg`}
                    placeholder="9876543210"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={newCustomerData.email}
                  onChange={handleNewCustomerChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                  placeholder="rajesh@email.com"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 mt-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={newCustomerData.gender === 'Male'}
                      onChange={handleNewCustomerChange}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-lg font-semibold text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={newCustomerData.gender === 'Female'}
                      onChange={handleNewCustomerChange}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-lg font-semibold text-gray-700">Female</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={newCustomerData.address}
                onChange={handleNewCustomerChange}
                rows={3}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.address ? 'border-red-500' : 'border-gray-200'
                } focus:border-blue-600 focus:outline-none text-lg resize-none`}
                placeholder="Shop No. 12, MG Road, Mumbai"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center bg-white rounded-2xl border border-gray-200 p-6">
        <Link
          href="/admin/orders"
          className="px-8 py-3 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </Link>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>Next: Measurements</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

    </div>
  );
}