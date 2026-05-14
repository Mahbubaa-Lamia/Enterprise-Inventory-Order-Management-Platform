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
      // 👈 আইপি আপডেট করা হয়েছে
      const medRes = await axios.get('https://eiomp.onrender.com/api/medicines/all');
      setMedicines(medRes.data);
      const orderRes = await axios.get('https://eiomp.onrender.com/api/orders/all');
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
      // 👈 আইপি আপডেট করা হয়েছে
      await axios.post('https://eiomp.onrender.com/api/orders/add', orderData);
      alert('অর্ডার সফলভাবে ডাটাবেজে যুক্ত হয়েছে!');
      setCustomerName(''); setPhone(''); setAddress(''); setSelectedMedicine(''); setQuantity('');
      loadData();
    } catch (err) {
      alert('ত্রুটি: অর্ডার প্রসেস করা যায়নি');
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      // 👈 আইপি আপডেট করা হয়েছে
    const res = await axios.put('https://eiomp.onrender.com/api/orders/deliver/${orderId}');
      alert(res.data.message);
      loadData();
    } catch (err) {
      alert('ডেলিভারি প্রসেস করা যায়নি');
    }
  };

  return (
    <div className="p-6 space-y-12">
      <div>
        <h2 className="text-xl font-bold text-purple-300 mb-8 flex items-center space-x-2">
          <span>📝</span> <span>Order Dispatch Input</span>
        </h2>
        <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="text" placeholder="কাস্টমারের নাম" value={customerName} onChange={e => setCustomerName(e.target.value)} required className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition" />
          <input type="text" placeholder="মোবাইল নম্বর" value={phone} onChange={e => setPhone(e.target.value)} required className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition" />
          <input type="text" placeholder="ডেলিভারি শিপমেন্ট ঠিকানা" value={address} onChange={e => setAddress(e.target.value)} required className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-white md:col-span-2 focus:ring-2 focus:ring-purple-500 outline-none transition" />
          
          <select value={selectedMedicine} onChange={e => setSelectedMedicine(e.target.value)} required className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-slate-300 focus:ring-2 focus:ring-purple-500 outline-none transition">
            <option value="">প্রোডাক্ট সিলেক্ট করুন</option>
            {medicines.map(med => (
              <option key={med._id} value={med._id} className="bg-neutral-950 text-white">{med.name} (স্টক: {med.stock_qty})</option>
            ))}
          </select>
          
          <input type="number" placeholder="পরিমাণ (পিস)" value={quantity} onChange={e => setQuantity(e.target.value)} required className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition" />
          
          <button type="submit" className="w-full md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/10 hover:from-purple-700 transition duration-200">
            অর্ডার বুকিং কনফার্ম করুন
          </button>
        </form>
      </div>

      <div className="border-t border-neutral-900"></div>

      <div>
        <h2 className="text-xl font-bold text-slate-200 mb-8 flex items-center space-x-2">
          <span>📊</span> <span>Order Processing Logs</span>
        </h2>
        {orders.length === 0 ? (
          <p className="text-center text-slate-500 py-12">বর্তমানে কোনো অ্যাক্টিভ অর্ডার লগ নেই।</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-950 shadow-inner">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/60 text-slate-400 font-semibold text-xs uppercase tracking-widest">
                  <th className="p-5">গ্রাহক বিবরণ</th>
                  <th className="p-5">প্রোডাক্ট ও ভলিউম</th>
                  <th className="p-5 text-center">গেটওয়ে স্ট্যাটাস</th>
                  <th className="p-5 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-sm text-slate-300">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-neutral-900/40 transition">
                    <td className="p-5">
                      <div className="font-bold text-white tracking-wide">{order.customerName}</div>
                      <div className="text-xs text-slate-500 font-mono mt-1">{order.phone}</div>
                    </td>
                    <td className="p-5">
                      <span className="font-semibold text-slate-200">{order.medicineId?.name || 'N/A'}</span>
                      <span className="ml-3 px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl text-xs font-black">{order.quantity} পিস</span>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wide ${order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'}`}>
                        {order.status === 'Pending' ? '⏱️ Pending' : '✅ Dispatched'}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      {order.status === 'Pending' ? (
                        <button onClick={() => handleDeliver(order._id)} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-purple-600/10">
                          ডেলিভারি কনফার্ম
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 font-medium bg-neutral-900/60 px-3 py-1.5 rounded-xl border border-neutral-800">Archived</span>
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