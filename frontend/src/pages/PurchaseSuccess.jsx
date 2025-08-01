// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Confetti from "react-confetti";

import { usePaymentStore } from "../stores/usePaymentStore";
import LoadingState from "../components/LoadingState";

const PurchaseSuccess = () => {
  const { checkOutSuccess, isProcessing, orderId } = usePaymentStore();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (!sessionId) return;

    checkOutSuccess(sessionId);
  }, [checkOutSuccess]);

  const orderNumber = orderId?.toUpperCase() || localStorage.getItem("orderId");

  if (isProcessing) return <LoadingState />;
  return (
    <div className='h-screen flex items-center justify-center pt-20 px-4'>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <motion.div
        className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className='p-6 sm:p-8'>
          <div className='flex justify-center'>
            <CheckCircle className='text-emerald-400 size-16 mb-4' />
          </div>
          <h1 className="'text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
            Purchase Successful
          </h1>
          <p className='text-gray-300 text-center mb-2'>
            Thank you for your order. {"We're"} processing it now
          </p>
          <p className='text-emerald-400 text-center text-sm mb-6'>
            Check your email for order details and updates.
          </p>
          <div className='bg-gray-700 rounded-lg p-4 mb-6 flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>Order number</span>
              <span className='text-sm font-semibold text-emerald-400'>
                {orderNumber}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>Estimated delivery</span>
              <span className='text-sm font-semibold text-emerald-400'>
                3-5 business days
              </span>
            </div>
          </div>

          <div className='space-y-4'>
            <button
              className='w-full bg-emerald-600 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center'
            >
              <HandHeart className='mr-2' size={18} />
              Thanks for trusting us!
            </button>

            <Link
              to='/'
              className='w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
            >
              Continue Shopping
              <ArrowRight className='ml-2' size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccess;
