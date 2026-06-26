import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Wrench, 
  ShoppingBag,
  List, 
  CreditCard, 
  Settings, 
  Menu, 
  X,
  LogOut,
  User,
  MessageSquare,
  BarChart,
  Users
} from 'lucide-react';
import './SellerLayout.css';

export default function SellerLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine seller category from URL
  const pathParts = location.pathname.split('/');
  const category = pathParts[3] || 'property'; // default to property if not matched

  const getMenuItems = () => {
    const baseItems = [
      { path: `/seller/dashboard/${category}`, icon: LayoutDashboard, label: 'Dashboard' },
      { path: `/seller/dashboard/${category}/messages`, icon: MessageSquare, label: 'Messages' },
      { path: `/seller/dashboard/${category}/analytics`, icon: BarChart, label: 'Analytics' },
    ];

    let specificItems = [];
    if (category === 'property') {
      specificItems = [
        { path: '/seller/dashboard/property/listings', icon: Building2, label: 'My Properties' },
        { path: '/seller/dashboard/property/leads', icon: Users, label: 'Leads' },
      ];
    } else if (category === 'service') {
      specificItems = [
        { path: '/seller/dashboard/service/services', icon: Wrench, label: 'My Services' },
        { path: '/seller/dashboard/service/bookings', icon: List, label: 'Bookings' },
      ];
    } else if (category === 'product') {
      specificItems = [
        { path: '/seller/dashboard/product/inventory', icon: ShoppingBag, label: 'Inventory' },
        { path: '/seller/dashboard/product/orders', icon: List, label: 'Orders' },
      ];
    }

    const tailItems = [
      { path: `/seller/dashboard/${category}/payments`, icon: CreditCard, label: 'Payments' },
      { path: `/seller/dashboard/${category}/settings`, icon: Settings, label: 'Settings' },
    ];

    return [...baseItems, ...specificItems, ...tailItems];
  };

  const menuItems = getMenuItems();

  const isActive = (path) => {
    // Exact match for the base dashboard, prefix match for others
    if (path === `/seller/dashboard/${category}`) {
      return location.pathname === path || location.pathname === `${path}/`;
    }
    return location.pathname.startsWith(path);
  };

  const getRoleLabel = () => {
    if (category === 'property') return 'Property Seller';
    if (category === 'service') return 'Service Provider';
    if (category === 'product') return 'Marketplace Vendor';
    return 'Seller';
  };

  return (
    <div className="dashboard-layout seller-layout">
      {/* Mobile Header */}
      <div className="dashboard-mobile-header">
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </button>
        <h2>Seller Portal</h2>
        <div className="mobile-user-icon">
          <User size={24} />
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#e8f5e9', padding: '0.25rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}>
               <img src="/logo.jpeg" alt="GharBazaar Logo" style={{ height: '24px', width: 'auto' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#0F9D58', fontWeight: 'bold' }}>GharBazaar</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#0d8549' }}>Seller Portal</p>
            </div>
          </Link>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="seller-role-badge">
          <span>{getRoleLabel()}</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar" style={{ background: '#0F9D58' }}>S</div>
            <div className="user-info">
              <h3>Seller Name</h3>
              <p>{getRoleLabel()}</p>
            </div>
          </div>
          <Link to="/" className="logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
