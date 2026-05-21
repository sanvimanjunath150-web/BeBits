import React, { useState } from 'react';
import { Calendar, MapPin, CheckSquare, Plus, X, CheckCircle, ExternalLink } from 'lucide-react';

export default function Events() {
  const [showHostModal, setShowHostModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Convert state to manage registrations
  const [events, setEvents] = useState([
    { id: 1, title: "HackTheVerse 2026", date: "April 24", time: "09:00 AM", location: "Innovation Lab", category: "Hackathon", registered: true },
    { id: 2, title: "Robotics Club Meet", date: "April 26", time: "05:00 PM", location: "Room 203", category: "Club Meet", registered: false },
    { id: 3, title: "Jashn 2026 - Cultural Fest", date: "May 10", time: "06:00 PM", location: "Campus Auditorium", category: "Festival", registered: false, isExternal: true, link: "https://jashn.bitsdubaievents.com" },
    { id: 4, title: "AI Workshop by Google GDG", date: "April 28", time: "02:00 PM", location: "Computer Lab 4", category: "Workshop", registered: true }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const toggleRegistration = (id, isExternal, link) => {
    if (isExternal && link) {
      window.open(link, '_blank');
      return;
    }
    setEvents(events.map(ev => {
      if (ev.id === id) {
        const newStatus = !ev.registered;
        if (newStatus) showToast(`Successfully registered for ${ev.title}!`);
        return { ...ev, registered: newStatus };
      }
      return ev;
    }));
  };

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
          <h1 className="text-3xl font-bold text-slate-800">Campus Events</h1>
          <p className="text-slate-500 mt-1">Discover what's happening around you.</p>
        </div>
        <button 
          onClick={() => setShowHostModal(true)}
          className="bg-[#0070F3] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Host Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col items-center justify-center bg-blue-50 text-[#0070F3] rounded-lg p-2 min-w-[60px] border border-blue-100">
                <span className="text-xs font-bold uppercase">{event.date.split(' ')[0]}</span>
                <span className="text-xl font-bold leading-tight">{event.date.split(' ')[1]}</span>
              </div>
              <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">{event.category}</span>
            </div>
            
            <h3 className="font-bold text-lg text-slate-800 mb-2">{event.title}</h3>
            
            <div className="flex flex-col gap-2 mt-auto pt-2">
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" /> {event.time}
              </p>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <MapPin size={16} className="text-slate-400" /> {event.location}
              </p>
            </div>

            <button 
              onClick={() => toggleRegistration(event.id, event.isExternal, event.link)}
              className={`w-full mt-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${event.isExternal ? 'bg-[#0A2540] text-white hover:bg-slate-800 shadow-sm' : event.registered ? 'bg-green-50 text-green-600 border border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 group' : 'bg-[#0070F3] text-white hover:bg-blue-600 shadow-sm'}`}
            >
              {event.isExternal ? (
                <><ExternalLink size={16} /> Visit Website</>
              ) : event.registered ? (
                <><CheckSquare size={16} className="group-hover:hidden" /><X size={16} className="hidden group-hover:block" /> <span className="group-hover:hidden">Registered</span><span className="hidden group-hover:block">Cancel</span></>
              ) : (
                'Register Now'
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Host Event Modal */}
      {showHostModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <h2 className="text-xl font-bold text-slate-800">Host an Event</h2>
              <button onClick={() => setShowHostModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
                  <input type="text" placeholder="e.g. Intro to React Workshop" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <input type="date" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                    <input type="time" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                  <input type="text" placeholder="e.g. Room 203" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none bg-white">
                    <option>Workshop</option>
                    <option>Club Meet</option>
                    <option>Hackathon</option>
                    <option>Festival</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50">
              <button 
                onClick={() => {
                  setShowHostModal(false);
                  showToast('Your event has been submitted for review!');
                }}
                className="w-full bg-[#0070F3] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                Submit Event
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
