import { useEffect, useState } from 'react';
import { X, Rocket } from 'lucide-react';
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

  return (
    <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div className={`coming-soon-modal ${isVisible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={20} />
        </button>

        <div className="modal-content">
          {/* Main Icon */}
          <div className="modal-icon-wrapper">
            <div className="modal-icon">
              <Rocket size={50} />
            </div>
          </div>

          {/* Title Section */}
          <div className="modal-header">
            <h2 className="modal-title">
              <span className="title-text">Coming Soon!</span>
              <span className="title-sparkle">✨</span>
            </h2>
            
            <p className="modal-subtitle">
              We're crafting something <span className="highlight">extraordinary</span> for you
            </p>
          </div>

          {/* Thank You Message */}
          <div className="modal-message">
            <h3>Thank You for Visiting Us! 🎉</h3>
            <p>Your interest means the world to us. This section is under active development and will be available very soon with amazing features that will transform your experience.</p>
          </div>

          {/* Action Button */}
          <button className="modal-action-btn primary" onClick={handleClose}>
            <span>Continue Exploring</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonModal;
