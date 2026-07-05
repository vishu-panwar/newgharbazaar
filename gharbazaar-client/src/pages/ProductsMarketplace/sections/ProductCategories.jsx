import {
  Hammer,
  Package,
  Zap,
  Droplet,
  DoorOpen,
  Sofa,
  Sparkles,
  Refrigerator,
  Bath,
  Home,
  Camera,
  Sun,
  Smartphone,
  Leaf,
  Briefcase,
  HardHat,
  Wrench,
} from "lucide-react";
import "./ProductCategories.css";

const CATEGORIES = [
  { icon: Hammer, name: "Building Materials", count: "2,500+", color: "#3b82f6" },
  { icon: Package, name: "Cement & Steel", count: "1,200+", color: "#8b5cf6" },
  { icon: Package, name: "Bricks & Blocks", count: "800+", color: "#ec4899" },
  { icon: Package, name: "Tiles & Flooring", count: "1,500+", color: "#f59e0b" },
  { icon: Sparkles, name: "Paints", count: "600+", color: "#10b981" },
  { icon: Zap, name: "Electrical", count: "1,100+", color: "#eab308" },
  { icon: Droplet, name: "Plumbing", count: "900+", color: "#06b6d4" },
  { icon: DoorOpen, name: "Doors & Windows", count: "700+", color: "#f97316" },
  { icon: Sofa, name: "Furniture", count: "2,000+", color: "#a855f7" },
  { icon: Sparkles, name: "Interior Decor", count: "1,800+", color: "#ec4899" },
  { icon: Refrigerator, name: "Kitchen & Modular", count: "1,300+", color: "#14b8a6" },
  { icon: Bath, name: "Bathroom Accessories", count: "950+", color: "#3b82f6" },
  { icon: Smartphone, name: "Smart Home Devices", count: "1,400+", color: "#8b5cf6" },
  { icon: Camera, name: "CCTV & Security", count: "800+", color: "#ef4444" },
  { icon: Sun, name: "Solar Products", count: "600+", color: "#f59e0b" },
  { icon: Home, name: "Home Appliances", count: "2,200+", color: "#10b981" },
  { icon: Leaf, name: "Gardening", count: "500+", color: "#22c55e" },
  { icon: Briefcase, name: "Office Furniture", count: "900+", color: "#6366f1" },
  { icon: HardHat, name: "Construction Equipment", count: "700+", color: "#f97316" },
  { icon: Wrench, name: "Hardware & Tools", count: "1,100+", color: "#64748b" },
];

export default function ProductCategories() {
  return (
    <section className="marketplace-section product-categories-section">
      <div className="section-header fade-in">
        <h2 className="section-title">Explore Product Categories</h2>
        <p className="section-subtitle">
          Browse through 20+ categories with 10,000+ premium products from
          verified vendors
        </p>
      </div>

      <div className="categories-grid">
        {CATEGORIES.map(({ icon: Icon, name, count, color }, index) => (
          <div
            key={index}
            className="category-card glass-card hover-lift"
            style={{
              "--category-color": color,
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <div className="category-icon-wrapper">
              <Icon size={32} strokeWidth={2} />
            </div>
            <h3 className="category-name">{name}</h3>
            <p className="category-count">{count} Products</p>
            <div className="category-hover-overlay">
              <button className="btn-explore">Explore</button>
            </div>
          </div>
        ))}
      </div>

      <div className="categories-cta fade-in">
        <button className="btn-primary">View All Categories</button>
      </div>
    </section>
  );
}
