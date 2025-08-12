import jwt from "jsonwebtoken";
import { redis } from "./redis.js";

export const generateTokenAndSetCookies = async (userId, res) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  //Store refresh token in redis => expires in 7 days
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: "strict",
    maxAge: 60 * 60 * 24 * 1000, // 1 days
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: "strict",
    maxAge: 7 * 60 * 60 * 24 * 1000,
  });
};
