import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Tag, X } from 'lucide-react';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Available coupons
  const availableCoupons = {
    'SAVE10': { discount: 10, type: 'percentage', description: '10% off' },
    'SAVE500': { discount: 500, type: 'fixed', description: '₹500 off' },
    'WELCOME': { discount: 15, type: 'percentage', description: '15% off for new users' },
  };

  const applyCoupon = () => {
    const coupon = availableCoupons[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
      setCouponError('');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const subtotal = getCartTotal();
  
  // Calculate shipping
  const shippingCharges = subtotal > 10000 ? 0 : 200;
  
  // Calculate discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = (subtotal * appliedCoupon.discount) / 100;
    } else {
      discount = appliedCoupon.discount;
    }
  }
  
  // Calculate GST (18% on subtotal - discount)
  const taxableAmount = subtotal - discount;
  const gst = taxableAmount * 0.18;
  
  // Calculate total
  const total = subtotal - discount + shippingCharges + gst;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Marketplace Cart</h1>
        <p style={{ color: '#6b7280', margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>Review and manage your construction materials and home products</p>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <svg className="empty-cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <a href="/marketplace" className="continue-shopping-btn">Browse Marketplace</a>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-location">
                      <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {item.location || item.brand}
                    </p>
                    <span className="cart-item-type">{item.category || 'Product'}</span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                      title="Remove item"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              {/* Coupon Section */}
              <div className="coupon-section">
                <label>Have a coupon?</label>
                <div className="coupon-input-wrapper">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="coupon-input"
                  />
                  <button onClick={applyCoupon} className="apply-coupon-btn">
                    Apply
                  </button>
                </div>
                {couponError && <span className="coupon-error">{couponError}</span>}
                {appliedCoupon && (
                  <div className="applied-coupon">
                    <Tag size={16} />
                    <span>{appliedCoupon.code} - {appliedCoupon.description}</span>
                    <button onClick={removeCoupon} className="remove-coupon">
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="summary-row discount-row">
                    <span>Discount ({appliedCoupon.description})</span>
                    <span className="discount-amount">-{formatPrice(discount)}</span>
                  </div>
                )}
                
                <div className="summary-row">
                  <span>Shipping Charges</span>
                  <span className={shippingCharges === 0 ? 'free-shipping' : ''}>
                    {shippingCharges === 0 ? 'FREE' : formatPrice(shippingCharges)}
                  </span>
                </div>
                
                {shippingCharges === 0 && (
                  <div className="shipping-note">
                    🎉 You got free shipping on orders above ₹10,000
                  </div>
                )}
                
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="savings-badge">
                    You're saving {formatPrice(discount)}! 🎉
                  </div>
                )}
              </div>

              <button onClick={() => navigate('/checkout')} className="checkout-btn">Proceed to Checkout</button>
              <a href="/marketplace" className="continue-shopping">Continue Shopping</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
