
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// import jwt from 'jsonwebtoken';

import Razorpay from "razorpay";


// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// placing user order from frontend

const placeOrder = async (req, res) => {

    // const frontend_url = "http://localhost:5173"

    try {
    const { userId, items, amount, address } = req.body;

    // Save order to MongoDB
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_order_${newOrder._id}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Send order data to frontend
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: razorpayOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
}

const showOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};



export {placeOrder , showOrder}