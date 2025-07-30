import { create } from "zustand";

import axios from "../lib/axios.js";

export const useAnalyticStore = create((set) => ({
  isDataLoading: false,
  analyticsData: [],
  dailySalesData: [],

  getAnalyticsAndSalesData: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("/analytics");

      const analyticsData = response.data.analyticsData;
      const dailySalesData = response.data.dailySalesData;

      set({ analyticsData, dailySalesData });
    } catch (error) {
      console.log(error);
    }
    set({ isLoading: false });
  },
}));
