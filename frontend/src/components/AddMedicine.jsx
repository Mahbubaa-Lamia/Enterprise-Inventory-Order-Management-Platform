import React, { useState } from 'react';
import axios from 'axios';

export default function AddMedicine() {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const medicineData = {
      name: name,
      stock_qty: Number(stock),
      cost_price: Number(costPrice),
      selling_price: Number(sellingPrice)
    };

    try {
      await axios.post('https://eiomp.onrender.com/api/medicines/add', medicineData);
      alert('সফলভাবে স্টক আপডেট হয়েছে! 🎉');
      setName(''); setStock(''); setCostPrice(''); setSellingPrice('');
    } catch (error) {
      console.error(error);
      alert('ত্রুটি: ডেটা সেভ করা যায়নি ❌');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-purple-300 mb-6 flex items-center space-x-2">
        <span>➕</span> <span>নতুন স্টক এন্ট্রি</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">ওষুধের নাম</label>
          <input 
            type="text" value={name} onChange={(e) => setName(e.target.value)} required
            className="mt-1 w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition" 
            placeholder="যেমন: Napa Extend, Sergel"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">স্টক পরিমাণ (পিস)</label>
          <input 
            type="number" value={stock} onChange={(e) => setStock(e.target.value)} required
            className="mt-1 w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition" 
            placeholder="0"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">ক্রয়মূল্য (৳)</label>
            <input 
              type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required
              className="mt-1 w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition" 
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">বিক্রয়মূল্য (৳)</label>
            <input 
              type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} required
              className="mt-1 w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition" 
              placeholder="0.00"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/10 hover:from-purple-700 transition duration-200">
          ইনভেন্টরিতে যুক্ত করুন
        </button>
      </form>
    </div>
  );
} 