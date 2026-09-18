import React from 'react';
import { HeartHandshake, ArrowRight, Compass } from 'lucide-react';

export default function HighlightCTA({ onExploreClick, onUpcomingClick }) {
  return (
    <section id="cta" className="section-wrapper cta-section">
      <div className="container-inner">
        <div className="cta-banner-card">
          <div className="cta-banner-content">
            <span className="badge-pill" style={{ marginBottom: '16px' }}>
              <HeartHandshake size={14} /> BE PART OF THE CHANGE
            </span>

            <h2 className="heading-1 cta-banner-heading">
              Ready to Drive Social Impact with PRISM?
            </h2>

            <p className="cta-banner-sub">
              Join the Social Welfare & Development Committee, VIT Pune, in shaping sustainable solutions for grassroots community betterment.
            </p>

            <div className="cta-banner-actions">
              <button className="btn btn-primary btn-lg" onClick={onUpcomingClick}>
                <Compass size={18} />
                <span>Register for PRISM '26</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section {
          background-color: var(--very-light-bg);
          border-bottom: 1px solid var(--light-blue-alpha-50);
        }

        .cta-banner-card {
          background: linear-gradient(135deg, var(--white) 0%, var(--very-light-bg) 100%);
          border: 2px solid var(--light-blue);
          border-radius: var(--radius-xl);
          padding: var(--space-2xl) var(--space-xl);
          text-align: center;
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
        }

        .cta-banner-content {
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cta-banner-heading {
          color: var(--primary-navy);
          margin-bottom: 12px;
        }

        .cta-banner-sub {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--medium-blue);
          margin-bottom: var(--space-xl);
          line-height: 1.6;
        }

        .cta-banner-actions {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>
    </section>
  );
}
