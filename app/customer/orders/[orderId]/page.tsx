'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CustomerOrderDetailsPage() {
  const params = useParams();
  const orderId = params.orderId;

  // Dummy order data
  const order = {
    id: orderId,
    date: '8 Dec 2025',
    items: [
      {
        garment: 'Shirt',
        quantity: 2,
        price: 1200,
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
        price: 1000,
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
      paid: 1500,
      remaining: 2000,
      paymentMode: 'Cash',
    },
    preferences: {
      fitPreference: 'Regular',
      fabricType: 'Cotton',
      specialInstructions: 'Customer prefers slim fit shirts with button-down collar',
    },
    status: 'In Progress',
    deadline: '15 Dec 2025',
    daysLeft: 5,
    tailor: 'Ramesh Kumar',
    shopAddress: 'Kumar Tailors, Shop No. 12, MG Road, Mumbai - 400001',
    shopPhone: '+91 98765 43210',
    statusHistory: [
      { status: 'Order Placed', date: '8 Dec 2025, 10:30 AM', completed: true },
      { status: 'Measurements Taken', date: '8 Dec 2025, 11:00 AM', completed: true },
      { status: 'Work in Progress', date: '9 Dec 2025, 09:15 AM', completed: true },
      { status: 'Ready for Pickup', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Ready':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Delivered':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/customer"
          className="p-2 hover:bg-white rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-gray-900">{order.id}</h1>
            <span className={`px-4 py-1 rounded-full text-sm font-bold border ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <p className="text-gray-600 mt-1">Ordered on {order.date}</p>
        </div>
      </div>

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
                  <h3 className={`font-bold text-lg ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                    {item.status}
                  </h3>
                  {item.date && (
                    <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.status === 'Ready' && (
          <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Your order is ready!</h3>
                <p className="text-green-700 mb-4">You can pick up your order from our shop anytime during business hours.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-green-900 font-semibold">{order.shopAddress}</p>
                  <p className="text-green-900 font-semibold">Phone: {order.shopPhone}</p>
                  <p className="text-green-700">Hours: Mon-Sat, 10:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Payment Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h2>
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
                <span className="text-2xl font-black text-blue-600">₹{order.billing.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-200">
                <span className="text-gray-700">Paid</span>
                <span className="font-semibold text-green-600">₹{order.billing.paid.toLocaleString()}</span>
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
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Mode</span>
                  <span className="text-sm font-semibold text-gray-900">{order.billing.paymentMode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Info */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shop Details</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold text-gray-900">{order.shopAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-900">{order.shopPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Your Tailor</p>
                  <p className="font-semibold text-gray-900">{order.tailor}</p>
                </div>
              </div>
            </div>
            
            <a
              href={`https://wa.me/${order.shopPhone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              Contact on WhatsApp
            </a>
          </div>

          {/* Deadline */}
          {order.status !== 'Delivered' && (
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200 shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Deadline</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Expected Date</p>
                  <p className="text-2xl font-black text-gray-900">{order.deadline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time Remaining</p>
                  <p className={`text-3xl font-black ${
                    order.daysLeft <= 2 ? 'text-red-600' :
                    order.daysLeft <= 4 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {order.daysLeft} days
                  </p>
                </div>
              </div>
            </div>
          )}

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
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-xl font-bold text-blue-600">₹{(item.quantity * item.price).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-3">Your Measurements (inches)</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(item.measurements).map(([key, value]) => (
                        <div key={key} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-xs text-gray-500 capitalize mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-lg font-black text-blue-600">{value}"</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Fit Preference</p>
                  <p className="font-semibold text-gray-900">{order.preferences.fitPreference}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Fabric Type</p>
                  <p className="font-semibold text-gray-900">{order.preferences.fabricType}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
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

        </div>

      </div>

    </div>
  );
}