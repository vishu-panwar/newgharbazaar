import { useState, useEffect } from 'react';
import { 
  FileCheck, Home, Ticket, Users, RefreshCw, Sparkles, CheckCircle2 
} from 'lucide-react';

// ─── Hook: read user from localStorage (same source as Navbar.jsx) ──────────
function useEmployeeProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) setProfile(JSON.parse(saved));
    } catch {
      // corrupted entry — ignore
    }
  }, []);

  return { profile };
}

// ─── Main component ─────────────────────────────────────────────────────────
export default function EmployeeDashboard() {
  const [isRefreshing, setIsRefreshing]       = useState(false);
  const [currentTime, setCurrentTime]         = useState(new Date());
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  // ── Dynamic employee data ──────────────────────────────────────────────
  const { profile } = useEmployeeProfile();

  // Derive a friendly first name for the greeting sub-text
  const displayName = profile?.name || profile?.fullName || profile?.username || profile?.firstName || "User";
  const firstName    = displayName ? displayName.split(' ')[0] : null;

  const adminNotices = [
    { id: 1, type: 'Announcement', text: "Mandatory all-hands meeting tomorrow at 10 AM.", color: "bg-blue-500 text-blue-700 bg-blue-50/50" },
    { id: 2, type: 'Alert',        text: "System maintenance scheduled for Sunday 2 AM.",  color: "bg-red-500 text-red-700 bg-red-50/50" },
    { id: 3, type: 'Reminder',     text: "Shift timings will change starting next Monday.", color: "bg-amber-500 text-amber-700 bg-amber-50/50" },
    { id: 4, type: 'Welcome',      text: "Welcome our new team members to the support desk!", color: "bg-emerald-500 text-emerald-700 bg-emerald-50/50" }
  ];

  useEffect(() => {
    const clockTimer  = setInterval(() => setCurrentTime(new Date()), 1000);
    const noticeTimer = setInterval(() => {
      setCurrentNoticeIndex(prev => (prev + 1) % adminNotices.length);
    }, 4000);
    return () => {
      clearInterval(clockTimer);
      clearInterval(noticeTimer);
    };
  }, [adminNotices.length]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex flex-col gap-6 pb-8 w-full">
      
      {/* ── TOP HEADER SECTION ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Employee Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Moderation, support, and referral operations overview
          </p>
        </div>
        <button 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 cursor-pointer" 
          onClick={handleRefresh}
        >
          <RefreshCw size={16} className={`text-gray-500 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* ── GREETING BANNER ── */}
      <div className="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-br from-purple-50 via-indigo-50/50 to-emerald-50/30 border border-purple-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex-1 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100/80 border border-purple-200 text-purple-700 text-xs font-bold rounded-full">
            <Sparkles size={13} /> Operation Center
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
            Welcome Back,<br />
            {/* ── Dynamic name from localStorage (same user object as Navbar) ── */}
            <span className="text-purple-600">{displayName}</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-md leading-relaxed">
            Here's what's happening with your operations today, {firstName}. You have 2 open tickets and 0 pending KYC requests.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm hover:shadow transition duration-150 cursor-pointer">
              View Open Tickets
            </button>
            <button className="px-4 py-2.5 bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50 text-sm font-bold rounded-xl transition duration-150 cursor-pointer">
              Check Properties
            </button>
          </div>
        </div>
        
        {/* ── OFFICE CLOCK & NOTICES WIDGET ── */}
        <div className="w-full md:w-[320px] bg-white/70 backdrop-blur-md border border-white rounded-2xl p-5 shadow-md flex flex-col gap-1 relative z-10 shrink-0">
          <div className="text-3xl font-black text-purple-600 tracking-wider leading-none">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          
          <div className="relative h-[68px] border-t border-dashed border-purple-100 pt-3 mt-1">
            {adminNotices.map((notice, idx) => (
              <div 
                key={notice.id} 
                className={`absolute top-3 left-0 w-full transition-all duration-500 ease-in-out ${
                  currentNoticeIndex === idx 
                    ? "opacity-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 translate-y-1 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ring-4 ${notice.color.split(' ')[0]} ring-white`} />
                  <strong className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {notice.type}
                  </strong>
                </div>
                <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">
                  {notice.text}
                </p>
              </div>
            ))}
            <div className="absolute bottom-0 left-0 flex gap-1.5">
              {adminNotices.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    currentNoticeIndex === idx ? "w-3 bg-purple-600" : "w-1 bg-gray-300"
                  }`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4 CARDS STATS GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-purple-300 transition-all duration-200 flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <FileCheck size={22} />
            </div>
            <div className="px-2.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full tracking-wide uppercase">Clear</div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-500 tracking-tight">Pending KYC</h3>
            <p className="text-3xl font-extrabold text-gray-900 mt-0.5">0</p>
          </div>
          <button className="w-full text-center py-2 px-3 bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white text-xs font-bold rounded-lg border border-purple-100 hover:border-purple-600 transition duration-150 cursor-pointer">
            Review Now
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-purple-300 transition-all duration-200 flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Home size={22} />
            </div>
            <div className="px-2.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full tracking-wide uppercase">Clear</div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-500 tracking-tight">Pending Properties</h3>
            <p className="text-3xl font-extrabold text-gray-900 mt-0.5">0</p>
          </div>
          <button className="w-full text-center py-2 px-3 bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white text-xs font-bold rounded-lg border border-purple-100 hover:border-purple-600 transition duration-150 cursor-pointer">
            Verify All
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-purple-300 transition-all duration-200 flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Ticket size={22} />
            </div>
            <div className="px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full tracking-wide uppercase">Action Req</div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-500 tracking-tight">Open Tickets</h3>
            <p className="text-3xl font-extrabold text-gray-900 mt-0.5">2</p>
          </div>
          <button className="w-full text-center py-2 px-3 bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white text-xs font-bold rounded-lg border border-purple-100 hover:border-purple-600 transition duration-150 cursor-pointer">
            Resolve
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-purple-300 transition-all duration-200 flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users size={22} />
            </div>
            <div className="px-2.5 py-0.5 bg-sky-500 text-white text-[10px] font-bold rounded-full tracking-wide uppercase">New Leads</div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-500 tracking-tight">Referral Leads</h3>
            <p className="text-3xl font-extrabold text-gray-900 mt-0.5">34</p>
          </div>
          <button className="w-full text-center py-2 px-3 bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white text-xs font-bold rounded-lg border border-purple-100 hover:border-purple-600 transition duration-150 cursor-pointer">
            View Leads
          </button>
        </div>
      </div>

      {/* ── BOTTOM SPLIT GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner mb-4">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Pending KYC</h3>
            <p className="text-sm text-gray-500 max-w-sm">No pending KYC requests. You're all caught up!</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner mb-4">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Pending Property Verification</h3>
            <p className="text-sm text-gray-500 max-w-sm">No pending properties to verify. Great job!</p>
          </div>
        </div>

        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm h-full">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Ticket Operations</h2>
              <button className="px-3 py-1.5 bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white text-xs font-bold rounded-lg transition duration-200 cursor-pointer">
                View All
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-xl transition duration-150 group">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Ticket size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Active Tickets</span>
                </div>
                <div className="px-3 py-0.5 bg-amber-100 text-amber-800 text-sm font-bold rounded-full">2</div>
              </div>
              
              <div className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-xl transition duration-150 group">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Resolved Today</span>
                </div>
                <div className="px-3 py-0.5 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full">0</div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-xl transition duration-150 group">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Users size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Total Assigned</span>
                </div>
                <div className="px-3 py-0.5 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">12</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}