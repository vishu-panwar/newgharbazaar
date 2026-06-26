import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  Search,
  Heart,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import axios from "axios";
import { useGetBookmarkQuery } from "../../store/propertyQuery/getPropertyQuery";

const NAV_LINKS = [
  { label: "Properties", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Pricing", path: "/pricing" },
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
            <nav className="hidden lg:flex items-center gap-2">
              {NAV_LINKS.map(({ label, path }) => {
                const isActive = location.pathname === path;
                const isGreenButton = ["Properties", "Services", "Marketplace"].includes(label);

                return (
                  <Link
                    key={label}
                    to={path}
                    className={`relative text-[15px] font-medium transition-all px-4 py-1.5 ${
                      isGreenButton
                        ? "bg-[#1f9d55] text-white hover:bg-[#178a48]"
                        : "text-gray-700 hover:text-black"
                    }`}
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

        {/* MOBILE DRAWER */}
        <div
          className={`lg:hidden fixed inset-0 top-[58px] bg-white z-40 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col p-6 gap-5">

            {/* User Info */}
            {user && (
              <div className="flex items-center gap-3 border-b pb-5">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-green-700">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full text-white flex items-center justify-center">
                      {username?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-semibold">{username}</p>
                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile Nav Links */}
            {NAV_LINKS.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium border-b pb-3"
              >
                {label}
              </Link>
            ))}

            {/* User Actions */}
            {user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileOpen(false)}
                  className="font-semibold"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 font-semibold mt-3"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="bg-green-800 text-white text-center py-3 rounded-lg font-medium"
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