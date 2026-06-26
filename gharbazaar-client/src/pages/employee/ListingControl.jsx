import { useState, useEffect } from 'react';
import { Building, MapPin, PauseCircle, PlayCircle, Ban, RefreshCw } from 'lucide-react';

const mockProperties = [
  {
    _id: 'PROP-001',
    title: 'Luxury 4BHK Villa in Whitefield',
    city: 'Bangalore',
    type: 'Villa',
    price: 35000000,
    status: 'Active'
  },
  {
    _id: 'PROP-002',
    title: 'Modern 2BHK Apartment near Metro',
    city: 'Mumbai',
    type: 'Apartment',
    price: 12500000,
    status: 'Active'
  },
  {
    _id: 'PROP-003',
    title: 'Commercial Office Space in Cyber City',
    city: 'Gurugram',
    type: 'Commercial',
    price: 85000000,
    status: 'Active'
  }
];

export default function ListingControl() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay then load mock data
    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 800);
  }, []);

  const handleTogglePause = (id) => {
    setProperties(properties.map(prop => {
      if (prop._id === id) {
        const newStatus = prop.status === 'Paused' ? 'Active' : 'Paused';
        alert(`Property ${id} has been ${newStatus.toLowerCase()}!`);
        return { ...prop, status: newStatus };
      }
      return prop;
    }));
  };

  const handleSuspend = (id) => {
    if(window.confirm("Are you sure you want to suspend this property? It will be removed from public view immediately and will require manual admin un-suspension.")) {
      setProperties(properties.map(prop => {
        if (prop._id === id) {
          return { ...prop, status: 'Suspended' };
        }
        return prop;
      }));
    }
  };

  return (
    <div className="employee-dashboard-container">
      <div className="dashboard-header-row" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="dashboard-title">Listing Control Centre</h1>
          <p className="dashboard-subtitle">Manage live property visibility: Pause, Resume, or Suspend listings</p>
        </div>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="employee-card" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem' }}>Loading active listings...</div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px dashed #d1d5db' }}>
            <Building size={48} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
            <h3>No Live Listings</h3>
            <p style={{ color: '#6b7280' }}>There are no active properties currently on the platform.</p>
          </div>
        ) : (
          <div className="emp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {properties.map(prop => (
              <div key={prop._id} className="emp-card" style={{ 
                borderTop: prop.status === 'Suspended' ? '4px solid #ef4444' : prop.status === 'Paused' ? '4px solid #f59e0b' : '4px solid #10b981',
                opacity: prop.status === 'Suspended' ? 0.6 : 1,
                transition: 'all 0.3s ease'
              }}>
                <div className="emp-card__top">
                  <div className="emp-card__avatar" style={{ 
                    background: prop.status === 'Suspended' ? '#fef2f2' : prop.status === 'Paused' ? '#fffbeb' : '#ecfdf5',
                    color: prop.status === 'Suspended' ? '#ef4444' : prop.status === 'Paused' ? '#f59e0b' : '#10b981'
                  }}>
                    <Building size={24} />
                  </div>
                  <div className="emp-card__badge" style={{ 
                    background: prop.status === 'Suspended' ? '#ef4444' : prop.status === 'Paused' ? '#f59e0b' : '#10b981' 
                  }}>
                    {prop.status}
                  </div>
                </div>
                
                <div className="emp-card__info">
                  <h3 className="emp-card__title">{prop.title}</h3>
                  <div className="emp-card__meta">
                    <MapPin size={12} /> {prop.city}
                  </div>
                  <div className="emp-card__tag" style={{ marginTop: '0.5rem', display: 'inline-block' }}>{prop.type}</div>
                  <div className="emp-card__price" style={{ marginTop: '0.5rem', fontSize: '1.25rem' }}>₹{prop.price.toLocaleString()}</div>
                </div>

                <div className="emp-card__actions" style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                  {prop.status !== 'Suspended' && (
                    <button 
                      onClick={() => handleTogglePause(prop._id)}
                      className="emp-card__btn" 
                      style={{ 
                        background: prop.status === 'Paused' ? '#10b981' : '#f59e0b', 
                        color: 'white', border: 'none', flex: 1 
                      }}
                    >
                      {prop.status === 'Paused' ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
                      {prop.status === 'Paused' ? ' Resume' : ' Pause'}
                    </button>
                  )}
                  <button 
                    onClick={() => handleSuspend(prop._id)}
                    disabled={prop.status === 'Suspended'}
                    className="emp-card__btn"
                    style={{ 
                      background: prop.status === 'Suspended' ? '#f3f4f6' : '#ef4444', 
                      color: prop.status === 'Suspended' ? '#9ca3af' : 'white', 
                      border: 'none', flex: 1, cursor: prop.status === 'Suspended' ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <Ban size={16} /> Suspend
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
