import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Wrench, ShoppingBag, Eye, EyeOff, Sparkles, Briefcase } from 'lucide-react';
import './SellerRegister.css';

export default function SellerRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    category: 'property' // default
  });

  const CATEGORIES = [
    { id: 'property', label: 'Property Seller', icon: Building2, desc: 'List homes, plots & commercial spaces' },
    { id: 'service', label: 'Service Provider', icon: Wrench, desc: 'Offer plumbing, electrical & legal services' },
    { id: 'product', label: 'Product Vendor', icon: ShoppingBag, desc: 'Sell construction materials & home goods' }
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
    <div className="seller-auth-container">
      <div className="seller-auth-card">
        <div className="seller-auth-header">
          <Sparkles className="auth-header-icon" />
          <h2>Become a Seller</h2>
          <p>Join GharBazaar's premium ecosystem</p>
        </div>

        <form className="seller-auth-form" onSubmit={handleSubmit}>
          <div className="category-selector">
            <p className="category-label">Select your business category</p>
            <div className="category-options">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                return (
                  <div 
                    key={cat.id} 
                    className={`category-card ${formData.category === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <Icon className="category-icon" />
                    <h4>{cat.label}</h4>
                    <p>{cat.desc}</p>
                    <div className="radio-circle"></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" required placeholder="John Doe" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Business / Company Name</label>
              <div className="input-with-icon">
                <Briefcase size={18} />
                <input type="text" name="company" placeholder="Optional" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required placeholder="you@example.com" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" required placeholder="+91 98765 43210" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                required 
                placeholder="Create a strong password" 
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
          </div>

          <div className="terms-check">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to GharBazaar's Seller Terms & Conditions</label>
          </div>

          <button type="submit" className="auth-submit-btn">
            Create Seller Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have a seller account? <Link to="/seller/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}
