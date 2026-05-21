import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardHome from './DashboardHome';
import Networking from './Networking';
import BitsBay from './BitsBay';
import Events from './Events';
import LostFound from './LostFound';
import Profile from './Profile';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const currentUser = user || { name: 'Student', major: 'BITS Pilani', badges: [] };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome setActiveTab={setActiveTab} user={currentUser} />;
      case 'networking':
        return <Networking />;
      case 'bitsbay':
        return <BitsBay />;
      case 'events':
        return <Events />;
      case 'lostfound':
        return <LostFound />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardHome setActiveTab={setActiveTab} user={currentUser} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={`bg-[#0A2540] text-white hidden md:flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        {/* Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-8 bg-[#0070F3] text-white p-1 rounded-full shadow-md hover:bg-blue-600 transition-colors"
        >
          {isSidebarOpen ? '<' : '>'}
        </button>
        <div className={`p-6 flex items-center h-20 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
          {isSidebarOpen ? (
            <h2 className="text-2xl font-bold tracking-tight mb-1">BeBITS</h2>
          ) : (
            <h2 className="text-2xl font-bold tracking-tight">B</h2>
          )}
        </div>
        <nav className="flex-1 px-3 mt-4 flex flex-col gap-2">
          <button
            className={`p-3 ${activeTab === 'dashboard' ? 'bg-white/10' : ''}`} onClick={() => setActiveTab('dashboard')}
          >Dashboard</button>
          <button
            className={`p-3 ${activeTab === 'networking' ? 'bg-white/10' : ''}`} onClick={() => setActiveTab('networking')}
          >Networking</button>
          <button
            className={`p-3 ${activeTab === 'bitsbay' ? 'bg-white/10' : ''}`} onClick={() => setActiveTab('bitsbay')}
          >BitsBay</button>
          <button
            className={`p-3 ${activeTab === 'events' ? 'bg-white/10' : ''}`} onClick={() => setActiveTab('events')}
          >Events</button>
          <button
            className={`p-3 ${activeTab === 'lostfound' ? 'bg-white/10' : ''}`} onClick={() => setActiveTab('lostfound')}
          >Lost &amp; Found</button>
        </nav>
        <div className="p-4 border-t border-blue-900/50 flex flex-col items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('profile')}>
            <div className="bg-white/20 h-10 w-10 rounded-full flex items-center justify-center font-bold uppercase">
              {currentUser.name ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0,2) : 'S'}
            </div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm truncate">{currentUser.name}</p>
                <p className="text-xs text-blue-200 truncate">{currentUser.major}</p>
              </div>
            )}
          </div>
          <button
            onClick={logout}
            className={`mt-4 flex items-center justify-center py-2 rounded-lg text-sm font-medium text-red-300 hover:text-white hover:bg-red-500/20 transition-all border border-red-500/20 ${isSidebarOpen ? 'w-full gap-2 px-4' : 'w-10 h-10 p-0'}`}
          >Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-10 w-full">
          <h1 className="text-xl font-bold text-[#0A2540]">BeBITS</h1>
          <button className="text-slate-500" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>Menu</button>
        </header>
        {/* Page */}
        {renderContent()}
      </main>
    </div>
  );
}
