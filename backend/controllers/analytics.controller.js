import { handleError } from "../lib/error.js";
import { getDatesInRange } from "../lib/utils.js";

import Product from "../models/product.mode.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

export const getAnalyticsDataAndSalesData = async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime()) - 7 * 24 * 60 * 60 * 1000;

    const dailySalesData = await getDailySalesData(startDate, endDate);

    return res.status(200).json({ analyticsData, dailySalesData });
  } catch (error) {
    handleError(res, "getAnalyticsData", error);
  }
};

async function getAnalyticsData() {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();

  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };

  return {
    totalUsers,
    totalProducts,
    totalSales,
    totalRevenue,
  };
}

async function getDailySalesData(startDate, endDate) {
  try {
    const dailaySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // example of dailySalesData
    // [
    // 	{
    // 		_id: "2024-08-18",
    // 		sales: 12,
    // 		revenue: 1450.75
    // 	},
    // ]

    const dateArray = getDatesInRange(startDate, endDate);

    const returnData = dateArray.map((data) => {
      const foundData = dailaySalesData.find((item) => item._id === date);

      return {
        date,
        sales: foundData.sales || 0,
        revenue: foundData.revenue || 0,
      };
    });

    return returnData;
  } catch (error) {
    console.log("Error in getDailaySalesData", error);
  }
}
