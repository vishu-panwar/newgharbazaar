import { Home, DollarSign, HardHat, Palette, MapPin } from "lucide-react";
import "./AIRecommendations.css";

export default function AIRecommendations() {
  return (
    <section className="marketplace-section ai-recommendations-section">
      <div className="ai-container">
        <div className="ai-visual slide-in-left">
          <div className="ai-mockup glass-card">
            <div className="ai-header">
              <div className="ai-avatar">
                <Palette size={24} />
              </div>
              <div>
                <h4>AI Product Recommendations</h4>
                <p>Based on your preferences</p>
              </div>
            </div>
            <div className="ai-tags">
              <span className="ai-tag"><Home size={14} /> 3BHK Apartment</span>
              <span className="ai-tag"><DollarSign size={14} /> ₹15-20L Budget</span>
              <span className="ai-tag"><HardHat size={14} /> Interior Stage</span>
              <span className="ai-tag"><Palette size={14} /> Modern Style</span>
              <span className="ai-tag"><MapPin size={14} /> Mumbai</span>
            </div>
            <div className="ai-results">
              <p className="ai-results-title">Recommended Products:</p>
              <div className="ai-result-item">✓ Modular Kitchen - Modern Design</div>
              <div className="ai-result-item">✓ Vitrified Tiles - Premium Range</div>
              <div className="ai-result-item">✓ LED Smart Lighting</div>
              <div className="ai-result-item">✓ Interior Paint - Luxury Finish</div>
            </div>
          </div>
        </div>

        <div className="ai-content slide-in-right">
          <h2 className="ai-title">AI-Powered Product Recommendations</h2>
          <p className="ai-description">
            Our intelligent system recommends the perfect products based on your specific needs
          </p>

          <div className="ai-features">
            <div className="ai-feature">
              <div className="ai-feature-icon"><Home size={20} /></div>
              <div>
                <strong>Property Type</strong>
                <p>Tailored for apartments, villas, or commercial</p>
              </div>
            </div>
            <div className="ai-feature">
              <div className="ai-feature-icon"><DollarSign size={20} /></div>
              <div>
                <strong>Budget Match</strong>
                <p>Products within your price range</p>
              </div>
            </div>
            <div className="ai-feature">
              <div className="ai-feature-icon"><HardHat size={20} /></div>
              <div>
                <strong>Construction Stage</strong>
                <p>Recommendations based on project phase</p>
              </div>
            </div>
            <div className="ai-feature">
              <div className="ai-feature-icon"><Palette size={20} /></div>
              <div>
                <strong>Interior Style</strong>
                <p>Match your aesthetic preferences</p>
              </div>
            </div>
            <div className="ai-feature">
              <div className="ai-feature-icon"><MapPin size={20} /></div>
              <div>
                <strong>Location-Based</strong>
                <p>Local vendors with best delivery options</p>
              </div>
            </div>
          </div>

          <button className="btn-primary">Get Personalized Recommendations</button>
        </div>
      </div>
    </section>
  );
}
