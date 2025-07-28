import { handleError } from "../lib/error.js";
import { stripe } from "../lib/stripe.js";

import Coupon from "../models/coupon.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); //cents unit
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://localhost:3000/success?session_id={CHECK_SESSION_ID}",
      cancel_url: "http://localhost:3000/canceled",
      discounts: coupon
        ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }]
        : [],
      metadata: {
        userId: userId,
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((product) => ({
            id: product._id,
            quantity: product.quantity,
            price: product.price,
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

    if (session.payment_status === "padi") {
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
