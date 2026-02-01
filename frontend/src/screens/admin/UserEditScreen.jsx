import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import FormInput from '../../components/FormInput';
import { toast } from 'react-toastify';
import { useUpdateUserMutation, useGetUserDetailsQuery } from '../../slices/usersApiSlice';

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Link to="/admin/userlist" className="text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-2">
          <FaArrowLeft /> Back
        </Link>
      </div>

      <FormContainer>
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-slate-900">Edit User</h1>

          {loadingUpdate && <Loader />}

          <form onSubmit={submitHandler} className="space-y-6">
            <FormInput
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />

            <FormInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />

            <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-slate-700 font-semibold">Is Admin</span>
            </label>

            <button
              type="submit"
              disabled={loadingUpdate}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition mt-6"
            >
              Update User
            </button>
          </form>
        </div>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
