const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine'); // মডেলটা নিয়ে আসলাম

// ➕ ১. নতুন ওষুধ যোগ করার রাস্তা (POST Request)
router.post('/add', async (req, res) => {
  try {
    const { name, stock_qty, cost_price, selling_price } = req.body;
    
    const newMedicine = new Medicine({ name, stock_qty, cost_price, selling_price });
    await newMedicine.save(); // ডেটাবেজে সেভ হলো
    
    res.status(201).json({ message: 'Medicine added successfully! 🎉', newMedicine });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 ২. সব ওষুধের লিস্ট দেখার রাস্তা (GET Request)
router.get('/all', async (req, res) => {
  try {
    const medicines = await Medicine.find(); // ডেটাবেজ থেকে সব ওষুধ নিয়ে আসবে
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;