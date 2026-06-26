import React, { useState } from 'react';
import { Ticket, RefreshCw, Copy, PlusCircle, Ban, Calendar, Percent } from 'lucide-react';

const mockCoupons = [
  {
    id: 'CPN-001',
    code: 'WELCOME50',
    discount: '50% OFF',
    type: 'Percentage',
    usageLimit: '100',
    used: 42,
    expiry: '2026-05-31',
    status: 'Active'
  },
  {
    id: 'CPN-002',
    code: 'FLAT500',
    discount: '₹500 OFF',
    type: 'Flat Amount',
    usageLimit: 'Unlimited',
    used: 1205,
    expiry: '2026-04-15',
    status: 'Expired'
  },
  {
    id: 'CPN-003',
    code: 'BROKERFREE',
    discount: '100% OFF',
    type: 'Listing Fee',
    usageLimit: '50',
    used: 48,
    expiry: '2026-12-31',
    status: 'Active'
  }
];

export default function CouponGenerate() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('');

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!newCode || !newDiscount) return;
    
    const newCoupon = {
      id: `CPN-00${coupons.length + 1}`,
      code: newCode.toUpperCase(),
      discount: newDiscount,
      type: 'Percentage',
      usageLimit: '100',
      used: 0,
      expiry: '2026-12-31',
      status: 'Active'
    };
    
    setCoupons([newCoupon, ...coupons]);
    setNewCode('');
    setNewDiscount('');
    alert(`Coupon ${newCoupon.code} generated successfully!`);
  };

  const handleDeactivate = (id) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, status: 'Expired' } : c));
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code ${code} copied to clipboard!`);
  };

  return (
    <div className="employee-dashboard-container">
      <div className="dashboard-header-row" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="dashboard-title">Coupon Generation</h1>
          <p className="dashboard-subtitle">Create, manage, and distribute promotional discount codes</p>
        </div>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Generate New Coupon Section */}
      <div className="employee-card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, #f3e8ff, #ede9fe)', border: '1px solid #ddd6fe' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#5b21b6', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={20} /> Create New Coupon
        </h3>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem', fontWeight: '600' }}>Coupon Code</label>
            <input 
              type="text" 
              placeholder="e.g. DIWALI20" 
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
              required
            />
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem', fontWeight: '600' }}>Discount Value</label>
            <input 
              type="text" 
              placeholder="e.g. 20% OFF or ₹500 OFF" 
              value={newDiscount}
              onChange={(e) => setNewDiscount(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
              required
            />
          </div>
          <button type="submit" style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', height: '40px' }}>
            Generate <Ticket size={16} />
          </button>
        </form>
      </div>

      <div className="employee-card" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
        {coupons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px dashed #d1d5db' }}>
            <Ticket size={48} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
            <h3>No Coupons Available</h3>
            <p style={{ color: '#6b7280' }}>Generate a new coupon above to get started.</p>
          </div>
        ) : (
          <div className="emp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {coupons.map(coupon => {
              const isActive = coupon.status === 'Active';
              return (
                <div key={coupon.id} className="emp-card" style={{ borderTop: isActive ? '4px solid #10b981' : '4px solid #9ca3af', opacity: isActive ? 1 : 0.7 }}>
                  
                  <div className="emp-card__top" style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="emp-card__avatar" style={{ background: isActive ? '#ecfdf5' : '#f3f4f6', color: isActive ? '#10b981' : '#6b7280' }}>
                        <Ticket size={24} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#111827', letterSpacing: '1px', fontFamily: 'monospace' }}>{coupon.code}</h4>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>{coupon.discount}</span>
                      </div>
                    </div>
                    <div className="emp-card__badge" style={{ background: isActive ? '#10b981' : '#6b7280' }}>
                      {coupon.status}
                    </div>
                  </div>
                  
                  <div className="emp-card__info" style={{ gap: '0.5rem' }}>
                    
                    <div style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: '6px', border: '1px dashed #e5e7eb' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                        <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Percent size={12} /> Type:</span>
                        <strong style={{ color: '#374151' }}>{coupon.type}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                        <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><RefreshCw size={12} /> Usage:</span>
                        <strong style={{ color: '#374151' }}>{coupon.used} / {coupon.usageLimit}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                        <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={12} /> Expiry:</span>
                        <strong style={{ color: isActive ? '#111827' : '#ef4444' }}>{new Date(coupon.expiry).toLocaleDateString()}</strong>
                      </div>
                    </div>

                  </div>

                  <div className="emp-card__actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => handleCopy(coupon.code)}
                      className="emp-card__btn" 
                      style={{ background: '#f3f4f6', color: '#4b5563', border: '1px solid #d1d5db', flex: 1 }}
                    >
                      <Copy size={14} /> Copy Code
                    </button>
                    {isActive && (
                      <button 
                        onClick={() => handleDeactivate(coupon.id)}
                        className="emp-card__btn" 
                        style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', flex: 1 }}
                      >
                        <Ban size={14} /> Deactivate
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
