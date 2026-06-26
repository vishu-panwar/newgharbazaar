import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Phone, MessageCircle, Square, Filter, X, CheckCircle } from 'lucide-react';
import './ResidentialProperties.css';

const PLOTS_PROPERTIES = [
  // Residential Plots
  { id: 201, name: 'RERA Approved Residential Plot', category: 'Residential Plots', location: 'Pune, Hinjewadi', price: '₹85 Lac', area: '250 sq.yd', rating: 4.9, reviews: 312, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', listingType: 'Sale', city: 'Pune', verified: true, discount: 25 },
  { id: 202, name: 'Premium Residential Plot', category: 'Residential Plots', location: 'Bangalore, Whitefield', price: '₹1.2 Cr', area: '300 sq.yd', rating: 4.8, reviews: 245, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', listingType: 'Sale', city: 'Bangalore', verified: true, discount: 20 },
  { id: 203, name: 'Gated Community Plot', category: 'Residential Plots', location: 'Hyderabad, Gachibowli', price: '₹95 Lac', area: '280 sq.yd', rating: 4.7, reviews: 189, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', listingType: 'Sale', city: 'Hyderabad', verified: true, discount: 30 },
  { id: 204, name: 'Corner Plot - Prime Location', category: 'Residential Plots', location: 'Jaipur, Vaishali Nagar', price: '₹65 Lac', area: '200 sq.yd', rating: 4.6, reviews: 167, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', listingType: 'Sale', city: 'Jaipur', verified: true, discount: 28 },
  { id: 205, name: 'Villa Plot - Approved Layout', category: 'Residential Plots', location: 'Chennai, OMR', price: '₹1.5 Cr', area: '350 sq.yd', rating: 4.9, reviews: 298, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', listingType: 'Sale', city: 'Chennai', verified: true, discount: 22 },
  
  // Agricultural Land
  { id: 206, name: 'Fertile Agricultural Land', category: 'Agricultural Land', location: 'Nashik, Maharashtra', price: '₹45 Lac', area: '2 Acres', rating: 4.8, reviews: 234, img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80', listingType: 'Sale', city: 'Nashik', verified: true, discount: 30 },
  { id: 207, name: 'Organic Farm Land', category: 'Agricultural Land', location: 'Pune, Saswad', price: '₹35 Lac', area: '1.5 Acres', rating: 4.7, reviews: 198, img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80', listingType: 'Sale', city: 'Pune', verified: true, discount: 25 },
  { id: 208, name: 'Mango Orchard Land', category: 'Agricultural Land', location: 'Ratnagiri, Maharashtra', price: '₹55 Lac', area: '3 Acres', rating: 4.9, reviews: 267, img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80', listingType: 'Sale', city: 'Ratnagiri', verified: true, discount: 20 },
  { id: 209, name: 'Vineyard Land', category: 'Agricultural Land', location: 'Nashik, Dindori', price: '₹65 Lac', area: '2.5 Acres', rating: 4.8, reviews: 223, img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80', listingType: 'Sale', city: 'Nashik', verified: true, discount: 28 },
  
  // Industrial Plots
  { id: 210, name: 'Industrial Plot - NH Facing', category: 'Industrial Plots', location: 'Pune, Chakan', price: '₹2.5 Cr', area: '1000 sq.yd', rating: 4.9, reviews: 312, img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80', listingType: 'Sale', city: 'Pune', verified: true, discount: 25 },
  { id: 211, name: 'Warehouse Plot', category: 'Industrial Plots', location: 'Mumbai, Bhiwandi', price: '₹3.2 Cr', area: '1200 sq.yd', rating: 4.8, reviews: 278, img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80', listingType: 'Sale', city: 'Mumbai', verified: true, discount: 20 },
  { id: 212, name: 'Manufacturing Unit Plot', category: 'Industrial Plots', location: 'Bangalore, Bommasandra', price: '₹1.8 Cr', area: '800 sq.yd', rating: 4.7, reviews: 201, img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80', listingType: 'Sale', city: 'Bangalore', verified: true, discount: 30 },
  { id: 213, name: 'Logistics Hub Plot', category: 'Industrial Plots', location: 'Delhi, Mundka', price: '₹2.8 Cr', area: '1100 sq.yd', rating: 4.9, reviews: 245, img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80', listingType: 'Sale', city: 'Delhi', verified: true, discount: 22 },
  
  // Farm Houses
  { id: 214, name: 'Luxury Farmhouse Plot', category: 'Farm Houses', location: 'Lonavala, Maharashtra', price: '₹1.5 Cr', area: '5000 sq.yd', rating: 5.0, reviews: 456, img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80', listingType: 'Sale', city: 'Lonavala', verified: true, discount: 20 },
  { id: 215, name: 'Hill View Farmhouse Land', category: 'Farm Houses', location: 'Karjat, Maharashtra', price: '₹95 Lac', area: '3500 sq.yd', rating: 4.8, reviews: 312, img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80', listingType: 'Sale', city: 'Karjat', verified: true, discount: 28 },
  { id: 216, name: 'Lake Side Farm Plot', category: 'Farm Houses', location: 'Alibaug, Maharashtra', price: '₹2.2 Cr', area: '6000 sq.yd', rating: 4.9, reviews: 389, img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80', listingType: 'Sale', city: 'Alibaug', verified: true, discount: 25 },
  { id: 217, name: 'Weekend Farmhouse Plot', category: 'Farm Houses', location: 'Igatpuri, Maharashtra', price: '₹75 Lac', area: '2500 sq.yd', rating: 4.7, reviews: 234, img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80', listingType: 'Sale', city: 'Igatpuri', verified: true, discount: 30 },
  { id: 218, name: 'Mountain View Farm Land', category: 'Farm Houses', location: 'Khandala, Maharashtra', price: '₹1.8 Cr', area: '4500 sq.yd', rating: 4.8, reviews: 267, img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80', listingType: 'Sale', city: 'Khandala', verified: true, discount: 22 },
];

export default function PlotsLand() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: 'All',
    city: 'All',
    priceRange: 'All',
    areaRange: 'All',
    discount: 'All',
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Residential Plots', 'Agricultural Land', 'Industrial Plots', 'Farm Houses'];
  const cities = ['All', 'Pune', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi', 'Jaipur', 'Nashik', 'Lonavala', 'Karjat', 'Alibaug', 'Igatpuri', 'Khandala', 'Ratnagiri'];
  const priceRanges = ['All', 'Under ₹50L', '₹50L - ₹1Cr', '₹1Cr - ₹2Cr', '₹2Cr - ₹5Cr', 'Above ₹5Cr'];
  const areaRanges = ['All', 'Under 200 sq.yd', '200-500 sq.yd', '500-1000 sq.yd', 'Above 1000 sq.yd', '1-2 Acres', '2-5 Acres', 'Above 5 Acres'];
  const discountOptions = ['All', '15%+', '20%+', '25%+', '30%'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      city: 'All',
      priceRange: 'All',
      areaRange: 'All',
      discount: 'All',
    });
  };

  const filteredProperties = PLOTS_PROPERTIES.filter(property => {
    if (filters.category !== 'All' && property.category !== filters.category) return false;
    if (filters.city !== 'All' && property.city !== filters.city) return false;
    
    // Price range filter
    if (filters.priceRange !== 'All') {
      const price = property.price;
      const crValue = parseFloat(price.replace(/[₹,Cr Lac]/g, ''));
      const isCr = price.includes('Cr');
      const actualCr = isCr ? crValue : crValue / 100;
      
      if (filters.priceRange === 'Under ₹50L' && actualCr >= 0.5) return false;
      if (filters.priceRange === '₹50L - ₹1Cr' && (actualCr < 0.5 || actualCr >= 1)) return false;
      if (filters.priceRange === '₹1Cr - ₹2Cr' && (actualCr < 1 || actualCr >= 2)) return false;
      if (filters.priceRange === '₹2Cr - ₹5Cr' && (actualCr < 2 || actualCr >= 5)) return false;
      if (filters.priceRange === 'Above ₹5Cr' && actualCr < 5) return false;
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
        <h1>Plots & Land</h1>
        <p>Best Investment | Verified Titles | RERA Approved</p>
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
            <label>Price Range</label>
            <select value={filters.priceRange} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
              {priceRanges.map(range => <option key={range} value={range}>{range}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Area Range</label>
            <select value={filters.areaRange} onChange={(e) => handleFilterChange('areaRange', e.target.value)}>
              {areaRanges.map(range => <option key={range} value={range}>{range}</option>)}
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
            <p className="results-count">{filteredProperties.length} plots found</p>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <p>No plots found matching your filters.</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map(property => (
                <div key={property.id} className="property-card">
                  <div className="property-card__image" style={{ backgroundImage: `url(${property.img})` }}>
                    <div className="property-badge badge-sale">
                      {property.verified && <CheckCircle size={14} />} Verified
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
                      <span><Square size={14} /> {property.area}</span>
                      <span style={{ color: '#0F9D58', fontWeight: 600 }}>
                        <CheckCircle size={14} /> Clear Title
                      </span>
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
