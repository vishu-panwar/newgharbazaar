import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, MessageCircle, Search, SlidersHorizontal, X } from 'lucide-react';
import './AllProperties.css';

function AllProperties() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedListingType, setSelectedListingType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [bedroomFilter, setBedroomFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // All properties data
  const allProperties = [
    { id: 1, name: 'Sea View Apartment', location: 'Mumbai, Andheri West', city: 'Mumbai', price: 42000000, area: '1850 sq.ft', bedrooms: 3, rating: 4.9, reviews: 312, badge: 'For Sale', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&q=80', type: 'Apartment', listingType: 'Sale' },
    { id: 2, name: 'Modern Villa', location: 'Pune, Baner', city: 'Pune', price: 35000, area: '2400 sq.ft', bedrooms: 4, rating: 4.8, reviews: 201, badge: 'For Rent', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&q=80', type: 'Villa', listingType: 'Rent' },
    { id: 3, name: 'Commercial Office Space', location: 'Bangalore, Whitefield', city: 'Bangalore', price: 18000000, area: '1200 sq.ft', bedrooms: 0, rating: 4.9, reviews: 445, badge: 'For Sale', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80', type: 'Commercial', listingType: 'Sale' },
    { id: 4, name: 'Luxury Penthouse', location: 'Delhi NCR, Gurgaon', city: 'Delhi', price: 75000, area: '3200 sq.ft', bedrooms: 5, rating: 5.0, reviews: 523, badge: 'For Rent', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80', type: 'Penthouse', listingType: 'Rent' },
    { id: 5, name: 'Residential Plot', location: 'Hyderabad, Gachibowli', city: 'Hyderabad', price: 8500000, area: '250 sq.yd', bedrooms: 0, rating: 4.7, reviews: 178, badge: 'For Sale', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&q=80', type: 'Plot', listingType: 'Sale' },
    { id: 6, name: 'Studio Apartment', location: 'Chennai, OMR', city: 'Chennai', price: 18000, area: '650 sq.ft', bedrooms: 1, rating: 4.6, reviews: 134, badge: 'For Rent', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=80', type: 'Studio', listingType: 'Rent' },
    { id: 7, name: 'Independent House', location: 'Jaipur, Vaishali Nagar', city: 'Jaipur', price: 25000000, area: '2000 sq.ft', bedrooms: 3, rating: 4.8, reviews: 267, badge: 'For Sale', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=80', type: 'House', listingType: 'Sale' },
    { id: 8, name: 'Duplex Villa', location: 'Kolkata, Salt Lake', city: 'Kolkata', price: 45000, area: '2800 sq.ft', bedrooms: 4, rating: 4.7, reviews: 189, badge: 'For Rent', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80', type: 'Villa', listingType: 'Rent' },
    { id: 9, name: 'Retail Shop', location: 'Mumbai, Bandra', city: 'Mumbai', price: 12000000, area: '800 sq.ft', bedrooms: 0, rating: 4.9, reviews: 298, badge: 'For Sale', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80', type: 'Commercial', listingType: 'Sale' },
    { id: 10, name: 'Farmhouse', location: 'Lonavala, Maharashtra', city: 'Pune', price: 60000, area: '5000 sq.ft', bedrooms: 6, rating: 5.0, reviews: 412, badge: 'For Rent', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80', type: 'Farmhouse', listingType: 'Rent' },
    { id: 11, name: 'Builder Floor', location: 'Delhi, Dwarka', city: 'Delhi', price: 18000000, area: '1600 sq.ft', bedrooms: 3, rating: 4.6, reviews: 223, badge: 'For Sale', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=80', type: 'Apartment', listingType: 'Sale' },
    { id: 12, name: 'Warehouse', location: 'Pune, Chakan', city: 'Pune', price: 120000, area: '10000 sq.ft', bedrooms: 0, rating: 4.8, reviews: 156, badge: 'For Rent', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&q=80', type: 'Commercial', listingType: 'Rent' },
    { id: 13, name: '2BHK Apartment', location: 'Mumbai, Powai', city: 'Mumbai', price: 28000000, area: '1200 sq.ft', bedrooms: 2, rating: 4.7, reviews: 189, badge: 'For Sale', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&q=80', type: 'Apartment', listingType: 'Sale' },
    { id: 14, name: 'Luxury Villa', location: 'Bangalore, Sarjapur', city: 'Bangalore', price: 55000, area: '3500 sq.ft', bedrooms: 5, rating: 4.9, reviews: 278, badge: 'For Rent', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&q=80', type: 'Villa', listingType: 'Rent' },
    { id: 15, name: 'Office Space', location: 'Hyderabad, Hitech City', city: 'Hyderabad', price: 22000000, area: '1500 sq.ft', bedrooms: 0, rating: 4.8, reviews: 234, badge: 'For Sale', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80', type: 'Commercial', listingType: 'Sale' },
    { id: 16, name: '1BHK Flat', location: 'Chennai, Adyar', city: 'Chennai', price: 15000, area: '550 sq.ft', bedrooms: 1, rating: 4.5, reviews: 145, badge: 'For Rent', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=80', type: 'Apartment', listingType: 'Rent' },
    { id: 17, name: 'Bungalow', location: 'Jaipur, C-Scheme', city: 'Jaipur', price: 35000000, area: '3000 sq.ft', bedrooms: 4, rating: 4.9, reviews: 312, badge: 'For Sale', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80', type: 'House', listingType: 'Sale' },
    { id: 18, name: 'Penthouse', location: 'Mumbai, Worli', city: 'Mumbai', price: 95000, area: '4000 sq.ft', bedrooms: 5, rating: 5.0, reviews: 456, badge: 'For Rent', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80', type: 'Penthouse', listingType: 'Rent' },
  ];

  const cities = ['all', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur'];
  const propertyTypes = ['all', 'Apartment', 'Villa', 'House', 'Commercial', 'Plot', 'Studio', 'Penthouse', 'Farmhouse'];
  const listingTypes = ['all', 'Sale', 'Rent'];

  // Filter properties
  const filteredProperties = allProperties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || property.city === selectedCity;
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesListingType = selectedListingType === 'all' || property.listingType === selectedListingType;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = property.price;
      if (property.listingType === 'Sale') {
        if (priceRange === 'under50') matchesPrice = price < 5000000;
        else if (priceRange === '50-100') matchesPrice = price >= 5000000 && price < 10000000;
        else if (priceRange === '100-200') matchesPrice = price >= 10000000 && price < 20000000;
        else if (priceRange === 'above200') matchesPrice = price >= 20000000;
      } else {
        if (priceRange === 'under20') matchesPrice = price < 20000;
        else if (priceRange === '20-50') matchesPrice = price >= 20000 && price < 50000;
        else if (priceRange === '50-100') matchesPrice = price >= 50000 && price < 100000;
        else if (priceRange === 'above100') matchesPrice = price >= 100000;
      }
    }

    const matchesBedrooms = bedroomFilter === 'all' || 
                           (bedroomFilter === '1' && property.bedrooms === 1) ||
                           (bedroomFilter === '2' && property.bedrooms === 2) ||
                           (bedroomFilter === '3' && property.bedrooms === 3) ||
                           (bedroomFilter === '4+' && property.bedrooms >= 4);

    return matchesSearch && matchesCity && matchesType && matchesListingType && matchesPrice && matchesBedrooms;
  });

  const formatPrice = (price, listingType) => {
    if (listingType === 'Rent') {
      return `₹${price.toLocaleString('en-IN')}/month`;
    } else {
      if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(1)} Cr`;
      } else if (price >= 100000) {
        return `₹${(price / 100000).toFixed(1)} Lac`;
      }
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedType('all');
    setSelectedListingType('all');
    setPriceRange('all');
    setBedroomFilter('all');
  };

  return (
    <div className="all-properties-page">
      <div className="all-properties-container">
        
        {/* Header */}
        <div className="properties-header">
          <div>
            <h1>All Properties</h1>
            <p>Find your perfect property from {allProperties.length} listings</p>
          </div>
          <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={18} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by property name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              <X size={18} />
            </button>
          )}
        </div>

        <div className="properties-content">
          
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'filters-sidebar--open' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="clear-filters-btn" onClick={clearFilters}>Clear All</button>
            </div>

            {/* City Filter */}
            <div className="filter-group">
              <label>City</label>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Listing Type Filter */}
            <div className="filter-group">
              <label>Listing Type</label>
              <div className="filter-chips">
                {listingTypes.map(type => (
                  <button
                    key={type}
                    className={`filter-chip ${selectedListingType === type ? 'active' : ''}`}
                    onClick={() => setSelectedListingType(type)}
                  >
                    {type === 'all' ? 'All' : `For ${type}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type Filter */}
            <div className="filter-group">
              <label>Property Type</label>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label>Price Range</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="all">All Prices</option>
                {selectedListingType === 'Sale' || selectedListingType === 'all' ? (
                  <>
                    <option value="under50">Under ₹50 Lac</option>
                    <option value="50-100">₹50 Lac - ₹1 Cr</option>
                    <option value="100-200">₹1 Cr - ₹2 Cr</option>
                    <option value="above200">Above ₹2 Cr</option>
                  </>
                ) : (
                  <>
                    <option value="under20">Under ₹20,000/month</option>
                    <option value="20-50">₹20,000 - ₹50,000/month</option>
                    <option value="50-100">₹50,000 - ₹1,00,000/month</option>
                    <option value="above100">Above ₹1,00,000/month</option>
                  </>
                )}
              </select>
            </div>

            {/* Bedrooms Filter */}
            <div className="filter-group">
              <label>Bedrooms</label>
              <div className="filter-chips">
                {['all', '1', '2', '3', '4+'].map(bed => (
                  <button
                    key={bed}
                    className={`filter-chip ${bedroomFilter === bed ? 'active' : ''}`}
                    onClick={() => setBedroomFilter(bed)}
                  >
                    {bed === 'all' ? 'Any' : bed}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Properties Grid */}
          <div className="properties-main">
            <div className="properties-results-header">
              <p>{filteredProperties.length} properties found</p>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="no-results">
                <h3>No properties found</h3>
                <p>Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="btn btn--filled">Clear Filters</button>
              </div>
            ) : (
              <div className="properties-grid">
                {filteredProperties.map(property => (
                  <div key={property.id} className="property-card">
                    <div className="property-card__top">
                      <div className="property-card__img" style={{ backgroundImage: `url(${property.img})` }}></div>
                      <div className={`property-card__badge ${property.listingType === 'Rent' ? 'badge-rent' : 'badge-sale'}`}>
                        {property.badge}
                      </div>
                    </div>
                    <div className="property-card__info">
                      <h3>{property.name}</h3>
                      <div className="property-card__meta">
                        <MapPin size={13} /> {property.location}
                      </div>
                      <div className="property-card__type">{property.type}</div>
                      <div className="property-card__details">
                        <span>{property.area}</span>
                        {property.bedrooms > 0 && <span>• {property.bedrooms} BHK</span>}
                      </div>
                      <div className="property-card__price">{formatPrice(property.price, property.listingType)}</div>
                      <div className="property-card__rating">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <strong>{property.rating}</strong>
                        <span>({property.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="property-card__actions">
                      <button 
                        className="property-card__btn property-card__btn--call"
                        onClick={() => navigate('/call-plans', { 
                          state: { 
                            propertyName: property.name,
                            propertyOwner: 'Property Owner'
                          }
                        })}
                      >
                        <Phone size={14} /> Call
                      </button>
                      <Link to={`/property/${property.id}`} className="property-card__btn property-card__btn--details">
                        <MessageCircle size={14} /> Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProperties;
