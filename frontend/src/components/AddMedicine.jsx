import React, { useState } from 'react';
import axios from 'axios'; // ✅ এটা কারেক্ট

export default function AddMedicine() {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medicineData = { name, stock_qty: Number(stock), cost_price: Number(costPrice), selling_price: Number(sellingPrice) };

    try {
      await axios.post('http://192.168.0.103:5000/api/medicines/add', medicineData);
      alert('Stock record created successfully! 🎉');
      setName(''); setStock(''); setCostPrice(''); setSellingPrice('');
    } catch (error) {
      alert('Error: Unable to save data ❌');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">Add New Stock Entry</h2>
        <p className="text-xs text-slate-400">Register new batch parameters into the secure cloud repository</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Medicine Name / Batch ID</label>
          <input 
            type="text" value={name} onChange={(e) => setName(e.target.value)} required
            className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-[#0EA5E9] focus:bg-white outline-none transition text-sm" 
            placeholder="e.g., Napa Extend, Sergel 20mg"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Volume (Pieces)</label>
          <input 
            type="number" value={stock} onChange={(e) => setStock(e.target.value)} required
            className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-[#0EA5E9] focus:bg-white outline-none transition text-sm" 
            placeholder="0"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Unit Cost Price (৳)</label>
            <input 
              type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required
              className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-[#0EA5E9] focus:bg-white outline-none transition text-sm" 
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Unit Retail Price (৳)</label>
            <input 
              type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} required
              className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-[#0EA5E9] focus:bg-white outline-none transition text-sm" 
              placeholder="0.00"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold py-3.5 rounded-xl shadow-md shadow-sky-500/10 transition duration-200 text-sm mt-4">
          Save Item to Inventory
        </button>
      </form>
    </div>
  );
}