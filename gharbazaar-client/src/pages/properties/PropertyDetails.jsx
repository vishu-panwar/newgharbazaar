// ===============================
// PropertyDetails.jsx
// WhatsApp Preview Optimized
// ===============================

import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Heart,
  Share2,
  Check,
  ArrowLeft,
  Phone,
  Home,
  Eye,
  Map,
  X,
} from "lucide-react";
import {
  useGetPropertyByIdQuery,
  useToggleBookmarkMutation,
  useUpdateviewMutation,
} from "../../store/propertyQuery/getPropertyQuery";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  removeBookmark
} from "../../store/bookmark/bookMarkSlice";

// ===============================
// CONFIG
// ===============================

const GHARBAZAAR_WHATSAPP = "919548283300";

const APP_BASE_URL = "https://test.gharbazaar.in";

// ===============================
// WHATSAPP
// ===============================
const openWhatsApp = (property) => {
  if (!property) return;

  const propertyLink = `https://test.gharbazaar.in/property/${property?._id}`;

  const message = `
*${property?.title}*

📍 ${property?.location}

💰 ₹${property?.price?.toLocaleString("en-IN")}

${propertyLink}

Hello GharBazaar,
I am interested in this property.
Please share more details.
`;

  const url = `https://wa.me/${GHARBAZAAR_WHATSAPP}?text=${encodeURIComponent(
    message
  )}`;

  window.open(url, "_blank");
};

