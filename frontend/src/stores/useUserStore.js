import { create } from "zustand";
import toast from "react-hot-toast";

import axios from "../lib/axios.js";
import { signInValidation, signUpValidation } from "../lib/validation.js";

export const useUserStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isSigningIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,

  signUp: async (data) => {
    console.log("Signup funtion: ", data);
    set({ isSigningUp: true });

    try {
      signUpValidation(data);

      const response = await axios.post("/auth/signup", data);
      set({ user: response.data });
      toast.success("Signed up successfully");
    } catch (error) {
      toast.error(error?.message || "Error in sign up");
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  signIn: async (data) => {
    set({ isSigningIn: true });
    try {
      signInValidation(data);

      const response = await axios.post("/auth/signin", data);
      set({ user: response.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error("Incorrect email or password");
      console.log(error);
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.error || "Error in sign in");
      console.log(error);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/auth/profile");

      set({ user: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
