import React, { useState } from 'react';
import MedicineList from './components/MedicineList';
import OrderKhata from './components/OrderKhata';
import AddMedicine from './components/AddMedicine';

export default function App() {
  // কোন পেজ অ্যাক্টিভ থাকবে তা ট্র্যাক করার জন্য স্টেট
  const [activeTab, setActiveTab] = useState('products');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#09090b] font-sans antialiased">
      
      {/* 📱 মোবাইল স্ক্রিনের জন্য টপ বার */}
      <div className="md:hidden w-full bg-[#051c14] border-b border-emerald-950/30 p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <div className="flex items-center space-x-2">
          <span className="text-emerald-400 text-xl">🟢</span>
          <span className="text-white font-black tracking-tight text-lg">Raisa Pharma</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* 🧭 বামপাশের স্ট্যান্ডার্ড সাইডবার (ঠিক স্ক্রিনশটের মতো ডার্ক গ্রিন থিম) */}
      <aside className={`w-64 bg-[#051c14] text-slate-300 p-6 flex flex-col justify-between fixed h-full z-40 transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:static`}>
        <div className="space-y-8 mt-12 md:mt-0">
          
          {/* অ্যাপের নাম/লোগো */}
          <div className="flex items-center space-x-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-500/20">
              R
            </div>
            <div>
              <h2 className="text-white font-black tracking-tight text-lg leading-none">Raisa Pharma</h2>
              <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Inventory Pro</span>
            </div>
          </div>

          {/* নেভিগেশন অপশনসমূহ */}
          <nav className="space-y-1.5">
            <button 
              onClick={() => { setActiveTab('products'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition ${activeTab === 'products' ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10' : 'hover:bg-emerald-950/50 text-slate-400 hover:text-white'}`}
            >
              <span className="text-base">📦</span>
              <span>Products List</span>
            </button>

            <button 
              onClick={() => { setActiveTab('add-medicine'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition ${activeTab === 'add-medicine' ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10' : 'hover:bg-emerald-950/50 text-slate-400 hover:text-white'}`}
            >
              <span className="text-base">➕</span>
              <span>Add New Stock</span>
            </button>

            <button 
              onClick={() => { setActiveTab('orders'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition ${activeTab === 'orders' ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10' : 'hover:bg-emerald-950/50 text-slate-400 hover:text-white'}`}
            >
              <span className="text-base">📝</span>
              <span>Order Khata</span>
            </button>
          </nav>
        </div>

        {/* সাইডবারের নিচের ইউজার প্রোফাইল অংশ */}
        <div className="border-t border-emerald-950/60 pt-4 flex items-center space-x-3 px-2">
          <div className="w-10 h-10 rounded-full bg-emerald-900 border border-emerald-700/50 flex items-center justify-center text-white font-bold">
            LM
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-none">Lamia</h4>
            <span className="text-xs text-slate-500 font-mono mt-1 block">Admin Mode</span>
          </div>
        </div>
      </aside>

      {/* 🖥️ ডানপাশের মেইন কনটেন্ট এরিয়া (যেখানে পেজগুলো লোড হবে) */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'products' && <MedicineList />}
          {activeTab === 'add-medicine' && <AddMedicine />}
          {activeTab === 'orders' && <OrderKhata />}
        </div>
      </main>

    </div>
  );
}