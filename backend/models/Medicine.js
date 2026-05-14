const mongoose = require('mongoose');

// ওষুধের খাতার ডিজাইন বা স্ট্রাকচার তৈরি
const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },       // ওষুধের নাম
  stock_qty: { type: Number, required: true },  // কত পিস স্টকে আছে
  cost_price: { type: Number, required: true }, // কেনা দাম (ক্রয়মূল্য)
  selling_price: { type: Number, required: true } // বিক্রয়মূলย (বিক্রয়মূল্য)
});

module.exports = mongoose.model('Medicine', MedicineSchema);