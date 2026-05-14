import React, { useState } from 'react';
import AddMedicine from './components/AddMedicine';
import MedicineList from './components/MedicineList';
import OrderKhata from './components/OrderKhata';

function App() {
  const [screen, setScreen] = useState('welcome'); // welcome, home, add_stock, view_inventory, order_entry

  return (
    <div className="min-h-screen bg-black text-slate-100 antialiased font-sans">
      
      {/* 🚀 ল্যাভেন্ডার থিম স্প্ল্যাশ স্ক্রিন */}
      {screen === 'welcome' && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-neutral-950 via-black to-slate-950 px-4 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-25 animate-pulse"></div>
            <div className="relative bg-gradient-to-tr from-purple-400 to-indigo-500 p-6 rounded-3xl shadow-2xl">
              <span className="text-5xl block">💊</span>
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent mb-3">
            Raisa Corporation
          </h1>
          <p className="text-sm text-slate-400 max-w-xs font-medium mb-12">
            এন্টারপ্রাইজ ইনভেন্টরি ও অর্ডার ম্যানেজমেন্ট প্ল্যাটফর্ম 
          </p>
          <button 
            onClick={() => setScreen('home')}
            className="px-10 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl font-bold tracking-wide shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            ড্যাশবোর্ডে প্রবেশ করুন →
          </button>
        </div>
      )}

      {/* 📱 ড্যাশবোর্ড ইন্টারফেস */}
      {screen !== 'welcome' && (
        <>
          <header className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-neutral-900 px-6 py-5 mb-8">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setScreen('home')}>
                <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl">
                  <span className="text-xl">💊</span>
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                    Raisa Corporation
                  </h1>
                </div>
              </div>
              
              {screen !== 'home' && (
                <button 
                  onClick={() => setScreen('home')}
                  className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs font-bold px-5 py-2.5 rounded-xl text-purple-300 transition"
                >
                  🔙 মূল হোমপেজ
                </button>
              )}
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-6 pb-16">
            
            {/* 🏠 ৪টি প্রিমিয়াম অপশন বা গ্রিড */}
            {screen === 'home' && (
              <div className="space-y-8">
                <div className="bg-neutral-900/40 border border-neutral-900 p-8 rounded-3xl text-center">
                  <h2 className="text-2xl font-bold text-purple-200">সিস্টেম কন্ট্রোল প্যানেল</h2>
                  <p className="text-xs text-slate-500 mt-1.5">অ্যাপ্লিকেশনের মডিউলগুলো সিলেক্ট করুন</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button 
                    onClick={() => setScreen('add_stock')}
                    className="flex items-center p-6 bg-neutral-900/50 border border-neutral-850 rounded-2xl hover:border-purple-500/40 text-left transition group relative overflow-hidden"
                  >
                    <div className="bg-purple-500/10 p-4 rounded-xl text-2xl text-purple-400 mr-5 group-hover:scale-110 transition"><span>➕</span></div>
                    <div>
                      <h3 className="font-bold text-slate-200 text-lg">New Stock Entry</h3>
                      <p className="text-xs text-slate-400 mt-1">নতুন প্রোডাক্ট ইনভেন্টরিতে যুক্ত করুন</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setScreen('view_inventory')}
                    className="flex items-center p-6 bg-neutral-900/50 border border-neutral-850 rounded-2xl hover:border-purple-500/40 text-left transition group"
                  >
                    <div className="bg-purple-500/10 p-4 rounded-xl text-2xl text-purple-400 mr-5 group-hover:scale-110 transition"><span>📋</span></div>
                    <div>
                      <h3 className="font-bold text-slate-200 text-lg">Inventory Status</h3>
                      <p className="text-xs text-slate-400 mt-1">বর্তমান স্টকের বিবরণ ও লাইভ তালিকা</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setScreen('order_entry')}
                    className="flex items-center p-6 bg-neutral-900/50 border border-neutral-850 rounded-2xl hover:border-indigo-500/40 text-left transition group md:col-span-2"
                  >
                    <div className="bg-indigo-500/10 p-4 rounded-xl text-2xl text-indigo-400 mr-5 group-hover:scale-110 transition"><span>📝</span></div>
                    <div>
                      <h3 className="font-bold text-slate-200 text-lg">Order Entry & Tracking </h3>
                      <p className="text-xs text-slate-400 mt-1">নতুন কাস্টমার অর্ডার সাবমিশন ও লাইভ ট্র্যাকিং</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* স্ক্রিন লোডার মডিউল */}
            {screen === 'add_stock' && (
              <div className="bg-neutral-900/40 border border-neutral-900 rounded-3xl p-4 shadow-2xl">
                <AddMedicine />
              </div>
            )}

            {screen === 'view_inventory' && (
              <div className="bg-neutral-900/40 border border-neutral-900 rounded-3xl p-4 shadow-2xl">
                <MedicineList />
              </div>
            )}

            {screen === 'order_entry' && (
              <div className="bg-neutral-900/40 border border-neutral-900 rounded-3xl p-4 shadow-2xl">
                <OrderKhata />
              </div>
            )}

          </main>
        </>
      )}
    </div>
  );
}

export default App;