'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.shopName.trim()) newErrors.shopName = 'Shop name is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.phone.trim() && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter valid 10-digit phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Show success message and redirect
      alert('Registration successful! Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <span className="text-3xl font-black text-gray-900">TailorPro</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Register Your Shop</h1>
          <p className="text-xl text-gray-600">Start managing your tailoring business digitally</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Shop Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Shop Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Shop Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Shop Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.shopName ? 'border-red-500' : 'border-gray-200'
                    } focus:border-blue-600 focus:outline-none transition-colors text-lg`}
                    placeholder="Kumar Tailors"
                  />
                  {errors.shopName && <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>}
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.ownerName ? 'border-red-500' : 'border-gray-200'
                    } focus:border-blue-600 focus:outline-none transition-colors text-lg`}
                    placeholder="Rajesh Kumar"
                  />
                  {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    } focus:border-blue-600 focus:outline-none transition-colors text-lg`}
                    placeholder="rajesh@kumartailors.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    } focus:border-blue-600 focus:outline-none transition-colors text-lg`}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Shop Address */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shop Address
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.address ? 'border-red-500' : 'border-gray-200'
                    } focus:border-blue-600 focus:outline-none transition-colors text-lg resize-none`}
                    placeholder="Shop No. 12, MG Road"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.city ? 'border-red-500' : 'border-gray-200'
                      } focus:border-blue-600 focus:outline-none transition-colors text-lg`}
                      placeholder="Mumbai"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.state ? 'border-red-500' : 'border-gray-200'
                      } focus:border-blue-600 focus:outline-none transition-colors text-lg`}
                      placeholder="Maharashtra"
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    } focus:border-blue-600 focus:outline-none transition-colors text-lg`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                    } focus:border-blue-600 focus:outline-none transition-colors text-lg`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Create Account
              </button>
            </div>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}