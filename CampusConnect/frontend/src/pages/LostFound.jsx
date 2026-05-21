import React, { useState } from 'react';
import { Search, Plus, MapPin, Calendar, CheckCircle, AlertCircle, X, Camera } from 'lucide-react';

export default function LostFound() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showFoundModal, setShowFoundModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const lostAndFoundItems = [
    { id: 1, item: "Apple AirPods Pro", type: "lost", location: "Library 1st Floor", date: "April 24, 2026", status: "Searching", isFound: false, desc: "Left them on the third desk from the entrance around 2 PM." },
    { id: 2, item: "Blue Hydro Flask", type: "found", location: "F-Block Lecture Hall", date: "April 23, 2026", status: "Ready for Pickup", isFound: true, desc: "Found under the last row in F-102. Handed over to security." },
    { id: 3, item: "Casio Calculator FX-991", type: "lost", location: "Cafeteria", date: "April 20, 2026", status: "Returned", isFound: true, desc: "Lost near the Subway counter during lunch hour." }
  ];

  const filteredItems = lostAndFoundItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex-1 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-10 bg-[#0A2540] text-white px-4 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-3">
          <CheckCircle size={20} className="text-green-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Lost & Found</h1>
          <p className="text-slate-500 mt-1">Report lost items or see what the university has found.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setShowFoundModal(true)}
            className="flex-1 md:flex-none bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Search size={18} className="text-green-500" /> I Found Something
          </button>
          <button 
            onClick={() => setShowReportModal(true)}
            className="flex-1 md:flex-none bg-[#0070F3] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus size={18} /> Report Lost Item
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 bg-slate-100 p-1 flex-inline w-max rounded-lg">
        <FilterBtn label="All Items" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
        <FilterBtn label="Reported Lost" active={activeFilter === 'lost'} onClick={() => setActiveFilter('lost')} />
        <FilterBtn label="Found by Campus" active={activeFilter === 'found'} onClick={() => setActiveFilter('found')} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((req) => (
          <div key={req.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${req.type === 'found' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            
            <div className="flex justify-between items-start pl-3 mb-3">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${req.type === 'found' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {req.type === 'found' ? 'Found Item' : 'Lost Item'}
                </span>
                <h3 className="font-bold text-lg text-slate-800">{req.item}</h3>
              </div>
              <div className="text-right">
                <span className={`flex items-center gap-1.5 text-xs font-bold ${req.status === 'Searching' ? 'text-amber-600' : 'text-green-600'}`}>
                  {req.status === 'Searching' ? <AlertCircle size={14}/> : <CheckCircle size={14}/>} 
                  {req.status}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 pl-3 mb-4">{req.desc}</p>
            
            <div className="flex flex-col sm:flex-row gap-3 pl-3 pt-4 border-t border-slate-100 mt-auto">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded font-medium">
                <MapPin size={14} className="text-slate-400" /> {req.location}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded font-medium">
                <Calendar size={14} className="text-slate-400" /> {req.date}
              </span>
            </div>

            <button 
              onClick={() => showToast(req.isFound ? 'Redirecting to claim portal...' : 'Contacting owner...')}
              className={`mt-5 mx-3 py-2 rounded-lg text-sm font-semibold transition-colors border ${req.isFound ? 'bg-white border-green-200 text-green-600 hover:bg-green-50' : 'bg-[#0070F3] border-transparent text-white hover:bg-blue-600'}`}
            >
              {req.isFound ? 'Claim Item / Updates' : 'Provide Details'}
            </button>
          </div>
        ))}
      </div>

      {/* Report Lost Item Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 p-1.5 rounded-lg text-amber-600"><AlertCircle size={20} /></div>
                <h2 className="text-xl font-bold text-slate-800">Report Lost Item</h2>
              </div>
              <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
                  <input type="text" placeholder="e.g. Apple AirPods Pro" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Seen Location</label>
                  <input type="text" placeholder="e.g. Library 1st Floor" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date Lost</label>
                  <input type="date" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description & Identifying Marks</label>
                  <textarea rows="3" placeholder="Describe the item, colors, stickers, etc." className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none"></textarea>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50">
              <button 
                onClick={() => {
                  setShowReportModal(false);
                  showToast('Lost item reported. We will notify you if someone finds it.');
                }}
                className="w-full bg-[#0070F3] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Found Item Modal */}
      {showFoundModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-1.5 rounded-lg text-green-600"><CheckCircle size={20} /></div>
                <h2 className="text-xl font-bold text-slate-800">I Found Something</h2>
              </div>
              <button onClick={() => setShowFoundModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors mb-2">
                  <Camera size={32} className="mb-2 text-slate-400" />
                  <p className="text-sm font-medium">Upload a photo of the item</p>
                  <p className="text-xs mt-1">JPEG or PNG under 5MB</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">What did you find?</label>
                  <input type="text" placeholder="e.g. Water Bottle" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Where did you find it?</label>
                  <input type="text" placeholder="e.g. Near the main entrance" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Did you hand it over to security?</label>
                  <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none bg-white">
                    <option>Yes, given to Main Gate Security</option>
                    <option>Yes, given to Library Desk</option>
                    <option>No, I currently have it</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50">
              <button 
                onClick={() => {
                  setShowFoundModal(false);
                  showToast('Thank you! The item has been logged in the system.');
                }}
                className="w-full bg-[#0070F3] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                Submit Found Item
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const FilterBtn = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${active ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`}>
    {label}
  </button>
);
