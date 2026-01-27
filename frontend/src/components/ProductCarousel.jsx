import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay || !products || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, products]);

  if (isLoading) return null;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!products || products.length === 0) return null;

  const current = products[currentIndex];

  const goToPrevious = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goToSlide = (index) => {
    setIsAutoplay(false);
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full mb-8 md:mb-12 rounded-lg overflow-hidden shadow-lg group animate-fade-in"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Main Carousel Container */}
      <div className="relative bg-gray-100 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[500px] overflow-hidden">
        {/* Image */}
        <img
          src={current.image}
          alt={current.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out transform group-hover:scale-105"
        />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end z-20 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="max-w-2xl animate-slide-in">
            <Link
              to={`/product/${current._id}`}
              className="group/link inline-block mb-2 md:mb-3"
            >
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2 group-hover/link:text-blue-300 transition line-clamp-2">
                {current.name}
              </h2>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    className={
                      i < Math.round(current.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-100 text-xs sm:text-sm">
                ({current.numReviews} reviews)
              </span>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-300">
                ${current.price.toFixed(2)}
              </span>
              <Link
                to={`/product/${current._id}`}
                className="px-4 py-2 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition text-sm md:text-base"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-black p-2 md:p-3 rounded-full transition transform hover:scale-110 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous product"
        >
          <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-black p-2 md:p-3 rounded-full transition transform hover:scale-110 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next product"
        >
          <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Slide Counter */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-30 bg-black/70 text-white px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-bold">
          {currentIndex + 1} / {products.length}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex gap-2 justify-center py-3 md:py-4 px-4 bg-white border-t border-gray-200">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-600 w-6"
                : "bg-gray-400 hover:bg-gray-500 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
