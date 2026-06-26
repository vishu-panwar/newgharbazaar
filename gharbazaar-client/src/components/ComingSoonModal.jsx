import { useEffect, useState } from 'react';
import { X, Rocket, Diamond, Shield, Zap, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import './ComingSoonModal.css';

function ComingSoonModal({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const features = [
    { icon: <Diamond size={32} />, label: 'PREMIUM', sublabel: 'EXPERIENCE' },
    { icon: <Rocket size={32} />, label: 'INNOVATIVE', sublabel: 'FEATURES' },
    { icon: <Shield size={32} />, label: 'TRUST &', sublabel: 'SECURITY' },
    { icon: <Zap size={32} />, label: 'HIGH', sublabel: 'PERFORMANCE' },
  ];

  const socials = [
    { icon: <Facebook size={18} />, link: 'https://www.facebook.com/share/1JZTnPoBXL/' },
    { icon: <Instagram size={18} />, link: 'https://www.instagram.com/gharbazaar.official' },
    { icon: <Twitter size={18} />, link: 'https://x.com/gharbazaar_in' },
    { icon: <Linkedin size={18} />, link: 'https://www.linkedin.com/company/gharbazaar/' },
  ];

  return (
    <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div className={`coming-soon-modal ${isVisible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        
        {/* Decorative Leaves */}
        <div className="leaf-decoration leaf-left"></div>
        <div className="leaf-decoration leaf-right"></div>
        <div className="leaf-decoration leaf-bottom-left"></div>
        
        {/* Close Button */}
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={20} />
        </button>

        <div className="modal-content">
          {/* Hexagon Icon */}
          <div className="modal-hexagon">
            <div className="hexagon-inner">
              <Rocket size={40} strokeWidth={2.5} />
            </div>
          </div>

          {/* Header Text */}
          <div className="modal-tagline">SOMETHING EXTRAORDINARY IS</div>
          
          {/* Main Title */}
          <div className="modal-main-title">
            <span className="title-dark">COMING</span>{' '}
            <span className="title-green">SOON!</span>
          </div>

          <div className="title-divider">
            <span className="divider-line"></span>
            <span className="divider-star">✦</span>
            <span className="divider-line"></span>
          </div>

          {/* Subtitle */}
          <p className="modal-subtitle-elegant">
            We're crafting something <strong>extraordinary</strong> for you.
          </p>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                  <span className="feature-sparkle">✦</span>
                </div>
                <div className="feature-label">{feature.label}</div>
                <div className="feature-sublabel">{feature.sublabel}</div>
              </div>
            ))}
          </div>

          <div className="bottom-divider">
            <span className="divider-line"></span>
            <span className="divider-star">✦</span>
            <span className="divider-line"></span>
          </div>

          {/* Stay Tuned Section */}
          <div className="stay-tuned-section">
            <p className="stay-tuned-text">STAY TUNED & BE THE FIRST TO EXPERIENCE IT!</p>
            <div className="bell-icon">🔔</div>
          </div>

          {/* Social Follow Section */}
          <div className="follow-section">
            <p className="follow-text">FOLLOW US FOR UPDATES</p>
            <div className="social-icons">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonModal;
