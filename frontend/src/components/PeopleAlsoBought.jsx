import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

import LoadingState from "./LoadingState";
import ProductCard from "./ProductsCard";

const PeopleAlsoBought = () => {
  const { getRecommendedProducts, isGettingProducts, products } =
    useProductStore();

  useEffect(() => {
    getRecommendedProducts();
  }, [getRecommendedProducts]);

  if (isGettingProducts) return <LoadingState />;
  return (
    <div className='mt-8'>
      <h3 className='text-2xl font-semibold text-emerald-400'>
        People also bought
      </h3>
      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.name + product.price} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
