import { handleError } from "../lib/error.js";
import { stripe } from "../lib/stripe.js";

import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((item) => {
      const amount = Math.round(item.product.price * 100); //cents unit
      totalAmount += amount * item.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            images: [item.product.image],
          },
          unit_amount: amount,
        },
        quantity: item.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    let discounts = [];
    if (coupon) {
      const stripeCoupon = await createStripeCoupon(coupon.discountPercentage);
      discounts = [{ coupon: stripeCoupon.id }];
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/canceled`,
      discounts,
      metadata: {
        userId: userId,
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((item) => ({
            id: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
          }))
        ),
      },
    });

    if (totalAmount >= 20000) {
      await createNewCoupon(userId, couponCode);
    }

    return res
      .status(200)
      .json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    handleError(res, "createCheckoutSession", error);
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    //Protect order duplication
    const isExistingOrder = await Order.findOne({ stripeSessionId: sessionId });
    if (isExistingOrder) {
      return res.status(400).json({ message: "Order is already exists" });
    }

    if (session.payment_status === "paid") {
      if (session.metadata.coupon) {
        await Coupon.findOneAndDelete({
          code: session.metadata.couponCode,
          userId: session.metadata.userId,
        });
      }
    }

    const products = JSON.parse(session.metadata.products);
    const newOrder = await Order.create({
      user: session.metadata.userId,
      products: products.map((product) => ({
        product: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: session.amount_total / 100,
      stripeSessionId: sessionId,
    });

    return res.status(200).json({
      success: true,
      message:
        "Payment successful, order created, and coupon deactivated if used",
      orderId: newOrder._id,
    });
  } catch (error) {
    handleError(res, "checkoutSuccess", error);
  }
};

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
}

async function createNewCoupon(userId, couponCode) {
  try {
    await Coupon.findOneAndDelete({ code: couponCode, userId });

    const newCoupon = await Coupon.create({
      code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      discountPercentage: 10,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30 days
      userId,
    });

    return newCoupon;
  } catch (error) {
    handleError(res, "createCoupon", error);
  }
}
