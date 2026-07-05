import { MapPin, Phone, MessageCircle, Star, CheckCircle } from "lucide-react";

export default function ProductCard({ product }) {
  const {
    image,
    name,
    brand,
    vendor,
    verified,
    businessType,
    location,
    quantity,
    rating,
    reviews,
  } = product;

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#1f9d55]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {verified && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1f9d55] text-white text-[10px] font-bold rounded">
              <CheckCircle size={12} />
              VERIFIED
            </span>
          )}
          <span className={`px-2 py-1 text-[10px] font-bold rounded ${
            businessType === "Wholesaler" 
              ? "bg-blue-500 text-white" 
              : businessType === "Retailer"
              ? "bg-amber-500 text-white"
              : "bg-purple-500 text-white"
          }`}>
            {businessType.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand */}
        <p className="text-xs font-semibold text-[#1f9d55] mb-1">
          {brand}
        </p>

        {/* Product Name */}
        <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 leading-snug min-h-[2.5rem]">
          {name}
        </h3>

        {/* Vendor */}
        <p className="text-xs text-slate-600 mb-1">
          by {vendor}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
          <MapPin size={12} />
          <span className="truncate">{location}</span>
        </div>

        {/* Quantity */}
        <p className="text-xs text-slate-500 mb-3">
          {quantity}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex items-center gap-0.5">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-900">{rating}</span>
          </div>
          <span className="text-xs text-slate-500">({reviews} reviews)</span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2">
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#1f9d55] to-[#178a48] text-white py-2 px-3 rounded-lg text-xs font-semibold hover:shadow-lg hover:scale-105 transition-all">
            <Phone size={14} />
            Contact Vendor
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#1f9d55] text-[#1f9d55] py-2 px-3 rounded-lg text-xs font-semibold hover:bg-[#1f9d55] hover:text-white transition-all">
            <MessageCircle size={14} />
            Request Quote
          </button>
        </div>
      </div>
    </div>
  );
}
