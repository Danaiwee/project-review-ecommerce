// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const CouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");

  const {
    coupon,
    isCouponApplied,
    applyCoupon,
    isApplyingCoupon,
    removeCoupon,
    availableCoupon,
  } = useCartStore();

  const handleApplyCoupon = () => {
    const applyCode = userInputCode.toUpperCase();

    applyCoupon(applyCode);
    setUserInputCode("");
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
  };
  return (
    <motion.div
      className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className='space-y-4'>
        <div>
          <label
            htmlFor='vouvher'
            className='mb-2 block text-sm font-medium text-emerald-300'
          >
            Do you have a voucher or gift card?
          </label>
          <input
            type='text'
            id='voucher'
            className='block w-full rounded-lg border border-gray-600 bg-gray-700 
            p-2.5 text-sm text-white placeholder-gray-400 focus:border-emerald-500 
            focus:ring-emerald-500'
            placeholder='Enter code here'
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            required
          />
        </div>

        <button
          type='button'
          className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer'
          onClick={handleApplyCoupon}
        >
          {isApplyingCoupon ? (
            <Loader2 className='size-5 animate-spin' />
          ) : (
            <>Apply Code</>
          )}
        </button>
      </div>

      {isCouponApplied && coupon && (
        <div className='mt-4'>
          <h3 className='text-lg font-medium text-gray-300'>Applied coupon</h3>
          <p className='mt-2 text-sm text-gray-400'>
            {coupon.code} - {coupon.discountPercentage}% off
          </p>

          <button
            type='button'
            className='mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 
            px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 cursor-pointer'
            onClick={handleRemoveCoupon}
          >
            Remove coupon
          </button>
        </div>
      )}

      {availableCoupon && !isCouponApplied && (
        <div className='mt-4'>
          <div className='mt-4'>
            <h3 className='text-lg font-medium text-gray-300'>
              Your Available Coupon:
            </h3>
            {availableCoupon.map((coupon) => (
              <p className='mt-2 text-sm text-gray-400' key={coupon.code}>
                {coupon.code} - {coupon.discountPercentage}% off
              </p>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CouponCard;
