import { useState } from "react";
import { Search, Mic, Camera, MapPin, Tag, Building2 } from "lucide-react";
import "./GlobalSearch.css";

const QUICK_SEARCHES = [
  { icon: Tag, label: "Cement & Steel", color: "#3b82f6" },
  { icon: Building2, label: "Tiles & Flooring", color: "#8b5cf6" },
  { icon: Tag, label: "Smart Home Devices", color: "#10b981" },
  { icon: Building2, label: "Modular Kitchen", color: "#f59e0b" },
  { icon: MapPin, label: "Local Vendors", color: "#ef4444" },
];

export default function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="global-search-section">
      <div className="search-container">
        <div className="search-header fade-in">
          <h2 className="search-title">Find Exactly What You Need</h2>
          <p className="search-subtitle">
            AI-powered search across 10,000+ products from verified vendors
          </p>
        </div>

        {/* Main Search Bar */}
        <div
          className={`search-bar-wrapper glass-card ${isFocused ? "focused" : ""}`}
        >
          <div className="search-icon-wrapper">
            <Search size={24} className="search-icon" />
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="Search by product, brand, vendor, category, city, district, or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <div className="search-actions">
            <button className="search-action-btn" title="Voice Search">
              <Mic size={20} />
            </button>
            <button className="search-action-btn" title="Image Search">
              <Camera size={20} />
            </button>
            <button className="btn-primary search-submit">Search</button>
          </div>
        </div>

        {/* Quick Search Tags */}
        <div className="quick-searches fade-in">
          <p className="quick-search-label">Popular Searches:</p>
          <div className="quick-search-tags">
            {QUICK_SEARCHES.map(({ icon: Icon, label, color }, index) => (
              <button
                key={index}
                className="quick-search-tag glass-card"
                style={{ "--tag-color": color }}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Suggestions (only shown when focused) */}
        {isFocused && searchQuery && (
          <div className="search-suggestions glass-card fade-in">
            <div className="suggestion-item">
              <Search size={16} className="suggestion-icon" />
              <span>Building Materials in Delhi</span>
            </div>
            <div className="suggestion-item">
              <Search size={16} className="suggestion-icon" />
              <span>Cement wholesale suppliers</span>
            </div>
            <div className="suggestion-item">
              <Search size={16} className="suggestion-icon" />
              <span>Smart Home Devices manufacturers</span>
            </div>
          </div>
        )}

        {/* Search Features */}
        <div className="search-features">
          <div className="feature-item slide-in-left">
            <div className="feature-icon-wrapper">
              <Search size={24} />
            </div>
            <div className="feature-content">
              <h4>AI-Powered Search</h4>
              <p>Smart results based on your needs</p>
            </div>
          </div>

          <div className="feature-item slide-in-left">
            <div className="feature-icon-wrapper">
              <MapPin size={24} />
            </div>
            <div className="feature-content">
              <h4>Location-Based</h4>
              <p>Find vendors near you</p>
            </div>
          </div>

          <div className="feature-item slide-in-left">
            <div className="feature-icon-wrapper">
              <Tag size={24} />
            </div>
            <div className="feature-content">
              <h4>Multi-Category</h4>
              <p>Search across all categories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
