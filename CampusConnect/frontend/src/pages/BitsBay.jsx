import React, { useState } from 'react';
import { ShoppingBag, Plus, Search, X, CheckCircle, Camera } from 'lucide-react';

export default function BitsBay() {
  const [showListModal, setShowListModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const items = [
    { title: "Calculus Early Transcendentals", price: "AED 120", category: "Books", condition: "Good" },
    { title: "Arduino Uno Wifi", price: "AED 85", category: "Electronics", condition: "Like New" },
    { title: "Lab Coat & Safety Goggles", price: "AED 50", category: "Lab Gear", condition: "Used" },
    { title: "Casio FX-991EX Calculator", price: "AED 75", category: "Electronics", condition: "Like New" }
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex-1 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-10 bg-[#0A2540] text-white px-4 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-3">
          <CheckCircle size={20} className="text-green-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">BitsBay Marketplace</h1>
          <p className="text-slate-500 mt-1">Buy and sell student supplies easily.</p>
        </div>
        <button 
          onClick={() => setShowListModal(true)}
          className="bg-[#0070F3] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> List an Item
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-8 flex gap-4 shadow-sm">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input type="text" placeholder="Search for books, electronics..." className="w-full pl-10 pr-4 py-2 bg-[#F5F7FA] rounded-md outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
        </div>
        <select className="bg-[#F5F7FA] px-4 py-2 rounded-md outline-none text-slate-600 font-medium hidden sm:block">
          <option>All Categories</option>
          <option>Books</option>
          <option>Electronics</option>
          <option>Lab Gear</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className="h-40 bg-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 transition-colors">
              <ShoppingBag size={48} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{item.category}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded">{item.condition}</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-xl font-bold text-[#0A2540] mt-auto pt-3">{item.price}</p>
              <button 
                onClick={() => setShowContactModal(item)}
                className="w-full mt-4 bg-[#F5F7FA] text-[#0070F3] py-2 rounded-lg text-sm font-semibold hover:bg-[#0070F3] hover:text-white transition-colors border border-transparent shadow-sm"
              >
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* List an Item Modal */}
      {showListModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1.5 rounded-lg text-[#0070F3]"><Plus size={20} /></div>
                <h2 className="text-xl font-bold text-slate-800">List an Item</h2>
              </div>
              <button onClick={() => setShowListModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors mb-2">
                  <Camera size={32} className="mb-2 text-slate-400" />
                  <p className="text-sm font-medium">Upload Photos</p>
                  <p className="text-xs mt-1">Up to 4 images, max 5MB each</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Item Title</label>
                  <input type="text" placeholder="e.g. Intro to Algorithms Book" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (AED)</label>
                    <input type="number" placeholder="100" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Condition</label>
                    <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none bg-white">
                      <option>Brand New</option>
                      <option>Like New</option>
                      <option>Good</option>
                      <option>Used</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none bg-white">
                    <option>Books & Textbooks</option>
                    <option>Electronics</option>
                    <option>Lab Gear</option>
                    <option>Dorm Essentials</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea rows="3" placeholder="Describe the item, flaws, etc." className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none"></textarea>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50">
              <button 
                onClick={() => {
                  setShowListModal(false);
                  showToast('Item successfully listed on BitsBay!');
                }}
                className="w-full bg-[#0070F3] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                Post Listing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Seller Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <h2 className="text-xl font-bold text-slate-800">Contact Seller</h2>
              <button onClick={() => setShowContactModal(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-4 flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#0A2540]">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{showContactModal.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{showContactModal.price} • {showContactModal.condition}</p>
                </div>
              </div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea 
                rows="4" 
                defaultValue={`Hi, I'm interested in buying your ${showContactModal.title}. Is it still available?`}
                className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none"
              ></textarea>
            </div>
            <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50">
              <button 
                onClick={() => {
                  setShowContactModal(null);
                  showToast('Message sent to seller! They will contact you via email.');
                }}
                className="w-full bg-[#0070F3] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
