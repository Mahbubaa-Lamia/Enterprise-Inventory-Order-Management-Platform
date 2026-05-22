import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('https://eiomp.onrender.com/api/medicines/all');
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // 📊 ম্যাট্রিক্স ক্যালকুলেশন (ড্যাশবোর্ড কার্ডের জন্য)
  const totalProducts = medicines.length;
  const lowStockItems = medicines.filter(med => med.stock_qty < 10 && med.stock_qty > 0).length;
  const outOfStockItems = medicines.filter(med => med.stock_qty === 0).length;

  return (
    <div className="p-6 bg-[#09090b] min-h-screen text-slate-300 space-y-8">
      
      {/* 📋 হেডার সেকশন */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Product List</h1>
          <p className="text-sm text-slate-500 mt-1">Let's check your pharmacy inventory status today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search medicine..." 
              className="bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none w-64 transition"
            />
            <span className="absolute left-3.5 top-3 text-slate-500 text-sm">🔍</span>
          </div>
        </div>
      </div>

      {/* 📊 স্ট্যাটাস কার্ডস গ্রিড (যেমনটা তোমার স্ক্রিনশটে আছে) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* কার্ড ১: টোটাল প্রোডাক্ট */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 flex items-center space-x-5 shadow-sm">
          <div className="p-4 bg-purple-500/10 text-purple-400 rounded-xl text-xl">📦</div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Products</p>
            <h3 className="text-2xl font-black text-white mt-1 font-mono">{totalProducts}</h3>
          </div>
        </div>

        {/* কার্ড ২: লো স্টক */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 flex items-center space-x-5 shadow-sm">
          <div className="p-4 bg-amber-500/10 text-amber-400 rounded-xl text-xl">⚠️</div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Low Stock Items</p>
            <h3 className="text-2xl font-black text-white mt-1 font-mono">{lowStockItems}</h3>
          </div>
        </div>

        {/* কার্ড ৩: আউট অফ স্টক */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 flex items-center space-x-5 shadow-sm">
          <div className="p-4 bg-red-500/10 text-red-400 rounded-xl text-xl">❌</div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Out of Stock</p>
            <h3 className="text-2xl font-black text-white mt-1 font-mono">{outOfStockItems}</h3>
          </div>
        </div>
      </div>

      {/* 📄 মডার্ন ডেটা টেবিল */}
      {medicines.length === 0 ? (
        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl text-center text-slate-500 py-16">
          ইনভেন্টরিতে কোনো প্রোডাক্ট ডাটা খুঁজে পাওয়া যায়নি।
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-neutral-900 bg-neutral-950 shadow-sm">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-neutral-900 bg-neutral-900/40 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <th className="p-5">Product Name</th>
                <th className="p-5 text-center">Quantity</th>
                <th className="p-5 text-right">Price (Cost)</th>
                <th className="p-5 text-right">Price (Retail)</th>
                <th className="p-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/60 text-sm text-slate-300">
              {medicines.map((med) => {
                // ডাইনামিক স্ট্যাটাস ব্যাজ লজিক
                let statusBadge = (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    In Stock
                  </span>
                );
                if (med.stock_qty === 0) {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                      Out of Stock
                    </span>
                  );
                } else if (med.stock_qty < 10) {
                  statusBadge = (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Low Stock
                    </span>
                  );
                }

                return (
                  <tr key={med._id} className="hover:bg-neutral-900/20 transition duration-150">
                    <td className="p-5 font-bold text-white tracking-wide">{med.name}</td>
                    <td className="p-5 text-center font-semibold font-mono">{med.stock_qty} Units</td>
                    <td className="p-5 text-right text-slate-400 font-mono">৳ {med.cost_price.toFixed(2)}</td>
                    <td className="p-5 text-right font-bold text-purple-400 font-mono">৳ {med.selling_price.toFixed(2)}</td>
                    <td className="p-5 text-center">{statusBadge}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}