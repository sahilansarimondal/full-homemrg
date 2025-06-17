import React from 'react';

const ContactHero = () => (
  <>
    <style>{`
      .contact-hero {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 3rem 2rem;
        gap: 2rem;
        background-color: #f9f9f9;
      }
      
      .contact-hero-text {
        flex: 1;
      }
      
      .contact-hero-text h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      
      .contact-hero-text p {
        font-size: 1rem;
        color: #333;
      }
      
      .contact-hero-image {
        flex: 1;
        text-align: right;
      }
      
      .contact-hero-image img {
        max-width: 100%;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
      }
    `}</style>
    <section className="contact-hero">
      <div className="contact-hero-text">
        <h1>Contact us.</h1>
        <p>
          For more information about our services, call <a href="tel:6292054848">(629) 205–4848</a> 
          or fill out the form below. Someone will respond shortly!
        </p>
      </div>
      <div className="contact-hero-image">
        <img src="/images/contact-hero.jpg" alt="Group high five" />
      </div>
    </section>
  </>
);

export default ContactHero;
