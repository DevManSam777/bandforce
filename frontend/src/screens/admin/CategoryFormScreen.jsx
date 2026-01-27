import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetCategoryDetailsQuery, useCreateCategoryMutation, useUpdateCategoryMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const CategoryFormScreen = () => {
  const { id: categoryId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { data: category, isLoading, error } = useGetCategoryDetailsQuery(categoryId, {
    skip: !categoryId,
  });

  const [createCategory, { isLoading: loadingCreate }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: loadingUpdate }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (categoryId) {
        await updateCategory({ _id: categoryId, name, description }).unwrap();
        toast.success('Category updated');
      } else {
        await createCategory({ name, description }).unwrap();
        toast.success('Category created');
      }
      navigate('/admin/categorylist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (categoryId && isLoading) return <Loader />;
  if (categoryId && error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <>
      <Link
        to="/admin/categorylist"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition font-semibold"
      >
        <FaArrowLeft /> Go Back
      </Link>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-slate-900">
          {categoryId ? 'Edit Category' : 'Add Category'}
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <FormInput
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            required
          />

          <FormInput
            label="Description"
            type="textarea"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter category description"
          />

          <button
            type="submit"
            disabled={loadingCreate || loadingUpdate}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            {categoryId ? 'Update Category' : 'Create Category'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CategoryFormScreen;
