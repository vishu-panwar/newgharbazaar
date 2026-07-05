import { DollarSign, TrendingUp, ShieldCheck, MapPin, Globe, BarChart, User, Sparkles } from "lucide-react";
import "./BusinessBenefits.css";

const BENEFITS = [
  { icon: DollarSign, title: "No Commission", description: "Keep 100% of your profits" },
  { icon: TrendingUp, title: "Direct Leads", description: "Connect with genuine buyers" },
  { icon: ShieldCheck, title: "Verified Vendors", description: "Trusted business network" },
  { icon: MapPin, title: "Local Business Promotion", description: "Boost local visibility" },
  { icon: Globe, title: "Global Business Visibility", description: "Reach international markets" },
  { icon: BarChart, title: "Business Analytics", description: "Track performance metrics" },
  { icon: User, title: "Business Profile", description: "Professional vendor page" },
  { icon: Sparkles, title: "AI Recommendations", description: "Smart product matching" },
];

export default function BusinessBenefits() {
  return (
    <section className="marketplace-section business-benefits-section">
      <div className="section-header fade-in">
        <h2 className="section-title">Business Benefits</h2>
        <p className="section-subtitle">
          Everything you need to grow your business, all in one platform
        </p>
      </div>

      <div className="benefits-grid">
        {BENEFITS.map(({ icon: Icon, title, description }, index) => (
          <div
            key={index}
            className="benefit-card glass-card hover-lift"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className="benefit-icon">
              <Icon size={32} strokeWidth={2} />
            </div>
            <h3 className="benefit-title">{title}</h3>
            <p className="benefit-description">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
