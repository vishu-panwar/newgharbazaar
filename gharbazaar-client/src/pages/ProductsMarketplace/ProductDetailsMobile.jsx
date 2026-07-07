// ===============================
// ProductDetailsMobile.jsx
// Mobile-Optimized Product Details
// ===============================

import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Heart,
  Share2,
  Check,
  ArrowLeft,
  Phone,
  Package,
  Star,
  Building2,
  User,
  MessageSquare,
  CheckCircle,
  Shield,
  Truck,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";

// ===============================
// CONFIG
// ===============================
const GHARBAZAAR_WHATSAPP = "919548283300";
const APP_BASE_URL = "https://test.gharbazaar.in";

// ===============================
// MOCK PRODUCTS DATA
// ===============================
const MOCK_PRODUCTS = [
  {
    _id: "1",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&q=80",
    name: "Premium Cement - OPC 53 Grade",
    brand: "UltraTech",
    seller: "Sharma Building Materials",
    sellerType: "organization",
    verified: true,
    businessType: "Wholesaler",
    location: "Delhi",
    category: "Cement & Steel",
    quantity: "500+ bags available",
    inStock: true,
    price: 350,
    priceUnit: "/bag",
    rating: 4.8,
    reviews: 245,
    description: "High-quality OPC 53 Grade cement suitable for all types of construction work. Provides superior strength and durability.",
    specifications: [
      { label: "Grade", value: "OPC 53" },
      { label: "Weight", value: "50 kg per bag" },
      { label: "Compressive Strength", value: "53 MPa" },
    ],
    features: [
      "Superior strength",
      "Low heat of hydration",
      "Chemical resistant",
      "Eco-friendly",
      "BIS certified",
    ],
  },
  // Add other products with same structure...
];

// ===============================
// WHATSAPP
// ===============================
const openWhatsApp = (product) => {
  if (!product) return;

  const productLink = `${APP_BASE_URL}/product/${product?._id}`;
  const message = `
*${product?.name}*

💰 ₹${product?.price?.toLocaleString("en-IN")}${product?.priceUnit}

📍 ${product?.location}

${productLink}

Hello GharBazaar,
I am interested in this product.
`;

  const url = `https://wa.me/${GHARBAZAAR_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

// ===============================
// MAIN COMPONENT
// ===============================
export default function ProductDetailsMobile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Find product by ID
  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p._id === id);
  }, [id]);

  useEffect(() => {
    setCurrentImage(0);
  }, [id]);

  const handleBookmark = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleShare = async () => {
    if (!product) return;
    const productLink = `${APP_BASE_URL}/product/${product?._id}`;
    const message = `${product?.name}\n\n💰 ₹${product?.price}${product?.priceUnit}\n\n${productLink}`;

    try {
      await navigator.clipboard.writeText(message);
      toast.success("Link copied!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const images = product?.image ? [product.image, product.image] : [];
  const isOutOfStock = !product?.inStock;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4 p-4">
        <Package size={32} className="text-red-400" />
        <p className="text-red-500 font-bold">Product not found</p>
        <button
          onClick={() => navigate("/products-marketplace")}
          className="px-6 py-2 bg-[#1B9E4B] text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product?.name} | GharBazaar</title>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* TOP BAR - FIXED */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between p-3">
          <button
            onClick={() => navigate("/products-marketplace")}
            className="w-10 h-10 flex items-center justify-center bg-[#1B9E4B] text-white rounded"
          >
            <ArrowLeft size={20} />
          </button>
          <span
            className={`px-3 py-1 text-xs font-bold uppercase ${
              isOutOfStock ? "bg-red-600 text-white" : "bg-[#1B9E4B] text-white"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "In Stock"}
          </span>
        </div>

        {/* MAIN CONTENT */}
        <div className="pt-14 pb-20">
          {/* IMAGE */}
          <div className="relative">
            <img
              src={images[currentImage]}
              alt={product?.name}
              className="w-full h-[300px] object-cover"
            />
            
            {images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 px-3">
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-16 h-16 border-2 ${
                        currentImage === i ? "border-[#1B9E4B]" : "border-white"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="p-4">
            {/* BRAND */}
            <p className="text-xs font-bold text-[#1B9E4B] uppercase mb-1">
              {product.brand}
            </p>

            {/* TITLE & RATING */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h1 className="text-xl font-bold text-gray-900 flex-1">
                {product.name}
              </h1>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold">{product.rating}</span>
              </div>
            </div>

            {/* PRICE */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold text-[#1B9E4B]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-gray-600">{product.priceUnit}</span>
            </div>

            {/* CATEGORY & LOCATION */}
            <div className="flex flex-col gap-2 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Package size={14} />
                <span>{product.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{product.location}</span>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <p className="text-xs font-semibold mb-1">Availability</p>
              <p className="text-sm">{product.quantity}</p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={handleBookmark}
                className={`w-12 h-12 border rounded flex items-center justify-center ${
                  isFavorite ? "bg-red-50 border-red-200" : "border-gray-300"
                }`}
              >
                <Heart
                  size={20}
                  className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
                />
              </button>

              <button
                onClick={handleShare}
                className="w-12 h-12 border border-gray-300 rounded flex items-center justify-center"
              >
                <Share2 size={20} />
              </button>

              <button
                disabled={isOutOfStock}
                onClick={() => toast.info("Quote feature coming soon!")}
                className={`flex-1 h-12 font-semibold rounded flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? "bg-gray-200 text-gray-500"
                    : "bg-[#1B9E4B] text-white"
                }`}
              >
                <MessageSquare size={18} />
                Request Quote
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Description</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* SPECIFICATIONS */}
            {product.specifications && (
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Specifications</h3>
                <div className="space-y-2">
                  {product.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between py-2 border-b text-sm"
                    >
                      <span className="font-semibold">{spec.label}</span>
                      <span className="text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FEATURES */}
            {product.features && (
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-[#1B9E4B]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SELLER */}
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-[#e8f5e9] flex items-center justify-center rounded">
                  {product.sellerType === "individual" ? (
                    <User size={24} className="text-[#1B9E4B]" />
                  ) : (
                    <Building2 size={24} className="text-[#1B9E4B]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{product.seller}</p>
                    {product.verified && <CheckCircle size={16} className="text-blue-500" />}
                  </div>
                  <p className="text-xs text-gray-600">{product.businessType}</p>
                </div>
              </div>
              
              <button
                onClick={() => openWhatsApp(product)}
                className="w-full bg-[#25D366] text-white py-3 rounded font-semibold flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Contact Seller
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-3 gap-4 text-center py-4">
              <div>
                <Shield size={24} className="text-[#1B9E4B] mx-auto mb-1" />
                <p className="text-xs font-semibold">Verified</p>
              </div>
              <div>
                <Truck size={24} className="text-[#1B9E4B] mx-auto mb-1" />
                <p className="text-xs font-semibold">Fast Delivery</p>
              </div>
              <div>
                <Clock size={24} className="text-[#1B9E4B] mx-auto mb-1" />
                <p className="text-xs font-semibold">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
