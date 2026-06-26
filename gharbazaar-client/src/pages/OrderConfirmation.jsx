import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, Download, Mail, Phone } from 'lucide-react';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const navigate = useNavigate();

  // Sample order data - in real app, this would come from state/API
  const orderData = {
    orderNumber: 'GB' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    orderDate: new Date().toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }),
    items: [
      {
        id: 1,
        name: 'Modern Sofa Set',
        quantity: 1,
        price: 45000,
        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100'
      },
      {
        id: 2,
        name: 'Dining Table with 6 Chairs',
        quantity: 1,
        price: 35000,
        img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=100'
      }
    ],
    subtotal: 80000,
    discount: 8000,
    shipping: 0,
    gst: 12960,
    total: 84960,
    shippingAddress: {
      name: 'John Doe',
      address: 'House 123, Street 45, DHA Phase 5',
      city: 'Lahore',
      state: 'Punjab',
      pincode: '54000',
      phone: '+92 300 1234567'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid'
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleDownloadInvoice = () => {
    alert('Invoice download will be implemented');
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        
        {/* Success Header */}
        <div className="confirmation-header">
          <div className="success-icon">
            <CheckCircle size={60} />
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <div className="order-number">
            Order Number: <strong>{orderData.orderNumber}</strong>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="order-timeline">
          <div className="timeline-item active">
            <div className="timeline-icon">
              <CheckCircle size={24} />
            </div>
            <div className="timeline-content">
              <h4>Order Confirmed</h4>
              <p>{orderData.orderDate}</p>
            </div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-item">
            <div className="timeline-icon">
              <Package size={24} />
            </div>
            <div className="timeline-content">
              <h4>Processing</h4>
              <p>1-2 business days</p>
            </div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-item">
            <div className="timeline-icon">
              <Truck size={24} />
            </div>
            <div className="timeline-content">
              <h4>Shipped</h4>
              <p>3-5 business days</p>
            </div>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-item">
            <div className="timeline-icon">
              <Home size={24} />
            </div>
            <div className="timeline-content">
              <h4>Delivered</h4>
              <p>Est. {orderData.estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="confirmation-grid">
          
          {/* Left Column - Order Items */}
          <div className="confirmation-section">
            <h2>Order Items</h2>
            <div className="order-items-list">
              {orderData.items.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.img} alt={item.name} />
                  <div className="order-item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <span className="order-item-price">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="order-summary-box">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(orderData.subtotal)}</span>
              </div>
              {orderData.discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-{formatPrice(orderData.discount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span className={orderData.shipping === 0 ? 'free' : ''}>
                  {orderData.shipping === 0 ? 'FREE' : formatPrice(orderData.shipping)}
                </span>
              </div>
              <div className="summary-row">
                <span>GST (18%)</span>
                <span>{formatPrice(orderData.gst)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total Paid</span>
                <span>{formatPrice(orderData.total)}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Shipping & Payment Info */}
          <div className="confirmation-sidebar">
            
            {/* Shipping Address */}
            <div className="info-card">
              <h3>Shipping Address</h3>
              <div className="info-content">
                <p className="info-name">{orderData.shippingAddress.name}</p>
                <p>{orderData.shippingAddress.address}</p>
                <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state}</p>
                <p>Pincode: {orderData.shippingAddress.pincode}</p>
                <p className="info-phone">
                  <Phone size={14} />
                  {orderData.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="info-card">
              <h3>Payment Information</h3>
              <div className="info-content">
                <div className="payment-row">
                  <span>Payment Method</span>
                  <strong>{orderData.paymentMethod}</strong>
                </div>
                <div className="payment-row">
                  <span>Payment Status</span>
                  <span className="status-badge paid">{orderData.paymentStatus}</span>
                </div>
                <div className="payment-row">
                  <span>Transaction ID</span>
                  <span className="transaction-id">TXN{Math.random().toString(36).substr(2, 12).toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="confirmation-actions">
              <button onClick={handleDownloadInvoice} className="action-btn download-btn">
                <Download size={18} />
                Download Invoice
              </button>
              <button className="action-btn email-btn">
                <Mail size={18} />
                Email Receipt
              </button>
            </div>

            {/* Help Box */}
            <div className="help-box">
              <h4>Need Help?</h4>
              <p>Contact our customer support team</p>
              <div className="help-contact">
                <Phone size={16} />
                <span>+92 300 1234567</span>
              </div>
              <div className="help-contact">
                <Mail size={16} />
                <span>support@gharbazaar.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="confirmation-footer">
          <Link to="/marketplace" className="btn btn--outline">
            Continue Shopping
          </Link>
          <Link to="/" className="btn btn--filled">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default OrderConfirmation;
