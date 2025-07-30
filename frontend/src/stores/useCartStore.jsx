import { create } from "zustand";

import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  availableCoupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,
  isAdding: false,
  isGettingCartProducts: false,
  isApplyingCoupon: false,
  isRemoving: false,

  getCartProducts: async () => {
    set({ isGettingCartItems: true });
    try {
      const response = await axios.get("/cart");

      set({ cart: response.data });
      get().calculateTotals();
    } catch (error) {
      console.log(error);
    } finally {
      set({ isGettingCartItems: false });
    }
  },

  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupon");

      set({ availableCoupon: response.data });
    } catch (error) {
      console.log(error);
    }
  },

  addToCart: async (product) => {
    set({ isAdding: true });
    try {
      await axios.post("/cart", { productId: product._id });

      set((prevState) => {
        const isExistingProduct = prevState.cart.find(
          (item) => item.product._id === product._id
        );

        const newCart = isExistingProduct
          ? prevState.cart.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { product, quantity: 1 }];

        return { cart: newCart };
      });

      get().calculateTotals();
      toast.success("Added to cart successfully");
    } catch (error) {
      console.log(error);
    } finally {
      set({ isAdding: false });
    }
  },

  removeAllFromCart: async (productId) => {
    set({ isDeleting: true });
    try {
      await axios.delete(`/cart/${productId}`);

      set((prevState) => ({
        cart: prevState.cart.filter((item) => item.product._id !== productId),
      }));

      toast.success("Removed product successfully");
    } catch (error) {
      console.log(error);
    } finally {
      set({ isDeleting: false });
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      if (quantity === 0) {
        get().removeAllFromCart(productId);
      }

      await axios.put(`/cart/${productId}`, { quantity });

      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        ),
      }));

      get().calculateTotals();
    } catch (error) {
      console.log(error);
    }
  },

  applyCoupon: async (code) => {
    set({ isApplyingCoupon: true });
    try {
      const response = await axios.post("/coupon", { code });

      set({ coupon: response.data, isCouponApplied: true });
      toast.success("Coupon Applied");

      get().calculateTotals();
    } catch (error) {
      console.log(error);
    } finally {
      set({ isApplyingCoupon: false });
    }
  },

  removeCoupon: async () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    let total = subtotal;

    if (coupon) {
      const { discountPercentage } = coupon;
      const discount = subtotal * (Number(discountPercentage) / 100);

      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));
