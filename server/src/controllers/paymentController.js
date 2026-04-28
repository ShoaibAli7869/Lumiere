import { stripe } from "../config/stripe.js";
import Order from "../models/Order.js";
import { ApiError } from "../utils/ApiError.js";

export const createPaymentIntent = async (req, res) => {
  const { items, shippingAddress } = req.body;
  if (!items?.length) throw new ApiError("No items", 400);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal; // free shipping

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100), // cents
    currency: "usd",
    metadata: { userId: req.user._id.toString() },
  });

  // create pending order
  const order = await Order.create({
    user: req.user._id,
    items: items.map((i) => ({
      product: i._id,
      name: i.name,
      price: i.price,
      qty: i.qty,
      image: i.images?.[0]?.url || "",
    })),
    shippingAddress,
    subtotal,
    shipping: 0,
    total,
    stripePaymentIntentId: paymentIntent.id,
  });

  res.json({
    success: true,
    clientSecret: paymentIntent.client_secret,
    orderId: order._id,
  });
};

export const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return res.status(400).send("Webhook signature failed");
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;
    await Order.findOneAndUpdate(
      { stripePaymentIntentId: pi.id },
      { paymentStatus: "paid", paidAt: new Date() },
    );
  }

  if (event.type === "payment_intent.payment_failed") {
    await Order.findOneAndUpdate(
      { stripePaymentIntentId: event.data.object.id },
      { paymentStatus: "failed" },
    );
  }

  res.json({ received: true });
};
