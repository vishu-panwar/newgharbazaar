import { MapPin, Heart, Star, User, Building2 } from "lucide-react";

export default function SimpleProductCard({ product }) {
  const {
    _id,
    image,
    name,
    seller,
    sellerType,
    verified,
    inStock,
    price,
    priceUnit,
    rating,
    reviews,
  } = product;

  const handleBuy = (e) => {
    e.stopPropagation();
    if (!inStock) return;
    console.log("Buy product:", _id);
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    console.log("View details:", _id);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    console.log("Toggle wishlist:", _id);
  };

  return (
    <div className="w-full bg-white overflow-hidden border border-gray-100 shadow-md cursor-pointer group flex flex-col h-full p-2">
      {/* IMAGE */}
      <div className="relative h-[160px] xs:h-[180px] sm:h-[190px] w-full overflow-hidden bg-gray-100">
        <img
          src={image || "https://via.placeholder.com/400x300"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Stock Status Badge */}
        <span
          className={`absolute top-2.5 left-2.5 font-semibold text-[11px] tracking-wide px-2 py-0.5 border backdrop-blur-sm shadow-sm ${
            inStock
              ? "bg-[#e8f5e9]/90 text-emerald-700 border-emerald-200"
              : "bg-red-50/90 text-red-600 border-red-200"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>

        {/* Verified Badge - positioned dynamically based on stock status */}
        {verified && (
          <span 
            className={`absolute top-2.5 font-semibold text-[11px] tracking-wide px-2 py-0.5 bg-blue-50/90 text-blue-700 border border-blue-200 backdrop-blur-sm shadow-sm ${
              inStock ? "left-[85px]" : "left-[120px]"
            }`}
          >
            Verified
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 w-7 h-7 bg-[#E9F9EF] backdrop-blur-sm shadow-sm border border-gray-100 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <Heart size={14} className="text-black" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Product Name & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate flex-1">
              {name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-0.5 text-amber-500 mt-0.5 shrink-0">
              <Star size={13} fill="currentColor" />
              <span className="text-[11px] font-medium text-gray-900">
                {rating}
              </span>
            </div>
          </div>

          {/* Seller with Icon (replacing location) */}
          <div className="flex items-start gap-1 mb-4">
            {sellerType === "individual" ? (
              <User size={12} className="text-gray-400 mt-0.5 shrink-0" />
            ) : (
              <Building2 size={12} className="text-gray-400 mt-0.5 shrink-0" />
            )}
            <span className="text-[11.5px] text-gray-500 font-medium line-clamp-1">
              by {seller}
            </span>
          </div>
        </div>

        {/* Price & Buttons Row */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100/60">
          {/* Price */}
          <div className="flex items-baseline text-[#147638]">
            <span className="text-sm font-extrabold">₹</span>
            <span className="text-base font-black tracking-tight ml-0.5">
              {price >= 10000000
                ? `${(price / 10000000).toFixed(1)} Cr`
                : price >= 100000
                ? `${(price / 100000).toFixed(1)} L`
                : price.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-[#1b9e4b] font-medium ml-0.5">
              {priceUnit}
            </span>
          </div>

          {/* Buttons - Side by side, small like property cards */}
          <div className="flex gap-1.5">
            <button
              onClick={handleBuy}
              disabled={!inStock}
              className={`text-xs font-bold px-3 py-1.5 shadow-sm transition-all whitespace-nowrap ${
                inStock
                  ? "bg-gradient-to-r from-[#1B9E4B] to-[#147638] hover:opacity-95 active:scale-95 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Buy
            </button>
            <button
              onClick={handleDetails}
              className="bg-gradient-to-r from-[#1B9E4B] to-[#147638] hover:opacity-95 active:scale-95 text-white text-xs font-bold px-3 py-1.5 shadow-sm transition-all whitespace-nowrap"
            >
              Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
