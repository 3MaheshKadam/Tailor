'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NewOrderStep3Page() {
  const router = useRouter();
  
  const [billingData, setBillingData] = useState({
    itemCosts: [] as { garment: string; quantity: number; costPerItem: number }[],
    additionalCharges: '',
    discount: '',
    advancePaid: '',
    paymentMode: 'Cash',
    deliveryDate: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [selectedGarments, setSelectedGarments] = useState<string[]>([]);

  useEffect(() => {
    // Load measurement data to know which garments were selected
    const measurementsData = sessionStorage.getItem('orderMeasurements');
    if (measurementsData) {
      const data = JSON.parse(measurementsData);
      setSelectedGarments(data.selectedGarments || []);
      
      // Initialize item costs based on selected garments
      const initialCosts = data.selectedGarments.map((garment: string) => ({
        garment,
        quantity: 1,
        costPerItem: getDefaultPrice(garment),
      }));
      
      setBillingData(prev => ({ ...prev, itemCosts: initialCosts }));
    }

    // Load any saved billing data
    const savedBilling = sessionStorage.getItem('orderBilling');
    if (savedBilling) {
      setBillingData(JSON.parse(savedBilling));
    }
  }, []);

  const getDefaultPrice = (garment: string) => {
    const prices: any = {
      'Shirt': 1200,
      'Pant': 1000,
      'Kurta': 1500,
      'Blouse': 800,
    };
    return prices[garment] || 1000;
  };

  const handleItemCostChange = (index: number, field: string, value: string) => {
    const newItemCosts = [...billingData.itemCosts];
    newItemCosts[index] = {
      ...newItemCosts[index],
      [field]: field === 'garment' ? value : parseFloat(value) || 0,
    };
    setBillingData({ ...billingData, itemCosts: newItemCosts });
  };

  const calculateSubtotal = () => {
    return billingData.itemCosts.reduce((sum, item) => 
      sum + (item.quantity * item.costPerItem), 0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const additional = parseFloat(billingData.additionalCharges) || 0;
    const discount = parseFloat(billingData.discount) || 0;
    return subtotal + additional - discount;
  };

  const calculateRemaining = () => {
    const total = calculateTotal();
    const advance = parseFloat(billingData.advancePaid) || 0;
    return total - advance;
  };

  const validateBilling = () => {
    const newErrors: any = {};

    // Validate item costs
    billingData.itemCosts.forEach((item, index) => {
      if (item.quantity <= 0) {
        newErrors[`quantity_${index}`] = 'Quantity must be at least 1';
      }
      if (item.costPerItem <= 0) {
        newErrors[`cost_${index}`] = 'Cost must be greater than 0';
      }
    });

    // Validate delivery date
    if (!billingData.deliveryDate) {
      newErrors.deliveryDate = 'Delivery date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(billingData.deliveryDate);
      if (selectedDate < today) {
        newErrors.deliveryDate = 'Delivery date cannot be in the past';
      }
    }

    // Validate advance payment
    const total = calculateTotal();
    const advance = parseFloat(billingData.advancePaid) || 0;
    if (advance > total) {
      newErrors.advancePaid = 'Advance cannot be greater than total amount';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert('Please fix the errors before proceeding');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateBilling()) {
      // Save billing data to session
      sessionStorage.setItem('orderBilling', JSON.stringify(billingData));
      router.push('/admin/orders/new/review');
    }
  };

  const handleBack = () => {
    // Save current data before going back
    sessionStorage.setItem('orderBilling', JSON.stringify(billingData));
    router.push('/admin/orders/new/measurements');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Create New Order</h1>
          <p className="text-gray-600 mt-1">Step 3 of 4: Billing & payment details</p>
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
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              3
            </div>
            <span className="font-bold text-blue-600">Billing</span>
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

      {/* Item Costs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Item Costs
        </h2>

        <div className="space-y-4">
          {billingData.itemCosts.map((item, index) => (
            <div key={index} className="grid md:grid-cols-4 gap-4 items-center p-4 bg-gray-50 rounded-xl">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Garment Type
                </label>
                <input
                  type="text"
                  value={item.garment}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-lg font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemCostChange(index, 'quantity', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors[`quantity_${index}`] ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Cost Per Item (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={item.costPerItem}
                  onChange={(e) => handleItemCostChange(index, 'costPerItem', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors[`cost_${index}`] ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Subtotal
                </label>
                <div className="px-4 py-3 bg-white rounded-xl border-2 border-gray-200">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{(item.quantity * item.costPerItem).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Charges & Discount */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Details</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Additional Charges (₹) <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={billingData.additionalCharges}
              onChange={(e) => setBillingData({...billingData, additionalCharges: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
              placeholder="0"
            />
            <p className="text-sm text-gray-500 mt-1">Extra charges for buttons, zippers, etc.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Discount (₹) <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={billingData.discount}
              onChange={(e) => setBillingData({...billingData, discount: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
              placeholder="0"
            />
            <p className="text-sm text-gray-500 mt-1">Any discount offered to customer</p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Payment Details
        </h2>
        
        <div className="space-y-6">
          {/* Payment Mode */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Payment Mode
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setBillingData({...billingData, paymentMode: 'Cash'})}
                className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                  billingData.paymentMode === 'Cash'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300'
                }`}
              >
                💵 Cash
              </button>
              <button
                onClick={() => setBillingData({...billingData, paymentMode: 'Online'})}
                className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                  billingData.paymentMode === 'Online'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300'
                }`}
              >
                💳 Online
              </button>
              <button
                onClick={() => setBillingData({...billingData, paymentMode: 'UPI'})}
                className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                  billingData.paymentMode === 'UPI'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-600 hover:border-blue-300'
                }`}
              >
                📱 UPI
              </button>
            </div>
          </div>

          {/* Advance Paid */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Advance Paid (₹) <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={billingData.advancePaid}
              onChange={(e) => setBillingData({...billingData, advancePaid: e.target.value})}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.advancePaid ? 'border-red-500' : 'border-gray-200'
              } focus:border-blue-600 focus:outline-none text-lg`}
              placeholder="0"
            />
            {errors.advancePaid && <p className="text-red-500 text-sm mt-1">{errors.advancePaid}</p>}
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Delivery Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={billingData.deliveryDate}
              onChange={(e) => setBillingData({...billingData, deliveryDate: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.deliveryDate ? 'border-red-500' : 'border-gray-200'
              } focus:border-blue-600 focus:outline-none text-lg`}
            />
            {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>}
          </div>
        </div>
      </div>

      {/* Billing Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Summary</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-blue-200">
            <span className="text-lg text-gray-700">Items Subtotal</span>
            <span className="text-xl font-bold text-gray-900">₹{calculateSubtotal().toLocaleString()}</span>
          </div>

          {(parseFloat(billingData.additionalCharges) || 0) > 0 && (
            <div className="flex items-center justify-between py-3 border-b border-blue-200">
              <span className="text-lg text-gray-700">Additional Charges</span>
              <span className="text-xl font-bold text-green-600">
                +₹{parseFloat(billingData.additionalCharges).toLocaleString()}
              </span>
            </div>
          )}

          {(parseFloat(billingData.discount) || 0) > 0 && (
            <div className="flex items-center justify-between py-3 border-b border-blue-200">
              <span className="text-lg text-gray-700">Discount</span>
              <span className="text-xl font-bold text-red-600">
                -₹{parseFloat(billingData.discount).toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between py-4 border-b-2 border-blue-400">
            <span className="text-xl font-bold text-gray-900">Total Amount</span>
            <span className="text-3xl font-black text-blue-600">₹{calculateTotal().toLocaleString()}</span>
          </div>

          {(parseFloat(billingData.advancePaid) || 0) > 0 && (
            <div className="flex items-center justify-between py-3 border-b border-blue-200">
              <span className="text-lg text-gray-700">Advance Paid</span>
              <span className="text-xl font-bold text-green-600">
                ₹{parseFloat(billingData.advancePaid).toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between py-4 bg-white rounded-xl px-6">
            <span className="text-xl font-bold text-gray-900">Remaining Amount</span>
            <span className={`text-3xl font-black ${
              calculateRemaining() > 0 ? 'text-orange-600' : 'text-green-600'
            }`}>
              ₹{calculateRemaining().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center bg-white rounded-2xl border border-gray-200 p-6">
        <button
          onClick={handleBack}
          className="px-8 py-3 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back: Measurements</span>
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>Next: Review Order</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

    </div>
  );
}