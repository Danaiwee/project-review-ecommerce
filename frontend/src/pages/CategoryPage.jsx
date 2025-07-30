// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore.js";

import ProductsCard from "../components/ProductsCard";
import NotFoundProduct from "../components/NotFoundProduct.jsx";
import { useEffect } from "react";
import LoadingState from "../components/LoadingState.jsx";

const CategoryPage = () => {
  const { category } = useParams();

  const { products, getProductsByCategory, isGettingProducts } =
    useProductStore();

  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory, category]);

  if (isGettingProducts) return <LoadingState />;

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
          {products.map((product) => (
            <ProductsCard key={product.name} product={product} />
          ))}
        </motion.div>

        {products?.length === 0 && <NotFoundProduct />}
      </div>
    </div>
  );
};

export default CategoryPage;
