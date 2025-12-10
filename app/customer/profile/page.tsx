'use client';

import { useState } from 'react';

export default function CustomerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@email.com',
    address: 'Shop No. 12, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!profileData.name.trim()) newErrors.name = 'Name is required';
    if (!profileData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(profileData.phone.replace('+91 ', ''))) {
      newErrors.phone = 'Enter valid 10-digit phone number';
    }
    if (!profileData.address.trim()) newErrors.address = 'Address is required';
    if (!profileData.city.trim()) newErrors.city = 'City is required';
    if (!profileData.state.trim()) newErrors.state = 'State is required';
    if (profileData.pincode && !/^[0-9]{6}$/.test(profileData.pincode)) {
      newErrors.pincode = 'Enter valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }, 1500);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset to original values
    setProfileData({
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@email.com',
      address: 'Shop No. 12, MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    });
  };

  // Order statistics
  const orderStats = {
    totalOrders: 8,
    activeOrders: 3,
    completedOrders: 5,
    totalSpent: 18500,
    memberSince: 'January 2024',
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information and order history</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 rounded-t-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 font-black text-3xl shadow-lg">
              RK
            </div>
            <div className="text-center md:text-left text-white">
              <h2 className="text-3xl font-black mb-2">{profileData.name}</h2>
              <p className="text-blue-100 text-lg">{profileData.phone}</p>
              <p className="text-blue-100">{profileData.email}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
                    isSaving
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900 py-3">{profileData.name}</p>
              )}
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900 py-3">{profileData.phone}</p>
              )}
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-lg"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900 py-3">{profileData.email}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Address
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  rows={2}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.address ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg resize-none`}
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900 py-3">{profileData.address}</p>
              )}
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.city ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900 py-3">{profileData.city}</p>
              )}
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                State
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="state"
                  value={profileData.state}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.state ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900 py-3">{profileData.state}</p>
              )}
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Pincode
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="pincode"
                  value={profileData.pincode}
                  onChange={handleChange}
                  maxLength={6}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.pincode ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-600 focus:outline-none text-lg`}
                />
              ) : (
                <p className="text-lg font-semibold text-gray-900 py-3">{profileData.pincode}</p>
              )}
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Statistics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-600 font-semibold mb-1">Total Orders</p>
            <p className="text-3xl font-black text-blue-600">{orderStats.totalOrders}</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-sm text-gray-600 font-semibold mb-1">Active</p>
            <p className="text-3xl font-black text-green-600">{orderStats.activeOrders}</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 font-semibold mb-1">Completed</p>
            <p className="text-3xl font-black text-gray-600">{orderStats.completedOrders}</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <p className="text-sm text-gray-600 font-semibold mb-1">Total Spent</p>
            <p className="text-2xl font-black text-purple-600">₹{orderStats.totalSpent.toLocaleString()}</p>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <p className="text-sm text-gray-600 font-semibold mb-1">Member Since</p>
            <p className="text-lg font-black text-orange-600">{orderStats.memberSince}</p>
          </div>
        </div>
      </div>

    </div>
  );
}