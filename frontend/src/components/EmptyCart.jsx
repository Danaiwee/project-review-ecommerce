// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <motion.div
      className='flex flex-col items-center justify-center space-y-4 py-16'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ShoppingCart className='h-24 w-24 text-gray-300' />
      <h3 className='text-2xl font-semibold'>Your cart is empty</h3>
      <p className='text-gray-400'>
        Looks like you {"haven't"} added anything to your cart yet
      </p>

      <Link
        to='/'
        className='mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600 font-semibold'
      >
        Start Shopping
      </Link>
    </motion.div>
  );
};

export default EmptyCart;
