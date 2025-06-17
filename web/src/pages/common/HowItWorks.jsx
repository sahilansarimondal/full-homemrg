import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProcessCarousel from '../../components/ProcessCarousel';
import '../../styles/SharedStyles.css';
import Footer from '../../components/Footer';

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="section-card" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        background: 'linear-gradient(120deg, #e0e7ef 60%, #f8fafc 100%)',
        boxShadow: '0 4px 24px 0 rgba(30,58,138,0.08)',
        padding: '2.5rem 2rem',
        borderRadius: '2rem',
        marginBottom: '2.5rem',
        minHeight: 260
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', color: '#1e3a8a', fontWeight: 900, marginBottom: '1.1rem' }}>How It Works</h1>
          <p style={{ fontSize: '1.18rem', color: '#334155', marginBottom: '1.7rem', fontWeight: 500 }}>
            From first click to a happier home—see how easy it is to get started!
          </p>
        </div>
        <img src="/images/Resources/family-kid-management.jpg" alt="How it works hero" style={{ width: 260, height: 180, objectFit: 'cover', borderRadius: '1.2rem', boxShadow: '0 2px 12px rgba(30,58,138,0.10)' }} />
      </div>

      {/* Stepper above Process Carousel */}
      <div style={{ maxWidth: 900, margin: '0 auto 2.5rem auto', background: '#f8fafc', borderRadius: '1.5rem', padding: '1.5rem 1rem', boxShadow: '0 2px 12px rgba(30,58,138,0.06)' }}>
        <h2 style={{ color: '#1e3a8a', fontWeight: 800, fontSize: '2rem', textAlign: 'center', marginBottom: '1.2rem' }}>Our Process</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '2.2rem', flexWrap: 'nowrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 90 }}>
            <span style={{ fontSize: '2.1rem', color: '#2563eb', marginBottom: 6 }}>👤</span>
            <span style={{ color: '#1e3a8a', fontWeight: 700, fontSize: '1.05rem', textAlign: 'center' }}>Create Account</span>
          </div>
          <div style={{ height: 3, background: '#2563eb', width: 32, alignSelf: 'center', borderRadius: 2 }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 90 }}>
            <span style={{ fontSize: '2.1rem', color: '#2563eb', marginBottom: 6 }}>📝</span>
            <span style={{ color: '#1e3a8a', fontWeight: 700, fontSize: '1.05rem', textAlign: 'center' }}>Submit Application</span>
          </div>
          <div style={{ height: 3, background: '#2563eb', width: 32, alignSelf: 'center', borderRadius: 2 }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 90 }}>
            <span style={{ fontSize: '2.1rem', color: '#2563eb', marginBottom: 6 }}>🏠</span>
            <span style={{ color: '#1e3a8a', fontWeight: 700, fontSize: '1.05rem', textAlign: 'center' }}>Home Assessment</span>
          </div>
          <div style={{ height: 3, background: '#2563eb', width: 32, alignSelf: 'center', borderRadius: 2 }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 90 }}>
            <span style={{ fontSize: '2.1rem', color: '#2563eb', marginBottom: 6 }}>🤝</span>
            <span style={{ color: '#1e3a8a', fontWeight: 700, fontSize: '1.05rem', textAlign: 'center' }}>Get Matched</span>
          </div>
          <div style={{ height: 3, background: '#2563eb', width: 32, alignSelf: 'center', borderRadius: 2 }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 90 }}>
            <span style={{ fontSize: '2.1rem', color: '#2563eb', marginBottom: 6 }}>🏡</span>
            <span style={{ color: '#1e3a8a', fontWeight: 700, fontSize: '1.05rem', textAlign: 'center' }}>Enjoy!</span>
          </div>
        </div>
        <ProcessCarousel />
      </div>

      {/* FAQ Link Section */}
      <div className="section-card cta-box">
        <h2>Still Have Questions?</h2>
        <div className="faq-buttons">
          <button onClick={() => navigate('/faq')} className="cta-button">Visit Our FAQ</button>
          <button onClick={() => navigate('/contact')} className="cta-button">Contact Us</button>
        </div>
      </div>

      {/* CTA */}
      <div className="section-card cta-box">
        <h2>Ready to take the next step?</h2>
        <button onClick={() => navigate('/contact')} className="cta-button">Book Appointment</button>
      </div>

    </div>
  );
};

export default HowItWorks;
