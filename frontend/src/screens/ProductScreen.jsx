import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormInput from '../components/FormInput';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import ProductImageGallery from '../components/ProductImageGallery';
import { useGetProductDetailsQuery, useCreateReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
  const [updateReview, { isLoading: loadingUpdateReview }] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (editingReviewId) {
        await updateReview({
          productId,
          reviewId: editingReviewId,
          rating: editRating,
          comment: editComment,
        }).unwrap();
        toast.success('Review Updated');
        setEditingReviewId(null);
      } else {
        await createReview({ productId, rating, comment }).unwrap();
        toast.success('Review Submitted');
      }
      refetch();
      setRating(0);
      setComment('');
      setEditRating(0);
      setEditComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditRating(0);
    setEditComment('');
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview({ productId, reviewId }).unwrap();
        refetch();
        toast.success('Review deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <>
      <Link
         to="/"
         className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition font-semibold"
       >
        <FaArrowLeft /> Go Back
      </Link>

      <Meta title={product.name} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Product Image Gallery */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
          <ProductImageGallery 
            images={product.images} 
            primaryImage={product.image}
            productName={product.name}
          />
        </div>

        {/* Add to Cart Box */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:order-2 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-slate-900">Price:</span>
                <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-slate-900">Status:</span>
                <span className={product.countInStock > 0 ? 'text-green-600 font-bold text-lg' : 'text-red-600 font-bold text-lg'}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {product.countInStock > 0 && (
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Quantity:</label>
                <select
                   value={qty}
                   onChange={(e) => setQty(Number(e.target.value))}
                   className="w-full px-4 py-2 pr-10 bg-white text-slate-900 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none transition hover:border-gray-400 appearance-none cursor-pointer"
                   style={{backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}
                 >
                   {[...Array(product.countInStock).keys()].map((x) => (
                     <option key={x + 1} value={x + 1}>
                       {x + 1}
                     </option>
                   ))}
                 </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2 space-y-4 lg:order-1 flex flex-col">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>

            <div className="mb-4">
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-2xl font-bold text-blue-400 mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-700 mb-4 break-words">{product.description}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="mb-4">
                <p className="text-sm text-slate-900 font-semibold">Stock Status:</p>
                <p className={`font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 mt-12">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Reviews</h3>

          {product.reviews && product.reviews.length === 0 && (
            <Message>No reviews yet</Message>
          )}

          <div className="space-y-4">
            {product.reviews && [...product.reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-900">{review.name}</p>
                    <Rating value={review.rating} />
                    <p className="text-sm text-gray-500 mt-2">{review.createdAt.substring(0, 10)}</p>
                  </div>
                  {userInfo && (userInfo._id === review.user || userInfo.isAdmin) && (
                    <div className="flex gap-2">
                      {userInfo._id === review.user && (
                        <button
                          onClick={() => handleEditReview(review)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-800 mt-2 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Write/Edit Review */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            {editingReviewId ? 'Edit Review' : 'Write a Review'}
          </h3>

          {userInfo ? (
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Rating:</label>
                <select
                  value={editingReviewId ? editRating : rating}
                  onChange={(e) => editingReviewId ? setEditRating(Number(e.target.value)) : setRating(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-white text-slate-900 border border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none"
                  required
                >
                  <option value="">Select...</option>
                  <option value="1">Poor</option>
                  <option value="2">Fair</option>
                  <option value="3">Good</option>
                  <option value="4">Very Good</option>
                  <option value="5">Excellent</option>
                </select>
              </div>

              <FormInput
                label="Comment"
                type="textarea"
                name="comment"
                value={editingReviewId ? editComment : comment}
                onChange={(e) => editingReviewId ? setEditComment(e.target.value) : setComment(e.target.value)}
                placeholder="Write your review..."
                required
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={editingReviewId ? loadingUpdateReview : loadingProductReview}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
                >
                  {editingReviewId ? 'Update Review' : 'Submit Review'}
                </button>
                {editingReviewId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {(loadingProductReview || loadingUpdateReview) && <Loader />}
            </form>
          ) : (
            <Message>
              Please <Link to="/login" className="text-cyan-600 hover:underline font-semibold">sign in</Link> to write a review
            </Message>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
