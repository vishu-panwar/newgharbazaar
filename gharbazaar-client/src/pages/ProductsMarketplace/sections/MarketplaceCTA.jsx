import { ArrowRight, Package, Users } from "lucide-react";
import "./MarketplaceCTA.css";

export default function MarketplaceCTA() {
  return (
    <section className="marketplace-cta-section">
      <div className="cta-container">
        <div className="cta-content fade-in">
          <h2 className="cta-title">
            Grow Your Business with GharBazaar Products Marketplace
          </h2>
          <p className="cta-subtitle">
            Join thousands of vendors and buyers connecting directly without commission.
            Start today and experience the power of trusted business connections.
          </p>

          <div className="cta-buttons">
            <button className="btn-cta btn-primary-cta">
              <Users size={22} />
              Register as Vendor
              <ArrowRight size={20} />
            </button>
            <button className="btn-cta btn-secondary-cta">
              <Package size={22} />
              Explore Products
            </button>
          </div>

          <div className="cta-stats">
            <div className="cta-stat">
              <div className="cta-stat-value">5000+</div>
              <div className="cta-stat-label">Verified Vendors</div>
            </div>
            <div className="cta-stat">
              <div className="cta-stat-value">10,000+</div>
              <div className="cta-stat-label">Quality Products</div>
            </div>
            <div className="cta-stat">
              <div className="cta-stat-value">50,000+</div>
              <div className="cta-stat-label">Happy Customers</div>
            </div>
            <div className="cta-stat">
              <div className="cta-stat-value">0%</div>
              <div className="cta-stat-label">Commission</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="float-element element-1"></div>
          <div className="float-element element-2"></div>
          <div className="float-element element-3"></div>
        </div>
      </div>
    </section>
  );
}
