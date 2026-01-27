import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter and sort orders
  const filteredOrders = orders
    ?.filter((order) => {
      // Status filter
      if (statusFilter === 'paid') return order.isPaid;
      if (statusFilter === 'unpaid') return !order.isPaid;
      if (statusFilter === 'delivered') return order.isDelivered;
      if (statusFilter === 'undelivered') return !order.isDelivered;
      return true;
    })
    .filter((order) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      return (
        (order.user?.name && order.user.name.toLowerCase().includes(searchLower)) ||
        (order.user?.email && order.user.email.toLowerCase().includes(searchLower)) ||
        (order._id && order._id.toLowerCase().includes(searchLower))
      );
    })
    .filter((order) => {
      // Date filter
      const orderDate = new Date(order.createdAt);
      const today = new Date();

      if (dateFilter === 'all') return true;
      
      if (dateFilter === '7days') {
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= sevenDaysAgo;
      }
      
      if (dateFilter === '30days') {
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return orderDate >= thirtyDaysAgo;
      }
      
      if (dateFilter === 'custom') {
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          end.setHours(23, 59, 59);
          return orderDate >= start && orderDate <= end;
        }
        return true;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sorting
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'total-desc':
          return b.totalPrice - a.totalPrice;
        case 'total-asc':
          return a.totalPrice - b.totalPrice;
        default:
          return 0;
      }
    }) || [];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Orders</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Name/Email/ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="delivered">Delivered</option>
                <option value="undelivered">Not Delivered</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="date-desc">Newest</option>
                <option value="date-asc">Oldest</option>
                <option value="total-desc">Highest Total</option>
                <option value="total-asc">Lowest Total</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  if (e.target.value !== 'custom') {
                    setStartDate('');
                    setEndDate('');
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="all">All</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          {/* Custom Date Range */}
          {dateFilter === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          )}

          {/* Reset and Results */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setSortBy('date-desc');
                setDateFilter('all');
                setStartDate('');
                setEndDate('');
              }}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition font-semibold text-sm"
            >
              Reset Filters
            </button>
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredOrders.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{orders?.length || 0}</span> orders
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : filteredOrders.length === 0 ? (
        <Message>No orders found</Message>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-900 text-xs sm:text-sm">USER</th>
                <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-900 text-xs sm:text-sm hidden sm:table-cell">DATE</th>
                <th className="px-2 sm:px-4 py-3 text-right font-semibold text-gray-900 text-xs sm:text-sm">TOTAL</th>
                <th className="px-2 sm:px-4 py-3 text-center font-semibold text-gray-900 text-xs sm:text-sm">PAID</th>
                <th className="px-2 sm:px-4 py-3 text-center font-semibold text-gray-900 text-xs sm:text-sm hidden sm:table-cell">
                  DELIVERED
                </th>
                <th className="px-2 sm:px-4 py-3 text-center font-semibold text-gray-900 text-xs sm:text-sm">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
               {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-3 text-left text-gray-900 text-xs sm:text-sm font-medium">
                     {order.user && order.user.name}
                   </td>
                  <td className="px-2 sm:px-4 py-3 text-left text-gray-600 text-xs sm:text-sm hidden sm:table-cell">
                     {order.createdAt.substring(0, 10)}
                   </td>
                  <td className="px-2 sm:px-4 py-3 text-right text-gray-900 text-xs sm:text-sm font-medium">${order.totalPrice}</td>
                  <td className="px-2 sm:px-4 py-3 text-center">
                    {order.isPaid ? (
                      <span className="text-green-600 font-semibold text-xs sm:text-sm">
                        {order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <FaTimes className="text-red-600 mx-auto" size={16} />
                    )}
                  </td>
                  <td className="px-2 sm:px-4 py-3 text-center hidden sm:table-cell">
                    {order.isDelivered ? (
                      <span className="text-green-600 font-semibold text-xs sm:text-sm">
                        {order.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <FaTimes className="text-red-600 mx-auto" size={16} />
                    )}
                  </td>
                  <td className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-center">
                    <Link
                      to={`/order/${order._id}`}
                      className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded transition font-semibold text-xs"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderListScreen;
