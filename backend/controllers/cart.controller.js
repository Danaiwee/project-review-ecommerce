import { handleError } from "../lib/error.js";

import User from "../models/user.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("cartItems.product");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user.cartItems);
  } catch (error) {
    handleError(res, "getCartProducts", error);
  }
};

export const addToCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    const isProductExists = user.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (isProductExists) {
      isProductExists.quantity += 1;
    } else {
      user.cartItems.push({
        product: productId,
        quantity: 1,
      });
    }

    await user.save();

    return res.status(200).json(user.cartItems);
  } catch (error) {
    handleError(res, "addToCart", error);
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params.id;
    const { quantity } = req.body;

    const isExistingProduct = user.cartItems.find(
      (item) => item.product.toString() === productId
    );
    if (!isExistingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      isExistingProduct.quantity = quantity;
    }

    await user.save();

    return res.status(200).json(user.cartItems);
  } catch (error) {
    handleError(res, "updateQuantity", error);
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params.id;

    user.cartItems = user.cartItems.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();

    return res.status(200).json(user.cartItems);
  } catch (error) {
    handleError(res, "deleteFromCart", error);
  }
};
