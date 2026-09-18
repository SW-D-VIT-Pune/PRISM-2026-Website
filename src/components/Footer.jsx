import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onNavClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'registration', label: 'Registration' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'nss', label: 'NSS' },
    { id: 'contacts', label: 'Contacts' }
  ];

  return (
    <footer className="prism-footer-section">
      <div className="container-inner">
        <div className="footer-top-grid">
          
          {/* Col 1: Committee Branding */}
          <div className="footer-col brand-col">
            <div className="footer-brand-title">PRISM</div>
            <div className="footer-committee-sub">
              Social Welfare & Development Committee
            </div>
            <div className="footer-college-tag">
              VIT Pune
            </div>
            <p className="footer-description-text">
              Public Reform • Innovation • Sustainability • Management. Empowering student changemakers for community welfare.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Navigation</h4>
            <ul className="footer-nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className="footer-nav-btn"
                    onClick={() => onNavClick(item)}
                  >
                    {item.label}
                    {item.id !== 'home' && item.id !== 'contacts' && <span className="footer-soon-tag">Coming Soon</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Official Committee Purpose */}
          <div className="footer-col">
            <h4 className="footer-col-title">Committee Purpose</h4>
            <p className="footer-purpose-text">
              Dedicated to facilitating civic awareness, community outreach, and sustainable student-led initiatives across campus and beyond.
            </p>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-text">
            © 2026 PRISM — Social Welfare & Development Committee, VIT Pune. All rights reserved.
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
          padding-top: var(--space-2xl);
          padding-bottom: var(--space-md);
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr;
          gap: var(--space-xl);
          padding-bottom: var(--space-xl);
          border-bottom: 1px solid rgba(179, 207, 229, 0.2);
        }

        .footer-brand-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--white);
          letter-spacing: 0.05em;
          line-height: 1;
        }

        .footer-committee-sub {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--light-blue);
          margin-top: 4px;
        }

        .footer-college-tag {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--medium-blue);
          letter-spacing: 0.08em;
          margin-top: 2px;
          margin-bottom: var(--space-xs);
        }

        .footer-description-text {
          font-size: 0.85rem;
          color: var(--light-blue);
          line-height: 1.55;
          opacity: 0.85;
          max-width: 400px;
        }

        .footer-col-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: var(--space-sm);
          letter-spacing: 0.02em;
        }

        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-nav-btn {
          background: none;
          border: none;
          color: var(--light-blue);
          font-family: var(--font-body);
          font-size: 0.875rem;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color var(--transition-fast);
        }

        .footer-nav-btn:hover {
          color: var(--white);
        }

        .footer-soon-tag {
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--medium-blue);
          background-color: rgba(179, 207, 229, 0.15);
          padding: 1px 6px;
          border-radius: var(--radius-pill);
        }

        .footer-purpose-text {
          font-size: 0.85rem;
          color: var(--light-blue);
          line-height: 1.6;
          opacity: 0.85;
        }

        .footer-bottom-bar {
          padding-top: var(--space-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-xs);
        }

        .footer-copyright-text {
          font-size: 0.8rem;
          color: var(--light-blue);
          opacity: 0.75;
        }

        .scroll-top-btn {
          background: none;
          border: none;
          color: var(--light-blue);
          font-family: var(--font-heading);
          font-size: 0.8rem;
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
            gap: var(--space-lg);
          }
        }
      `}</style>
    </footer>
  );
}
