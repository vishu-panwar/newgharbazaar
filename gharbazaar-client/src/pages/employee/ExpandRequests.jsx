import React, { useState } from 'react';
import { RefreshCw, CheckCircle, XCircle, MapPin, Globe, Briefcase } from 'lucide-react';

const mockExpandRequests = [
  {
    id: 'EXP-401',
    user: 'Metro Realtors',
    type: 'Broker',
    currentArea: 'Mumbai South',
    requestedArea: 'Navi Mumbai',
    reason: 'Opening a new branch in Navi Mumbai next month.',
    status: 'Pending',
    date: '4 hours ago'
  },
  {
    id: 'EXP-402',
    user: 'Suresh Plumbing Solutions',
    type: 'Service Provider',
    currentArea: 'Delhi NCR',
    requestedArea: 'Gurugram & Noida',
    reason: 'Hired 5 new plumbers to cover extended NCR regions.',
    status: 'Pending',
    date: '1 day ago'
  },
  {
    id: 'EXP-403',
    user: 'BuildMart Supply',
    type: 'Marketplace Vendor',
    currentArea: 'Pune City',
    requestedArea: 'Pimpri-Chinchwad',
    reason: 'Got a new warehouse to service PCMC orders.',
    status: 'Pending',
    date: '2 days ago'
  }
];

export default function ExpandRequests() {
  const [requests, setRequests] = useState(mockExpandRequests);

  const handleApprove = (id, user, area) => {
    setRequests(requests.filter(req => req.id !== id));
    alert(`Approved! ${user} has been granted access to ${area}.`);
  };

  const handleReject = (id) => {
    if(window.confirm("Are you sure you want to reject this expansion request?")) {
      setRequests(requests.filter(req => req.id !== id));
    }
  };

  return (
    <div className="employee-dashboard-container">
      <div className="dashboard-header-row" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="dashboard-title">Expand Requests</h1>
          <p className="dashboard-subtitle">Review applications from professionals wanting to expand their service areas</p>
        </div>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="employee-card" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
        {requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px dashed #d1d5db' }}>
            <MapPin size={48} color="#10b981" style={{ margin: '0 auto 1rem' }} />
            <h3>All Caught Up!</h3>
            <p style={{ color: '#6b7280' }}>There are no pending area expansion requests right now.</p>
          </div>
        ) : (
          <div className="emp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))' }}>
            {requests.map(req => (
              <div key={req.id} className="emp-card" style={{ borderTop: '4px solid #8b5cf6' }}>
                
                <div className="emp-card__top" style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="emp-card__avatar" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: '#111827' }}>{req.user}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem' }}>
                        {req.type}
                      </span>
                    </div>
                  </div>
                  <div className="emp-card__badge" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
                    {req.status}
                  </div>
                </div>
                
                <div className="emp-card__info" style={{ gap: '0.75rem' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Area</span>
                      <strong style={{ color: '#374151', fontSize: '0.85rem' }}>{req.currentArea}</strong>
                    </div>
                    <div style={{ color: '#8b5cf6', padding: '0 0.5rem' }}>
                      →
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>Requested</span>
                      <strong style={{ color: '#111827', fontSize: '0.85rem' }}>{req.requestedArea}</strong>
                    </div>
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>Business Reason:</span>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#374151', fontStyle: 'italic', background: '#fdfcbc', padding: '0.5rem', borderRadius: '4px', borderLeft: '3px solid #fde047' }}>
                      "{req.reason}"
                    </p>
                  </div>
                  
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem', textAlign: 'right' }}>
                    Submitted {req.date}
                  </div>

                </div>

                <div className="emp-card__actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleApprove(req.id, req.user, req.requestedArea)}
                    className="emp-card__btn" 
                    style={{ background: '#10b981', color: 'white', border: 'none', flex: 1 }}
                  >
                    <CheckCircle size={14} /> Approve Area
                  </button>
                  <button 
                    onClick={() => handleReject(req.id)}
                    className="emp-card__btn" 
                    style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', flex: 1 }}
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
