import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import "./CustomerReviews.css";

const REVIEWS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Contractor",
    location: "Delhi",
    avatar: "/logo.jpeg",
    rating: 5,
    review: "GharBazaar helped me find reliable vendors for my construction project. The direct communication and zero commission model is a game changer!",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Interior Designer",
    location: "Mumbai",
    avatar: "/logo.jpeg",
    rating: 5,
    review: "Amazing platform! I can source premium products directly from manufacturers at the best prices. The quotation system saves so much time.",
    verified: true,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Vendor",
    location: "Ahmedabad",
    avatar: "/logo.jpeg",
    rating: 5,
    review: "As a vendor, GharBazaar has doubled my business reach. No commission means better pricing for customers and more profit for me!",
    verified: true,
  },
  {
    id: 4,
    name: "Sunita Reddy",
    role: "Homeowner",
    location: "Bangalore",
    avatar: "/logo.jpeg",
    rating: 5,
    review: "Found everything for my home renovation in one place. The verified vendors gave me confidence and the AI recommendations were spot on!",
    verified: true,
  },
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const visibleReviews = [
    REVIEWS[currentIndex],
    REVIEWS[(currentIndex + 1) % REVIEWS.length],
  ];

  return (
    <section className="marketplace-section customer-reviews-section">
      <div className="section-header fade-in">
        <h2 className="section-title">What Our Community Says</h2>
        <p className="section-subtitle">
          Trusted by thousands of vendors and buyers across India
        </p>
      </div>

      <div className="reviews-carousel">
        {visibleReviews.map((review, index) => (
          <div
            key={review.id}
            className="review-card glass-card fade-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="quote-icon">
              <Quote size={40} />
            </div>

            <div className="review-rating">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>

            <p className="review-text">{review.review}</p>

            <div className="review-author">
              <img
                src={review.avatar}
                alt={review.name}
                className="author-avatar"
              />
              <div className="author-info">
                <h4 className="author-name">
                  {review.name}
                  {review.verified && (
                    <span className="verified-badge">✓</span>
                  )}
                </h4>
                <p className="author-role">
                  {review.role} • {review.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-indicators">
        {REVIEWS.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
