import { useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Heart,
  MapPin,
  Eye,
  Trash2,
  Bookmark,
} from "lucide-react";

import {
  useGetBookmarkQuery,
  useToggleBookmarkMutation,
} from "../../store/propertyQuery/getPropertyQuery";

// ─── WhatsApp config ───────────────────────────────────────────
const GHARBAZAAR_WHATSAPP = "919548283300";
const APP_BASE_URL = "https://gharbazaar.in";

const openWhatsApp = (item) => {
  const { _id, title, price, location, status, listingType, rating } = item || {};

  const formattedPrice = price
    ? price >= 10000000
      ? `₹${(price / 10000000).toFixed(1)} Cr`
      : `₹${price.toLocaleString("en-IN")}${listingType === "Rent" ? "/month" : ""}`
    : "Not listed";

  const message =
    ` *Hello GharBazaar!*\n` +
    `\n` +
    `I found a property on your platform and I'm interested. Here are the details:\n` +
    `\n` +
    `*${title || "Property"}*\n` +
    `\n` +
    ` *Location*    ${location || "N/A"}\n` +
    `*Price*          ${formattedPrice}\n` +
    `*Type*            ${status || "N/A"}\n` +
    (rating?.rate ? ` *Rating*        ${rating.rate} / 5\n` : "") +
    `\n` +
    ` *View Property*\n` +
    `${APP_BASE_URL}/property/${_id}\n` +
    `\n` +
    `Please share more details and help me arrange a site visit.\n` +
    `\n` +
    `Thank you! `;

  window.open(
    `https://wa.me/${GHARBAZAAR_WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
};
// ──────────────────────────────────────────────────────────────

function Favorites() {

  const { data, isLoading, isError } = useGetBookmarkQuery();
  const [toggleBookmark] = useToggleBookmarkMutation();
  const [removedIds, setRemovedIds] = useState([]);

  const favorites = useMemo(() => {
    const bookmarks = data?.data || [];
    return bookmarks.filter((item) => !removedIds.includes(item._id));
  }, [data, removedIds]);

  const removeFromFavorites = async (id) => {
    try {
      setRemovedIds((prev) => [...prev, id]);
      await toggleBookmark(id).unwrap();
    } catch (error) {
      console.log(error);
      setRemovedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <section className="bg-[#ede8df] py-10 sm:py-12 lg:py-14 min-h-screen">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">

          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse" />
              <div className="flex flex-col gap-2">
                <div className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-3 w-32 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>

          {/* Card skeletons — match RecentCardSkeleton shape */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full bg-white border border-gray-100 shadow-md flex flex-col p-2 animate-pulse"
              >
                {/* Image placeholder */}
                <div className="h-[160px] xs:h-[180px] sm:h-[190px] w-full bg-gray-200 rounded-sm" />
                {/* Content placeholder */}
                <div className="p-3.5 flex flex-col gap-3 flex-1">
                  <div className="flex justify-between gap-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-8" />
                  </div>
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                    <div className="h-5 bg-gray-200 rounded w-24" />
                    <div className="h-7 bg-gray-200 rounded-md w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // ── Error ──
  if (isError) {
    return (
      <section className="bg-[#ede8df] py-10 sm:py-12 lg:py-14 min-h-screen">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-6 text-center font-medium text-sm">
            Failed to load favorites. Please refresh the page.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#ede8df] py-10 sm:py-12 lg:py-14 min-h-screen">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* ══════════════════════════════════════
            HEADER — identical to RecentPropertiesSection
        ══════════════════════════════════════ */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B9E4B] to-[#147638] flex items-center justify-center shadow-md shadow-[#063e23]/10">
              <Bookmark size={18} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                My Favorites
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {favorites.length} saved{" "}
                {favorites.length === 1 ? "property" : "properties"}
              </p>
            </div>

          </div>

          {/* Item count pill */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1.5">
            <span className="flex h-2 w-2 rounded-full bg-[#1B9E4B]" />
            <span className="text-xs font-semibold text-gray-600">
              {favorites.length} {favorites.length === 1 ? "Item" : "Items"}
            </span>
          </div>

        </div>

        {/* ══════════════════════════════════════
            EMPTY STATE
        ══════════════════════════════════════ */}
        {favorites.length === 0 ? (

          <div className="col-span-full bg-white border border-dashed border-gray-200 rounded-2xl py-14 text-center w-full flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1B9E4B]/10 to-[#147638]/10 flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-[#1B9E4B]" />
            </div>
            <h2 className="text-base font-bold text-gray-800 mb-1">
              Your wishlist is empty
            </h2>
            <p className="text-gray-400 text-sm font-medium max-w-xs mb-6 px-4">
              Properties you favorite will appear here for quick access.
            </p>
            <Link
              to="/properties"
              className="bg-gradient-to-r from-[#1B9E4B] to-[#147638] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#063e23]/10"
            >
              Browse Properties
            </Link>
          </div>

        ) : (

          /* ══════════════════════════════════════
              GRID — identical to RecentPropertiesSection
          ══════════════════════════════════════ */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {favorites.map((item) => (
              <FavoriteCard
                key={item._id}
                item={item}
                onRemove={removeFromFavorites}
                onWhatsApp={openWhatsApp}
              />
            ))}
          </div>

        )}

      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════
//   FAVORITE CARD
//   — exact same structure & classes as RecentCard
//   — only difference: Trash2 remove button instead of
//     Heart bookmark toggle (since these are already saved)
// ══════════════════════════════════════════════════════════

function FavoriteCard({ item, onRemove, onWhatsApp }) {

  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [removing, setRemoving] = useState(false);
  const requestLock = useRef(false);

  const {
    _id,
    title,
    price,
    location,
    images,
    status,
    views,
  } = item || {};

  const statusText = status || "Available";
  const isAvailable = statusText.toLowerCase().includes("available");

  const handleNavigate = () => navigate(`/property/${_id}`);

  const handleRemove = async (e) => {
    e.stopPropagation();
    if (requestLock.current || removing) return;
    requestLock.current = true;
    try {
      setRemoving(true);
      await onRemove(_id);
    } finally {
      setRemoving(false);
      requestLock.current = false;
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className="w-full bg-white overflow-hidden border border-gray-100 shadow-md cursor-pointer group flex flex-col h-full p-2"
    >

      {/* ── IMAGE — identical to RecentCard ── */}
      <div className="relative h-[160px] xs:h-[180px] sm:h-[190px] w-full overflow-hidden bg-gray-100 rounded-sm">

        <img
          src={(!imgError && images?.[0]) || "https://via.placeholder.com/400x300"}
          alt={title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Status badge — top left, exact same as RecentCard */}
        <span
          className={`absolute top-2.5 left-2.5 font-semibold text-[11px] tracking-wide px-2 py-0.5 rounded-md border backdrop-blur-sm shadow-sm ${
            isAvailable
              ? "bg-[#e8f5e9]/90 text-emerald-700 border-emerald-200"
              : "bg-red-50/90 text-red-600 border-red-200"
          }`}
        >
          {isAvailable ? "Available" : statusText}
        </span>

        {/* Remove button — top right, same position/size as RecentCard heart */}
        <button
          onClick={handleRemove}
          disabled={removing}
          className={`absolute top-2.5 right-2.5 w-7 h-7 bg-[#E9F9EF] backdrop-blur-sm rounded-full shadow-sm border border-gray-100 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            removing ? "pointer-events-none" : "hover:scale-110 active:scale-95 hover:bg-red-50 hover:border-red-200"
          }`}
        >
          <Trash2
            size={13}
            className={removing ? "text-gray-300" : "text-red-400"}
          />
        </button>

      </div>

      {/* ── CONTENT — identical to RecentCard ── */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">

        <div>

          {/* Title + Views row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate flex-1">
              {title || "Property"}
            </h3>
            <div className="flex items-center gap-0.5 text-gray-400 mt-0.5 shrink-0">
              <Eye size={13} />
              <span className="text-[11px] font-medium">
                {Array.isArray(views) ? views.length : views || 0}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-1 mb-4">
            <MapPin size={12} className="text-gray-400 mt-0.5 shrink-0" />
            <span className="text-[11.5px] text-gray-500 font-medium line-clamp-1">
              {location || "Location not specified"}
            </span>
          </div>

        </div>

        {/* Price + Details button — identical to RecentCard bottom row */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100/60">

          <div className="flex items-baseline text-[#147638]">
            <span className="text-sm font-extrabold">₹</span>
            <span className="text-base font-black tracking-tight ml-0.5">
              {price
                ? price >= 10000000
                  ? `${(price / 10000000).toFixed(1)} Cr`
                  : price.toLocaleString("en-IN")
                : "N/A"}
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
            className="bg-gradient-to-r from-[#1B9E4B] to-[#147638] hover:opacity-95 active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm transition-all whitespace-nowrap"
          >
            Details →
          </button>

        </div>

      </div>

    </div>
  );
}

export default Favorites;
