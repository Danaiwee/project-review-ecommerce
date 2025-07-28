import { handleError } from "../lib/error.js";

export const adminRoute = (req, res, next) => {
  try {
    const user = req.user;
    const isAdmin = user.role === "admin";

    if (!isAdmin) {
      return res
        .status(401)
        .json({ error: "Unauthorized - You are not admin" });
    }

    next();
  } catch (error) {
    handleError(res, "andminRoute", error);
  }
};