// ===============================
// BACK BUTTON
// ===============================
const BackButton = ({ onClick, variant = "dark" }) => {
  const isDark = variant === "dark";

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium
        transition-all duration-200 ease-out select-none
        ${
          isDark
            ? "bg-[#147638] hover:bg-[#1B9E4B] text-white border border-[#1B9E4B]/20"
            : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
        }
      `}
    >
      <ArrowLeft
        size={14}
        strokeWidth={2.5}
        className={`transition-transform duration-200 group-hover:-translate-x-0.5 ${
          isDark ? "text-white" : "text-gray-700"
        }`}
      />
      <span>Back</span>
    </button>
  );
};

// ===============================
// MAIN COMPONENT
// ===============================
export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.bookmark);
  const [toggleBookmark] = useToggleBookmarkMutation();
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const { data, isLoading, isError } = useGetPropertyByIdQuery({ id });
  const [updateview] = useUpdateviewMutation();
  const property = data?.data;

  const [currentImage, setCurrentImage] = useState(0);

  // ===============================
  // VIEW TRACKING
  // ===============================
  useEffect(() => {
    const handleview = async () => {
      if (!property?._id) return;
      try {
        await updateview(property?._id);
      } catch (error) {
        console.log("View tracking failed", error);
      }
    };
    handleview();
  }, [property?._id]);

  // ===============================
  // RESET IMAGE
  // ===============================
  useEffect(() => {
    setCurrentImage(0);
  }, [id]);

  // ===============================
  // FAVORITE CHECK
  // ===============================
  const isFavorite = useMemo(() => {
    if (!property?._id) return false;
    return (
      bookmarks?.some((item) => item?._id === property?._id) ||
      property?.bookmarks?.some(
        (bookmarkId) => bookmarkId === user?._id || bookmarkId === user?.id
      )
    );
  }, [bookmarks, property?._id, property?.bookmarks, user?._id, user?.id]);

  // ===============================
  // BOOKMARK
  // ===============================
  const handleBookmark = async () => {
    if (!user) {
      return toast.error("Please login first");
    }
    if (bookmarkLoading) return;

    const propertyId = property?._id;
    const wasFavorite = isFavorite;

    try {
      setBookmarkLoading(true);
      if (wasFavorite) {
        dispatch(removeBookmark(propertyId));
      } else {
        dispatch(addBookmark(property));
      }

      await toggleBookmark(propertyId).unwrap();
    } catch (error) {
      console.error(error);
      if (wasFavorite) {
        dispatch(addBookmark(property));
      } else {
        dispatch(removeBookmark(propertyId));
      }
      toast.error("Action failed");
    } finally {
      setBookmarkLoading(false);
    }
  };

  // ===============================
  // SHARE
  // ===============================
  const handleShare = async () => {
    if (!property) return;

    const propertyLink = `https://test.gharbazaar.in/property/${property?._id}`;
    const message = `
${property?.title}

📍 ${property?.location}

💰 ₹${property?.price?.toLocaleString("en-IN")}

${propertyLink}
`;

    const popup = document.createElement("div");
    popup.innerHTML = `
    <div id="gharbazaar-share-overlay"
      style="
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.55);
        z-index:99999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
      "
    >
      <div
        style="
          background:#fff;
          width:100%;
          max-width:420px;
          border-radius:12px;
          padding:24px;
          box-shadow:0 10px 40px rgba(0,0,0,0.2);
          font-family:sans-serif;
        "
      >
        <h2 style="margin:0 0 16px; font-size:20px; font-weight:700; color:#111827;">
          Share Property
        </h2>
        <textarea
          id="gharbazaar-share-text"
          readonly
          style="
            width:100%;
            height:160px;
            border:1px solid #e5e7eb;
            border-radius:8px;
            padding:14px;
            resize:none;
            font-size:14px;
            color:#374151;
            outline:none;
          "
        >${message}</textarea>
        <div style="display:flex; gap:12px; margin-top:18px;">
          <button
            id="gharbazaar-copy-btn"
            style="
              flex:1;
              height:44px;
              border:none;
              border-radius:6px;
              background:#1B9E4B;
              color:white;
              font-weight:600;
              cursor:pointer;
            "
          >
            Copy
          </button>
          <button
            id="gharbazaar-close-btn"
            style="
              flex:1;
              height:44px;
              border:none;
              border-radius:6px;
              background:#f3f4f6;
              color:#111827;
              font-weight:600;
              cursor:pointer;
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  `;

    document.body.appendChild(popup);

    const closePopup = () => {
      popup.remove();
    };

    document
      .getElementById("gharbazaar-copy-btn")
      ?.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(message);
          closePopup();
        } catch (error) {
          console.error(error);
        }
      });

    document
      .getElementById("gharbazaar-close-btn")
      ?.addEventListener("click", closePopup);
    document
      .getElementById("gharbazaar-share-overlay")
      ?.addEventListener("click", (e) => {
        if (e.target.id === "gharbazaar-share-overlay") closePopup();
      });
  };

  // ===============================
  // IMAGES
  // ===============================
  const images =
    property?.images?.length > 0
      ? property.images
      : ["https://via.placeholder.com/1200x600"];

  const previewImage = images?.[0]?.startsWith("http")
    ? images?.[0]
    : `${APP_BASE_URL}/${images?.[0]}`;

  const propertyUrl = `${APP_BASE_URL}/share/property/${property?._id}`;
  const isClosed = property?.status?.toLowerCase() === "closed";

  // ===============================
  // LOADING
  // ===============================
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFB] gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#1B9E4B] animate-spin" />
        </div>
        <p className="text-gray-400 text-sm font-medium">Loading property…</p>
      </div>
    );
  }

  // ===============================
  // ERROR
  // ===============================
  if (isError || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFB] gap-4">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <Home size={24} className="text-red-400" />
        </div>
        <p className="text-red-500 text-lg font-bold">Property not found</p>
        <BackButton
          onClick={() => navigate("/Recent-properties")}
          variant="light"
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{property?.title} | GharBazaar</title>
        <meta
          name="description"
          content={property?.description || "Premium property listing"}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={property?.title} />
        <meta
          property="og:description"
          content={property?.description || "Premium property listing"}
        />
        <meta property="og:image" content={previewImage} />
        <meta property="og:url" content={propertyUrl} />
        <meta property="og:site_name" content="GharBazaar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={property?.title} />
        <meta
          name="twitter:description"
          content={property?.description || "Premium property listing"}
        />
        <meta name="twitter:image" content={previewImage} />
      </Helmet>

      <div className="min-h-screen bg-[#ede8df] pb-20">
        {/* TOP BAR - STICKY */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
            <BackButton onClick={() => navigate(-1)} variant="light" />
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
                  isClosed
                    ? "bg-red-600 text-white"
                    : "bg-[#1B9E4B] text-white"
                }`}
              >
                {isClosed ? "Closed" : "Active"}
              </span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - WHITE CONTAINER */}
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="bg-white p-8 shadow-sm">
          
          {/* TOP SECTION: Images + Info */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            
            {/* LEFT: IMAGE GALLERY */}
            <div className="w-full lg:w-1/2">
              <div className="flex gap-3">
                {/* THUMBNAILS */}
                <div className="flex flex-col gap-3 w-32">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-full h-24 overflow-hidden border-2 transition-all ${
                        currentImage === i
                          ? "border-[#1B9E4B]"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* MAIN IMAGE */}
                <div className="flex-1 h-[500px] overflow-hidden border border-gray-200">
                  <img
                    src={images[currentImage]}
                    alt={property?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* LOCATION SECTION */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Location
                </h3>
                <div className="h-64 bg-[#f5f5f0] border border-gray-200 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 bg-white border border-gray-200 flex items-center justify-center mb-3">
                    <MapPin size={28} className="text-[#1B9E4B]" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{property?.location}</p>
                  <button
                    onClick={() => {
                      const lat = property?.locationCoordinates?.lat;
                      const lng = property?.locationCoordinates?.lng;
                      if (!lat || !lng) {
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property?.location || "")}`,
                          "_blank"
                        );
                        return;
                      }
                      window.open(
                        `https://www.google.com/maps?q=${lat},${lng}`,
                        "_blank"
                      );
                    }}
                    className="bg-[#1B9E4B] hover:bg-[#178a48] text-white px-6 py-2 text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Map size={16} />
                    View on map
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: PROPERTY INFO */}
            <div className="w-full lg:w-1/2">
              
              {/* DETAILS CONTAINER */}
              <div className="border border-gray-300 p-6 bg-[#e8e4d8]">
              
              {/* TITLE & VIEWS */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {property?.title || "Single room with kitchen"}
                </h1>
                <div className="flex items-center gap-1 text-gray-500 text-xs whitespace-nowrap">
                  <Eye size={14} className="text-gray-400" />
                  <span className="font-medium text-gray-600">
                    {property?.views || 0} views
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-[#1B9E4B]">
                  ₹{property?.price?.toLocaleString("en-IN") || "3,500"}
                </span>
                <span className="text-gray-600 text-base">/month</span>
              </div>

              <div className="flex items-start gap-2 text-gray-600 mb-6">
                <MapPin size={18} className="mt-0.5 text-[#1B9E4B]" />
                <span className="text-sm">{property?.location}</span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={handleBookmark}
                  disabled={bookmarkLoading}
                  className={`w-12 h-12 border flex items-center justify-center transition-all ${
                    isFavorite
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    size={20}
                    className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
                  />
                </button>

                <button
                  onClick={handleShare}
                  className="w-12 h-12 border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center transition-all"
                >
                  <Share2 size={20} className="text-gray-600" />
                </button>

                <button
                  disabled={isClosed}
                  onClick={() => openWhatsApp(property)}
                  className={`flex-1 h-12 font-semibold flex items-center justify-center gap-2 transition-all ${
                    isClosed
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#1B9E4B] hover:bg-[#178a48] text-white"
                  }`}
                >
                  <Phone size={18} />
                  Book on WhatsApp
                </button>
              </div>

              {/* SPECIFICATIONS GRID - White Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 uppercase mb-2 font-semibold">Bedroom</p>
                    <p className="text-lg font-bold text-[#1B9E4B] flex items-center justify-center gap-1">
                      <Bed size={18} className="text-[#1B9E4B]" />
                      {property?.propertySpecifications?.bedroom || "01"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 uppercase mb-2 font-semibold">Bathroom</p>
                    <p className="text-lg font-bold text-[#1B9E4B] flex items-center justify-center gap-1">
                      <Bath size={18} className="text-[#1B9E4B]" />
                      {property?.propertySpecifications?.bathroom || "01"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 uppercase mb-2 font-semibold">Area</p>
                    <p className="text-lg font-bold text-gray-900">
                      {property?.propertySpecifications?.area || "1000 sq.ft"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 uppercase mb-2 font-semibold">Status</p>
                    <p className="text-lg font-bold text-[#1B9E4B] uppercase">
                      {property?.status || "Available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION - White Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {property?.description ||
                    "Comfortable semi-furnished room with kitchen and bathroom near Quantum University. Perfect for students, peaceful location, and affordable rent."}
                </p>
              </div>

              {/* PROPERTY FEATURES - White Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Property Features
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {property?.amenities?.length > 0
                    ? property.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                          <span>{amenity}</span>
                        </div>
                      ))
                    : [
                        "Air Conditioning",
                        "Kitchen",
                        "Store Room",
                        "Marble Flooring",
                        "Car Parking",
                        "Garden Area",
                      ].map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                          <span>{feat}</span>
                        </div>
                      ))}
                </div>
              </div>

              {/* NEARBY AMENITIES - White Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Nearby Amenities
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    "College Nearby",
                    "Hospitals Nearby",
                    "Market",
                    "Street Food",
                    "Public Transport",
                    "Park",
                    "-",
                    "-",
                    "-",
                  ].map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              </div>
              {/* End Details Container */}

            </div>
          </div>

          </div>
          {/* End White Container */}

          {/* STUDENT ACCOMMODATION PLANS */}
          <div className="mt-8 bg-white p-8 shadow-sm">
            
            {/* HEADER */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Student Accommodation Plans
              </h2>
              <p className="text-sm text-gray-600">
                Choose the plan that suits your Needs, Safe, Verified, and Hustle free accommodation
              </p>
            </div>

            {/* PLANS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* SELF-MANAGEMENT PLAN */}
              <div className="bg-[#e8e4d8] border border-gray-300 p-6">
                
                {/* HEADER */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Self-Management Plan
                    </h3>
                    <p className="text-sm text-gray-600">
                      Perfect for students who want direct access to verify properties and manage themselves.
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[#1B9E4B]">₹599</span>
                  <span className="text-sm text-gray-600 ml-2">+ GST</span>
                </div>

                {/* FEATURES */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Verified Properties Access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Direct Owner Contact</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Verified Owner Details</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Property Matching Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Property Photos & Videos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Visiting Coordination</span>
                  </div>
                </div>

                {/* NOT INCLUDING */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Not Including</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <X size={16} strokeWidth={2.5} />
                      <span>Rent Agreement Assistance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <X size={16} strokeWidth={2.5} />
                      <span>Documentation Support</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <X size={16} strokeWidth={2.5} />
                      <span>Police Verification</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <X size={16} strokeWidth={2.5} />
                      <span>Move-in Assistance</span>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <button className="w-full bg-[#014421] hover:bg-[#01331a] text-white py-3 font-semibold transition-colors">
                  Unlock Property Access
                </button>
              </div>

              {/* ASSISTANT ACCOMMODATION PLAN */}
              <div className="bg-[#e8e4d8] border border-gray-300 p-6">
                
                {/* HEADER */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 border-2 border-gray-900 flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Assistant Accommodation Plan
                    </h3>
                    <p className="text-sm text-gray-600">
                      Our team will personally assist you in filing and finalizing accommodation
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="mb-6 flex items-baseline gap-3">
                  <div>
                    <span className="text-3xl font-bold text-[#1B9E4B]">₹1499</span>
                    <span className="text-sm text-gray-600 ml-2">+ GST</span>
                  </div>
                  <span className="bg-white border border-gray-300 px-3 py-1 text-xs text-gray-700">
                    Booking Fee Only
                  </span>
                </div>

                {/* FEATURES */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Requirement Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Visit Scheduling</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Property Shortlisting</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Expert Guidance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Owner coordination</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Dedicated Support</span>
                  </div>
                </div>

                {/* INFO BOX */}
                <div className="bg-white border border-gray-200 p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs text-gray-600">i</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      299 is only booking amount to start the assistance process. 
                      Additionally services such as Rent Agreement, Police Verification, 
                      DocumentationSupport and Move-in Assistance are charged 
                      separately if required.
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <button className="w-full bg-[#014421] hover:bg-[#01331a] text-white py-3 font-semibold transition-colors">
                  Book Assistance Now
                </button>
              </div>

            </div>
          </div>

          {/* SUGGESTED PROPERTIES SECTION */}
          <div className="bg-[#ede8df] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1600px] mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Suggested Properties
              </h2>
              <p className="text-gray-600 mb-8">
                Properties recommended based on your preferences
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Property Card 1 */}
                <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80" 
                      alt="Property" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-bold">
                      VERIFIED
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
                      <Heart size={18} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Modern 2BHK Apartment
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin size={14} />
                      Koramangala, Bangalore
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Bed size={16} /> 2
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={16} /> 2
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        ₹25,000<span className="text-sm font-normal text-gray-600">/month</span>
                      </span>
                    </div>
                    <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 text-sm font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Property Card 2 */}
                <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80" 
                      alt="Property" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-bold">
                      VERIFIED
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
                      <Heart size={18} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Spacious 3BHK Villa
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin size={14} />
                      Indiranagar, Bangalore
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Bed size={16} /> 3
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={16} /> 3
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        ₹45,000<span className="text-sm font-normal text-gray-600">/month</span>
                      </span>
                    </div>
                    <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 text-sm font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Property Card 3 */}
                <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80" 
                      alt="Property" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-bold">
                      VERIFIED
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
                      <Heart size={18} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Cozy 1BHK Flat
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin size={14} />
                      Whitefield, Bangalore
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Bed size={16} /> 1
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={16} /> 1
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        ₹15,000<span className="text-sm font-normal text-gray-600">/month</span>
                      </span>
                    </div>
                    <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 text-sm font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Property Card 4 */}
                <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80" 
                      alt="Property" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-bold">
                      VERIFIED
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
                      <Heart size={18} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Luxury 4BHK Penthouse
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin size={14} />
                      HSR Layout, Bangalore
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Bed size={16} /> 4
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={16} /> 4
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        ₹75,000<span className="text-sm font-normal text-gray-600">/month</span>
                      </span>
                    </div>
                    <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 text-sm font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIMILAR PROPERTIES SECTION */}
          <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1600px] mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Similar Properties
              </h2>
              <p className="text-gray-600 mb-8">
                Properties in the same area with similar features
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Property Card 1 */}
                <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80" 
                      alt="Property" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-bold">
                      VERIFIED
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
                      <Heart size={18} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Premium 2BHK Flat
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin size={14} />
                      BTM Layout, Bangalore
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Bed size={16} /> 2
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={16} /> 2
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        ₹28,000<span className="text-sm font-normal text-gray-600">/month</span>
                      </span>
                    </div>
                    <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 text-sm font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Property Card 2 */}
                <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80" 
                      alt="Property" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-bold">
                      VERIFIED
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
                      <Heart size={18} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Modern Studio Apartment
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin size={14} />
                      Electronic City, Bangalore
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Bed size={16} /> 1
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={16} /> 1
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        ₹12,000<span className="text-sm font-normal text-gray-600">/month</span>
                      </span>
                    </div>
                    <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 text-sm font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Property Card 3 */}
                <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80" 
                      alt="Property" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-bold">
                      VERIFIED
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
                      <Heart size={18} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Elegant 3BHK Apartment
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin size={14} />
                      Marathahalli, Bangalore
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Bed size={16} /> 3
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={16} /> 2
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        ₹35,000<span className="text-sm font-normal text-gray-600">/month</span>
                      </span>
                    </div>
                    <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 text-sm font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Property Card 4 */}
                <div className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&q=80" 
                      alt="Property" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-bold">
                      VERIFIED
                    </div>
                    <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100">
                      <Heart size={18} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Duplex 3BHK House
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin size={14} />
                      Bellandur, Bangalore
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Bed size={16} /> 3
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={16} /> 3
                        </span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        ₹50,000<span className="text-sm font-normal text-gray-600">/month</span>
                      </span>
                    </div>
                    <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 text-sm font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}