import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CreditCard, Smartphone, Building2, Wallet, Lock, CheckCircle } from 'lucide-react';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill all shipping information');
      return;
    }
    
    // Simulate payment processing
    setTimeout(() => {
      // Clear cart and navigate to confirmation
      navigate('/order-confirmation');
    }, 1000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const subtotal = getCartTotal();
  const shippingCharges = subtotal > 10000 ? 0 : 200;
  const discount = 0; // Can be calculated from applied coupon
  const gst = (subtotal - discount) * 0.18;
  const total = subtotal - discount + shippingCharges + gst;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={20} /> },
    { id: 'upi', name: 'UPI', icon: <Smartphone size={20} /> },
    { id: 'netbanking', name: 'Net Banking', icon: <Building2 size={20} /> },
    { id: 'wallet', name: 'Wallet', icon: <Wallet size={20} /> },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add items to proceed to checkout</p>
            <button onClick={() => navigate('/marketplace')} className="btn btn--filled">
              Browse Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        
        <div className="checkout-content">
          {/* Left Side - Forms */}
          <div className="checkout-left">
            {/* Shipping Information */}
            <div className="checkout-section">
              <h2 className="section-title">
                <span className="step-number">1</span>
                Shipping Information
              </h2>
              <form className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House no, Street, Area"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="123456"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="checkout-section">
              <h2 className="section-title">
                <span className="step-number">2</span>
                Payment Method
              </h2>
              
              <div className="payment-methods">
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    className={`payment-method ${selectedPayment === method.id ? 'active' : ''}`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    {method.icon}
                    <span>{method.name}</span>
                    <div className="radio-check"></div>
                  </div>
                ))}
              </div>

              {/* Card Payment Form */}
              {selectedPayment === 'card' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="Name on card"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment */}
              {selectedPayment === 'upi' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label>UPI ID *</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="yourname@upi"
                      required
                    />
                  </div>
                  <div className="upi-apps">
                    <button type="button" className="upi-app">Google Pay</button>
                    <button type="button" className="upi-app">PhonePe</button>
                    <button type="button" className="upi-app">Paytm</button>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {selectedPayment === 'netbanking' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label>Select Bank *</label>
                    <select required>
                      <option value="">Choose your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Wallet */}
              {selectedPayment === 'wallet' && (
                <div className="payment-form">
                  <div className="wallet-options">
                    <button type="button" className="wallet-option">Paytm Wallet</button>
                    <button type="button" className="wallet-option">PhonePe Wallet</button>
                    <button type="button" className="wallet-option">Amazon Pay</button>
                    <button type="button" className="wallet-option">Mobikwik</button>
                  </div>
                </div>
              )}
            </div>

            <div className="secure-payment">
              <Lock size={16} />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="checkout-right">
            <div className="order-summary-card">
              <h2>Order Summary</h2>
              
              {/* Items List */}
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <img src={item.img} alt={item.name} />
                    <div className="summary-item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <span className="summary-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="summary-row discount-row">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={shippingCharges === 0 ? 'free-text' : ''}>
                    {shippingCharges === 0 ? 'FREE' : formatPrice(shippingCharges)}
                  </span>
                </div>
                
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button onClick={handleSubmit} className="place-order-btn">
                <Lock size={18} />
                Place Order - {formatPrice(total)}
              </button>

              <div className="payment-badges">
                <CheckCircle size={16} />
                <span>100% Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
