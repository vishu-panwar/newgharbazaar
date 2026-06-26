import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, FileSignature, MessageSquare, Edit3, User, Building2, Calendar, IndianRupee, ArrowRight, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import Toast from '../components/Toast';
import './ProposalDetails.css';

// Using mock data similar to MyProposals
const mockProposals = [
  {
    id: 1,
    type: 'Property',
    itemName: 'Luxury Villa in DHA Phase 5',
    ownerName: 'Ali Khan',
    ownerRole: 'Owner',
    ownerAvatar: 'A',
    originalPrice: '₹4.5 Cr',
    proposedPrice: '₹4.2 Cr',
    status: 'negotiating',
    date: '2026-05-01',
    description: 'A beautiful 5-bedroom luxury villa with a private pool, modern architecture, and high-end finishings. Located in the heart of DHA Phase 5.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    history: [
      { date: '2026-05-01 10:30 AM', actor: 'You', action: 'Created Proposal', note: 'Offered ₹4.2 Cr with a 30-day closing period.' },
      { date: '2026-05-02 02:15 PM', actor: 'Ali Khan', action: 'Counter Offer', note: 'Countered with ₹4.35 Cr.' },
      { date: '2026-05-02 04:00 PM', actor: 'You', action: 'Counter Offer', note: 'Countered with ₹4.25 Cr. Awaiting response.' }
    ]
  },
  // Add fallback data just in case
  {
    id: 'default',
    type: 'Service',
    itemName: 'Complete Home Interior Design',
    ownerName: 'Design Studio Pro',
    ownerRole: 'Service Provider',
    ownerAvatar: 'D',
    originalPrice: '₹12 Lakhs',
    proposedPrice: '₹10 Lakhs',
    status: 'pending',
    date: '2026-04-28',
    description: 'End-to-end interior design for a 3BHK apartment including modular kitchen, false ceiling, and custom furniture.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    history: [
      { date: '2026-04-28 09:00 AM', actor: 'You', action: 'Created Proposal', note: 'Requested a discount for a 3BHK project.' }
    ]
  }
];

