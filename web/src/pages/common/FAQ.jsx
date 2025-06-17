import React, { useState } from 'react';
import faqData from '../../data/faq.json';
import '../../styles/SharedStyles.css';
import Footer from '../../components/Footer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <>
      <style>{`
        .faq-page {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background: #f8fafc;
          border-radius: 1.5rem;
          box-shadow: 0 4px 16px rgba(30,58,138,0.07);
        }
        
        .faq-container {
          margin-top: 2rem;
        }
        
        .faq-item {
          margin-bottom: 1.5rem;
          background: #fff;
          border-radius: 1rem;
          box-shadow: 0 2px 8px rgba(30,58,138,0.08);
          transition: box-shadow 0.2s;
          border: 1.5px solid #e2e8f0;
        }
        .faq-item:hover {
          box-shadow: 0 6px 18px rgba(30,58,138,0.13);
          border-color: #2563eb;
        }
        
        .faq-question {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          font-size: 1.18rem;
          padding: 1.2rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          cursor: pointer;
          color: #1e3a8a;
          border-radius: 1rem;
          transition: background 0.18s;
        }
        .faq-question:hover, .faq-question:focus {
          background: #e0e7ff;
          outline: none;
        }
        .faq-icon {
          font-size: 1.5rem;
          color: #2563eb;
          margin-left: 1rem;
          transition: transform 0.2s;
        }
        .faq-question[aria-expanded="true"] .faq-icon {
          transform: rotate(45deg);
        }
        
        .faq-answer {
          padding: 0 1.5rem 1.2rem 1.5rem;
          color: #334155;
          font-size: 1.08rem;
          line-height: 1.7;
          animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .faq-page h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 1.5rem;
          text-align: center;
        }
      `}</style>
      <div className="faq-page">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqData.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button 
                onClick={() => toggle(idx)} 
                className="faq-question"
                aria-expanded={openIndex === idx}
              >
                {item.question}
                <span className="faq-icon">{openIndex === idx ? '➖' : '➕'}</span>
              </button>
              {openIndex === idx && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
