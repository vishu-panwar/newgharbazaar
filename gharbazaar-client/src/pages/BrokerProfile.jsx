import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Globe, Award, Users, Building, CheckCircle, MessageCircle, Share2 } from 'lucide-react';
import './BrokerProfile.css';

function BrokerProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('portfolio');

  // Broker/Builder/Contractor data
  const brokerData = {
    1: {
      name: 'Lodha Group',
      type: 'Builder',
      location: 'Mumbai',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
      rating: 4.9,
      reviews: 523,
      experience: '25+ Years',
      projects: 150,
      clients: '50,000+',
      description: 'Lodha Group is one of India\'s leading real estate developers with a legacy of building iconic landmarks. We specialize in luxury residential and commercial projects across Mumbai and Pune.',
      specialization: ['Luxury Apartments', 'Commercial Spaces', 'Integrated Townships'],
      contact: {
        phone: '+91 98765 43210',
        email: 'info@lodhagroup.com',
        website: 'www.lodhagroup.com'
      },
      certifications: ['RERA Registered', 'ISO 9001:2015', 'IGBC Certified'],
      portfolio: [
        { id: 1, name: 'Lodha Luxury Towers', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80', price: '₹2.5 Cr', location: 'Mumbai, Worli', status: 'Ready to Move' },
        { id: 2, name: 'Lodha Park', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80', price: '₹3.8 Cr', location: 'Mumbai, Lower Parel', status: 'Under Construction' },
        { id: 3, name: 'Lodha Amara', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&q=80', price: '₹4.2 Cr', location: 'Mumbai, Thane', status: 'New Launch' },
        { id: 4, name: 'Lodha Crown', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80', price: '₹5.5 Cr', location: 'Mumbai, Parel', status: 'Ready to Move' },
        { id: 5, name: 'Lodha Belmondo', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80', price: '₹6.8 Cr', location: 'Pune, Kharadi', status: 'Under Construction' },
        { id: 6, name: 'Lodha Meridian', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80', price: '₹3.2 Cr', location: 'Mumbai, Kukatpally', status: 'Ready to Move' },
      ]
    },
    // Default data for other IDs
    default: {
      name: 'Premium Properties',
      type: 'Broker',
      location: 'Mumbai',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80',
      rating: 4.7,
      reviews: 234,
      experience: '10+ Years',
      projects: 50,
      clients: '5,000+',
      description: 'We are a trusted real estate service provider specializing in residential and commercial properties. Our team of experts helps you find the perfect property that matches your requirements.',
      specialization: ['Residential Properties', 'Commercial Spaces', 'Property Consultation'],
      contact: {
        phone: '+91 98765 43210',
        email: 'info@premiumproperties.com',
        website: 'www.premiumproperties.com'
      },
      certifications: ['RERA Registered', 'Verified Broker'],
      portfolio: [
        { id: 1, name: 'Luxury Apartment', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80', price: '₹2.5 Cr', location: 'Mumbai', status: 'Available' },
        { id: 2, name: 'Modern Villa', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&q=80', price: '₹3.8 Cr', location: 'Pune', status: 'Available' },
        { id: 3, name: 'Commercial Office', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80', price: '₹1.8 Cr', location: 'Bangalore', status: 'Available' },
        { id: 4, name: 'Penthouse', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80', price: '₹5.5 Cr', location: 'Delhi', status: 'Available' },
      ]
    }
  };

  const broker = brokerData[id] || brokerData.default;

  return (
    <div className="broker-profile-page">
      <div className="broker-profile-container">
        
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-header-content">
            <div className="profile-avatar">
              <img src={broker.img} alt={broker.name} />
              <div className="verified-badge">
                <CheckCircle size={20} />
              </div>
            </div>
            
            <div className="profile-info">
              <div className="profile-title">
                <h1>{broker.name}</h1>
                <button className="share-btn">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
              
              <div className="profile-meta">
                <span className="profile-type">{broker.type}</span>
                <span className="profile-location">
                  <MapPin size={14} />
                  {broker.location}
                </span>
              </div>

              <div className="profile-stats">
                <div className="stat-item">
                  <Award size={20} />
                  <div>
                    <strong>{broker.experience}</strong>
                    <span>Experience</span>
                  </div>
                </div>
                <div className="stat-item">
                  <Building size={20} />
                  <div>
                    <strong>{broker.projects}+</strong>
                    <span>Projects</span>
                  </div>
                </div>
                <div className="stat-item">
                  <Users size={20} />
                  <div>
                    <strong>{broker.clients}</strong>
                    <span>Happy Clients</span>
                  </div>
                </div>
                <div className="stat-item">
                  <Star size={20} fill="#f59e0b" color="#f59e0b" />
                  <div>
                    <strong>{broker.rating}</strong>
                    <span>({broker.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="action-btn action-btn--primary">
                  <Phone size={18} />
                  Call Now
                </button>
                <button className="action-btn action-btn--secondary">
                  <MessageCircle size={18} />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio ({broker.portfolio.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          
          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="portfolio-section">
              <h2>Our Portfolio</h2>
              <div className="portfolio-grid">
                {broker.portfolio.map(property => (
                  <div key={property.id} className="portfolio-card">
                    <div className="portfolio-card__img" style={{ backgroundImage: `url(${property.img})` }}>
                      <div className="portfolio-status">{property.status}</div>
                    </div>
                    <div className="portfolio-card__info">
                      <h3>{property.name}</h3>
                      <div className="portfolio-location">
                        <MapPin size={13} />
                        {property.location}
                      </div>
                      <div className="portfolio-price">{property.price}</div>
                      <Link to={`/property/${property.id}`} className="portfolio-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="about-section">
              <div className="about-content">
                <h2>About {broker.name}</h2>
                <p>{broker.description}</p>

                <h3>Specialization</h3>
                <div className="specialization-tags">
                  {broker.specialization.map((spec, index) => (
                    <span key={index} className="spec-tag">{spec}</span>
                  ))}
                </div>

                <h3>Certifications & Awards</h3>
                <div className="certifications">
                  {broker.certifications.map((cert, index) => (
                    <div key={index} className="cert-item">
                      <CheckCircle size={18} />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="contact-section">
              <h2>Get in Touch</h2>
              <div className="contact-info">
                <div className="contact-item">
                  <Phone size={20} />
                  <div>
                    <strong>Phone</strong>
                    <p>{broker.contact.phone}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Mail size={20} />
                  <div>
                    <strong>Email</strong>
                    <p>{broker.contact.email}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Globe size={20} />
                  <div>
                    <strong>Website</strong>
                    <p>{broker.contact.website}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <MapPin size={20} />
                  <div>
                    <strong>Location</strong>
                    <p>{broker.location}, India</p>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <h3>Send a Message</h3>
                <form>
                  <div className="form-row">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                  </div>
                  <input type="tel" placeholder="Your Phone" required />
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrokerProfile;
