import React, { useState } from 'react';
import '../../styles/SharedStyles.css';
import Footer from '../../components/Footer';

const STATUS_OPTIONS = ['all', 'active', 'inactive', 'pending'];
const FREQUENCY_OPTIONS = ['all', 'daily', 'weekly', 'monthly', 'seasonally', 'as requested'];

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#64748b'
          }}
        >
          ×
        </button>
        <h3 style={{ 
          color: '#1e3a8a', 
          marginBottom: '1rem',
          fontSize: '1.3rem',
          fontWeight: '600'
        }}>
          {service.service}
        </h3>
        <p style={{ 
          color: '#475569',
          lineHeight: '1.6',
          marginBottom: '1rem'
        }}>
          {service.description}
        </p>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem'
        }}>
          <span style={{
            background: '#e2e8f0',
            padding: '0.3rem 0.8rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            color: '#475569'
          }}>
            {service.frequency}
          </span>
          <span style={{
            background: service.status === 'active' ? '#dcfce7' : '#fee2e2',
            padding: '0.3rem 0.8rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            color: service.status === 'active' ? '#166534' : '#991b1b'
          }}>
            {service.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function OurServices() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false); // for mobile
  const [showMore, setShowMore] = useState(false); // for showing more tiles
  const servicesCatalog = require('../../data/serviceCatalog.json');

  // Group services by category
  const groupedServices = servicesCatalog.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});
  const categoryNames = Object.keys(groupedServices);

  // Featured services: pick top 6 active services (or any logic you want)
  const featuredServices = servicesCatalog
    .filter(s => s.status === 'active')
    .slice(0, 6);

  // Filter and search logic
  const getFilteredServices = (services) => {
    return services.filter(service => {
      const statusMatch = statusFilter === 'all' || service.status.toLowerCase() === statusFilter;
      const freqMatch = frequencyFilter === 'all' || service.frequency.toLowerCase().includes(frequencyFilter);
      const searchMatch =
        !searchTerm ||
        service.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return statusMatch && freqMatch && searchMatch;
    });
  };

  // Responsive check
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  // Category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(prev => (prev === category ? null : category));
  };

  // Content to show on the right
  let rightContent;
  const TILES_TO_SHOW = 8;
  if (!selectedCategory) {
    // Show featured services
    const visibleServices = showMore ? featuredServices : featuredServices.slice(0, TILES_TO_SHOW);
    rightContent = (
      <>
        <h2 style={{ color: '#1e3a8a', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.2rem' }}>Featured Services</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.2rem',
          marginBottom: '0.5rem',
        }}>
          {visibleServices.map((service, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedService(service)}
              style={{
                background: '#f8fafc',
                borderRadius: 7,
                padding: '1.1rem',
                cursor: 'pointer',
                border: '1.5px solid #d1d5db',
                fontWeight: 600,
                color: '#1e3a8a',
                fontSize: '1.05rem',
                transition: 'box-shadow 0.18s, border 0.18s',
                boxShadow: '0 1px 4px rgba(30,58,138,0.04)',
                minHeight: '70px',
                maxHeight: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                overflow: 'hidden',
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,58,138,0.10)';
                e.currentTarget.style.border = '1.5px solid #1e3a8a';
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(30,58,138,0.04)';
                e.currentTarget.style.border = '1.5px solid #d1d5db';
              }}
            >
              {service.service}
            </div>
          ))}
        </div>
        {featuredServices.length > TILES_TO_SHOW && (
          <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
            <button
              onClick={() => setShowMore(m => !m)}
              style={{
                background: '#1e3a8a',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '0.6rem 1.6rem',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(30,58,138,0.08)'
              }}
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </>
    );
  } else {
    // Show services for selected category
    const filtered = getFilteredServices(groupedServices[selectedCategory] || []);
    const visibleServices = showMore ? filtered : filtered.slice(0, TILES_TO_SHOW);
    rightContent = (
      <>
        <h2 style={{ color: '#1e3a8a', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.2rem' }}>{selectedCategory}</h2>
        {filtered.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '1.08rem', padding: '1.2rem 0' }}>No services found.</div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.2rem',
              marginBottom: '0.5rem',
            }}>
              {visibleServices.map((service, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedService(service)}
                  style={{
                    background: '#f8fafc',
                    borderRadius: 7,
                    padding: '1.1rem',
                    cursor: 'pointer',
                    border: '1.5px solid #d1d5db',
                    fontWeight: 600,
                    color: '#1e3a8a',
                    fontSize: '1.05rem',
                    transition: 'box-shadow 0.18s, border 0.18s',
                    boxShadow: '0 1px 4px rgba(30,58,138,0.04)',
                    minHeight: '70px',
                    maxHeight: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    overflow: 'hidden',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,58,138,0.10)';
                    e.currentTarget.style.border = '1.5px solid #1e3a8a';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(30,58,138,0.04)';
                    e.currentTarget.style.border = '1.5px solid #d1d5db';
                  }}
                >
                  {service.service}
                </div>
              ))}
            </div>
            {filtered.length > TILES_TO_SHOW && (
              <div style={{ textAlign: 'center', marginTop: '1.2rem' }}>
                <button
                  onClick={() => setShowMore(m => !m)}
                  style={{
                    background: '#1e3a8a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '0.6rem 1.6rem',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 1px 4px rgba(30,58,138,0.08)'
                  }}
                >
                  {showMore ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div style={{
        width: '100%',
        background: '#23397a',
        minHeight: '100vh',
        padding: '0 0 3rem 0'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '2.5rem 2rem 0 2rem',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '2.5rem 2rem 1.5rem 2rem',
            marginBottom: '2.5rem',
            boxShadow: '0 2px 12px rgba(30,58,138,0.07)',
            textAlign: 'center',
          }}>
            <h1 style={{
              color: '#0f172a',
              fontSize: '2.7rem',
              fontWeight: 800,
              marginBottom: '1rem',
            }}>Our Services</h1>
            <p style={{
              color: '#334155',
              fontSize: '1.18rem',
              lineHeight: '1.6',
              maxWidth: 700,
              margin: '0 auto',
            }}>Comprehensive home management solutions tailored to your needs.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '1.2rem',
            alignItems: 'stretch',
          }}>
            {/* Left: Categories */}
            <div style={{
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 1px 6px rgba(30,58,138,0.06)',
              padding: '2rem 1.2rem',
              minWidth: 0,
              border: '1px solid #e2e8f0',
              maxHeight: '60vh',
              overflowY: 'auto',
              height: '100%',
            }}>
              <h2 style={{
                color: '#1e293b',
                fontWeight: 700,
                fontSize: '1.18rem',
                marginBottom: '1.2rem',
                letterSpacing: '0.01em',
                border: 'none',
              }}>Categories</h2>
              <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
              }}>
                {categoryNames.map(category => (
                  <li key={category} style={{ width: '100%' }}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      style={{
                        width: '100%',
                        background: selectedCategory === category ? '#e6edfa' : 'none',
                        border: 'none',
                        outline: 'none',
                        textAlign: 'left',
                        padding: '0.7rem 0.8rem',
                        fontSize: '1.08rem',
                        fontWeight: 500,
                        color: selectedCategory === category ? '#1e3a8a' : '#1e293b',
                        borderRadius: 6,
                        cursor: 'pointer',
                        marginBottom: 0,
                        transition: 'background 0.18s, color 0.18s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      aria-selected={selectedCategory === category}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{category}</span>
                      <span style={{ fontSize: '1.2rem', color: '#64748b', marginLeft: 8, flexShrink: 0 }}>{selectedCategory === category ? '→' : ''}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Content */}
            <div style={{
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 1px 6px rgba(30,58,138,0.06)',
              padding: '2rem 1.5rem',
              minHeight: 300,
              border: '1px solid #e2e8f0',
              minWidth: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {rightContent}
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section" style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(30,58,138,0.07)',
            padding: '2rem 2rem',
            maxWidth: 1200,
            margin: '1.2rem auto 1.2rem auto',
            textAlign: 'center',
            fontSize: '1.15rem',
            color: '#1e293b',
          }}>
            <h2 style={{ color: '#1e3a8a', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.7rem' }}>Ready to get started?</h2>
            <p style={{ marginBottom: '1.2rem' }}>Sign in to save your favorite services and build your personalized home management plan.</p>
            <a href="/login" className="cta-signin-btn" style={{
              display: 'inline-block',
              background: '#1e3a8a',
              color: '#fff',
              borderRadius: 8,
              padding: '0.7rem 2.2rem',
              fontWeight: 700,
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 1px 4px rgba(30,58,138,0.08)'
            }}>Sign In & Select Services</a>
          </div>
        </div>
      </div>

      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}

    </>
  );
}
