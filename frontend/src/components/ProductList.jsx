// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Loader2, Star, Trash } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";

const ProductList = () => {
  const {
    getProducts,
    isGettingProducts,
    products,
    deleteProduct,
    isDeletingProduct,
    toggleFeatured,
    isTogglingProduct,
  } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
  };

  const handleToggleFeatured = (productId) => {
    toggleFeatured(productId);
  };

  if (isGettingProducts) {
    return (
      <div className='w-full max-w-7xl mx-auto px-4 mt-20 flex items-center justify-center'>
        <Loader2 className='size-16 animate-spin' />
      </div>
    );
  }

  return (
    <motion.div
      className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className='min-w-full divide-y divide-gray-700'>
        <thead className='bg-gray-700'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Product
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Price
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Category
            </th>

            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Featured
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className='bg-gray-800 divide-y divide-gray-700'>
          {products.map((product) => (
            <tr
              key={product.name + product.price}
              className='hover:bg-gray-700'
            >
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0 h-10 w-10'>
                    <img
                      className='size-10 rounded-full object-cover'
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className='ml-4'>
                    <div className='text-sm font-medium text-white'>
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>
                  ${product.price.toFixed(2)}
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>{product.category}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button
                  className={`p-1 rounded-full cursor-pointer ${
                    product.isFeatured
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-600 text-gray-300"
                  } hover:bg-yellow-500 transition-colors duration-200`}
                  onClick={() => handleToggleFeatured(product._id)}
                >
                  {isTogglingProduct ? (
                    <Loader2 className='size-5 animate-spin' />
                  ) : (
                    <Star className='h-5 w-5' />
                  )}
                </button>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button
                  className='text-red-400 hover:text-red-300 cursor-pointer'
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  {isDeletingProduct ? (
                    <Loader2 className='size-5 animate-spin' />
                  ) : (
                    <Trash className='h-5 w-5' />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductList;
