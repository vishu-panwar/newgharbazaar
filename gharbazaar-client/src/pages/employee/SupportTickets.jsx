import React, { useState } from 'react';
import { MessageSquare, RefreshCw, CheckCircle, Clock, AlertCircle, UserCircle2 } from 'lucide-react';

const mockTickets = [
  {
    id: 'TKT-8902',
    user: 'Amit Sharma',
    category: 'Payment Issue',
    priority: 'High',
    status: 'Open',
    date: '2 hours ago',
    description: 'My subscription payment was deducted twice from my bank account. Please refund the extra amount.',
  },
  {
    id: 'TKT-8903',
    user: 'Priya Realtors',
    category: 'Listing Problem',
    priority: 'Medium',
    status: 'In Progress',
    date: '5 hours ago',
    description: 'I am unable to upload more than 5 images for my property listing in the broker dashboard.',
  },
  {
    id: 'TKT-8905',
    user: 'Ramesh Plumbers',
    category: 'Account Access',
    priority: 'Low',
    status: 'Open',
    date: '1 day ago',
    description: 'I forgot my password and the reset link is not arriving in my email inbox.',
  }
];

export default function SupportTickets() {
  const [tickets, setTickets] = useState(mockTickets);

  const handleResolve = (id) => {
    if(window.confirm("Are you sure you want to mark this ticket as resolved?")) {
      setTickets(tickets.filter(t => t.id !== id));
      alert(`Ticket ${id} has been resolved and closed.`);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#ef4444'; // red
      case 'Medium': return '#f59e0b'; // orange
      case 'Low': return '#3b82f6'; // blue
      default: return '#6b7280';
    }
  };

  return (
    <div className="employee-dashboard-container">
      <div className="dashboard-header-row" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="dashboard-title">Support Tickets</h1>
          <p className="dashboard-subtitle">Manage, reply to, and resolve user issues and inquiries</p>
        </div>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="employee-card" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
        {tickets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px dashed #d1d5db' }}>
            <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 1rem' }} />
            <h3>All Caught Up!</h3>
            <p style={{ color: '#6b7280' }}>There are no open support tickets at the moment. Great job!</p>
          </div>
        ) : (
          <div className="emp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
            {tickets.map(ticket => (
              <div key={ticket.id} className="emp-card" style={{ borderLeft: `4px solid ${getPriorityColor(ticket.priority)}` }}>
                
                <div className="emp-card__top" style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div className="emp-card__avatar" style={{ background: '#f3f4f6', color: '#4b5563', width: '32px', height: '32px' }}>
                      <UserCircle2 size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#111827' }}>{ticket.user}</h4>
                      <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>{ticket.id}</span>
                    </div>
                  </div>
                  <div className="emp-card__badge" style={{ 
                    background: ticket.status === 'Open' ? '#ef4444' : '#3b82f6'
                  }}>
                    {ticket.status}
                  </div>
                </div>
                
                <div className="emp-card__info" style={{ gap: '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div className="emp-card__tag" style={{ background: '#f3f4f6', color: '#374151' }}>{ticket.category}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> {ticket.date}
                    </div>
                  </div>
                  
                  <div style={{ 
                    padding: '0.75rem', 
                    background: '#f9fafb', 
                    borderRadius: '8px', 
                    border: '1px solid #e5e7eb',
                    marginTop: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.5' }}>
                      "{ticket.description}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '600', color: getPriorityColor(ticket.priority) }}>
                    <AlertCircle size={12} /> {ticket.priority} Priority
                  </div>
                </div>

                <div className="emp-card__actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button className="emp-card__btn" style={{ background: '#f3f4f6', color: '#7c3aed', border: '1px solid #7c3aed', flex: 1 }}>
                    <MessageSquare size={14} /> Reply
                  </button>
                  <button 
                    onClick={() => handleResolve(ticket.id)}
                    className="emp-card__btn" 
                    style={{ background: '#10b981', color: 'white', border: 'none', flex: 1 }}
                  >
                    <CheckCircle size={14} /> Resolve
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
