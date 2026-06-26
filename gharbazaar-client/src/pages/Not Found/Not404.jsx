import React from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="text-green-600 font-semibold tracking-widest uppercase mb-4">
            Error 404
          </p>

          <h1 className="text-6xl md:text-7xl font-black text-[#0b1633] leading-tight">
            Page Not <br /> Found
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
            The page you are looking for might have been removed,
            renamed, or is temporarily unavailable.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/"
              className="flex items-center gap-2 bg-[#0b1633] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Home size={18} />
              Back Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 border border-[#0b1633] text-[#0b1633] px-6 py-3 rounded-xl font-semibold hover:bg-[#0b1633] hover:text-white transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center items-center">
          
          {/* BACKGROUND CARD */}
          <div className="absolute w-[420px] h-[420px] bg-white rounded-[40px] shadow-2xl rotate-6"></div>

          <div className="relative z-10 bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-[40px] p-10 shadow-xl w-full max-w-md">
            
            {/* SEARCH ICON */}
            <div className="w-24 h-24 mx-auto rounded-full bg-[#eaf7ef] flex items-center justify-center shadow-inner">
              <Search size={42} className="text-green-600" />
            </div>

            {/* 404 TEXT */}
            <h2 className="text-[120px] font-black text-center text-[#0b1633] leading-none mt-6">
              404
            </h2>

            <p className="text-center text-gray-500 text-lg mt-2">
              Oops! Nothing found here.
            </p>

            {/* SEARCH BAR */}
            <div className="mt-8 flex items-center border border-gray-300 bg-white rounded-xl overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Search properties..."
                className="flex-1 px-4 py-3 outline-none bg-transparent"
              />

              <button className="bg-green-600 text-white px-5 py-3 hover:bg-green-700 transition">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}