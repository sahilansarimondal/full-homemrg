import React from 'react';
import { Link } from 'react-router-dom';

const quickLinks = [
  {
    image: '/images/contact-faq.jpg',
    title: 'Questions?',
    button: 'Read Our FAQs',
    link: '/faq',
    external: true,
  },
  {
    image: '/images/contact-careers.jpg',
    title: 'Want to work with us?',
    button: 'View Our Careers',
    link: '/careers',
    external: true,
  },
  {
    image: '/images/contact-chat.jpg',
    title: "Let's chat!",
    button: 'Contact Us',
    link: '/contact-us#contact-form', // ✅ Correct anchor
    external: false,
  }
];

const ContactQuickLinks = () => (
  <>
    <style>{`
      .contact-quick-links {
        padding: 4rem 1rem;
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
      }

      .contact-quick-links h2 {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 3rem;
        color: #111;
      }

      .quick-link-grid {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: nowrap; /* Keep them on one row */
        gap: 2rem;
      }

      .quick-card {
        flex: 1;
        min-width: 0;
        max-width: 300px;
        background: #fff;
        border-radius: 12px;
        text-align: center;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease;
      }

      .quick-card:hover {
        transform: translateY(-5px);
      }

      .quick-card img {
        width: 180px;
        height: 180px;
        object-fit: cover;
        border-radius: 50%;
        margin-bottom: 1rem;
      }

      .quick-card p {
        font-size: 1rem;
        margin-bottom: 1rem;
        font-weight: 500;
        color: #333;
      }

      .quick-btn {
        display: inline-block;
        padding: 0.5rem 1.25rem;
        border: 1px solid #1e3a8a;
        color: #1e3a8a;
        font-weight: 600;
        font-size: 0.95rem;
        border-radius: 6px;
        text-decoration: none;
        transition: all 0.2s ease;
      }

      .quick-btn:hover {
        background-color: #1e3a8a;
        color: #fff;
      }
    `}</style>
    <section className="contact-quick-links">
      <h2>How can we help?</h2>
      <div className="quick-link-grid">
        {quickLinks.map((item, idx) => (
          <div className="quick-card" key={idx}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            {item.external ? (
              <Link to={item.link} className="quick-btn">{item.button}</Link>
            ) : (
              <a href={item.link} className="quick-btn">{item.button}</a>
            )}
          </div>
        ))}
      </div>
    </section>
  </>
);

export default ContactQuickLinks;
