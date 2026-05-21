import React, { useState } from 'react';
import { Users, Mail, Plus, X, CheckCircle } from 'lucide-react';

export default function Networking() {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const peers = [
    { name: "Riya Patel", major: "Computer Science", year: "Junior", skills: ["Python", "Machine Learning"], match: "95%", bio: "Looking for a backend dev to partner on a hackathon." },
    { name: "Omar Al-Fayed", major: "Design", year: "Sophomore", skills: ["UI/UX Design", "Figma"], match: "88%", bio: "Open to UI design gigs for student projects." },
    { name: "Sara Khan", major: "Mechanical Eng", year: "Senior", skills: ["SolidWorks", "AutoCAD"], match: "70%", bio: "Working on a robotics prototype. Need collaborators." }
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex-1 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-10 bg-[#0A2540] text-white px-4 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-fade-in-up">
          <CheckCircle size={20} className="text-green-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Networking Directory</h1>
        <button 
          onClick={() => setShowStatusModal(true)}
          className="bg-[#0070F3] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Update Status
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {peers.map((peer, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-[#0A2540] font-bold text-lg">
                  {peer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{peer.name}</h3>
                  <p className="text-xs text-slate-500">{peer.major}</p>
                </div>
              </div>
              <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded">{peer.match} Match</span>
            </div>
            
            <p className="text-sm text-slate-600 line-clamp-2 min-h-[40px]">{peer.bio}</p>
            
            <div className="flex flex-wrap gap-2">
              {peer.skills.map(skill => (
                <span key={skill} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md">{skill}</span>
              ))}
            </div>

            <div className="flex gap-2 mt-auto pt-4">
              <button 
                onClick={() => setShowProfileModal(peer)}
                className="flex-1 bg-[#F5F7FA] text-[#0A2540] py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
              >
                View Profile
              </button>
              <button 
                onClick={() => showToast(`Connection request sent to ${peer.name}!`)}
                className="flex-1 bg-[#0070F3] text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={16} /> Connect
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Update Status</h2>
              <button onClick={() => setShowStatusModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">What are you looking for?</label>
              <textarea 
                className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none"
                rows="4"
                placeholder="e.g. Looking for a frontend developer for an upcoming hackathon..."
              ></textarea>
              <label className="block text-sm font-medium text-slate-700 mt-4 mb-2">Add new skills</label>
              <input type="text" placeholder="e.g. React, Node.js" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
              
              <button 
                onClick={() => {
                  setShowStatusModal(false);
                  showToast('Networking status updated successfully!');
                }}
                className="w-full mt-6 bg-[#0A2540] text-white py-3 rounded-xl font-bold hover:bg-[#113a64] transition-colors"
              >
                Save Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-[#0A2540] relative">
              <button onClick={() => setShowProfileModal(null)} className="absolute top-4 right-4 bg-black/20 text-white p-1 rounded-full hover:bg-black/40"><X size={20} /></button>
            </div>
            <div className="px-6 pb-6 relative">
              <div className="h-20 w-20 bg-[#0070F3] text-white rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white -mt-10 mb-4 shadow-sm">
                {showProfileModal.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{showProfileModal.name}</h2>
              <p className="text-slate-500 text-sm mb-4">{showProfileModal.year} • {showProfileModal.major}</p>
              
              <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-100">
                <h4 className="text-xs font-bold text-[#0070F3] uppercase mb-1">Current Status</h4>
                <p className="text-slate-700 text-sm">{showProfileModal.bio}</p>
              </div>

              <h4 className="text-sm font-bold text-slate-800 mb-2">Top Skills</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {showProfileModal.skills.map(skill => (
                  <span key={skill} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">{skill}</span>
                ))}
              </div>

              <button 
                onClick={() => {
                  showToast(`Connection request sent to ${showProfileModal.name}!`);
                  setShowProfileModal(null);
                }}
                className="w-full bg-[#0070F3] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={18} /> Connect with {showProfileModal.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
