import { ShoppingBag, Package, DollarSign, TrendingUp, Plus } from 'lucide-react';
import '../Dashboard.css'; 

export default function ProductDashboard() {
  const stats = [
    { label: 'Products Listed', value: '24', icon: ShoppingBag, trend: '4 low stock' },
    { label: 'Orders Pending', value: '12', icon: Package, trend: 'Requires shipping' },
    { label: 'Monthly Revenue', value: '₹1,25,000', icon: DollarSign, trend: '+15% vs last month' },
    { label: 'Conversion Rate', value: '3.8%', icon: TrendingUp, trend: 'Healthy' },
  ];

  return (
    <div className="dashboard-content">
      <div className="dashboard-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">Marketplace Dashboard</h1>
          <p className="dashboard-subtitle">Manage your product inventory and orders</p>
        </div>
        <button className="btn btn--premium" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0F9D58', border: 'none' }}>
          <Plus size={18} /> Add Product
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
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <button className="btn-link" style={{ color: '#0F9D58' }}>View All</button>
          </div>
          <div className="card-content">
            <p className="text-muted">Your recent orders will appear here.</p>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Low Stock Inventory</h3>
            <button className="btn-link" style={{ color: '#0F9D58' }}>Manage Inventory</button>
          </div>
          <div className="card-content">
            <p className="text-muted">All products are well stocked.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
