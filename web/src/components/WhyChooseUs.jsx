import React from 'react';

const items = [
  { img: '/images/Common/StayOrganized.jpg', title: 'Stay Organized', text: 'Custom systems that bring peace to your daily routine.' },
  { img: '/images/Common/SaveTime.jpg', title: 'Save Time', text: 'Streamlined solutions so you can focus on what matters most.' },
  { img: '/images/Common/ReduceStress.jpg', title: 'Reduce Stress', text: 'Let go of chaos and reclaim your calm.' },
  { img: '/images/Common/FeelSupported.jpg', title: 'Feel Supported', text: 'Guidance that fits your lifestyle and your goals.' }
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us feminine-why-choose-us">
      <style>{`
        .feminine-why-choose-us {
          padding: 2.2rem 1.2rem 1.2rem 1.2rem;
          background: var(--primary-bg);
          border-radius: 2.2rem;
          margin: 1.2rem auto 0.7rem auto;
          max-width: 1100px;
          box-shadow: var(--card-shadow);
          border: none;
          text-align: center;
        }
        .feminine-why-choose-us h2 {
          color: var(--primary-color);
          font-size: 2.1rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }
        .why-item {
          background: var(--card-bg);
          border-radius: 1.5rem;
          box-shadow: 0 4px 16px var(--card-shadow);
          padding: 1.5rem 1rem 1.2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: box-shadow 0.18s, transform 0.18s;
        }
        .why-item:hover {
          box-shadow: 0 8px 32px var(--card-shadow);
          transform: translateY(-4px) scale(1.03);
        }
        .why-item img {
          height: 110px;
          width: 110px;
          object-fit: cover;
          border-radius: 1rem;
          margin-bottom: 0.7rem;
          box-shadow: 0 2px 8px var(--card-shadow);
        }
        .why-item h3 {
          color: var(--primary-color);
          font-size: 1.25rem;
          margin-bottom: 0.3rem;
          font-weight: 700;
        }
        .why-item p {
          color: var(--primary-text);
          font-size: 1.08rem;
          margin: 0;
        }
        @media (max-width: 900px) {
          .feminine-why-choose-us {
            padding: 1.2rem 0.5rem 0.7rem 0.5rem;
            border-radius: 1.2rem;
          }
          .why-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.7rem;
          }
          .why-item img {
            height: 80px;
            width: 80px;
          }
        }
        @media (max-width: 600px) {
          .feminine-why-choose-us {
            padding: 0.7rem 0.1rem 0.2rem 0.1rem;
            border-radius: 0.7rem;
          }
          .why-grid {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          .why-item img {
            height: 60px;
            width: 60px;
          }
        }
      `}</style>
      <h2>Why Choose Us?</h2>
      <div className="why-grid">
        {items.map((item, i) => (
          <div className="why-item" key={i}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
