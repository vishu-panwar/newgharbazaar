// ===============================
// ProductDetails.jsx
// Product Details Page
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
  Eye,
  Star,
  Building2,
  User,
  MessageSquare,
  ShoppingCart,
  CheckCircle,
  X,
  Shield,
  Truck,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";
import SimpleProductCard from "./components/SimpleProductCard";

// ===============================
// CONFIG
// ===============================
const GHARBAZAAR_WHATSAPP = "919548283300";
const APP_BASE_URL = "https://test.gharbazaar.in";

// ===============================
// MOCK PRODUCTS DATA (Same as ProductsMarketplace)
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
    city: "Delhi",
    category: "Cement & Steel",
    quantity: "500+ bags available",
    inStock: true,
    price: 350,
    priceUnit: "/bag",
    rating: 4.8,
    reviews: 245,
    description: "High-quality OPC 53 Grade cement suitable for all types of construction work. Provides superior strength and durability. Ideal for high-rise buildings, bridges, and heavy-duty concrete works.",
    specifications: [
      { label: "Grade", value: "OPC 53" },
      { label: "Weight", value: "50 kg per bag" },
      { label: "Compressive Strength", value: "53 MPa" },
      { label: "Setting Time", value: "Initial: 30 min, Final: 600 min" },
      { label: "Fineness", value: "225 m²/kg" },
    ],
    features: [
      "Superior strength and durability",
      "Low heat of hydration",
      "High resistance to chemical attacks",
      "Eco-friendly manufacturing",
      "Consistent quality",
      "BIS certified",
    ],
  },
  {
    _id: "2",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=500&q=80",
    name: "Vitrified Tiles 800x800mm",
    brand: "Kajaria",
    seller: "Royal Tiles & Sanitary",
    sellerType: "organization",
    verified: true,
    businessType: "Retailer",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    category: "Tiles & Flooring",
    quantity: "1000+ boxes",
    inStock: true,
    price: 45,
    priceUnit: "/sq.ft",
    rating: 4.9,
    reviews: 412,
    description: "Premium vitrified tiles with high gloss finish. Perfect for modern homes and commercial spaces. Available in multiple designs and patterns.",
    specifications: [
      { label: "Size", value: "800mm x 800mm" },
      { label: "Thickness", value: "10mm" },
      { label: "Finish", value: "High Gloss" },
      { label: "Water Absorption", value: "< 0.5%" },
      { label: "Coverage", value: "6.25 sq.ft per tile" },
    ],
    features: [
      "High gloss finish",
      "Stain resistant",
      "Easy to clean",
      "Low maintenance",
      "Scratch resistant",
      "Anti-skid surface",
    ],
  },
  {
    _id: "3",
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&q=80",
    name: "Smart LED Bulbs (Pack of 10)",
    brand: "Philips",
    seller: "TechHome Solutions",
    sellerType: "organization",
    verified: true,
    businessType: "Wholesaler",
    location: "Bangalore, Karnataka",
    city: "Bangalore",
    category: "Smart Home Devices",
    quantity: "2000+ units",
    inStock: true,
    price: 1200,
    priceUnit: "/pack",
    rating: 4.7,
    reviews: 289,
    description: "Energy-efficient smart LED bulbs with WiFi connectivity. Control via mobile app. Compatible with Alexa and Google Home.",
    specifications: [
      { label: "Wattage", value: "9W (Equivalent to 60W)" },
      { label: "Color Temperature", value: "Tunable White (2700K-6500K)" },
      { label: "Lumens", value: "806 lm" },
      { label: "Lifespan", value: "25,000 hours" },
      { label: "Connectivity", value: "WiFi 2.4GHz" },
    ],
    features: [
      "WiFi enabled smart control",
      "Voice control compatible",
      "Adjustable brightness",
      "Color temperature control",
      "Energy saving",
      "Long lifespan",
    ],
  },
  {
    _id: "4",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80",
    name: "Modular Kitchen Set - Premium",
    brand: "Godrej Interio",
    seller: "Elite Interiors",
    sellerType: "organization",
    verified: true,
    businessType: "Retailer",
    location: "Pune, Maharashtra",
    city: "Pune",
    category: "Kitchen & Modular",
    quantity: "50+ units",
    inStock: false,
    price: 85000,
    priceUnit: "/set",
    rating: 4.9,
    reviews: 156,
    description: "Complete modular kitchen setup with premium fittings and accessories. Includes cabinets, drawers, and countertop.",
    specifications: [
      { label: "Material", value: "Marine Plywood & MDF" },
      { label: "Finish", value: "Laminate with PU Coating" },
      { label: "Cabinet Type", value: "Wall + Base Units" },
      { label: "Countertop", value: "Granite (Included)" },
      { label: "Warranty", value: "5 years" },
    ],
    features: [
      "Premium quality materials",
      "Soft-close hinges",
      "Modular design",
      "Easy installation",
      "Water-resistant",
      "Termite-proof",
    ],
  },
  {
    _id: "5",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&q=80",
    name: "TMT Steel Bars - Fe 500D",
    brand: "TATA Steel",
    seller: "Metropolitan Steel Corp",
    sellerType: "organization",
    verified: true,
    businessType: "Wholesaler",
    location: "Kolkata, West Bengal",
    city: "Kolkata",
    category: "Cement & Steel",
    quantity: "10+ tons",
    inStock: true,
    price: 52000,
    priceUnit: "/ton",
    rating: 4.8,
    reviews: 523,
    description: "High strength TMT bars for construction. Earthquake resistant with superior ductility and weldability.",
    specifications: [
      { label: "Grade", value: "Fe 500D" },
      { label: "Diameter Range", value: "8mm to 32mm" },
      { label: "Yield Strength", value: "500 MPa" },
      { label: "Elongation", value: "≥ 16%" },
      { label: "Standard", value: "IS 1786:2008" },
    ],
    features: [
      "Earthquake resistant",
      "High strength",
      "Superior ductility",
      "Excellent weldability",
      "Corrosion resistant",
      "BIS certified",
    ],
  },
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
🏢 by ${product?.seller}

