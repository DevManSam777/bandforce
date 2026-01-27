import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { useGetProductsQuery, useGetCategoriesQuery } from '../slices/productsApiSlice';
import { FaArrowLeft } from 'react-icons/fa';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const { data: categories } = useGetCategoriesQuery();

  // Group products by category when not searching
  const groupedProducts = !keyword && categories && data ? 
    [
      ...categories.map(cat => ({
        _id: cat._id,
        name: cat.name,
        description: cat.description,
        products: data.products.filter(p => {
          // Handle both populated category objects and old string categories
          const productCatId = typeof p.category === 'object' ? p.category?._id : p.category;
          return productCatId === cat._id;
        }).sort((a, b) => (a.position || 0) - (b.position || 0))
      })).filter(cat => cat.products.length > 0),
      // Add uncategorized products
      {
        _id: 'uncategorized',
        name: 'Other Products',
        description: 'Products without a category',
        products: data.products.filter(p => !p.category).sort((a, b) => (a.position || 0) - (b.position || 0))
      }
    ].filter(cat => cat.products.length > 0)
    : [];

  return (
    <>
      <Meta title="Welcome to BandForce" description="Shop the best electronics" keywords="electronics, shop" />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-semibold border border-slate-600 hover:border-blue-500/50 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition" /> Back to Shop
          </Link>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-2">
              {keyword ? (
                <>
                  Search Results: <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">"{keyword}"</span>
                </>
              ) : (
                <>Shop by <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Category</span></>
              )}
            </h1>
            <p className="text-gray-700 mt-3">
              {keyword ? `${data.products.length} product${data.products.length !== 1 ? 's' : ''} found` : `${data.products.length} total product${data.products.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Products Grid or Categories */}
          {keyword ? (
            // Search mode - show all products in a grid
            data.products.length === 0 ? (
              <Message>No products found. Try a different search.</Message>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {data.products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {data.pages > 1 && (
                  <Paginate
                    pages={data.pages}
                    page={data.page}
                    keyword={keyword ? keyword : ''}
                  />
                )}
              </>
            )
          ) : (
            // Category mode - show products grouped by category
            groupedProducts.length === 0 ? (
              <Message>No categories found. Create some categories and add products to them.</Message>
            ) : (
              <div className="space-y-12">
                {groupedProducts.map((category) => (
                  <div key={category._id} className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900">{category.name}</h2>
                      {category.description && (
                        <p className="text-gray-600 mt-2">{category.description}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {category.products.map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
