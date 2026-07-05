import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useGetBookmarkQuery } from "../../../store/propertyQuery/getPropertyQuery";
import { useCheckkycQuery } from "../../../store/kyc/kycQuery";
import { HomeIcon, SubscriptIcon } from "lucide-react";

// ── Icons ─────────────────────────────────────────────────────────────────────
function CartIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function HeartIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function RupeeIcon({ size = 20, color = "currentColor" }) {
  return <FaIndianRupeeSign size={size} color={color} />;
}

function EyeIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Custom Badge Check Icon for Verified State
function BadgeCheckIcon({ size = 32, color = "#147638" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ArrowRightIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ListQAIcon() {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function PostQAIcon() {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName =
    user?.name || user?.fullName || user?.username || user?.firstName || "User";

  // Renamed destructured values to avoid duplication namespace conflicts
  const { data: bookmarkData, isLoading: isBookmarksLoading, isError: isBookmarksError } = useGetBookmarkQuery();
  const bookmarks = bookmarkData?.data || [];
    
  const { data: kycData } = useCheckkycQuery();
  const kycStatus = kycData?.status;

  useEffect(() => {
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const getGreeting = () => {
    const h = currentTime.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const stats = [
    {
      label: "Cart Properties",
      value: 0,
      icon: <CartIcon />,
      btn: "Manage Cart Items",
      to: "/dashboard/cart",
    },
    {
      label: "Wishlist Properties",
      value: bookmarks.length,
      icon: <HeartIcon />,
      btn: "Manage Favorites",
      to: "/dashboard/favorites",
    },
    {
      label: "Payments",
      value: 0,
      icon: <RupeeIcon />,
      btn: "Manage Payments",
      to: "/dashboard/payments",
    },
    {
      label: "Viewed Properties",
      value: 0,
      icon: <EyeIcon />,
      btn: "Manage Views",
      to: "/dashboard/viewed",
    },
  ];

  const activities = [
    {
      icon: <CartIcon size={16} color="#555" />,
      action: "Added to Cart",
      sub: "Sea face Apartment",
      time: "1 hour ago",
    },
    {
      icon: <HeartIcon size={16} color="#555" />,
      action: "Added to Favorites",
      sub: "Gym Space",
      time: "1 hour ago",
    },
    {
      icon: <RupeeIcon size={16} color="#555" />,
      action: "Payment Completed",
      sub: "Rent payment of Room",
      time: "2 days ago",
    },
    {
      icon: <EyeIcon size={16} color="#555" />,
      action: "Viewed Property",
      sub: "Sea face Apartments",
      time: "3 days ago",
    },
  ];

 const quickActions = [
  { label: "List Property",      icon: <ListQAIcon />,    to: "/dashboard/list-property" },
  { label: "Post Requirements",  icon: <PostQAIcon />,    to: "/post-requirement" },
  { label: "New Properties",     icon: <HomeIcon />,      to: "/properties" },
  { label: "Subscription Plans", icon: <SubscriptIcon />, to: "/pricing" },
];

  return (
    <div className="w-full min-h-screen bg-[#f0ede8] p-3 sm:p-5 font-sans">
      {/* ── GREETING BANNER ── */}
      <div className="bg-white rounded-xl p-5 sm:p-7 mb-4 flex flex-col md:flex-row md:items-stretch gap-5">
        {/* LEFT — greeting + buttons */}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 leading-tight">
            {getGreeting()},<br />
            {userName}!
          </h1>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              to="/dashboard/favorites"
              className="px-4 py-2 border border-gray-800 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
            >
              Viewed Saved
            </Link>
            <Link
              to="/properties"
              className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
            >
              Explore Properties <ArrowRightIcon />
            </Link>
          </div>
        </div>

        {/* RIGHT — Dynamic KYC banner Container */}
        <div className="bg-white  p-5 flex flex-col justify-between w-full md:w-72 flex-shrink-0 min-h-[180px]">
          {kycStatus === "Verified" ? (
            <>
              <h1 className="text-sm sm:text-base font-bold text-gray-900 leading-snug tracking-tight">
                Awesome!<br />
                Enjoy unlock your full GharBazaar experience!!
              </h1>
              <div className="mt-4 md:mt-auto flex items-center gap-2 text-green-700 font-bold text-xs bg-green-50 border border-green-200 p-2.5 rounded-lg justify-center shadow-sm">
                <BadgeCheckIcon size={16} />
                KYC Account Verified
              </div>
            </>
          ) : (
            <>
              <h1 className="text-sm sm:text-base font-bold text-gray-900 leading-snug tracking-tight">
                Almost there!!<br />
                Complete KYC to unlock your full GharBazaar experience!!
              </h1>
              <Link  to="/dashboard/kyc-verification" className="mt-4 md:mt-auto w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#147638] to-[#1B9E4B] hover:from-[#115e2c] hover:to-[#17853f] text-white text-xs font-bold rounded-lg transition duration-300 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M16 2v2M8 2v2M3 10h18" />
                </svg>
                KYC Verification
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-1">
              <p className="text-xs text-gray-500 font-medium leading-snug">
                {s.label}
              </p>
              <div className="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center flex-shrink-0 ml-2">
                {s.icon}
              </div>
            </div>
            <p className="text-3xl font-extrabold text-gray-900 mb-3">
              {s.value}
            </p>
            <Link
              to={s.to}
              className="block w-full text-center py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-md transition-colors"
            >
              {s.btn}
            </Link>
          </div>
        ))}
      </div>

      {/* ── ACTIVITIES + SAVED PROPERTIES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Recent Activities
          </h3>
          <div className="flex flex-col gap-3">
            {activities.map((act, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3.5 bg-[#F5F0E8] rounded-xl transition hover:opacity-90"
              >
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white flex-shrink-0 text-gray-700">
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 leading-tight">
                    {act.action}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5 truncate">
                    {act.sub}
                  </p>
                </div>
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap flex-shrink-0 self-center pl-2">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Properties */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">
              Saved Properties
            </h3>
            <Link
              to="/dashboard/favorites"
              className="text-xs text-gray-500 underline hover:text-green-600 transition-colors"
            >
              View All
            </Link>
          </div>

          {isBookmarksLoading ? (
            <div className="flex items-center justify-center py-10 text-gray-400 text-sm">
              Loading bookmarks...
            </div>
          ) : isBookmarksError ? (
            <div className="flex items-center justify-center py-10 text-red-500 text-sm">
              Failed to load bookmarks
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-gray-400 text-sm">
              No saved properties found
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {bookmarks.map((property) => (
                <div
                  key={property._id}
                  className="flex items-center gap-3 bg-[#F5F0E8] rounded-xl p-3 transition hover:opacity-95"
                >
                  <img
                    src={property.images?.[0]}
                    alt={property.title}
                    className="w-20 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {property.title}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <LocationPinIcon />
                      <span className="text-xs text-gray-500 truncate">
                        {property.city || "Andheri, Mumbai"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-[#FFF5EA] text-[#D08230] text-[11px] font-bold px-2.5 py-0.5 border border-[#FBE3CC] rounded">
                        ₹{property.price}
                      </span>
                      <button className="bg-white border border-gray-300 text-gray-700 text-[11px] font-bold px-4 py-0.5 rounded shadow-sm hover:bg-gray-50 transition">
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
        <h3 className="text-base font-bold text-gray-900 mb-4">Quick Action</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="flex flex-col items-center justify-center gap-3 py-6 px-4 bg-[#F5F0E8] rounded-2xl transition hover:opacity-95 group"
            >
              <div className="text-gray-900 transition-transform group-hover:scale-105 duration-200">
                {action.icon}
              </div>
              <span className="text-xs font-bold text-gray-800 text-center tracking-tight leading-tight">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
