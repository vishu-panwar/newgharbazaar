import { Wrench, Calendar, Star, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../Dashboard.css'; 

export default function ServiceDashboard() {
  const stats = [
    { label: 'Active Services', value: '5', icon: Wrench, trend: 'All verified' },
    { label: 'Total Bookings', value: '128', icon: Calendar, trend: '+12 this month' },
    { label: 'Average Rating', value: '4.8', icon: Star, trend: 'From 85 reviews' },
    { label: 'Total Earnings', value: '₹45,000', icon: TrendingUp, trend: '+8% this month' },
  ];

  return (
    <div className="dashboard-content">
      <div className="dashboard-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">Service Dashboard</h1>
          <p className="dashboard-subtitle">Manage your service offerings and bookings</p>
        </div>
        <button className="btn btn--premium" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0F9D58', border: 'none' }}>
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ color: '#0F9D58', background: 'rgba(15, 157, 88, 0.1)' }}>
                <stat.icon size={24} />
              </div>
              <span className="stat-trend positive">{stat.trend}</span>
            </div>
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-header">
            <h3>Upcoming Bookings</h3>
            <button className="btn-link" style={{ color: '#0F9D58' }}>View Calendar</button>
          </div>
          <div className="card-content">
            <p className="text-muted">No upcoming bookings for today.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
