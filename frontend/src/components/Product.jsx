import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className="group h-full bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 border border-gray-200">
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="block overflow-hidden bg-gray-100 h-64 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <Link to={`/product/${product._id}`} className="block group/title mb-2">
          <h3 className="font-semibold text-base text-gray-900 group-hover/title:text-blue-600 transition line-clamp-2 min-h-[2.5em]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-3">
          <Rating value={product.rating} text={`${product.numReviews}`} />
        </div>

        {/* Price and Stock Status */}
        <div className="space-y-2 mb-4">
          <div className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>
          {product.countInStock > 0 ? (
            <span className="inline-block text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="inline-block text-xs font-semibold px-2 py-1 bg-red-100 text-red-800 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to={`/product/${product._id}`}
          className="w-full block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition text-center text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Product;
