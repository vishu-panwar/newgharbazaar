import { useState, useEffect } from 'react';
import { Package, MapPin, Edit, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';

const mockInventory = [
  { _id: 'INV-001', name: 'UltraTech Cement (50kg)', vendorName: 'BuildMart Co.', category: 'Cement', price: 420, stock: 150 },
  { _id: 'INV-002', name: 'Asian Paints Apex (20L)', vendorName: 'ColorWorld', category: 'Paints', price: 3400, stock: 0 },
  { _id: 'INV-003', name: 'Red Bricks (Premium)', vendorName: 'City Bricks Ltd.', category: 'Bricks', price: 8, stock: 10000 },
  { _id: 'INV-004', name: 'Havells Copper Wire (1.5mm)', vendorName: 'ElectroHub', category: 'Electrical', price: 1250, stock: 45 }
];

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay then load mock data
    setTimeout(() => {
      setProducts(mockInventory);
      setLoading(false);
    }, 800);
  }, []);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this product from the inventory?")) {
      setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <div className="employee-dashboard-container">
      <div className="dashboard-header-row" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="dashboard-title">Manage Inventory</h1>
          <p className="dashboard-subtitle">Monitor marketplace inventory, update stock levels, and manage vendor products</p>
        </div>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="employee-card" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem' }}>Loading inventory data...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '1rem', border: '1px dashed #d1d5db' }}>
            <Package size={48} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
            <h3>Inventory is Empty</h3>
            <p style={{ color: '#6b7280' }}>No marketplace products are currently listed.</p>
          </div>
        ) : (
          <div className="emp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {products.map(prod => (
              <div key={prod._id} className="emp-card" style={{ 
                borderTop: prod.stock === 0 ? '4px solid #ef4444' : '4px solid #3b82f6',
                opacity: prod.stock === 0 ? 0.8 : 1
              }}>
                <div className="emp-card__top">
                  <div className="emp-card__avatar" style={{ 
                    background: prod.stock === 0 ? '#fef2f2' : '#eff6ff',
                    color: prod.stock === 0 ? '#ef4444' : '#3b82f6'
                  }}>
                    <Package size={24} />
                  </div>
                  <div className={`emp-card__badge ${prod.stock === 0 ? 'emp-card__badge--error' : ''}`} style={prod.stock > 0 ? { background: '#3b82f6' } : {}}>
                    {prod.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                
                <div className="emp-card__info">
                  <h3 className="emp-card__title">{prod.name}</h3>
                  <div className="emp-card__meta">
                    <MapPin size={12} /> {prod.vendorName}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <div className="emp-card__tag">{prod.category}</div>
                    {prod.stock > 0 ? (
                      <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600' }}>{prod.stock} units left</span>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <AlertTriangle size={12} /> Restock needed
                      </span>
                    )}
                  </div>
                  <div className="emp-card__price" style={{ marginTop: '0.5rem', fontSize: '1.25rem' }}>₹{prod.price.toLocaleString()}</div>
                </div>

                <div className="emp-card__actions" style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                  <button className="emp-card__btn" style={{ background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', flex: 1 }}>
                    <Edit size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(prod._id)}
                    className="emp-card__btn" 
                    style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', flex: 1 }}
                  >
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
