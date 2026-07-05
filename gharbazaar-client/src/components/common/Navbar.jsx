import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  Search,
  Heart,
  Menu,
  X,
  LogOut,
  Gift,
  Home,
  Briefcase,
  ShoppingBag,
  DollarSign,
  Info,
  Phone,
  LayoutDashboard,
} from "lucide-react";
import axios from "axios";
import { useGetBookmarkQuery } from "../../store/propertyQuery/getPropertyQuery";

const NAV_LINKS = [
  { label: "Properties", path: "/" },
  { label: "Products", path: "/products-marketplace" },
  { label: "Services", path: "/services" },
  { label: "Pricing", path: "/pricing" },
  { label: "Refer & Earn", path: "/refer-and-earn", isSpecial: true },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  const { data } = useGetBookmarkQuery();
  const bookmarkCount = data?.data?.length || 0;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const cartCount = getCartCount();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);

        // ROLE-BASED ROUTING
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          if (parsedUser?.role === "client") {
            navigate("/dashboard");
          } else if (parsedUser?.role === "employee") {
            navigate("/employee");
          } else if (parsedUser?.role === "admin"){
            navigate("/admin");
          }else{
            navigate("/NotFound")
          }
        }
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, [location, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
      setMobileOpen(false);
      navigate("/login");
    }
  };

  const username =
    user?.name ||
    user?.fullName ||
    user?.username ||
    user?.firstName ||
    "User";

  const avatar =
    user?.avatar ||
    user?.profileImage ||
    user?.photo ||
    user?.image ||
    "";

  // Dynamic Dashboard URL
  const getDashboardPath = () => {
    if (user?.role === "client") return "/dashboard";
    if (user?.role === "employee") return "/employee";
    return "/admin";
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-[58px]">
        <div className="max-w-[1450px] mx-auto px-5 h-full flex items-center justify-between">
          
          {/* LEFT */}
          <div className="flex items-center gap-8">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/logo.jpeg"
                alt="logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold text-gray-800">
                Ghar<span className="text-[#1f9d55]">Bazaar</span>
                <span className="text-gray-600">.in</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Glass effect background for the three main links */}
              <div className="relative flex items-center gap-1">
                {/* Glassmorphism cylinder background (outer) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1f9d55]/20 via-[#1f9d55]/15 to-[#1f9d55]/20 backdrop-blur-sm rounded-full border border-[#1f9d55]/30 shadow-lg -m-1"></div>
                
                {/* Animated sliding dark glass cylinder for active link (inner) */}
                <div 
                  className="absolute top-0 bottom-0 bg-gradient-to-r from-[#1f9d55]/40 via-[#1f9d55]/50 to-[#1f9d55]/40 backdrop-blur-md rounded-full border border-[#1f9d55]/60 shadow-md transition-all duration-300 ease-in-out"
                  style={{
                    left: location.pathname === "/" ? "0px" : 
                          location.pathname === "/products-marketplace" ? "33.33%" : 
                          location.pathname === "/services" ? "66.66%" : "0px",
                    width: "33.33%",
                  }}
                ></div>
                
                {/* Links without dark green background - just text */}
                {NAV_LINKS.filter(({ label }) => 
                  ["Properties", "Products", "Services"].includes(label)
                ).map(({ label, path }) => {
                  const isActive = location.pathname === path;
                  return (
                    <Link
                      key={label}
                      to={path}
                      className={`relative z-10 text-[15px] font-medium transition-colors duration-300 px-3 py-1.5 flex-1 text-center ${
                        isActive ? "text-gray-900 font-semibold" : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>

              {/* Other nav links */}
              {NAV_LINKS.filter(({ label }) => 
                !["Properties", "Products", "Services"].includes(label)
              ).map(({ label, path, isSpecial }) => {
                // Normal link for Refer & Earn without icon
                return (
                  <Link
                    key={label}
                    to={path}
                    className="relative text-[15px] font-medium transition-all px-3 py-1.5 text-gray-700 hover:text-black"
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* Search */}
            <div className="hidden md:flex items-center border border-gray-300 px-3 py-1.5 bg-gray-50 min-w-[290px] relative">
              <input
                type="text"
                placeholder="search properties, location, services..."
                className="w-full bg-transparent text-sm outline-none pr-8 text-gray-700 placeholder:text-gray-500"
              />

              <Search
                size={18}
                className="absolute right-3 text-gray-600 cursor-pointer"
              />
            </div>

            {/* Wishlist */}
            <Link
              to="/favorites"
              className="relative text-gray-700 hover:text-green-700 transition"
            >
              <Heart size={20} strokeWidth={1.7} />

              {bookmarkCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </Link>

            {/* USER */}
            {user ? (
              <Link
                to={getDashboardPath()}
                className="hidden md:flex items-center gap-3"
              >
                <span className="text-[14px] text-green-700 font-medium whitespace-nowrap">
                  Hi, {username}
                </span>

                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 shadow-sm">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-700 text-white flex items-center justify-center font-semibold">
                      {username?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex bg-[#1f9d55] hover:bg-[#178a48] text-white px-5 py-2 text-sm font-medium transition-colors"
              >
                Login / Register
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER - Light Beige Theme */}
        <div
          className={`lg:hidden fixed inset-0 top-0 bg-[#f0ede8] z-50 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-[68px] border-b border-gray-300">
            <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <img
                src="/logo.jpeg"
                alt="logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-bold text-gray-800">
                Ghar<span className="text-[#1f9d55]">Bazaar</span>
                <span className="text-gray-600">.in</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Heart size={24} className="text-gray-700" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-700"
              >
                <X size={28} />
              </button>
            </div>
          </div>

          <nav className="flex flex-col">
            {/* User Profile Section - Only show if logged in */}
            {user && (
              <div className="flex items-center gap-4 px-5 py-5 border-b border-gray-300">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shrink-0">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold text-xl">
                      {username?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-semibold text-base truncate">
                    {username}
                  </p>
                  {user?.email && (
                    <p className="text-gray-600 text-sm truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Links with Icons */}
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-gray-800 text-base font-semibold px-5 py-4 border-b border-gray-300 hover:bg-[#e5e1d8] transition"
            >
              <Home size={20} strokeWidth={2} />
              Properties
            </Link>

            <Link
              to="/products-marketplace"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-gray-800 text-base font-semibold px-5 py-4 border-b border-gray-300 hover:bg-[#e5e1d8] transition"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              Products
            </Link>

            <Link
              to="/services"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-gray-800 text-base font-semibold px-5 py-4 border-b border-gray-300 hover:bg-[#e5e1d8] transition"
            >
              <Briefcase size={20} strokeWidth={2} />
              Services
            </Link>

            <Link
              to="/pricing"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-gray-800 text-base font-semibold px-5 py-4 border-b border-gray-300 hover:bg-[#e5e1d8] transition"
            >
              <DollarSign size={20} strokeWidth={2} />
              Pricing
            </Link>

            {/* Refer & Earn with Gift Icon */}
            <Link
              to="/refer-and-earn"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-gray-800 text-base font-semibold px-5 py-4 border-b border-gray-300 hover:bg-[#e5e1d8] transition"
            >
              <Gift size={20} strokeWidth={2.5} />
              Refer & Earn
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-gray-800 text-base font-semibold px-5 py-4 border-b border-gray-300 hover:bg-[#e5e1d8] transition"
            >
              <Info size={20} strokeWidth={2} />
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-gray-800 text-base font-semibold px-5 py-4 border-b border-gray-300 hover:bg-[#e5e1d8] transition"
            >
              <Phone size={20} strokeWidth={2} />
              Contact
            </Link>

            {/* User Actions - Only show if logged in */}
            {user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-gray-800 text-base font-semibold px-5 py-4 border-b border-gray-300 hover:bg-[#e5e1d8] transition"
                >
                  <LayoutDashboard size={20} strokeWidth={2} />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-600 text-base font-semibold px-5 py-4 hover:bg-[#e5e1d8] transition text-left"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-gray-800 text-base font-semibold px-5 py-4 hover:bg-[#e5e1d8] transition"
              >
                Login / Register
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[58px]" />
    </>
  );
}