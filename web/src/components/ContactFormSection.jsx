import React from 'react';

const ContactFormSection = () => (
  <>
    <style>{`
      .contact-form-section {
        display: flex;
        flex-wrap: wrap;
        padding: 3rem 2rem;
        gap: 2rem;
      }
      
      .form-image {
        flex: 1;
        max-width: 500px;
        text-align: center;
      }
      
      .form-image img {
        width: 100%;
        border-radius: 50%;
        margin-bottom: 1rem;
      }
      
      .form-image h2 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
      }
      
      .form-image p {
        font-size: 1rem;
        color: #555;
      }
      
      .form-fields {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .form-row {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      
      .form-fields input,
      .form-fields select,
      .form-fields textarea {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
        flex: 1;
        min-width: 250px;
      }
      
      .form-fields textarea {
        resize: vertical;
      }
      
      .captcha-placeholder {
        margin-top: 1rem;
        padding: 1rem;
        border: 1px dashed #aaa;
        text-align: center;
        color: #999;
      }
      
      .form-fields button {
        padding: 0.75rem;
        font-size: 1rem;
        background-color: #111;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 1rem;
      }
    `}</style>
    <section id="contact-form" className="contact-form-section">
      <div className="form-image">
        <img src="/images/contact-form.jpg" alt="Keyboard" />
        <h2>Ready to get started?</h2>
        <p>Tell us about yourself, and we'll help you get started. Success starts now!</p>
      </div>

      <form className="form-fields">
        <div className="form-row">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <div className="form-row">
          <input type="tel" placeholder="+1 (XXX) XXX - XXXX" required />
          <input type="email" placeholder="example@mail.com" required />
        </div>
        <div className="form-row">
          <select required>
            <option value="">Select Service</option>
            <option value="coaching">Coaching</option>
            <option value="consulting">Consulting</option>
            <option value="speaking">Speaking</option>
          </select>
        </div>
        <input type="text" placeholder="How did you hear about us?" />
        <textarea placeholder="How can we help you?" rows="4" maxLength="100" />
        <label>
          <input type="checkbox" />
          By providing your email address, you accept to receive marketing emails. You can unsubscribe at any time.
        </label>
        <div className="captcha-placeholder">[ CAPTCHA HERE ]</div>
        <button type="submit">Let's Do This</button>
      </form>
    </section>
  </>
);

export default ContactFormSection;
