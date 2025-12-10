'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('shop');
  const [isSaving, setIsSaving] = useState(false);

  // Shop Settings State
  const [shopSettings, setShopSettings] = useState({
    shopName: 'Kumar Tailors',
    ownerName: 'Rajesh Kumar',
    email: 'kumar.tailors@email.com',
    phone: '+91 9876543210',
    address: 'Shop No. 12, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    gstNumber: '27XXXXX1234X1ZX',
  });

  // WhatsApp Settings State
  const [whatsappSettings, setWhatsappSettings] = useState({
    whatsappNumber: '+91 9876543210',
    enableNotifications: true,
    orderConfirmation: true,
    statusUpdates: true,
    readyNotification: true,
    reminderBeforeDeadline: true,
    reminderDays: '2',
  });

  // Pricing Settings State
  const [pricingSettings, setPricingSettings] = useState({
    shirtPrice: '1200',
    pantPrice: '1000',
    kurtaPrice: '1500',
    blousePrice: '800',
    additionalButtonPrice: '10',
    zipperPrice: '50',
    urgentCharge: '500',
  });

  // Business Settings State
  const [businessSettings, setBusinessSettings] = useState({
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    openTime: '10:00',
    closeTime: '20:00',
    defaultDeadlineDays: '7',
    urgentDeadlineDays: '3',
  });

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleShopChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShopSettings({
      ...shopSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setWhatsappSettings({
      ...whatsappSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPricingSettings({
      ...pricingSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessSettings({
      ...businessSettings,
      [e.target.name]: e.target.value,
    });
  };

  const toggleWorkingDay = (day: string) => {
    if (businessSettings.workingDays.includes(day)) {
      setBusinessSettings({
        ...businessSettings,
        workingDays: businessSettings.workingDays.filter(d => d !== day),
      });
    } else {
      setBusinessSettings({
        ...businessSettings,
        workingDays: [...businessSettings.workingDays, day],
      });
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your shop preferences and configurations</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === 'shop'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Shop Details
            </div>
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === 'whatsapp'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              WhatsApp
            </div>
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === 'pricing'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pricing
            </div>
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === 'business'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Business Hours
            </div>
          </button>
        </div>
      </div>

      {/* Shop Details Tab */}
      {activeTab === 'shop' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Shop Name
                </label>
                <input
                  type="text"
                  name="shopName"
                  value={shopSettings.shopName}
                  onChange={handleShopChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Owner Name
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={shopSettings.ownerName}
                  onChange={handleShopChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={shopSettings.email}
                  onChange={handleShopChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shopSettings.phone}
                  onChange={handleShopChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={shopSettings.address}
                  onChange={handleShopChange}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shopSettings.city}
                  onChange={handleShopChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={shopSettings.state}
                  onChange={handleShopChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={shopSettings.pincode}
                  onChange={handleShopChange}
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  GST Number <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={shopSettings.gstNumber}
                  onChange={handleShopChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Tab */}
      {activeTab === 'whatsapp' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">WhatsApp Configuration</h2>
            
            <div className="space-y-6">
              <div className="max-w-md">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={whatsappSettings.whatsappNumber}
                  onChange={handleWhatsappChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  This number will be used to send WhatsApp notifications to customers
                </p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  name="enableNotifications"
                  checked={whatsappSettings.enableNotifications}
                  onChange={handleWhatsappChange}
                  className="w-6 h-6 text-blue-600 rounded"
                />
                <div>
                  <label className="font-bold text-gray-900">Enable WhatsApp Notifications</label>
                  <p className="text-sm text-gray-600">Send automated messages to customers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Types</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                <input
                  type="checkbox"
                  name="orderConfirmation"
                  checked={whatsappSettings.orderConfirmation}
                  onChange={handleWhatsappChange}
                  disabled={!whatsappSettings.enableNotifications}
                  className="w-6 h-6 text-blue-600 rounded"
                />
                <div className="flex-1">
                  <label className="font-bold text-gray-900">Order Confirmation</label>
                  <p className="text-sm text-gray-600">Send message immediately after order is created</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <input
                  type="checkbox"
                  name="statusUpdates"
                  checked={whatsappSettings.statusUpdates}
                  onChange={handleWhatsappChange}
                  disabled={!whatsappSettings.enableNotifications}
                  className="w-6 h-6 text-blue-600 rounded"
                />
                <div className="flex-1">
                  <label className="font-bold text-gray-900">Status Updates</label>
                  <p className="text-sm text-gray-600">Notify when order status changes (In Progress, etc.)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <input
                  type="checkbox"
                  name="readyNotification"
                  checked={whatsappSettings.readyNotification}
                  onChange={handleWhatsappChange}
                  disabled={!whatsappSettings.enableNotifications}
                  className="w-6 h-6 text-blue-600 rounded"
                />
                <div className="flex-1">
                  <label className="font-bold text-gray-900">Ready for Pickup</label>
                  <p className="text-sm text-gray-600">Notify customer when order is ready</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <input
                  type="checkbox"
                  name="reminderBeforeDeadline"
                  checked={whatsappSettings.reminderBeforeDeadline}
                  onChange={handleWhatsappChange}
                  disabled={!whatsappSettings.enableNotifications}
                  className="w-6 h-6 text-blue-600 rounded"
                />
                <div className="flex-1">
                  <label className="font-bold text-gray-900">Deadline Reminder</label>
                  <p className="text-sm text-gray-600">Remind customer before deadline</p>
                </div>
                {whatsappSettings.reminderBeforeDeadline && (
                  <input
                    type="number"
                    name="reminderDays"
                    value={whatsappSettings.reminderDays}
                    onChange={handleWhatsappChange}
                    min="1"
                    max="7"
                    className="w-20 px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                  />
                )}
                {whatsappSettings.reminderBeforeDeadline && (
                  <span className="text-sm text-gray-600">days before</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Default Pricing</h2>
            <p className="text-gray-600 mb-6">Set default prices for quick order creation</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Shirt Stitching (₹)
                </label>
                <input
                  type="number"
                  name="shirtPrice"
                  value={pricingSettings.shirtPrice}
                  onChange={handlePricingChange}
                  min="0"
                  step="50"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Pant Stitching (₹)
                </label>
                <input
                  type="number"
                  name="pantPrice"
                  value={pricingSettings.pantPrice}
                  onChange={handlePricingChange}
                  min="0"
                  step="50"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Kurta Stitching (₹)
                </label>
                <input
                  type="number"
                  name="kurtaPrice"
                  value={pricingSettings.kurtaPrice}
                  onChange={handlePricingChange}
                  min="0"
                  step="50"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Blouse Stitching (₹)
                </label>
                <input
                  type="number"
                  name="blousePrice"
                  value={pricingSettings.blousePrice}
                  onChange={handlePricingChange}
                  min="0"
                  step="50"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Additional Charges</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Extra Button (₹)
                </label>
                <input
                  type="number"
                  name="additionalButtonPrice"
                  value={pricingSettings.additionalButtonPrice}
                  onChange={handlePricingChange}
                  min="0"
                  step="5"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Zipper (₹)
                </label>
                <input
                  type="number"
                  name="zipperPrice"
                  value={pricingSettings.zipperPrice}
                  onChange={handlePricingChange}
                  min="0"
                  step="10"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Urgent Charge (₹)
                </label>
                <input
                  type="number"
                  name="urgentCharge"
                  value={pricingSettings.urgentCharge}
                  onChange={handlePricingChange}
                  min="0"
                  step="50"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Business Hours Tab */}
      {activeTab === 'business' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Working Days</h2>
            <p className="text-gray-600 mb-6">Select the days your shop is open</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {weekDays.map(day => (
                <button
                  key={day}
                  onClick={() => toggleWorkingDay(day)}
                  className={`px-6 py-4 rounded-xl border-2 font-semibold transition-all ${
                    businessSettings.workingDays.includes(day)
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Shop Timings</h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Opening Time
                </label>
                <input
                  type="time"
                  name="openTime"
                  value={businessSettings.openTime}
                  onChange={handleBusinessChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Closing Time
                </label>
                <input
                  type="time"
                  name="closeTime"
                  value={businessSettings.closeTime}
                  onChange={handleBusinessChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Default Deadlines</h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Standard Deadline (Days)
                </label>
                <input
                  type="number"
                  name="defaultDeadlineDays"
                  value={businessSettings.defaultDeadlineDays}
                  onChange={handleBusinessChange}
                  min="1"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">Default days to complete an order</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Urgent Deadline (Days)
                </label>
                <input
                  type="number"
                  name="urgentDeadlineDays"
                  value={businessSettings.urgentDeadlineDays}
                  onChange={handleBusinessChange}
                  min="1"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
                <p className="text-sm text-gray-500 mt-2">Days for urgent orders</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end bg-white rounded-2xl border border-gray-200 p-6">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-8 py-3 font-bold rounded-xl transition-all flex items-center gap-2 ${
            isSaving
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}