const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true }, // কাস্টমারের নাম
  phone: { type: String, required: true },        // ফোন নম্বর
  address: { type: String, required: true },      // ঠিকানা
  date: { type: Date, default: Date.now },        // কোন তারিখে অর্ডার নিল (অটোমেটিক আজকের ডেট বসে যাবে)
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true }, // কোন ওষুধটা নিল (মেডিসিন টেবিল থেকে আইডি আসবে)
  quantity: { type: Number, required: true },     // কত পিস নিল
  status: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' } // লাল কালির লজিক (শুরুতে Pending থাকবে)
});

module.exports = mongoose.model('Order', OrderSchema);