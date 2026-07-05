import {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  Search,
  SlidersHorizontal,
  Package,
  ChevronDown,
  ArrowLeft,
  RefreshCw,
  X,
  ShoppingBag,
  Store,
  FileText,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  User,
  Phone,
  MapPin,
  CheckCircle,
  Users,
  Clock,
  Headphones,
  ShoppingCart,
  Shield,
  Zap,
} from "lucide-react";

import ProductCard from "./components/ProductCard";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import SimpleProductCard from "./components/SimpleProductCard";

// Import hero images for carousel
import heroImage1 from "../../assets/image.png";
import heroImage2 from "../../assets/Screenshot 2026-07-05 191407.png";
import heroImage3 from "../../assets/Screenshot 2026-07-05 192008.png";
import heroImage4 from "../../assets/Screenshot 2026-07-05 192032.png";

// Import mobile hero images
import mobileHeroImage1 from "../../assets/Screenshot 2026-07-05 202930.png";
import mobileHeroImage2 from "../../assets/Screenshot 2026-07-05 202943.png";
import mobileHeroImage3 from "../../assets/Screenshot 2026-07-05 203003.png";
import mobileHeroImage4 from "../../assets/Screenshot 2026-07-05 203025.png";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_LIMIT = 8;

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "Building Materials", label: "Building Materials" },
  { value: "Cement & Steel", label: "Cement & Steel" },
  { value: "Tiles & Flooring", label: "Tiles & Flooring" },
  { value: "Paints", label: "Paints" },
  { value: "Electrical", label: "Electrical" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "Furniture", label: "Furniture" },
  { value: "Smart Home Devices", label: "Smart Home Devices" },
  { value: "Kitchen & Modular", label: "Kitchen & Modular" },
];

const CITY_OPTIONS = [
  { value: "all", label: "All Cities" },
  { value: "Delhi", label: "Delhi" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Pune", label: "Pune" },
  { value: "Chennai", label: "Chennai" },
  { value: "Kolkata", label: "Kolkata" },
];

const BUSINESS_TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "Wholesaler", label: "Wholesaler" },
  { value: "Retailer", label: "Retailer" },
  { value: "Manufacturer", label: "Manufacturer" },
  { value: "Distributor", label: "Distributor" },
];

