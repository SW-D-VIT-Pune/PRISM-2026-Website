import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, onNavClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', isFunctional: true },
    { id: 'about', label: 'About', isFunctional: false },
    { id: 'registration', label: 'Registration', isFunctional: true },
    { id: 'nss', label: 'NSS', isFunctional: true },
    { id: 'contacts', label: 'Contacts', isFunctional: true }
  ];

  const handleItemClick = (item) => {
    setMobileMenuOpen(false);
    onNavClick(item);
  };

  return (
    <header className={`prism-navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container-inner">
        
        {/* LEFT SIDE: PRISM LOGO (AT LEAST 110px HEIGHT) */}
        <div className="nav-brand-left" onClick={() => handleItemClick(navItems[0])} title="PRISM '26 - Home">
          <div className="prism-logo-110-box">
            <img 
              src="/images/Prism_logo.png" 
              alt="PRISM Logo" 
              className="prism-logo-110-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="prism-logo-fallback" style={{ display: 'none' }}>
              <svg width="60" height="60" viewBox="0 0 32 32" fill="none">
                <polygon points="16,3 30,27 2,27" fill="#4A7FA7" opacity="0.9" />
                <polygon points="16,8 25,24 7,24" fill="#0A1931" />
                <polygon points="16,13 21,21 11,21" fill="#B3CFE5" />
              </svg>
            </div>
          </div>
        </div>

        {/* MIDDLE: CLEAN NAVIGATION MENU LINKS */}
        <nav className="desktop-navbar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* RIGHT SIDE: SWD LOGO & NSS LOGO (AROUND 80px SIZE) */}
        <div className="nav-logos-right">
          
          {/* SWD Committee Logo (80px) */}
          <div 
            className="partner-logo-80-box" 
            title="Social Welfare & Development Committee, VIT Pune" 
            onClick={() => onNavClick({ id: 'about', label: 'About' })}
          >
            <img 
              src="/images/SWD_logo.png" 
              alt="SWD Committee Logo" 
              className="partner-logo-80-img" 
            />
          </div>

          <div className="partner-logo-divider"></div>

          {/* NSS Committee Logo (80px) */}
          <div 
            className="partner-logo-80-box" 
            title="National Service Scheme (NSS)" 
            onClick={() => onNavClick({ id: 'nss', label: 'NSS' })}
          >
            <img 
              src="/images/NSS_logo.png" 
              alt="NSS Logo" 
              className="partner-logo-80-img" 
            />
          </div>

        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-menu">
          <nav className="mobile-nav-items-list">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        .prism-navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 138px; /* Taller navbar to fit 110px logo */
          background: rgba(10, 25, 49, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 3px solid var(--deep-blue);
          z-index: 1000;
          transition: all var(--transition-base);
          box-shadow: 0 10px 35px rgba(10, 25, 49, 0.35);
        }

        .prism-navbar-header.scrolled {
          height: 110px;
          background: rgba(10, 25, 49, 0.98);
          border-bottom-color: var(--medium-blue);
          box-shadow: 0 12px 40px rgba(10, 25, 49, 0.5);
        }

        .navbar-container-inner {
          max-width: 1440px;
          height: 100%;
          margin: 0 auto;
          padding: 0 var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* LEFT SIDE: PRISM LOGO (AT LEAST 110px HEIGHT) */
        .nav-brand-left {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .prism-logo-110-box {
          height: 110px; /* AT LEAST 110px HEIGHT */
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--transition-fast);
        }

        .nav-brand-left:hover .prism-logo-110-box {
          transform: scale(1.04);
        }

        .prism-logo-110-img {
          height: 100%;
          min-height: 110px;
          max-height: 115px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.4));
        }

        /* MIDDLE: CLEAN DESKTOP NAV MENU */
        .desktop-navbar-nav {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-link-btn {
          background: none;
          border: 1.5px solid transparent;
          padding: 12px 24px;
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--light-blue);
          border-radius: var(--radius-pill);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-link-btn:hover {
          color: var(--white);
          background-color: rgba(26, 61, 99, 0.6);
          border-color: rgba(179, 207, 229, 0.3);
        }

        .nav-link-btn.active {
          background-color: var(--deep-blue);
          color: var(--white);
          font-weight: 800;
          border-color: var(--medium-blue);
          box-shadow: 0 4px 18px rgba(26, 61, 99, 0.4);
        }

        /* RIGHT SIDE: SWD & NSS LOGOS (AROUND 80px SIZE) */
        .nav-logos-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .partner-logo-80-box {
          height: 80px; /* AROUND 80px SIZE */
          width: 80px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 3px solid var(--medium-blue);
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(10, 25, 49, 0.3);
          transition: transform var(--transition-fast), border-color var(--transition-fast);
        }

        .partner-logo-80-box:hover {
          transform: scale(1.06);
          border-color: var(--white);
        }

        .partner-logo-80-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .partner-logo-divider {
          width: 2px;
          height: 48px;
          background-color: rgba(179, 207, 229, 0.3);
        }

        .mobile-hamburger-btn {
          display: none;
          background: none;
          border: none;
          color: var(--white);
          cursor: pointer;
          padding: 6px;
        }

        .mobile-drawer-menu {
          position: fixed;
          top: 138px;
          left: 0;
          right: 0;
          background-color: var(--primary-navy);
          border-bottom: 3px solid var(--medium-blue);
          padding: var(--space-lg);
          box-shadow: 0 20px 50px rgba(10, 25, 49, 0.6);
        }

        .mobile-nav-items-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mobile-nav-link {
          background: none;
          border: none;
          text-align: left;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--light-blue);
          padding: 14px 18px;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          background-color: var(--deep-blue);
          color: var(--white);
        }

        @media (max-width: 1140px) {
          .desktop-navbar-nav {
            display: none;
          }
          .mobile-hamburger-btn {
            display: block;
          }
        }

        @media (max-width: 600px) {
          .prism-logo-110-box {
            height: 70px;
          }
          .prism-logo-110-img {
            min-height: 70px;
            max-height: 75px;
          }
          .partner-logo-80-box {
            width: 48px;
            height: 48px;
            padding: 4px;
            border-width: 2px;
          }
          .partner-logo-divider {
            height: 32px;
          }
          .nav-logos-right {
            gap: 10px;
          }
          .prism-navbar-header {
            height: 90px;
          }
          .prism-navbar-header.scrolled {
            height: 85px;
          }
          .mobile-drawer-menu {
            top: 90px;
            padding: 16px;
            max-height: calc(100vh - 90px);
            overflow-y: auto;
          }
        }
      `}</style>
    </header>
  );
}
