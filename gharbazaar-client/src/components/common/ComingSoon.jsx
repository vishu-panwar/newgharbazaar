import React from "react";
import { X, Bell, Rocket, Sparkles, ArrowRight } from "lucide-react";

const ComingSoon = ({ isOpen, onClose, serviceName = "This Service" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl transition-all animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          {/* Icon Badge */}
          <div className="mb-6 relative">
            <div className="h-20 w-20 bg-[#1f9d55]/10 rounded-3xl flex items-center justify-center text-[#1f9d55] rotate-12 group">
               <Rocket size={40} className="-rotate-12 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-lg text-amber-400">
              <Sparkles size={20} fill="currentColor" />
            </div>
          </div>

          {/* Text Section */}
          <h2 className="text-[10px] font-black text-[#1f9d55] uppercase tracking-[0.2em] mb-2">
            Coming Very Soon
          </h2>
          <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
            {serviceName} is <br /> Almost Ready!
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4">
            We are fine-tuning the final details to give you the best experience. 
            Be the first to know when we go live!
          </p>

          {/* Interaction Section */}
          <div className="w-full space-y-3">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f9d55]/20 focus:border-[#1f9d55] transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#1f9d55] hover:bg-[#187a42] text-white px-4 rounded-xl flex items-center justify-center transition-all shadow-md shadow-green-100 active:scale-95">
                <Bell size={18} />
              </button>
            </div>
            
            <button 
              onClick={onClose}
              className="w-full py-4 text-gray-400 text-xs font-bold hover:text-gray-600 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Footer Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#1f9d55] to-transparent opacity-30" />
      </div>
    </div>
  );
};

export default ComingSoon;