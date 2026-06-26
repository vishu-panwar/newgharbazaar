import React, { useState, useRef } from "react";
import { MapPin, Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addBookmark,
  removeBookmark,
} from "../../../../store/bookmark/bookMarkSlice";
import { useToggleBookmarkMutation } from "../../../../store/propertyQuery/getPropertyQuery";

const RecentCard = ({ property }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.bookmark);
  const [toggleBookmark] = useToggleBookmarkMutation();
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const requestLock = useRef(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { _id, title, price, location, images, status, views } = property || {};
  const isFavorite = bookmarks?.some(
    (item) => String(item?._id) === String(property?._id),
  );

  const handleBookmark = async (e) => {
    e.stopPropagation();

    if (!user) {
      navigate('/login')
      return
      
    }
    if (requestLock.current || loading) return;

    requestLock.current = true;
    const wasFavorite = isFavorite;

    try {
      setLoading(true);
      if (wasFavorite) {
        dispatch(removeBookmark(_id));
      } else {
        dispatch(addBookmark(property));
      }
      await toggleBookmark(_id).unwrap();
    } catch (error) {
      console.error(error);
      if (wasFavorite) {
        dispatch(addBookmark(property));
      } else {
        dispatch(removeBookmark(_id));
      }
      toast.error("Action failed");
    } finally {
      setLoading(false);
      requestLock.current = false;
    }
  };

  const handleNavigate = () => navigate(`/property/${_id}`);

  const statusText = status || "Available";
  const isAvailable = statusText.toLowerCase().includes("available");

  return (
    <div
      onClick={handleNavigate}
      className="w-full bg-white overflow-hidden border border-gray-100 shadow-md cursor-pointer group flex flex-col h-full p-2"
    >
      {/* IMAGE */}
      <div className="relative h-[160px] xs:h-[180px] sm:h-[190px] w-full overflow-hidden bg-gray-100">
        <img
          src={
            (!imgError && images?.[0]) || "https://via.placeholder.com/400x300"
          }
          alt={title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className={`absolute top-2.5 left-2.5 font-semibold text-[11px] tracking-wide px-2 py-0.5 border backdrop-blur-sm shadow-sm ${
            isAvailable
              ? "bg-[#e8f5e9]/90 text-emerald-700 border-emerald-200"
              : "bg-red-50/90 text-red-600 border-red-200"
          }`}
        >
          {isAvailable ? "Available" : statusText}
        </span>

        <button
          onClick={handleBookmark}
          disabled={loading}
          className={`absolute top-2.5 right-2.5 w-7 h-7 bg-[#E9F9EF] backdrop-blur-sm shadow-sm border border-gray-100 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            loading ? "pointer-events-none" : "hover:scale-110 active:scale-95"
          }`}
        >
          <Heart
            size={14}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-black"}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate flex-1">
              {title || "Single room with AC"}
            </h3>

            {/* ✅ ONLY CHANGE: safely handle views as number or array */}
            <div className="flex items-center gap-0.5 text-gray-400 mt-0.5 shrink-0">
              <Eye size={13} />
              <span className="text-[11px] font-medium">
                {Array.isArray(views) ? views.length : views || 0}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-1 mb-4">
            <MapPin size={12} className="text-gray-400 mt-0.5 shrink-0" />
            <span className="text-[11.5px] text-gray-500 font-medium line-clamp-1">
              {location || "Near Quantum Uni, Chhutmalpur"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100/60">
          <div className="flex items-baseline text-[#147638]">
            <span className="text-sm font-extrabold">₹</span>
            <span className="text-base font-black tracking-tight ml-0.5">
              {price
                ? price >= 10000000
                  ? `${(price / 10000000).toFixed(1)} Cr`
                  : price.toLocaleString("en-IN")
                : "3,500"}
            </span>
            <span className="text-[11px] text-[#1b9e4b] font-medium ml-0.5">
              /month
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
            className="bg-gradient-to-r from-[#1B9E4B] to-[#147638] hover:opacity-95 active:scale-95 text-white text-xs font-bold px-3 py-1.5 shadow-sm transition-all whitespace-nowrap"
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentCard;
