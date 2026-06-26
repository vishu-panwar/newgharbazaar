import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, CheckCircle, X, Crown, Star, Shield, Home } from 'lucide-react';
import './CallPlans.css';

const PLANS = [
  {
    id: 1,
    name: 'Direct Contact',
    badge: 'Quick Access',
    price: 499,
    gst: '+ 18% GST',
    features: [
      { text: "Get Owner's Contact Number", included: true },
      { text: 'Direct Communication', included: true },
      { text: 'Instant Access', included: true },
      { text: 'No GharBazaar Support', included: false },
    ],
    note: 'One-time payment for this property',
    buttonText: 'Get Contact Number',
    icon: Phone,
    color: '#0F9D58',
    popular: false,
  },
  {
    id: 2,
    name: 'Full Service',
    badge: 'Recommended',
    price: 4999,
    gst: '+ 1% of Property Value + 18% GST',
    features: [
      { text: 'Complete GharBazaar Management', included: true },
      { text: 'Legal Documentation Support', included: true },
      { text: 'Property Verification', included: true },
      { text: 'Negotiation Assistance', included: true },
      { text: 'Site Visit Coordination', included: true },
      { text: 'End-to-End Support', included: true },
    ],
    note: 'Hassle-free property buying experience',
    buttonText: 'Get Full Service',
    icon: Crown,
    color: '#0F9D58',
    popular: true,
  },
];

export default function CallPlans() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const propertyName = location.state?.propertyName || 'this property';
  const propertyOwner = location.state?.propertyOwner || 'property owner';

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePurchase = () => {
    // Simulate payment processing
    alert(`Plan purchased successfully! You can now call ${propertyOwner} about ${propertyName}`);
    navigate(-1); // Go back to previous page
  };

  if (showPayment && selectedPlan) {
    return (
      <div className="call-plans-page">
        <div className="payment-modal">
          <div className="payment-header">
            <h2>Complete Your Purchase</h2>
            <button className="close-btn" onClick={() => setShowPayment(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="payment-summary">
            <div className="selected-plan-card">
              <div className="plan-details">
                <h3>{selectedPlan.name}</h3>
                <p>{selectedPlan.note}</p>
              </div>
              <div className="plan-price">₹{selectedPlan.price}</div>
            </div>

            <div className="payment-breakdown">
              <div className="breakdown-row">
                <span>Plan Price</span>
                <span>₹{selectedPlan.price}</span>
              </div>
              <div className="breakdown-row">
                <span>GST (18%)</span>
                <span>₹{Math.round(selectedPlan.price * 0.18)}</span>
              </div>
              {selectedPlan.id === 2 && (
                <div className="breakdown-row">
                  <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                    + 1% of Property Value (calculated at closing)
                  </span>
                  <span></span>
                </div>
              )}
              <div className="breakdown-row total">
                <span>Total Amount</span>
                <span>₹{Math.round(selectedPlan.price * 1.18)}</span>
              </div>
            </div>

            <div className="payment-methods">
              <h4>Select Payment Method</h4>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" defaultChecked />
                  <span>UPI</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Net Banking</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Wallet</span>
                </label>
              </div>
            </div>

            <button className="purchase-btn" onClick={handlePurchase}>
              <Shield size={18} /> Pay ₹{Math.round(selectedPlan.price * 1.18)} Securely
            </button>
            
            <p className="secure-note">
              <Shield size={14} /> Your payment is 100% secure and encrypted
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="call-plans-page">
      <div className="plans-header">
        <Phone size={48} color="#0F9D58" />
        <h1>Choose a Plan to Make Calls</h1>
        <p>Select a plan to get direct contact access to property owners, brokers, and builders</p>
        <div className="property-info">
          <p>You're interested in: <strong>{propertyName}</strong></p>
        </div>
      </div>

      <div className="plans-grid">
        {PLANS.map((plan) => (
          <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && (
              <div className="popular-badge">
                <Star size={14} /> {plan.badge}
              </div>
            )}
            {!plan.popular && plan.badge && (
              <div className="quick-badge">
                {plan.badge}
              </div>
            )}
            
            <h3>{plan.name}</h3>
            <div className="plan-price-section">
              <div className="price">₹{plan.price}</div>
              <div className="gst-text">{plan.gst}</div>
            </div>

            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index} className={!feature.included ? 'not-included' : ''}>
                  {feature.included ? (
                    <CheckCircle size={16} color="#0F9D58" />
                  ) : (
                    <X size={16} color="#9ca3af" />
                  )}
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <button 
              className="select-plan-btn"
              style={{ background: plan.color }}
              onClick={() => handleSelectPlan(plan)}
            >
              <Home size={18} /> {plan.buttonText}
            </button>
            
            <p className="plan-note">{plan.note}</p>
          </div>
        ))}
      </div>

      <div className="plans-benefits">
        <h3>Why Purchase a Call Plan?</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <Phone size={32} color="#0F9D58" />
            <h4>Direct Contact</h4>
            <p>Get instant access to property owner's phone number</p>
          </div>
          <div className="benefit-card">
            <Shield size={32} color="#0F9D58" />
            <h4>Verified Contacts</h4>
            <p>All contacts are verified and genuine</p>
          </div>
          <div className="benefit-card">
            <Zap size={32} color="#0F9D58" />
            <h4>Quick Response</h4>
            <p>Connect with sellers faster than competitors</p>
          </div>
          <div className="benefit-card">
            <Star size={32} color="#0F9D58" />
            <h4>Premium Support</h4>
            <p>Get assistance throughout your property journey</p>
          </div>
        </div>
      </div>

      <div className="plans-faq">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h4>Can I get a refund if I don't use all calls?</h4>
            <p>Yes, unused calls can be refunded within 7 days of purchase as per our refund policy.</p>
          </div>
          <div className="faq-item">
            <h4>What happens after my plan expires?</h4>
            <p>You can renew your plan or purchase a new one. Your unused calls will be carried forward for 30 days.</p>
          </div>
          <div className="faq-item">
            <h4>Can I upgrade my plan?</h4>
            <p>Yes, you can upgrade anytime. The remaining value will be adjusted in your new plan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
