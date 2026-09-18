import React, { useState } from 'react';
import { 
  Users, Award, Trophy, Sparkles, CheckCircle2, ArrowRight, 
  ExternalLink, Landmark, FileText, Heart, Shield, Zap, ChevronDown
} from 'lucide-react';

export default function NSSPage({ onNavigateHome, onRegisterRedirect }) {
  const [activeSection, setActiveSection] = useState('registration'); // 'registration' | 'events'

  const scrollToTarget = (targetId) => {
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const navHeight = 145;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, 60);
  };

  const handleTabClick = (tabName) => {
    setActiveSection(tabName);
    scrollToTarget('nss-body-section');
  };

  const handleRegisterClick = () => {
    if (onRegisterRedirect) {
      onRegisterRedirect('NSS Unit Registration');
    } else {
      window.open('https://unstop.com', '_blank');
    }
  };

  return (
    <div className="nss-page-wrapper">
      
      {/* HEADER HERO BANNER - FULL FIRST VIEW */}
      <div className="nss-hero-banner">
        <div className="container-inner">
          <div className="nss-hero-content animate-fade-in">
            
            {/* REALTIME CURRENT ANNOUNCEMENT BAR */}
            <div className="realtime-announcement-bar animate-pulse-glow">
              <span className="live-indicator-pulse"></span>
              <Zap size={15} className="zap-icon" />
              <span className="announcement-text">
                <strong>ANNOUNCEMENT:</strong> Stay tuned registration will open soon! • 40+ NSS Teams
              </span>
            </div>

            {/* MAIN TITLE */}
            <h1 className="heading-display nss-main-title">
              NSS & Social Units Hub
            </h1>

            <p className="nss-hero-sub">
              Empowering National Service Scheme units and student social organizations to debate, present, and compete for top honors.
            </p>

            {/* Concise Sub-Tabs */}
            <div className="nss-tab-controls">
              <button 
                className={`nss-tab-btn ${activeSection === 'registration' ? 'active' : ''}`}
                onClick={() => handleTabClick('registration')}
              >
                <Users size={17} />
                <span>Unit Registration</span>
              </button>
              <button 
                className={`nss-tab-btn ${activeSection === 'events' ? 'active' : ''}`}
                onClick={() => handleTabClick('events')}
              >
                <Landmark size={17} />
                <span>NSS Unit Events</span>
              </button>
            </div>

            {/* Scroll Hint */}
            <div 
              className="hero-scroll-hint animate-bounce-soft"
              onClick={() => scrollToTarget('nss-body-section')}
            >
              <span>Explore Guidelines Below</span>
              <ChevronDown size={18} />
            </div>

          </div>
        </div>
      </div>

      {/* MAIN CONTENT BODY */}
      <div className="container-inner nss-body-container" id="nss-body-section">
        
        {/* TAB 1: CONCISE UNIT REGISTRATION */}
        {activeSection === 'registration' && (
          <div className="nss-view-section animate-fade-in">
            
            <div className="nss-main-card card-clean">
              
              {/* Header Group */}
              <div className="nss-card-header">
                <div className="event-icon-box navy">
                  <Shield size={24} />
                </div>
                <div>
                  <div className="event-meta-badges">
                    <span className="badge-pill">DELEGATION</span>
                  </div>
                  <h2 className="heading-2 nss-card-title">Registration for NSS Units</h2>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    Register your official NSS or student social unit to participate in PRISM '26 campus events.
                  </p>
                </div>
              </div>

              <div className="nss-card-body">
                
                {/* 4 CLEAN KEY FACTS PILLS */}
                <div className="nss-facts-strip">
                  <div className="fact-item">
                    <span className="fact-title">40+ Teams</span>
                    <span className="fact-sub">Max Capacity</span>
                  </div>
                  <div className="fact-divider"></div>
                  <div className="fact-item">
                    <span className="fact-title">₹500 Fee</span>
                    <span className="fact-sub">Per Group</span>
                  </div>
                  <div className="fact-divider"></div>
                  <div className="fact-item">
                    <span className="fact-title">4 Members</span>
                    <span className="fact-sub">Per Group</span>
                  </div>
                  <div className="fact-divider"></div>
                  <div className="fact-item highlight">
                    <span className="fact-title">Youth Floor</span>
                    <span className="fact-sub">1 Rep per Group</span>
                  </div>
                </div>

                {/* CONCISE PARTICIPATION GUIDELINES */}
                <div className="nss-guidelines-box" style={{ marginTop: '20px' }}>
                  <h4 className="guidelines-heading">
                    <CheckCircle2 size={16} /> Key Participation Guidelines
                  </h4>
                  <ul className="nss-bullet-list">
                    <li><strong>Group Size:</strong> Exactly 4 members in each registered group.</li>
                    <li><strong>Youth Floor Entry:</strong> One member from each group will represent the unit in <em>The Youth Floor (Youth Parliament)</em>.</li>
                    <li>Open to recognized NSS volunteers and campus social organizations.</li>
                  </ul>
                </div>

                {/* FEATURED AWARD: SEVASRUJAN AWARD (EMBEDDED IN MAIN TAB) */}
                <div className="sevasrujan-embedded-banner" style={{ marginTop: '20px' }}>
                  <div className="embedded-award-header">
                    <Trophy size={20} className="award-trophy-icon" />
                    <div>
                      <h4 className="embedded-award-title">The Sevasrujan Award</h4>
                      <p className="embedded-award-desc">
                        Presented by the <strong>Social Welfare & Development (SWD) Committee</strong> to the <em>best overall NSS unit</em> among all 40+ registered teams based on community service & societal impact. No separate registration required.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SINGLE CTA BUTTON */}
                <div className="card-bottom-cta" style={{ marginTop: '24px' }}>
                  <button 
                    className="btn btn-primary btn-compact-lg"
                    onClick={handleRegisterClick}
                  >
                    <span>Register NSS Unit</span>
                    <ExternalLink size={16} />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: NSS UNIT EVENTS (RENAMED & CONCISE) */}
        {activeSection === 'events' && (
          <div className="nss-view-section animate-fade-in">
            <div className="section-header" style={{ marginBottom: '24px' }}>
              <span className="section-tag">COMPETITIVE FORUMS</span>
              <h2 className="heading-1">NSS Unit Events</h2>
              <p className="text-muted">
                Official competitive events open to registered Youth & Social Units.
              </p>
            </div>

            <div className="nss-events-grid">
              
              {/* Event 1: The Youth Floor */}
              <div className="nss-event-card card-clean highlight-border">
                <div className="nss-event-header">
                  <div className="event-icon-box navy">
                    <Landmark size={22} />
                  </div>
                  <div>
                    <span className="badge-pill">MOCK PARLIAMENT</span>
                    <h3 className="heading-2" style={{ color: 'var(--primary-navy)', margin: '2px 0' }}>
                      The Youth Floor (Youth Parliament)
                    </h3>
                  </div>
                </div>

                <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '14px' }}>
                  A youth parliament simulation where representatives debate civic & policy issues in a mock-parliamentary format, sharpening public speaking and democratic engagement.
                </p>

                <div className="nss-event-meta">
                  <div className="meta-item">
                    <strong>Team Size:</strong> 4 Members (1 member represents on floor)
                  </div>
                  <div className="meta-item">
                    <strong>Awards:</strong> Best Speaker, Best Team, Overall Winners
                  </div>
                </div>
              </div>

              {/* Event 2: Tenure Presentations */}
              <div className="nss-event-card card-clean">
                <div className="nss-event-header">
                  <div className="event-icon-box blue">
                    <FileText size={22} />
                  </div>
                  <div>
                    <span className="badge-outline">ANNUAL SHOWCASE</span>
                    <h3 className="heading-2" style={{ color: 'var(--primary-navy)', margin: '2px 0' }}>
                      Tenure Presentations
                    </h3>
                  </div>
                </div>

                <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '14px' }}>
                  Exclusive presentation platform for registered Youth & Social Units to showcase annual tenure achievements, adoption village projects, and social impact metrics as per programme guidelines.
                </p>

                <div className="nss-event-meta">
                  <div className="meta-item">
                    <strong>Eligibility:</strong> Registered Youth & Social Units only
                  </div>
                  <div className="meta-item">
                    <strong>Format:</strong> PPT & Impact Dossier Presentation
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      <style>{`
        .nss-page-wrapper {
          background-color: var(--very-light-bg);
          min-height: 100vh;
          padding-bottom: var(--space-3xl);
        }

        .nss-hero-banner {
          background: linear-gradient(180deg, #F0F6FA 0%, #EAF2F8 100%);
          border-bottom: 2px solid var(--light-blue);
          padding-top: 175px;
          padding-bottom: 75px;
          min-height: calc(100vh - 138px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .nss-hero-content {
          max-width: 950px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .nss-main-title {
          font-size: clamp(2.3rem, 5vw, 3.4rem);
          white-space: nowrap;
          color: var(--primary-navy);
          margin-bottom: 20px;
          letter-spacing: -0.025em;
          font-weight: 800;
        }

        .nss-hero-sub {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--deep-blue);
          line-height: 1.6;
          margin-bottom: 38px;
          max-width: 760px;
        }

        .nss-tab-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--white);
          padding: 8px;
          border-radius: var(--radius-pill);
          border: 1.5px solid var(--light-blue);
          box-shadow: 0 6px 24px rgba(10, 25, 49, 0.06);
          flex-wrap: wrap;
          justify-content: center;
        }

        .nss-tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 24px;
          border-radius: var(--radius-pill);
          border: none;
          background: transparent;
          color: var(--deep-blue);
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 46px;
        }

        .nss-tab-btn:hover {
          color: var(--primary-navy);
          background-color: rgba(179, 207, 229, 0.25);
        }

        .nss-tab-btn.active {
          background-color: var(--primary-navy);
          color: var(--white);
          box-shadow: var(--shadow-sm);
        }

        .nss-body-container {
          padding-top: var(--space-2xl);
        }

        /* MAIN CARD - CLEAN & SPACIOUS */
        .nss-main-card {
          padding: var(--space-xl);
          background: var(--white);
        }

        .nss-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: var(--space-lg);
        }

        .nss-card-title {
          color: var(--primary-navy);
          font-size: 1.5rem;
          margin-bottom: 2px;
        }

        /* CLEAN FACTS STRIP */
        .nss-facts-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: 16px 24px;
        }

        .fact-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .fact-item.highlight {
          color: var(--primary-navy);
        }

        .fact-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--primary-navy);
        }

        .fact-sub {
          font-size: 0.775rem;
          color: var(--deep-blue);
          margin-top: 2px;
        }

        .fact-divider {
          width: 1px;
          height: 36px;
          background-color: var(--light-blue);
        }

        /* GUIDELINES BOX */
        .nss-guidelines-box {
          background: var(--white);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: 18px 20px;
        }

        .guidelines-heading {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-bottom: 10px;
        }

        .nss-bullet-list {
          list-style: disc;
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.875rem;
          color: var(--deep-blue);
        }

        /* EMBEDDED SEVASRUJAN AWARD BANNER */
        .sevasrujan-embedded-banner {
          background: linear-gradient(135deg, #F6FAFD 0%, #EAF2F8 100%);
          border: 1.5px solid var(--medium-blue);
          border-radius: var(--radius-md);
          padding: 16px 20px;
        }

        .embedded-award-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .award-trophy-icon {
          color: var(--primary-navy);
          margin-top: 2px;
          flex-shrink: 0;
        }

        .embedded-award-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 4px;
        }

        .embedded-award-desc {
          font-size: 0.85rem;
          color: var(--deep-blue);
          line-height: 1.45;
        }

        /* EVENTS GRID */
        .nss-events-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .nss-event-card {
          padding: var(--space-lg);
        }

        .nss-event-card.highlight-border {
          border: 2px solid var(--deep-blue);
        }

        .nss-event-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .nss-event-meta {
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.85rem;
          color: var(--deep-blue);
        }

        @media (max-width: 1024px) {
          .nss-main-title {
            font-size: clamp(2rem, 4.2vw, 2.75rem);
            white-space: normal;
          }
        }

        @media (max-width: 850px) {
          .nss-facts-strip {
            flex-direction: column;
            gap: 14px;
          }
          .fact-divider {
            width: 80%;
            height: 1px;
          }
          .nss-events-grid {
            grid-template-columns: 1fr;
          }
          .nss-card-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
