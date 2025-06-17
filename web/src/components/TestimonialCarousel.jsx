import React, { useState, useEffect, useRef } from 'react';
import testimonials from '../data/testimonials.json';

const LeftChevron = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38b48e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const RightChevron = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38b48e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
);

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearTimeout(timerRef.current);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  // Show at most 5 dots, always show current as active
  const getDots = () => {
    if (length <= 5) {
      return Array.from({ length }, (_, i) => i);
    }
    if (current < 2) {
      return [0, 1, 2, 3, 4];
    }
    if (current > length - 3) {
      return [length - 5, length - 4, length - 3, length - 2, length - 1];
    }
    return [current - 2, current - 1, current, current + 1, current + 2];
  };

  const dots = getDots();

  return (
    <section className="testimonial-carousel feminine-testimonial-carousel">
      <style>{`
        .feminine-testimonial-carousel {
          padding: 2.2rem 1.2rem 1.2rem 1.2rem;
          background: var(--primary-bg);
          border-radius: 2.2rem;
          margin: 1.2rem auto 0.7rem auto;
          max-width: 900px;
          box-shadow: var(--card-shadow);
          border: none;
          text-align: center;
        }
        .feminine-testimonial-carousel h2 {
          color: var(--primary-color);
          font-size: 2.1rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }
        .testimonial-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          max-width: 700px;
          margin: 0 auto 1.2rem auto;
          flex-direction: column;
        }
        .testimonial-card {
          background: var(--card-bg);
          border-radius: 1.5rem;
          box-shadow: 0 4px 16px var(--card-shadow);
          padding: 2rem 1.2rem 1.2rem 1.2rem;
          max-width: 600px;
          margin: 0 auto 0.7rem auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .quote {
          font-style: italic;
          font-size: 1.25rem;
          color: var(--primary-text);
        }
        .name {
          margin-top: 1rem;
          font-weight: bold;
          color: var(--primary-color);
        }
        .carousel-dots {
          margin-top: 0.5rem;
          margin-bottom: 0.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.7rem;
        }
        .arrow {
          font-size: 2rem;
          background: var(--accent-color);
          border: none;
          cursor: pointer;
          color: var(--primary-color);
          transition: background 0.2s, color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0.2em;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
        }
        .arrow:hover {
          background: var(--secondary-color);
          color: #fff;
        }
        .dot {
          display: inline-block;
          height: 12px;
          width: 12px;
          margin: 0 5px;
          border-radius: 50%;
          background-color: var(--accent-color);
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .dot.active {
          background-color: var(--primary-color);
        }
        @media (max-width: 900px) {
          .feminine-testimonial-carousel {
            padding: 1.2rem 0.5rem 0.7rem 0.5rem;
            border-radius: 1.2rem;
          }
          .testimonial-card {
            padding: 1.2rem 0.7rem 0.7rem 0.7rem;
            border-radius: 1.2rem;
          }
        }
        @media (max-width: 600px) {
          .feminine-testimonial-carousel {
            padding: 0.7rem 0.1rem 0.2rem 0.1rem;
            border-radius: 0.7rem;
          }
          .testimonial-card {
            padding: 0.7rem 0.2rem 0.5rem 0.2rem;
            border-radius: 0.7rem;
          }
        }
      `}</style>
      <h2>What Our Community Is Saying</h2>
      <div className="testimonial-wrapper">
        <div className="testimonial-card">
          <p className="quote">“{testimonials[current].quote}”</p>
          <p className="name">— {testimonials[current].name}, {testimonials[current].location}</p>
        </div>
      </div>
      <div className="carousel-dots">
        <button className="arrow left" onClick={prevSlide} aria-label="Previous testimonial"><LeftChevron /></button>
        {dots.map((idx) => (
          <span
            key={idx}
            className={`dot${idx === current ? ' active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
        <button className="arrow right" onClick={nextSlide} aria-label="Next testimonial"><RightChevron /></button>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
