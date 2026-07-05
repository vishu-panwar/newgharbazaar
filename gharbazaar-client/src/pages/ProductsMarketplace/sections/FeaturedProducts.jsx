import { MapPin, Phone, Mail, MessageCircle, FileText, Heart } from "lucide-react";
import "./FeaturedProducts.css";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    image: "/banner1.jpg",
    name: "Premium Cement - OPC 53 Grade",
    brand: "UltraTech",
    vendor: "Sharma Building Materials",
    verified: true,
    type: "Wholesale",
    location: "Delhi, India",
    quantity: "500+ bags available",
    rating: 4.8,
  },
  {
    id: 2,
    image: "/banner2.jpg",
    name: "Vitrified Tiles 800x800mm",
    brand: "Kajaria",
    vendor: "Royal Tiles & Sanitary",
    verified: true,
    type: "Retail",
    location: "Mumbai, Maharashtra",
    quantity: "1000+ boxes",
    rating: 4.9,
  },
  {
    id: 3,
    image: "/banner3.jpg",
    name: "Smart LED Bulbs (Pack of 10)",
    brand: "Philips",
    vendor: "TechHome Solutions",
    verified: true,
    type: "Wholesale",
    location: "Bangalore, Karnataka",
    quantity: "2000+ units",
    rating: 4.7,
  },
  {
    id: 4,
    image: "/banner4.jpg",
    name: "Modular Kitchen Set - Premium",
    brand: "Godrej Interio",
    vendor: "Elite Interiors",
    verified: true,
    type: "Retail",
    location: "Pune, Maharashtra",
    quantity: "50+ units",
    rating: 4.9,
  },
  {
    id: 5,
    image: "/banner1.jpg",
    name: "TMT Steel Bars - Fe 500D",
    brand: "TATA Steel",
    vendor: "Metropolitan Steel Corp",
    verified: true,
    type: "Wholesale",
    location: "Kolkata, West Bengal",
    quantity: "10+ tons",
    rating: 4.8,
  },
  {
    id: 6,
    image: "/banner2.jpg",
    name: "Exterior Emulsion Paint 20L",
    brand: "Asian Paints",
    vendor: "Color World Distributors",
    verified: true,
    type: "Wholesale",
    location: "Chennai, Tamil Nadu",
    quantity: "500+ cans",
    rating: 4.7,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="marketplace-section featured-products-section">
      <div className="section-header fade-in">
        <h2 className="section-title">Featured Products</h2>
        <p className="section-subtitle">
          Premium products from verified vendors - no commission, direct connection
        </p>
      </div>

      <div className="products-grid">
        {FEATURED_PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            className="product-card glass-card hover-lift"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Wishlist */}
            <button className="product-wishlist">
              <Heart size={20} />
            </button>

            {/* Image */}
            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-badges">
                {product.verified && (
                  <span className="badge badge-verified">✓ Verified</span>
                )}
                <span
                  className={`badge ${product.type === "Wholesale" ? "badge-wholesale" : "badge-retail"}`}
                >
                  {product.type}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-brand">Brand: {product.brand}</p>
              <p className="product-vendor">
                <MapPin size={14} />
                {product.vendor}
              </p>
              <p className="product-location">
                <MapPin size={14} />
                {product.location}
              </p>
              <p className="product-quantity">{product.quantity}</p>

              {/* Rating */}
              <div className="product-rating">
                <span className="rating-stars">★★★★★</span>
                <span className="rating-value">{product.rating}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="product-actions">
              <button className="btn-product btn-contact">
                <Phone size={16} />
                Contact Vendor
              </button>
              <button className="btn-product btn-quote">
                <FileText size={16} />
                Request Quote
              </button>
              <div className="product-quick-actions">
                <button className="quick-action-btn" title="WhatsApp">
                  <MessageCircle size={18} />
                </button>
                <button className="quick-action-btn" title="Email">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="products-cta fade-in">
        <button className="btn-primary">View All Products</button>
      </div>
    </section>
  );
}
