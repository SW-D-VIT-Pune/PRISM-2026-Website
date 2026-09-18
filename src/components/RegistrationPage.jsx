import React, { useState } from 'react';
import { 
  Trophy, Users, Award, ShieldAlert, CheckCircle2, ArrowRight, 
  Sparkles, Calendar, HelpCircle, Ticket, Music, Code2, Lightbulb, 
  ExternalLink, ChevronDown, ChevronUp 
} from 'lucide-react';

export default function RegistrationPage({ onNavigateHome, onUnstopRedirect }) {
  const [activeTab, setActiveTab] = useState('tracks'); // 'tracks' | 'passes' | 'perks'
  const [expandedTrack, setExpandedTrack] = useState('sociothon'); // 'sociothon' | 'ideathon' | 'kalakriti'

  const handleUnstopClick = (eventName) => {
    if (onUnstopRedirect) {
      onUnstopRedirect(eventName);
    } else {
      window.open('https://unstop.com', '_blank');
    }
  };

  return (
    <div className="registration-page-wrapper">
      
      {/* HEADER BANNER */}
      <div className="reg-hero-banner">
        <div className="container-inner">
          <div className="reg-hero-content animate-fade-up">
            <span className="badge-pill reg-top-badge">
              <Sparkles size={16} /> PRISM '26 OFFICIAL REGISTRATIONS OPEN
            </span>

            <h1 className="heading-display reg-main-title">
              Participate & Innovate
            </h1>

            <p className="reg-hero-sub">
              Register your team for Sociothon, Ideathon, Kala-Kriti, or grab your official Student Event Passes.
            </p>

            {/* Registration Navigation Sub-Tabs */}
            <div className="reg-tab-controls">
              <button 
                className={`reg-tab-btn ${activeTab === 'tracks' ? 'active' : ''}`}
                onClick={() => setActiveTab('tracks')}
              >
                <Trophy size={18} />
                <span>Event Tracks</span>
              </button>
              <button 
                className={`reg-tab-btn ${activeTab === 'passes' ? 'active' : ''}`}
                onClick={() => setActiveTab('passes')}
              >
                <Ticket size={18} />
                <span>Student Event Passes</span>
              </button>
              <button 
                className={`reg-tab-btn ${activeTab === 'perks' ? 'active' : ''}`}
                onClick={() => setActiveTab('perks')}
              >
                <Award size={18} />
                <span>Benefits & Perks</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN REGISTRATION CONTENT CONTAINER */}
      <div className="container-inner reg-body-container">
        
        {/* TAB 1: EVENT TRACKS (Sociothon, Ideathon, Kala-Kriti) */}
        {activeTab === 'tracks' && (
          <div className="tracks-registration-view animate-fade-up">
            
            {/* 1. SOCIOTHON (TECHNICAL TRACK) */}
            <div className={`reg-event-card card-clean ${expandedTrack === 'sociothon' ? 'expanded' : ''}`}>
              <div className="event-card-header" onClick={() => setExpandedTrack(expandedTrack === 'sociothon' ? null : 'sociothon')}>
                <div className="event-title-group">
                  <div className="event-icon-box navy">
                    <Code2 size={26} />
                  </div>
                  <div>
                    <div className="event-meta-badges">
                      <span className="badge-pill">TECHNICAL TRACK</span>
                      <span className="badge-outline">₹50,000 PRIZE POOL</span>
                    </div>
                    <h2 className="heading-2 event-card-title">Sociothon — Technical Track</h2>
                    <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                      Build functional software, hardware, or AI models solving grassroots social challenges.
                    </p>
                  </div>
                </div>

                <div className="event-header-actions">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnstopClick('Sociothon');
                    }}
                  >
                    <span>Register on Unstop</span>
                    <ExternalLink size={16} />
                  </button>
                  <button className="expand-toggle-btn">
                    {expandedTrack === 'sociothon' ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                  </button>
                </div>
              </div>

              {/* EXPANDABLE DETAILS BODY */}
              <div className="event-card-details">
                <div className="details-grid">
                  
                  {/* Team Rules */}
                  <div className="detail-box">
                    <h4 className="detail-heading">
                      <Users size={18} /> Team Formation Rules
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Team Size:</strong> Exactly 5 members (Interdisciplinary encouraged)</li>
                      <li><strong>Gender Inclusion Rule:</strong> Team leader must be a girl, OR team must have at least 2 girl members</li>
                      <li className="rule-alert">Teams not fulfilling gender criteria will not be eligible for participation</li>
                    </ul>
                  </div>

                  {/* Deliverables & Rounds */}
                  <div className="detail-box">
                    <h4 className="detail-heading">
                      <Calendar size={18} /> Project Rounds & Deliverables
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Round 1 (Idea Pitch):</strong> PPT submission — <em>FREE (250 teams shortlisted)</em></li>
                      <li><strong>Round 2 (Online Pitch):</strong> Online presentation — <em>₹500 fee for shortlisted teams</em></li>
                      <li><strong>Round 3 (Final Showcase):</strong> Prototype + Final Pitch Presentation</li>
                    </ul>
                  </div>

                  {/* Prizes */}
                  <div className="detail-box highlight-box">
                    <h4 className="detail-heading">
                      <Trophy size={18} /> Prize Breakdown
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Winner:</strong> ₹30,000 Cash Prize</li>
                      <li><strong>First Runner Up:</strong> ₹20,000 Cash Prize</li>
                      <li>Certificates for all participants + NGO Mentorship</li>
                    </ul>
                  </div>

                  {/* Disqualification */}
                  <div className="detail-box warning-box">
                    <h4 className="detail-heading">
                      <ShieldAlert size={18} /> Disqualification Criteria
                    </h4>
                    <ul className="detail-list">
                      <li>Plagiarized, copied, or AI-generated submissions without originality</li>
                      <li>Failure to meet team size (5 members) or gender inclusion rules</li>
                      <li>Missing deadlines or academic dishonesty</li>
                    </ul>
                  </div>

                </div>

                <div className="card-bottom-cta">
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => handleUnstopClick('Sociothon')}
                  >
                    <span>Register Team for Sociothon on Unstop</span>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. IDEATHON (SOCIAL TRACK) */}
            <div className={`reg-event-card card-clean ${expandedTrack === 'ideathon' ? 'expanded' : ''}`} style={{ marginTop: '24px' }}>
              <div className="event-card-header" onClick={() => setExpandedTrack(expandedTrack === 'ideathon' ? null : 'ideathon')}>
                <div className="event-title-group">
                  <div className="event-icon-box blue">
                    <Lightbulb size={26} />
                  </div>
                  <div>
                    <div className="event-meta-badges">
                      <span className="badge-pill">SOCIAL TRACK</span>
                      <span className="badge-outline">₹17,000 PRIZE POOL</span>
                    </div>
                    <h2 className="heading-2 event-card-title">Ideathon — Social Track</h2>
                    <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                      Formulate domain-wise social impact proposals & sustainability action frameworks.
                    </p>
                  </div>
                </div>

                <div className="event-header-actions">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnstopClick('Ideathon');
                    }}
                  >
                    <span>Register on Unstop</span>
                    <ExternalLink size={16} />
                  </button>
                  <button className="expand-toggle-btn">
                    {expandedTrack === 'ideathon' ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                  </button>
                </div>
              </div>

              {/* EXPANDABLE DETAILS BODY */}
              <div className="event-card-details">
                <div className="details-grid">
                  
                  {/* Team Rules */}
                  <div className="detail-box">
                    <h4 className="detail-heading">
                      <Users size={18} /> Team Formation Rules
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Team Size:</strong> Minimum 2 – Maximum 3 members</li>
                      <li><strong>Eligibility:</strong> Open to all Bachelor's students</li>
                      <li>Focus on Social Impact, Public Reform & Sustainability</li>
                    </ul>
                  </div>

                  {/* Deliverables & Rounds */}
                  <div className="detail-box">
                    <h4 className="detail-heading">
                      <Calendar size={18} /> Project Rounds & Deliverables
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Round 1 (Idea Pitch):</strong> PPT submission — <em>FREE (100 teams shortlisted)</em></li>
                      <li><strong>Round 2 (Offline Pitch):</strong> Offline Pitch Presentation — <em>₹180 fee for shortlisted teams</em></li>
                    </ul>
                  </div>

                  {/* Prizes */}
                  <div className="detail-box highlight-box">
                    <h4 className="detail-heading">
                      <Trophy size={18} /> Prize Breakdown
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Winner:</strong> ₹11,000 Cash Prize</li>
                      <li><strong>First Runner Up:</strong> ₹6,000 Cash Prize</li>
                      <li>Certificates for all participants + NGO Mentorship</li>
                    </ul>
                  </div>

                  {/* Disqualification */}
                  <div className="detail-box warning-box">
                    <h4 className="detail-heading">
                      <ShieldAlert size={18} /> Disqualification Criteria
                    </h4>
                    <ul className="detail-list">
                      <li>Plagiarized, copied, or AI-generated submissions without originality</li>
                      <li>Failure to meet team size criteria (2–3 members)</li>
                      <li>Disruptive behavior or missing submission deadlines</li>
                    </ul>
                  </div>

                </div>

                <div className="card-bottom-cta">
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => handleUnstopClick('Ideathon')}
                  >
                    <span>Register Team for Ideathon on Unstop</span>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. KALA-KRITI (CULTURAL SHOWCASE) */}
            <div className={`reg-event-card card-clean ${expandedTrack === 'kalakriti' ? 'expanded' : ''}`} style={{ marginTop: '24px' }}>
              <div className="event-card-header" onClick={() => setExpandedTrack(expandedTrack === 'kalakriti' ? null : 'kalakriti')}>
                <div className="event-title-group">
                  <div className="event-icon-box navy">
                    <Music size={26} />
                  </div>
                  <div>
                    <div className="event-meta-badges">
                      <span className="badge-pill">CULTURAL SHOWCASE</span>
                      <span className="badge-outline">STAGE PERFORMANCES</span>
                    </div>
                    <h2 className="heading-2 event-card-title">Kala-Kriti — Cultural Showcase</h2>
                    <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                      Celebrate creative expression through music, dance, and live artistic performances.
                    </p>
                  </div>
                </div>

                <div className="event-header-actions">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnstopClick('Kala-Kriti');
                    }}
                  >
                    <span>Register Now</span>
                    <ArrowRight size={16} />
                  </button>
                  <button className="expand-toggle-btn">
                    {expandedTrack === 'kalakriti' ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                  </button>
                </div>
              </div>

              {/* EXPANDABLE DETAILS BODY */}
              <div className="event-card-details">
                <div className="details-grid">
                  
                  <div className="detail-box">
                    <h4 className="detail-heading">
                      <Sparkles size={18} /> Performance Categories
                    </h4>
                    <ul className="detail-list">
                      <li>Solo & Group Dance Performances</li>
                      <li>Vocal & Instrumental Music</li>
                      <li>Other Creative Stage Performances</li>
                      <li>Auditions apply for final stage slot</li>
                    </ul>
                  </div>

                  <div className="detail-box">
                    <h4 className="detail-heading">
                      <CheckCircle2 size={18} /> Participant Benefits
                    </h4>
                    <ul className="detail-list">
                      <li>Main stage performance slot at PRISM '26</li>
                      <li>Official Participation Certificates</li>
                      <li>Trophy & Recognition for top performers</li>
                    </ul>
                  </div>

                </div>

                <div className="card-bottom-cta">
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => handleUnstopClick('Kala-Kriti')}
                  >
                    <span>Register for Kala-Kriti Showcase</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STUDENT EVENT PASSES */}
        {activeTab === 'passes' && (
          <div className="passes-registration-view animate-fade-up">
            <div className="section-header" style={{ marginBottom: '32px' }}>
              <span className="section-tag">FOR COLLEGE STUDENTS</span>
              <h2 className="heading-1">Event Ticket Passes</h2>
              <p className="text-muted">
                Select your pass to gain access to keynote sessions, TechTalks, Vishwakhyan, and cultural showcases.
              </p>
            </div>

            <div className="passes-grid">
              
              {/* Pass 1: Day 1 + Day 2 Combo Pass */}
              <div className="pass-card card-clean highlight-pass">
                <div className="pass-tag-strip">
                  <span className="badge-pill">BEST VALUE COMBO</span>
                </div>
                <h3 className="heading-2 pass-title">Combo Pass (Day 1 + Day 2)</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  Full access to all event sessions, hackathons, TechTalks & Vishwakhyan across both days.
                </p>
                <div className="pass-price-box">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">300</span>
                  <span className="price-period">/ Student</span>
                </div>
                <ul className="pass-features-list">
                  <li><CheckCircle2 size={16} /> Access to all Sociothon & Ideathon stages</li>
                  <li><CheckCircle2 size={16} /> Full access to TechTalks & Vishwakhyan</li>
                  <li><CheckCircle2 size={16} /> Entry to Kala-Kriti Cultural Evening</li>
                  <li><CheckCircle2 size={16} /> Delegate Kit & Certificates</li>
                </ul>
                <button 
                  className="btn btn-primary btn-lg pass-btn"
                  onClick={() => handleUnstopClick('Combo Pass')}
                >
                  <span>Register Combo Pass Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Pass 2: Only Day 2 Pass */}
              <div className="pass-card card-clean">
                <div className="pass-tag-strip">
                  <span className="badge-outline">DAY 2 ONLY</span>
                </div>
                <h3 className="heading-2 pass-title">Day 2 Pass (TechTalks + Vishwakhyan)</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  Dedicated access to Day 2 keynote addresses, TechTalks, and Vishwakhyan summit.
                </p>
                <div className="pass-price-box">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">200</span>
                  <span className="price-period">/ Student</span>
                </div>
                <ul className="pass-features-list">
                  <li><CheckCircle2 size={16} /> Access to Day 2 TechTalks & Vishwakhyan</li>
                  <li><CheckCircle2 size={16} /> Entry to Final Pitch & Award Showcase</li>
                  <li><CheckCircle2 size={16} /> Certificate of Participation</li>
                </ul>
                <button 
                  className="btn btn-outline btn-lg pass-btn"
                  onClick={() => handleUnstopClick('Day 2 Pass')}
                >
                  <span>Register Day 2 Pass Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: BENEFITS AND PERKS */}
        {activeTab === 'perks' && (
          <div className="perks-view animate-fade-up">
            <div className="section-header" style={{ marginBottom: '32px' }}>
              <span className="section-tag">DELEGATE REWARDS</span>
              <h2 className="heading-1">Benefits & Perks Summary</h2>
              <p className="text-muted">
                What you gain by participating in PRISM '26 initiatives.
              </p>
            </div>

            <div className="perks-grid">
              
              {/* Sociothon Perks Box */}
              <div className="perks-card card-clean">
                <div className="perks-card-header">
                  <div className="event-icon-box navy">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <h3 className="heading-3">Sociothon Perks</h3>
                    <span className="badge-outline">₹50,000 PRIZE POOL</span>
                  </div>
                </div>
                <ul className="perks-list">
                  <li><strong>Prize Pool:</strong> ₹30,000 (Winner) | ₹20,000 (First Runner Up)</li>
                  <li>Official National-Level Certificates for all participants</li>
                  <li>Networking with NGOs, domain experts, and academicians</li>
                  <li>Recognition, seed grant access & pilot opportunities</li>
                </ul>
              </div>

              {/* Ideathon Perks Box */}
              <div className="perks-card card-clean">
                <div className="perks-card-header">
                  <div className="event-icon-box blue">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <h3 className="heading-3">Ideathon Perks</h3>
                    <span className="badge-outline">₹17,000 PRIZE POOL</span>
                  </div>
                </div>
                <ul className="perks-list">
                  <li><strong>Prize Pool:</strong> ₹11,000 (Winner) | ₹6,000 (First Runner Up)</li>
                  <li>Official National-Level Certificates for all participants</li>
                  <li>Direct mentorship from social enterprise leaders</li>
                  <li>Incubation guidance for top social impact models</li>
                </ul>
              </div>

            </div>

            {/* Overall Delegate Benefits Summary */}
            <div className="overall-perks-banner card-accent" style={{ marginTop: '32px' }}>
              <h3 className="heading-2" style={{ color: 'var(--primary-navy)' }}>
                Cumulative PRISM '26 Perks Across All Events
              </h3>
              <div className="summary-badges-grid">
                <div className="summary-badge-item">
                  <Trophy size={20} />
                  <span>₹67,000 Combined Prize Money</span>
                </div>
                <div className="summary-badge-item">
                  <Award size={20} />
                  <span>National-Level Certification</span>
                </div>
                <div className="summary-badge-item">
                  <Users size={20} />
                  <span>NGO & Industry Networking</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .registration-page-wrapper {
          background-color: var(--very-light-bg);
          min-height: 100vh;
          padding-bottom: var(--space-3xl);
        }

        .reg-hero-banner {
          background-color: #EAF2F8;
          border-bottom: 3px solid var(--light-blue);
          padding-top: 160px;
          padding-bottom: var(--space-2xl);
          text-align: center;
        }

        .reg-hero-content {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .reg-top-badge {
          background-color: var(--white);
          border-color: var(--medium-blue);
          margin-bottom: var(--space-md);
        }

        .reg-main-title {
          color: var(--primary-navy);
          margin-bottom: 8px;
        }

        .reg-hero-sub {
          font-family: var(--font-body);
          font-size: var(--font-size-body-lg);
          color: var(--deep-blue);
          line-height: 1.6;
          margin-bottom: var(--space-xl);
        }

        .reg-tab-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--white);
          padding: 8px;
          border-radius: var(--radius-pill);
          border: 1.5px solid var(--light-blue);
          box-shadow: var(--shadow-sm);
          flex-wrap: wrap;
          justify-content: center;
        }

        .reg-tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: var(--radius-pill);
          border: none;
          background: transparent;
          color: var(--deep-blue);
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .reg-tab-btn:hover {
          color: var(--primary-navy);
          background-color: rgba(179, 207, 229, 0.25);
        }

        .reg-tab-btn.active {
          background-color: var(--primary-navy);
          color: var(--white);
          box-shadow: var(--shadow-sm);
        }

        .reg-body-container {
          padding-top: var(--space-2xl);
        }

        /* EVENT CARDS */
        .reg-event-card {
          overflow: hidden;
          transition: all var(--transition-base);
        }

        .event-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          gap: var(--space-md);
        }

        .event-title-group {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .event-icon-box {
          width: 54px;
          height: 54px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .event-icon-box.navy {
          background-color: var(--primary-navy);
          color: var(--white);
        }

        .event-icon-box.blue {
          background-color: var(--deep-blue);
          color: var(--white);
        }

        .event-meta-badges {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .event-card-title {
          color: var(--primary-navy);
          margin-bottom: 2px;
        }

        .event-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .expand-toggle-btn {
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          color: var(--deep-blue);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* DETAILS GRID */
        .event-card-details {
          display: none;
          padding-top: var(--space-xl);
          margin-top: var(--space-lg);
          border-top: 1.5px solid var(--light-blue);
        }

        .reg-event-card.expanded .event-card-details {
          display: block;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .detail-box {
          background-color: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        .detail-box.highlight-box {
          background-color: rgba(179, 207, 229, 0.2);
          border-color: var(--medium-blue);
        }

        .detail-box.warning-box {
          background-color: rgba(26, 61, 99, 0.05);
          border-color: rgba(26, 61, 99, 0.2);
        }

        .detail-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-bottom: var(--space-sm);
        }

        .detail-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.925rem;
          color: var(--deep-blue);
        }

        .rule-alert {
          color: var(--primary-navy);
          font-weight: 700;
        }

        .card-bottom-cta {
          margin-top: var(--space-xl);
          display: flex;
          justify-content: flex-end;
        }

        /* PASSES GRID */
        .passes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-xl);
        }

        .pass-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .pass-card.highlight-pass {
          border-color: var(--deep-blue);
          border-width: 2.5px;
        }

        .pass-tag-strip {
          margin-bottom: var(--space-sm);
        }

        .pass-title {
          color: var(--primary-navy);
          margin-bottom: 6px;
        }

        .pass-price-box {
          display: flex;
          align-items: baseline;
          margin-top: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .price-currency {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-navy);
        }

        .price-amount {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 800;
          color: var(--primary-navy);
          line-height: 1;
        }

        .price-period {
          font-size: 0.9rem;
          color: var(--medium-blue);
          margin-left: 6px;
        }

        .pass-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: var(--space-xl);
          font-size: 0.95rem;
          color: var(--deep-blue);
        }

        .pass-features-list li {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pass-btn {
          width: 100%;
        }

        /* PERKS GRID */
        .perks-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-xl);
        }

        .perks-card-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .perks-list {
          list-style: disc;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.95rem;
          color: var(--deep-blue);
        }

        .overall-perks-banner {
          padding: var(--space-xl);
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .summary-badges-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-lg);
          margin-top: var(--space-md);
          flex-wrap: wrap;
        }

        .summary-badge-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--primary-navy);
          background: var(--white);
          padding: 10px 18px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--light-blue);
        }

        @media (max-width: 900px) {
          .details-grid, .passes-grid, .perks-grid {
            grid-template-columns: 1fr;
          }
          .event-card-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .event-header-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
