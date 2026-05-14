const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const medicineRoutes = require('./routes/medicines');
const orderRoutes = require('./routes/orders'); // 👈 যুক্ত হলো

const app = express();
app.use(cors({
  origin: '*', // এর মানে যেকোনো পোর্ট থেকে রিকোয়েস্ট আসলে সার্ভার অ্যাক্সেস দেবে
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// MongoDB কানেকশন (ব্র্যাকেট ছাড়া একদম ক্লিন পাসওয়ার্ড ও ডাটাবেজ নাম যুক্ত)
mongoose.connect('mongodb+srv://mahbubaalamia494_db_user:mahbubaa123@cluster1.wopcirx.mongodb.net/inventory_db?retryWrites=true&w=majority') 
  .then(() => console.log('Successfully connected to MongoDB Database! 🎉'))
  .catch((err) => console.error('Database connection error ❌:', err)); 

// রুটসসমূহ
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes); // 👈 যুক্ত হলো

app.get('/', (req, res) => {
  res.send('Alhamdulillah! Medicine Server is Running with Database!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is successfully running on port ${PORT}`);
});