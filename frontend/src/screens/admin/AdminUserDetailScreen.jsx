import { Link, useParams } from 'react-router-dom';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUserDetailsQuery } from '../../slices/usersApiSlice';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const AdminUserDetailScreen = () => {
  const { id: userId } = useParams();
  const { data: user, isLoading: userLoading, error: userError } = useGetUserDetailsQuery(userId);
  const { data: allOrders, isLoading: ordersLoading, error: ordersError } = useGetOrdersQuery();

  const userOrders = allOrders?.filter((order) => order.user._id === userId) || [];

  const isLoading = userLoading || ordersLoading;
  const error = userError || ordersError;

  return (
    <>
      <Link
        to="/admin/userlist"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg transition font-semibold"
      >
        <FaArrowLeft /> Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="space-y-6">
          {/* User Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">{user?.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Email</h3>
                <p className="text-base text-slate-900 break-all">{user?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Admin Status</h3>
                <p className="text-base text-slate-900">
                  {user?.isAdmin ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <span className="text-gray-600">User</span>
                  )}
                </p>
              </div>

              {/* Get shipping address from latest order if available */}
              {userOrders.length > 0 && userOrders[0].shippingAddress && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Shipping Address (from latest order)</h3>
                  <p className="text-base text-slate-900">
                    {userOrders[0].shippingAddress.address}
                    {userOrders[0].shippingAddress.city && `, ${userOrders[0].shippingAddress.city}`}
                    {userOrders[0].shippingAddress.postalCode && ` ${userOrders[0].shippingAddress.postalCode}`}
                    {userOrders[0].shippingAddress.country && `, ${userOrders[0].shippingAddress.country}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Orders ({userOrders.length})</h2>

            {userOrders.length === 0 ? (
              <Message>No orders yet</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 text-xs sm:text-sm">
                        ORDER ID
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 text-xs sm:text-sm hidden sm:table-cell">
                        DATE
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-900 text-xs sm:text-sm">
                        TOTAL
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900 text-xs sm:text-sm">
                        PAID
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900 text-xs sm:text-sm hidden sm:table-cell">
                        DELIVERED
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900 text-xs sm:text-sm">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-left text-gray-900 text-xs sm:text-sm font-medium">
                          <Link to={`/order/${order._id}`} className="text-blue-600 hover:text-blue-800 hover:underline break-all">
                            {order._id}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-left text-gray-600 text-xs sm:text-sm hidden sm:table-cell">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-900 text-xs sm:text-sm font-medium">
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {order.isPaid ? (
                            <span className="text-green-600 font-semibold text-xs sm:text-sm">
                              {order.paidAt.substring(0, 10)}
                            </span>
                          ) : (
                            <FaTimes className="text-red-600 mx-auto" size={16} />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center hidden sm:table-cell">
                          {order.isDelivered ? (
                            <span className="text-green-600 font-semibold text-xs sm:text-sm">
                              {order.deliveredAt.substring(0, 10)}
                            </span>
                          ) : (
                            <FaTimes className="text-red-600 mx-auto" size={16} />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Link
                            to={`/order/${order._id}`}
                            className="inline-block px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded transition font-semibold text-xs"
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
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUserDetailScreen;