// ─── Mock Data (Replace with API) ─────────────────────────────────────────────

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
  },
  {
    _id: "6",
    image: "https://images.unsplash.com/photo-1572371371081-40670c6dd6ae?w=500&q=80",
    name: "Exterior Emulsion Paint 20L",
    brand: "Asian Paints",
    seller: "Rajesh Kumar",
    sellerType: "individual",
    verified: true,
    businessType: "Distributor",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    category: "Paints",
    quantity: "500+ cans",
    inStock: true,
    price: 3500,
    priceUnit: "/can",
    rating: 4.7,
    reviews: 378,
  },
  {
    _id: "7",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&q=80",
    name: "LED Tube Light 20W",
    brand: "Havells",
    seller: "Amit Sharma",
    sellerType: "individual",
    verified: true,
    businessType: "Wholesaler",
    location: "Delhi",
    city: "Delhi",
    category: "Electrical",
    quantity: "3000+ pieces",
    inStock: true,
    price: 180,
    priceUnit: "/piece",
    rating: 4.6,
    reviews: 192,
  },
  {
    _id: "8",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80",
    name: "PVC Bathroom Fittings Set",
    brand: "Supreme",
    seller: "Plumbing Solutions Hub",
    sellerType: "organization",
    verified: true,
    businessType: "Retailer",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    category: "Plumbing",
    quantity: "200+ sets",
    inStock: true,
    price: 2500,
    priceUnit: "/set",
    rating: 4.5,
    reviews: 134,
  },
  // Additional Building Materials Products
  {
    _id: "9",
    image: "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=500&q=80",
    name: "Red Clay Bricks (1000 pcs)",
    brand: "Brickworks",
    seller: "Delhi Brick Suppliers",
    sellerType: "organization",
    verified: true,
    businessType: "Manufacturer",
    location: "Delhi",
    city: "Delhi",
    category: "Building Materials",
    quantity: "5000+ pieces",
    inStock: true,
    price: 8500,
    priceUnit: "/1000 pcs",
    rating: 4.6,
    reviews: 178,
  },
  {
    _id: "10",
    image: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=500&q=80",
    name: "Construction Sand (Per Ton)",
    brand: "RiverSand Co",
    seller: "Mumbai Sand & Aggregates",
    sellerType: "organization",
    verified: true,
    businessType: "Wholesaler",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    category: "Building Materials",
    quantity: "100+ tons",
    inStock: true,
    price: 1200,
    priceUnit: "/ton",
    rating: 4.4,
    reviews: 89,
  },
  {
    _id: "11",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&q=80",
    name: "AAC Blocks - Lightweight",
    brand: "Ultratech",
    seller: "Modern Builders Supply",
    sellerType: "organization",
    verified: true,
    businessType: "Distributor",
    location: "Bangalore, Karnataka",
    city: "Bangalore",
    category: "Building Materials",
    quantity: "2000+ blocks",
    inStock: true,
    price: 55,
    priceUnit: "/block",
    rating: 4.7,
    reviews: 234,
  },
  {
    _id: "12",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&q=80",
    name: "M-Sand (Manufactured Sand)",
    brand: "EcoSand",
    seller: "Chennai Construction Materials",
    sellerType: "organization",
    verified: true,
    businessType: "Manufacturer",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    category: "Cement & Steel",
    quantity: "150+ tons",
    inStock: true,
    price: 1500,
    priceUnit: "/ton",
    rating: 4.5,
    reviews: 156,
  },
  // Additional Smart Home Devices
  {
    _id: "13",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
    name: "Smart Door Lock with Fingerprint",
    brand: "Yale",
    seller: "SmartHome India",
    sellerType: "organization",
    verified: true,
    businessType: "Retailer",
    location: "Delhi",
    city: "Delhi",
    category: "Smart Home Devices",
    quantity: "100+ units",
    inStock: true,
    price: 12500,
    priceUnit: "/unit",
    rating: 4.8,
    reviews: 312,
  },
  {
    _id: "14",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=80",
    name: "Wi-Fi Security Camera 1080p",
    brand: "Xiaomi",
    seller: "TechZone Electronics",
    sellerType: "organization",
    verified: true,
    businessType: "Wholesaler",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    category: "Smart Home Devices",
    quantity: "500+ units",
    inStock: true,
    price: 2999,
    priceUnit: "/unit",
    rating: 4.6,
    reviews: 567,
  },
  {
    _id: "15",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=500&q=80",
    name: "Smart Light Switches (Set of 4)",
    brand: "Livolo",
    seller: "Electric World",
    sellerType: "organization",
    verified: true,
    businessType: "Retailer",
    location: "Bangalore, Karnataka",
    city: "Bangalore",
    category: "Electrical",
    quantity: "300+ sets",
    inStock: true,
    price: 3500,
    priceUnit: "/set",
    rating: 4.7,
    reviews: 198,
  },
  {
    _id: "16",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80",
    name: "Video Doorbell with App",
    brand: "Ring",
    seller: "Security Systems Pro",
    sellerType: "organization",
    verified: true,
    businessType: "Distributor",
    location: "Pune, Maharashtra",
    city: "Pune",
    category: "Smart Home Devices",
    quantity: "80+ units",
    inStock: true,
    price: 8999,
    priceUnit: "/unit",
    rating: 4.9,
    reviews: 423,
  },
  // Additional Furniture Products
  {
    _id: "17",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    name: "3-Seater Sofa Set - Fabric",
    brand: "Urban Ladder",
    seller: "Furniture Gallery",
    sellerType: "organization",
    verified: true,
    businessType: "Retailer",
    location: "Delhi",
    city: "Delhi",
    category: "Furniture",
    quantity: "25+ sets",
    inStock: true,
    price: 35000,
    priceUnit: "/set",
    rating: 4.8,
    reviews: 189,
  },
  {
    _id: "18",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80",
    name: "6-Seater Dining Table Set",
    brand: "Godrej Interio",
    seller: "Home Comfort Store",
    sellerType: "organization",
    verified: true,
    businessType: "Retailer",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    category: "Furniture",
    quantity: "15+ sets",
    inStock: true,
    price: 42000,
    priceUnit: "/set",
    rating: 4.7,
    reviews: 145,
  },
  {
    _id: "19",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
    name: "King Size Bedroom Set",
    brand: "Durian",
    seller: "Luxury Furniture Hub",
    sellerType: "organization",
    verified: true,
    businessType: "Retailer",
    location: "Bangalore, Karnataka",
    city: "Bangalore",
    category: "Furniture",
    quantity: "10+ sets",
    inStock: true,
    price: 65000,
    priceUnit: "/set",
    rating: 4.9,
    reviews: 234,
  },
  {
    _id: "20",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=500&q=80",
    name: "Executive Office Desk with Chair",
    brand: "Featherlite",
    seller: "Office Solutions",
    sellerType: "organization",
    verified: true,
    businessType: "Wholesaler",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    category: "Furniture",
    quantity: "50+ sets",
    inStock: true,
    price: 28000,
    priceUnit: "/set",
    rating: 4.6,
    reviews: 178,
  },
  {
    _id: "21",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&q=80",
    name: "Luxury L-Shape Modular Kitchen",
    brand: "Sleek",
    seller: "Kitchen World",
    sellerType: "organization",
    verified: true,
    businessType: "Manufacturer",
    location: "Pune, Maharashtra",
    city: "Pune",
    category: "Kitchen & Modular",
    quantity: "8+ units",
    inStock: true,
    price: 125000,
    priceUnit: "/set",
    rating: 4.9,
    reviews: 267,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-gray-200 p-2.5 pr-10 rounded-lg text-sm font-medium text-slate-800 appearance-none outline-none focus:border-[#1f9d55] focus:bg-white transition-all"
        >
          {options.map(({ value: v, label: l }) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
        />
      </div>
    </div>
  );
}

function EmptyState({ message = "No products available at the moment." }) {
  return (
    <div className="bg-white border border-dashed border-gray-200 rounded-2xl py-14 text-center w-full">
      <p className="text-gray-400 font-medium text-sm px-4">{message}</p>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductsMarketplace() {
  const navigate = useNavigate();

  // ── UI state ──────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── Filter state ──────────────────────────────────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedBusinessType, setSelectedBusinessType] = useState("all");

  // ── Data state (using mock data - replace with API) ──────────────────────
  const [allProducts] = useState(MOCK_PRODUCTS);

  // ── Derived: active filters indicator ─────────────────────────────────────
  const hasActiveFilters = 
    selectedCategory !== "all" || 
    selectedCity !== "all" || 
    selectedBusinessType !== "all" || 
    searchQuery.trim() !== "";

  // ── Client-side filter ────────────────────────────────────────────────────
  const filteredDisplay = useMemo(() => {
    let filtered = [...allProducts];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // City filter
    if (selectedCity !== "all") {
      filtered = filtered.filter(p => p.city === selectedCity);
    }

    // Business type filter
    if (selectedBusinessType !== "all") {
      filtered = filtered.filter(p => p.businessType === selectedBusinessType);
    }

    // Search filter
    const term = searchQuery.toLowerCase().trim();
    if (term) {
      filtered = filtered.filter(
        (p) =>
          p?.name?.toLowerCase().includes(term) ||
          p?.brand?.toLowerCase().includes(term) ||
          p?.vendor?.toLowerCase().includes(term) ||
          p?.location?.toLowerCase().includes(term) ||
          p?.category?.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [allProducts, selectedCategory, selectedCity, selectedBusinessType, searchQuery]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleRefetch = useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedCity("all");
    setSelectedBusinessType("all");
    setSearchQuery("");
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f7f3eb] font-sans antialiased relative z-0">
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Find Products Section */}
      <FindProductsSection />

      {/* Recently Listed Products */}
      <RecentlyListedProducts />

      {/* Product Categories */}
      <ProductCategoriesSection />

      {/* Building Materials Section */}
      <BuildingMaterialsSection />

      {/* Smart Home Devices Section */}
      <SmartHomeDevicesSection />

      {/* Furniture & Decor Section */}
      <FurnitureDecorSection />

      {/* Product Enquiry Section */}
      <ProductEnquirySection />
    </div>
  );
}

// ─── Hero Banner Component ─────────────────────────────────────────────────

function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Desktop carousel slides
  const desktopSlides = [
    {
      id: 1,
      image: heroImage1,
      title: "Discover Quality Products",
    },
    {
      id: 2,
      image: heroImage2,
      title: "Connect with Verified Vendors",
    },
    {
      id: 3,
      image: heroImage3,
      title: "Zero Commission Marketplace",
    },
    {
      id: 4,
      image: heroImage4,
      title: "Building Materials to Smart Home",
    },
  ];

  // Mobile carousel slides
  const mobileSlides = [
    {
      id: 1,
      image: mobileHeroImage1,
      title: "Discover Quality Products",
    },
    {
      id: 2,
      image: mobileHeroImage2,
      title: "Connect with Verified Vendors",
    },
    {
      id: 3,
      image: mobileHeroImage3,
      title: "Zero Commission Marketplace",
    },
    {
      id: 4,
      image: mobileHeroImage4,
      title: "Building Materials to Smart Home",
    },
  ];

  // Use appropriate slides based on screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const slides = isMobile ? mobileSlides : desktopSlides;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full bg-gray-100">
      {/* Desktop Carousel */}
      <div className="hidden md:block relative w-full" style={{ paddingBottom: '28%' }}>
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Carousel - Full Width with Natural Aspect Ratio */}
      <div className="md:hidden relative w-full">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Find Products Section ────────────────────────────────────────────────────

function FindProductsSection() {
  const navigate = useNavigate();

  const handleBrowseByCategory = () => {
    // Scroll to products section or open filters
    const mainSection = document.querySelector('main');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Version */}
      <div className="block md:hidden bg-[#ede8df] px-4 py-5">
        {/* Search Bar */}
        <div className="flex gap-2 mb-5">
          <div className="relative flex-1">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products, brands, vendors..."
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 shadow-sm"
            />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-xl flex items-center gap-2 font-bold text-sm transition-colors shadow-sm">
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        {/* Category Buttons - 4 Columns with gray background and green icons */}
        <div className="grid grid-cols-4 gap-3">
          <button 
            onClick={handleBrowseByCategory}
            className="flex flex-col items-center gap-2.5 p-4 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all shadow-sm"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <ShoppingBag size={28} className="text-green-600" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-gray-900 leading-tight text-center">Browse Products</span>
          </button>

          <button
            onClick={handleBrowseByCategory}
            className="flex flex-col items-center gap-2.5 p-4 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all shadow-sm"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Store size={28} className="text-green-600" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-gray-900 leading-tight text-center">Find Vendors</span>
          </button>

          <button
            className="flex flex-col items-center gap-2.5 p-4 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all shadow-sm"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <FileText size={28} className="text-green-600" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-gray-900 leading-tight text-center">List Products</span>
          </button>

          <button className="flex flex-col items-center gap-2.5 p-4 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all shadow-sm">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <MessageSquare size={28} className="text-green-600" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-gray-900 leading-tight text-center">Get Quote</span>
          </button>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block bg-[#ede8df] w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white max-w-[1600px] mx-auto border border-gray-100 shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Left Content */}
          <div className="flex-1 space-y-5 w-full text-center md:text-left">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#000000] leading-tight">
                Find Verified Products
              </h1>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#1B9E4B] to-[#147638] bg-clip-text text-transparent leading-tight">
                Near You
              </h2>
            </div>

            <div className="text-base text-gray-700 space-y-1">
              <p>Connect with India's top-rated vendors and manufacturers.</p>
              <p>Zero hidden charges. 100% verified vendors.</p>
            </div>

            <div className="flex gap-3">
              <button
                className="inline-block bg-gradient-to-r from-[#1B9E4B] to-[#147638] text-white px-6 py-3 font-bold text-sm hover:opacity-95 transition-all shadow-sm"
              >
                List Products Free
              </button>
              <button
                onClick={handleBrowseByCategory}
                className="inline-block border-2 border-gray-200 text-gray-700 px-6 py-3 font-bold text-sm hover:border-gray-300 transition-all"
              >
                Browse Products
              </button>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="flex flex-col gap-3 w-full md:w-72 shrink-0">

            {/* Card 1 — Active */}
            <button
              onClick={handleBrowseByCategory}
              className="bg-[#eaf5ee] border-2 border-[#1B9E4B] px-6 py-4 text-center hover:shadow-md hover:border-[#147638] transition-all"
            >
              <span className="bg-gradient-to-r from-[#1B9E4B] to-[#147638] bg-clip-text text-transparent font-bold text-base">
                Building Materials
              </span>
            </button>

            {/* Card 2 — Active */}
            <button
              onClick={handleBrowseByCategory}
              className="bg-[#eaf5ee] border-2 border-[#1B9E4B] px-6 py-4 text-center hover:shadow-md hover:border-[#147638] transition-all"
            >
              <span className="bg-gradient-to-r from-[#1B9E4B] to-[#147638] bg-clip-text text-transparent font-bold text-base">
                Smart Home Devices
              </span>
            </button>

            {/* Card 3 — Active */}
            <button
              onClick={handleBrowseByCategory}
              className="bg-[#eaf5ee] border-2 border-[#1B9E4B] px-6 py-4 text-center hover:shadow-md hover:border-[#147638] transition-all"
            >
              <span className="bg-gradient-to-r from-[#1B9E4B] to-[#147638] bg-clip-text text-transparent font-bold text-base">
                Furniture & Decor
              </span>
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

// ─── Recently Listed Products ──────────────────────────────────────────────────

function RecentlyListedProducts() {
  const navigate = useNavigate();

  const handleExploreMore = () => {
    // Scroll to main products section
    const mainSection = document.querySelector('main');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Using first 5 products from MOCK_PRODUCTS
  const recentProducts = MOCK_PRODUCTS.slice(0, 5);

  return (
    <section className="bg-[#ede8df] py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Recently Listed Products
            </h2>
          </div>

          <button
            onClick={handleExploreMore}
            className="text-sm font-semibold text-gray-800 hover:underline flex items-center gap-1 transition-all whitespace-nowrap"
          >
            Explore more →
          </button>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recentProducts.map((product) => (
            <SimpleProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="block md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2">
            {recentProducts.map((product) => (
              <div key={product._id} className="flex-shrink-0 w-[280px]">
                <SimpleProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Product Categories Section ────────────────────────────────────────────────

function ProductCategoriesSection() {
  const navigate = useNavigate();

  const categoriesToDisplay = [
    {
      type: "Building Materials",
      title: "Up to 30% off",
      subTitle: "Building Materials | Top Brands",
      items: [
        { label: "Cement & Steel", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&q=80" },
        { label: "Bricks & Blocks", image: "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=500&q=80" },
        { label: "Sand & Aggregates", image: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=500&q=80" },
        { label: "TMT Bars", image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&q=80" },
      ],
    },
    {
      type: "Smart Home Devices",
      title: "Smart Home Devices",
      subTitle: "Starting ₹500 | Premium Quality",
      items: [
        { label: "Smart Lighting", image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&q=80" },
        { label: "Smart Locks", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80" },
        { label: "Security Systems", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=80" },
        { label: "Smart Switches", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&q=80" },
      ],
    },
    {
      type: "Tiles & Flooring",
      title: "Tiles & Flooring",
      subTitle: "Best Quality | Verified Vendors",
      items: [
        { label: "Vitrified Tiles", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=500&q=80" },
        { label: "Ceramic Tiles", image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=500&q=80" },
        { label: "Wooden Flooring", image: "https://images.unsplash.com/photo-1534237886190-ced735ca4b73?w=500&q=80" },
        { label: "Marble Tiles", image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=500&q=80" },
      ],
    },
    {
      type: "Furniture",
      title: "Furniture & Decor",
      subTitle: "Premium Design | Exclusive Collections",
      items: [
        { label: "Sofa Sets", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80" },
        { label: "Dining Tables", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80" },
        { label: "Bedroom Sets", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80" },
        { label: "Office Furniture", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=500&q=80" },
      ],
    },
  ];

  const handleCategoryClick = (category) => {
    // Scroll to products and set filter
    const mainSection = document.querySelector('main');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#ede8df] py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            Categories
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoriesToDisplay.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat.type)}
              className="bg-white p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              {/* Top */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-gray-900 text-lg leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{cat.subTitle}</p>
                </div>

                <div className="flex items-center text-sm text-gray-500 group-hover:text-[#1f9d55] transition-colors whitespace-nowrap">
                  Explore more
                  <ArrowRight
                    size={15}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="group/item">
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-[100px] object-cover transition-transform duration-500 group-hover/item:scale-110"
                      />
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800 mt-2 leading-tight">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="block md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-2">
            {categoriesToDisplay.map((cat, idx) => (
              <div key={idx} className="flex-shrink-0 w-[320px]">
                <div
                  onClick={() => handleCategoryClick(cat.type)}
                  className="bg-white p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  {/* Top */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-gray-900 text-lg leading-tight">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{cat.subTitle}</p>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 group-hover:text-[#1f9d55] transition-colors whitespace-nowrap">
                      Explore
                      <ArrowRight
                        size={15}
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="group/item">
                        <div className="overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.label}
                            className="w-full h-[100px] object-cover transition-transform duration-500 group-hover/item:scale-110"
                          />
                        </div>
                        <p className="text-[13px] font-semibold text-gray-800 mt-2 leading-tight">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



// ─── Building Materials Section ────────────────────────────────────────────────

function BuildingMaterialsSection() {
  const navigate = useNavigate();

  // Filter products by Building Materials category
  const buildingMaterialsProducts = MOCK_PRODUCTS.filter((product) =>
    product.category === "Cement & Steel" || 
    product.category === "Building Materials"
  ).slice(0, 5);

  const handleExploreMore = () => {
    // Scroll to main products section
    const mainSection = document.querySelector('main');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#ede8df] py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Building Materials
          </h2>
          <button
            onClick={handleExploreMore}
            className="text-sm font-semibold text-gray-800 hover:underline flex items-center gap-1 transition-all"
          >
            Explore more →
          </button>
        </div>

        {/* CARDS - DESKTOP */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {buildingMaterialsProducts.map((product) => (
            <SimpleProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* MOBILE SLIDER */}
        <div className="block md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2">
            {buildingMaterialsProducts.map((product) => (
              <div key={product._id} className="flex-shrink-0 w-[280px]">
                <SimpleProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* EMPTY */}
        {buildingMaterialsProducts.length === 0 && (
          <div className="bg-white border border-dashed border-gray-200 py-14 text-center w-full mt-2">
            <p className="text-gray-400 font-medium text-sm px-4">
              No Building Materials available at the moment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

// ─── Smart Home Devices Section ────────────────────────────────────────────────

function SmartHomeDevicesSection() {
  const navigate = useNavigate();

  // Filter products by Smart Home Devices category
  const smartHomeProducts = MOCK_PRODUCTS.filter((product) =>
    product.category === "Smart Home Devices" || 
    product.category === "Electrical"
  ).slice(0, 5);

  const handleExploreMore = () => {
    // Scroll to main products section
    const mainSection = document.querySelector('main');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#ede8df] py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Smart Home Devices
          </h2>
          <button
            onClick={handleExploreMore}
            className="text-sm font-semibold text-gray-800 hover:underline flex items-center gap-1 transition-all"
          >
            Explore more →
          </button>
        </div>

        {/* CARDS - DESKTOP */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {smartHomeProducts.map((product) => (
            <SimpleProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* MOBILE SLIDER */}
        <div className="block md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2">
            {smartHomeProducts.map((product) => (
              <div key={product._id} className="flex-shrink-0 w-[280px]">
                <SimpleProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* EMPTY */}
        {smartHomeProducts.length === 0 && (
          <div className="bg-white border border-dashed border-gray-200 py-14 text-center w-full mt-2">
            <p className="text-gray-400 font-medium text-sm px-4">
              No Smart Home Devices available at the moment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

// ─── Furniture & Decor Section ─────────────────────────────────────────────────

function FurnitureDecorSection() {
  const navigate = useNavigate();

  // Filter products by Furniture category
  const furnitureProducts = MOCK_PRODUCTS.filter((product) =>
    product.category === "Furniture" || 
    product.category === "Kitchen & Modular"
  ).slice(0, 5);

  const handleExploreMore = () => {
    // Scroll to main products section
    const mainSection = document.querySelector('main');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#ede8df] py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Furniture & Decor
          </h2>
          <button
            onClick={handleExploreMore}
            className="text-sm font-semibold text-gray-800 hover:underline flex items-center gap-1 transition-all"
          >
            Explore more →
          </button>
        </div>

        {/* CARDS - DESKTOP */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {furnitureProducts.map((product) => (
            <SimpleProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* MOBILE SLIDER */}
        <div className="block md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2">
            {furnitureProducts.map((product) => (
              <div key={product._id} className="flex-shrink-0 w-[280px]">
                <SimpleProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* EMPTY */}
        {furnitureProducts.length === 0 && (
          <div className="bg-white border border-dashed border-gray-200 py-14 text-center w-full mt-2">
            <p className="text-gray-400 font-medium text-sm px-4">
              No Furniture & Decor products available at the moment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}


// ─── Product Enquiry Section ───────────────────────────────────────────────────

function ProductEnquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    lookingFor: "",
    location: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/enquery/create`,
        formData
      );
      if (res.data.success) {
        alert("Enquiry Submitted Successfully");
        setFormData({ name: "", phone: "", lookingFor: "", location: "", budget: "" });
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Package,       title: "1000+ Products",              desc: "Verified listings from trusted vendors" },
    { icon: Users,         title: "Trusted by Thousands",        desc: "Safe and reliable marketplace" },
    { icon: Shield,        title: "100+ Verified Vendors",       desc: "Authenticated sellers and manufacturers" },
    { icon: Headphones,    title: "24/7 Support",                desc: "Quick response from our team" },
    { icon: Zap,           title: "Zero Commission",             desc: "Connect directly with vendors at best prices" },
  ];

  return (
    <div className="w-full bg-[#f7f3eb] font-sans antialiased pb-10">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="w-full bg-gradient-to-b from-[#063e23] to-[#032c18] text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT — desktop only */}
          <div className="hidden md:flex lg:col-span-4 flex-col space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#125835] border border-[#237049] text-[#7ee2ad] text-xs font-semibold px-3 py-1.5 w-fit">
              <Headphones className="w-3.5 h-3.5" />
              We're Here to Help
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Looking for the right product?
            </h1>
            <p className="text-sm text-gray-300">
              Tell us your requirements and our expert will help you find the best vendors.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { icon: CheckCircle, label: "Verified\nVendors" },
                { icon: Users,       label: "Trusted by\nThousands" },
                { icon: Clock,       label: "Quick\nResponse" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="bg-[#125835] p-2">
                    <Icon className="w-4 h-4 text-[#7ee2ad]" />
                  </div>
                  <span className="text-xs font-medium text-gray-200 whitespace-pre-line">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE heading */}
          <div className="md:hidden">
            <div className="inline-flex items-center gap-1.5 bg-[#125835] border border-[#237049] text-[#7ee2ad] text-[11px] font-semibold px-2.5 py-1 mb-3">
              <Headphones className="w-3 h-3" />
              We're Here to Help
            </div>
            <h1 className="text-xl font-bold tracking-tight leading-snug mb-1">
              Looking for the right product?
            </h1>
            <p className="text-xs text-gray-300 mb-1">
              Tell us your needs — our expert will find the best vendors.
            </p>
          </div>

          {/* FORM */}
          <div className="lg:col-span-6">
            <h2 className="text-lg font-semibold mb-4 tracking-wide">
              Send Your Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* NAME + PHONE */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} placeholder="Your Name" required
                    className="w-full bg-[#04331c] border border-[#165134] px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#237049]"
                  />
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel" name="phone" value={formData.phone}
                    onChange={handleChange} placeholder="Mobile Number" required
                    className="w-full bg-[#04331c] border border-[#165134] px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#237049]"
                  />
                </div>
              </div>

              {/* LOOKING FOR */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <ShoppingCart className="w-4 h-4" />
                </span>
                <select
                  name="lookingFor" value={formData.lookingFor}
                  onChange={handleChange} required
                  className="w-full bg-[#04331c] border border-[#165134] px-3 py-3 pl-10 pr-10 text-sm text-gray-400 appearance-none focus:outline-none focus:border-[#237049]"
                >
                  <option value="">I'm looking for...</option>
                  <option value="Building Materials">Building Materials</option>
                  <option value="Cement & Steel">Cement & Steel</option>
                  <option value="Tiles & Flooring">Tiles & Flooring</option>
                  <option value="Paints">Paints</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Smart Home Devices">Smart Home Devices</option>
                  <option value="Kitchen & Modular">Kitchen & Modular</option>
                  <option value="Other">Other</option>
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </div>

              {/* LOCATION + BUDGET */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text" name="location" value={formData.location}
                    onChange={handleChange} placeholder="Preferred Location" required
                    className="w-full bg-[#04331c] border border-[#165134] px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#237049]"
                  />
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 text-sm font-medium">
                    ₹
                  </span>
                  <select
                    name="budget" value={formData.budget}
                    onChange={handleChange} required
                    className="w-full bg-[#04331c] border border-[#165134] px-3 py-3 pl-8 pr-10 text-sm text-gray-400 appearance-none focus:outline-none focus:border-[#237049]"
                  >
                    <option value="">Budget Range</option>
                    <option value="Under 10 Thousands">Under ₹10K</option>
                    <option value="10 - 50 Thousands">₹10K – ₹50K</option>
                    <option value="50 Thousands - 1 Lakh">₹50K – ₹1L</option>
                    <option value="1 - 5 Lakhs">₹1L – ₹5L</option>
                    <option value="5 Lakhs +">₹5L+</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit" disabled={loading}
                className="w-full bg-white text-[#032c18] font-semibold text-sm py-3 tracking-wide hover:bg-gray-100 transition shadow"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>

            </form>
          </div>

          {/* IMAGE — desktop only */}
          <div className="lg:col-span-2 hidden lg:flex justify-end items-center">
            <img
              src="/ghar.png" alt="GharBazaar Illustration"
              className="w-40 h-auto object-contain drop-shadow-md"
            />
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES
          Mobile:  2-col grid (2 + 2 + 1 centred)
          lg+:     5-col grid
      ═══════════════════════════════════════ */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 text-center">

        <h2 className="text-2xl sm:text-3xl font-bold text-[#063e23]">
          Why Choose GharBazaar Products?
        </h2>
        <p className="text-sm text-gray-600 mt-2 mb-8">
          India's trusted marketplace for Building Materials & Home Products.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={title}
              className={`bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center${
                idx === 4 ? " col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="bg-[#dcfce7] text-[#15803d] p-6 mb-4">
                <Icon className="w-12 h-12 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-snug mb-2">
                {title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
