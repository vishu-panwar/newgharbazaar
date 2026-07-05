import { MapPinned, Globe2, CheckCircle, Users, TrendingUp, ShieldCheck } from "lucide-react";
import "./LocalToGlobal.css";

const FEATURES = [
  {
    icon: MapPinned,
    title: "Sell Locally",
    description: "Connect with customers in your city and surrounding areas",
    color: "#10b981",
  },
  {
    icon: Globe2,
    title: "Expand Across India",
    description: "Reach buyers from every state with nationwide visibility",
    color: "#3b82f6",
  },
  {
    icon: TrendingUp,
    title: "Reach International Buyers",
    description: "Export opportunities and global business connections",
    color: "#f59e0b",
  },
  {
    icon: ShieldCheck,
    title: "Verified Business Network",
    description: "Join thousands of verified vendors and trusted buyers",
    color: "#8b5cf6",
  },
  {
    icon: CheckCircle,
    title: "Zero Commission by GharBazaar",
    description: "No fees, no hidden charges - 100% of profits are yours",
    color: "#1f9d55",
  },
  {
    icon: Users,
    title: "Direct Buyer-Vendor Communication",
    description: "Chat, call, and negotiate directly with your customers",
    color: "#ef4444",
  },
];

export default function LocalToGlobal() {
  return (
    <section className="marketplace-section local-to-global-section">
      <div className="section-header fade-in">
        <h2 className="section-title">Local to Global Marketplace</h2>
        <p className="section-subtitle">
          Grow your business from neighborhood to nationwide - all with zero commission
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map(({ icon: Icon, title, description, color }, index) => (
          <div
            key={index}
            className="feature-card glass-card hover-lift"
            style={{
              "--feature-color": color,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="feature-icon-box">
              <Icon size={36} strokeWidth={2} />
            </div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>
          </div>
        ))}
      </div>

      <div className="benefits-banner glass-card fade-in">
        <h3 className="banner-title">Why Choose GharBazaar?</h3>
        <div className="benefits-list">
          <div className="benefit-item">
            <CheckCircle size={24} className="benefit-icon" />
            <span>No Commission - Keep 100% of your profits</span>
          </div>
          <div className="benefit-item">
            <CheckCircle size={24} className="benefit-icon" />
            <span>Direct Leads - Connect directly with serious buyers</span>
          </div>
          <div className="benefit-item">
            <CheckCircle size={24} className="benefit-icon" />
            <span>Verified Platform - Trusted by 5000+ vendors</span>
          </div>
          <div className="benefit-item">
            <CheckCircle size={24} className="benefit-icon" />
            <span>Business Analytics - Track your performance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
