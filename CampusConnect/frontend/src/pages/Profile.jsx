import React, { useState } from 'react';
import { Briefcase, Award, BookOpen, Plus, Settings, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Fallback if user is null during transition
  const currentUser = user || {
    name: "Student",
    major: "BITS Pilani",
    skills: [],
    roles: [],
    badges: [],
    openToCollaborate: true
  };

  // Simulate default data if empty (for demo purposes)
  const bio = currentUser.bio || "Passionate student at BITS Pilani Dubai Campus.";
  const year = currentUser.year || "Junior";
  const skills = currentUser.skills?.length > 0 ? currentUser.skills : ["React", "Node.js", "Python"];
  const roles = currentUser.roles?.length > 0 ? currentUser.roles : [
    { id: 1, title: "Data Structures Mentor", organization: "CS Dept", category: "Academics" }
  ];

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full flex-1 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-10 bg-[#0A2540] text-white px-4 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-3">
          <CheckCircle size={20} className="text-green-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="h-40 bg-gradient-to-r from-blue-600 to-[#0A2540]"></div>
        <div className="px-8 pb-8 relative">
          <div className="flex justify-between items-end -mt-16 mb-4">
            <div className="h-32 w-32 bg-white rounded-full p-2">
              <div className="h-full w-full bg-gradient-to-br from-[#0070F3] to-blue-400 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-inner">
                {currentUser.name ? currentUser.name.split(' ').map(n=>n[0]).join('').substring(0,2) : 'S'}
              </div>
            </div>
            <button 
              onClick={() => setShowEditModal(true)}
              className="bg-white border text-slate-700 border-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Settings size={18} /> Edit Profile
            </button>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-800">{currentUser.name}</h1>
            {currentUser.openToCollaborate && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><CheckCircle size={14}/> Open to Collaborate</span>}
          </div>
          <p className="text-slate-500 mt-1">{year} • B.E. {currentUser.major}</p>
          <p className="mt-4 text-slate-700 max-w-2xl">{bio}</p>
          <div className="flex gap-2 mt-4">
            {skills.map((skill, i) => (
              <span key={i} className="bg-blue-50 text-[#0070F3] text-xs font-bold px-3 py-1 rounded-full border border-blue-100">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Briefcase size={24} className="text-[#0070F3]" /> Campus Roles & Experiences
          </h2>
          <button 
            onClick={() => setShowRoleModal(true)}
            className="text-[#0070F3] flex items-center gap-1 font-medium hover:underline bg-blue-50 px-3 py-1.5 rounded-lg"
          >
            <Plus size={18} /> Add Role
          </button>
        </div>
        
        <div className="flex flex-col gap-6">
          {roles.map((role) => (
            <div key={role.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100 group">
              <div className="h-12 w-12 bg-[#F5F7FA] rounded-lg flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-blue-50 group-hover:text-[#0070F3] transition-colors">
                {role.category === 'Academics' ? <BookOpen size={24} /> : <Award size={24} />}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-800">{role.title}</h3>
                <p className="text-[#0070F3] font-medium">{role.organization}</p>
                <span className="inline-block mt-2 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {role.category}
                </span>
              </div>
              <button className="text-slate-400 hover:text-[#0070F3] font-medium text-sm">Edit</button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <h2 className="text-xl font-bold text-slate-800">Edit Profile</h2>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" defaultValue={currentUser.name} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                  <textarea rows="3" defaultValue={bio} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Skills (comma separated)</label>
                  <input type="text" defaultValue={skills.join(', ')} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="collab" defaultChecked={currentUser.openToCollaborate} className="h-4 w-4 text-[#0070F3] rounded border-slate-300" />
                  <label htmlFor="collab" className="text-sm font-medium text-slate-700">Open to Collaborate on Projects</label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50">
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  showToast('Profile updated successfully!');
                }}
                className="w-full bg-[#0070F3] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <h2 className="text-xl font-bold text-slate-800">Add Campus Role</h2>
              <button onClick={() => setShowRoleModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role Title</label>
                  <input type="text" placeholder="e.g. Club Secretary" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Organization / Club</label>
                  <input type="text" placeholder="e.g. Photography Club" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#0070F3] outline-none bg-white">
                    <option>Club</option>
                    <option>Academics</option>
                    <option>Sports</option>
                    <option>Event Core</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50">
              <button 
                onClick={() => {
                  setShowRoleModal(false);
                  showToast('New role added to your profile!');
                }}
                className="w-full bg-[#0A2540] text-white py-3 rounded-xl font-bold hover:bg-[#113a64] transition-colors"
              >
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
