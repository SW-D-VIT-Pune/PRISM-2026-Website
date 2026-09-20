import React, { useState } from 'react';
import { 
  Users, Award, Trophy, Sparkles, CheckCircle2, ArrowRight, 
  ExternalLink, Landmark, FileText, Heart, Shield, Zap, ChevronDown, Star
} from 'lucide-react';

export default function NSSPage({ onNavigateHome, onRegisterRedirect, initialSection = 'registration' }) {
  const [activeSection, setActiveSection] = useState(initialSection); // 'registration' | 'events'

  React.useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

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
      
      {/* HEADER HERO BANNER - FULL FIRST VIEW WITH CLEAR PHOTO & FULL-COVER SUBTLE OVERLAY */}
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
        
        {/* TAB 1: CONCISE UNIT REGISTRATION & BENEFITS */}
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
                    <span className="fact-title">4 Members</span>
                    <span className="fact-sub">Per Group</span>
                  </div>
                  <div className="fact-divider"></div>
                  <div className="fact-item highlight">
                    <span className="fact-title">Youth Floor</span>
                    <span className="fact-sub">1 Rep per Group</span>
                  </div>
                </div>

                {/* GUIDELINES & BENEFITS 2-COLUMN GRID */}
                <div className="nss-info-grid" style={{ marginTop: '22px' }}>
                  
                  {/* Guidelines Box */}
                  <div className="nss-guidelines-box">
                    <h4 className="guidelines-heading">
                      <CheckCircle2 size={16} /> Key Participation Guidelines
                    </h4>
                    <ul className="nss-bullet-list">
                      <li><strong>Group Size:</strong> Exactly 4 members in each registered group.</li>
                      <li><strong>Youth Floor Entry:</strong> One member from each group will represent the unit in <em>The Youth Floor</em>.</li>
                      <li>Open to recognized NSS volunteers and campus social organizations.</li>
                    </ul>
                  </div>

                  {/* Benefits Box */}
                  <div className="nss-benefits-box">
                    <h4 className="guidelines-heading">
                      <Sparkles size={16} /> Unit Benefits & Privileges
                    </h4>
                    <ul className="nss-bullet-list">
                      <li>Exclusive participation in NGO Talks by national-level organizations (<strong>NAAM Foundation, Teach for India, Vanarai, 1M1B</strong>)</li>
                      <li>Opportunity to present annual tenure activities and achievements</li>
                      <li>Networking with multiple NSS units across Maharashtra</li>
                      <li>Certificates of participation and appreciation from SWDC, VIT Pune</li>
                    </ul>
                  </div>

                </div>

                {/* FEATURED HIGHLIGHTED AWARD: SEVASRUJAN AWARD */}
                <div className="sevasrujan-highlight-card" style={{ marginTop: '24px' }}>
                  <div className="award-card-header">
                    <div className="award-trophy-badge">
                      <Trophy size={26} />
                    </div>
                    <div>
                      <div className="award-top-tag">
                        <Star size={14} fill="currentColor" /> HIGHEST SOCIAL HONOR AT PRISM '26
                      </div>
                      <h3 className="award-title">The Sevasrujan Award</h3>
                    </div>
                  </div>

                  <p className="award-description">
                    Presented by the <strong>Social Welfare & Development (SWD) Committee</strong> to the <em>best overall NSS unit</em> among all 40+ registered units based on community service, tenure accomplishments, and societal impact.
                  </p>

                  <div className="award-highlights-row">
                    <div className="award-pill">
                      <CheckCircle2 size={15} /> Awarded to Best Unit among 40+ Registered Teams
                    </div>
                    <div className="award-pill">
                      <CheckCircle2 size={15} /> Automatic Candidacy upon Unit Registration
                    </div>
                    <div className="award-pill">
                      <CheckCircle2 size={15} /> Official Trophy & Citation by SWDC, VIT Pune
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

        {/* TAB 2: NSS UNIT EVENTS */}
        {activeSection === 'events' && (
          <div className="nss-view-section animate-fade-in">
            <div className="section-header" style={{ marginBottom: '24px' }}>
              <span className="section-tag">COMPETITIVE FORUMS</span>
              <h2 className="heading-1">NSS Unit Events</h2>
              <p className="text-muted">
                Official competitive events open to registered Youth & Social Units.
              </p>
            </div>

            <div className="nss-events-grid" id="nss-events-grid">
              
              {/* Event 1: The Youth Floor */}
              <div className="nss-event-card card-clean highlight-border" id="youth-floor">
                <div className="nss-event-header">
                  <div className="event-icon-box navy">
                    <Landmark size={22} />
                  </div>
                  <div>
                    <span className="badge-pill">MOCK PARLIAMENT</span>
                    <h3 className="heading-2" style={{ color: 'var(--primary-navy)', margin: '2px 0' }}>
                      The Youth Floor
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
              <div className="nss-event-card card-clean" id="tenure-presentations">
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

        /* HERO BANNER - MATCHED TO ABOUT SECTION PHOTO BACKGROUND */
        .nss-hero-banner {
          position: relative;
          background: linear-gradient(180deg, rgba(10, 25, 49, 0.70) 0%, rgba(10, 25, 49, 0.88) 100%), url('/images/NSS_unit.jpg') center top / 100% auto no-repeat, #0a1931;
          border-bottom: 3px solid var(--deep-blue);
          padding-top: 175px;
          padding-bottom: 75px;
          min-height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }

        .nss-hero-content {
          position: relative;
          z-index: 2;
          max-width: 950px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 0 var(--space-md);
        }

        .realtime-announcement-bar {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.95);
          border: 1.5px solid var(--medium-blue);
          padding: 8px 24px;
          border-radius: var(--radius-pill);
          margin-bottom: 26px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
          font-size: 0.875rem;
          color: var(--primary-navy);
          max-width: 92%;
        }

        .nss-main-title {
          font-size: clamp(2.3rem, 5vw, 3.5rem);
          white-space: nowrap;
          color: #FFFFFF;
          margin-bottom: 18px;
          letter-spacing: -0.025em;
          font-weight: 800;
          text-shadow: 0 4px 18px rgba(10, 25, 49, 0.95), 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .nss-hero-sub {
          font-family: var(--font-body);
          font-size: 1.15rem;
          color: #F6FAFD;
          line-height: 1.6;
          margin-bottom: 36px;
          max-width: 780px;
          text-shadow: 0 2px 10px rgba(10, 25, 49, 0.95), 0 1px 4px rgba(0, 0, 0, 0.8);
          font-weight: 500;
        }

        .nss-tab-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(10, 25, 49, 0.55);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 8px;
          border-radius: var(--radius-pill);
          border: 1.5px solid rgba(179, 207, 229, 0.4);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
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
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 46px;
        }

        .nss-tab-btn:hover {
          color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.2);
        }

        .nss-tab-btn.active {
          background-color: var(--white);
          color: var(--primary-navy);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
        }

        .hero-scroll-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 36px;
          color: #B3CFE5;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s ease;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .hero-scroll-hint:hover {
          color: #FFFFFF;
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
          justify-content: space-around;
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

        /* 2-COLUMN INFO GRID */
        .nss-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .nss-guidelines-box, .nss-benefits-box {
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: 18px 20px;
        }

        .nss-benefits-box {
          background: rgba(179, 207, 229, 0.15);
          border-color: var(--medium-blue);
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
          gap: 8px;
          font-size: 0.875rem;
          color: var(--deep-blue);
        }

        /* FEATURED HIGHLIGHTED SEVASRUJAN AWARD CARD */
        .sevasrujan-highlight-card {
          background: linear-gradient(135deg, var(--primary-navy) 0%, var(--deep-blue) 100%);
          border: 2px solid var(--medium-blue);
          border-radius: var(--radius-lg);
          padding: 24px;
          color: var(--white);
          box-shadow: 0 10px 30px rgba(10, 25, 49, 0.25);
          position: relative;
          overflow: hidden;
        }

        .sevasrujan-highlight-card::before {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 150px;
          height: 150px;
          background: rgba(179, 207, 229, 0.1);
          border-radius: 50%;
          pointer-events: none;
        }

        .award-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }

        .award-trophy-badge {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid var(--light-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FBBF24;
          flex-shrink: 0;
        }

        .award-top-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.725rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #FBBF24;
          margin-bottom: 4px;
        }

        .award-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--white);
        }

        .award-description {
          font-size: 0.925rem;
          color: var(--light-blue);
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .award-highlights-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .award-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(179, 207, 229, 0.3);
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--white);
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
          .nss-info-grid, .nss-events-grid {
            grid-template-columns: 1fr;
          }
          .nss-card-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .award-highlights-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 600px) {
          .nss-hero-banner {
            padding-top: 140px;
            padding-bottom: 36px;
            background: linear-gradient(180deg, rgba(10, 25, 49, 0.70) 0%, rgba(10, 25, 49, 0.88) 100%), url('/images/NSS_unit.jpg') center top / cover no-repeat, #0a1931;
          }
          .realtime-announcement-bar {
            max-width: 100%;
            font-size: 0.775rem;
            padding: 8px 14px;
            text-align: center;
            flex-wrap: wrap;
            justify-content: center;
          }
          .nss-main-title {
            font-size: clamp(1.75rem, 7.5vw, 2.3rem);
            line-height: 1.25;
            text-align: center;
            white-space: normal;
            margin-bottom: 12px;
          }
          .nss-hero-sub {
            font-size: 0.95rem;
            text-align: center;
            margin-bottom: 24px;
          }
          .nss-tab-controls {
            flex-direction: column;
            width: 100%;
            border-radius: var(--radius-lg);
            gap: 6px;
            padding: 6px;
          }
          .nss-tab-btn {
            width: 100%;
            justify-content: center;
            min-height: 42px;
            font-size: 0.9rem;
          }
          .nss-main-card {
            padding: 16px;
            border-radius: var(--radius-md);
          }
          .nss-facts-strip {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 12px 8px;
            background: var(--very-light-bg);
          }
          .fact-divider {
            display: none;
          }
          .fact-item {
            padding: 8px 4px;
            border: 1px solid var(--light-blue);
            border-radius: var(--radius-sm);
            background: var(--white);
          }
          .fact-title {
            font-size: 0.9rem;
          }
          .fact-sub {
            font-size: 0.7rem;
          }
          .sevasrujan-highlight-card {
            padding: 18px 16px;
            border-radius: var(--radius-md);
          }
          .award-card-header {
            flex-direction: row;
            align-items: flex-start;
            gap: 12px;
          }
          .award-trophy-badge {
            width: 44px;
            height: 44px;
          }
          .award-title {
            font-size: 1.25rem;
          }
          .award-description {
            font-size: 0.85rem;
            line-height: 1.5;
            margin-bottom: 14px;
          }
          .award-highlights-row {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            width: 100%;
          }
          .award-pill {
            width: 100%;
            font-size: 0.775rem;
            padding: 8px 12px;
            text-align: left;
          }
          .nss-event-card {
            padding: 16px;
          }
          .card-bottom-cta {
            width: 100%;
          }
          .card-bottom-cta .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
