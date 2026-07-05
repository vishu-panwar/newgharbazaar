import { CheckCircle, MapPin, Phone, MessageCircle, Mail, Globe, Star } from "lucide-react";
import "./VendorProfiles.css";

const VENDORS = [
  {
    id: 1,
    logo: "/logo.jpeg",
    name: "Sharma Building Materials Pvt Ltd",
    verified: true,
    yearsInBusiness: 15,
    businessType: "Wholesaler & Manufacturer",
    location: "Delhi, India",
    productsCount: 250,
    rating: 4.8,
    reviews: 523,
    description: "Leading supplier of premium building materials with 15+ years of excellence in quality and service.",
  },
  {
    id: 2,
    logo: "/logo.jpeg",
    name: "Royal Tiles & Sanitary",
    verified: true,
    yearsInBusiness: 12,
    businessType: "Distributor & Retailer",
    location: "Mumbai, Maharashtra",
    productsCount: 180,
    rating: 4.9,
    reviews: 412,
    description: "Authorized dealer of premium tiles and sanitary brands. Best prices guaranteed.",
  },
  {
    id: 3,
    logo: "/logo.jpeg",
    name: "TechHome Smart Solutions",
    verified: true,
    yearsInBusiness: 8,
    businessType: "Manufacturer",
    location: "Bangalore, Karnataka",
    productsCount: 95,
    rating: 4.7,
    reviews: 289,
    description: "Innovating smart home solutions for modern living. Trusted by 10,000+ customers.",
  },
];

export default function VendorProfiles() {
  return (
    <section className="marketplace-section vendor-profiles-section">
      <div className="section-header fade-in">
        <h2 className="section-title">Verified Vendor Profiles</h2>
        <p className="section-subtitle">
          Connect directly with trusted manufacturers, wholesalers, and retailers
        </p>
      </div>

      <div className="vendors-grid">
        {VENDORS.map((vendor, index) => (
          <div
            key={vendor.id}
            className="vendor-card glass-card hover-lift"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Header */}
            <div className="vendor-header">
              <img src={vendor.logo} alt={vendor.name} className="vendor-logo" />
              <div className="vendor-header-info">
                <h3 className="vendor-name">{vendor.name}</h3>
                {vendor.verified && (
                  <span className="badge badge-verified">
                    <CheckCircle size={14} />
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="vendor-info">
              <div className="vendor-meta">
                <span className="vendor-years">{vendor.yearsInBusiness} Years in Business</span>
                <span className="vendor-type">{vendor.businessType}</span>
              </div>
              
              <p className="vendor-location">
                <MapPin size={16} />
                {vendor.location}
              </p>

              <p className="vendor-description">{vendor.description}</p>

              <div className="vendor-stats">
                <div className="vendor-stat">
                  <div className="stat-number">{vendor.productsCount}+</div>
                  <div className="stat-label">Products</div>
                </div>
                <div className="vendor-stat">
                  <div className="stat-number">
                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    {vendor.rating}
                  </div>
                  <div className="stat-label">{vendor.reviews} Reviews</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="vendor-actions">
              <button className="btn-primary vendor-btn">View Profile</button>
              <div className="vendor-contact-actions">
                <button className="contact-icon-btn" title="WhatsApp">
                  <MessageCircle size={20} />
                </button>
                <button className="contact-icon-btn" title="Call">
                  <Phone size={20} />
                </button>
                <button className="contact-icon-btn" title="Email">
                  <Mail size={20} />
                </button>
                <button className="contact-icon-btn" title="Website">
                  <Globe size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="vendors-cta fade-in">
        <button className="btn-primary">Explore All Vendors</button>
      </div>
    </section>
  );
}
