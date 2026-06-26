import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileSignature, CheckCircle, XCircle, Clock, MessageSquare, ArrowRight, Edit3, Filter } from 'lucide-react';
import './MyProposals.css';

const mockProposals = [
  {
    id: 1,
    type: 'Property',
    itemName: 'Luxury Villa in DHA Phase 5',
    ownerName: 'Ali Khan (Owner)',
    originalPrice: '₹4.5 Cr',
    proposedPrice: '₹4.2 Cr',
    status: 'negotiating',
    date: '2026-05-01',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80'
  },
  {
    id: 2,
    type: 'Service',
    itemName: 'Complete Home Interior Design',
    ownerName: 'Design Studio Pro',
    originalPrice: '₹12 Lakhs',
    proposedPrice: '₹10 Lakhs',
    status: 'pending',
    date: '2026-04-28',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80'
  },
  {
    id: 3,
    type: 'Property',
    itemName: 'Modern Apartment in Bahria Town',
    ownerName: 'Sara Ali (Broker)',
    originalPrice: '₹1.3 Cr',
    proposedPrice: '₹1.25 Cr',
    status: 'accepted',
    date: '2026-04-25',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80'
  },
  {
    id: 4,
    type: 'Service',
    itemName: 'Property Legal Documentation',
    ownerName: 'Legal Advisors Inc.',
    originalPrice: '₹25,000',
    proposedPrice: '₹20,000',
    status: 'rejected',
    date: '2026-04-20',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80'
  }
];

export default function MyProposals() {
  const [activeTab, setActiveTab] = useState('active');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredProposals = mockProposals.filter(p => {
    // Status Filter
    let statusMatch = true;
    if (activeTab === 'active') statusMatch = ['pending', 'negotiating'].includes(p.status);
    if (activeTab === 'accepted') statusMatch = p.status === 'accepted';
    if (activeTab === 'rejected') statusMatch = p.status === 'rejected';

    // Category Filter
    let categoryMatch = true;
    if (categoryFilter !== 'All') {
      categoryMatch = p.type === categoryFilter;
    }

    return statusMatch && categoryMatch;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'accepted': return <span className="status-badge accepted"><CheckCircle size={12}/> Accepted</span>;
      case 'rejected': return <span className="status-badge rejected"><XCircle size={12}/> Rejected</span>;
      case 'negotiating': return <span className="status-badge negotiating"><FileSignature size={12}/> Negotiating</span>;
      default: return <span className="status-badge pending"><Clock size={12}/> Pending Review</span>;
    }
  };

  return (
    <div className="proposals-page">
      <div className="client-page-header">
        <div>
          <h1>My Proposals</h1>
          <p>Track your negotiations and offers for properties and services</p>
        </div>
        <button className="create-proposal-btn">
          <FileSignature size={18} /> New Proposal
        </button>
      </div>

      <div className="proposals-controls">
        <div className="proposals-tabs">
          <button className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}>Active</button>
          <button className={activeTab === 'accepted' ? 'active' : ''} onClick={() => setActiveTab('accepted')}>Accepted</button>
          <button className={activeTab === 'rejected' ? 'active' : ''} onClick={() => setActiveTab('rejected')}>Rejected</button>
        </div>

        <div className="category-filters">
          <Filter size={16} className="filter-icon" />
          <button className={categoryFilter === 'All' ? 'active' : ''} onClick={() => setCategoryFilter('All')}>All</button>
          <button className={categoryFilter === 'Property' ? 'active' : ''} onClick={() => setCategoryFilter('Property')}>Properties</button>
          <button className={categoryFilter === 'Service' ? 'active' : ''} onClick={() => setCategoryFilter('Service')}>Services</button>
        </div>
      </div>

      <div className="proposals-grid">
        {filteredProposals.length === 0 ? (
          <div className="empty-state">
            <FileSignature size={48} color="#d1d5db" />
            <h3>No proposals found</h3>
            <p>Try changing your filters or create a new proposal.</p>
          </div>
        ) : (
          filteredProposals.map(proposal => (
            <div key={proposal.id} className="proposal-card">
              <div className="proposal-img-wrapper">
                <div className="proposal-img" style={{ backgroundImage: `url(${proposal.image})` }}></div>
                <div className="proposal-badges">
                  <span className="proposal-type">{proposal.type}</span>
                  {getStatusBadge(proposal.status)}
                </div>
              </div>
              
              <div className="proposal-content">
                <h3 className="proposal-title" title={proposal.itemName}>{proposal.itemName}</h3>
                <p className="owner-name">With: <strong>{proposal.ownerName}</strong></p>
                
                <div className="price-comparison">
                  <div className="price-col">
                    <span>Listed</span>
                    <span className="listed-price">{proposal.originalPrice}</span>
                  </div>
                  <div className="price-divider"><ArrowRight size={14} /></div>
                  <div className="price-col">
                    <span>Proposed</span>
                    <span className="proposed-price">{proposal.proposedPrice}</span>
                  </div>
                </div>

                <div className="proposal-date">Sent on {new Date(proposal.date).toLocaleDateString()}</div>
                
                <div className="proposal-actions">
                  {(proposal.status === 'pending' || proposal.status === 'negotiating') && (
                    <button className="action-btn outline">
                      <Edit3 size={14} /> Edit
                    </button>
                  )}
                  <Link to="/dashboard/messages" className="action-btn outline">
                    <MessageSquare size={14} /> Chat
                  </Link>
                  <Link to={`/dashboard/proposals/${proposal.id}`} className="action-btn primary" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
