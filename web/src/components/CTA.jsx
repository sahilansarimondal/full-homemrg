import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [thankYou, setThankYou] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setThankYou(true);
    setName('');
    setEmail('');
    setTimeout(() => {
      setThankYou(false);
      setShowModal(false);
    }, 2000);
  };

  const closeModal = (e) => {
    if (!e || e.target.className === 'modal-overlay' || e.target.className === 'close-modal-btn') {
      setShowModal(false);
      setThankYou(false);
    }
  };

  return (
    <div className="cta-section">
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(30, 41, 58, 0.7);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-content {
          background: #fff;
          border-radius: 1.2rem;
          max-width: 340px;
          width: 95vw;
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          box-shadow: 0 8px 32px rgba(30,41,59,0.18);
          position: relative;
          text-align: center;
          animation: popIn 0.3s cubic-bezier(.4,2,.6,1);
        }
        @keyframes popIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .close-modal-btn {
          position: absolute;
          top: 0.7rem;
          right: 1.1rem;
          background: none;
          border: none;
          font-size: 1.7rem;
          color: #1e3a8a;
          cursor: pointer;
        }
        .newsletter-form input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.7rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        .newsletter-form button[type="submit"] {
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.7rem 1.5rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.2s;
        }
        .newsletter-form button[type="submit"]:hover {
          background: #1d4ed8;
        }
        .thank-you {
          margin-top: 1rem;
          background: #2563eb;
          color: #fff;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
          animation: fadeInOut 2.5s;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
      <h2>
        Want to stay updated with the latest Tips &amp; Helpful information... 
        Join our Newsletter
      </h2>
      <button className="cta-button" onClick={() => setShowModal(true)}>
        Join Newsletter
      </button>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal} tabIndex={-1} aria-modal="true" role="dialog">
          <div className="modal-content">
            <button className="close-modal-btn" onClick={closeModal} aria-label="Close">&times;</button>
            <h3 style={{ marginBottom: '1rem', color: '#1e3a8a' }}>Subscribe to our Newsletter</h3>
            {thankYou ? (
              <div className="thank-you">Thank you for subscribing!</div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CTA;
