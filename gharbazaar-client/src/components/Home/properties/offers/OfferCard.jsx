import React from "react";
import { ArrowRight, MapPin } from "lucide-react";

const OfferCard = ({
  title,
  category,
  mainImage,
  propertyName,
  price,
  location, // Added location to match Top Rated Card style
  thumbnails = [],
}) => {
  return (
    /* Container: Exact 2xl corners and slate-100 border to match Top Rated UI */
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all flex flex-col h-full group">
      
      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-white border-b border-slate-50">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {category}
          </span>
          <span className="text-slate-300 text-xs">|</span>
          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
            {title}
          </h3>
        </div>
        <button className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors flex items-center uppercase">
          Details <ArrowRight size={12} className="ml-1" />
        </button>
      </div>

      {/* Main Image: Fixed h-48 to match Top Rated Card exactly */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={mainImage}
          alt={propertyName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Price Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
          <span className="text-emerald-600 font-black text-sm">{price}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-bold text-slate-900 line-clamp-1 text-base group-hover:text-emerald-700 transition-colors">
          {propertyName}
        </h4>
        
        {/* Location - Added to fill space left by buttons and match UI */}
        <p className="text-slate-500 text-xs flex items-center mt-1 mb-4">
          <MapPin size={12} className="mr-1 text-emerald-500" /> {location || "Location on Request"}
        </p>
        
        {/* Thumbnails: Consistent with property card internal spacing */}
        <div className="mt-auto pt-3 border-t border-slate-50">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {thumbnails.slice(0, 4).map((thumb, idx) => (
              <div key={idx} className="w-12 h-10 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                <img
                  src={thumb}
                  alt="View"
                  className="w-full h-full object-cover hover:opacity-80 transition cursor-pointer"
                />
              </div>
            ))}
            {thumbnails.length > 4 && (
              <div className="w-12 h-10 flex-shrink-0 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-100 uppercase">
                +{thumbnails.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;