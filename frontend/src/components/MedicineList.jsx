import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get('https://eiomp.onrender.com/api/medicines/all')
      .then(response => setMedicines(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Products Inventory</h1>
        <p className="text-sm text-slate-500 mt-1">Detailed real-time spreadsheet of Raisa Corporation's medical assets.</p>
      </div>

      {medicines.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl text-center text-slate-400 py-16 shadow-sm">
          No records found in the database.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse table-auto text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-widest">
                <th className="p-5">Product Details</th>
                <th className="p-5 text-center">Available Stock</th>
                <th className="p-5 text-right">Cost Price</th>
                <th className="p-5 text-right">Selling Price</th>
                <th className="p-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {medicines.map((med) => {
                let statusBadge = <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">Active Stock</span>;
                if (med.stock_qty === 0) statusBadge = <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">Out of Stock</span>;
                else if (med.stock_qty < 10) statusBadge = <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">Refill Needed</span>;

                return (
                  <tr key={med._id} className="hover:bg-slate-50/70 transition duration-150">
                    <td className="p-5 font-bold text-slate-900 tracking-wide">{med.name}</td>
                    <td className="p-5 text-center font-bold font-mono text-slate-800">{med.stock_qty} Pcs</td>
                    <td className="p-5 text-right text-slate-500 font-mono">৳ {med.cost_price.toFixed(2)}</td>
                    <td className="p-5 text-right font-bold text-purple-700 font-mono">৳ {med.selling_price.toFixed(2)}</td>
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