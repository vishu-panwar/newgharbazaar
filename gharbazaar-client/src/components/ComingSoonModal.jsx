import { useEffect, useState } from 'react';
import { X, Rocket, Diamond, Shield, Zap } from 'lucide-react';
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
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      link: 'https://www.facebook.com/share/1JZTnPoBXL/' 
    },
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      link: 'https://www.instagram.com/gharbazaar.official' 
    },
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      link: 'https://x.com/gharbazaar_in' 
    },
    { 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      link: 'https://www.linkedin.com/company/gharbazaar/' 
    },
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