${productLink}

Hello GharBazaar,
I am interested in this product.
Please share more details.
`;

  const url = `https://wa.me/${GHARBAZAAR_WHATSAPP}?text=${encodeURIComponent(message)}`;
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
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Find product by ID
  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p._id === id);
  }, [id]);

  // Get similar products (same category, excluding current)
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return MOCK_PRODUCTS.filter(
      (p) => p.category === product.category && p._id !== product._id
    ).slice(0, 5);
  }, [product]);

  // ===============================
  // RESET IMAGE ON PRODUCT CHANGE
  // ===============================
  useEffect(() => {
    setCurrentImage(0);
  }, [id]);

  // ===============================
  // BOOKMARK TOGGLE
  // ===============================
  const handleBookmark = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from wishlist" : "Added to wishlist");
  };

  // ===============================
  // SHARE
  // ===============================
  const handleShare = async () => {
    if (!product) return;

    const productLink = `${APP_BASE_URL}/product/${product?._id}`;
    const message = `
${product?.name}

💰 ₹${product?.price?.toLocaleString("en-IN")}${product?.priceUnit}

📍 ${product?.location}
🏢 by ${product?.seller}

${productLink}
`;

    try {
      await navigator.clipboard.writeText(message);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy link");
    }
  };

  // Mock images for gallery (using same image multiple times for demo)
  const images = product?.image ? [product.image, product.image, product.image] : [];

  const isOutOfStock = !product?.inStock;

  // ===============================
  // LOADING/ERROR STATES
  // ===============================
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFB] gap-4">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <Package size={24} className="text-red-400" />
        </div>
        <p className="text-red-500 text-lg font-bold">Product not found</p>
        <BackButton
          onClick={() => navigate("/products-marketplace")}
          variant="light"
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product?.name} | GharBazaar Products</title>
        <meta
          name="description"
          content={product?.description || "Premium product listing"}
        />
        <meta property="og:title" content={product?.name} />
        <meta property="og:description" content={product?.description} />
        <meta property="og:image" content={product?.image} />
      </Helmet>

      <div className="min-h-screen bg-[#ede8df] pb-20">
        {/* TOP BAR - STICKY */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
            <BackButton onClick={() => navigate("/products-marketplace")} variant="light" />
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
                  isOutOfStock
                    ? "bg-red-600 text-white"
                    : "bg-[#1B9E4B] text-white"
                }`}
              >
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
          <div className="bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
            
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
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* SELLER INFO CARD */}
                <div className="mt-8 bg-white border border-gray-200 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-[#e8f5e9] flex items-center justify-center">
                      {product.sellerType === "individual" ? (
                        <User size={28} className="text-[#1B9E4B]" />
                      ) : (
                        <Building2 size={28} className="text-[#1B9E4B]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {product.seller}
                        </h3>
                        {product.verified && (
                          <CheckCircle size={18} className="text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{product.businessType}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin size={14} />
                        <span>{product.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => openWhatsApp(product)}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone size={18} />
                    Contact Seller on WhatsApp
                  </button>
                </div>
              </div>

              {/* RIGHT: PRODUCT INFO */}
              <div className="w-full lg:w-1/2">
                
                {/* DETAILS CONTAINER */}
                <div className="border border-gray-300 p-6 bg-[#e8e4d8]">
                
                  {/* BRAND */}
                  <div className="mb-2">
                    <span className="text-sm font-bold text-[#1B9E4B] uppercase">
                      {product.brand}
                    </span>
                  </div>

                  {/* TITLE & RATING */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-1 text-amber-500 whitespace-nowrap">
                      <Star size={18} fill="currentColor" />
                      <span className="text-lg font-bold text-gray-900">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-600">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-[#1B9E4B]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-gray-600 text-lg">{product.priceUnit}</span>
                  </div>

                  {/* CATEGORY & LOCATION */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Package size={16} className="text-[#1B9E4B]" />
                      <span className="text-sm">{product.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} className="text-[#1B9E4B]" />
                      <span className="text-sm">{product.location}</span>
                    </div>
                  </div>

                  {/* AVAILABILITY */}
                  <div className="mb-6 p-4 bg-white rounded border border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Availability
                    </p>
                    <p className="text-sm text-gray-700">{product.quantity}</p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={handleBookmark}
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
                      disabled={isOutOfStock}
                      onClick={() => toast.info("Request quote feature coming soon!")}
                      className={`flex-1 h-12 font-semibold flex items-center justify-center gap-2 transition-all ${
                        isOutOfStock
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-[#1B9E4B] hover:bg-[#178a48] text-white"
                      }`}
                    >
                      <MessageSquare size={18} />
                      Request Quote
                    </button>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Product Description
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* SPECIFICATIONS */}
                  {product.specifications && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Specifications
                      </h3>
                      <div className="space-y-3">
                        {product.specifications.map((spec, index) => (
                          <div
                            key={index}
                            className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <span className="text-sm font-semibold text-gray-700">
                              {spec.label}
                            </span>
                            <span className="text-sm text-gray-900 text-right">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FEATURES */}
                  {product.features && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {product.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <Check size={16} className="text-[#1B9E4B]" strokeWidth={2.5} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TRUST BADGES */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Shield size={24} className="text-[#1B9E4B] mx-auto mb-2" />
                        <p className="text-xs font-semibold text-gray-900">
                          Verified Seller
                        </p>
                      </div>
                      <div>
                        <Truck size={24} className="text-[#1B9E4B] mx-auto mb-2" />
                        <p className="text-xs font-semibold text-gray-900">
                          Fast Delivery
                        </p>
                      </div>
                      <div>
                        <Clock size={24} className="text-[#1B9E4B] mx-auto mb-2" />
                        <p className="text-xs font-semibold text-gray-900">
                          24/7 Support
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
                {/* End Details Container */}

              </div>
            </div>

          </div>
          {/* End White Container */}
        </div>

        {/* SIMILAR PRODUCTS SECTION */}
        {similarProducts.length > 0 && (
          <div className="bg-[#ede8df] py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Similar Products
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    More products in {product.category}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {similarProducts.map((prod) => (
                  <div key={prod._id} onClick={() => navigate(`/product/${prod._id}`)}>
                    <SimpleProductCard product={prod} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
