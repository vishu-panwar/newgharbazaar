import { useState, useEffect } from "react";
import { ArrowRight, Package, TrendingUp, Users } from "lucide-react";
import "./MarketplaceHero.css";

const HERO_STATS = [
  { icon: Package, value: "10,000+", label: "Products" },
  { icon: Users, value: "5,000+", label: "Verified Vendors" },
  { icon: TrendingUp, value: "50,000+", label: "Happy Customers" },
];

export default function MarketplaceHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Discover Trusted Products for Every Home & Property",
      image: "/banner1.jpg",
    },
    {
      title: "Connect Directly with Verified Local Vendors",
      image: "/banner2.jpg",
    },
    {
      title: "Building Materials to Smart Home Solutions",
      image: "/banner3.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="marketplace-hero">
      {/* Animated Background */}
      <div className="hero-background">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-text-wrapper fade-in">
          <h1 className="hero-title">{slides[currentSlide].title}</h1>
          <p className="hero-subtitle">
            GharBazaar connects buyers directly with verified local vendors,
            wholesalers, manufacturers, and brands. Discover quality products
            without commission — just trusted connections.
          </p>

          <div className="hero-cta-buttons">
            <button className="btn-primary btn-hero">
              Explore Products
              <ArrowRight size={20} />
            </button>
            <button className="btn-secondary btn-hero">Become a Vendor</button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {HERO_STATS.map(({ icon: Icon, value, label }, index) => (
              <div key={index} className="stat-item slide-in-left">
                <Icon size={32} className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-value">{value}</div>
                  <div className="stat-label">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
