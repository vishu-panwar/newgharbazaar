import React, { useState } from 'react';
import { CheckCircle, FileText, UserCircle2, RefreshCw, ShieldCheck } from 'lucide-react';

const mockCompletedKYC = [
  {
    id: 'KYC-054',
    name: 'Anita Desai',
    type: 'Service Provider (Plumbing)',
    aadharNumber: 'XXXX-XXXX-8822',
    dateVerified: '2026-04-28',
    status: 'Verified',
    frontImage: 'https://images.unsplash.com/photo-1633424687611-137788107937?auto=format&fit=crop&q=80&w=300&h=180',
    backImage: 'https://images.unsplash.com/photo-1621689255627-772c219803b3?auto=format&fit=crop&q=80&w=300&h=180'
  },
  {
    id: 'KYC-055',
    name: 'Vikram Singh',
    type: 'Broker',
    aadharNumber: 'XXXX-XXXX-1199',
    dateVerified: '2026-04-25',
    status: 'Verified',
    frontImage: 'https://images.unsplash.com/photo-1633424687611-137788107937?auto=format&fit=crop&q=80&w=300&h=180',
    backImage: 'https://images.unsplash.com/photo-1621689255627-772c219803b3?auto=format&fit=crop&q=80&w=300&h=180'
  },
  {
    id: 'KYC-056',
    name: 'Priya Patel',
    type: 'Vendor',
    aadharNumber: 'XXXX-XXXX-3344',
    dateVerified: '2026-04-20',
    status: 'Verified',
    frontImage: 'https://images.unsplash.com/photo-1633424687611-137788107937?auto=format&fit=crop&q=80&w=300&h=180',
    backImage: 'https://images.unsplash.com/photo-1621689255627-772c219803b3?auto=format&fit=crop&q=80&w=300&h=180'
  }
];

export default function CompletedKYC() {
  const [requests, setRequests] = useState(mockCompletedKYC);

  return (
    <div className="employee-dashboard-container">
      <div className="dashboard-header-row" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="dashboard-title">Completed KYC</h1>
          <p className="dashboard-subtitle">Archive of all verified user Aadhar identities</p>
        </div>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="emp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
        {requests.map(request => (
          <div key={request.id} className="emp-card" style={{ borderTop: '4px solid #10b981' }}>
            <div className="emp-card__top">
              <div className="emp-card__avatar" style={{ background: '#ecfdf5', color: '#10b981' }}>
                <UserCircle2 size={24} />
              </div>
              <div className="emp-card__badge" style={{ background: '#10b981' }}>
                <ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> 
                Verified
              </div>
            </div>

            <div className="emp-card__info">
              <h3 className="emp-card__title">{request.name}</h3>
              <div className="emp-card__meta">
                <span className="emp-card__tag">{request.type}</span>
              </div>
              
              <div style={{ margin: '1rem 0', padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <FileText size={16} color="#6b7280" />
                  <span style={{ fontSize: '0.85rem', color: '#4b5563', fontWeight: '600' }}>Aadhar Number:</span>
                  <strong style={{ color: '#111827', fontSize: '0.85rem' }}>{request.aadharNumber}</strong>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem', opacity: '0.8' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.25rem' }}>Front Side</span>
                    <img src={request.frontImage} alt="Aadhar Front" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e5e7eb' }} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.25rem' }}>Back Side</span>
                    <img src={request.backImage} alt="Aadhar Back" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e5e7eb' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="emp-card__actions" style={{ marginTop: 'auto', background: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>
                Verified on {new Date(request.dateVerified).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <button 
                className="emp-card__btn" 
                style={{ background: 'transparent', color: '#7c3aed', border: '1px solid #7c3aed', padding: '0.4rem 1rem' }}
              >
                View Log
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
