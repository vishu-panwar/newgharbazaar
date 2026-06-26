import { useEffect, useRef, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  FileWarning,
  Users,
  Shield,
  ClipboardList,
  MessageSquare,
  AlertCircle,
  PhoneCall,
  Ticket,
  MapPin,
  UserCog,
  LogOut,
  Menu,
  X,
  Loader2,
  MessageCircle,
} from "lucide-react";
import axios from "axios";
import { socket } from "../../socket/socket";
import { toast } from "react-toastify";

// All paths live under /admin so the admin never gets bounced into the
// employee panel just by clicking a sidebar link.
const SIDEBAR_LINKS = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  {
    label: "Manage Roles",
    path: "/admin/manage-roles",
    icon: UserCog,
  },
  {
    label: "KYC Verification",
    path: "/admin/kyc-verification",
    icon: ShieldCheck,
  },
  { label: "Pending KYC", path: "/admin/pending-kyc", icon: FileWarning },
  {
    label: "Property Verification",
    path: "/admin/property-verification",
    icon: Users,
  },
  {
    label: "Listing Control Centre",
    path: "/admin/listing-panel",
    icon: Shield,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: MessageCircle,
  },
  {
    label: "Manage Inventory",
    path: "/admin/manage-inventory",
    icon: ClipboardList,
  },
  {
    label: "Support Tickets",
    path: "/admin/support-tickets",
    icon: MessageSquare,
    hasNotification: true,
  },
  {
    label: "Issues & Reports",
    path: "/admin/issues-reports",
    icon: AlertCircle,
  },
  {
    label: "Lead Management",
    path: "/admin/lead-management",
    icon: PhoneCall,
  },
  { label: "Coupon Generate", path: "/admin/coupon-generate", icon: Ticket },
];

export default function AdminPanelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Safely grab user data from localStorage
  const localStorageUser = localStorage.getItem("user");
  const user = localStorageUser
    ? JSON.parse(localStorageUser)
    : { fullName: "Admin", email: "admin@gharbazaar.com" };
  const firstLetter = user?.fullName?.trim().charAt(0).toUpperCase() || "A";

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/notification.wav");

    const unlockAudio = () => {
      audioRef.current
        ?.play()
        .then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        })
        .catch(() => {});

      document.removeEventListener("click", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);

    return () => {
      document.removeEventListener("click", unlockAudio);
    };
  }, []);

  useEffect(() => {
    const handleNewEnquiry = (data) => {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.log("Sound blocked:", err);
      });
      localStorage.setItem(`${data.type}`, data.type);

      toast.info(`New ${data.type} received from ${data.name}`, {
        position: "top-right",
        autoClose: 5000,
      });
    };

    socket.on("newEnquiry", handleNewEnquiry);

    return () => {
      socket.off("newEnquiry", handleNewEnquiry);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/logout`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error("Logout request failed", err);
    } finally {
      setLoading(false);
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-['Poppins',sans-serif]">
      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
          {firstLetter}
        </div>
      </header>

      {/* OVERLAY FOR MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:static top-0 bottom-0 left-0 z-50
        h-screen w-[290px] shrink-0
        bg-white border-r border-gray-200
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <Link to="/admin" className="flex items-center gap-3 no-underline">
            <div className="bg-indigo-50 p-2 rounded-xl flex items-center justify-center">
              <img
                src="/logo.jpeg"
                alt="GharBazaar Logo"
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <h3 className="m-0 text-base font-bold text-indigo-600 tracking-tight">
                GharBazaar
              </h3>
              <p className="m-0 text-[11px] font-medium text-indigo-500">
                Admin Control
              </p>
            </div>
          </Link>
          <button
            className="lg:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* SIDEBAR NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1 custom-scrollbar">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);

            return (
              <Link
                key={link.label}
                to={link.path}
                className={`
                  flex items-center justify-between
                  px-4 py-3 rounded-xl
                  text-sm font-semibold
                  transition-all duration-200 group
                  ${
                    active
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    size={18}
                    className={`transition-colors ${active ? "text-white" : "text-gray-400 group-hover:text-indigo-600"}`}
                  />
                  <span>{link.label}</span>
                </div>
                {localStorage.getItem(`${link.label}`) == link.label && (
                  <span
                    className={`w-2 h-2 rounded-full ring-2 ${
                      active
                        ? "bg-white ring-indigo-600"
                        : "bg-red-500 ring-white"
                    }`}
                  />
                )}
              </Link>
            );
          })}

          {/* EXPAND REQUESTS CONTAINER */}
          <div className="pt-3 mt-3 border-t border-gray-100">
            <Link
              to="/admin/expand-requests"
              onClick={() => setSidebarOpen(false)}
              className={`
                w-full flex items-center justify-between gap-2.5 px-4 py-3 
                rounded-xl text-sm font-semibold relative transition-all duration-200
                ${
                  isActive("/admin/expand-requests")
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-indigo-50/40 text-indigo-700 hover:bg-indigo-50 border border-dashed border-indigo-200 hover:border-indigo-300"
                }
              `}
            >
              <div className="flex items-center gap-3.5">
                <MapPin size={18} />
                <span>Expand Requests</span>
              </div>
              <span
                className={`w-1.5 h-1.5 rounded-full ${isActive("/admin/expand-requests") ? "bg-white" : "bg-indigo-500"}`}
              ></span>
            </Link>
          </div>
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className="p-4 border-t border-gray-100 space-y-3 bg-gray-50/50">
          {/* USER PROFILE BOX */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center text-base font-bold shadow-sm shrink-0">
              {firstLetter}
            </div>
            <div className="overflow-hidden">
              <h4 className="m-0 text-xs font-bold text-gray-900 truncate">
                {user.fullName}
              </h4>
              <p className="m-0 text-[11px] font-medium text-indigo-600 truncate">
                {user.email || "Admin Team"}
              </p>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin text-red-600" />
            ) : (
              <>
                <LogOut size={18} />
                <span>Logout</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto pt-[64px] lg:pt-0 bg-gray-50">
        <div className="p-5 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}