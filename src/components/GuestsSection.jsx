import React from 'react';
import { UserCheck, Sparkles, Lock, Clock } from 'lucide-react';

export default function GuestsSection() {
  return (
    <section id="guests" className="section-wrapper guests-reveal-section">
      <div className="container-inner">
        
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: '36px' }}>
          <span className="section-tag glow-guest-tag">
            <UserCheck size={14} /> DISTINGUISHED SPEAKERS &amp; GUESTS
          </span>
          <h2 className="heading-1 guests-title">
            Eminent Guests &amp; Keynote Speakers
          </h2>
          <p className="text-muted guests-sub">
            Pioneering changemakers, policy leaders, and visionaries joining PRISM ’26 to inspire the next generation of social innovators.
          </p>
        </div>

        {/* Reveal Teaser Container */}
        <div className="reveal-teaser-card card-clean">
          <div className="teaser-glowing-ring">
            <Sparkles size={28} className="sparkle-anim-icon" />
          </div>

          <div className="teaser-pill-badge">
            <Clock size={15} />
            <span>EXCITING ANNOUNCEMENT</span>
          </div>

          <h3 className="heading-2 teaser-heading">
            Guest Lineup Will Be Revealed Soon!
          </h3>

          <p className="teaser-desc">
            We are finalizing an inspiring panel of keynote speakers, TEDx talkers, and social pioneers for PRISM ’26. Stay tuned for the official announcement.
          </p>

          <div className="mystery-guests-grid">
            {[1, 2, 3].map((num) => (
              <div key={num} className="mystery-guest-card">
                <div className="mystery-avatar-circle">
                  <Lock size={20} className="lock-icon" />
                </div>
                <span className="mystery-label">KEYNOTE SPEAKER #{num}</span>
                <span className="mystery-status-pill">REVEALING SOON</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .guests-reveal-section {
          background: var(--white);
          border-bottom: 1px solid var(--light-blue-alpha-50);
          padding-top: clamp(40px, 6vw, 70px);
          padding-bottom: clamp(40px, 6vw, 70px);
        }

        .glow-guest-tag {
          background: var(--deep-blue);
          color: var(--white);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .guests-title {
          color: var(--primary-navy);
          font-weight: 800;
        }

        .guests-sub {
          max-width: 660px;
          margin: 8px auto 0;
          font-size: 1.05rem;
        }

        .reveal-teaser-card {
          background: linear-gradient(135deg, var(--very-light-bg) 0%, #F0F6FA 100%);
          border: 2px solid var(--medium-blue);
          border-radius: var(--radius-xl);
          padding: clamp(28px, 5vw, 48px);
          text-align: center;
          box-shadow: 0 16px 40px rgba(10, 25, 49, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .teaser-glowing-ring {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--primary-navy);
          color: var(--light-blue);
          display: grid;
          place-items: center;
          margin-bottom: 18px;
          box-shadow: 0 0 25px rgba(10, 25, 49, 0.25);
        }

        .sparkle-anim-icon {
          animation: pulseGlow 2.4s infinite ease-in-out;
        }

        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.15); opacity: 1; }
        }

        .teaser-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(179, 207, 229, 0.3);
          color: var(--primary-navy);
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          padding: 5px 16px;
          border-radius: var(--radius-pill);
          margin-bottom: 12px;
        }

        .teaser-heading {
          color: var(--primary-navy);
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          margin-bottom: 10px;
        }

        .teaser-desc {
          max-width: 620px;
          color: var(--deep-blue);
          font-size: 1.02rem;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .mystery-guests-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 820px;
        }

        .mystery-guest-card {
          background: var(--white);
          border: 1.5px dashed var(--medium-blue);
          border-radius: var(--radius-lg);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .mystery-guest-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-navy);
        }

        .mystery-avatar-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          color: var(--medium-blue);
          display: grid;
          place-items: center;
        }

        .mystery-label {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--primary-navy);
          letter-spacing: 0.04em;
        }

        .mystery-status-pill {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--deep-blue);
          background: rgba(179, 207, 229, 0.22);
          padding: 3px 10px;
          border-radius: var(--radius-pill);
        }

        @media (max-width: 768px) {
          .mystery-guests-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
