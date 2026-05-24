import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMedicines = async () => {
    try {
      // ⚠️ এখানে তোমার ক্লাউড/রেন্ডার/আইপি ব্যাকএন্ড লিঙ্কটি বসাবে
      const response = await axios.get('http://192.168.0.103:5000/api/medicines/all');
      setMedicines(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // 📈 অ্যানালিটিক্স ক্যালকুলেশন
  const totalValue = medicines.reduce((acc, med) => acc + (med.cost_price * med.stock_qty), 0);
  const lowStockCount = medicines.filter(med => med.stock_qty > 0 && med.stock_qty < 10).length;
  const outOfStockCount = medicines.filter(med => med.stock_qty === 0).length;

  // 🔍 সার্চ ফিল্টারিং লজিক
  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* 📊 Analytics Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-4 bg-emerald-50 rounded-xl text-emerald-600 text-2xl">৳</div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Stock Value</p>
            <h3 className="text-2xl font-bold text-slate-800 font-mono mt-1">{totalValue.toFixed(2)} ৳</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-4 bg-amber-50 rounded-xl text-amber-600 text-2xl">⚠️</div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock Items</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{lowStockCount} Items</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-4 bg-rose-50 rounded-xl text-rose-600 text-2xl">🚫</div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Out of Stock</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{outOfStockCount} Items</h3>
          </div>
        </div>
      </div>

      {/* 🔍 Search & Section Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Enterprise Inventory Status</h2>
          <p className="text-xs text-slate-400">Real-time stock level tracing and valuation</p>
        </div>
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search medicine instantly..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:bg-white transition"
          />
        </div>
      </div>

      {/* 📋 Data Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wider">
              <th className="p-5">Item Description</th>
              <th className="p-5 text-center">Current Stock</th>
              <th className="p-5 text-right">Unit Cost</th>
              <th className="p-5 text-right">Unit Retail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {filteredMedicines.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-slate-400">No matching medicine records found.</td>
              </tr>
            ) : (
              filteredMedicines.map((med) => (
                <tr key={med._id} className="hover:bg-slate-50/80 transition duration-150">
                  <td className="p-5 font-semibold text-slate-800">{med.name}</td>
                  <td className="p-5 text-center">
                    {med.stock_qty === 0 ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-600 border border-rose-100">
                        ● Out of Stock
                      </span>
                    ) : med.stock_qty < 10 ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                        ● Low Stock ({med.stock_qty})
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                        ● In Stock ({med.stock_qty} Pcs)
                      </span>
                    )}
                  </td>
                  <td className="p-5 text-right font-mono text-slate-500">{med.cost_price.toFixed(2)} ৳</td>
                  <td className="p-5 text-right font-bold text-[#0EA5E9] font-mono">{med.selling_price.toFixed(2)} ৳</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}