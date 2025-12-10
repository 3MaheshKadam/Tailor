'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function TailorOrderDetailsPage() {
  const params = useParams();
  const orderId = params.orderId;

  const [currentStatus, setCurrentStatus] = useState('In Progress');

  // Dummy order data
  const order = {
    id: orderId,
    orderDate: '8 Dec 2024',
    customer: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      address: 'Shop No. 12, MG Road, Mumbai',
    },
    items: [
      {
        garment: 'Shirt',
        quantity: 2,
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
        measurements: {
          waist: '32',
          hip: '38',
          thigh: '22',
          pantLength: '40',
        },
      },
    ],
    preferences: {
      fitPreference: 'Regular',
      fabricType: 'Cotton',
      specialInstructions: 'Customer prefers slim fit shirts with button-down collar',
    },
    status: 'In Progress',
    deadline: '15 Dec 2024',
    daysLeft: 5,
    startedOn: '9 Dec 2024',
  };

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus);
    alert(`Order status updated to: ${newStatus}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/tailor/orders"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-gray-900">{order.id}</h1>
            <span className="px-4 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
              {currentStatus}
            </span>
          </div>
          <p className="text-gray-600 mt-1">Order placed on {order.orderDate}</p>
        </div>
      </div>

      {/* Quick Status Update */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Update Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={() => handleStatusUpdate('In Progress')}
            className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
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
            onClick={() => handleStatusUpdate('Need Help')}
            className="px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
          >
            Need Help
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Customer Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Customer</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-bold text-gray-900">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-900">{order.customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold text-gray-900">{order.customer.address}</p>
              </div>
            </div>
          </div>

          {/* Deadline Card */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200 shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Deadline</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="text-2xl font-black text-gray-900">{order.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Days Remaining</p>
                <p className="text-3xl font-black text-orange-600">{order.daysLeft} days</p>
              </div>
              {order.startedOn && (
                <div>
                  <p className="text-sm text-gray-600">Started On</p>
                  <p className="font-semibold text-gray-900">{order.startedOn}</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h2>
            
            <div className="space-y-6">
              {order.items.map((item, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{item.garment}</h3>
                    <span className="text-sm text-gray-600">Quantity: <span className="font-bold text-gray-900">{item.quantity}</span></span>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-3">Measurements (inches)</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(item.measurements).map(([key, value]) => (
                        <div key={key} className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                          <p className="text-xs text-gray-500 capitalize mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-xl font-black text-indigo-600">{value}"</p>
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
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Fit Preference</p>
                  <p className="font-semibold text-gray-900">{order.preferences.fitPreference}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Fabric Type</p>
                  <p className="font-semibold text-gray-900">{order.preferences.fabricType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Special Instructions</p>
                  <p className="font-semibold text-gray-900">{order.preferences.specialInstructions}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}