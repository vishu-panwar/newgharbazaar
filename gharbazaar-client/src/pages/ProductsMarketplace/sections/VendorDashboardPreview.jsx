import { Eye, FileText, Users, Star, TrendingUp, Package } from "lucide-react";
import "./VendorDashboardPreview.css";

const WIDGETS = [
  { icon: Eye, title: "Product Views", value: "15,234", change: "+12.5%", color: "#3b82f6" },
  { icon: FileText, title: "Enquiries Received", value: "456", change: "+8.3%", color: "#10b981" },
  { icon: Users, title: "Profile Visitors", value: "3,892", change: "+15.7%", color: "#8b5cf6" },
  { icon: Star, title: "Customer Reviews", value: "4.8/5", change: "328 reviews", color: "#f59e0b" },
  { icon: TrendingUp, title: "Business Performance", value: "Excellent", change: "Top 10%", color: "#1f9d55" },
  { icon: Package, title: "Products Listed", value: "142", change: "Active", color: "#ef4444" },
];

export default function VendorDashboardPreview() {
  return (
    <section className="marketplace-section vendor-dashboard-section">
      <div className="section-header fade-in">
        <h2 className="section-title">Vendor Dashboard Preview</h2>
        <p className="section-subtitle">
          Powerful analytics and insights to grow your business
        </p>
      </div>

      <div className="dashboard-preview-container">
        <div className="dashboard-widgets">
          {WIDGETS.map(({ icon: Icon, title, value, change, color }, index) => (
            <div
              key={index}
              className="dashboard-widget glass-card hover-lift"
              style={{
                "--widget-color": color,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="widget-icon">
                <Icon size={28} strokeWidth={2} />
              </div>
              <div className="widget-content">
                <p className="widget-title">{title}</p>
                <h3 className="widget-value">{value}</h3>
                <p className="widget-change">{change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-features fade-in">
          <div className="feature-box glass-card">
            <h4>Real-Time Analytics</h4>
            <p>Track views, clicks, and conversions in real-time</p>
          </div>
          <div className="feature-box glass-card">
            <h4>Customer Insights</h4>
            <p>Understand your audience and their preferences</p>
          </div>
          <div className="feature-box glass-card">
            <h4>Performance Reports</h4>
            <p>Monthly reports with actionable insights</p>
          </div>
        </div>
      </div>

      <div className="dashboard-cta fade-in">
        <button className="btn-primary">Access Vendor Dashboard</button>
      </div>
    </section>
  );
}
