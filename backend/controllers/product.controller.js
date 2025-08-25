import { handleError } from "../lib/error.js";
import { redis } from "../lib/redis.js";

import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.mode.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    handleError(res, "getProducts controller", error);
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  try {
    const products = await Product.find({
      category: { $regex: new RegExp(`^${tag}$`, "i") },
    });
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    handleError(res, "getProductsByCategory controller", error);
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = redis.get("featured_products");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts));
    }

    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ error: "Featured products not found" });
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));

    return res.status(200).json(featuredProducts);
  } catch (error) {
    handleError(res, "getFeaturedProducts", error);
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const product = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    return res.status(200).json(product);
  } catch (error) {
    handleError(res, "getRecommendedProducts", error);
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, image, category } = req.body;

  if (!name || !description || !price || !image || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const imageUploader = await cloudinary.uploader.upload(image);
    const uploadUrl = imageUploader.secure_url;

    const newProduct = await Product.create({
      name,
      description,
      price,
      image: uploadUrl || "",
      category,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    handleError(res, "createProduct", error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(200).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    handleError(res, "deleteProduct", error);
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();

    return res.status(200).json(updatedProduct);
  } catch (error) {
    handleError(res, "toggleFeatureProduct", error);
  }
};
