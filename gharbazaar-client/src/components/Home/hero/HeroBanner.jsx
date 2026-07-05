import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, SlidersHorizontal, Home, Building2, FileText, ClipboardList } from 'lucide-react';

const HeroBanner = () => {
  const navigate = useNavigate();

  const handleRentPG = () => {
    navigate("/properties", {
      state: {
        title: "PG/Hostels",
        location: "all",
        propertyType: "PG/Hostel",
      },
    });
  };

  return (
    <>
      {/* Mobile Search Bar & Category Buttons (Only visible on mobile) - Dark Theme */}
      <div className="block md:hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-5">
        {/* Search Bar */}
        <div className="flex gap-2 mb-5">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by location, city or area.."
              className="w-full pl-11 pr-4 py-3.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-400 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm"
            />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-xl flex items-center gap-2 font-bold text-sm transition-colors shadow-sm">
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        {/* Category Buttons - 4 Columns with dark background and green icons */}
        <div className="grid grid-cols-4 gap-3">
          <button className="flex flex-col items-center gap-2.5 p-4 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-all shadow-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-sm">
              <Home size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-white leading-tight text-center">Rent a Home</span>
          </button>

          <button
            onClick={handleRentPG}
            className="flex flex-col items-center gap-2.5 p-4 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-all shadow-sm"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-sm">
              <Building2 size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-white leading-tight text-center">PG Rooms</span>
          </button>

          <Link
            to="/dashboard/list-property"
            className="flex flex-col items-center gap-2.5 p-4 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-all shadow-sm"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-sm">
              <FileText size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-white leading-tight text-center">List Property</span>
          </Link>

          <button className="flex flex-col items-center gap-2.5 p-4 bg-gray-800 hover:bg-gray-700 rounded-2xl transition-all shadow-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-sm">
              <ClipboardList size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-white leading-tight text-center">Requirement</span>
          </button>
        </div>
      </div>

      {/* Desktop Version - Original Design */}
      <div className="hidden md:block bg-[#ede8df] w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white max-w-[1600px] mx-auto border border-gray-100 shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Left Content */}
          <div className="flex-1 space-y-5 w-full text-center md:text-left">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#000000] leading-tight">
                Find Verified Properties
              </h1>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#1B9E4B] to-[#147638] bg-clip-text text-transparent leading-tight">
                Near You
              </h2>
            </div>

            <div className="text-base text-gray-700 space-y-1">
              <p>Connect with India's top-rated real estate brokers.</p>
              <p>Zero hidden charges, 100% verified listings.</p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/dashboard/list-property"
                className="inline-block bg-gradient-to-r from-[#1B9E4B] to-[#147638] text-white px-6 py-3 font-bold text-sm hover:opacity-95 transition-all shadow-sm"
              >
                List Properties Free
              </Link>
              <button
                className="inline-block border-2 border-gray-200 text-gray-700 px-6 py-3 font-bold text-sm hover:border-gray-300 transition-all"
              >
                Post Requirement
              </button>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="flex flex-col gap-3 w-full md:w-72 shrink-0">

            {/* Card 1 — disabled */}
            <div className="bg-[#eaf5ee]/40 border border-[#1B9E4B]/20 px-6 py-4 text-center opacity-50 cursor-not-allowed">
              <span className="text-[#147638] font-bold text-base">
                Rent a Home
              </span>
            </div>

            {/* Card 2 — Active */}
            <button
              onClick={handleRentPG}
              className="bg-[#eaf5ee] border-2 border-[#1B9E4B] px-6 py-4 text-center hover:shadow-md hover:border-[#147638] transition-all"
            >
              <span className="bg-gradient-to-r from-[#1B9E4B] to-[#147638] bg-clip-text text-transparent font-bold text-base">
                Rent a PG
              </span>
            </button>

            {/* Card 3 — disabled */}
            <div className="bg-[#eaf5ee]/40 border border-[#1B9E4B]/20 px-6 py-4 text-center opacity-50 cursor-not-allowed">
              <span className="text-[#147638] font-bold text-base">
                Rent a WorkSpace
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;