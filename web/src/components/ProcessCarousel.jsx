import React, { useState, useEffect, useRef } from 'react';

const steps = [
  { step: 1, title: "Create Account", description: "Tell us about your household and what you're looking for." },
  { step: 2, title: "Submit Application", description: "Give us a better picture of your needs and preferences." },
  { step: 3, title: "On-site Home & Needs Assessment", description: "We'll visit your home to learn how we can help." },
  { step: 4, title: "Get Matched with a Dedicated Home Manager", description: "We'll pair you with someone who fits your needs." },
  { step: 5, title: "Enjoy Peace of Mind", description: "Let us take care of the rest so you can focus on what matters." }
];

const AUTO_SLIDE_DELAY = 5000;

const ProcessCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const next = () => {
    setCurrent((prev) => (prev + 1) % steps.length);
    resetTimeout();
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + steps.length) % steps.length);
    resetTimeout();
  };

  const resetTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % steps.length);
    }, AUTO_SLIDE_DELAY);
  };

  useEffect(() => {
    resetTimeout();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <>
      <style>{`
        .process-carousel {
          padding: 2rem 1rem;
          text-align: center;
          background-color: #f9fafb;
          position: relative;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        
        .process-carousel h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #1e3a8a;
        }
        
        .carousel-wrapper {
          position: relative;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 280px;
          padding: 0 3rem;
          box-sizing: border-box;
        }
        
        .nav-arrow {
          background-color: #1e3a8a;
          color: white;
          font-size: 1.5rem;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.2s ease;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .nav-arrow:hover {
          background-color: #374151;
        }
        
        .nav-arrow.left {
          left: 0;
        }
        
        .nav-arrow.right {
          right: 0;
        }
        
        .step-card {
          background-color: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 500px;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .step-number {
          font-size: 1rem;
          font-weight: bold;
          background-color: #a7f3d0;
          color: #065f46;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          margin-bottom: 1rem;
          white-space: nowrap;
        }
        
        .step-card h3 {
          font-size: 1.3rem;
          color: #1e3a8a;
          margin-bottom: 0.75rem;
          text-align: center;
        }
        
        .step-card p {
          font-size: 1rem;
          color: #4b5563;
          text-align: center;
          max-width: 90%;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .process-carousel {
            padding: 1.5rem 0.5rem;
          }
        
          .process-carousel h2 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }
        
          .carousel-wrapper {
            padding: 0 2.5rem;
            min-height: 240px;
          }
        
          .nav-arrow {
            width: 32px;
            height: 32px;
            font-size: 1.2rem;
          }
        
          .step-card {
            padding: 1.5rem;
            min-height: 180px;
          }
        
          .step-card h3 {
            font-size: 1.1rem;
          }
        
          .step-card p {
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 480px) {
          .process-carousel {
            padding: 1rem 0.25rem;
          }
        
          .carousel-wrapper {
            padding: 0 2rem;
            min-height: 200px;
          }
        
          .nav-arrow {
            width: 28px;
            height: 28px;
            font-size: 1rem;
          }
        
          .step-card {
            padding: 1.25rem;
            min-height: 160px;
          }
        
          .step-number {
            font-size: 0.9rem;
            padding: 0.4rem 1rem;
          }
        
          .step-card h3 {
            font-size: 1rem;
          }
        
          .step-card p {
            font-size: 0.85rem;
          }
        }
      `}</style>
      <div className="process-carousel">
        <h2>Our Process</h2>
        <div className="carousel-wrapper">
          <button className="nav-arrow left" onClick={prev}>&lt;</button>
          <div className="step-card">
            <div className="step-number">Step {steps[current].step}</div>
            <h3>{steps[current].title}</h3>
            <p>{steps[current].description}</p>
          </div>
          <button className="nav-arrow right" onClick={next}>&gt;</button>
        </div>
      </div>
    </>
  );
};

export default ProcessCarousel;
