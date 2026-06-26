import React, { useState } from 'react';
import { PhoneCall, RefreshCw, UserCircle2, Mail, MapPin, CheckCircle, Clock } from 'lucide-react';

const mockLeads = [
  {
    id: 'LD-901',
    name: 'Anjali Verma',
    phone: '+91 98765 11223',
    email: 'anjali.v@gmail.com',
    interest: 'Looking for 2BHK Apartment',
    location: 'Navi Mumbai',
    status: 'New',
    date: '1 hour ago'
  },
  {
    id: 'LD-902',
    name: 'Rohit Khandelwal',
    phone: '+91 88776 55443',
    email: 'rohit.k@business.com',
    interest: 'Commercial Office Space (Lease)',
    location: 'Cyber City, Gurugram',
    status: 'Contacted',
    date: 'Yesterday'
  },
  {
    id: 'LD-903',
    name: 'Sunita Mishra',
    phone: '+91 77665 44332',
    email: 'sunita.m@yahoo.com',
    interest: 'Interested in Painting Services',
    location: 'Pune',
    status: 'Converted',
    date: '3 days ago'
  }
];

export default function LeadManagement() {
  const [leads, setLeads] = useState(mockLeads);

  const handleUpdateStatus = (id, newStatus) => {
    setLeads(leads.map(lead => {
      if (lead.id === id) {
        return { ...lead, status: newStatus };
      }
      return lead;
    }));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return { color: '#3b82f6', bg: '#eff6ff', border: '#3b82f6' };
      case 'Contacted': return { color: '#f59e0b', bg: '#fffbeb', border: '#f59e0b' };
      case 'Converted': return { color: '#10b981', bg: '#ecfdf5', border: '#10b981' };
      default: return { color: '#6b7280', bg: '#f3f4f6', border: '#d1d5db' };
    }
  };

  return (
    <div className="employee-dashboard-container">
      <div className="dashboard-header-row" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="dashboard-title">Lead Management</h1>
          <p className="dashboard-subtitle">Assign, track, and convert potential leads generated from the platform</p>
        </div>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="employee-card" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
        {leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px dashed #d1d5db' }}>
            <PhoneCall size={48} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
            <h3>No Leads Available</h3>
            <p style={{ color: '#6b7280' }}>There are no active leads in the system right now.</p>
          </div>
        ) : (
          <div className="emp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))' }}>
            {leads.map(lead => {
              const styles = getStatusColor(lead.status);
              return (
                <div key={lead.id} className="emp-card" style={{ borderTop: `4px solid ${styles.border}` }}>
                  
                  <div className="emp-card__top" style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="emp-card__avatar" style={{ background: '#f3f4f6', color: '#4b5563', width: '36px', height: '36px' }}>
                        <UserCircle2 size={20} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#111827' }}>{lead.name}</h4>
                        <span style={{ fontSize: '0.7rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={10} /> Generated {lead.date}
                        </span>
                      </div>
                    </div>
                    <div className="emp-card__badge" style={{ background: styles.border, color: 'white' }}>
                      {lead.status}
                    </div>
                  </div>
                  
                  <div className="emp-card__info" style={{ gap: '0.5rem' }}>
                    
                    <div style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '0.25rem' }}>Interest / Requirement</span>
                      <strong style={{ color: '#111827', fontSize: '0.9rem' }}>{lead.interest}</strong>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
                        <MapPin size={12} /> {lead.location}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <PhoneCall size={14} color="#6b7280" />
                        <span style={{ color: '#374151', fontSize: '0.85rem' }}>{lead.phone}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Mail size={14} color="#6b7280" />
                        <span style={{ color: '#374151', fontSize: '0.85rem' }}>{lead.email}</span>
                      </div>
                    </div>

                  </div>

                  <div className="emp-card__actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    {lead.status === 'New' && (
                      <button 
                        onClick={() => handleUpdateStatus(lead.id, 'Contacted')}
                        className="emp-card__btn" 
                        style={{ background: '#f59e0b', color: 'white', border: 'none', flex: 1 }}
                      >
                        Mark Contacted
                      </button>
                    )}
                    {lead.status === 'Contacted' && (
                      <button 
                        onClick={() => handleUpdateStatus(lead.id, 'Converted')}
                        className="emp-card__btn" 
                        style={{ background: '#10b981', color: 'white', border: 'none', flex: 1 }}
                      >
                        <CheckCircle size={14} /> Mark Converted
                      </button>
                    )}
                    <button className="emp-card__btn" style={{ background: '#f3f4f6', color: '#7c3aed', border: '1px solid #7c3aed', flex: 1 }}>
                      <PhoneCall size={14} /> Call Lead
                    </button>
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
