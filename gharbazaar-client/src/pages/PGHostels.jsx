import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Phone, MessageCircle, Search, SlidersHorizontal, X, Users, Wifi, Utensils, Home } from 'lucide-react';
import './PGHostels.css';

function PGHostels() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [amenityFilter, setAmenityFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // PG & Hostels data
  const pgHostels = [
    { id: 1, name: 'Zolo Stays - Premium PG', img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&q=80', price: 8500, location: 'Bangalore, Koramangala', city: 'Bangalore', rating: 4.7, reviews: 245, amenities: ['WiFi', 'AC', 'Food', 'Laundry'], type: 'Boys & Girls', occupancy: 'Single/Double' },
    { id: 2, name: 'OYO Life - Student Hostel', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&q=80', price: 6999, location: 'Pune, Kothrud', city: 'Pune', rating: 4.5, reviews: 189, amenities: ['WiFi', 'Meals', 'Laundry', 'Security'], type: 'Boys Only', occupancy: 'Triple' },
    { id: 3, name: 'Stanza Living - Coliving', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=80', price: 9500, location: 'Delhi, Laxmi Nagar', city: 'Delhi', rating: 4.8, reviews: 312, amenities: ['AC', 'WiFi', 'Gym', 'Food'], type: 'Girls Only', occupancy: 'Single' },
    { id: 4, name: 'NestAway - Shared Rooms', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300&q=80', price: 5500, location: 'Hyderabad, Gachibowli', city: 'Hyderabad', rating: 4.4, reviews: 156, amenities: ['WiFi', 'Food', 'Security', 'Parking'], type: 'Boys & Girls', occupancy: 'Triple' },
    { id: 5, name: 'CoHo - Modern PG', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&q=80', price: 10500, location: 'Mumbai, Andheri', city: 'Mumbai', rating: 4.9, reviews: 278, amenities: ['AC', 'WiFi', 'Housekeeping', 'Food'], type: 'Girls Only', occupancy: 'Single' },
    { id: 6, name: 'YourSpace - Budget PG', img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&q=80', price: 4999, location: 'Chennai, Velachery', city: 'Chennai', rating: 4.3, reviews: 134, amenities: ['WiFi', 'Meals', 'Parking', 'Security'], type: 'Boys Only', occupancy: 'Double' },
    { id: 7, name: 'Urban Ladder PG', img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&q=80', price: 7500, location: 'Bangalore, Whitefield', city: 'Bangalore', rating: 4.6, reviews: 198, amenities: ['WiFi', 'AC', 'Food', 'Gym'], type: 'Boys & Girls', occupancy: 'Single/Double' },
    { id: 8, name: 'Colive - Premium Hostel', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=80', price: 11000, location: 'Mumbai, Powai', city: 'Mumbai', rating: 4.8, reviews: 267, amenities: ['AC', 'WiFi', 'Gym', 'Food', 'Laundry'], type: 'Boys & Girls', occupancy: 'Single' },
    { id: 9, name: 'Student Hub PG', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&q=80', price: 6500, location: 'Pune, Hinjewadi', city: 'Pune', rating: 4.5, reviews: 176, amenities: ['WiFi', 'Food', 'Security', 'Parking'], type: 'Boys Only', occupancy: 'Double/Triple' },
    { id: 10, name: 'Girls Hostel - Safe Stay', img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&q=80', price: 8000, location: 'Delhi, Dwarka', city: 'Delhi', rating: 4.7, reviews: 223, amenities: ['AC', 'WiFi', 'Food', 'Security'], type: 'Girls Only', occupancy: 'Single/Double' },
    { id: 11, name: 'Tech Park PG', img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&q=80', price: 7800, location: 'Hyderabad, Hitech City', city: 'Hyderabad', rating: 4.6, reviews: 189, amenities: ['WiFi', 'AC', 'Food', 'Laundry'], type: 'Boys & Girls', occupancy: 'Single' },
    { id: 12, name: 'Budget Hostel', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300&q=80', price: 4500, location: 'Chennai, Tambaram', city: 'Chennai', rating: 4.2, reviews: 145, amenities: ['WiFi', 'Meals', 'Security'], type: 'Boys Only', occupancy: 'Triple' },
    { id: 13, name: 'Executive PG', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&q=80', price: 12000, location: 'Bangalore, Indiranagar', city: 'Bangalore', rating: 4.9, reviews: 312, amenities: ['AC', 'WiFi', 'Gym', 'Food', 'Housekeeping'], type: 'Boys & Girls', occupancy: 'Single' },
    { id: 14, name: 'Working Women Hostel', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=80', price: 9000, location: 'Mumbai, Bandra', city: 'Mumbai', rating: 4.8, reviews: 256, amenities: ['AC', 'WiFi', 'Food', 'Security', 'Laundry'], type: 'Girls Only', occupancy: 'Single/Double' },
    { id: 15, name: 'Campus PG', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&q=80', price: 5800, location: 'Pune, Aundh', city: 'Pune', rating: 4.4, reviews: 167, amenities: ['WiFi', 'Food', 'Parking', 'Security'], type: 'Boys Only', occupancy: 'Double' },
    { id: 16, name: 'Luxury PG', img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&q=80', price: 13500, location: 'Delhi, Saket', city: 'Delhi', rating: 5.0, reviews: 389, amenities: ['AC', 'WiFi', 'Gym', 'Food', 'Housekeeping', 'Laundry'], type: 'Boys & Girls', occupancy: 'Single' },
    { id: 17, name: 'IT Park Hostel', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300&q=80', price: 7200, location: 'Hyderabad, Madhapur', city: 'Hyderabad', rating: 4.5, reviews: 198, amenities: ['WiFi', 'AC', 'Food', 'Security'], type: 'Boys & Girls', occupancy: 'Double' },
    { id: 18, name: 'Student Residence', img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&q=80', price: 6200, location: 'Chennai, Guindy', city: 'Chennai', rating: 4.6, reviews: 212, amenities: ['WiFi', 'Meals', 'Security', 'Parking'], type: 'Boys Only', occupancy: 'Double/Triple' },
  ];

  const cities = ['all', 'Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai'];
  const pgTypes = ['all', 'Boys Only', 'Girls Only', 'Boys & Girls'];
  const amenities = ['all', 'AC', 'WiFi', 'Food', 'Gym', 'Laundry'];

  // Filter PG/Hostels
  const filteredPGs = pgHostels.filter(pg => {
    const matchesSearch = pg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pg.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || pg.city === selectedCity;
    const matchesType = selectedType === 'all' || pg.type === selectedType;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = pg.price;
      if (priceRange === 'under5') matchesPrice = price < 5000;
      else if (priceRange === '5-7') matchesPrice = price >= 5000 && price < 7000;
      else if (priceRange === '7-10') matchesPrice = price >= 7000 && price < 10000;
      else if (priceRange === 'above10') matchesPrice = price >= 10000;
    }

    const matchesAmenity = amenityFilter === 'all' || pg.amenities.includes(amenityFilter);

    return matchesSearch && matchesCity && matchesType && matchesPrice && matchesAmenity;
  });

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}/month`;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedType('all');
    setPriceRange('all');
    setAmenityFilter('all');
  };

  return (
    <div className="pg-hostels-page">
      <div className="pg-hostels-container">
        
        {/* Header */}
        <div className="properties-header">
          <div>
            <div className="header-badge pg-badge">
              <Home size={18} />
              <span>PG & Hostels</span>
            </div>
            <h1>PG & Hostels for Students & Professionals</h1>
            <p>Find comfortable and affordable accommodation from {pgHostels.length} verified listings</p>
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
            placeholder="Search by PG name or location..."
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

            {/* PG Type Filter */}
            <div className="filter-group">
              <label>PG Type</label>
              <div className="filter-chips">
                {pgTypes.map(type => (
                  <button
                    key={type}
                    className={`filter-chip ${selectedType === type ? 'active' : ''}`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type === 'all' ? 'All' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label>Monthly Rent</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="all">All Prices</option>
                <option value="under5">Under ₹5,000</option>
                <option value="5-7">₹5,000 - ₹7,000</option>
                <option value="7-10">₹7,000 - ₹10,000</option>
                <option value="above10">Above ₹10,000</option>
              </select>
            </div>

            {/* Amenities Filter */}
            <div className="filter-group">
              <label>Amenities</label>
              <div className="filter-chips">
                {amenities.map(amenity => (
                  <button
                    key={amenity}
                    className={`filter-chip ${amenityFilter === amenity ? 'active' : ''}`}
                    onClick={() => setAmenityFilter(amenity)}
                  >
                    {amenity === 'all' ? 'All' : amenity}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* PG Grid */}
          <div className="properties-main">
            <div className="properties-results-header">
              <p>{filteredPGs.length} PG/Hostels found</p>
            </div>

            {filteredPGs.length === 0 ? (
              <div className="no-results">
                <h3>No PG/Hostels found</h3>
                <p>Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="btn btn--filled">Clear Filters</button>
              </div>
            ) : (
              <div className="properties-grid">
                {filteredPGs.map(pg => (
                  <div key={pg.id} className="property-card pg-card">
                    <div className="property-card__top">
                      <div className="property-card__img" style={{ backgroundImage: `url(${pg.img})` }}></div>
                      <div className={`property-card__badge ${
                        pg.type === 'Boys Only' ? 'badge-boys' : 
                        pg.type === 'Girls Only' ? 'badge-girls' : 
                        'badge-coed'
                      }`}>
                        {pg.type}
                      </div>
                    </div>
                    <div className="property-card__info">
                      <h3>{pg.name}</h3>
                      <div className="property-card__meta">
                        <MapPin size={13} /> {pg.location}
                      </div>
                      <div className="pg-occupancy">
                        <Users size={13} />
                        <span>{pg.occupancy}</span>
                      </div>
                      <div className="pg-amenities">
                        {pg.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="amenity-tag">
                            {amenity === 'WiFi' && <Wifi size={11} />}
                            {amenity === 'Food' && <Utensils size={11} />}
                            {amenity}
                          </span>
                        ))}
                        {pg.amenities.length > 3 && (
                          <span className="amenity-tag">+{pg.amenities.length - 3}</span>
                        )}
                      </div>
                      <div className="property-card__price">{formatPrice(pg.price)}</div>
                      <div className="property-card__rating">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <strong>{pg.rating}</strong>
                        <span>({pg.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="property-card__actions">
                      <button 
                        className="property-card__btn property-card__btn--call"
                        onClick={() => navigate('/call-plans', { 
                          state: { 
                            propertyName: pg.name,
                            propertyOwner: 'PG Owner'
                          }
                        })}
                      >
                        <Phone size={14} /> Call
                      </button>
                      <Link to={`/property/${pg.id}`} className="property-card__btn property-card__btn--details">
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

export default PGHostels;
