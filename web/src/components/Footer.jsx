import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    // First navigate to the path
    navigate(path);
    
    // Then scroll to top after a small delay to ensure the navigation is complete
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }, 100);
  };

  return (
    <>
      <style>{`
        .footer, .footer.new-footer-layout {
          background: #000;
          color: #fff;
          border-top: none;
          position: relative;
          left: 0;
          bottom: 0;
          z-index: 100;
          box-sizing: border-box;
          margin: 0;
          padding: 2rem 1rem 1rem;
          text-align: center;
          width: 100%;
          position: relative;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .footer-content {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-col.left {
          text-align: center;
        }

        .footer-logo-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.2rem;
        }

        .footer-logo {
          height: 2rem;
          width: 2rem;
          object-fit: contain;
        }

        .footer-brand {
          font-size: 1.08rem;
          font-weight: 700;
          color: #fff !important;
          margin-bottom: 0;
        }

        .footer-col h4 {
          color: #fff;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-col ul li {
          margin-bottom: 0.5rem;
        }

        .footer-col ul li a {
          color: var(--accent-color);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .footer-col ul li a:hover {
          color: #fff;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        .social-icons a {
          color: var(--accent-color);
          font-size: 1.25rem;
          transition: color 0.3s ease;
        }

        .social-icons a:hover {
          color: #fff;
        }

        .quick-actions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 0.5rem 0;
        }

        .dropdown-icon {
          font-size: 0.75rem;
          transition: transform 0.3s ease;
        }

        .dropdown-icon.open {
          transform: rotate(180deg);
        }

        .quick-actions-links {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .quick-actions-links.open {
          max-height: 500px;
        }

        .footer-bottom {
          max-width: 1280px;
          margin: 2rem auto 0;
          padding-top: 2rem;
          padding-bottom: 0;
          border-top: 1px solid #374151;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
        }

        .footer-bottom p {
          color: #9CA3AF;
          font-size: 0.875rem;
        }

        .footer-bottom-links {
          display: flex;
          gap: 1.5rem;
        }

        .footer-bottom-links a {
          color: #9CA3AF;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: white;
        }

        .footer-main-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0.25rem 1rem;
          min-height: 48px;
          gap: 0.5rem;
          width: 100%;
        }

        .footer-col.left {
          flex: 0 0 auto;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          margin-bottom: 0;
        }

        .footer-address {
          color: #bfc5ce;
          font-style: normal;
          font-size: 0.85rem;
          margin-bottom: 0;
          line-height: 1.1;
        }

        .footer-nav {
          flex: 1 1 auto;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 1.1rem;
          min-width: 0;
        }

        .footer-nav a, .footer-dropdown-toggle {
          color: #fff;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 400;
          transition: color 0.2s, background 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.35em 0.7em;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.2em;
          line-height: 1.1;
        }

        .footer-nav a:hover, .footer-dropdown-toggle:hover, .footer-dropdown-toggle:focus {
          color: var(--accent-color);
          background: var(--secondary-color);
          outline: none;
        }

        .footer-dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-arrow {
          font-size: 0.85em;
          margin-left: 0.2em;
          transition: transform 0.2s;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        .footer-dropdown-menu {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          bottom: 80px;
          max-width: 350px;
          width: 95vw;
          background: var(--secondary-color);
          border-radius: 0.9em;
          box-shadow: 0 8px 32px rgba(30,41,59,0.18);
          z-index: 2100;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 0.7em 0 0.7em 0;
          overflow-y: auto;
        }

        .footer-dropdown-menu ul {
          margin: 0;
          padding: 0;
        }

        .footer-dropdown-menu li {
          list-style: none;
        }

        .footer-dropdown-menu a {
          display: block;
          padding: 0.85em 1.3em;
          color: #fff;
          text-decoration: none;
          font-size: 1.08rem;
          border-radius: 0.4em;
          transition: background 0.18s, color 0.18s;
          text-align: left;
        }

        .footer-dropdown-menu a:hover,
        .footer-dropdown-menu a:focus {
          background: var(--accent-color);
          color: var(--primary-color);
        }

        .footer-dropdown-divider {
          border: none;
          border-top: 1px solid #353a40;
          margin: 0.5em 0 0.5em 0;
          width: 90%;
          align-self: center;
        }

        .dropdown-login-btn {
          width: auto;
          margin: 0 1.3em;
          margin-top: 0.5em;
          padding: 0.85em 1.5em;
          background: #0b66ff;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 1.08rem;
          font-weight: 600;
          text-align: left;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          display: block;
        }

        .dropdown-login-btn:hover,
        .dropdown-login-btn:focus {
          background: #084fc7;
          color: #fff;
        }

        .footer-social {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.7rem;
          min-width: 0;
        }

        .footer-social a {
          color: #9ca3af;
          font-size: 1.15rem;
          transition: color 0.2s;
          padding: 0.25em;
          border-radius: 50%;
        }

        .footer-social a:hover {
          color: #fff;
          background: #23272f;
        }

        .footer-divider {
          border: none;
          border-top: 1px solid #23272f;
          margin: 0.5rem 0 0 0;
          width: 100%;
        }

        .footer-bottom-row {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0.3rem 1rem 0 1rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .footer-copyright {
          color: #9ca3af;
          font-size: 0.92rem;
        }

        @media (min-width: 640px) {
          .footer {
            padding: 4rem 1.5rem 0 1.5rem;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row;
            gap: 4rem;
          }

          .footer-col.left {
            flex: 0 0 250px;
            text-align: left;
          }

          .footer-links {
            flex: 1;
            grid-template-columns: repeat(4, 1fr);
          }

          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        @media (min-width: 1024px) {
          .footer {
            padding: 4rem 2rem 0 2rem;
          }
        }

        @media (max-width: 700px) {
          .footer, .footer.new-footer-layout {
            position: relative !important;
            width: 100% !important;
            left: unset;
            right: unset;
            bottom: unset;
            z-index: unset;
            min-height: 70px;
            font-size: 0.98rem;
            padding-bottom: 0 !important;
          }
          .footer-main-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.3rem;
            padding: 0.3rem 0.2rem 0 0.2rem;
            min-height: 0;
            width: 100%;
          }
          .footer-col.left, .footer-social, .footer-nav {
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            width: 100%;
            margin-bottom: 0.2rem;
          }
          .footer-divider {
            margin: 0.2rem 0 0 0;
          }
          .footer-bottom-row {
            flex-direction: column;
            align-items: center;
            padding: 0.2rem 0.2rem 0.3rem 0.2rem;
            width: 100%;
          }
          .footer-copyright {
            font-size: 0.9rem;
            text-align: center;
            width: 100%;
          }
        }

        @media (max-width: 900px) {
          .footer, .footer.new-footer-layout {
            padding: 2rem 0.5rem 1rem;
            min-height: 80px;
          }
        }

        @media (max-width: 600px) {
          .footer, .footer.new-footer-layout {
            padding: 1.2rem 0.2rem 0.5rem;
            min-height: 60px;
            font-size: 0.98rem;
          }
          .footer-main-row {
            flex-direction: column;
            align-items: center;
            gap: 0.7rem;
            padding: 0.2rem 0.1rem 0 0.1rem;
            min-height: 0;
            width: 100%;
          }
          .footer-col.left, .footer-social {
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            width: 100%;
            margin-bottom: 0.3rem;
          }
          .footer-nav {
            order: -1;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 1.2rem;
            width: 100%;
            margin-bottom: 0.5rem;
          }
          .footer-nav a {
            font-size: 1.08rem;
            padding: 0.7em 0.5em;
            width: auto;
            border-radius: 6px;
            white-space: nowrap;
          }
          .footer-logo-row {
            justify-content: center;
            width: 100%;
          }
          .footer-logo {
            height: 2.2rem;
            width: 2.2rem;
          }
          .footer-address {
            font-size: 0.92rem;
            margin-bottom: 0.2rem;
          }
          .footer-social {
            flex-direction: row;
            justify-content: center;
            gap: 1.2rem;
            margin-bottom: 0.5rem;
          }
          .footer-social a {
            font-size: 1.5rem;
            padding: 0.5em;
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .footer-divider {
            margin: 0.3rem 0 0 0;
          }
          .footer-bottom-row {
            flex-direction: column;
            align-items: center;
            padding: 0.2rem 0.1rem 0.3rem 0.1rem;
            width: 100%;
          }
          .footer-copyright {
            font-size: 0.92rem;
            text-align: center;
            width: 100%;
          }
        }

        .footer-brand, .footer-address, .footer-nav a, .footer-social a {
          color: #fff !important;
        }

        .footer-divider {
          border-color: var(--accent-color);
        }
      `}</style>
      <footer className="footer new-footer-layout">
        <div className="footer-main-row">
          <div className="footer-col left">
            <div className="footer-logo-row">
              <img src="/logo192.png" alt="Home Manager Logo" className="footer-logo" />
              <span className="footer-brand">Home Manager</span>
            </div>
            <div className="footer-address">123 Main St, Austin, TX 78701</div>
          </div>
          <nav className="footer-nav">
            <Link to="/about" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/about');
            }}>About</Link>
            <Link to="/contact" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/contact');
            }}>Contact</Link>
            <Link to="/careers" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/careers');
            }}>Careers</Link>
            <Link to="/tips-blog" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/tips-blog');
            }}>Tips & Tricks</Link>
          </nav>
          <div className="footer-social">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="mailto:info@homemgr.bialkowned.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom-row">
          <span className="footer-copyright">
            &copy; {new Date().getFullYear()} Home Manager. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
