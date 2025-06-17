import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/SharedStyles.css';
import Footer from '../../components/Footer';

const quickLinks = [
  { img: '/images/Common/lets_chat.jpg', label: "Let's Chat", link: '#contact-form' },
  { img: '/images/Common/GroupHighFive.jpg', label: 'Questions?', link: '/faq' },
  { img: '/images/Common/work-with-us.jpg', label: 'Work With Us', link: '/careers' },
];

const ContactUs = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact-form') {
      setTimeout(() => {
        const target = document.getElementById('contact-form');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location]);

  return (
    <>
      <div className="page-wrapper">
        {/* Hero Section */}
        <div className="section-card">
          <div className="contact-hero">
            <img src="/images/Common/Happyfamily_organizedhome.jpg" alt="Contact Us" className="contact-hero-img" />
            <div className="contact-hero-text">
              <h1>Contact Us</h1>
              <p>We're here to help you simplify, organize, and thrive at home. Reach out with questions, ideas, or just to say hello!</p>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="section-card">
          <h2>How Can We Help?</h2>
          <div className="quick-links-grid">
            {quickLinks.map((q, idx) => (
              <a href={q.link} className="quick-link-card" key={idx}>
                <img src={q.img} alt={q.label} />
                <span>{q.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="section-card" id="contact-form">
          <div className="contact-form-info">
            <h2>Let's Get in Touch</h2>
            <p>Fill out the form and our team will get back to you as soon as possible. We love helping you feel supported!</p>
            <img src="/images/Common/FeelSupported.jpg" alt="Feel Supported" className="contact-form-img" />
          </div>
          <form className="contact-form">
            <label>Name</label>
            <input type="text" placeholder="Your Name" required />
            <label>Email</label>
            <input type="email" placeholder="you@email.com" required />
            <label>Message</label>
            <textarea placeholder="How can we help you?" rows={5} required />
            <button type="submit" className="cta-button">Send Message</button>
          </form>
        </div>
      </div>

    </>
  );
};

export default ContactUs;
