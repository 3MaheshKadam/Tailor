'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NewOrderStep4Page() {
  const router = useRouter();
  
  const [orderData, setOrderData] = useState<any>({
    customer: null,
    measurements: null,
    billing: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  useEffect(() => {
    // Load all data from session storage
    const customerId = sessionStorage.getItem('orderCustomerId');
    const newCustomer = sessionStorage.getItem('orderNewCustomer');
    const measurements = sessionStorage.getItem('orderMeasurements');
    const billing = sessionStorage.getItem('orderBilling');

    if (!measurements || !billing) {
      // Redirect back if data is missing
      router.push('/admin/orders/new');
      return;
    }

    const customerData = newCustomer 
      ? JSON.parse(newCustomer) 
      : {
          id: customerId,
          name: 'Rajesh Kumar', // Dummy data
          phone: '+91 98765 43210',
          email: 'rajesh@email.com',
          address: 'Shop No. 12, MG Road, Mumbai',
          gender: 'Male',
        };

    setOrderData({
      customer: customerData,
      measurements: JSON.parse(measurements),
      billing: JSON.parse(billing),
    });
  }, [router]);

  const calculateTotal = () => {
    if (!orderData.billing) return 0;
    const subtotal = orderData.billing.itemCosts.reduce(
      (sum: number, item: any) => sum + (item.quantity * item.costPerItem), 
      0
    );
    const additional = parseFloat(orderData.billing.additionalCharges) || 0;
    const discount = parseFloat(orderData.billing.discount) || 0;
    return subtotal + additional - discount;
  };

  const calculateRemaining = () => {
    const total = calculateTotal();
    const advance = parseFloat(orderData.billing?.advancePaid) || 0;
    return total - advance;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate order creation
    setTimeout(() => {
      // Generate order ID
      const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
      setGeneratedOrderId(orderId);

      // Clear session storage
      sessionStorage.removeItem('orderCustomerId');
      sessionStorage.removeItem('orderNewCustomer');
      sessionStorage.removeItem('orderMeasurements');
      sessionStorage.removeItem('orderBilling');

      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push(`/admin/orders/${generatedOrderId}`);
  };

  if (!orderData.customer || !orderData.measurements || !orderData.billing) {
    return (
      <div className="max-w-6xl mx-auto p-12 text-center">
        <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders/new/billing"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Create New Order</h1>
          <p className="text-gray-600 mt-1">Step 4 of 4: Review and submit order</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              ✓
            </div>
            <span className="font-semibold text-green-600">Customer</span>
          </div>
          <div className="flex-1 h-1 bg-green-600 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              ✓
            </div>
            <span className="font-semibold text-green-600">Measurements</span>
          </div>
          <div className="flex-1 h-1 bg-green-600 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              ✓
            </div>
            <span className="font-semibold text-green-600">Billing</span>
          </div>
          <div className="flex-1 h-1 bg-green-600 mx-4"></div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              4
            </div>
            <span className="font-bold text-blue-600">Review</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column - Customer & Billing Summary */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Customer Information */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Customer Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-bold text-gray-900">{orderData.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-900">{orderData.customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold text-gray-900">{orderData.customer.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold text-gray-900">{orderData.customer.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-semibold text-gray-900">{orderData.customer.gender}</p>
              </div>
            </div>
            <Link
              href="/admin/orders/new"
              className="mt-4 block text-center px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
            >
              Edit Customer
            </Link>
          </div>

          {/* Billing Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Payment Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="text-gray-700">Total Amount</span>
                <span className="font-bold text-gray-900">₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="text-gray-700">Advance Paid</span>
                <span className="font-bold text-green-600">
                  ₹{parseFloat(orderData.billing.advancePaid || '0').toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 bg-white rounded-xl px-4">
                <span className="font-bold text-gray-900">Remaining</span>
                <span className={`text-xl font-black ${
                  calculateRemaining() > 0 ? 'text-orange-600' : 'text-green-600'
                }`}>
                  ₹{calculateRemaining().toLocaleString()}
                </span>
              </div>
              <div className="pt-3 border-t border-blue-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Mode</span>
                  <span className="text-sm font-semibold text-gray-900">{orderData.billing.paymentMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Delivery Date</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {new Date(orderData.billing.deliveryDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/admin/orders/new/billing"
              className="mt-4 block text-center px-4 py-2 text-blue-600 font-semibold hover:bg-blue-100 rounded-lg transition-colors"
            >
              Edit Billing
            </Link>
          </div>

        </div>

        {/* Right Column - Measurements & Items */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Order Items
            </h2>
            
            <div className="space-y-4">
              {orderData.billing.itemCosts.map((item: any, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.garment}</h3>
                    <span className="text-xl font-bold text-blue-600">
                      ₹{(item.quantity * item.costPerItem).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Quantity: <span className="font-semibold text-gray-900">{item.quantity}</span></span>
                    <span>•</span>
                    <span>Price: <span className="font-semibold text-gray-900">₹{item.costPerItem.toLocaleString()}</span> each</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Measurements */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Measurements
              </h2>
              <Link
                href="/admin/orders/new/measurements"
                className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
              >
                Edit
              </Link>
            </div>

            {/* Shirt Measurements */}
            {orderData.measurements.selectedGarments.includes('Shirt') && (
              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Shirt Measurements</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(orderData.measurements.shirtMeasurements).map(([key, value]: any) => (
                    value && (
                      <div key={key}>
                        <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="font-semibold text-gray-900">{value} inches</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Pant Measurements */}
            {orderData.measurements.selectedGarments.includes('Pant') && (
              <div className="mb-6 p-4 bg-green-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Pant Measurements</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(orderData.measurements.pantMeasurements).map(([key, value]: any) => (
                    value && (
                      <div key={key}>
                        <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="font-semibold text-gray-900">{value} inches</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Kurta Measurements */}
            {orderData.measurements.selectedGarments.includes('Kurta') && (
              <div className="mb-6 p-4 bg-purple-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Kurta Measurements</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(orderData.measurements.kurtaMeasurements).map(([key, value]: any) => (
                    value && (
                      <div key={key}>
                        <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="font-semibold text-gray-900">{value} inches</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Blouse Measurements */}
            {orderData.measurements.selectedGarments.includes('Blouse') && (
              <div className="mb-6 p-4 bg-pink-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Blouse Measurements</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(orderData.measurements.blouseMeasurements).map(([key, value]: any) => (
                    value && (
                      <div key={key}>
                        <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="font-semibold text-gray-900">{value} inches</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Preferences */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Preferences</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Fit Preference</p>
                  <p className="font-semibold text-gray-900">{orderData.measurements.commonData.fitPreference}</p>
                </div>
                {orderData.measurements.commonData.fabricType && (
                  <div>
                    <p className="text-xs text-gray-500">Fabric Type</p>
                    <p className="font-semibold text-gray-900">{orderData.measurements.commonData.fabricType}</p>
                  </div>
                )}
                {orderData.measurements.commonData.specialInstructions && (
                  <div className="md:col-span-3">
                    <p className="text-xs text-gray-500">Special Instructions</p>
                    <p className="font-semibold text-gray-900">{orderData.measurements.commonData.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center bg-white rounded-2xl border border-gray-200 p-6">
        <Link
          href="/admin/orders/new/billing"
          className="px-8 py-3 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back: Billing</span>
        </Link>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-8 py-3 font-bold rounded-xl transition-all flex items-center gap-2 ${
            isSubmitting
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Creating Order...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Submit Order</span>
            </>
          )}
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 transform scale-100 animate-bounce-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Order Created!</h2>
            <p className="text-gray-600 text-center mb-6">
              Order <span className="font-bold text-blue-600">{generatedOrderId}</span> has been created successfully.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleSuccessClose}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                View Order Details
              </button>
              <Link
                href="/admin/orders"
                className="block w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-center"
              >
                Go to Orders List
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}