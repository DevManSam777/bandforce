import { Link } from 'react-router-dom';
import { FaTrash, FaTimes, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-900 text-xs sm:text-sm">NAME</th>
                <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-900 text-xs sm:text-sm hidden sm:table-cell">EMAIL</th>
                <th className="px-2 sm:px-4 py-3 text-center font-semibold text-gray-900 text-xs sm:text-sm">ADMIN</th>
                <th className="px-2 sm:px-4 py-3 text-center font-semibold text-gray-900 text-xs sm:text-sm">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-3 text-left text-gray-900 text-xs sm:text-sm font-medium">{user.name}</td>
                  <td className="px-2 sm:px-4 py-3 text-left text-gray-600 text-xs sm:text-sm hidden sm:table-cell">
                    <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline break-all">
                      {user.email}
                    </a>
                  </td>
                  <td className="px-2 sm:px-4 py-3 text-gray-700 text-center">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-600 mx-auto" size={16} />
                    ) : (
                      <FaTimes className="text-red-600 mx-auto" size={16} />
                    )}
                  </td>
                  <td className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-center">
                    <div className="flex gap-0.5 sm:gap-1 md:gap-2 justify-center">
                      <Link
                        to={`/admin/user/${user._id}/orders`}
                        className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-600 hover:bg-green-700 text-white rounded transition font-semibold text-xs"
                        title="View Orders"
                      >
                        <span className="hidden md:inline">Orders</span>
                        <span className="md:hidden">📋</span>
                      </Link>
                      <Link
                        to={`/admin/user/${user._id}/edit`}
                        className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition font-semibold text-xs"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                        <span className="hidden md:inline">Edit</span>
                      </Link>
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-600 hover:bg-red-700 text-white rounded transition font-semibold text-xs"
                        title="Delete"
                      >
                        <FaTrash size={12} />
                        <span className="hidden md:inline">Delete</span>
                      </button>
                    </div>
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

export default UserListScreen;
