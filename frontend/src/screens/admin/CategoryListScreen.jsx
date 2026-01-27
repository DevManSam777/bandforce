import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetCategoriesQuery, useDeleteCategoryMutation, useUpdateCategoryPositionMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const CategoryListScreen = () => {
  const { data: categories, isLoading, error, refetch } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: loadingDelete }] = useDeleteCategoryMutation();
  const [updatePosition, { isLoading: loadingPosition }] = useUpdateCategoryPositionMutation();

  const handleDelete = async (id, categoryName) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}"? Any products in this category will have their category removed.`)) {
      try {
        const result = await deleteCategory(id).unwrap();
        refetch();
        const updatedCount = result.productsUpdated || 0;
        if (updatedCount > 0) {
          toast.success(`Category deleted. ${updatedCount} product(s) uncategorized.`);
        } else {
          toast.success('Category deleted');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleMovePosition = async (categoryId, direction) => {
    try {
      await updatePosition({ categoryId, direction }).unwrap();
      refetch();
      toast.success(`Category moved ${direction}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
        <Link
          to="/admin/category/new"
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          <FaPlus /> Add Category
        </Link>
      </div>

      {categories && categories.length === 0 ? (
        <Message>No categories found</Message>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-gray-900 font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-gray-900 font-semibold">Description</th>
                <th className="px-4 py-3 text-center text-gray-900 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories?.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{category.name}</td>
                  <td className="px-4 py-3 text-gray-600">{category.description || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={() => handleMovePosition(category._id, 'up')}
                        disabled={loadingPosition}
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm transition"
                        title="Move up"
                      >
                        <FaArrowUp />
                      </button>
                      <button
                        onClick={() => handleMovePosition(category._id, 'down')}
                        disabled={loadingPosition}
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm transition"
                        title="Move down"
                      >
                        <FaArrowDown />
                      </button>
                      <Link
                        to={`/admin/category/${category._id}`}
                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(category._id, category.name)}
                        disabled={loadingDelete}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm transition"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryListScreen;
