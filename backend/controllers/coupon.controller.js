import { handleError } from "../lib/error.js";
import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const userId = req.user._id;

    const coupon = await Coupon.find({
      userId,
      isActive: true,
    });
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    return res.status(200).json(coupon);
  } catch (error) {
    handleError(res, "getCoupon", error);
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const userId = req.user._id;
    const { code } = req.body;

    const coupon = await Coupon.findOne({
      code,
      userId,
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    if (coupon.expirationDate < new Date()) {
      await Coupon.deleteOne({ _id: coupon._id });
      return res.status(404).json({ message: "Coupon expired" });
    }

    return res.status(200).json({
      message: "Coupon is valid",
      code: coupon.code,
      discoutPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    handleError(res, "validateCooupon", error);
  }
};
