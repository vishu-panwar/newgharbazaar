import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Wrench, ShoppingBag, Eye, EyeOff, LogIn } from 'lucide-react';
import './SellerLogin.css';

export default function SellerLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    category: 'property' // default
  });

  const CATEGORIES = [
    { id: 'property', label: 'Property Seller', icon: Building2 },
    { id: 'service', label: 'Service Provider', icon: Wrench },
    { id: 'product', label: 'Product Vendor', icon: ShoppingBag }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (id) => {
    setFormData({ ...formData, category: id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, API call goes here
    // Route to respective dashboard
    navigate(`/seller/dashboard/${formData.category}`);
  };

  return (
    <div className="seller-auth-container login-container">
      <div className="seller-auth-card login-card">
        <div className="seller-auth-header">
          <LogIn className="auth-header-icon" />
          <h2>Seller Login</h2>
          <p>Welcome back to GharBazaar Seller Portal</p>
        </div>

        <form className="seller-auth-form" onSubmit={handleSubmit}>
          <div className="category-selector">
            <p className="category-label text-center">Login as</p>
            <div className="category-options login-categories">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                return (
                  <div 
                    key={cat.id} 
                    className={`category-card compact-card ${formData.category === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <Icon className="category-icon-small" />
                    <h4>{cat.label}</h4>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" required placeholder="you@example.com" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                required 
                placeholder="Enter your password" 
                onChange={handleChange} 
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="forgot-password">
              <Link to="#">Forgot Password?</Link>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have a seller account? <Link to="/seller/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}
