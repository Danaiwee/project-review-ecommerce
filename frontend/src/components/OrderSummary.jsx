// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { usePaymentStore } from "../stores/usePaymentStore";

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const { proceedPayment } = usePaymentStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);
  
  const handleCheckout = () => {
    const products = cart;
    const couponCode = coupon?.code || null;

    proceedPayment(products, couponCode);
  };

  return (
    <motion.div
      className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className='text-xl font-semibold text-emerald-400'>Order Summary</p>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <dl className='flex items-center justify-between gap-4'>
            <dt className='text-base font-normal text-gray-300'>
              Original price
            </dt>
            <dd className='text-base font-medium text-merald-400'>
              ${formattedSubtotal}
            </dd>
          </dl>

          {/* {savings && ( */}
          <dl className='flex items-center justify-between gap-4'>
            <dt className='text-base font-normal text-gray-300'>Savings</dt>
            <dd className='text-base font-medium text-emerald-400'>
              -${formattedSavings}
            </dd>
          </dl>
          {/* )} */}

          {coupon && isCouponApplied && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-300'>
                Coupon
                <span className='text-xs text-emerald-400 ml-2'>
                  ({coupon.code})
                </span>
              </dt>
              <dd className='text-base font-medium text-emerald-400'>
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}

          <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
            <dt className='text-base font-bold text-white'>Total</dt>
            <dd className='text-base font-bold text-emerald-400'>
              ${formattedTotal}
            </dd>
          </dl>
        </div>

        <button
          className='flex w-full items-center justify-center rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer'
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>

        <div className='flex items-center justify-center gap-2'>
          <span className='text-sm font-normal text-gray-400'>or</span>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
