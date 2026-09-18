import React from 'react';
import { HeartHandshake, Sparkles, Building2, Clock, Globe2 } from 'lucide-react';

export default function NGOsSection() {
  return (
    <section id="ngos" className="section-wrapper ngos-reveal-section">
      <div className="container-inner">
        
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: '36px' }}>
          <span className="section-tag glow-ngo-tag">
            <HeartHandshake size={14} /> COMMUNITY IMPACT PARTNERS
          </span>
          <h2 className="heading-1 ngos-title">
            Partner NGOs &amp; Organizations
          </h2>
          <p className="text-muted ngos-sub">
            Connecting academic delegates with grassroots non-governmental organizations across education, sustainability, and community health.
          </p>
        </div>

        {/* Reveal Teaser Container */}
        <div className="ngo-reveal-card card-clean">
          <div className="ngo-header-banner">
            <div className="ngo-icon-circle">
              <Building2 size={26} />
            </div>
            <div>
              <div className="ngo-status-badge">
                <Clock size={14} />
                <span>PARTNER ANNOUNCEMENT</span>
              </div>
              <h3 className="heading-2 ngo-reveal-title">
                NGO Partners Will Be Revealed Soon!
              </h3>
            </div>
          </div>

          <p className="ngo-reveal-desc">
            We are collaborating with prominent national and regional NGOs to provide student teams with authentic field data, mentorship, and grassroots execution opportunities.
          </p>

          <div className="ngo-mystery-grid">
            {[
              { label: 'EDUCATION & LITERACY', icon: <Globe2 size={18} /> },
              { label: 'ENVIRONMENT & WATER', icon: <Sparkles size={18} /> },
              { label: 'COMMUNITY HEALTH', icon: <HeartHandshake size={18} /> },
              { label: 'YOUTH EMPOWERMENT', icon: <Building2 size={18} /> }
            ].map((partner, index) => (
              <div key={index} className="ngo-partner-tile">
                <div className="tile-icon-box">
                  {partner.icon}
                </div>
                <span className="partner-field-label">{partner.label}</span>
                <span className="partner-reveal-badge">REVEALING SOON</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .ngos-reveal-section {
          background: linear-gradient(180deg, #F8FAFC 0%, #EAF2F8 100%);
          border-bottom: 1px solid var(--light-blue-alpha-50);
          padding-top: clamp(40px, 6vw, 70px);
          padding-bottom: clamp(40px, 6vw, 70px);
        }

        .glow-ngo-tag {
          background: var(--primary-navy);
          color: var(--white);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .ngos-title {
          color: var(--primary-navy);
          font-weight: 800;
        }

        .ngos-sub {
          max-width: 680px;
          margin: 8px auto 0;
          font-size: 1.05rem;
        }

        .ngo-reveal-card {
          background: var(--white);
          border: 2px solid var(--light-blue);
          border-radius: var(--radius-xl);
          padding: clamp(28px, 5vw, 44px);
          box-shadow: 0 14px 38px rgba(10, 25, 49, 0.08);
        }

        .ngo-header-banner {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .ngo-icon-circle {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--very-light-bg);
          border: 1.5px solid var(--medium-blue);
          color: var(--primary-navy);
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .ngo-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(179, 207, 229, 0.28);
          color: var(--primary-navy);
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 4px 14px;
          border-radius: var(--radius-pill);
          margin-bottom: 6px;
        }

        .ngo-reveal-title {
          color: var(--primary-navy);
          margin: 0;
          font-size: clamp(1.5rem, 2.8vw, 2rem);
        }

        .ngo-reveal-desc {
          color: var(--deep-blue);
          font-size: 1.02rem;
          line-height: 1.6;
          margin-bottom: 30px;
          max-width: 780px;
        }

        .ngo-mystery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .ngo-partner-tile {
          background: var(--very-light-bg);
          border: 1.5px dashed var(--medium-blue);
          border-radius: var(--radius-lg);
          padding: 22px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
          transition: transform 0.25s ease, background-color 0.25s ease;
        }

        .ngo-partner-tile:hover {
          transform: translateY(-4px);
          background: var(--white);
        }

        .tile-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--white);
          border: 1px solid var(--light-blue);
          color: var(--primary-navy);
          display: grid;
          place-items: center;
        }

        .partner-field-label {
          font-family: var(--font-heading);
          font-size: 0.76rem;
          font-weight: 800;
          color: var(--primary-navy);
          letter-spacing: 0.04em;
        }

        .partner-reveal-badge {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--deep-blue);
          background: rgba(179, 207, 229, 0.22);
          padding: 3px 10px;
          border-radius: var(--radius-pill);
        }

        @media (max-width: 900px) {
          .ngo-mystery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .ngo-mystery-grid {
            grid-template-columns: 1fr;
          }
          .ngo-header-banner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
