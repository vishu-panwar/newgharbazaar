import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, MessageCircle, Search, SlidersHorizontal, X, TrendingUp, Flame } from 'lucide-react';
import './TrendingProperties.css';

function TrendingProperties() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [discountFilter, setDiscountFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Trending properties data with discounts
  const trendingProperties = [
    { id: 1, name: 'Sea View Apartment', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80', price: 42000000, originalPrice: 60000000, discount: 30, location: 'Mumbai', city: 'Mumbai', rating: 4.8, reviews: 250, type: 'Apartment', trending: 'Hot' },
    { id: 2, name: 'Modern Villa', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80', price: 38000000, originalPrice: 50000000, discount: 24, location: 'Bangalore', city: 'Bangalore', rating: 4.9, reviews: 312, type: 'Villa', trending: 'Hot' },
    { id: 3, name: 'Luxury Penthouse', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80', price: 65000000, originalPrice: 85000000, discount: 23, location: 'Delhi', city: 'Delhi', rating: 5.0, reviews: 456, type: 'Penthouse', trending: 'Hot' },
    { id: 4, name: 'Garden Villa', img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=300&q=80', price: 29000000, originalPrice: 40000000, discount: 27, location: 'Pune', city: 'Pune', rating: 4.7, reviews: 198, type: 'Villa', trending: 'New' },
    { id: 5, name: 'Smart Home', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&q=80', price: 35000000, originalPrice: 45000000, discount: 22, location: 'Hyderabad', city: 'Hyderabad', rating: 4.8, reviews: 267, type: 'House', trending: 'Hot' },
    { id: 6, name: 'Beach House', img: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=300&q=80', price: 52000000, originalPrice: 65000000, discount: 20, location: 'Goa', city: 'Goa', rating: 4.9, reviews: 389, type: 'House', trending: 'Hot' },
    { id: 7, name: 'Hill View Villa', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&q=80', price: 48000000, originalPrice: 60000000, discount: 20, location: 'Shimla', city: 'Shimla', rating: 4.8, reviews: 234, type: 'Villa', trending: 'New' },
    { id: 8, name: 'Lake Side Home', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300&q=80', price: 32000000, originalPrice: 45000000, discount: 28, location: 'Udaipur', city: 'Udaipur', rating: 4.7, reviews: 178, type: 'House', trending: 'Hot' },
    { id: 9, name: 'Urban Loft', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80', price: 28000000, originalPrice: 35000000, discount: 20, location: 'Chennai', city: 'Chennai', rating: 4.6, reviews: 156, type: 'Apartment', trending: 'New' },
    { id: 10, name: 'Riverside Villa', img: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=300&q=80', price: 45000000, originalPrice: 60000000, discount: 25, location: 'Kochi', city: 'Kochi', rating: 4.9, reviews: 298, type: 'Villa', trending: 'Hot' },
    { id: 11, name: 'Mountain Retreat', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=300&q=80', price: 39000000, originalPrice: 52000000, discount: 25, location: 'Manali', city: 'Manali', rating: 4.8, reviews: 223, type: 'House', trending: 'New' },
    { id: 12, name: 'City Center Apartment', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&q=80', price: 26000000, originalPrice: 35000000, discount: 25, location: 'Kolkata', city: 'Kolkata', rating: 4.7, reviews: 189, type: 'Apartment', trending: 'Hot' },
    { id: 13, name: 'Skyline Penthouse', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80', price: 72000000, originalPrice: 90000000, discount: 20, location: 'Mumbai', city: 'Mumbai', rating: 5.0, reviews: 412, type: 'Penthouse', trending: 'Hot' },
    { id: 14, name: 'Eco Villa', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&q=80', price: 42000000, originalPrice: 55000000, discount: 23, location: 'Bangalore', city: 'Bangalore', rating: 4.9, reviews: 345, type: 'Villa', trending: 'New' },
    { id: 15, name: 'Premium Apartment', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80', price: 35000000, originalPrice: 48000000, discount: 27, location: 'Delhi', city: 'Delhi', rating: 4.8, reviews: 267, type: 'Apartment', trending: 'Hot' },
    { id: 16, name: 'Farmhouse Estate', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&q=80', price: 58000000, originalPrice: 75000000, discount: 22, location: 'Pune', city: 'Pune', rating: 4.9, reviews: 312, type: 'Farmhouse', trending: 'Hot' },
    { id: 17, name: 'Duplex Villa', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80', price: 48000000, originalPrice: 62000000, discount: 22, location: 'Hyderabad', city: 'Hyderabad', rating: 4.8, reviews: 278, type: 'Villa', trending: 'New' },
    { id: 18, name: 'Beachfront Property', img: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=300&q=80', price: 85000000, originalPrice: 110000000, discount: 22, location: 'Goa', city: 'Goa', rating: 5.0, reviews: 523, type: 'Villa', trending: 'Hot' },
  ];

  const cities = ['all', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Goa', 'Shimla', 'Udaipur', 'Kochi', 'Manali'];
  const propertyTypes = ['all', 'Apartment', 'Villa', 'House', 'Penthouse', 'Farmhouse'];

  // Filter properties
  const filteredProperties = trendingProperties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || property.city === selectedCity;
    const matchesType = selectedType === 'all' || property.type === selectedType;
    
    let matchesDiscount = true;
    if (discountFilter !== 'all') {
      if (discountFilter === '20+') matchesDiscount = property.discount >= 20;
      else if (discountFilter === '25+') matchesDiscount = property.discount >= 25;
      else if (discountFilter === '30+') matchesDiscount = property.discount >= 30;
    }

    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = property.price;
      if (priceRange === 'under30') matchesPrice = price < 30000000;
      else if (priceRange === '30-50') matchesPrice = price >= 30000000 && price < 50000000;
      else if (priceRange === '50-70') matchesPrice = price >= 50000000 && price < 70000000;
      else if (priceRange === 'above70') matchesPrice = price >= 70000000;
    }

    return matchesSearch && matchesCity && matchesType && matchesDiscount && matchesPrice;
  });

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lac`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedType('all');
    setDiscountFilter('all');
    setPriceRange('all');
  };

  return (
    <div className="trending-page">
      <div className="trending-container">
        
        {/* Header */}
        <div className="properties-header">
          <div>
            <div className="header-badge trending-badge">
              <Flame size={18} />
              <span>Trending Now</span>
            </div>
            <h1>Trending Properties - Up to 40% Off</h1>
            <p>Hot deals on {trendingProperties.length} premium properties with limited time offers</p>
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

            {/* Discount Filter */}
            <div className="filter-group">
              <label>Minimum Discount</label>
              <div className="filter-chips">
                {['all', '20+', '25+', '30+'].map(discount => (
                  <button
                    key={discount}
                    className={`filter-chip ${discountFilter === discount ? 'active' : ''}`}
                    onClick={() => setDiscountFilter(discount)}
                  >
                    {discount === 'all' ? 'All' : `${discount}% Off`}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label>Price Range</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="all">All Prices</option>
                <option value="under30">Under ₹3 Cr</option>
                <option value="30-50">₹3 Cr - ₹5 Cr</option>
                <option value="50-70">₹5 Cr - ₹7 Cr</option>
                <option value="above70">Above ₹7 Cr</option>
              </select>
            </div>
          </aside>

          {/* Properties Grid */}
          <div className="properties-main">
            <div className="properties-results-header">
              <p>{filteredProperties.length} trending properties with hot deals</p>
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
                  <div key={property.id} className="property-card trending-card">
                    <div className="property-card__top">
                      <div className="property-card__img" style={{ backgroundImage: `url(${property.img})` }}></div>
                      <div className="discount-badge-large">
                        {property.discount}% OFF
                      </div>
                      {property.trending === 'Hot' && (
                        <div className="trending-indicator">
                          <Flame size={14} />
                          Hot Deal
                        </div>
                      )}
                    </div>
                    <div className="property-card__info">
                      <h3>{property.name}</h3>
                      <div className="property-card__meta">
                        <MapPin size={13} /> {property.location}
                      </div>
                      <div className="property-card__type">{property.type}</div>
                      <div className="price-section">
                        <div className="property-card__price">{formatPrice(property.price)}</div>
                        <div className="original-price">{formatPrice(property.originalPrice)}</div>
                      </div>
                      <div className="savings-badge">
                        Save {formatPrice(property.originalPrice - property.price)}
                      </div>
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

export default TrendingProperties;
