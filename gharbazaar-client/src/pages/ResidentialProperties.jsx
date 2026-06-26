import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Phone, MessageCircle, Bed, Bath, Square, Filter, X } from 'lucide-react';
import './ResidentialProperties.css';

const RESIDENTIAL_PROPERTIES = [
  // Flats & Apartments
  { id: 1, name: 'Luxury 3BHK Apartment', category: 'Flats & Apartments', location: 'Mumbai, Andheri West', price: '₹2.5 Cr', area: '1850 sq.ft', bedrooms: 3, bathrooms: 2, rating: 4.9, reviews: 312, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80', listingType: 'Sale', city: 'Mumbai', discount: 30 },
  { id: 2, name: 'Modern 2BHK Flat', category: 'Flats & Apartments', location: 'Pune, Baner', price: '₹1.8 Cr', area: '1200 sq.ft', bedrooms: 2, bathrooms: 2, rating: 4.7, reviews: 245, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80', listingType: 'Sale', city: 'Pune', discount: 25 },
  { id: 3, name: 'Sea View Apartment', category: 'Flats & Apartments', location: 'Mumbai, Worli', price: '₹4.2 Cr', area: '2100 sq.ft', bedrooms: 4, bathrooms: 3, rating: 5.0, reviews: 456, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', listingType: 'Sale', city: 'Mumbai', discount: 20 },
  { id: 4, name: 'Spacious 3BHK Flat', category: 'Flats & Apartments', location: 'Bangalore, Whitefield', price: '₹35,000/month', area: '1650 sq.ft', bedrooms: 3, bathrooms: 2, rating: 4.8, reviews: 189, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', listingType: 'Rent', city: 'Bangalore', discount: 0 },
  
  // Independent Houses
  { id: 5, name: 'Modern Independent House', category: 'Independent Houses', location: 'Delhi, Dwarka', price: '₹3.5 Cr', area: '2400 sq.ft', bedrooms: 4, bathrooms: 3, rating: 4.9, reviews: 278, img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80', listingType: 'Sale', city: 'Delhi', discount: 30 },
  { id: 6, name: 'Spacious Villa House', category: 'Independent Houses', location: 'Hyderabad, Gachibowli', price: '₹2.8 Cr', area: '2200 sq.ft', bedrooms: 3, bathrooms: 3, rating: 4.7, reviews: 201, img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80', listingType: 'Sale', city: 'Hyderabad', discount: 25 },
  { id: 7, name: 'Garden House', category: 'Independent Houses', location: 'Jaipur, Vaishali Nagar', price: '₹45,000/month', area: '2000 sq.ft', bedrooms: 3, bathrooms: 2, rating: 4.6, reviews: 167, img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80', listingType: 'Rent', city: 'Jaipur', discount: 0 },
  
  // Builder Floors
  { id: 8, name: 'Premium Builder Floor', category: 'Builder Floors', location: 'Delhi, Rohini', price: '₹1.8 Cr', area: '1600 sq.ft', bedrooms: 3, bathrooms: 2, rating: 4.8, reviews: 223, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', listingType: 'Sale', city: 'Delhi', discount: 28 },
  { id: 9, name: 'Modern Builder Floor', category: 'Builder Floors', location: 'Gurgaon, Sector 56', price: '₹2.2 Cr', area: '1800 sq.ft', bedrooms: 3, bathrooms: 3, rating: 4.9, reviews: 312, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80', listingType: 'Sale', city: 'Gurgaon', discount: 22 },
  { id: 10, name: 'Luxury Builder Floor', category: 'Builder Floors', location: 'Noida, Sector 62', price: '₹30,000/month', area: '1500 sq.ft', bedrooms: 2, bathrooms: 2, rating: 4.7, reviews: 178, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', listingType: 'Rent', city: 'Noida', discount: 0 },
  
  // Studio Apartments
  { id: 11, name: 'Compact Studio', category: 'Studio Apartments', location: 'Bangalore, Koramangala', price: '₹65 Lac', area: '550 sq.ft', bedrooms: 1, bathrooms: 1, rating: 4.6, reviews: 134, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80', listingType: 'Sale', city: 'Bangalore', discount: 30 },
  { id: 12, name: 'Modern Studio Flat', category: 'Studio Apartments', location: 'Mumbai, Andheri', price: '₹18,000/month', area: '600 sq.ft', bedrooms: 1, bathrooms: 1, rating: 4.5, reviews: 98, img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80', listingType: 'Rent', city: 'Mumbai', discount: 0 },
  { id: 13, name: 'Premium Studio', category: 'Studio Apartments', location: 'Pune, Hinjewadi', price: '₹55 Lac', area: '500 sq.ft', bedrooms: 1, bathrooms: 1, rating: 4.7, reviews: 156, img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', listingType: 'Sale', city: 'Pune', discount: 25 },
  
  // More properties
  { id: 14, name: 'Duplex Apartment', category: 'Flats & Apartments', location: 'Chennai, OMR', price: '₹2.1 Cr', area: '1900 sq.ft', bedrooms: 3, bathrooms: 3, rating: 4.8, reviews: 267, img: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=400&q=80', listingType: 'Sale', city: 'Chennai', discount: 28 },
  { id: 15, name: 'Luxury Villa House', category: 'Independent Houses', location: 'Kolkata, Salt Lake', price: '₹3.2 Cr', area: '2600 sq.ft', bedrooms: 4, bathrooms: 4, rating: 4.9, reviews: 345, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80', listingType: 'Sale', city: 'Kolkata', discount: 20 },
  { id: 16, name: 'Elegant Builder Floor', category: 'Builder Floors', location: 'Chandigarh, Sector 17', price: '₹1.9 Cr', area: '1700 sq.ft', bedrooms: 3, bathrooms: 2, rating: 4.7, reviews: 198, img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80', listingType: 'Sale', city: 'Chandigarh', discount: 30 },
  { id: 17, name: 'Cozy Studio', category: 'Studio Apartments', location: 'Delhi, Laxmi Nagar', price: '₹15,000/month', area: '480 sq.ft', bedrooms: 1, bathrooms: 1, rating: 4.4, reviews: 87, img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80', listingType: 'Rent', city: 'Delhi', discount: 0 },
  { id: 18, name: 'Penthouse Apartment', category: 'Flats & Apartments', location: 'Mumbai, Bandra', price: '₹6.5 Cr', area: '3200 sq.ft', bedrooms: 5, bathrooms: 4, rating: 5.0, reviews: 523, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80', listingType: 'Sale', city: 'Mumbai', discount: 15 },
];

export default function ResidentialProperties() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: 'All',
    city: 'All',
    listingType: 'All',
    priceRange: 'All',
    bedrooms: 'All',
    discount: 'All',
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Flats & Apartments', 'Independent Houses', 'Builder Floors', 'Studio Apartments'];
  const cities = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur', 'Gurgaon', 'Noida', 'Chandigarh'];
  const listingTypes = ['All', 'Sale', 'Rent'];
  const priceRanges = ['All', 'Under ₹50L', '₹50L - ₹1Cr', '₹1Cr - ₹2Cr', '₹2Cr - ₹5Cr', 'Above ₹5Cr', 'Under ₹20k/month', '₹20k - ₹40k/month', 'Above ₹40k/month'];
  const bedroomOptions = ['All', '1', '2', '3', '4', '5+'];
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
      bedrooms: 'All',
      discount: 'All',
    });
  };

  const filteredProperties = RESIDENTIAL_PROPERTIES.filter(property => {
    if (filters.category !== 'All' && property.category !== filters.category) return false;
    if (filters.city !== 'All' && property.city !== filters.city) return false;
    if (filters.listingType !== 'All' && property.listingType !== filters.listingType) return false;
    if (filters.bedrooms !== 'All' && property.bedrooms.toString() !== filters.bedrooms) return false;
    
    // Price range filter
    if (filters.priceRange !== 'All') {
      const price = property.price;
      if (property.listingType === 'Sale') {
        const crValue = parseFloat(price.replace(/[₹,Cr Lac]/g, ''));
        const isCr = price.includes('Cr');
        const actualCr = isCr ? crValue : crValue / 100;
        
        if (filters.priceRange === 'Under ₹50L' && actualCr >= 0.5) return false;
        if (filters.priceRange === '₹50L - ₹1Cr' && (actualCr < 0.5 || actualCr >= 1)) return false;
        if (filters.priceRange === '₹1Cr - ₹2Cr' && (actualCr < 1 || actualCr >= 2)) return false;
        if (filters.priceRange === '₹2Cr - ₹5Cr' && (actualCr < 2 || actualCr >= 5)) return false;
        if (filters.priceRange === 'Above ₹5Cr' && actualCr < 5) return false;
      } else {
        const monthlyRent = parseInt(price.replace(/[₹,/month]/g, ''));
        if (filters.priceRange === 'Under ₹20k/month' && monthlyRent >= 20000) return false;
        if (filters.priceRange === '₹20k - ₹40k/month' && (monthlyRent < 20000 || monthlyRent >= 40000)) return false;
        if (filters.priceRange === 'Above ₹40k/month' && monthlyRent < 40000) return false;
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
        <h1>Residential Properties</h1>
        <p>Up to 30% off | Top Brokers | Verified Listings</p>
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
                      <span><Bed size={14} /> {property.bedrooms} BHK</span>
                      <span><Bath size={14} /> {property.bathrooms}</span>
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
