import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onNavClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/vit_socials',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/vitsocials',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/vitsocials/',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UCJnaNm8Ns08rUIhsdFM2fhA',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/vit-social-welfare-development/',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    }
  ];

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'nss', label: 'NSS' }
  ];

  const importantLinks = [
    { id: 'registration', label: 'Registrations' },
    { id: 'contacts', label: 'Contact' }
  ];

  return (
    <footer className="prism-footer-section">
      <div className="container-inner">
        <div className="footer-top-grid">
          
          {/* Col 1: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button
                    className="footer-nav-btn"
                    onClick={() => onNavClick(item)}
                  >
                    <span className="footer-chevron">›</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Important Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Important Links</h4>
            <ul className="footer-nav-list">
              {importantLinks.map((item) => (
                <li key={item.id}>
                  <button
                    className="footer-nav-btn"
                    onClick={() => onNavClick(item)}
                  >
                    <span className="footer-chevron">›</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: SW&D Branding, Motto & Socials */}
          <div className="footer-col footer-info-col">
            <div className="footer-logos-header">
              <img src="/images/SWD_logo.png" alt="SWD Logo" className="footer-swd-logo" />
              <div>
                <h4 className="footer-swd-title">SW&amp;D</h4>
                <span className="footer-college-tag">VIT Pune</span>
              </div>
            </div>
            <p className="footer-motto-text">
              Social Welfare and Development Committee with the motto of &quot;Empowering Society, Transforming Lives&quot; has been helping society for several years and continues to do so in any circumstance.
            </p>
            
            <div className="footer-social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`footer-social-btn ${social.name.toLowerCase()}`}
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-text">
            © 2026 PRISM — Social Welfare &amp; Development Committee, VIT Pune. All rights reserved.
          </div>

          <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .prism-footer-section {
          background-color: var(--primary-navy);
          color: var(--white);
          padding-top: 36px;
          padding-bottom: 16px;
          border-top: 1px solid rgba(179, 207, 229, 0.15);
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.6fr;
          gap: clamp(20px, 3vw, 36px);
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(179, 207, 229, 0.18);
        }

        .footer-col-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 12px;
          letter-spacing: 0.03em;
        }

        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 0;
          margin: 0;
        }

        .footer-nav-btn {
          background: none;
          border: none;
          color: var(--light-blue);
          font-family: var(--font-body);
          font-size: 0.875rem;
          cursor: pointer;
          padding: 2px 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color var(--transition-fast), transform var(--transition-fast);
        }

        .footer-chevron {
          color: var(--medium-blue);
          font-size: 1rem;
          font-weight: 800;
          line-height: 1;
        }

        .footer-nav-btn:hover {
          color: var(--white);
          transform: translateX(3px);
        }

        .footer-nav-btn:hover .footer-chevron {
          color: var(--white);
        }

        .footer-logos-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .footer-swd-logo {
          width: 44px;
          height: 44px;
          object-fit: contain;
          background: #FFFFFF;
          border-radius: 50%;
          padding: 3px;
          border: 1px solid var(--medium-blue);
        }

        .footer-swd-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1.1;
          margin: 0;
        }

        .footer-college-tag {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--medium-blue);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .footer-motto-text {
          font-size: 0.83rem;
          color: var(--light-blue);
          line-height: 1.55;
          opacity: 0.9;
          margin-bottom: 14px;
          text-align: justify;
        }

        .footer-social-links {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(179, 207, 229, 0.12);
          border: 1px solid rgba(179, 207, 229, 0.25);
          color: var(--light-blue);
          display: grid;
          place-items: center;
          text-decoration: none;
          transition: background-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast), border-color var(--transition-fast);
        }

        .footer-social-btn:hover {
          background: var(--light-blue);
          color: var(--primary-navy);
          border-color: var(--light-blue);
          transform: translateY(-3px);
        }

        .footer-bottom-bar {
          padding-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-copyright-text {
          font-size: 0.78rem;
          color: var(--light-blue);
          opacity: 0.8;
        }

        .scroll-top-btn {
          background: none;
          border: none;
          color: var(--light-blue);
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .scroll-top-btn:hover {
          color: var(--white);
        }

        @media (max-width: 768px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding-bottom: 20px;
          }
          .prism-footer-section {
            padding-top: 28px;
          }
        }
      `}</style>
    </footer>
  );
}

