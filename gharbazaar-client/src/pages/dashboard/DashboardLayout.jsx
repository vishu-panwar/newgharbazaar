import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Heart,
  CreditCard,
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Shield,
  FileSignature,
  MessageSquare,
  Loader2,
  Building,
  List,
  Gift,
} from "lucide-react";
import axios from "axios";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user?.fullName?.trim()?.charAt(0)?.toUpperCase() || "U";
  const [loading, setLoading] = useState(false);

  const mainMenuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/dashboard/list-property", icon: Building, label: "List Property" },
    { path: "/dashboard/my-listings", icon: List, label: "My Listings" },
    { path: "/dashboard/favorites", icon: Heart, label: "Favorites" },
    { path: "/dashboard/payments", icon: CreditCard, label: "Payments" },
    { path: "/dashboard/refer-earn", icon: Gift, label: "Refer & Earn" },
  ];

  const systemMenuItems = [
    { path: "/dashboard/profile", icon: User, label: "Profile" },
    { path: "/dashboard/kyc-verification", icon: Shield, label: "KYC Verification" },
    { path: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  // rest of the code unchanged...

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      setLoading(true)
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/logout`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error("Logout request failed", err);
    } finally {
      setLoading(false)
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>

        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <User size={20} />
        </div>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-[220px] shrink-0
          bg-white border-r border-gray-200
          flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* SIDEBAR HEADER - Logo Only */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 text-decoration-none">
            <div className="w-8 h-8 bg-[#1f9d55] rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-base font-black text-[#1f9d55] leading-none">Ghar</span>
                <span className="text-base font-black text-[#1f9d55] leading-none">Bazaar</span>
                <span className="text-[10px] font-bold text-[#1f9d55] leading-none">.in</span>
              </div>
            </div>
          </Link>

          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* MAIN MENU */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Main Menu
            </h3>
            <div className="space-y-1">
              {mainMenuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3
                      px-3 py-2.5 rounded-lg
                      text-[13px] font-semibold
                      transition-all duration-200
                      ${
                        active
                          ? "bg-[#1f9d55] text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <item.icon size={18} strokeWidth={2} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SYSTEM */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
              System
            </h3>
            <div className="space-y-1">
              {systemMenuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3
                      px-3 py-2.5 rounded-lg
                      text-[13px] font-semibold
                      transition-all duration-200
                      ${
                        active
                          ? "bg-[#1f9d55] text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <item.icon size={18} strokeWidth={2} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* FOOTER - User Profile */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user.fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-gray-600">{firstLetter}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-gray-900 truncate">
                {user?.fullName || "User"}
              </h3>
              <p className="text-[10px] text-gray-500 truncate">Super Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
              title="Logout"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <LogOut size={16} />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto pt-[72px] lg:pt-0">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
