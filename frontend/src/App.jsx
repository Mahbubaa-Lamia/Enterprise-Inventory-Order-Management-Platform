import React, { useState, useEffect } from 'react';
import MedicineList from './components/MedicineList';
import OrderKhata from './components/OrderKhata';
import AddMedicine from './components/AddMedicine';
import axios from 'axios';

export default function App() {
  // স্ট্যান্ডার্ড অনুযায়ী শুরুতে 'overview' বা ড্যাশবোর্ড পেজ অ্যাক্টিভ থাকবে
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get('https://eiomp.onrender.com/api/medicines/all')
      .then(res => setMedicines(res.data))
      .catch(err => console.error(err));
  }, []);

  const totalProducts = medicines.length;
  const lowStockItems = medicines.filter(med => med.stock_qty < 10 && med.stock_qty > 0).length;
  const outOfStockItems = medicines.filter(med => med.stock_qty === 0).length;

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-800">
      
      {/* 📱 মোবাইল টপ বার */}
      <div className="md:hidden w-full bg-[#f3e8ff] border-b border-purple-200 p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-purple-600 block"></span>
          <span className="text-purple-950 font-black tracking-tight text-lg">Raisa Corporation</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-purple-950 text-2xl focus:outline-none"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* 🧭 বামপাশের স্ট্যান্ডার্ড সাইডবার (Lavender & Classy Theme) */}
      <aside className={`w-64 bg-[#f3e8ff] border-r border-purple-200/60 p-6 flex flex-col justify-between fixed h-full z-40 transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:static`}>
        <div className="space-y-8 mt-12 md:mt-0">
          
          {/* কোম্পানি ব্র্যান্ডিং */}
          <div className="flex items-center space-x-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-purple-600/20">
              R
            </div>
            <div>
              <h2 className="text-purple-950 font-black tracking-tight text-base leading-tight">Raisa Corporation</h2>
              <span className="text-[10px] text-purple-600 font-bold tracking-widest uppercase">Management Suite</span>
            </div>
          </div>

          {/* মেনু অপশনস */}
          <nav className="space-y-1">
            <button 
              onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition ${activeTab === 'overview' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/10' : 'text-purple-900/70 hover:bg-purple-200/50 hover:text-purple-950'}`}
            >
              <span className="text-base">📊</span>
              <span>Overview Dashboard</span>
            </button>

            <button 
              onClick={() => { setActiveTab('products'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition ${activeTab === 'products' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/10' : 'text-purple-900/70 hover:bg-purple-200/50 hover:text-purple-950'}`}
            >
              <span className="text-base">📦</span>
              <span>Products List</span>
            </button>

            <button 
              onClick={() => { setActiveTab('add-medicine'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition ${activeTab === 'add-medicine' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/10' : 'text-purple-900/70 hover:bg-purple-200/50 hover:text-purple-950'}`}
            >
              <span className="text-base">➕</span>
              <span>Add New Stock</span>
            </button>

            <button 
              onClick={() => { setActiveTab('orders'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition ${activeTab === 'orders' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/10' : 'text-purple-900/70 hover:bg-purple-200/50 hover:text-purple-950'}`}
            >
              <span className="text-base">📝</span>
              <span>Order Khata</span>
            </button>
          </nav>
        </div>

        {/* প্রোফাইল অ্যাডমিন প্যানেল */}
        <div className="border-t border-purple-200 pt-4 flex items-center space-x-3 px-2">
          <div className="w-10 h-10 rounded-full bg-purple-200 border border-purple-300 flex items-center justify-center text-purple-950 font-bold">
            LM
          </div>
          <div>
            <h4 className="text-sm font-bold text-purple-950 leading-none">Lamia</h4>
            <span className="text-[11px] text-purple-600/80 font-medium mt-1 block">System Administrator</span>
          </div>
        </div>
      </aside>

      {/* 🖥️ ডানপাশের মেইন কনটেন্ট এরিয়া (Off-White Background) */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto">
          
          {/* ১. শুরুতে দেখানোর জন্য স্ট্যান্ডার্ড ওভারভিউ ইন্টারফেস */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, Lamia</h1>
                <p className="text-sm text-slate-500 mt-1">Here is the latest corporate status of Raisa Corporation.</p>
              </div>

              {/* সামারি গ্রিড */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-xl text-purple-600">📦</div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-4">Total Active Items</p>
                  <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono">{totalProducts}</h3>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-xl text-amber-600">⚠️</div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-4">Critical Low Stocks</p>
                  <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono">{lowStockItems}</h3>
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-xl text-rose-600">🚫</div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-4">Out of Stock Items</p>
                  <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono">{outOfStockItems}</h3>
                </div>
              </div>

              {/* শর্টকাট প্যানেল কার্ড */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm">
                <h4 className="font-bold text-slate-900 text-lg">Quick Operations Control</h4>
                <p className="text-slate-500 text-sm mt-1">Easily jump to other corporate sectors from here.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <button onClick={() => setActiveTab('add-medicine')} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-purple-50/50 hover:border-purple-200 text-left transition font-semibold text-slate-800 text-sm flex items-center justify-between">
                    <span>Add New Corporate Stock</span> <span className="text-purple-600">➔</span>
                  </button>
                  <button onClick={() => setActiveTab('products')} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-purple-50/50 hover:border-purple-200 text-left transition font-semibold text-slate-800 text-sm flex items-center justify-between">
                    <span>Review Inventory Ledger</span> <span className="text-purple-600">➔</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && <MedicineList />}
          {activeTab === 'add-medicine' && <AddMedicine />}
          {activeTab === 'orders' && <OrderKhata />}
        </div>
      </main>

    </div>
  );
}