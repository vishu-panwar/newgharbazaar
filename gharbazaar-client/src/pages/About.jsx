import { CheckCircle, TrendingUp, Users, Clock, MapPin, Award } from 'lucide-react';
import './About.css';

export default function About() {
  const features = [
    {
      title: 'Zero Broker Commission',
      description: 'No middlemen means no unnecessary fees. Keep your hard-earned money exactly where it belongs—in your pocket.',
    },
    {
      title: 'Fully Managed Living',
      description: 'Renting a PG? From repairs to complaints, the GharBazaar team handles everything directly through our platform.',
    },
    {
      title: 'Built for Tier 2 & 3 India',
      description: 'Bringing world-class real estate tech and maintenance services directly to India\'s fastest-growing cities and towns.',
    },
    {
      title: '100% Verified Listings',
      description: 'Say goodbye to fake photos and ghost listings. Every single property on our platform goes through a strict physical verification process.',
    },
    {
      title: 'Transparent Pricing',
      description: 'What you see is exactly what you get. We stand firmly against hidden charges, surprise bills, or under-the-table costs.',
    },
    {
      title: 'Smart & Secure Onboarding',
      description: 'Skip the paperwork. Complete your documentation, digital agreements, and KYC instantly through our secure platform.',
    },
  ];

  const values = [
    {
      title: 'Trust',
      description: 'Trust is our currency. Every listing is meticulously verified, and every promise we make to our community is kept.',
    },
    {
      title: 'Transparency',
      description: 'Clear communication is non-negotiable. We maintain absolute honesty with zero hidden agendas, or unexpected monthly costs, ever.',
    },
    {
      title: 'Hassle-Free Service',
      description: 'We believe your peace of mind shouldn\'t end after signing a lease. We take full responsibility for your living experience, resolving issues fast so you don\'t have to negotiate with landlords.',
    },
    {
      title: 'Innovation',
      description: 'We are constantly evolving. By continuously improving our technology, we make it smoother, faster, and easier for India to find—and live comfortably in—its perfect space.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Properties Listed & Counting' },
    { number: '100+', label: 'Verified Field Partners' },
    { number: '24/7', label: 'Dedicated Customer Support' },
  ];

  const certifications = [
    {
      title: 'DPIIT Recognized Startup',
      description: 'Officially certified by the Department for Promotion of Industry and Internal Trade, Government of India.',
      logo: '/startupindia-logo.png',
    },
    {
      title: 'StartInUp Certified',
      description: 'Recognized under the flagship startup initiative by the Department of IT & Electronics, Government of Uttar Pradesh.',
      logo: '/startinup-logo.png',
    },
    {
      title: 'MCA Registered',
      description: 'Incorporated as a legally recognized Private Limited Company under the Ministry of Corporate Affairs.',
      logo: '/mca-logo.png',
    },
    {
      title: 'GST Compliant',
      description: 'Fully registered under the Goods and Services Tax network for transparent business operations.',
      logo: '/gst-logo.png',
    },
    {
      title: 'MSME Registered',
      description: 'Registered under the Ministry of Micro, Small, and Medium Enterprises to support scale and compliance.',
      logo: '/msme-logo.png',
    },
  ];

  return (
    <div className="about-page">
      {/* Who We Are Section */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="section-title green-text">Who We Are</h2>
          <p className="section-description">
            Building India's most trusted real estate platform — one home at a time.
          </p>
          <p className="section-paragraph">
            Welcome to GharBazaar, where finding your dream property doesn't come with a middleman. We are
            redefining the Indian real estate landscape by removing heavy commissions, hidden costs, and stressful
            negotiations. Whether you are buying, renting, or selling we bring the market directly to your screen.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-section story-section">
        <div className="about-container">
          <h2 className="section-title green-text">Our Story</h2>
          
          <div className="story-grid">
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop" 
                alt="Indian Street Scene" 
              />
            </div>

            <div className="story-content">
              <h3 className="story-heading">The GharBazaar Journey</h3>
              <p className="story-text">
                Finding a home in India shouldn't mean dealing with aggressive brokers, heavy commissions, and difficult
                landlords.
              </p>
              <p className="story-text">We built GharBazaar to fix that.</p>
              <p className="story-text">
                We make buying, selling, and renting 100% transparent and broker-free. But we don't just stop at the
                handshake—we stay with you. From finding a verified PG to your daily maintenance directly, we
                eliminate landlord friction so you can live hassle-free.
              </p>
              <p className="story-text">
                At GharBazaar, we put people before profit, and seamless service before transactions.
              </p>
            </div>
          </div>

          <div className="mission-vision-grid">
            <div className="mission-card">
              <h3 className="card-title green-text">Our Mission</h3>
              <h4 className="card-subtitle">Connecting India Directly</h4>
              <p className="card-text">
                To create a transparent, reliable, and completely open property marketplace where buyers, sellers,
                renters, and investors can connect directly. We aim to eliminate the stress of property hunting by
                ensuring zero hidden charges, zero broker pressure, and 100% genuine interactions.
              </p>
            </div>

            <div className="mission-card">
              <h3 className="card-title green-text">Our Vision</h3>
              <h4 className="card-subtitle">Empowering the Next Frontier</h4>
              <p className="card-text">
                To become India's most trusted and accessible real estate platform, with a special focus on
                empowering Tier 2 and Tier 3 markets that have long been underserved by traditional brokers
                and mainstream digital platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="about-section features-section">
        <div className="about-container">
          <h2 className="section-title green-text">What Makes Us Different</h2>
          <p className="section-subtitle">Why Choose GharBazaar?</p>
          <p className="section-description">
            We strip away the complexity so you can focus on what matters—your next home.
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="about-section values-section">
        <div className="about-container">
          <h2 className="section-title green-text">Our Values</h2>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="about-section impact-section">
        <div className="about-container">
          <h2 className="section-title green-text">Our Impact</h2>
          <p className="section-subtitle">Driving Real Impact Across India</p>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="real-time-section">
            <h3 className="real-time-title">Real-Time</h3>
            <p className="real-time-subtitle">Rapidly Growing in Tier 2 & 3 Cities</p>
            <div className="cities-list">
              <div className="city-group">
                <strong>Uttar Pradesh:</strong> Noida, Saharanpur, Chhutmalpur
              </div>
              <div className="city-group">
                <strong>Uttrakhand:</strong> Roorkee, Dehradun
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition & Certifications */}
      <section className="about-section certifications-section">
        <div className="about-container">
          <h2 className="section-title green-text">Recognition & Certifications</h2>
          <p className="section-subtitle">Proudly Recognized & Registered</p>
          <p className="section-description">
            GharBazaar operates under the highest standards of compliance and national recognition.
          </p>

          <div className="certifications-list">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-card">
                <div className="cert-logo-placeholder">
                  {/* Logo placeholder */}
                  <Award size={48} className="cert-icon" />
                </div>
                <div className="cert-content">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-description">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
