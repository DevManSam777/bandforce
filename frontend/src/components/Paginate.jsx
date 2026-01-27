import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) return null;

  const getUrl = (pageNum) => {
    if (!isAdmin) {
      return keyword ? `/search/${keyword}/page/${pageNum}` : `/page/${pageNum}`;
    }
    return `/admin/productlist/${pageNum}`;
  };

  return (
    <div className="flex justify-center items-center gap-2 my-8 flex-wrap">
      {/* Previous Button */}
      {page > 1 && (
         <Link
           to={getUrl(page - 1)}
           className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 transition flex items-center gap-1"
         >
          <FaChevronLeft size={14} />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      )}

      {/* Page Numbers */}
      <div className="flex gap-1 flex-wrap justify-center">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={getUrl(x + 1)}
            className={`px-3 py-2 rounded-lg transition font-semibold ${
              x + 1 === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            {x + 1}
          </Link>
        ))}
      </div>

      {/* Next Button */}
      {page < pages && (
         <Link
           to={getUrl(page + 1)}
           className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 transition flex items-center gap-1"
         >
          <span className="hidden sm:inline">Next</span>
          <FaChevronRight size={14} />
        </Link>
      )}
    </div>
  );
};

export default Paginate;
