import React, { useState } from 'react';
import { 
  Trophy, Users, Award, ShieldAlert, CheckCircle2, ArrowRight, 
  Sparkles, Calendar, Ticket, Music, Code2, Lightbulb, 
  ExternalLink, ChevronDown, ChevronUp, Zap, HelpCircle, Layers
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
          <div className="reg-hero-content animate-fade-in">
            
            {/* REALTIME CURRENT ANNOUNCEMENT BAR */}
            <div className="realtime-announcement-bar animate-pulse-glow">
              <span className="live-indicator-pulse"></span>
              <Zap size={15} className="zap-icon" />
              <span className="announcement-text">
                <strong>LIVE NOW:</strong> PRISM '26 Registrations Open • ₹67,000 Cash Prizes • Submit Proposals on Unstop!
              </span>
            </div>

            {/* MAIN TITLE (Single Line Fit) */}
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
                <Trophy size={16} />
                <span>Event Tracks</span>
              </button>
              <button 
                className={`reg-tab-btn ${activeTab === 'passes' ? 'active' : ''}`}
                onClick={() => setActiveTab('passes')}
              >
                <Ticket size={16} />
                <span>Student Event Passes</span>
              </button>
              <button 
                className={`reg-tab-btn ${activeTab === 'perks' ? 'active' : ''}`}
                onClick={() => setActiveTab('perks')}
              >
                <Award size={16} />
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
          <div className="tracks-registration-view animate-fade-in">
            
            {/* 1. SOCIOTHON (TECHNICAL TRACK) */}
            <div className={`reg-event-card card-clean ${expandedTrack === 'sociothon' ? 'expanded' : ''}`}>
              <div className="event-card-header" onClick={() => setExpandedTrack(expandedTrack === 'sociothon' ? null : 'sociothon')}>
                <div className="event-title-group">
                  <div className="event-icon-box navy">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <div className="event-meta-badges">
                      <span className="badge-pill">TECHNICAL TRACK</span>
                      <span className="badge-outline">₹50,000 PRIZE POOL</span>
                    </div>
                    <h2 className="heading-2 event-card-title">Sociothon — Technical Track</h2>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                      Build functional software, hardware, or AI models solving grassroots social challenges.
                    </p>
                  </div>
                </div>

                <div className="event-header-actions">
                  <button 
                    className="btn btn-primary btn-compact"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnstopClick('Sociothon');
                    }}
                  >
                    <span>Register on Unstop</span>
                    <ExternalLink size={14} />
                  </button>
                  <button className="expand-toggle-btn" aria-label="Toggle details">
                    {expandedTrack === 'sociothon' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {/* EXPANDABLE DETAILS BODY */}
              <div className="event-card-details">
                
                {/* UNSTOP PROBLEM STATEMENTS NOTICE */}
                <div className="unstop-ps-notice-bar animate-slide-right">
                  <Sparkles size={16} />
                  <span>Problem statements will be displayed on <strong>Unstop</strong>.</span>
                </div>

                {/* VISUAL TIMELINE FOR PROJECT ROUNDS */}
                <div className="details-visual-section">
                  <h4 className="visual-section-heading">
                    <Calendar size={18} /> Event Journey & Project Rounds
                  </h4>
                  <div className="rounds-timeline-stepper">
                    
                    {/* Step 1 */}
                    <div className="timeline-step">
                      <div className="step-circle">1</div>
                      <div className="step-content">
                        <span className="step-tag free-tag">FREE ENTRY</span>
                        <h5 className="step-title">Round 1: Idea Pitch</h5>
                        <p className="step-desc">PPT-based idea submission on Unstop. <strong>250 teams shortlisted.</strong></p>
                      </div>
                    </div>

                    <div className="timeline-connector"></div>

                    {/* Step 2 */}
                    <div className="timeline-step">
                      <div className="step-circle">2</div>
                      <div className="step-content">
                        <span className="step-tag fee-tag">₹500 FEE</span>
                        <h5 className="step-title">Round 2: Online Pitch</h5>
                        <p className="step-desc">Online presentation & Q&A evaluation before judges.</p>
                      </div>
                    </div>

                    <div className="timeline-connector"></div>

                    {/* Step 3 */}
                    <div className="timeline-step">
                      <div className="step-circle final-circle">3</div>
                      <div className="step-content">
                        <span className="step-tag finale-tag">GRAND FINALE</span>
                        <h5 className="step-title">Round 3: Prototype Showcase</h5>
                        <p className="step-desc">Working prototype demo & final pitch on campus stage.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* PRIZE & TEAM RULES GRID */}
                <div className="rules-prize-flex-grid" style={{ marginTop: '24px' }}>
                  
                  {/* Team Rules Box */}
                  <div className="visual-rule-card">
                    <h4 className="detail-heading">
                      <Users size={18} /> Team Formation Rules
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Team Size:</strong> Exactly 5 members (Interdisciplinary collaboration encouraged).</li>
                      <li><strong>Gender Inclusion Rule:</strong> The team leader must be a girl, <em>OR</em> the team must have at least 2 girl members.</li>
                      <li className="rule-alert-text">Teams not fulfilling this criterion will not be eligible for registration/participation.</li>
                    </ul>
                  </div>

                  {/* Visual Prize Badge Box */}
                  <div className="visual-prize-card">
                    <h4 className="detail-heading">
                      <Trophy size={18} /> Prize Breakdown (₹50,000 Pool)
                    </h4>
                    <div className="prize-visual-strip">
                      <div className="prize-podium winner">
                        <span className="podium-rank">🏆 WINNER</span>
                        <span className="podium-amount">₹30,000</span>
                        <span className="podium-sub">Cash Prize + Trophy</span>
                      </div>
                      <div className="prize-podium runner">
                        <span className="podium-rank">🥈 1ST RUNNER UP</span>
                        <span className="podium-amount">₹20,000</span>
                        <span className="podium-sub">Cash Prize + Trophy</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Disqualification List */}
                <div className="visual-disqualification-card" style={{ marginTop: '20px' }}>
                  <h4 className="detail-heading danger">
                    <ShieldAlert size={18} /> Disqualification Criteria
                  </h4>
                  <ul className="disqualification-chips-list">
                    <li>Copied, plagiarized, or AI-generated submissions without originality</li>
                    <li>Non-adherence to deadlines or submission guidelines</li>
                    <li>Failure to meet team size (5 members) or gender inclusion criteria</li>
                    <li>Misconduct during event (academic dishonesty, disruptive behavior)</li>
                  </ul>
                </div>

                <div className="card-bottom-cta">
                  <button 
                    className="btn btn-primary btn-compact-lg"
                    onClick={() => handleUnstopClick('Sociothon')}
                  >
                    <span>Register Team on Unstop</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. IDEATHON (SOCIAL TRACK) */}
            <div className={`reg-event-card card-clean ${expandedTrack === 'ideathon' ? 'expanded' : ''}`} style={{ marginTop: '24px' }}>
              <div className="event-card-header" onClick={() => setExpandedTrack(expandedTrack === 'ideathon' ? null : 'ideathon')}>
                <div className="event-title-group">
                  <div className="event-icon-box blue">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <div className="event-meta-badges">
                      <span className="badge-pill">SOCIAL TRACK</span>
                      <span className="badge-outline">₹17,000 PRIZE POOL</span>
                    </div>
                    <h2 className="heading-2 event-card-title">Ideathon — Social Track</h2>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                      Formulate domain-wise social impact proposals & sustainability action frameworks.
                    </p>
                  </div>
                </div>

                <div className="event-header-actions">
                  <button 
                    className="btn btn-primary btn-compact"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnstopClick('Ideathon');
                    }}
                  >
                    <span>Register on Unstop</span>
                    <ExternalLink size={14} />
                  </button>
                  <button className="expand-toggle-btn" aria-label="Toggle details">
                    {expandedTrack === 'ideathon' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {/* EXPANDABLE DETAILS BODY */}
              <div className="event-card-details">
                
                {/* UNSTOP PROBLEM STATEMENTS NOTICE */}
                <div className="unstop-ps-notice-bar animate-slide-right">
                  <Sparkles size={16} />
                  <span>Problem statements will be displayed on <strong>Unstop</strong>.</span>
                </div>

                {/* VISUAL TIMELINE FOR PROJECT ROUNDS */}
                <div className="details-visual-section">
                  <h4 className="visual-section-heading">
                    <Calendar size={18} /> Event Journey & Project Rounds
                  </h4>
                  <div className="rounds-timeline-stepper two-steps">
                    
                    {/* Step 1 */}
                    <div className="timeline-step">
                      <div className="step-circle">1</div>
                      <div className="step-content">
                        <span className="step-tag free-tag">FREE ENTRY</span>
                        <h5 className="step-title">Round 1: Idea Pitch</h5>
                        <p className="step-desc">PPT-based idea submission on Unstop. <strong>100 teams shortlisted.</strong></p>
                      </div>
                    </div>

                    <div className="timeline-connector"></div>

                    {/* Step 2 */}
                    <div className="timeline-step">
                      <div className="step-circle final-circle">2</div>
                      <div className="step-content">
                        <span className="step-tag fee-tag">₹180 FEE</span>
                        <h5 className="step-title">Round 2: Offline Pitch Presentation</h5>
                        <p className="step-desc">In-person pitch presentation for Winner & Runner-up titles.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* PRIZE & TEAM RULES GRID */}
                <div className="rules-prize-flex-grid" style={{ marginTop: '24px' }}>
                  
                  {/* Team Rules Box */}
                  <div className="visual-rule-card">
                    <h4 className="detail-heading">
                      <Users size={18} /> Team Formation Rules
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Team Participation:</strong> Team-based (Social Impact & Sustainability focus).</li>
                      <li><strong>Team Size:</strong> Minimum 2 – Maximum 3 members.</li>
                      <li>Open to all interested Bachelor's degree students.</li>
                    </ul>
                  </div>

                  {/* Visual Prize Badge Box */}
                  <div className="visual-prize-card">
                    <h4 className="detail-heading">
                      <Trophy size={18} /> Prize Breakdown (₹17,000 Pool)
                    </h4>
                    <div className="prize-visual-strip">
                      <div className="prize-podium winner">
                        <span className="podium-rank">🏆 WINNER</span>
                        <span className="podium-amount">₹11,000</span>
                        <span className="podium-sub">Cash Prize + Trophy</span>
                      </div>
                      <div className="prize-podium runner">
                        <span className="podium-rank">🥈 1ST RUNNER UP</span>
                        <span className="podium-amount">₹6,000</span>
                        <span className="podium-sub">Cash Prize + Trophy</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Disqualification List */}
                <div className="visual-disqualification-card" style={{ marginTop: '20px' }}>
                  <h4 className="detail-heading danger">
                    <ShieldAlert size={18} /> Disqualification Criteria
                  </h4>
                  <ul className="disqualification-chips-list">
                    <li>Copied, plagiarized, or AI-generated submissions without originality</li>
                    <li>Non-adherence to deadlines or submission guidelines</li>
                    <li>Failure to meet team size criteria (2–3 members)</li>
                    <li>Misconduct during event (academic dishonesty, disruptive behavior)</li>
                  </ul>
                </div>

                <div className="card-bottom-cta">
                  <button 
                    className="btn btn-primary btn-compact-lg"
                    onClick={() => handleUnstopClick('Ideathon')}
                  >
                    <span>Register Team on Unstop</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. KALA-KRITI (CULTURAL SHOWCASE) */}
            <div className={`reg-event-card card-clean ${expandedTrack === 'kalakriti' ? 'expanded' : ''}`} style={{ marginTop: '24px' }}>
              <div className="event-card-header" onClick={() => setExpandedTrack(expandedTrack === 'kalakriti' ? null : 'kalakriti')}>
                <div className="event-title-group">
                  <div className="event-icon-box navy">
                    <Music size={24} />
                  </div>
                  <div>
                    <div className="event-meta-badges">
                      <span className="badge-pill">CULTURAL SHOWCASE</span>
                      <span className="badge-outline">STAGE PERFORMANCES</span>
                    </div>
                    <h2 className="heading-2 event-card-title">Kala-Kriti — Cultural Showcase</h2>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                      Celebrate creative expression through music, dance, and live artistic performances.
                    </p>
                  </div>
                </div>

                <div className="event-header-actions">
                  <button 
                    className="btn btn-primary btn-compact"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnstopClick('Kala-Kriti');
                    }}
                  >
                    <span>Register Now</span>
                    <ArrowRight size={14} />
                  </button>
                  <button className="expand-toggle-btn" aria-label="Toggle details">
                    {expandedTrack === 'kalakriti' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {/* EXPANDABLE DETAILS BODY */}
              <div className="event-card-details">
                <div className="details-grid-simple">
                  
                  <div className="visual-rule-card">
                    <h4 className="detail-heading">
                      <Sparkles size={18} /> Performance Categories
                    </h4>
                    <ul className="detail-list">
                      <li>Dance performances</li>
                      <li>Vocal & Instrumental Music</li>
                      <li>Other Performances</li>
                      <li><em>Auditions apply</em></li>
                    </ul>
                  </div>

                  <div className="visual-rule-card">
                    <h4 className="detail-heading">
                      <CheckCircle2 size={18} /> Participant Benefits
                    </h4>
                    <ul className="detail-list">
                      <li>Main stage slot at PRISM '26 Cultural Evening</li>
                      <li>Participation Certificate for all artists</li>
                      <li>National campus recognition & trophies</li>
                    </ul>
                  </div>

                </div>

                <div className="card-bottom-cta">
                  <button 
                    className="btn btn-primary btn-compact-lg"
                    onClick={() => handleUnstopClick('Kala-Kriti')}
                  >
                    <span>Register for Kala-Kriti</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STUDENT EVENT PASSES */}
        {activeTab === 'passes' && (
          <div className="passes-registration-view animate-fade-in">
            <div className="section-header" style={{ marginBottom: '28px' }}>
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
                  <span className="badge-pill">STUDENT COMBO ACCESS</span>
                </div>
                <h3 className="heading-2 pass-title">Combo Pass (Day 1 + Day 2)</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '12px' }}>
                  Full combo access across all PRISM '26 events and sessions.
                </p>
                
                <div className="pass-price-box">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">300</span>
                  <span className="price-period">/ Student</span>
                </div>

                {/* EXACT SPECIFIED COMBO PASS CONTENT */}
                <ul className="pass-features-list">
                  <li><CheckCircle2 size={16} /> Access to inspiring NGO Talks and Guest Sessions</li>
                  <li><CheckCircle2 size={16} /> Full access to TechTalks & Vishwakhyan</li>
                  <li><CheckCircle2 size={16} /> Entry to Kala-Kriti Cultural Evening</li>
                  <li><CheckCircle2 size={16} /> Exposure to social innovation, sustainability, and real-world problem-solving</li>
                  <li><CheckCircle2 size={16} /> Certificates of participation for all attendees</li>
                </ul>

                <button 
                  className="btn btn-primary btn-compact-lg pass-btn"
                  onClick={() => handleUnstopClick('Combo Pass')}
                >
                  <span>Register Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Pass 2: Only Day 2 Pass */}
              <div className="pass-card card-clean">
                <div className="pass-tag-strip">
                  <span className="badge-outline">DAY 2 ONLY</span>
                </div>
                <h3 className="heading-2 pass-title">Day 2 Pass</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '12px' }}>
                  Dedicated access to Day 2 keynote addresses and technical sessions.
                </p>
                
                <div className="pass-price-box">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">200</span>
                  <span className="price-period">/ Student</span>
                </div>

                <ul className="pass-features-list">
                  <li><CheckCircle2 size={16} /> Access to TechTalks & Vishwakhyan</li>
                  <li><CheckCircle2 size={16} /> Entry to Final Pitch & Award Showcase</li>
                  <li><CheckCircle2 size={16} /> Certificate of Participation</li>
                </ul>

                <button 
                  className="btn btn-outline btn-compact-lg pass-btn"
                  onClick={() => handleUnstopClick('Day 2 Pass')}
                >
                  <span>Register Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: BENEFITS AND PERKS */}
        {activeTab === 'perks' && (
          <div className="perks-view animate-fade-in">
            <div className="section-header" style={{ marginBottom: '28px' }}>
              <span className="section-tag">DELEGATE REWARDS</span>
              <h2 className="heading-1">Benefits & Perks Summary</h2>
              <p className="text-muted">
                Key opportunities, networking exposure, and prize pools for all PRISM '26 participants.
              </p>
            </div>

            <div className="perks-grid">
              
              {/* Sociothon Perks Box */}
              <div className="perks-card card-clean">
                <div className="perks-card-header">
                  <div className="event-icon-box navy">
                    <Code2 size={22} />
                  </div>
                  <div>
                    <h3 className="heading-3">Sociothon Perks</h3>
                    <span className="badge-outline">₹50,000 PRIZE POOL</span>
                  </div>
                </div>
                <ul className="perks-list">
                  <li>Certificates for all participants</li>
                  <li>National-level exposure & networking with NGOs, experts, and academicians</li>
                  <li>Recognition, mentorship, and learning opportunities through the PRISM platform</li>
                  <li><strong>Prize Pool worth ₹50,000</strong> (₹30,000 – Winner | ₹20,000 – First Runner Up)</li>
                </ul>
              </div>

              {/* Ideathon Perks Box */}
              <div className="perks-card card-clean">
                <div className="perks-card-header">
                  <div className="event-icon-box blue">
                    <Lightbulb size={22} />
                  </div>
                  <div>
                    <h3 className="heading-3">Ideathon Perks</h3>
                    <span className="badge-outline">₹17,000 PRIZE POOL</span>
                  </div>
                </div>
                <ul className="perks-list">
                  <li>Certificates for all participants</li>
                  <li>National-level exposure & networking with NGOs, experts, and academicians</li>
                  <li>Recognition, mentorship, and learning opportunities through the PRISM platform</li>
                  <li><strong>Prize Pool worth ₹17,000</strong> (₹11,000 – Winner | ₹6,000 – First Runner Up)</li>
                </ul>
              </div>

            </div>

            {/* Overall Perks Banner */}
            <div className="overall-perks-banner card-accent" style={{ marginTop: '28px' }}>
              <h3 className="heading-2" style={{ color: 'var(--primary-navy)', fontSize: '1.4rem' }}>
                Cumulative PRISM '26 Perks Across All Events
              </h3>
              <div className="summary-badges-grid">
                <div className="summary-badge-item">
                  <Trophy size={18} />
                  <span>₹67,000 Combined Prize Pool</span>
                </div>
                <div className="summary-badge-item">
                  <Award size={18} />
                  <span>National Certificates for All</span>
                </div>
                <div className="summary-badge-item">
                  <Users size={18} />
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
          padding-top: 155px;
          padding-bottom: var(--space-xl);
          text-align: center;
        }

        .reg-hero-content {
          max-width: 850px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* REALTIME CURRENT ANNOUNCEMENT BAR */
        .realtime-announcement-bar {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1.5px solid var(--medium-blue);
          padding: 6px 18px;
          border-radius: var(--radius-pill);
          margin-bottom: 14px;
          box-shadow: 0 4px 15px rgba(74, 127, 167, 0.15);
          font-size: 0.85rem;
          color: var(--primary-navy);
        }

        .live-indicator-pulse {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: pulseGreen 1.6s infinite ease-in-out;
        }

        @keyframes pulseGreen {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }

        .zap-icon {
          color: var(--deep-blue);
        }

        /* MAIN HEADING FIT IN SINGLE LINE */
        .reg-main-title {
          font-size: clamp(1.8rem, 3.8vw, 2.75rem);
          white-space: nowrap;
          color: var(--primary-navy);
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .reg-hero-sub {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--deep-blue);
          line-height: 1.5;
          margin-bottom: var(--space-lg);
        }

        .reg-tab-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--white);
          padding: 6px;
          border-radius: var(--radius-pill);
          border: 1.5px solid var(--light-blue);
          box-shadow: var(--shadow-sm);
          flex-wrap: wrap;
          justify-content: center;
        }

        .reg-tab-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: var(--radius-pill);
          border: none;
          background: transparent;
          color: var(--deep-blue);
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
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
          padding-top: var(--space-xl);
        }

        /* COMPACT BUTTON STYLES */
        .btn-compact {
          padding: 7px 15px !important;
          font-size: 0.85rem !important;
          border-radius: var(--radius-pill) !important;
          gap: 6px !important;
        }

        .btn-compact-lg {
          padding: 9px 20px !important;
          font-size: 0.875rem !important;
          border-radius: var(--radius-pill) !important;
          gap: 8px !important;
        }

        /* EVENT CARDS */
        .reg-event-card {
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .reg-event-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(10, 25, 49, 0.08);
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
          gap: 14px;
        }

        .event-icon-box {
          width: 48px;
          height: 48px;
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
          gap: 6px;
          margin-bottom: 2px;
        }

        .event-card-title {
          color: var(--primary-navy);
          margin-bottom: 2px;
          font-size: 1.35rem;
        }

        .event-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .expand-toggle-btn {
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          color: var(--deep-blue);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .expand-toggle-btn:hover {
          background-color: var(--light-blue);
        }

        .event-card-details {
          display: none;
          padding-top: var(--space-lg);
          margin-top: var(--space-md);
          border-top: 1.5px solid var(--light-blue);
        }

        .reg-event-card.expanded .event-card-details {
          display: block;
        }

        /* UNSTOP PROBLEM STATEMENTS NOTICE BAR */
        .unstop-ps-notice-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #EAF2F8 0%, #FFFFFF 100%);
          border: 1.5px solid var(--medium-blue);
          padding: 10px 18px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          color: var(--primary-navy);
          margin-bottom: var(--space-lg);
        }

        /* VISUAL TIMELINE STEPPER FOR ROUNDS */
        .details-visual-section {
          background: var(--white);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: var(--space-lg);
        }

        .visual-section-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-bottom: var(--space-md);
        }

        .rounds-timeline-stepper {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          position: relative;
          gap: 12px;
        }

        .timeline-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .step-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--primary-navy);
          color: var(--white);
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          box-shadow: 0 4px 12px rgba(10, 25, 49, 0.2);
          transition: transform 0.2s ease;
        }

        .step-circle.final-circle {
          background: var(--deep-blue);
          box-shadow: 0 4px 14px rgba(26, 61, 99, 0.3);
        }

        .timeline-step:hover .step-circle {
          transform: scale(1.12);
        }

        .timeline-connector {
          flex: 0 0 40px;
          height: 3px;
          background: var(--light-blue);
          margin-top: 17px;
        }

        .step-tag {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: var(--radius-pill);
          margin-bottom: 4px;
        }

        .free-tag {
          background: rgba(16, 185, 129, 0.15);
          color: #065F46;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .fee-tag {
          background: rgba(74, 127, 167, 0.15);
          color: var(--primary-navy);
          border: 1px solid var(--medium-blue);
        }

        .finale-tag {
          background: rgba(26, 61, 99, 0.15);
          color: var(--deep-blue);
          border: 1px solid var(--deep-blue);
        }

        .step-title {
          font-family: var(--font-heading);
          font-size: 0.925rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-bottom: 4px;
        }

        .step-desc {
          font-size: 0.825rem;
          color: var(--deep-blue);
          line-height: 1.35;
        }

        /* RULES & VISUAL PRIZE FLEX GRID */
        .rules-prize-flex-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .visual-rule-card {
          background-color: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        .detail-heading {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 0.975rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-bottom: var(--space-sm);
        }

        .detail-heading.danger {
          color: var(--primary-navy);
        }

        .detail-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.875rem;
          color: var(--deep-blue);
        }

        .rule-alert-text {
          color: var(--primary-navy);
          font-weight: 700;
          background: rgba(179, 207, 229, 0.3);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          margin-top: 4px;
        }

        /* VISUAL PRIZE CARD */
        .visual-prize-card {
          background: linear-gradient(135deg, #F6FAFD 0%, #EAF2F8 100%);
          border: 1.5px solid var(--medium-blue);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        .prize-visual-strip {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .prize-podium {
          flex: 1;
          background: var(--white);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-sm);
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: var(--shadow-sm);
        }

        .prize-podium.winner {
          border-color: var(--medium-blue);
          background: rgba(255, 255, 255, 0.95);
        }

        .podium-rank {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 2px;
        }

        .podium-amount {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--primary-navy);
        }

        .podium-sub {
          font-size: 0.75rem;
          color: var(--deep-blue);
        }

        /* DISQUALIFICATION CHIPS */
        .visual-disqualification-card {
          background-color: rgba(26, 61, 99, 0.04);
          border: 1px solid rgba(26, 61, 99, 0.18);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        .disqualification-chips-list {
          list-style: disc;
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--deep-blue);
        }

        .details-grid-simple {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .card-bottom-cta {
          margin-top: var(--space-lg);
          display: flex;
          justify-content: flex-end;
        }

        /* PASSES GRID */
        .passes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
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
          margin-bottom: 6px;
        }

        .pass-title {
          color: var(--primary-navy);
          margin-bottom: 4px;
          font-size: 1.35rem;
        }

        .pass-price-box {
          display: flex;
          align-items: baseline;
          margin-top: 6px;
          margin-bottom: var(--space-md);
        }

        .price-currency {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--primary-navy);
        }

        .price-amount {
          font-family: var(--font-heading);
          font-size: 2.75rem;
          font-weight: 800;
          color: var(--primary-navy);
          line-height: 1;
        }

        .price-period {
          font-size: 0.85rem;
          color: var(--medium-blue);
          margin-left: 6px;
        }

        .pass-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: var(--space-lg);
          font-size: 0.9rem;
          color: var(--deep-blue);
        }

        .pass-features-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.4;
        }

        .pass-btn {
          width: 100%;
        }

        /* PERKS GRID */
        .perks-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .perks-card-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .perks-list {
          list-style: disc;
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--deep-blue);
        }

        .overall-perks-banner {
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .summary-badges-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-md);
          margin-top: var(--space-md);
          flex-wrap: wrap;
        }

        .summary-badge-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary-navy);
          background: var(--white);
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--light-blue);
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .animate-slide-right {
          animation: slideRight 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 900px) {
          .reg-main-title {
            white-space: normal;
          }
          .rules-prize-flex-grid, .details-grid-simple, .passes-grid, .perks-grid {
            grid-template-columns: 1fr;
          }
          .rounds-timeline-stepper {
            flex-direction: column;
            align-items: flex-start;
          }
          .timeline-connector {
            width: 3px;
            height: 24px;
            margin-left: 16px;
            margin-top: 0;
          }
          .timeline-step {
            flex-direction: row;
            text-align: left;
            gap: 12px;
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
