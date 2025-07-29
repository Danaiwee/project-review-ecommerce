import { useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className='py-12'>
      <div className='container mx-auto px-4'>
        <h2 className='text-xl sm:text-5xl font-bold text-emerald-400 mb-4'>
          Featured Products
        </h2>

        <div className='relative'>
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {featuredProducts &&
                featuredProducts.map((product) => (
                  <ProductsCard key={product.name} product={product} />
                ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              isStartDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
          >
            <ChevronLeft className='w-6 h-6' />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              isEndDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
          >
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
