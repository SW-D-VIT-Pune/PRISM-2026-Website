import React, { useState } from 'react';
import { 
  Users, Award, Trophy, Sparkles, CheckCircle2, ArrowRight, 
  ExternalLink, MessageSquare, Landmark, FileText, Heart, Shield, Zap, ChevronDown
} from 'lucide-react';

export default function NSSPage({ onNavigateHome, onRegisterRedirect }) {
  const [activeSection, setActiveSection] = useState('registration'); // 'registration' | 'events' | 'awards'

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
                <strong>NSS REGISTRATIONS:</strong> 40+ NSS Teams • ₹500 Registration Fee • Youth Parliament Entry
              </span>
            </div>

            {/* MAIN TITLE */}
            <h1 className="heading-display nss-main-title">
              NSS & Social Units Hub
            </h1>

            <p className="nss-hero-sub">
              Empowering National Service Scheme units and student social organizations to debate, present, and inspire societal change.
            </p>

            {/* Sub-Tabs */}
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
                <span>Youth Floor & Events</span>
              </button>
              <button 
                className={`nss-tab-btn ${activeSection === 'awards' ? 'active' : ''}`}
                onClick={() => handleTabClick('awards')}
              >
                <Award size={17} />
                <span>Sevasrujan Award</span>
              </button>
            </div>

            {/* Scroll Hint */}
            <div 
              className="hero-scroll-hint animate-bounce-soft"
              onClick={() => scrollToTarget('nss-body-section')}
            >
              <span>Explore NSS Guidelines Below</span>
              <ChevronDown size={18} />
            </div>

          </div>
        </div>
      </div>

      {/* MAIN CONTENT BODY */}
      <div className="container-inner nss-body-container" id="nss-body-section">
        
        {/* SECTION 1: UNIT REGISTRATION */}
        {activeSection === 'registration' && (
          <div className="nss-view-section animate-fade-in">
            
            {/* MAIN REGISTRATION HIGHLIGHT CARD */}
            <div className="nss-main-card card-clean">
              <div className="nss-card-header">
                <div className="event-icon-box navy">
                  <Shield size={26} />
                </div>
                <div>
                  <div className="event-meta-badges">
                    <span className="badge-pill">OFFICIAL DELEGATION</span>
                    <span className="badge-outline">40+ TEAMS CAPACITY</span>
                  </div>
                  <h2 className="heading-2 nss-card-title">Registration for NSS & Youth Units</h2>
                  <p className="text-muted" style={{ fontSize: '0.925rem' }}>
                    Open to all recognized National Service Scheme (NSS) units and youth social organizations across campuses.
                  </p>
                </div>
              </div>

              <div className="nss-card-body">
                
                {/* 4 HIGHLIGHT BADGES / STATS */}
                <div className="nss-stats-grid">
                  <div className="nss-stat-card">
                    <span className="stat-label">MAX CAPACITY</span>
                    <span className="stat-val">40+</span>
                    <span className="stat-sub">NSS Teams</span>
                  </div>
                  <div className="nss-stat-card">
                    <span className="stat-label">REGISTRATION FEE</span>
                    <span className="stat-val">₹500</span>
                    <span className="stat-sub">Per Group / Team</span>
                  </div>
                  <div className="nss-stat-card">
                    <span className="stat-label">GROUP SIZE</span>
                    <span className="stat-val">4</span>
                    <span className="stat-sub">Members per Group</span>
                  </div>
                  <div className="nss-stat-card highlight">
                    <span className="stat-label">YOUTH FLOOR ENTRY</span>
                    <span className="stat-val">1 Member</span>
                    <span className="stat-sub">Represents in Parliament</span>
                  </div>
                </div>

                {/* RULES & PARTICIPATION GUIDELINES */}
                <div className="nss-details-grid" style={{ marginTop: '24px' }}>
                  
                  {/* Rule 1 */}
                  <div className="visual-rule-card">
                    <h4 className="detail-heading">
                      <Users size={18} /> Team Composition Rules
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Group Size:</strong> Exactly 4 members in each NSS registered team.</li>
                      <li><strong>Eligibility:</strong> Recognized NSS Volunteers, Social Units & eligible student delegates.</li>
                      <li>Inter-college NSS team participation allowed as per unit guidelines.</li>
                    </ul>
                  </div>

                  {/* Rule 2 */}
                  <div className="visual-rule-card">
                    <h4 className="detail-heading">
                      <Landmark size={18} /> Youth Floor Delegation
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Youth Floor Participation:</strong> 1 member from each group will represent the unit in <em>The Youth Floor (Youth Parliament)</em>.</li>
                      <li>Remaining 3 members participate in Conclave, Tenure Presentations & social summits.</li>
                      <li>Full delegate kits provided to all 4 members upon arrival.</li>
                    </ul>
                  </div>

                </div>

                {/* CTA BUTTON */}
                <div className="card-bottom-cta">
                  <button 
                    className="btn btn-primary btn-compact-lg"
                    onClick={handleRegisterClick}
                  >
                    <span>Register NSS Unit Now (₹500)</span>
                    <ExternalLink size={16} />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* SECTION 2: YOUTH FLOOR & EVENTS */}
        {activeSection === 'events' && (
          <div className="nss-view-section animate-fade-in">
            <div className="section-header" style={{ marginBottom: '28px' }}>
              <span className="section-tag">PARLIAMENT & CONCLAVE</span>
              <h2 className="heading-1">NSS Event Highlights</h2>
              <p className="text-muted">
                Key competitive and discussion forums exclusive to registered Youth & Social Units.
              </p>
            </div>

            <div className="nss-events-grid">
              
              {/* Event 1: The Youth Floor */}
              <div className="nss-event-card card-clean highlight-border">
                <div className="nss-event-header">
                  <div className="event-icon-box navy">
                    <Landmark size={24} />
                  </div>
                  <div>
                    <span className="badge-pill">MOCK PARLIAMENT</span>
                    <h3 className="heading-2" style={{ color: 'var(--primary-navy)', margin: '4px 0 2px 0' }}>
                      The Youth Floor (Youth Parliament)
                    </h3>
                  </div>
                </div>

                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
                  A youth parliament exercise where Youth & Social Units debate civic, legislative, and policy issues in a structured mock-parliamentary format, sharpening public speaking and democratic engagement.
                </p>

                <div className="nss-event-meta">
                  <div className="meta-item">
                    <strong>Team Size:</strong> 4 Members (1 speaker selected on floor)
                  </div>
                  <div className="meta-item">
                    <strong>Eligibility:</strong> Youth & Social Units and eligible student teams
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
                    <FileText size={24} />
                  </div>
                  <div>
                    <span className="badge-outline">ANNUAL SHOWCASE</span>
                    <h3 className="heading-2" style={{ color: 'var(--primary-navy)', margin: '4px 0 2px 0' }}>
                      Tenure Presentations
                    </h3>
                  </div>
                </div>

                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
                  Exclusive platform for registered Youth & Social Units to present their annual tenure achievements, community outreach campaigns, adoption village projects, and social impact metrics.
                </p>

                <div className="nss-event-meta">
                  <div className="meta-item">
                    <strong>Format:</strong> PPT & Impact Dossier Presentation
                  </div>
                  <div className="meta-item">
                    <strong>Eligibility:</strong> Registered Youth & Social Units only
                  </div>
                  <div className="meta-item">
                    <strong>Guidelines:</strong> As per PRISM '26 programme schedule
                  </div>
                </div>
              </div>

              {/* Event 3: Conclave / Open Mind */}
              <div className="nss-event-card card-clean" style={{ gridColumn: '1 / -1' }}>
                <div className="nss-event-header">
                  <div className="event-icon-box navy">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <span className="badge-pill">THOUGHT EXCHANGE</span>
                    <h3 className="heading-2" style={{ color: 'var(--primary-navy)', margin: '4px 0 2px 0' }}>
                      Conclave & Open Mind
                    </h3>
                  </div>
                </div>

                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
                  An open-floor thought-exchange platform where participants from all social backgrounds voice perspectives on civic innovation, grassroots reform, and sustainability themes without rigid formality.
                </p>

                <div className="summary-badges-grid" style={{ justifyContent: 'flex-start', marginTop: '12px' }}>
                  <div className="summary-badge-item">
                    <CheckCircle2 size={16} /> Inclusive Dialogue
                  </div>
                  <div className="summary-badge-item">
                    <CheckCircle2 size={16} /> NGO & Expert Panels
                  </div>
                  <div className="summary-badge-item">
                    <CheckCircle2 size={16} /> Policy Recommendations
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 3: SEVASRUJAN AWARD */}
        {activeSection === 'awards' && (
          <div className="nss-view-section animate-fade-in">
            <div className="nss-award-banner card-accent">
              
              <div className="award-icon-circle">
                <Heart size={36} />
              </div>

              <span className="badge-pill" style={{ marginBottom: '8px' }}>
                HIGHEST SOCIAL HONOR
              </span>

              <h2 className="heading-1" style={{ color: 'var(--primary-navy)', marginBottom: '12px' }}>
                The Sevasrujan Award
              </h2>

              <p className="award-desc">
                Presented by the <strong>Social Welfare & Development (SWD) Committee</strong> to the team demonstrating outstanding commitment to social causes, community service, and meaningful societal impact.
              </p>

              <div className="award-criteria-grid">
                <div className="criteria-card">
                  <Trophy size={20} className="crit-icon" />
                  <h4>Community Impact</h4>
                  <p>Measurable reach and sustainable grassroots transformation in adopted villages or communities.</p>
                </div>
                <div className="criteria-card">
                  <Award size={20} className="crit-icon" />
                  <h4>Innovation in Service</h4>
                  <p>Novel approaches to solving public health, literacy, environmental, or social inequality issues.</p>
                </div>
                <div className="criteria-card">
                  <Sparkles size={20} className="crit-icon" />
                  <h4>Team Dedication</h4>
                  <p>Exemplary discipline, volunteer engagement, and leadership throughout the tenure.</p>
                </div>
              </div>

              <div className="card-bottom-cta" style={{ justifyContent: 'center', marginTop: '32px' }}>
                <button 
                  className="btn btn-primary btn-compact-lg"
                  onClick={handleRegisterClick}
                >
                  <span>Register Unit for Sevasrujan Award Candidacy</span>
                  <ArrowRight size={16} />
                </button>
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
          font-size: 1.1rem;
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

        /* MAIN CARD */
        .nss-main-card {
          padding: var(--space-xl);
        }

        .nss-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: var(--space-lg);
        }

        .nss-card-title {
          color: var(--primary-navy);
          font-size: 1.6rem;
          margin-bottom: 2px;
        }

        /* STATS GRID */
        .nss-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .nss-stat-card {
          background: var(--very-light-bg);
          border: 1.5px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .nss-stat-card.highlight {
          background: rgba(179, 207, 229, 0.2);
          border-color: var(--medium-blue);
        }

        .stat-label {
          font-size: 0.725rem;
          font-weight: 800;
          color: var(--medium-blue);
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .stat-val {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--primary-navy);
          line-height: 1.1;
        }

        .stat-sub {
          font-size: 0.8rem;
          color: var(--deep-blue);
          margin-top: 4px;
        }

        .nss-details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
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
          gap: 14px;
          margin-bottom: 12px;
        }

        .nss-event-meta {
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.875rem;
          color: var(--deep-blue);
        }

        /* AWARD BANNER */
        .nss-award-banner {
          padding: var(--space-2xl);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: var(--radius-lg);
        }

        .award-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--primary-navy);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 8px 24px rgba(10, 25, 49, 0.25);
        }

        .award-desc {
          font-size: 1.1rem;
          color: var(--deep-blue);
          max-width: 780px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .award-criteria-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          width: 100%;
        }

        .criteria-card {
          background: var(--white);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: var(--space-lg);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .crit-icon {
          color: var(--primary-navy);
          margin-bottom: 10px;
        }

        .criteria-card h4 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-bottom: 6px;
        }

        .criteria-card p {
          font-size: 0.875rem;
          color: var(--deep-blue);
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .nss-main-title {
            font-size: clamp(2rem, 4.2vw, 2.75rem);
            white-space: normal;
          }
          .nss-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 850px) {
          .nss-details-grid, .nss-events-grid, .award-criteria-grid {
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
