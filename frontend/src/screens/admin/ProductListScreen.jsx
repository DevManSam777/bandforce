import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductPositionMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [updatePosition, { isLoading: loadingPosition }] = useUpdateProductPositionMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
        toast.success('Product created');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleMovePosition = async (productId, direction) => {
    try {
      await updatePosition({ productId, direction }).unwrap();
      refetch();
      toast.success(`Product moved ${direction}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Products</h1>
        <button
          onClick={createProductHandler}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition text-sm sm:text-base"
        >
          <FaPlus size={16} />
          <span>Create</span>
        </button>
      </div>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-900 text-xs sm:text-sm">NAME</th>
                  <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-900 text-xs sm:text-sm hidden sm:table-cell">PRICE</th>
                  <th className="px-2 sm:px-4 py-3 text-left font-semibold text-gray-900 text-xs sm:text-sm hidden md:table-cell">CATEGORY</th>
                  <th className="px-2 sm:px-4 py-3 text-center font-semibold text-gray-900 text-xs sm:text-sm">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-3 text-left text-gray-900 text-xs sm:text-sm font-medium">{product.name}</td>
                    <td className="px-2 sm:px-4 py-3 text-right text-gray-600 text-xs sm:text-sm hidden sm:table-cell">${product.price.toFixed(2)}</td>
                    <td className="px-2 sm:px-4 py-3 text-left text-gray-600 text-xs sm:text-sm hidden md:table-cell">
                      {typeof product.category === 'object' ? product.category?.name : product.category || '-'}
                    </td>
                    <td className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-center">
                      <div className="flex gap-0.5 sm:gap-1 md:gap-2 justify-center flex-wrap">
                        <button
                          onClick={() => handleMovePosition(product._id, 'up')}
                          disabled={loadingPosition}
                          className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded transition font-semibold text-xs"
                          title="Move up"
                        >
                          <FaArrowUp size={12} />
                        </button>
                        <button
                          onClick={() => handleMovePosition(product._id, 'down')}
                          disabled={loadingPosition}
                          className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded transition font-semibold text-xs"
                          title="Move down"
                        >
                          <FaArrowDown size={12} />
                        </button>
                        <Link
                          to={`/admin/product/${product._id}/edit`}
                          className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition font-semibold text-xs"
                          title="Edit"
                        >
                          <FaEdit size={12} />
                          <span className="hidden md:inline">Edit</span>
                        </Link>
                        <button
                          onClick={() => deleteHandler(product._id)}
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
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
