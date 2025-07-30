import express from "express";
import {
  createProduct,
  deleteProduct,
  getFeaturedProducts,
  getProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { adminRoute } from "../middleware/adminRoute.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/featured", getFeaturedProducts);
router.get("/recommended", getRecommendedProducts);

router.post("/create", protectRoute, adminRoute, createProduct);

router.put(
  "/toggle-feature/:id",
  protectRoute,
  adminRoute,
  toggleFeaturedProduct
);

router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
