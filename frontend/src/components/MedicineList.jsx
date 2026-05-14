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
  }, []); // 👈 ইনফিনিট লুপ বন্ধ করার জন্য ডিপেন্ডেন্সি খালি করা হয়েছে

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-purple-300 mb-8 flex items-center space-x-2">
        <span>📋</span> <span>Inventory Status Report</span>
      </h2>
      
      {medicines.length === 0 ? (
        <p className="text-center text-slate-500 py-12">ইনভেন্টরিতে কোনো প্রোডাক্ট ডাটা নেই।</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950 shadow-inner">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/60 text-slate-400 font-semibold text-xs uppercase tracking-widest">
                <th className="p-5 text-left">আইটেম ডেসক্রিপশন</th>
                <th className="p-5 text-center">কারেন্ট স্টক</th>
                <th className="p-5 text-right">ইউনিট কস্ট</th>
                <th className="p-5 text-right">ইউনিট রিটেইল</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 text-sm text-slate-300">
              {medicines.map((med) => (
                <tr key={med._id} className="hover:bg-neutral-900/40 transition duration-150">
                  <td className="p-5 font-bold text-white tracking-wide">{med.name}</td>
                  <td className="p-5 text-center">
                    <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-black tracking-wide ${med.stock_qty < 10 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'}`}>
                      {med.stock_qty} পিস {med.stock_qty < 10 && '⚠️'}
                    </span>
                  </td>
                  <td className="p-5 text-right text-slate-400 font-mono">{med.cost_price.toFixed(2)} ৳</td>
                  <td className="p-5 text-right font-bold text-purple-400 font-mono">{med.selling_price.toFixed(2)} ৳</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}