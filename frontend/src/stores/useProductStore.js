import { create } from "zustand";
import { createProductValidation } from "../lib/validation";

import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  isGettingProducts: false,
  isCreatingProduct: false,
  isDeletingProduct: false,
  isTogglingProduct: false,

  getProducts: async () => {
    set({ isGettingProducts: true });
    try {
      const response = await axios.get("/products");

      set({ products: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isGettingProducts: false });
    }
  },

  getProductsByCategory: async (category) => {
    set({ isGettingProducts: true });
    try {
      const response = await axios.get(`/products/category/${category}`);

      set({ products: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isGettingProducts: false });
    }
  },

  getRecommendedProducts: async () => {
    set({ isGettingProducts: true });
    try {
      const response = await axios.get("/products/recommended");

      set({ products: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isGettingProducts: false });
    }
  },

  createProduct: async (data) => {
    set({ isCreatingProduct: true });
    try {
      createProductValidation(data);

      const response = await axios.post("/products/create", data);
      set((prevState) => ({
        products: [...prevState.products, response.data],
      }));

      toast.success("Created product successfully");
    } catch (error) {
      console.log(error.message || "Error in create product");
    } finally {
      set({ isCreatingProduct: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ isDeletingProduct: true });
    try {
      await axios.delete(`/products/${productId}`);

      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
      }));

      toast.success("Deleted product successfully");
    } catch (error) {
      console.log(error);
    } finally {
      set({ isDeletingProduct: false });
    }
  },

  toggleFeatured: async (productId) => {
    set({ isTogglingProduct: true });
    try {
      const response = await axios.put(`/products/toggle-feature/${productId}`);

      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isTogglingProduct: false });
    }
  },
}));
