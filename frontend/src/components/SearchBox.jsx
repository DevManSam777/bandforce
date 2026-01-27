import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [showResults, setShowResults] = useState(false);
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const { data: searchResults } = useGetProductsQuery(
    { keyword: debouncedKeyword, pageNumber: 1 },
    { skip: !debouncedKeyword || debouncedKeyword.length < 2 }
  );
  const dropdownRef = useRef(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword.trim().length >= 2) {
        setDebouncedKeyword(keyword.trim());
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
      setShowResults(false);
    } else {
      navigate('/');
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setKeyword('');
    setShowResults(false);
  };

  const handleSearchClick = (searchKeyword) => {
    navigate(`/search/${searchKeyword}`);
    setKeyword('');
    setShowResults(false);
  };

  const displayedResults = searchResults?.products?.slice(0, 5) || [];

  return (
    <form onSubmit={submitHandler} className="flex gap-2 w-full relative">
      <div className="relative flex-1" ref={dropdownRef}>
        <input
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          onFocus={() => keyword.trim().length >= 2 && setShowResults(true)}
          placeholder="Search Products..."
          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:outline-none transition"
        />

        {/* Live Search Results Dropdown */}
        {showResults && debouncedKeyword && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            {displayedResults.length > 0 ? (
              <>
                <div className="p-2 space-y-1">
                  {displayedResults.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => handleResultClick(product._id)}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded flex items-center gap-3 transition"
                    >
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          ${product.price?.toFixed(2)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {searchResults?.products?.length > 5 && (
                  <button
                    type="button"
                    onClick={() => handleSearchClick(debouncedKeyword)}
                    className="w-full px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 border-t border-gray-200 font-semibold transition"
                  >
                    View all results for "{debouncedKeyword}"
                  </button>
                )}
              </>
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No products found for "{debouncedKeyword}"
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition flex items-center gap-2 whitespace-nowrap"
      >
        <FaSearch size={16} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
};

export default SearchBox;
