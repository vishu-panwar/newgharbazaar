import { Building2, Users, Eye, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../Dashboard.css'; // Reusing dashboard styles

export default function PropertyDashboard() {
  const stats = [
    { label: 'Active Listings', value: '12', icon: Building2, trend: '+2 this month' },
    { label: 'Total Views', value: '3,450', icon: Eye, trend: '+15% this week' },
    { label: 'New Leads', value: '48', icon: Users, trend: '+8 today' },
    { label: 'Conversion Rate', value: '4.2%', icon: TrendingUp, trend: '+1.1% overall' },
  ];

  return (
    <div className="dashboard-content">
      <div className="dashboard-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">Property Dashboard</h1>
          <p className="dashboard-subtitle">Manage your real estate listings and leads</p>
        </div>
        <Link to="/list-property" className="btn btn--premium" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0F9D58', textDecoration: 'none' }}>
          <Plus size={18} /> Add Property
        </Link>
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
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Listings</h3>
            <button className="btn-link" style={{ color: '#0F9D58' }}>View All</button>
          </div>
          <div className="card-content">
            <p className="text-muted">You have no recent listings pending action.</p>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Leads</h3>
            <button className="btn-link" style={{ color: '#0F9D58' }}>View All</button>
          </div>
          <div className="card-content">
            <p className="text-muted">Check back later for new leads.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
