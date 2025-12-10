'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  // Dummy data for stats
  const stats = [
    {
      title: 'Total Orders',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Pending Orders',
      value: '8',
      change: '+3',
      changeType: 'increase',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Ready Today',
      value: '5',
      change: '+2',
      changeType: 'increase',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Customers',
      value: '156',
      change: '+8',
      changeType: 'increase',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  // Dummy data for recent orders
  const recentOrders = [
    {
      id: 'ORD-1234',
      customer: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      items: '2 Shirts + 1 Pant',
      amount: '₹2,500',
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-700',
      deadline: '15 Dec 2024',
      assignedTo: 'Ramesh (Tailor)',
    },
    {
      id: 'ORD-1235',
      customer: 'Priya Sharma',
      phone: '+91 98765 43211',
      items: '1 Blouse',
      amount: '₹800',
      status: 'Ready',
      statusColor: 'bg-green-100 text-green-700',
      deadline: '10 Dec 2024',
      assignedTo: 'Suresh (Tailor)',
    },
    {
      id: 'ORD-1236',
      customer: 'Amit Patel',
      phone: '+91 98765 43212',
      items: '3 Shirts',
      amount: '₹3,600',
      status: 'Measuring',
      statusColor: 'bg-blue-100 text-blue-700',
      deadline: '20 Dec 2024',
      assignedTo: 'Not Assigned',
    },
    {
      id: 'ORD-1237',
      customer: 'Sneha Reddy',
      phone: '+91 98765 43213',
      items: '1 Kurta + 1 Pant',
      amount: '₹2,200',
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-700',
      deadline: '18 Dec 2024',
      assignedTo: 'Ramesh (Tailor)',
    },
    {
      id: 'ORD-1238',
      customer: 'Vikram Singh',
      phone: '+91 98765 43214',
      items: '2 Pants',
      amount: '₹1,800',
      status: 'Ready',
      statusColor: 'bg-green-100 text-green-700',
      deadline: '12 Dec 2024',
      assignedTo: 'Suresh (Tailor)',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Monitor your tailoring business at a glance</p>
        </div>
        <Link
          href="/admin/orders/new"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Order
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.textColor}`}>
                {stat.icon}
              </div>
              <span className={`px-3 py-1 ${stat.bgColor} ${stat.textColor} text-sm font-bold rounded-full`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">{stat.title}</h3>
            <p className="text-4xl font-black text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/orders/new"
            className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Create Order</h3>
            <p className="text-sm text-gray-600">Add new customer order</p>
          </Link>

          <Link
            href="/admin/customers/new"
            className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Add Customer</h3>
            <p className="text-sm text-gray-600">Register new customer</p>
          </Link>

          <Link
            href="/admin/orders"
            className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">View Orders</h3>
            <p className="text-sm text-gray-600">See all orders</p>
          </Link>

          <Link
            href="/admin/customers"
            className="group p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">View Customers</h3>
            <p className="text-sm text-gray-600">See customer list</p>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
            <p className="text-sm text-gray-600 mt-1">Latest orders from your shop</p>
          </div>
          <Link
            href="/admin/orders"
            className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Items</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Deadline</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{order.items}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{order.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{order.deadline}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors inline-block"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}