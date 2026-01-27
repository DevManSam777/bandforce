import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const ProductImageGallery = ({ images = [], primaryImage, productName }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use images array if available, otherwise create array from primary image
  const allImages = images && images.length > 0 
    ? images 
    : primaryImage 
    ? [{ url: primaryImage, alt: productName }]
    : [];

  if (allImages.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  const mainImage = allImages[mainImageIndex];

  const goToPrevious = () => {
    setMainImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToNext = () => {
    setMainImageIndex((prev) => (prev + 1) % allImages.length);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden group cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <img
            src={mainImage.url}
            alt={mainImage.alt}
            className="w-full h-96 object-cover hover:opacity-90 transition"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20">
            <p className="text-white text-sm font-semibold bg-black/60 px-4 py-2 rounded">Click to enlarge</p>
          </div>
        
        {allImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full transition shadow-lg opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full transition shadow-lg opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <FaChevronRight size={20} />
            </button>
            
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {mainImageIndex + 1} / {allImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="bg-white rounded-lg p-2 border border-gray-200">
          <p className="text-xs text-gray-600 mb-2 font-semibold">Click thumbnail to view</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {allImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImageIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition hover:border-blue-400 ${
                  index === mainImageIndex
                    ? 'border-blue-600 ring-2 ring-blue-400'
                    : 'border-gray-300'
                }`}
                title={`Image ${index + 1}`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="relative bg-black rounded-lg max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition z-10"
              aria-label="Close modal"
            >
              <FaTimes size={24} />
            </button>

            {/* Main Image in Modal */}
            <div className="relative">
              <img
                src={mainImage.url}
                alt={mainImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Navigation Buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft size={24} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition"
                    aria-label="Next image"
                  >
                    <FaChevronRight size={24} />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {mainImageIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip in Modal */}
            {allImages.length > 1 && (
              <div className="bg-black/40 px-4 py-4 flex gap-2 overflow-x-auto">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      index === mainImageIndex
                        ? 'border-blue-400'
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;
