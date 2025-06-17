import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/SharedStyles.css';
import Footer from '../../components/Footer';

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .get-started-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
          background: #1e3a8a;
          border-radius: 2.2rem;
          box-shadow: 0 8px 32px 0 rgba(30, 58, 138, 0.10);
        }
        .get-started-card {
          background: #fff;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px 0 rgba(30, 58, 138, 0.08);
          padding: 2.5rem 2.5rem 2.5rem 2.5rem;
          max-width: 900px;
          margin: 2rem auto;
        }
        .hero-section {
          text-align: center;
          background: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0;
        }
        .hero-image {
          width: 100%;
          max-width: 420px;
          border-radius: 1.2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 24px rgba(30,58,138,0.08);
        }
        .hero-section h1 {
          font-size: 2.3rem;
          color: #1E3A8A;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        .hero-subtitle {
          font-size: 1.18rem;
          color: #374151;
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-cta {
          background: #1E3A8A;
          color: #fff;
          font-size: 1.18rem;
          font-weight: 600;
          padding: 1rem 2.2rem;
          border: none;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(30,58,138,0.09);
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 0.5rem;
          text-decoration: none;
          display: inline-block;
        }
        .hero-cta:hover {
          background: #0b66ff;
          color: #fff;
          box-shadow: 0 4px 16px rgba(30,58,138,0.13);
          transform: translateY(-2px);
        }
        .process-section {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          margin: 0;
          justify-content: center;
          background: none;
          box-shadow: none;
          padding: 0;
        }
        .process-card {
          flex: 1 1 260px;
          max-width: 340px;
          background: #f8fafc;
          padding: 2rem 1.2rem 1.5rem 1.2rem;
          border-radius: 1.2rem;
          box-shadow: 0 4px 16px rgba(30,58,138,0.12);
          border: 2px solid #38bdf8;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.2rem;
          transition: box-shadow 0.18s, transform 0.18s, border-color 0.18s;
        }
        .process-step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.2rem;
          height: 2.2rem;
          background: #38bdf8;
          color: #fff;
          font-weight: 700;
          font-size: 1.3rem;
          border-radius: 50%;
          margin-bottom: 0.7rem;
          box-shadow: 0 2px 8px rgba(30,58,138,0.10);
          border: 2px solid #0ea5e9;
        }
        .process-card:hover {
          box-shadow: 0 8px 32px rgba(30,58,138,0.18);
          border-color: #0ea5e9;
          transform: translateY(-4px) scale(1.03);
        }
        .process-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .process-card h2 {
          font-size: 1.25rem;
          color: #1E3A8A;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        .process-card p {
          color: #374151;
          font-size: 1.08rem;
          margin-bottom: 1.2rem;
        }
        .process-btn {
          background: #1E3A8A;
          color: #fff;
          font-size: 1.08rem;
          font-weight: 600;
          padding: 0.85rem 1.5rem;
          border: none;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(30,58,138,0.07);
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .process-btn:hover {
          background: #0b66ff;
          color: #fff;
          box-shadow: 0 4px 16px rgba(30,58,138,0.13);
          transform: translateY(-2px);
        }
        .account-info-section {
          background: #e0e7ff;
          padding: 2.5rem 1.2rem;
          text-align: center;
          border-radius: 1.2rem;
          margin: 0 auto;
          max-width: 700px;
          box-shadow: 0 2px 8px rgba(30,58,138,0.07);
        }
        .account-info-section h2 {
          font-size: 1.35rem;
          color: #1E3A8A;
          margin-bottom: 0.7rem;
          font-weight: 700;
        }
        .account-info-section p {
          color: #374151;
          font-size: 1.08rem;
          margin-bottom: 0;
        }
        @media (max-width: 900px) {
          .process-section {
            gap: 1rem;
          }
          .process-card {
            max-width: 100%;
            padding: 1.2rem 0.7rem 1rem 0.7rem;
          }
        }
        @media (max-width: 768px) {
          .get-started-page {
            padding: 1rem;
          }
          .get-started-card {
            padding: 1.2rem 0.7rem;
          }
          .account-info-section {
            padding: 1.2rem 0.7rem;
          }
        }
      `}</style>
      <div className="get-started-page">
        {/* Hero Section */}
        <div className="get-started-card">
          <section className="hero-section">
            <img src="/images/Common/GetStarted.jpg" alt="Get Started" className="hero-image" />
            <h1>Let's get your home managed in motion.</h1>
            <p className="hero-subtitle">It only takes a few minutes to set up your account and start simplifying your life.</p>
            <Link to="/signup" className="hero-cta">Get Started Now</Link>
          </section>
        </div>
        {/* Process Section */}
        <div className="get-started-card">
          <section className="process-section">
            <div className="process-card">
              <div className="process-step-number">1</div>
              <div className="process-icon">📝</div>
              <h2>Create Your Account</h2>
              <p>Tell us a little about yourself and your household needs.</p>
              <Link to="/signup" className="process-btn">Create Account</Link>
            </div>
            <div className="process-card">
              <div className="process-step-number">2</div>
              <div className="process-icon">⚙️</div>
              <h2>Customize Your Preferences</h2>
              <p>Choose your services, set your schedule, and select a manager who matches your style.</p>
            </div>
            <div className="process-card">
              <div className="process-step-number">3</div>
              <div className="process-icon">🤝</div>
              <h2>On-Site Visit & Matching</h2>
              <p>Get matched, onboard together, and start simplifying your day-to-day.</p>
            </div>
          </section>
        </div>
        {/* Info Section */}
        <div className="get-started-card">
          <section className="account-info-section">
            <h2>Why Create an Account?</h2>
            <p>
              We ask every client to create an account to keep your preferences, calendar, and communication all organized
              in one place — helping us deliver a more seamless, personalized experience.
            </p>
          </section>
        </div>
      </div>

    </>
  );
};

export default GetStarted;
