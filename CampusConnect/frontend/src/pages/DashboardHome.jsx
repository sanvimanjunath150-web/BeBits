import React from 'react';
import { BookOpen, Calendar, Users, ShoppingBag, Plus, Bell, MessageSquare, Menu, LayoutDashboard, Search, CheckCircle } from 'lucide-react';
import SupabaseDemo from '../components/SupabaseDemo';

const DashboardHome = ({ setActiveTab, user }) => {

  const upcomingEvents = [
    { title: "HackTheVerse 2026", date: "April 24", time: "09:00 AM", location: "Innovation Lab", category: "Hackathon" },
    { title: "Robotics Club Meet", date: "April 26", time: "05:00 PM", location: "Room 203", category: "Club Meet" }
  ];

  const bitsBayItems = [
    { title: "Calculus Early Transcendentals", price: "AED 120", category: "Books" },
    { title: "Arduino Uno Wifi", price: "AED 85", category: "Electronics" }
  ];

  const networkSuggestions = [
    { name: "Riya Patel", skills: ["Python", "Machine Learning"], match: "95%" },
    { name: "Omar Al-Fayed", skills: ["UI/UX Design", "Figma"], match: "88%" }
  ];

  const lostAndFound = [
    { item: "Apple AirPods Pro", location: "Library 1st Floor", status: "Searching", isFound: false },
    { item: "Blue Hydro Flask", location: "F-Block Lecture Hall", status: "Found at Campus", isFound: true }
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex-1">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 mt-1">Here's what's happening at BITS Pilani Dubai today.</p>
        </div>
        <div className="hidden md:flex gap-3">
          <button className="p-2 rounded-full bg-white text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"><MessageSquare size={20} /></button>
          <button className="p-2 rounded-full bg-white text-slate-600 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Profile & Quick Status */}
      <section className="bg-white rounded-2xl p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 transform transition hover:-translate-y-1 hover:shadow-lg duration-300">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 bg-gradient-to-br from-[#0070F3] to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {user.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-semibold text-slate-800">{user.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#0070F3] border border-blue-100">
                {user.badges[0]}
              </span>
            </div>
            <p className="text-slate-500 text-sm">B.E. {user.major}</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:items-end gap-2 pr-2">
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${user.openToCollaborate ? 'bg-green-500' : 'bg-slate-300'}`}></div>
            <span className="text-sm font-medium text-slate-600">
              {user.openToCollaborate ? 'Open to Collaborate' : 'Not Looking'}
            </span>
          </div>
          <button onClick={() => setActiveTab('profile')} className="text-sm text-[#0070F3] font-medium hover:underline">
            Edit Profile
          </button>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20 md:pb-8 auto-rows-[minmax(180px,auto)]">
        
        {/* Events Widget (Large Bento Block) */}
        <div className="bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 p-6 flex flex-col md:col-span-2 lg:col-span-2 lg:row-span-2 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
              <Calendar size={22} className="text-[#0070F3]" /> Upcoming Events
            </h3>
            <button onClick={() => setActiveTab('events')} className="text-slate-400 hover:text-[#0070F3] transition-colors"><Plus size={24}/></button>
          </div>
          
          <div className="flex flex-col gap-4 flex-1">
            {upcomingEvents.map((event, i) => (
              <div key={i} onClick={() => setActiveTab('events')} className="group p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-100 transition-all cursor-pointer h-full flex flex-col justify-center">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-white rounded-md text-xs font-bold text-[#0A2540] shadow-sm border border-slate-200 tracking-wide uppercase">{event.category}</span>
                  <span className="text-sm font-bold text-[#0070F3]">{event.date}</span>
                </div>
                <h4 className="font-bold text-lg text-slate-800 group-hover:text-[#0A2540] mb-2">{event.title}</h4>
                <p className="text-sm text-slate-500 flex items-center gap-2 font-medium"><BookOpen size={14} className="text-slate-400" /> {event.location} • {event.time}</p>
                <button className="mt-4 w-full py-2.5 text-sm font-bold text-white bg-[#0070F3] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Networking Widget (Tall Bento Block) */}
        <div className="bg-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 p-6 flex flex-col md:col-span-1 lg:col-span-1 lg:row-span-2 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-slate-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
              <Users size={20} className="text-[#0070F3]" /> Network
            </h3>
          </div>
          
          <div className="flex flex-col gap-4 flex-1">
            {networkSuggestions.map((peer, i) => (
              <div key={i} onClick={() => setActiveTab('networking')} className="flex flex-col p-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-blue-100 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-[#0A2540] font-bold text-lg">
                    {peer.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{peer.name}</h4>
                    <p className="text-xs text-[#0070F3] font-bold mt-0.5 tracking-wide">{peer.match} Match</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mb-3">
                  {peer.skills.map(skill => <span key={skill} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{skill}</span>)}
                </div>
                <button className="w-full text-xs font-bold text-[#0070F3] bg-blue-50 group-hover:bg-blue-100 py-2 rounded-lg transition-colors mt-auto">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BitsBay Widget (Wide Bento Block) */}
        <div className="bg-[#0A2540] text-white rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.05)] border border-blue-900 p-6 flex flex-col md:col-span-3 lg:col-span-1 lg:row-span-1 hover:shadow-lg transition-shadow relative overflow-hidden group cursor-pointer" onClick={() => setActiveTab('bitsbay')}>
          <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <ShoppingBag size={120} />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
              <ShoppingBag size={20} className="text-blue-300" /> BitsBay
            </h3>
            <p className="text-blue-200 text-sm mb-6 max-w-[200px]">Grab student deals before they are gone.</p>
            
            <div className="mt-auto flex flex-col gap-3">
              {bitsBayItems.slice(0,1).map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 mb-1 block">{item.category}</span>
                  <h4 className="font-semibold text-sm line-clamp-1">{item.title}</h4>
                  <p className="text-lg font-bold text-white mt-1">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lost & Found Widget (Standard Bento Block) */}
        <div className="bg-amber-50 rounded-3xl shadow-[0px_4px_24px_rgba(0,0,0,0.02)] border border-amber-100 p-6 flex flex-col md:col-span-3 lg:col-span-1 lg:row-span-1 hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setActiveTab('lostfound')}>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
              <Search size={20} className="text-amber-600" /> Lost & Found
            </h3>
          </div>
          
          <div className="flex flex-col gap-3 flex-1">
            {lostAndFound.slice(0,2).map((request, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white shadow-sm border border-amber-100/50 flex flex-col gap-1 transition-colors">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{request.item}</h4>
                  {request.isFound && <CheckCircle size={14} className="text-green-500 shrink-0" />}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate w-32">{request.location}</p>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${request.isFound ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
