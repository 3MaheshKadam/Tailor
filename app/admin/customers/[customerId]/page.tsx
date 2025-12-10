'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function CustomerDetailsPage() {
  const params = useParams();
  const customerId = params.customerId;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Dummy customer data
  const customer = {
    id: customerId,
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@email.com',
    address: 'Shop No. 12, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    gender: 'Male',
    status: 'Active',
    totalOrders: 8,
    totalSpent: '₹18,500',
    joinedDate: '15 Jan 2024',
    lastOrder: '5 Dec 2024',
    notes: 'Prefers slim fit shirts. Regular customer for corporate wear.',
  };

  // Dummy order history
  const orderHistory = [
    {
      id: 'ORD-1234',
      date: '5 Dec 2024',
      items: '2 Shirts + 1 Pant',
      amount: '₹2,500',
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-700',
      deadline: '15 Dec 2024',
    },
    {
      id: 'ORD-1198',
      date: '20 Nov 2024',
      items: '1 Shirt',
      amount: '₹1,200',
      status: 'Delivered',
      statusColor: 'bg-gray-100 text-gray-700',
      deadline: '28 Nov 2024',
    },
    {
      id: 'ORD-1156',
      date: '10 Oct 2024',
      items: '3 Shirts',
      amount: '₹3,600',
      status: 'Delivered',
      statusColor: 'bg-gray-100 text-gray-700',
      deadline: '20 Oct 2024',
    },
    {
      id: 'ORD-1089',
      date: '5 Sep 2024',
      items: '2 Pants',
      amount: '₹2,400',
      status: 'Delivered',
      statusColor: 'bg-gray-100 text-gray-700',
      deadline: '15 Sep 2024',
    },
    {
      id: 'ORD-1034',
      date: '12 Aug 2024',
      items: '1 Kurta + 1 Pant',
      amount: '₹2,800',
      status: 'Delivered',
      statusColor: 'bg-gray-100 text-gray-700',
      deadline: '22 Aug 2024',
    },
  ];

  const handleDelete = () => {
    // Simulate delete
    alert('Customer deleted successfully!');
    setShowDeleteModal(false);
    window.location.href = '/admin/customers';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/customers"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-black text-gray-900">Customer Details</h1>
          <p className="text-gray-600 mt-1">View and manage customer information</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/customers/${customerId}/edit`}
            className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-6 py-3 bg-white text-red-600 font-bold rounded-xl border-2 border-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column - Customer Info */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Customer Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <span className="text-4xl font-black text-blue-600">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-2xl font-black mb-1">{customer.name}</h2>
              <p className="text-blue-100">{customer.id}</p>
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mt-3">
                {customer.status}
              </span>
            </div>

            {/* Contact Info */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Phone</p>
                  <p className="text-gray-900 font-semibold">{customer.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Email</p>
                  <p className="text-gray-900 font-semibold">{customer.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Address</p>
                  <p className="text-gray-900 font-semibold">
                    {customer.address}<br />
                    {customer.city}, {customer.state} - {customer.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Gender</p>
                  <p className="text-gray-900 font-semibold">{customer.gender}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Customer Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Orders</span>
                <span className="text-2xl font-black text-blue-600">{customer.totalOrders}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Spent</span>
                <span className="text-2xl font-black text-green-600">{customer.totalSpent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Joined Date</span>
                <span className="text-sm font-semibold text-gray-900">{customer.joinedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Order</span>
                <span className="text-sm font-semibold text-gray-900">{customer.lastOrder}</span>
              </div>
            </div>
          </div>

          {/* Notes Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Notes
            </h3>
            <p className="text-gray-700 leading-relaxed">{customer.notes}</p>
          </div>

        </div>

        {/* Right Column - Order History & Actions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href={`/admin/orders/new?customerId=${customerId}`}
                className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Create New Order</h4>
                <p className="text-sm text-gray-600">Start a new order for this customer</p>
              </Link>

              <Link
                href={`/admin/customers/${customerId}/edit`}
                className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Edit Customer Info</h4>
                <p className="text-sm text-gray-600">Update contact and address details</p>
              </Link>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Order History</h3>
              <p className="text-sm text-gray-600 mt-1">Complete list of all orders</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Deadline</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderHistory.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">{order.id}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{order.date}</td>
                      <td className="px-6 py-4 text-gray-700">{order.items}</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">{order.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{order.deadline}</td>
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

            {orderHistory.length === 0 && (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">This customer hasn't placed any orders</p>
                <Link
                  href={`/admin/orders/new?customerId=${customerId}`}
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create First Order
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900 text-center mb-2">Delete Customer?</h2>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <strong>{customer.name}</strong>? This action cannot be undone and will also delete all associated orders.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}