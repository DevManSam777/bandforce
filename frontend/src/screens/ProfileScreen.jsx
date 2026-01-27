import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile Updated');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* User Profile Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">User Profile</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition mt-6"
          >
            Update Profile
          </button>

          {loadingUpdateProfile && <Loader />}
        </form>
      </div>

      {/* My Orders */}
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">My Orders</h2>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 sm:px-4 py-3 text-left font-semibold text-slate-900 text-xs sm:text-sm">ID</th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left font-semibold text-slate-900">DATE</th>
                  <th className="px-2 sm:px-4 py-3 text-left font-semibold text-slate-900 text-xs sm:text-sm">TOTAL</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left font-semibold text-slate-900">PAID</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left font-semibold text-slate-900">DELIVERED</th>
                  <th className="px-2 sm:px-4 py-3 text-center font-semibold text-slate-900 text-xs sm:text-sm">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-3 text-gray-700 text-xs sm:text-sm truncate">{order._id.substring(0, 8)}...</td>
                    <td className="hidden sm:table-cell px-4 py-3 text-gray-700">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="px-2 sm:px-4 py-3 text-gray-700 text-xs sm:text-sm font-semibold">${order.totalPrice}</td>
                    <td className="hidden md:table-cell px-4 py-3 text-gray-700">
                      {order.isPaid ? (
                        <span className="text-green-600 font-semibold">
                          {order.paidAt.substring(0, 10)}
                        </span>
                      ) : (
                        <FaTimes className="text-red-600" size={16} />
                      )}
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 text-gray-700">
                      {order.isDelivered ? (
                        <span className="text-green-600 font-semibold">
                          {order.deliveredAt.substring(0, 10)}
                        </span>
                      ) : (
                        <FaTimes className="text-red-600" size={16} />
                      )}
                    </td>
                    <td className="px-2 sm:px-4 py-3 text-center">
                      <Link
                        to={`/order/${order._id}`}
                        className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition font-semibold text-xs sm:text-sm whitespace-nowrap"
                      >
                        <FaEdit size={14} />
                        <span className="hidden sm:inline">Details</span>
                        <span className="sm:hidden">View</span>
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
  );
};

export default ProfileScreen;
