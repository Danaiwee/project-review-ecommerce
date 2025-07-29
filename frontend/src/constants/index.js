import {
  PlusCircle,
  ShoppingBasket,
  BarChart,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

export const CATEGORIES = [
  { href: "/category/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/category/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/category/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/category/glasses", name: "Glasses", imageUrl: "/glasses.webp" },
  { href: "/category/jackets", name: "Jackets", imageUrl: "/jackets.png" },
  { href: "/category/suits", name: "Suits", imageUrl: "/suit.webp" },
  { href: "/category/bags", name: "Bags", imageUrl: "/bag.webp" },
];

export const PRODUCTS = [
  {
    name: "Urban Windbreaker",
    description: "Lightweight and waterproof jacket with a modern fit.",
    price: 89.99,
    image: "/jackets.png",
    category: "jackets",
    isFeatured: true,
    quantity: 1,
  },
  {
    name: "Street Runner Sneakers",
    description: "Comfortable sneakers designed for all-day wear.",
    price: 59.99,
    image: "/shoes.jpg",
    category: "shoes",
    isFeatured: true,
    quantity: 1,
  },
  {
    name: "Aviator Sunglasses",
    description: "Classic aviator style with polarized lenses.",
    price: 39.99,
    image: "/glasses.webp",
    category: "glasses",
    isFeatured: false,
    quantity: 1,
  },
];

export const FEATURED_PRODUCTS = [
  {
    name: "Urban Windbreaker",
    description: "Lightweight and waterproof jacket with a modern fit.",
    price: 89.99,
    image: "/jackets.png",
    category: "jackets",
    isFeatured: true,
    quantity: 1,
  },
  {
    name: "Street Runner Sneakers",
    description: "Comfortable sneakers designed for all-day wear.",
    price: 59.99,
    image: "/shoes.jpg",
    category: "shoes",
    isFeatured: true,
    quantity: 1,
  },
  {
    name: "Aviator Sunglasses",
    description: "Classic aviator style with polarized lenses.",
    price: 39.99,
    image: "/glasses.webp",
    category: "glasses",
    isFeatured: false,
    quantity: 1,
  },
  {
    name: "Urban Windbreaker",
    description: "Lightweight and waterproof jacket with a modern fit.",
    price: 89.99,
    image: "/jackets.png",
    category: "jackets",
    isFeatured: true,
    quantity: 1,
  },
  {
    name: "Street Runner Sneakers",
    description: "Comfortable sneakers designed for all-day wear.",
    price: 59.99,
    image: "/shoes.jpg",
    category: "shoes",
    isFeatured: true,
    quantity: 1,
  },
  {
    name: "Aviator Sunglasses",
    description: "Classic aviator style with polarized lenses.",
    price: 39.99,
    image: "/glasses.webp",
    category: "glasses",
    isFeatured: false,
    quantity: 1,
  },
];

export const JEANS_PRODUCTS = [
  {
    name: "Slim Fit Stretch Jeans",
    description: "Slim cut with added stretch for comfort.",
    price: 49.99,
    image: "/jeans1.webp",
    category: "jeans",
  },
  {
    name: "Slim Fit Stretch Jeans",
    description: "Slim cut with added stretch for comfort.",
    price: 49.99,
    image: "/jeans1.webp",
    category: "jeans",
  },
  {
    name: "Slim Fit Stretch Jeans",
    description: "Slim cut with added stretch for comfort.",
    price: 49.99,
    image: "/jeans1.webp",
    category: "jeans",
  },
  {
    name: "Slim Fit Stretch Jeans",
    description: "Slim cut with added stretch for comfort.",
    price: 49.99,
    image: "/jeans1.webp",
    category: "jeans",
  },
  {
    name: "Slim Fit Stretch Jeans",
    description: "Slim cut with added stretch for comfort.",
    price: 49.99,
    image: "/jeans1.webp",
    category: "jeans",
  },
];

export const ADMIN_TABS = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

export const PRODUCT_CATEGORIES = [
  "T-Shirts",
  "Shirts",
  "Jeans",
  "Pants",
  "Shorts",
  "Jackets",
  "Sweaters",
  "Hoodies",
  "Shoes",
  "Sneakers",
  "Sandals",
  "Boots",
  "Dresses",
  "Skirts",
  "Activewear",
  "Underwear",
  "Socks",
  "Accessories",
  "Bags",
  "Hats",
  "Belts",
  "Watches",
  "Sunglasses",
  "Jewelry",
  "Swimwear",
  "Outerwear",
  "Sleepwear",
  "Formal Wear",
  "Casual Wear",
];

export const ANALYTICS_CARD = [
  {
    title: "Total Users",
    value: 1350,
    icon: Users,
    color: "from-emerald-500 to-teal-700",
  },
  {
    title: "Total Products",
    value: 120,
    icon: Package,
    color: "from-emerald-500 to-green-700",
  },
  {
    title: "Total Sales",
    value: 580,
    icon: ShoppingCart,
    color: "from-emerald-500 to-cyan-700",
  },
  {
    title: "Total Revenue",
    value: 15780,
    icon: DollarSign,
    color: "from-emerald-500 to-lime-700",
  },
];

export const SALES_DATA = [
  { date: "2025-07-23", sales: 22, revenue: 2143.52 },
  { date: "2025-07-24", sales: 31, revenue: 2721.14 },
  { date: "2025-07-25", sales: 10, revenue: 975.43 },
  { date: "2025-07-26", sales: 19, revenue: 1812.77 },
  { date: "2025-07-27", sales: 24, revenue: 2390.11 },
  { date: "2025-07-28", sales: 30, revenue: 2935.22 },
  { date: "2025-07-29", sales: 38, revenue: 3457.63 },
];

export const CART_ITEMS = [];
