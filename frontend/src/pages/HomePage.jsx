import { CATEGORIES } from "../constants";

import CategoryItem from "../components/CategoryItem";

const HomePage = () => {
  return (
    <main className='relative min-h-screen text-white overflow-hidden mt-20'>
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <h1 className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-4'>
          Explore Our Categories
        </h1>
        <p className='text-center text-lg text-gray-300 mb-12'>
          Discover the latest trends in eco-freindly fashion
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {CATEGORIES.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
