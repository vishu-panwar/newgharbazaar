import { useState } from 'react';
import { CreditCard, CheckCircle, Clock, Download, Home, Briefcase, ShoppingCart, ShieldCheck, Repeat, XCircle } from 'lucide-react';
import './DashboardPayments.css';

export default function DashboardPayments() {
  const [activeTab, setActiveTab] = useState('all');
  const [autoPayRent, setAutoPayRent] = useState(false);
  const [autoPayService, setAutoPayService] = useState(true);

  // Mock Active Subscriptions
  const activePlans = [
    {
      id: 1,
      name: 'Full Service Plan',
      type: 'plan',
      price: 5899,
      nextBilling: '2024-06-10',
      status: 'Active',
      icon: <ShieldCheck size={24} />
    }
  ];

  // Comprehensive Payment History
  const payments = [
    { 
      id: 1, 
      title: 'Full Service Plan', 
      type: 'plan',
      amount: 5899, 
      date: '2024-05-10', 
      status: 'Completed',
      description: 'Monthly Subscription',
      method: 'Credit Card',
      transactionId: 'TXN987654321',
      icon: <ShieldCheck size={20} />
    },
    { 
      id: 2, 
      title: 'Monthly Rent - Sea View Apartment', 
      type: 'rent',
      amount: 45000, 
      date: '2024-05-01', 
      status: 'Completed',
      description: 'Rent for May 2024',
      method: 'UPI AutoPay',
      transactionId: 'TXN123456789',
      icon: <Home size={20} />
    },
    { 
      id: 3, 
      title: 'Plumbing Service', 
      type: 'service',
      amount: 1200, 
      date: '2024-04-28', 
      status: 'Completed',
      description: 'Pipe Leakage Repair',
      method: 'Credit Card',
      transactionId: 'TXN741852963',
      icon: <Briefcase size={20} />
    },
    { 
      id: 4, 
      title: 'Premium Cement - 50 Bags', 
      type: 'product',
      amount: 19250, 
      date: '2024-04-25', 
      status: 'Completed',
      description: 'Marketplace Purchase',
      method: 'Net Banking',
      transactionId: 'TXN963852741',
      icon: <ShoppingCart size={20} />
    },
    { 
      id: 5, 
      title: 'Direct Contact Plan', 
      type: 'plan',
      amount: 589, 
      date: '2024-04-15', 
      status: 'Completed',
      description: 'One-time lead unlock',
      method: 'UPI',
      transactionId: 'TXN456789123',
      icon: <ShieldCheck size={20} />
    },
    { 
      id: 6, 
      title: 'Electrician Service', 
      type: 'service',
      amount: 800, 
      date: '2024-05-15', 
      status: 'Pending',
      description: 'Wiring Check',
      method: '-',
      transactionId: '-',
      icon: <Briefcase size={20} />
    },
  ];

  const filteredPayments = activeTab === 'all' 
    ? payments 
    : payments.filter(p => p.type === activeTab);

  const totalSpent = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="dashboard-payments-page">
      {/* Page Header */}
      <div className="client-page-header" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.75rem', color: '#111827', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>Payments & Billing</h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>Manage your subscriptions, AutoPay settings, and view transaction history</p>
      </div>

      {/* Upcoming Payments */}
      <div className="client-card upcoming-payments-card">
        <h3 className="section-title">Upcoming Payments</h3>
        <div className="upcoming-payments-list">
          <div className="upcoming-payment-row">
            <div className="upcoming-payment-main">
              <div className="upcoming-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}>
                <Home size={22} />
              </div>
              <div className="upcoming-details">
                <h4>Monthly Rent</h4>
                <p>Due on June 1, 2024</p>
              </div>
            </div>
            <div className="upcoming-right">
              <div className="upcoming-amount">₹45,000</div>
              <button className="pay-now-btn">Pay Now</button>
            </div>
          </div>
          
          <div className="upcoming-payment-row">
            <div className="upcoming-payment-main">
              <div className="upcoming-icon" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                <ShieldCheck size={22} />
              </div>
              <div className="upcoming-details">
                <h4>Full Service Plan</h4>
                <p>Due on June 10, 2024</p>
              </div>
            </div>
            <div className="upcoming-right">
              <div className="upcoming-amount">₹5,899</div>
              <button className="pay-now-btn">Pay Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Plans & AutoPay Grid */}
      <div className="payments-grid-top">
        {/* Active Plans Card */}
        <div className="client-card payments-active-plan">
          <h3>Your Active Plans</h3>
          {activePlans.map(plan => (
            <div key={plan.id} className="active-plan-item">
              <div className="active-plan-icon">{plan.icon}</div>
              <div className="active-plan-info">
                <h4>{plan.name}</h4>
                <p>₹{plan.price.toLocaleString('en-IN')} / month</p>
                <div className="plan-badge">Active</div>
              </div>
              <div className="active-plan-meta">
                <span>Next Billing</span>
                <strong>{new Date(plan.nextBilling).toLocaleDateString('en-IN')}</strong>
              </div>
            </div>
          ))}
          <button className="client-card__btn mt-3">Manage Subscription</button>
        </div>

        {/* AutoPay Setup Card */}
        <div className="client-card payments-autopay">
          <h3>AutoPay Settings</h3>
          <p className="autopay-desc">Never miss a payment. Set up automatic deductions for rent and recurring services.</p>
          
          <div className="autopay-option">
            <div className="autopay-option-info">
              <div className="autopay-icon"><Home size={18} /></div>
              <div>
                <h4>Monthly Rent</h4>
                <p>Auto-pay rent on the 1st of every month</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={autoPayRent} onChange={() => setAutoPayRent(!autoPayRent)} />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="autopay-option">
            <div className="autopay-option-info">
              <div className="autopay-icon"><Repeat size={18} /></div>
              <div>
                <h4>Recurring Services</h4>
                <p>Auto-pay for scheduled maintenance</p>
              </div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={autoPayService} onChange={() => setAutoPayService(!autoPayService)} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Unified Transaction Table */}
      <div className="client-card payments-history-card">
        <div className="payments-history-header">
          <h2>Transaction History</h2>
          <div className="payment-filters">
            <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>All</button>
            <button className={activeTab === 'plan' ? 'active' : ''} onClick={() => setActiveTab('plan')}>Plans</button>
            <button className={activeTab === 'rent' ? 'active' : ''} onClick={() => setActiveTab('rent')}>Rent</button>
            <button className={activeTab === 'service' ? 'active' : ''} onClick={() => setActiveTab('service')}>Services</button>
            <button className={activeTab === 'product' ? 'active' : ''} onClick={() => setActiveTab('product')}>Marketplace</button>
          </div>
        </div>
        
        <div className="payments-table">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="payment-row">
              <div className="payment-main">
                <div className="payment-icon-wrapper" data-type={payment.type}>
                  {payment.icon}
                </div>
                <div className="payment-details">
                  <h4>{payment.title}</h4>
                  <p className="payment-property">{payment.description}</p>
                  <div className="payment-meta">
                    <span>{new Date(payment.date).toLocaleDateString('en-IN')}</span>
                    <span>•</span>
                    <span>{payment.method}</span>
                    {payment.transactionId !== '-' && (
                      <>
                        <span>•</span>
                        <span className="transaction-id">ID: {payment.transactionId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="payment-right">
                <div className="payment-amount">₹{payment.amount.toLocaleString('en-IN')}</div>
                <div className={`payment-status ${payment.status.toLowerCase()}`}>
                  {payment.status === 'Completed' ? <CheckCircle size={14} /> : (payment.status === 'Failed' ? <XCircle size={14} /> : <Clock size={14} />)}
                  {payment.status}
                </div>
                <button className="download-btn" title="Download Invoice">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
          {filteredPayments.length === 0 && (
            <div className="no-payments">
              <p>No transactions found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
