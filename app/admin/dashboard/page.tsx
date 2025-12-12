'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Order {
  _id: string;
  customerName?: string;
  customerId?: string;
  customerPhone?: string;
  copies?: {
    admin?: {
      customer?: {
        name?: string;
        phone?: string;
      };
    };
  };
  garmentType: string;
  billing: {
    amount: number;
  };
  status: string;
  deadline: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState([
    {
      title: 'Total Orders',
      value: '0',
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
      value: '0',
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
      value: '0',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
  ]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token
        window.location.href = '/auth/login';
        return;
      }

      try {
        const response = await fetch('/api/orders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data.orders);

        // Compute stats
        const today = new Date(2025, 11, 12); // December 12, 2025

        const parseDeadline = (dateStr: string) => {
          return new Date(dateStr);
        };

        const orderList = data.orders;
        const totalOrders = orderList.length;
        const pendingOrders = orderList.filter(o => ['measuring', 'tailoring'].includes(o.status)).length;
        const readyToday = orderList.filter(o => 
          o.status === 'ready' && 
          parseDeadline(o.deadline).toDateString() === today.toDateString()
        ).length;

        setStats([
          { ...stats[0], value: totalOrders.toString() },
          { ...stats[1], value: pendingOrders.toString() },
          { ...stats[2], value: readyToday.toString() },
        ]);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error, perhaps show message
      }
    };

    fetchOrders();
  }, []);

  const recentOrders = orders.slice(-5).reverse(); // Last 5 recent orders

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'measuring':
        return 'bg-blue-100 text-blue-700';
      case 'tailoring':
        return 'bg-yellow-100 text-yellow-700';
      case 'ready':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.textColor}`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold mb-1">{stat.title}</h3>
            <p className="text-4xl font-black text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Garment Type</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Deadline</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{order._id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.customerName || (order.copies?.admin?.customer?.name || `Customer ID: ${order.customerId}`)}</p>
                      <p className="text-sm text-gray-500">{order.customerPhone || (order.copies?.admin?.customer?.phone || 'N/A')}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{order.garmentType}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">₹{order.billing.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{new Date(order.deadline).toLocaleDateString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order._id}`}
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