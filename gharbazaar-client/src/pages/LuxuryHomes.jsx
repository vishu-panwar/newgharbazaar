import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Phone, MessageCircle, Bed, Bath, Square, Filter, X, Crown } from 'lucide-react';
import './LuxuryHomes.css';

const LUXURY_PROPERTIES = [
  // Penthouses
  { id: 301, name: 'Sky High Penthouse', category: 'Penthouses', location: 'Mumbai, Worli', price: '₹12.5 Cr', area: '4500 sq.ft', bedrooms: 5, bathrooms: 5, rating: 5.0, reviews: 523, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80', listingType: 'Sale', city: 'Mumbai', amenities: 'Private Pool, Terrace Garden, Home Theater', discount: 15 },
  { id: 302, name: 'Luxury Duplex Penthouse', category: 'Penthouses', location: 'Bangalore, Whitefield', price: '₹8.5 Cr', area: '3800 sq.ft', bedrooms: 4, bathrooms: 4, rating: 4.9, reviews: 412, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', listingType: 'Sale', city: 'Bangalore', amenities: 'Jacuzzi, Private Lift, Smart Home', discount: 20 },
  { id: 303, name: 'Premium Penthouse Suite', category: 'Penthouses', location: 'Delhi NCR, Gurgaon', price: '₹15.2 Cr', area: '5200 sq.ft', bedrooms: 6, bathrooms: 6, rating: 5.0, reviews: 678, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', listingType: 'Sale', city: 'Gurgaon', amenities: 'Infinity Pool, Wine Cellar, Gym', discount: 12 },
  { id: 304, name: 'Sea View Penthouse', category: 'Penthouses', location: 'Mumbai, Bandra', price: '₹18.5 Cr', area: '6000 sq.ft', bedrooms: 6, bathrooms: 7, rating: 5.0, reviews: 789, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', listingType: 'Sale', city: 'Mumbai', amenities: 'Sea View, Private Pool, Butler Service', discount: 10 },
  
  // Villas
  { id: 305, name: 'Modern Luxury Villa', category: 'Villas', location: 'Pune, Baner', price: '₹6.5 Cr', area: '4200 sq.ft', bedrooms: 5, bathrooms: 5, rating: 4.9, reviews: 456, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80', listingType: 'Sale', city: 'Pune', amenities: 'Private Pool, Garden, Home Automation', discount: 18 },
  { id: 306, name: 'Mediterranean Villa', category: 'Villas', location: 'Goa, Candolim', price: '₹9.8 Cr', area: '5500 sq.ft', bedrooms: 6, bathrooms: 6, rating: 5.0, reviews: 612, img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80', listingType: 'Sale', city: 'Goa', amenities: 'Beach Access, Pool, Entertainment Area', discount: 15 },
  { id: 307, name: 'Contemporary Villa', category: 'Villas', location: 'Hyderabad, Jubilee Hills', price: '₹7.2 Cr', area: '4800 sq.ft', bedrooms: 5, bathrooms: 5, rating: 4.8, reviews: 389, img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', listingType: 'Sale', city: 'Hyderabad', amenities: 'Pool, Gym, Home Theater', discount: 20 },
  { id: 308, name: 'Smart Villa with Pool', category: 'Villas', location: 'Bangalore, Sarjapur', price: '₹5.8 Cr', area: '3900 sq.ft', bedrooms: 4, bathrooms: 4, rating: 4.9, reviews: 345, img: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=400&q=80', listingType: 'Sale', city: 'Bangalore', amenities: 'Smart Home, Pool, Solar Panels', discount: 22 },
  
  // Bungalows
  { id: 309, name: 'Heritage Bungalow', category: 'Bungalows', location: 'Mumbai, Malabar Hill', price: '₹25 Cr', area: '8000 sq.ft', bedrooms: 7, bathrooms: 8, rating: 5.0, reviews: 892, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', listingType: 'Sale', city: 'Mumbai', amenities: 'Heritage Property, Garden, Staff Quarters', discount: 8 },
  { id: 310, name: 'Colonial Bungalow', category: 'Bungalows', location: 'Kolkata, Alipore', price: '₹12 Cr', area: '6500 sq.ft', bedrooms: 6, bathrooms: 6, rating: 4.9, reviews: 567, img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80', listingType: 'Sale', city: 'Kolkata', amenities: 'Vintage Architecture, Garden, Library', discount: 15 },
  { id: 311, name: 'Modern Bungalow', category: 'Bungalows', location: 'Pune, Koregaon Park', price: '₹8.5 Cr', area: '5200 sq.ft', bedrooms: 5, bathrooms: 5, rating: 4.8, reviews: 423, img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', listingType: 'Sale', city: 'Pune', amenities: 'Pool, Garden, Parking for 4 Cars', discount: 18 },
  
  // Sea Facing Flats
  { id: 312, name: 'Luxury Sea View Apartment', category: 'Sea Facing Flats', location: 'Mumbai, Marine Drive', price: '₹22 Cr', area: '5500 sq.ft', bedrooms: 5, bathrooms: 5, rating: 5.0, reviews: 734, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', listingType: 'Sale', city: 'Mumbai', amenities: 'Panoramic Sea View, Balcony, Premium Finishes', discount: 10 },
  { id: 313, name: 'Beachfront Apartment', category: 'Sea Facing Flats', location: 'Goa, Panjim', price: '₹6.5 Cr', area: '3200 sq.ft', bedrooms: 4, bathrooms: 4, rating: 4.9, reviews: 456, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80', listingType: 'Sale', city: 'Goa', amenities: 'Beach Access, Pool, Concierge', discount: 20 },
  { id: 314, name: 'Ocean View Penthouse Flat', category: 'Sea Facing Flats', location: 'Mumbai, Juhu', price: '₹16.5 Cr', area: '4800 sq.ft', bedrooms: 5, bathrooms: 5, rating: 5.0, reviews: 623, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', listingType: 'Sale', city: 'Mumbai', amenities: 'Sea View, Private Terrace, Luxury Interiors', discount: 12 },
  { id: 315, name: 'Coastal Luxury Flat', category: 'Sea Facing Flats', location: 'Chennai, ECR', price: '₹5.2 Cr', area: '2800 sq.ft', bedrooms: 4, bathrooms: 4, rating: 4.8, reviews: 389, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80', listingType: 'Sale', city: 'Chennai', amenities: 'Sea Facing, Balcony, Club House', discount: 22 },
  
  // More luxury properties
  { id: 316, name: 'Ultra Luxury Penthouse', category: 'Penthouses', location: 'Bangalore, Indiranagar', price: '₹10.5 Cr', area: '4200 sq.ft', bedrooms: 5, bathrooms: 5, rating: 4.9, reviews: 512, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80', listingType: 'Sale', city: 'Bangalore', amenities: 'Rooftop Pool, Bar, Smart Home', discount: 15 },
  { id: 317, name: 'Designer Villa', category: 'Villas', location: 'Delhi, Vasant Vihar', price: '₹18 Cr', area: '6800 sq.ft', bedrooms: 6, bathrooms: 7, rating: 5.0, reviews: 678, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80', listingType: 'Sale', city: 'Delhi', amenities: 'Designer Interiors, Pool, Home Theater', discount: 10 },
  { id: 318, name: 'Luxury Garden Bungalow', category: 'Bungalows', location: 'Jaipur, Civil Lines', price: '₹9.5 Cr', area: '5800 sq.ft', bedrooms: 6, bathrooms: 6, rating: 4.9, reviews: 445, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', listingType: 'Sale', city: 'Jaipur', amenities: 'Large Garden, Pool, Traditional Architecture', discount: 18 },
];

export default function LuxuryHomes() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: 'All',
    city: 'All',
    priceRange: 'All',
    bedrooms: 'All',
    discount: 'All',
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Penthouses', 'Villas', 'Bungalows', 'Sea Facing Flats'];
  const cities = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Goa', 'Gurgaon', 'Kolkata', 'Jaipur'];
  const priceRanges = ['All', '₹5Cr - ₹10Cr', '₹10Cr - ₹15Cr', '₹15Cr - ₹20Cr', 'Above ₹20Cr'];
  const bedroomOptions = ['All', '4', '5', '6', '7+'];
  const discountOptions = ['All', '10%+', '15%+', '20%+'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      city: 'All',
      priceRange: 'All',
      bedrooms: 'All',
      discount: 'All',
    });
  };

  const filteredProperties = LUXURY_PROPERTIES.filter(property => {
    if (filters.category !== 'All' && property.category !== filters.category) return false;
    if (filters.city !== 'All' && property.city !== filters.city) return false;
    if (filters.bedrooms !== 'All') {
      if (filters.bedrooms === '7+' && property.bedrooms < 7) return false;
      if (filters.bedrooms !== '7+' && property.bedrooms.toString() !== filters.bedrooms) return false;
    }
    
    // Price range filter
    if (filters.priceRange !== 'All') {
      const crValue = parseFloat(property.price.replace(/[₹,Cr]/g, ''));
      
      if (filters.priceRange === '₹5Cr - ₹10Cr' && (crValue < 5 || crValue >= 10)) return false;
      if (filters.priceRange === '₹10Cr - ₹15Cr' && (crValue < 10 || crValue >= 15)) return false;
      if (filters.priceRange === '₹15Cr - ₹20Cr' && (crValue < 15 || crValue >= 20)) return false;
      if (filters.priceRange === 'Above ₹20Cr' && crValue < 20) return false;
    }

    // Discount filter
    if (filters.discount !== 'All') {
      const minDiscount = parseInt(filters.discount.replace(/[%+]/g, ''));
      if (property.discount < minDiscount) return false;
    }

    return true;
  });

  return (
    <div className="luxury-homes-page">
      <div className="page-header luxury-header">
        <Crown size={48} color="#FFD700" />
        <h1>Luxury Homes</h1>
        <p>Premium Living | Exclusive Listings | Ultra Luxury Properties</p>
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
            <label>Bedrooms</label>
            <select value={filters.bedrooms} onChange={(e) => handleFilterChange('bedrooms', e.target.value)}>
              {bedroomOptions.map(bed => <option key={bed} value={bed}>{bed}</option>)}
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
            <p className="results-count">{filteredProperties.length} luxury properties found</p>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <p>No luxury properties found matching your filters.</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map(property => (
                <div key={property.id} className="property-card luxury-card">
                  <div className="property-card__image" style={{ backgroundImage: `url(${property.img})` }}>
                    <div className="property-badge luxury-badge">
                      <Crown size={14} /> Premium
                    </div>
                    {property.discount > 0 && (
                      <div className="discount-badge">{property.discount}% OFF</div>
                    )}
                  </div>
                  <div className="property-card__content">
                    <h3>{property.name}</h3>
                    <p className="property-category luxury-category">{property.category}</p>
                    <p className="property-location">
                      <MapPin size={14} /> {property.location}
                    </p>
                    <div className="property-specs">
                      <span><Bed size={14} /> {property.bedrooms} BHK</span>
                      <span><Bath size={14} /> {property.bathrooms}</span>
                      <span><Square size={14} /> {property.area}</span>
                    </div>
                    <div className="luxury-amenities">
                      {property.amenities}
                    </div>
                    <div className="property-rating">
                      <Star size={14} fill="#FFD700" color="#FFD700" />
                      <strong>{property.rating}</strong>
                      <span>({property.reviews})</span>
                    </div>
                    <div className="property-price luxury-price">{property.price}</div>
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
