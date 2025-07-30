import { create } from "zustand";
import { loadStripe } from "@stripe/stripe-js";

import axios from "../lib/axios.js";

import { useCartStore } from "./useCartStore.js";

const stripePublishKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY;

export const usePaymentStore = create((set) => ({
  isProcessing: false,
  orderId: null,

  proceedPayment: async (products, couponCode) => {
    try {
      const stripePromise = loadStripe(stripePublishKey);
      const stripe = await stripePromise;

      const response = await axios.post("/payments/create-checkout-session", {
        products,
        couponCode,
      });
      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error("Error", result.error);
      }
    } catch (error) {
      console.log(error);
    }
  },

  checkOutSuccess: async (sessionId) => {
    const { clearCart } = useCartStore.getState();
    set({ isProcessing: true });
    try {
      const response = await axios.post("/payments/checkout-success", {
        sessionId,
      });

      set({ orderId: response.data.orderId });
      localStorage.setItem("orderId", response.data.orderId);
      await clearCart();
    } catch (error) {
      console.log(error);
    } finally {
      set({ isProcessing: false });
    }
  },
}));
