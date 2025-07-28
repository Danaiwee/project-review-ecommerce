import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

import { generateTokenAndSetCookies } from "../lib/generateToken.js";
import { handleError } from "../lib/error.js";
import { redis } from "../lib/redis.js";

export const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Password must be matched" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Invalid password" });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({ error: "Error in create user" });
    }

    await generateTokenAndSetCookies(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      cartItems: newUser.cartItems,
      role: newUser.role,
    });
  } catch (error) {
    handleError(res, "signup controller", error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    await generateTokenAndSetCookies(user._id, res);

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      cartItems: user.cartItems,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    return res.status(500).json({ error: "Internal server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(404).json({ error: "Unauthorized - No refresh token" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded.userId;

    await redis.del(`refresh_token:${userId}`);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    handleError(res, "logout controller", error);
  }
};

export const refreshAccesToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(403)
        .json({ error: "Unauthorized - No refreshToken provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded.userId;

    const storedRefreshToken = await redis.get(`refresh_token:${userId}`);
    if (refreshToken !== storedRefreshToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 10000,
    });

    return res
      .status(200)
      .json({ message: "Access Token refresh successfully" });
  } catch (error) {
    handleError(res, "refreshToken controller", error);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      cartItems: user.cartItems,
      role: user.role,
    });
  } catch (error) {
    handleError(res, "getUserProfile", error);
  }
};