export default function ProposalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [counterPrice, setCounterPrice] = useState('');
  const [counterNote, setCounterNote] = useState('');
  const [toast, setToast] = useState(null);
  
  // Find proposal by id or fall back to default
  const proposal = mockProposals.find(p => p.id === Number(id)) || mockProposals[1];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'accepted': return <span className="pd-status accepted"><CheckCircle size={16}/> Accepted</span>;
      case 'rejected': return <span className="pd-status rejected"><XCircle size={16}/> Rejected</span>;
      case 'negotiating': return <span className="pd-status negotiating"><FileSignature size={16}/> Negotiating</span>;
      default: return <span className="pd-status pending"><Clock size={16}/> Pending Review</span>;
    }
  };

  const handleCounterSubmit = (e) => {
    e.preventDefault();
    setToast({ message: `Counter offer of ${counterPrice} submitted successfully!`, type: 'success' });
    setShowCounterModal(false);
  };

  const handleWithdraw = () => {
    setToast({ message: 'Proposal has been successfully withdrawn.', type: 'success' });
  };

  const handleDownload = () => {
    setToast({ message: 'Downloading agreement document...', type: 'success' });
  };

  return (
    <div className="proposal-details-page">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      <div className="pd-header">
        <div className="pd-header-left">
          <Link to="/dashboard/proposals" className="back-btn">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="pd-breadcrumbs">
              <Link to="/dashboard/proposals">My Proposals</Link>
              <span>/</span>
              <span>Proposal #{proposal.id}</span>
            </div>
            <h1>Proposal Details</h1>
          </div>
        </div>
        <div className="pd-header-actions">
          {getStatusBadge(proposal.status)}
        </div>
      </div>

      <div className="pd-grid">
        {/* Left Column: Details */}
        <div className="pd-main-col">
          <div className="pd-card item-card">
            <div className="item-image-wrapper">
              <img src={proposal.image} alt={proposal.itemName} className="item-image" />
              <div className="item-type-badge">{proposal.type}</div>
            </div>
            <div className="item-info">
              <h2>{proposal.itemName}</h2>
              <p className="item-desc">{proposal.description}</p>
              
              <div className="item-meta-grid">
                <div className="meta-item">
                  <Calendar size={18} />
                  <div>
                    <span className="meta-label">Submitted On</span>
                    <span className="meta-value">{new Date(proposal.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <ShieldCheck size={18} />
                  <div>
                    <span className="meta-label">Proposal ID</span>
                    <span className="meta-value">PRP-{proposal.id.toString().padStart(4, '0')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pd-card timeline-card">
            <h3>Negotiation Timeline</h3>
            <div className="timeline-container">
              {proposal.history.map((event, index) => (
                <div key={index} className={`timeline-item ${index === proposal.history.length - 1 ? 'latest' : ''}`}>
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    {index !== proposal.history.length - 1 && <div className="marker-line"></div>}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="timeline-actor">{event.actor}</span>
                      <span className="timeline-action">{event.action}</span>
                      <span className="timeline-date">{event.date}</span>
                    </div>
                    <div className="timeline-note">{event.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="pd-side-col">
          <div className="pd-card finance-card">
            <h3>Financial Overview</h3>
            <div className="finance-comparison">
              <div className="finance-box listed">
                <span className="finance-label">Listed Price</span>
                <span className="finance-amount">{proposal.originalPrice}</span>
              </div>
              <div className="finance-divider">
                <ArrowRight size={20} />
              </div>
              <div className="finance-box proposed">
                <span className="finance-label">Latest Offer</span>
                <span className="finance-amount">{proposal.proposedPrice}</span>
              </div>
            </div>
            
            {proposal.status === 'negotiating' && (
              <div className="finance-savings">
                <IndianRupee size={16} />
                <span>You are negotiating a better deal</span>
              </div>
            )}
          </div>

          <div className="pd-card owner-card">
            <h3>{proposal.type === 'Property' ? 'Property Owner' : 'Service Provider'}</h3>
            <div className="owner-profile">
              <div className="owner-avatar">{proposal.ownerAvatar}</div>
              <div className="owner-details">
                <h4>{proposal.ownerName}</h4>
                <p>{proposal.ownerRole}</p>
              </div>
            </div>
            <div className="owner-actions">
              <Link to="/dashboard/messages" className="btn-outline-full">
                <MessageSquare size={16} /> Chat directly
              </Link>
            </div>
          </div>

          <div className="pd-card actions-card">
            <h3>Actions</h3>
            <div className="action-buttons">
              {(proposal.status === 'pending' || proposal.status === 'negotiating') && (
                <>
                  <button className="btn-primary-full" onClick={() => setShowCounterModal(true)}>
                    <Edit3 size={16} /> Make Counter Offer
                  </button>
                  <button className="btn-danger-outline" onClick={handleWithdraw}>
                    <XCircle size={16} /> Withdraw Proposal
                  </button>
                </>
              )}
              {proposal.status === 'accepted' && (
                <>
                  <button className="btn-success-full" onClick={() => navigate('/dashboard/payments')}>
                    Proceed to Payment
                  </button>
                  <button className="btn-outline-full" onClick={handleDownload}>
                    <Download size={16} /> Download Agreement
                  </button>
                </>
              )}
               {proposal.status === 'rejected' && (
                <button className="btn-primary-full" onClick={() => navigate('/dashboard/proposals')}>
                  Create New Proposal
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Counter Offer Modal */}
      {showCounterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Make Counter Offer</h2>
            <p>Propose a new price or update your terms for <strong>{proposal.itemName}</strong>.</p>
            <form onSubmit={handleCounterSubmit}>
              <div className="form-group">
                <label>Counter Price (₹)</label>
                <input 
                  type="text" 
                  value={counterPrice} 
                  onChange={(e) => setCounterPrice(e.target.value)} 
                  placeholder="e.g. 4.25 Cr" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Additional Notes</label>
                <textarea 
                  value={counterNote} 
                  onChange={(e) => setCounterNote(e.target.value)} 
                  placeholder="Explain your counter offer or add specific terms..."
                  rows="4"
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowCounterModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Submit Counter Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
