const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Medicine = require('../models/Medicine');

// 📝 ১. নতুন অর্ডার খাতায় তোলা (অর্ডার এন্ট্রি)
router.post('/add', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order added to khata successfully! 📝', newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 ২. খাতার সব অর্ডারের লিস্ট দেখা
router.get('/all', async (req, res) => {
  try {
    // populate('medicineId') দিলে ওষুধের আইডির বদলে ওষুধের নাম-দামসহ ডিটেইলস চলে আসবে
    const orders = await Order.find().populate('medicineId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔴 ৩. লাল কালি দেওয়ার লজিক (Mark as Delivered ও অটো-স্টক আউট)
router.put('/deliver/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    // অর্ডার যদি আগেই ডেলিভারড হয়ে থাকে
    if (order.status === 'Delivered') {
      return res.status(400).json({ message: "This order is already delivered!" });
    }

    // মেইন স্টক থেকে ওষুধ আছে কিনা চেক করা
    const medicine = await Medicine.findById(order.medicineId);
    if (medicine.stock_qty < order.quantity) {
      return res.status(400).json({ message: `Not enough stock! Available: ${medicine.stock_qty} pcs` });
    }

    // 📉 ম্যাজিক লজিক: মেইন স্টক থেকে পরিমাণ মাইনাস করা
    medicine.stock_qty -= order.quantity;
    
    // স্ট্যাটাস পেন্ডিং থেকে ডেলিভারড (লাল কালি) করা
    order.status = 'Delivered';

    await medicine.save(); // ওষুধের নতুন স্টক সেভ হলো
    await order.save();    // অর্ডারের নতুন স্ট্যাটাস সেভ হলো

    res.json({ message: "Order marked as Delivered! Stock updated automatically. 🟢", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;