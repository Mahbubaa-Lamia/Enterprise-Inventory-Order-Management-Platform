import React, { useState } from 'react';
import MedicineList from './components/MedicineList';
import AddMedicine from './components/AddMedicine';
import OrderKhata from './components/OrderKhata';

export default function App() {
  // কোন স্ক্রিন ওপen থাকবে সেটা ট্র্যাক করার জন্য (Default: dashboard)
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      
      {/* 🧭 সাইডবার (30% - Slate Dark Blue) */}
      <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col justify-between shadow-xl">
        <div>
          {/* ব্র্যান্ড লোগো ও নাম */}
          <div className="p-6 border-b border-slate-800 bg-[#090d16] flex items-center space-x-3">
            <span className="text-2xl">💊</span>
            <div>
              <h1 className="font-black text-white tracking-wide text-sm uppercase">Raisa Corp.</h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wider">Enterprise Platform</p>
            </div>
          </div>

          {/* নেভিগেশন মেনু */}
          <nav className="p-4 space-y-2 mt-4">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === 'dashboard' ? 'bg-[#0EA5E9] text-white shadow-lg shadow-sky-500/20' : 'hover:bg-slate-800/60 hover:text-white'}`}
            >
              <span>📊</span> <span>Enterprise Dashboard</span>
            </button>

            <button 
              onClick={() => setActiveTab('add')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === 'add' ? 'bg-[#0EA5E9] text-white shadow-lg shadow-sky-500/20' : 'hover:bg-slate-800/60 hover:text-white'}`}
            >
              <span>➕</span> <span>Add New Stock</span>
            </button>

            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === 'orders' ? 'bg-[#0EA5E9] text-white shadow-lg shadow-sky-500/20' : 'hover:bg-slate-800/60 hover:text-white'}`}
            >
              <span>📝</span> <span>Order Dispatch & Log</span>
            </button>
          </nav>
        </div>

        {/* সাইডবার ফুটার */}
        <div className="p-4 border-t border-slate-800 text-center text-xs text-slate-500 font-medium">
          v2.0 • Live Cloud Connection
        </div>
      </aside>

      {/* 🖥️ মেইন কন্টেন্ট এরিয়া (60% - Slate Light Gray) */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* টপ গ্লোবাল হেডার */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
              System Active
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-500">Connected to MongoDB Atlas</span>
          </div>
        </header>

        {/* ডাইনামিক পেজ রেন্ডারিং */}
        <div className="p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <MedicineList />}
          {activeTab === 'add' && <AddMedicine />}
          {activeTab === 'orders' && <OrderKhata />}
        </div>
      </main>

    </div>
  );
}