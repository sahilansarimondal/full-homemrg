import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SharedStyles.css';
import Footer from '../../components/Footer';

const AboutUs = () => {
  return (
    <>
      <style>{`
        .about-section p {
          margin-bottom: 1.5rem;
          font-family: 'Aptos', 'Segoe UI', sans-serif;
          line-height: 1.8;
        }

        .about-section p:last-child {
          margin-bottom: 0;
        }

        .about-section h1,
        .about-section h2 {
          font-family: 'Aptos', 'Segoe UI', sans-serif;
          margin-bottom: 1.5rem;
        }

        .about-section ul {
          margin-bottom: 1.5rem;
        }

        .about-section ul li {
          margin-bottom: 0.75rem;
          font-family: 'Aptos', 'Segoe UI', sans-serif;
        }

        .leaders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .leader-card {
          background: #fff;
          border: 2px solid var(--primary-color);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .leader-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(30, 58, 138, 0.15);
        }

        .leader-photo {
          width: 120px;
          height: 120px;
          background: var(--primary-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .leader-card h3 {
          color: var(--primary-color);
          font-size: 1.25rem;
          margin: 0;
          font-family: 'Aptos', 'Segoe UI', sans-serif;
        }

        .leader-card p {
          color: #666;
          margin: 0;
          font-size: 1rem;
          font-family: 'Aptos', 'Segoe UI', sans-serif;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .social-links a {
          color: var(--primary-color);
          text-decoration: none;
          font-size: 1.25rem;
          transition: color 0.3s ease;
        }

        .social-links a:hover {
          color: var(--secondary-color);
        }

        @media (max-width: 768px) {
          .leaders-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
      <div className="page-wrapper">
        <div className="section-card about-section">
          <h1>Our Story</h1>
          <p>
            At Home Manager, we believe that a peaceful home is the foundation for a thriving life. Our journey began with a simple question: <em>"What if managing your home didn't have to feel overwhelming?"</em> From that idea, we built a service designed to support modern households; from busy professionals and overwhelmed parents to anyone craving more structure and serenity in their space.
          </p>
          <p>
            What started as a personal mission to bring calm to the chaos of daily life has evolved into a trusted solution for hundreds of families. We've helped clients reclaim their time, reduce mental load, and create homes that feel lighter, more functional, and more aligned with their goals. Every space we touch is managed with purpose, care, and an unwavering commitment to our clients' well-being.
          </p>
        </div>
        <div className="section-card about-section">
          <h2>Our Mission: Your Peace, Your Plan</h2>
          <p>
            We're more than organizers; we're partners in your home life. Our mission is to deliver peace of mind through comprehensive, hands-on home management services tailored to your lifestyle.
          </p>
          <p>
            Whether it's creating streamlined systems, managing daily upkeep, or supporting your long-term goals, we're here to listen, plan, and walk beside you every step of the way. We offer solutions that are practical, compassionate, and completely personalized — because we know that no two homes (or families) are the same.
          </p>
        </div>
        <div className="section-card about-section">
          <h2>Who We Serve</h2>
          <ul>
            <li>Busy families juggling routines</li>
            <li>Working professionals craving home structure</li>
            <li>Senior adults seeking support & systems</li>
            <li>Anyone looking to make life at home easier</li>
          </ul>
        </div>
        <div className="section-card about-section">
          <h2>Meet Our Leadership Team</h2>
          <div className="leaders-grid">
            {['Jane Doe', 'Mark Rivera', 'Ali Morgan'].map((name, idx) => (
              <div key={idx} className="leader-card">
                <div className="leader-photo">{name.split(' ').map(n => n[0]).join('')}</div>
                <h3>{name}</h3>
                <p>Title Placeholder</p>
                <div className="social-links">
                  <a href="#" aria-label="LinkedIn">🔗</a>
                  <a href="#" aria-label="Twitter">🐦</a>
                  <a href="#" aria-label="Email">✉️</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="section-card cta-box about-section">
          <h2>Have Questions or Ready to Start?</h2>
          <p>Experience effortless home management with a team that has your back.</p>
          <Link to="/contact#contact-form" className="cta-button">Contact Us</Link>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
