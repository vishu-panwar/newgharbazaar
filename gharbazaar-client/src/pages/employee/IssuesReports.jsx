import React, { useState } from 'react';
import { AlertCircle, RefreshCw, Flag, CheckCircle, Search, Ban, Eye } from 'lucide-react';

const mockReports = [
  {
    id: 'REP-1021',
    reportedBy: 'Karan Patel',
    targetType: 'Property Listing',
    targetName: 'Luxury 4BHK Villa in Whitefield',
    reason: 'Fake Listing - The images are stolen from another website.',
    severity: 'Critical',
    date: '3 hours ago'
  },
  {
    id: 'REP-1022',
    reportedBy: 'Sneha Reddy',
    targetType: 'Service Provider',
    targetName: 'Suresh Plumbers',
    reason: 'Unprofessional behavior and asked for money outside the platform.',
    severity: 'Critical',
    date: '1 day ago'
  },
  {
    id: 'REP-1024',
    reportedBy: 'Ravi Kumar',
    targetType: 'Marketplace Product',
    targetName: 'Asian Paints Apex (20L)',
    reason: 'Vendor delivered expired product, refusing refund.',
    severity: 'High',
    date: '2 days ago'
  }
];

export default function IssuesReports() {
  const [reports, setReports] = useState(mockReports);

  const handleDismiss = (id) => {
    if(window.confirm("Are you sure you want to dismiss this report?")) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  const handleAction = (id, target) => {
    alert(`Initiating administrative action against: ${target}`);
  };

  const getSeverityStyle = (severity) => {
    if (severity === 'Critical') return { color: '#ef4444', bg: '#fef2f2', border: '#ef4444' };
    if (severity === 'High') return { color: '#f59e0b', bg: '#fffbeb', border: '#f59e0b' };
    return { color: '#3b82f6', bg: '#eff6ff', border: '#3b82f6' };
  };

  return (
    <div className="employee-dashboard-container">
      <div className="dashboard-header-row" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="dashboard-title">Issues & Reports</h1>
          <p className="dashboard-subtitle">Review and moderate user-submitted reports regarding platform safety</p>
        </div>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="employee-card" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
        {reports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px dashed #d1d5db' }}>
            <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 1rem' }} />
            <h3>Platform is Safe</h3>
            <p style={{ color: '#6b7280' }}>There are no active issues or reports to review.</p>
          </div>
        ) : (
          <div className="emp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))' }}>
            {reports.map(report => {
              const styles = getSeverityStyle(report.severity);
              return (
                <div key={report.id} className="emp-card" style={{ borderTop: `4px solid ${styles.border}` }}>
                  
                  <div className="emp-card__top">
                    <div className="emp-card__avatar" style={{ background: styles.bg, color: styles.color }}>
                      <Flag size={24} />
                    </div>
                    <div className="emp-card__badge" style={{ background: styles.border }}>
                      {report.severity} Priority
                    </div>
                  </div>
                  
                  <div className="emp-card__info" style={{ gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 className="emp-card__title" style={{ fontSize: '1.05rem' }}>Report on {report.targetType}</h3>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{report.date}</span>
                    </div>
                    
                    <div style={{ fontSize: '0.85rem', color: '#374151', fontWeight: '600', marginTop: '0.25rem' }}>
                      Target: <span style={{ color: '#111827' }}>{report.targetName}</span>
                    </div>
                    
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      Reported by: {report.reportedBy} ({report.id})
                    </div>
                    
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '0.85rem', 
                      background: '#f9fafb', 
                      borderRadius: '6px', 
                      borderLeft: `3px solid ${styles.border}` 
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', color: '#4b5563', fontWeight: '600', fontSize: '0.8rem' }}>
                        <AlertCircle size={14} /> Reason for Report:
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#111827', lineHeight: '1.4' }}>
                        "{report.reason}"
                      </p>
                    </div>
                  </div>

                  <div className="emp-card__actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button className="emp-card__btn" style={{ background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', flex: 1 }}>
                      <Eye size={14} /> View Target
                    </button>
                    <button 
                      onClick={() => handleAction(report.id, report.targetName)}
                      className="emp-card__btn" 
                      style={{ background: '#ef4444', color: 'white', border: 'none', flex: 1 }}
                    >
                      <Ban size={14} /> Take Action
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleDismiss(report.id)}
                    style={{ 
                      width: '100%', marginTop: '0.5rem', padding: '0.5rem', 
                      background: 'transparent', border: 'none', color: '#6b7280', 
                      fontSize: '0.8rem', cursor: 'pointer', fontWeight: '500' 
                    }}
                  >
                    Dismiss Report (False Alarm)
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
