import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrderKhata() {
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);
  
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [quantity, setQuantity] = useState('');

  const loadData = async () => {
    try {
      const medRes = await axios.get('http://192.168.0.103:5000/api/medicines/all');
      setMedicines(medRes.data);
      const orderRes = await axios.get('http://192.168.0.103:5000/api/orders/all');
      setOrders(orderRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const orderData = { customerName, phone, address, medicineId: selectedMedicine, quantity: Number(quantity) };

    try {
      await axios.post('http://192.168.0.103:5000/api/orders/add', orderData);
      alert('Order placed successfully!');
      setCustomerName(''); setPhone(''); setAddress(''); setSelectedMedicine(''); setQuantity('');
      loadData();
    } catch (err) {
      alert('Error: Dispatch failed');
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      const res = await axios.put(`http://192.168.0.103:5000/api/orders/deliver/${orderId}`);
      alert(res.data.message);
      loadData();
    } catch (err) {
      alert('Delivery update failed');
    }
  };

  return (
    <div className="space-y-10">
      {/* Input Form */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm💡">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800">Order Dispatch Input</h2>
          <p className="text-xs text-slate-400">Generate fresh client invoice and logistical logging records</p>
        </div>
        <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="text" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} required className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#0EA5E9] focus:bg-white outline-none transition" />
          <input type="text" placeholder="Mobile Number" value={phone} onChange={e => setPhone(e.target.value)} required className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#0EA5E9] focus:bg-white outline-none transition" />
          <input type="text" placeholder="Delivery Shipment Address" value={address} onChange={e => setAddress(e.target.value)} required className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 md:col-span-2 focus:ring-2 focus:ring-[#0EA5E9] focus:bg-white outline-none transition" />
          
          <select value={selectedMedicine} onChange={e => setSelectedMedicine(e.target.value)} required className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-500 focus:ring-2 focus:ring-[#0EA5E9] focus:bg-white outline-none transition">
            <option value="">Select Product Item</option>
            {medicines.map(med => (
              <option key={med._id} value={med._id} className="text-slate-800">{med.name} (Available: {med.stock_qty})</option>
            ))}
          </select>
          
          <input type="number" placeholder="Volume / Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:ring-2 focus:ring-[#0EA5E9] focus:bg-white outline-none transition" />
          
          <button type="submit" className="w-full md:col-span-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold py-3.5 rounded-xl transition duration-200 text-sm mt-2">
            Confirm & Dispatch Order
          </button>
        </form>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Order Processing Logs</h2>
          <p className="text-xs text-slate-400">Archived operational dispatch tracking records</p>
        </div>
        {orders.length === 0 ? (
          <p className="text-center text-slate-400 py-12 text-sm">No operational dispatch logs currently saved.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                  <th className="p-5">Client Description</th>
                  <th className="p-5">Product & Vol</th>
                  <th className="p-5 text-center">Gateway Status</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-slate-50/60 transition">
                    <td className="p-5">
                      <div className="font-semibold text-slate-800">{order.customerName}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{order.phone}</div>
                    </td>
                    <td className="p-5">
                      <span className="font-medium text-slate-700">{order.medicineId?.name || 'Unknown Item'}</span>
                      <span className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-mono">{order.quantity} Pcs</span>
                    </td>
                    <td className="p-5 text-center">
                      {order.status === 'Pending' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                          ⏱️ Pending Approval
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                          ✅ Dispatched
                        </span>
                      )}
                    </td>
                    <td className="p-5 text-right">
                      {order.status === 'Pending' ? (
                        <button onClick={() => handleDeliver(order._id)} className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition">
                          Deliver Order
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 font-medium">Settled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}