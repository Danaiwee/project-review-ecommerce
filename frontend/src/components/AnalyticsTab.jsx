// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ANALYTICS_CARD, SALES_DATA } from "../constants";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useAnalyticStore } from "../stores/useAnalyticsStore";
import AnalyticsCard from "./AnalyticsCard";
import LoadingState from "../components/LoadingState";
import { useEffect } from "react";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

const AnalyticsTab = () => {
  const { getAnalyticsAndSalesData, analyticsData, dailySalesData, isLoading } =
    useAnalyticStore();

  useEffect(() => {
    getAnalyticsAndSalesData();
  }, [getAnalyticsAndSalesData]);

  const analyticsDataSet = [
    {
      title: "Total Users",
      value: analyticsData?.totalUsers || 0,
      icon: Users,
      color: "from-emerald-500 to-teal-700",
    },
    {
      title: "Total Products",
      value: analyticsData?.totalProducts || 0,
      icon: Package,
      color: "from-emerald-500 to-green-700",
    },
    {
      title: "Total Sales",
      value: analyticsData?.totalSales || 0,
      icon: ShoppingCart,
      color: "from-emerald-500 to-cyan-700",
    },
    {
      title: "Total Revenue",
      value: analyticsData?.totalRevenue || 0,
      icon: DollarSign,
      color: "from-emerald-500 to-lime-700",
    },
  ];

  if (isLoading) return <LoadingState />;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {analyticsDataSet.map((analytic) => (
          <AnalyticsCard
            key={analytic.title + analytic.value}
            analytic={analytic}
          />
        ))}
      </div>

      <motion.div
        className='bg-gray-800/60 rounded-lg p-6 shadow-lg h-[500px]'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={dailySalesData} width={500} height={300}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' stroke='#D1D5DB' />
            <YAxis yAxisId='left' stroke='#D1D5DB' />
            <YAxis yAxisId='right' orientation='right' stroke='#D1D5DB' />
            <Tooltip />
            <Legend />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='sales'
              stroke='#10B981'
              activeDot={{ r: 8 }}
              name='sales'
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='revenue'
              stroke='#3B82F6'
              activeDot={{ r: 8 }}
              name='Revenue'
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;
