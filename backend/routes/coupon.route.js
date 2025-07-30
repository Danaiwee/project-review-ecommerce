import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createCoupon,
  getCoupon,
  validateCoupon,
} from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCoupon);
router.post("/", protectRoute, validateCoupon);
router.post("/create", protectRoute, createCoupon);

export default router;
