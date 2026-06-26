import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Phone, MessageCircle, Square, Filter, X, Building2 } from 'lucide-react';
import './ResidentialProperties.css';

const COMMERCIAL_PROPERTIES = [
  // Office Spaces
  { id: 101, name: 'Premium Office Space', category: 'Office Spaces', location: 'Mumbai, BKC', price: '₹3.5 Cr', area: '2000 sq.ft', rating: 4.9, reviews: 312, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', listingType: 'Sale', city: 'Mumbai', discount: 25 },
  { id: 102, name: 'Modern Office Suite', category: 'Office Spaces', location: 'Bangalore, Whitefield', price: '₹1.8 Cr', area: '1200 sq.ft', rating: 4.8, reviews: 245, img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80', listingType: 'Sale', city: 'Bangalore', discount: 30 },
  { id: 103, name: 'Corporate Office', category: 'Office Spaces', location: 'Gurgaon, Cyber City', price: '₹85,000/month', area: '1500 sq.ft', rating: 4.7, reviews: 189, img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80', listingType: 'Rent', city: 'Gurgaon', discount: 0 },
  { id: 104, name: 'Tech Park Office', category: 'Office Spaces', location: 'Pune, Hinjewadi', price: '₹2.2 Cr', area: '1800 sq.ft', rating: 4.9, reviews: 278, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', listingType: 'Sale', city: 'Pune', discount: 20 },
  
  // Retail Shops
  { id: 105, name: 'High Street Retail Shop', category: 'Retail Shops', location: 'Delhi, Connaught Place', price: '₹2.5 Cr', area: '800 sq.ft', rating: 4.8, reviews: 234, img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80', listingType: 'Sale', city: 'Delhi', discount: 28 },
  { id: 106, name: 'Mall Retail Space', category: 'Retail Shops', location: 'Mumbai, Andheri', price: '₹1.2 Cr', area: '600 sq.ft', rating: 4.7, reviews: 198, img: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80', listingType: 'Sale', city: 'Mumbai', discount: 30 },
  { id: 107, name: 'Corner Shop', category: 'Retail Shops', location: 'Bangalore, Koramangala', price: '₹45,000/month', area: '500 sq.ft', rating: 4.6, reviews: 156, img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80', listingType: 'Rent', city: 'Bangalore', discount: 0 },
  { id: 108, name: 'Showroom Space', category: 'Retail Shops', location: 'Hyderabad, Banjara Hills', price: '₹1.8 Cr', area: '1000 sq.ft', rating: 4.9, reviews: 267, img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80', listingType: 'Sale', city: 'Hyderabad', discount: 22 },
  
  // Warehouses
  { id: 109, name: 'Industrial Warehouse', category: 'Warehouses', location: 'Pune, Chakan', price: '₹4.5 Cr', area: '10000 sq.ft', rating: 4.8, reviews: 201, img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80', listingType: 'Sale', city: 'Pune', discount: 25 },
  { id: 110, name: 'Logistics Warehouse', category: 'Warehouses', location: 'Mumbai, Bhiwandi', price: '₹1,20,000/month', area: '8000 sq.ft', rating: 4.7, reviews: 178, img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80', listingType: 'Rent', city: 'Mumbai', discount: 0 },
  { id: 111, name: 'Storage Facility', category: 'Warehouses', location: 'Delhi, Mundka', price: '₹3.2 Cr', area: '7500 sq.ft', rating: 4.6, reviews: 145, img: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=400&q=80', listingType: 'Sale', city: 'Delhi', discount: 30 },
  
  // Co-working Spaces
  { id: 112, name: 'Premium Co-working', category: 'Co-working Spaces', location: 'Bangalore, Indiranagar', price: '₹1.5 Cr', area: '2500 sq.ft', rating: 4.9, reviews: 312, img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80', listingType: 'Sale', city: 'Bangalore', discount: 20 },
  { id: 113, name: 'Flexible Workspace', category: 'Co-working Spaces', location: 'Gurgaon, Golf Course Road', price: '₹65,000/month', area: '2000 sq.ft', rating: 4.8, reviews: 234, img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80', listingType: 'Rent', city: 'Gurgaon', discount: 0 },
  { id: 114, name: 'Shared Office Space', category: 'Co-working Spaces', location: 'Mumbai, Lower Parel', price: '₹1.8 Cr', area: '2200 sq.ft', rating: 4.7, reviews: 189, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', listingType: 'Sale', city: 'Mumbai', discount: 28 },
  
  // More properties
  { id: 115, name: 'IT Office Space', category: 'Office Spaces', location: 'Hyderabad, HITEC City', price: '₹2.8 Cr', area: '1600 sq.ft', rating: 4.9, reviews: 298, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80', listingType: 'Sale', city: 'Hyderabad', discount: 25 },
  { id: 116, name: 'Boutique Shop', category: 'Retail Shops', location: 'Chennai, T Nagar', price: '₹95 Lac', area: '450 sq.ft', rating: 4.6, reviews: 167, img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80', listingType: 'Sale', city: 'Chennai', discount: 30 },
  { id: 117, name: 'Distribution Center', category: 'Warehouses', location: 'Bangalore, Whitefield', price: '₹5.2 Cr', area: '12000 sq.ft', rating: 4.8, reviews: 223, img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80', listingType: 'Sale', city: 'Bangalore', discount: 20 },
  { id: 118, name: 'Startup Hub', category: 'Co-working Spaces', location: 'Pune, Koregaon Park', price: '₹55,000/month', area: '1800 sq.ft', rating: 4.7, reviews: 178, img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80', listingType: 'Rent', city: 'Pune', discount: 0 },
];

export default function CommercialProperties() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: 'All',
    city: 'All',
    listingType: 'All',
    priceRange: 'All',
    discount: 'All',
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Office Spaces', 'Retail Shops', 'Warehouses', 'Co-working Spaces'];
  const cities = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Gurgaon'];
  const listingTypes = ['All', 'Sale', 'Rent'];
  const priceRanges = ['All', 'Under ₹1Cr', '₹1Cr - ₹2Cr', '₹2Cr - ₹5Cr', 'Above ₹5Cr', 'Under ₹50k/month', '₹50k - ₹1L/month', 'Above ₹1L/month'];
  const discountOptions = ['All', '15%+', '20%+', '25%+', '30%'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      city: 'All',
      listingType: 'All',
      priceRange: 'All',
      discount: 'All',
    });
  };

  const filteredProperties = COMMERCIAL_PROPERTIES.filter(property => {
    if (filters.category !== 'All' && property.category !== filters.category) return false;
    if (filters.city !== 'All' && property.city !== filters.city) return false;
    if (filters.listingType !== 'All' && property.listingType !== filters.listingType) return false;
    
    // Price range filter
    if (filters.priceRange !== 'All') {
      const price = property.price;
      if (property.listingType === 'Sale') {
        const crValue = parseFloat(price.replace(/[₹,Cr Lac]/g, ''));
        const isCr = price.includes('Cr');
        const actualCr = isCr ? crValue : crValue / 100;
        
        if (filters.priceRange === 'Under ₹1Cr' && actualCr >= 1) return false;
        if (filters.priceRange === '₹1Cr - ₹2Cr' && (actualCr < 1 || actualCr >= 2)) return false;
        if (filters.priceRange === '₹2Cr - ₹5Cr' && (actualCr < 2 || actualCr >= 5)) return false;
        if (filters.priceRange === 'Above ₹5Cr' && actualCr < 5) return false;
      } else {
        const monthlyRent = parseInt(price.replace(/[₹,/month]/g, ''));
        if (filters.priceRange === 'Under ₹50k/month' && monthlyRent >= 50000) return false;
        if (filters.priceRange === '₹50k - ₹1L/month' && (monthlyRent < 50000 || monthlyRent >= 100000)) return false;
        if (filters.priceRange === 'Above ₹1L/month' && monthlyRent < 100000) return false;
      }
    }

    // Discount filter
    if (filters.discount !== 'All') {
      const minDiscount = parseInt(filters.discount.replace(/[%+]/g, ''));
      if (property.discount < minDiscount) return false;
    }

    return true;
  });

  return (
    <div className="residential-properties-page">
      <div className="page-header">
        <h1>Commercial Properties</h1>
        <p>Starting ₹50L | Premium Locations | High ROI</p>
      </div>

      <div className="properties-container">
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h3><Filter size={20} /> Filters</h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>City</label>
            <select value={filters.city} onChange={(e) => handleFilterChange('city', e.target.value)}>
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Listing Type</label>
            <select value={filters.listingType} onChange={(e) => handleFilterChange('listingType', e.target.value)}>
              {listingTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select value={filters.priceRange} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
              {priceRanges.map(range => <option key={range} value={range}>{range}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Minimum Discount</label>
            <select value={filters.discount} onChange={(e) => handleFilterChange('discount', e.target.value)}>
              {discountOptions.map(disc => <option key={disc} value={disc}>{disc}</option>)}
            </select>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>Clear All Filters</button>
        </aside>

        {/* Properties Grid */}
        <main className="properties-main">
          <div className="properties-controls">
            <button className="toggle-filters-btn" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={18} /> Filters
            </button>
            <p className="results-count">{filteredProperties.length} properties found</p>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <p>No properties found matching your filters.</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map(property => (
                <div key={property.id} className="property-card">
                  <div className="property-card__image" style={{ backgroundImage: `url(${property.img})` }}>
                    <div className={`property-badge ${property.listingType === 'Rent' ? 'badge-rent' : 'badge-sale'}`}>
                      {property.listingType === 'Sale' ? 'For Sale' : 'For Rent'}
                    </div>
                    {property.discount > 0 && (
                      <div className="discount-badge">{property.discount}% OFF</div>
                    )}
                  </div>
                  <div className="property-card__content">
                    <h3>{property.name}</h3>
                    <p className="property-category">{property.category}</p>
                    <p className="property-location">
                      <MapPin size={14} /> {property.location}
                    </p>
                    <div className="property-specs">
                      <span><Building2 size={14} /> Commercial</span>
                      <span><Square size={14} /> {property.area}</span>
                    </div>
                    <div className="property-rating">
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      <strong>{property.rating}</strong>
                      <span>({property.reviews})</span>
                    </div>
                    <div className="property-price">{property.price}</div>
                    <div className="property-actions">
                      <button 
                        className="btn-call"
                        onClick={() => navigate('/call-plans', { 
                          state: { 
                            propertyName: property.name,
                            propertyOwner: 'Property Owner'
                          }
                        })}
                      >
                        <Phone size={14} /> Call
                      </button>
                      <Link to={`/property/${property.id}`} className="btn-details">
                        <MessageCircle size={14} /> Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
