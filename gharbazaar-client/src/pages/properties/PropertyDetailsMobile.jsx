// ===============================
// PropertyDetailsMobile.jsx
// Mobile-Optimized Property Details
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
  Home,
  Eye,
  Map,
  X,
  User,
  Users,
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

  const propertyLink = `${APP_BASE_URL}/property/${property?._id}`;
  const message = `
*${property?.title}*

📍 ${property?.location}

💰 ₹${property?.price?.toLocaleString("en-IN")}

${propertyLink}

Hello GharBazaar,
I am interested in this property.
Please share more details.
`;

  const url = `https://wa.me/${GHARBAZAAR_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

// ===============================
// MAIN COMPONENT
// ===============================
export default function PropertyDetailsMobile() {
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

    const propertyLink = `${APP_BASE_URL}/property/${property?._id}`;
    const message = `
${property?.title}

📍 ${property?.location}

💰 ₹${property?.price?.toLocaleString("en-IN")}

${propertyLink}
`;

    try {
      await navigator.clipboard.writeText(message);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy link");
    }
  };

  // ===============================
  // IMAGES
  // ===============================
  const images =
    property?.images?.length > 0
      ? property.images
      : ["https://via.placeholder.com/400x300"];

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4 p-4">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <Home size={24} className="text-red-400" />
        </div>
        <p className="text-red-500 text-lg font-bold">Property not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[#1B9E4B] text-white rounded hover:bg-[#178a48]"
        >
          Go Back
        </button>
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
        <meta property="og:image" content={previewImage} />
        <meta property="og:url" content={propertyUrl} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* TOP BAR - FIXED */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between p-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-[#1B9E4B] text-white rounded"
          >
            <ArrowLeft size={20} />
          </button>
          <span
            className={`px-3 py-1 text-xs font-bold uppercase ${
              isClosed
                ? "bg-red-600 text-white"
                : "bg-[#1B9E4B] text-white"
            }`}
          >
            {isClosed ? "Closed" : "Available"}
          </span>
        </div>

        {/* MAIN CONTENT */}
        <div className="pt-14 pb-20">
          {/* IMAGE GALLERY */}
          <div className="relative">
            <img
              src={images[currentImage]}
              alt={property?.title}
              className="w-full h-[300px] object-cover"
            />
            
            {/* IMAGE THUMBNAILS - BOTTOM */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 px-3">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {images.slice(0, 4).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`flex-shrink-0 w-16 h-16 border-2 overflow-hidden ${
                        currentImage === i
                          ? "border-[#1B9E4B]"
                          : "border-white"
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
              </div>
            )}
          </div>

          {/* PROPERTY INFO */}
          <div className="p-4">
            {/* TITLE */}
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {property?.title || "Single room with kitchen"}
            </h1>

            {/* PRICE */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold text-[#1B9E4B]">
                ₹{property?.price?.toLocaleString("en-IN") || "3,500"}
              </span>
              <span className="text-gray-600 text-sm">/month</span>
            </div>

            {/* LOCATION */}
            <div className="flex items-start gap-2 text-gray-600 mb-4">
              <MapPin size={16} className="mt-0.5 text-[#1B9E4B] flex-shrink-0" />
              <span className="text-sm">{property?.location}</span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={handleBookmark}
                disabled={bookmarkLoading}
                className={`w-12 h-12 border rounded flex items-center justify-center ${
                  isFavorite
                    ? "bg-red-50 border-red-200"
                    : "bg-white border-gray-300"
                }`}
              >
                <Heart
                  size={20}
                  className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
                />
              </button>

              <button
                onClick={handleShare}
                className="w-12 h-12 border border-gray-300 rounded bg-white flex items-center justify-center"
              >
                <Share2 size={20} className="text-gray-600" />
              </button>

              <button
                disabled={isClosed}
                onClick={() => openWhatsApp(property)}
                className={`flex-1 h-12 font-semibold rounded flex items-center justify-center gap-2 ${
                  isClosed
                    ? "bg-gray-200 text-gray-500"
                    : "bg-[#1B9E4B] text-white"
                }`}
              >
                Book on Whatsapp
              </button>
            </div>

            {/* SPECIFICATIONS */}
            <div className="grid grid-cols-4 gap-3 py-4 px-3 bg-gray-50 rounded mb-6">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Bedroom</p>
                <p className="text-sm font-bold text-[#1B9E4B] flex items-center justify-center gap-1">
                  <Bed size={14} />
                  {property?.propertySpecifications?.bedroom || "01"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Bathroom</p>
                <p className="text-sm font-bold text-[#1B9E4B] flex items-center justify-center gap-1">
                  <Bath size={14} />
                  {property?.propertySpecifications?.bathroom || "01"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Area</p>
                <p className="text-sm font-bold text-gray-900">
                  {property?.propertySpecifications?.area || "1000"}
                  <span className="text-xs">sq</span>
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="text-sm font-bold text-[#1B9E4B] uppercase">
                  {property?.status || "Active"}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase">
                Description
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {property?.description ||
                  "Comfortable semi-furnished room with kitchen and bathroom near Quantum University. Perfect for students, peaceful location, and affordable rent."}
              </p>
            </div>

            {/* PROPERTY FEATURES */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase">
                Property Features
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {property?.amenities?.length > 0
                  ? property.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <Check size={14} className="text-[#1B9E4B]" strokeWidth={2.5} />
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
                        <Check size={14} className="text-[#1B9E4B]" strokeWidth={2.5} />
                        <span>{feat}</span>
                      </div>
                    ))}
              </div>
            </div>

            {/* NEARBY AMENITIES */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase">
                Nearby Amenities
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "College Nearby",
                  "Hospital Nearby",
                  "Market",
                  "Street Food",
                  "Public Transport",
                  "Park",
                ].map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <Check size={14} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LOCATION MAP */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase">
                Location
              </h3>
              <div className="h-48 bg-gray-50 rounded border border-gray-200 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center mb-2">
                  <MapPin size={24} className="text-[#1B9E4B]" />
                </div>
                <p className="text-xs text-gray-600 mb-3 text-center px-4">
                  {property?.location}
                </p>
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
                  className="bg-[#1B9E4B] text-white px-4 py-2 text-sm font-semibold rounded flex items-center gap-2"
                >
                  <Map size={14} />
                  View on map
                </button>
              </div>
            </div>

            {/* ACCOMMODATION PLANS */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase text-center">
                Student Accommodation Plans
              </h3>
              <p className="text-xs text-gray-600 text-center mb-4">
                Safe, Verified, and Hassle-free accommodation
              </p>

              {/* SELF-MANAGEMENT PLAN */}
              <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 border-2 border-gray-900 rounded flex items-center justify-center flex-shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">
                      Self-Management Plan
                    </h4>
                    <p className="text-xs text-gray-600">
                      Direct access to verified properties
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-2xl font-bold text-[#1B9E4B]">₹599</span>
                  <span className="text-xs text-gray-600 ml-1">+ GST</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Verified Properties</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Direct Owner Contact</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Property Photos</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Visiting Coordination</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-bold text-gray-900 mb-2">Not Including</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1 text-xs text-red-600">
                      <X size={12} strokeWidth={2.5} />
                      <span>Rent Agreement</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-red-600">
                      <X size={12} strokeWidth={2.5} />
                      <span>Documentation</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#014421] text-white py-2.5 text-sm font-semibold rounded">
                  Unlock Property Access
                </button>
              </div>

              {/* ASSISTANT ACCOMMODATION PLAN */}
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 border-2 border-gray-900 rounded flex items-center justify-center flex-shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">
                      Assistant Accommodation Plan
                    </h4>
                    <p className="text-xs text-gray-600">
                      Personal assistance in finding accommodation
                    </p>
                  </div>
                </div>

                <div className="mb-3 flex items-baseline gap-2">
                  <div>
                    <span className="text-2xl font-bold text-[#1B9E4B]">₹1499</span>
                    <span className="text-xs text-gray-600 ml-1">+ GST</span>
                  </div>
                  <span className="bg-white border border-gray-300 px-2 py-0.5 text-xs text-gray-700 rounded">
                    Booking Fee Only
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Requirement Analysis</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Visit Scheduling</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Property Shortlisting</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Expert Guidance</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Rent Agreement</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Documentation Support</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Police Verification</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Check size={12} className="text-[#1B9E4B]" strokeWidth={2.5} />
                    <span>Move-in Assistance</span>
                  </div>
                </div>

                <button className="w-full bg-[#014421] text-white py-2.5 text-sm font-semibold rounded">
                  Get Full Assistance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
