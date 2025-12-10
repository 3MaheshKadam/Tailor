'use client';

export default function TailorHeader() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
      
      {/* Left - Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Ramesh!</h1>
        <p className="text-sm text-gray-500">Manage your assigned orders</p>
      </div>

      {/* Right - Stats */}
      <div className="flex items-center gap-4">
        
        {/* Pending Orders */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-xl border border-yellow-200">
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs text-yellow-600 font-semibold">Pending</p>
            <p className="text-lg font-black text-yellow-700">5</p>
          </div>
        </div>

        {/* In Progress */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-200">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div>
            <p className="text-xs text-blue-600 font-semibold">In Progress</p>
            <p className="text-lg font-black text-blue-700">3</p>
          </div>
        </div>

        {/* Profile Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
          R
        </div>

      </div>
    </header>
  );
}