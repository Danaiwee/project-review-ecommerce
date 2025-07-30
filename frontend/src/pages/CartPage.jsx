// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect } from "react";

import { useCartStore } from "../stores/useCartStore";

import CartItem from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import CouponCard from "../components/CouponCard";
import LoadingState from "../components/LoadingState";

const CartPage = () => {
  const { isGettingCartProducts, getCartProducts, cart, getMyCoupon } =
    useCartStore();

  useEffect(() => {
    getCartProducts();
    getMyCoupon();
  }, [getCartProducts, getMyCoupon]);

  if (isGettingCartProducts) return <LoadingState />;

  return (
    <main className='pt-20'>
      <div className='py-8 md:py-16'>
        <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
          <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
            <motion.div
              className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {cart.length > 0 ? (
                <div className='space-y-4'>
                  {cart &&
                    cart.map((item) => (
                      <CartItem
                        key={item._id}
                        product={item.product}
                        quantity={item.quantity}
                      />
                    ))}
                </div>
              ) : (
                <EmptyCart />
              )}

              {cart.length > 0 && <PeopleAlsoBought />}
            </motion.div>

            {cart.length > 0 && (
              <motion.div
                className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <OrderSummary />
                <CouponCard />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
