// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { JEANS_PRODUCTS } from "../constants";
import ProductsCard from "../components/ProductsCard";

const CategoryPage = () => {
  const { category } = useParams();
  const products = [1];

  return (
    <div className='min-h-screen pt-20'>
      <div className='relative z-10 max-w-screen mx-auto px-3 sm:px-6 lg:px-8 py-16'>
        <motion.h1
          className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8 capitalize'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category}
        </motion.h1>

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {products?.length === 0 && (
            <h2 className='mt-10 text-3xl font-semibold text-gray-300 text-center col-span-full'>
              No products found
            </h2>
          )}

          {JEANS_PRODUCTS.map((product) => (
            <ProductsCard key={product.name} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
