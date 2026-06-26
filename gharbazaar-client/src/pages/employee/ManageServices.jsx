import { useState, useEffect } from 'react';
import { Wrench, MapPin, Edit, Trash2 } from 'lucide-react';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="employee-page-header">
        <h1>Manage Services</h1>
        <p>View and manage registered service providers.</p>
      </div>

      <div className="employee-card">
        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p>No service providers found.</p>
        ) : (
          <div className="emp-grid">
            {services.map(srv => (
              <div key={srv._id} className="emp-card">
                <div className="emp-card__top">
                  <div className="emp-card__avatar">
                    <Wrench size={24} />
                  </div>
                  <div className="emp-card__badge">Active</div>
                </div>
                
                <div className="emp-card__info">
                  <h3 className="emp-card__title">{srv.providerName}</h3>
                  <div className="emp-card__meta">
                    <MapPin size={12} /> {srv.city}
                  </div>
                  <div className="emp-card__tag">{srv.category}</div>
                  <div className="emp-card__meta" style={{ marginTop: '0.25rem' }}>
                     {srv.experience} Yrs Experience
                  </div>
                </div>

                <div className="emp-card__actions">
                  <button className="emp-card__btn emp-card__btn--edit">
                    <Edit size={14} /> Edit
                  </button>
                  <button className="emp-card__btn emp-card__btn--delete">
                    <Trash2 size={14} /> Delete
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
