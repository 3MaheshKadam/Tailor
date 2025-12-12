'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('admin'); // Default to admin
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setErrors({}); // Clear errors when changing role
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
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

    if (!formData.identifier.trim()) newErrors.identifier = 'Email or Phone is required';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
          role: selectedRole,
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token (assuming you use localStorage for simplicity)
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      alert('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        if (selectedRole === 'admin') {
          router.push('/admin/dashboard');
        } else if (selectedRole === 'tailor') {
          router.push('/tailor/dashboard');
        }
      }, 500);
    } catch (err: any) {
      setErrors({ ...errors, general: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Enhanced Background decoration with more elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-spin-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Role Selection and Description */}
        <div className="md:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-black text-gray-900">TailorPro</span>
            </Link>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-lg text-gray-600">Select your role to login</p>
          </div>

          {/* Role Buttons - Stacked vertically */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleRoleSelect('tailor')}
              className={`w-full py-4 px-6 rounded-xl transition-all duration-300 ${
                selectedRole === 'tailor'
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-gray-200 hover:border-indigo-600 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold">Tailor / Worker</span>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect('admin')}
              className={`w-full py-4 px-6 rounded-xl transition-all duration-300 ${
                selectedRole === 'admin'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-600 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-bold">Admin / Shop Owner</span>
              </div>
            </button>
          </div>

          {/* Role Description */}
          <div className="bg-white rounded-xl p-6 shadow-inner">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {selectedRole === 'admin' ? 'Admin Features' : 'Tailor Features'}
            </h3>
            <ul className="space-y-2 text-gray-600">
              {selectedRole === 'admin' ? (
                <>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Manage customers and orders
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Assign tasks to tailors
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    View analytics and reports
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    View assigned orders
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update order status
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Communicate with admin
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-8 lg:p-12 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">
            Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </h2>
          
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
              {errors.general}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identifier */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email or Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 text-gray-900 ${
                  errors.identifier ? 'border-red-500' : 'border-gray-200'
                } focus:border-blue-600 focus:outline-none transition-colors text-lg shadow-sm`}
                placeholder="Enter email or phone"
              />
              {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 text-gray-900 ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                } focus:border-blue-600 focus:outline-none transition-colors text-lg shadow-sm`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8 0-.318.019-.635.056-.947M12 5c4.418 0 8 3.582 8 8 0 .318-.019.635-.056.947m-1.819 3.928A10.05 10.05 0 0012 21c-2.645 0-5.053-1.021-6.875-2.825M4.1 13.9A9.984 9.984 0 013 11c0-4.418 3.582-8 8-8 .927 0 1.82.133 2.675.38M20.9 10.1A9.984 9.984 0 0121 13c0 4.418-3.582 8-8 8-.927 0-1.82-.133-2.675-.38M9 11a3 3 0 016 0" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l16 16" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline">
                Register your shop
              </Link>
            </p>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}