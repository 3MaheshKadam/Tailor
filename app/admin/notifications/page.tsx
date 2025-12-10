'use client';

import { useState } from 'react';

export default function NotificationsPage() {
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });

  // Dummy notifications data
  const allNotifications = [
    {
      id: 'NOT-001',
      type: 'Order Confirmation',
      customer: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      orderId: 'ORD-1234',
      message: 'Order confirmed! Your order #ORD-1234 for 2 Shirts + 1 Pant has been received. Total: ₹3,500. Deadline: 15 Dec 2024.',
      status: 'Sent',
      timestamp: '10 Dec 2024 10:30 AM',
      deliveryStatus: 'Delivered',
    },
    {
      id: 'NOT-002',
      type: 'Status Update',
      customer: 'Priya Sharma',
      phone: '+91 98765 43211',
      orderId: 'ORD-1235',
      message: 'Status Update: Your order #ORD-1235 is now In Progress. Our tailor is working on it.',
      status: 'Sent',
      timestamp: '10 Dec 2024 09:15 AM',
      deliveryStatus: 'Delivered',
    },
    {
      id: 'NOT-003',
      type: 'Ready Notification',
      customer: 'Amit Patel',
      phone: '+91 98765 43212',
      orderId: 'ORD-1236',
      message: 'Great news! Your order #ORD-1236 is ready for pickup. Visit us at Shop No. 12, MG Road.',
      status: 'Sent',
      timestamp: '10 Dec 2024 08:00 AM',
      deliveryStatus: 'Delivered',
    },
    {
      id: 'NOT-004',
      type: 'Deadline Reminder',
      customer: 'Sneha Reddy',
      phone: '+91 98765 43213',
      orderId: 'ORD-1237',
      message: 'Reminder: Your order #ORD-1237 will be ready by 12 Dec 2024. You can pick it up anytime!',
      status: 'Sent',
      timestamp: '9 Dec 2024 06:00 PM',
      deliveryStatus: 'Delivered',
    },
    {
      id: 'NOT-005',
      type: 'Order Confirmation',
      customer: 'Vikram Singh',
      phone: '+91 98765 43214',
      orderId: 'ORD-1238',
      message: 'Order confirmed! Your order #ORD-1238 for 2 Pants has been received. Total: ₹1,800. Deadline: 12 Dec 2024.',
      status: 'Failed',
      timestamp: '9 Dec 2024 03:45 PM',
      deliveryStatus: 'Failed',
      errorReason: 'Invalid phone number',
    },
    {
      id: 'NOT-006',
      type: 'Status Update',
      customer: 'Anita Desai',
      phone: '+91 98765 43215',
      orderId: 'ORD-1239',
      message: 'Status Update: Your order #ORD-1239 measurements have been taken. Work will start soon!',
      status: 'Pending',
      timestamp: '9 Dec 2024 02:00 PM',
      deliveryStatus: 'Pending',
    },
    {
      id: 'NOT-007',
      type: 'Ready Notification',
      customer: 'Rahul Mehta',
      phone: '+91 98765 43216',
      orderId: 'ORD-1240',
      message: 'Great news! Your order #ORD-1240 is ready for pickup. Visit us at Shop No. 12, MG Road.',
      status: 'Sent',
      timestamp: '8 Dec 2024 05:30 PM',
      deliveryStatus: 'Delivered',
    },
    {
      id: 'NOT-008',
      type: 'Deadline Reminder',
      customer: 'Kavita Iyer',
      phone: '+91 98765 43217',
      orderId: 'ORD-1241',
      message: 'Reminder: Your order #ORD-1241 will be ready by 10 Dec 2024. You can pick it up anytime!',
      status: 'Sent',
      timestamp: '8 Dec 2024 11:00 AM',
      deliveryStatus: 'Delivered',
    },
  ];

  // Filter notifications
  const filteredNotifications = allNotifications.filter(notif => {
    const matchesType = filterType === 'all' || notif.type === filterType;
    const matchesStatus = filterStatus === 'all' || notif.status === filterStatus;
    const matchesSearch = 
      notif.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.phone.includes(searchQuery);
    
    return matchesType && matchesStatus && matchesSearch;
  });

  // Stats
  const stats = {
    total: allNotifications.length,
    sent: allNotifications.filter(n => n.status === 'Sent').length,
    failed: allNotifications.filter(n => n.status === 'Failed').length,
    pending: allNotifications.filter(n => n.status === 'Pending').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Order Confirmation':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Status Update':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'Ready Notification':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'Deadline Reminder':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
    }
  };

  const handleResend = (notificationId: string) => {
    alert(`Resending notification ${notificationId}...`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">WhatsApp Notifications</h1>
        <p className="text-gray-600 mt-1">Track all automated messages sent to customers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total Sent</p>
              <p className="text-3xl font-black text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Delivered</p>
              <p className="text-3xl font-black text-green-600">{stats.sent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Failed</p>
              <p className="text-3xl font-black text-red-600">{stats.failed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">Pending</p>
              <p className="text-3xl font-black text-yellow-600">{stats.pending}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="space-y-4">
          
          {/* Search Bar */}
          <div>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by customer name, order ID, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none text-lg"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Filter by Type</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setFilterType('Order Confirmation')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  filterType === 'Order Confirmation'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Order Confirmation
              </button>
              <button
                onClick={() => setFilterType('Status Update')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  filterType === 'Status Update'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Status Update
              </button>
              <button
                onClick={() => setFilterType('Ready Notification')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  filterType === 'Ready Notification'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Ready Notification
              </button>
              <button
                onClick={() => setFilterType('Deadline Reminder')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  filterType === 'Deadline Reminder'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Deadline Reminder
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Filter by Status</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => setFilterStatus('Sent')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filterStatus === 'Sent'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sent
              </button>
              <button
                onClick={() => setFilterStatus('Failed')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filterStatus === 'Failed'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Failed
              </button>
              <button
                onClick={() => setFilterStatus('Pending')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filterStatus === 'Pending'
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 pt-2 border-t border-gray-200">
            Showing <span className="font-bold text-gray-900">{filteredNotifications.length}</span> of{' '}
            <span className="font-bold text-gray-900">{allNotifications.length}</span> notifications
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all p-6"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600">
                  {getTypeIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{notif.type}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(notif.status)}`}>
                          {notif.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {notif.customer} • {notif.phone} • Order: {notif.orderId}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{notif.timestamp}</p>
                  </div>

                  {/* Message */}
                  <div className="p-4 bg-gray-50 rounded-xl mb-3">
                    <p className="text-gray-700 leading-relaxed">{notif.message}</p>
                  </div>

                  {/* Error Message */}
                  {notif.status === 'Failed' && notif.errorReason && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-700 font-semibold">Error: {notif.errorReason}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {notif.status === 'Failed' && (
                      <button
                        onClick={() => handleResend(notif.id)}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Resend
                      </button>
                    )}
                    <button className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors text-sm">
                      View Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
              setFilterStatus('all');
            }}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredNotifications.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200">
          <button className="px-4 py-2 text-gray-400 font-semibold rounded-lg cursor-not-allowed" disabled>
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-blue-600 text-white font-bold rounded-lg">1</button>
            <button className="w-10 h-10 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg">2</button>
            <button className="w-10 h-10 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg">3</button>
          </div>
          <button className="px-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors">
            Next
          </button>
        </div>
      )}

    </div>
  );
}