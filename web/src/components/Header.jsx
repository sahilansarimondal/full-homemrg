import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBell } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const onDashboard = location.pathname.startsWith('/dashboard');
  const profileRef = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
    setIsMenuOpen(false);
  };

  // Close profile dropdown on outside click
  React.useEffect(() => {
    if (!profileOpen) return;
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .main-header {
          background-color: #000;
          box-shadow: 0 2px 4px var(--card-shadow);
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          height: 64px;
          min-height: 64px;
          max-height: 64px;
          overflow-x: hidden;
        }

        .header-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 64px;
          min-height: 64px;
          max-height: 64px;
          box-sizing: border-box;
          padding: 0 2rem;
          overflow-x: hidden;
        }

        .header-section {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          min-width: 0;
        }
        .header-section.center {
          justify-content: center;
        }
        .header-section.left {
          justify-content: flex-start;
        }
        .header-section.right {
          justify-content: flex-end;
        }
        .logo-container {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 0;
          justify-content: flex-start;
        }

        .logo {
          height: 2.2rem;
          width: auto;
        }

        .brand-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #fff;
        }

        .mobile-menu-toggle {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 2rem;
          height: 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 2001;
          min-width: 2rem;
          margin-left: auto;
          align-self: center;
          order: 3;
        }

        .mobile-menu-toggle span {
          width: 100%;
          height: 2px;
          background-color: #fff;
          transition: all 0.3s ease;
        }

        .mobile-menu-toggle.active span:first-child {
          transform: translateY(8px) rotate(45deg);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-toggle.active span:last-child {
          transform: translateY(-8px) rotate(-45deg);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-left: 2rem;
          white-space: nowrap;
          overflow-x: hidden;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .nav-links::-webkit-scrollbar {
          display: none;
        }

        .nav-links a {
          color: #fff;
          text-decoration: none;
          font-size: 1.08rem;
          font-weight: 500;
          transition: all 0.2s;
          padding: 0.2em 0.7em;
          border-radius: 4px;
        }

        .nav-links a:hover {
          color: #fff;
          background: #2563eb;
        }

        .auth-buttons {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 0;
          justify-content: flex-end;
        }

        .auth-btn {
          padding: 0.5em 1.2em;
          border-radius: 6px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s;
        }

        .auth-btn.login {
          color: #fff;
          border: 2px solid #fff;
        }

        .auth-btn.login:hover {
          background: #fff;
          color: #000;
        }

        .auth-btn.signup {
          background: #2563eb;
          color: #fff;
        }

        .auth-btn.signup:hover {
          background: #1d4ed8;
        }

        .nav-center {
          flex: 0 1 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          min-width: 0;
          overflow: hidden;
          white-space: nowrap;
          overflow-x: hidden;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .nav-center::-webkit-scrollbar {
          display: none;
        }

        .nav-center a {
          color: #fff;
          text-decoration: none;
          font-size: 1.08rem;
          font-weight: 500;
          transition: all 0.2s;
          padding: 0.2em 0.7em;
          border-radius: 4px;
        }

        .nav-center a:hover {
          color: #fff;
          background: #2563eb;
        }

        .header-right {
          display: flex;
          align-items: center;
          flex: 0 0 auto;
          min-width: 200px;
          justify-content: flex-end;
        }

        .header-login-btn {
          color: #fff;
          text-decoration: none;
          font-size: 1.08rem;
          font-weight: 500;
          transition: all 0.2s;
          padding: 0.2em 0.7em;
          border-radius: 4px;
        }

        .header-login-btn:hover {
          color: #fff;
          background: #2563eb;
        }

        .header-get-started-btn {
          background: #2563eb;
          color: #fff;
          text-decoration: none;
          font-size: 1.08rem;
          font-weight: 600;
          padding: 0.5em 1.2em;
          border-radius: 6px;
          transition: all 0.2s ease;
          margin-left: 1rem;
        }

        .header-get-started-btn:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .login-btn {
          background: #fff;
          color: #000;
          border: none;
          border-radius: 6px;
          padding: 0.45em 0.9em;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.18s;
          box-shadow: 0 2px 8px rgba(30, 58, 138, 0.15);
          text-align: center;
          cursor: pointer;
          white-space: nowrap;
          order: 3;
        }

        .login-btn:hover,
        .login-btn:focus {
          background: #F8FAFC;
          color: #1E3A8A;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
        }

        .login-btn.desktop-only {
          display: flex;
        }
        .login-btn.mobile-only {
          display: none;
        }

        @media (min-width: 769px) {
          .mobile-menu-toggle {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .header-inner {
            padding: 0 1rem;
            justify-content: space-between;
            overflow-x: hidden;
          }
          .mobile-menu-toggle {
            display: flex;
            margin-left: 1rem;
            order: 3;
          }
          .nav-center,
          .header-login-btn {
            display: none;
          }
          .login-btn.desktop-only {
            display: none !important;
          }
          .login-btn.mobile-only {
            display: flex !important;
            background: #fff;
            color: #1E3A8A;
          }
          .nav-links {
            display: none;
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            width: 100%;
            background-color: #F8FAFC;
            padding: 2rem 1.5rem;
            flex-direction: column;
            gap: 2rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            overflow-y: auto;
            overflow-x: hidden;
            z-index: 2100;
            border-left: none;
            box-shadow: 0 2px 16px rgba(30,41,59,0.10);
            box-sizing: border-box;
          }
          .nav-links.active {
            display: flex;
            transform: translateX(0);
          }
          .nav-links a {
            color: #000;
            font-size: 1.25rem;
            font-weight: 600;
            padding: 1em 0.5em;
            width: 100%;
            border-radius: 8px;
            text-align: left;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            box-sizing: border-box;
          }
          .nav-links a:hover {
            color: #fff;
            background: #2563eb;
          }
          .auth-buttons {
            flex-direction: column;
            margin-top: 1.5rem;
            margin-left: 0;
            width: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
          }
          .auth-btn {
            width: 100%;
            font-size: 1.15rem;
            padding: 1em 0.5em;
            border-radius: 8px;
            box-sizing: border-box;
            overflow-x: hidden;
          }
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }

        .mock-login-btn {
          margin-left: 1rem;
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.5em 1.2em;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.18s;
        }
        .mock-login-btn:hover {
          background: #1746a0;
        }
        .mock-login-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(30, 41, 58, 0.7);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mock-login-modal {
          background: #fff;
          border-radius: 1.2rem;
          max-width: 340px;
          width: 95vw;
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          box-shadow: 0 8px 32px rgba(30,41,59,0.18);
          position: relative;
          text-align: center;
        }
        .mock-login-modal h3 {
          margin-bottom: 1.2rem;
          color: #1e3a8a;
        }
        .mock-login-modal button {
          width: 100%;
          margin: 0.5rem 0;
          padding: 0.9rem 0;
          font-size: 1.15rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #222;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .mock-login-modal button:hover {
          background: #2563eb;
          color: #fff;
        }
        .close-mock-login-btn {
          position: absolute;
          top: 0.7rem;
          right: 1.1rem;
          background: none;
          border: none;
          font-size: 1.7rem;
          color: #1e3a8a;
          cursor: pointer;
        }
        .get-started-btn {
          background: #2563eb;
          color: #fff;
          font-size: 1.08rem;
          font-weight: 700;
          padding: 0.5em 1.3em;
          border: none;
          border-radius: 999px;
          margin-right: 1rem;
          margin-left: 0.5rem;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(30, 58, 138, 0.13);
          transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
          display: inline-block;
        }
        .get-started-btn:hover {
          background: #1e3a8a;
          color: #fff;
          box-shadow: 0 4px 16px rgba(30,58,138,0.18);
          transform: translateY(-2px) scale(1.04);
        }
        .profile-menu-container {
          position: relative;
          margin-left: 1.5rem;
        }
        .profile-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #2563eb;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(30,58,138,0.10);
          transition: box-shadow 0.18s;
        }
        .profile-avatar:hover, .profile-avatar:focus {
          box-shadow: 0 4px 16px rgba(30,58,138,0.18);
        }
        .profile-dropdown {
          position: absolute;
          top: 48px;
          right: 0;
          min-width: 160px;
          background: #fff;
          border-radius: 1rem;
          box-shadow: 0 8px 32px rgba(30,58,138,0.13);
          z-index: 3000;
          padding: 0.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .profile-dropdown a, .profile-dropdown button {
          background: none;
          border: none;
          color: #1e3a8a;
          font-size: 1.08rem;
          font-weight: 500;
          text-align: left;
          padding: 0.7rem 1.2rem;
          border-radius: 0.7rem;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .profile-dropdown a:hover, .profile-dropdown button:hover {
          background: #e0e7ff;
          color: #1746a0;
        }
        @media (max-width: 900px) {
          .header-inner {
            flex-direction: row;
            height: 64px;
            padding: 0 1rem;
          }
          .header-section {
            width: auto;
            justify-content: flex-start !important;
            margin-bottom: 0;
          }
          .header-section.left {
            flex: 1;
          }
          .header-section.right {
            flex: 0 0 auto;
          }
          .nav-center {
            gap: 1.2rem;
          }
        }
      `}</style>
      <header className="main-header">
        <div className="header-inner">
          <div className="header-section left">
            <div className="logo-container">
              <Link to="/" onClick={() => handleNavigation('/')}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" 
                  alt="Home Manager Logo" 
                  className="logo" 
                  style={{ height: '2.2rem', width: 'auto' }}
                />
              </Link>
              <span className="brand-name">Home Manager</span>
            </div>
          </div>
          <div className="header-section center">
            {(!user || !onDashboard) && (
              <nav className="nav-center desktop-only">
                <Link to="/" onClick={() => handleNavigation('/')}>Home</Link>
                <Link to="/our-services" onClick={() => handleNavigation('/our-services')}>Our Services</Link>
                <Link to="/how-it-works" onClick={() => handleNavigation('/how-it-works')}>How It Works</Link>
                <Link to="/about" onClick={() => handleNavigation('/about')}>About Us</Link>
              </nav>
            )}
          </div>
          <div className="header-section right">
            {(!user || !onDashboard) && (
              <div className="auth-buttons desktop-only">
                <Link to="/login" onClick={() => handleNavigation('/login')} className="auth-btn login">Log In</Link>
                <Link to="/signup" onClick={() => handleNavigation('/signup')} className="auth-btn signup get-started-btn">Get Started</Link>
              </div>
            )}
            {(!user || !onDashboard) && (
              <button
                className={`mobile-menu-toggle mobile-only${isMenuOpen ? ' active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
          </div>
        </div>
        {/* MOBILE NAV-LINKS DROPDOWN */}
        {(!user || !onDashboard) && (
          <nav className={`nav-links mobile-only${isMenuOpen ? ' active' : ''}`}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100vw', minWidth: '100vw', maxWidth: '100vw', backgroundColor: '#F8FAFC', zIndex: 2100 }}
          >
            {/* Close button */}
            <button
              onClick={toggleMenu}
              aria-label="Close menu"
              style={{
                position: 'absolute',
                top: 18,
                right: 24,
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                color: '#1e3a8a',
                cursor: 'pointer',
                zIndex: 2200,
                display: 'block',
              }}
            >
              ×
            </button>
            <Link to="/" onClick={() => handleNavigation('/')}>Home</Link>
            <Link to="/our-services" onClick={() => handleNavigation('/our-services')}>Our Services</Link>
            <Link to="/how-it-works" onClick={() => handleNavigation('/how-it-works')}>How It Works</Link>
            <Link to="/about" onClick={() => handleNavigation('/about')}>About Us</Link>
            <Link to="/login" onClick={() => handleNavigation('/login')} className="auth-btn login" style={{ color: '#1e3a8a', fontWeight: 700, background: '#fff', border: '2px solid #1e3a8a' }}>Log In</Link>
            <Link to="/signup" onClick={() => handleNavigation('/signup')} className="auth-btn signup get-started-btn">Get Started</Link>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;