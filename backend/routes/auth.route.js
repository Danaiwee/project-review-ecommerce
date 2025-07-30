import express from "express";
import {
  clearCartItems,
  getUserProfile,
  logout,
  refreshAccesToken,
  signIn,
  signUp,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/profile", protectRoute, getUserProfile);

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logout);

router.post("/refresh-token", refreshAccesToken);

router.put("/clear", protectRoute, clearCartItems);

export default router;
