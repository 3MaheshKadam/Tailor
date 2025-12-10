'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('In Progress');

  // Dummy order data
  const order = {
    id: orderId,
    orderDate: '8 Dec 2024',
    customer: {
      id: 'CUST-001',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@email.com',
      address: 'Shop No. 12, MG Road, Mumbai',
      gender: 'Male',
    },
    items: [
      {
        garment: 'Shirt',
        quantity: 2,
        costPerItem: 1200,
        measurements: {
          chest: '38',
          shoulder: '17',
          waist: '34',
          shirtLength: '30',
          sleeveLength: '24',
          collar: '15',
        },
      },
      {
        garment: 'Pant',
        quantity: 1,
        costPerItem: 1000,
        measurements: {
          waist: '32',
          hip: '38',
          thigh: '22',
          pantLength: '40',
        },
      },
    ],
    billing: {
      subtotal: 3400,
      additionalCharges: 100,
      discount: 0,
      total: 3500,
      advancePaid: 1500,
      remaining: 2000,
      paymentMode: 'Cash',
    },
    preferences: {
      fitPreference: 'Regular',
      fabricType: 'Cotton',
      specialInstructions: 'Customer prefers slim fit shirts with button-down collar',
    },
    assignedTo: 'Ramesh Kumar',
    tailorId: 'TAILOR-001',
    status: 'In Progress',
    deadline: '15 Dec 2024',
    statusHistory: [
      { status: 'Order Created', date: '8 Dec 2024 10:30 AM', completed: true },
      { status: 'Assigned to Tailor', date: '8 Dec 2024 11:00 AM', completed: true },
      { status: 'In Progress', date: '9 Dec 2024 09:15 AM', completed: true },
      { status: 'Ready', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false },
    ],
  };

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus);
    alert(`Order status updated to: ${newStatus}`);
  };

  const handleDelete = () => {
    alert('Order deleted successfully!');
    setShowDeleteModal(false);
    router.push('/admin/orders');
  };

  const handlePrint = (copyType: string) => {
    alert(`Opening ${copyType} for printing...`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
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
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-gray-900">{order.id}</h1>
            <span className="px-4 py-1 bg-yellow-100 text-yellow-700 text-sm font-bold rounded-full">
              {currentStatus}
            </span>
          </div>
          <p className="text-gray-600 mt-1">Order placed on {order.orderDate}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/orders/${orderId}/edit`}
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
        
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Customer Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer Details
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-bold text-gray-900">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-900">{order.customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-900">{order.customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold text-gray-900">{order.customer.address}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <Link
                href={`/admin/customers/${order.customer.id}`}
                className="block text-center px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
              >
                View Customer Profile
              </Link>
            </div>
          </div>

          {/* Billing Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Billing Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-semibold text-gray-900">₹{order.billing.subtotal.toLocaleString()}</span>
              </div>
              {order.billing.additionalCharges > 0 && (
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span className="text-gray-700">Additional Charges</span>
                  <span className="font-semibold text-green-600">+₹{order.billing.additionalCharges}</span>
                </div>
              )}
              {order.billing.discount > 0 && (
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span className="text-gray-700">Discount</span>
                  <span className="font-semibold text-red-600">-₹{order.billing.discount}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-b-2 border-blue-400">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="text-xl font-black text-blue-600">₹{order.billing.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Advance Paid</span>
                <span className="font-semibold text-green-600">₹{order.billing.advancePaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 bg-white rounded-xl px-4">
                <span className="font-bold text-gray-900">Remaining</span>
                <span className={`text-xl font-black ${
                  order.billing.remaining > 0 ? 'text-orange-600' : 'text-green-600'
                }`}>
                  ₹{order.billing.remaining.toLocaleString()}
                </span>
              </div>
              <div className="pt-3 border-t border-blue-200">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Payment Mode</span>
                  <span className="text-sm font-semibold text-gray-900">{order.billing.paymentMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Deadline</span>
                  <span className="text-sm font-semibold text-gray-900">{order.deadline}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tailor Assignment */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tailor Assignment</h2>
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <div>
                <p className="font-bold text-gray-900">{order.assignedTo}</p>
                <p className="text-sm text-gray-600">Tailor</p>
              </div>
            </div>
            <button className="mt-4 w-full px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors border border-blue-600">
              Change Tailor
            </button>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Timeline */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Status</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
              
              {/* Timeline Items */}
              <div className="space-y-6">
                {order.statusHistory.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-green-600' : 'bg-gray-200'
                    }`}>
                      {item.completed ? (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className={`font-bold ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {item.status}
                      </h3>
                      {item.date && (
                        <p className="text-sm text-gray-500">{item.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Update Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => handleStatusUpdate('Measuring')}
                className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Mark Measuring
              </button>
              <button
                onClick={() => handleStatusUpdate('In Progress')}
                className="px-4 py-3 bg-yellow-600 text-white font-semibold rounded-xl hover:bg-yellow-700 transition-colors"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => handleStatusUpdate('Ready')}
                className="px-4 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
              >
                Mark Ready
              </button>
              <button
                onClick={() => handleStatusUpdate('Delivered')}
                className="px-4 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
              >
                Mark Delivered
              </button>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h2>
            
            <div className="space-y-6">
              {order.items.map((item, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{item.garment}</h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-xl font-bold text-blue-600">
                        ₹{(item.quantity * item.costPerItem).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-3">Measurements</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(item.measurements).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-xs text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="font-semibold text-gray-900">{value} inches</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Preferences & Instructions</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Fit Preference</p>
                  <p className="font-semibold text-gray-900">{order.preferences.fitPreference}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Fabric Type</p>
                  <p className="font-semibold text-gray-900">{order.preferences.fabricType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Special Instructions</p>
                  <p className="font-semibold text-gray-900">{order.preferences.specialInstructions}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Print Copies */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Print Order Copies</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => handlePrint('Admin Copy')}
                className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Admin Copy</h3>
                <p className="text-sm text-gray-600">Full details with billing</p>
              </button>

              <button
                onClick={() => handlePrint('Tailor Copy')}
                className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Tailor Copy</h3>
                <p className="text-sm text-gray-600">Measurements only</p>
              </button>

              <button
                onClick={() => handlePrint('Customer Copy')}
                className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Customer Copy</h3>
                <p className="text-sm text-gray-600">Receipt format</p>
              </button>
            </div>
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
            <h2 className="text-2xl font-black text-gray-900 text-center mb-2">Delete Order?</h2>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete order <strong>{order.id}</strong>? This action cannot be undone.
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