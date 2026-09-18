import React, { useState } from 'react';
import { 
  Trophy, Users, Award, ShieldAlert, CheckCircle2, ArrowRight, 
  Sparkles, Calendar, HelpCircle, Ticket, Music, Code2, Lightbulb, 
  ExternalLink, ChevronDown, ChevronUp, Radio, Info, Layers, Check 
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
            
            {/* REALTIME CURRENT ANNOUNCEMENT LINE */}
            <div className="realtime-announcement-bar">
              <span className="live-pulse-ring">
                <span className="pulse-dot"></span>
              </span>
              <span className="announcement-tag">LIVE ANNOUNCEMENT</span>
              <span className="announcement-text">
                Registrations are live on Unstop! Shortlisting for Round 1 PPT Submission is open.
              </span>
            </div>

            {/* SINGLE LINE TITLE WITH SMALLER HEADING FONT */}
            <h1 className="reg-main-title">
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
          <div className="tracks-registration-view animate-fade-up">
            
            {/* 1. SOCIOTHON (TECHNICAL TRACK) */}
            <div className={`reg-event-card card-clean ${expandedTrack === 'sociothon' ? 'expanded' : ''}`}>
              <div className="event-card-header" onClick={() => setExpandedTrack(expandedTrack === 'sociothon' ? null : 'sociothon')}>
                <div className="event-title-group">
                  <div className="event-icon-box navy">
                    <Code2 size={22} />
                  </div>
                  <div>
                    <div className="event-meta-badges">
                      <span className="badge-pill">TECHNICAL TRACK</span>
                      <span className="badge-outline">₹50,000 PRIZE POOL</span>
                    </div>
                    <h2 className="event-card-title">Sociothon — Technical Track</h2>
                    <p className="text-muted" style={{ fontSize: '0.88rem' }}>
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
                  <button className="expand-toggle-btn">
                    {expandedTrack === 'sociothon' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* EXPANDABLE DETAILS BODY */}
              <div className="event-card-details">
                
                {/* Team Rules & Disqualification Grid */}
                <div className="details-grid">
                  
                  {/* Team Rules */}
                  <div className="detail-box">
                    <h4 className="detail-heading">
                      <Users size={16} /> Team Formation Rules
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Team Participation:</strong> Interdisciplinary collaboration encouraged</li>
                      <li><strong>Team Size:</strong> Exactly 5 members</li>
                      <li><strong>Gender Inclusion Rule:</strong> Team leader must be a girl, OR team must have at least 2 girl members</li>
                      <li className="rule-alert">Teams not fulfilling this criterion will not be eligible for registration/participation</li>
                    </ul>
                  </div>

                  {/* Disqualification */}
                  <div className="detail-box warning-box">
                    <h4 className="detail-heading">
                      <ShieldAlert size={16} /> Disqualification Criteria
                    </h4>
                    <ul className="detail-list">
                      <li>Submissions copied, plagiarized, or AI-generated without originality</li>
                      <li>Failure to adhere to deadlines or submission guidelines</li>
                      <li>Failure to meet team size (5 members) or gender inclusion rules</li>
                      <li>Misconduct during the event (academic dishonesty, disruptive behavior)</li>
                    </ul>
                  </div>

                </div>

                {/* UNSTOP NOTICE BANNER */}
                <div className="unstop-notice-pill">
                  <Info size={16} />
                  <span><strong>Problem statements will be displayed on Unstop.</strong></span>
                </div>

                {/* CREATIVE VISUAL DELIVERABLES ROADMAP & PRIZE PODIUM */}
                <div className="visual-deliverables-wrapper">
                  
                  {/* Visual Roadmap */}
                  <div className="roadmap-container">
                    <h4 className="visual-section-title">
                      <Layers size={18} /> Project Rounds & Deliverables Roadmap
                    </h4>
                    <div className="roadmap-steps-grid">
                      
                      <div className="roadmap-step-card free-step">
                        <div className="step-badge">Round 1</div>
                        <h5 className="step-title">PPT Idea Submission</h5>
                        <p className="step-desc">PPT-based idea submission on portal.</p>
                        <div className="step-tag free-tag">FREE — 250 Teams Shortlisted</div>
                      </div>

                      <div className="roadmap-step-card paid-step">
                        <div className="step-badge">Round 2</div>
                        <h5 className="step-title">Online Pitch</h5>
                        <p className="step-desc">Online presentation before expert panel.</p>
                        <div className="step-tag price-tag">₹500 for shortlisted teams</div>
                      </div>

                      <div className="roadmap-step-card final-step">
                        <div className="step-badge">Round 3</div>
                        <h5 className="step-title">Final Prototype & Pitch</h5>
                        <p className="step-desc">Working prototype showcase & final pitch.</p>
                        <div className="step-tag final-tag">Grand Finale Showcase</div>
                      </div>

                    </div>
                  </div>

                  {/* Visual Prize Podium */}
                  <div className="prize-visual-container">
                    <h4 className="visual-section-title">
                      <Trophy size={18} /> Prize Pool Breakdown
                    </h4>
                    <div className="prize-podium-cards">
                      <div className="podium-card runner-up">
                        <div className="podium-rank">1st Runner Up</div>
                        <div className="podium-amount">₹20,000</div>
                        <div className="podium-perks">Cash Prize + National Certificate</div>
                      </div>
                      <div className="podium-card winner">
                        <div className="podium-crown">🏆 WINNER</div>
                        <div className="podium-amount">₹30,000</div>
                        <div className="podium-perks">Cash Prize + Mentorship + Pilot Opportunity</div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="card-bottom-cta">
                  <button 
                    className="btn btn-primary btn-compact"
                    onClick={() => handleUnstopClick('Sociothon')}
                  >
                    <span>Register Team for Sociothon on Unstop</span>
                    <ExternalLink size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. IDEATHON (SOCIAL TRACK) */}
            <div className={`reg-event-card card-clean ${expandedTrack === 'ideathon' ? 'expanded' : ''}`} style={{ marginTop: '20px' }}>
              <div className="event-card-header" onClick={() => setExpandedTrack(expandedTrack === 'ideathon' ? null : 'ideathon')}>
                <div className="event-title-group">
                  <div className="event-icon-box blue">
                    <Lightbulb size={22} />
                  </div>
                  <div>
                    <div className="event-meta-badges">
                      <span className="badge-pill">SOCIAL TRACK</span>
                      <span className="badge-outline">₹17,000 PRIZE POOL</span>
                    </div>
                    <h2 className="event-card-title">Ideathon — Social Track</h2>
                    <p className="text-muted" style={{ fontSize: '0.88rem' }}>
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
                  <button className="expand-toggle-btn">
                    {expandedTrack === 'ideathon' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* EXPANDABLE DETAILS BODY */}
              <div className="event-card-details">
                <div className="details-grid">
                  
                  {/* Team Rules */}
                  <div className="detail-box">
                    <h4 className="detail-heading">
                      <Users size={16} /> Team Formation Rules
                    </h4>
                    <ul className="detail-list">
                      <li><strong>Team Participation:</strong> Team-based (Social Impact & Sustainability focus)</li>
                      <li><strong>Team Size:</strong> Minimum 2 – Maximum 3 members</li>
                      <li><strong>Target Domain:</strong> Domain-wise social problem statements</li>
                    </ul>
                  </div>

                  {/* Disqualification */}
                  <div className="detail-box warning-box">
                    <h4 className="detail-heading">
                      <ShieldAlert size={16} /> Disqualification Criteria
                    </h4>
                    <ul className="detail-list">
                      <li>Submissions copied, plagiarized, or AI-generated without originality</li>
                      <li>Failure to adhere to deadlines or submission guidelines</li>
                      <li>Failure to meet the team size criteria (2–3 members)</li>
                      <li>Misconduct during the event (academic dishonesty, disruptive behavior)</li>
                    </ul>
                  </div>

                </div>

                {/* UNSTOP NOTICE BANNER */}
                <div className="unstop-notice-pill">
                  <Info size={16} />
                  <span><strong>Problem statements will be displayed on Unstop.</strong></span>
                </div>

                {/* CREATIVE VISUAL DELIVERABLES ROADMAP & PRIZE PODIUM FOR IDEATHON */}
                <div className="visual-deliverables-wrapper">
                  
                  {/* Visual Roadmap */}
                  <div className="roadmap-container">
                    <h4 className="visual-section-title">
                      <Layers size={18} /> Project Rounds & Deliverables Roadmap
                    </h4>
                    <div className="roadmap-steps-grid two-steps">
                      
                      <div className="roadmap-step-card free-step">
                        <div className="step-badge">Round 1</div>
                        <h5 className="step-title">PPT Idea Submission</h5>
                        <p className="step-desc">PPT-based idea submission on portal.</p>
                        <div className="step-tag free-tag">FREE — 100 Teams Shortlisted</div>
                      </div>

                      <div className="roadmap-step-card paid-step">
                        <div className="step-badge">Round 2</div>
                        <h5 className="step-title">Offline Pitch Presentation</h5>
                        <p className="step-desc">Pitch before evaluation jury panel.</p>
                        <div className="step-tag price-tag">₹180 fee (Winner & Runner-up)</div>
                      </div>

                    </div>
                  </div>

                  {/* Visual Prize Podium */}
                  <div className="prize-visual-container">
                    <h4 className="visual-section-title">
                      <Trophy size={18} /> Prize Pool Breakdown
                    </h4>
                    <div className="prize-podium-cards">
                      <div className="podium-card runner-up">
                        <div className="podium-rank">1st Runner Up</div>
                        <div className="podium-amount">₹6,000</div>
                        <div className="podium-perks">Cash Prize + National Certificate</div>
                      </div>
                      <div className="podium-card winner">
                        <div className="podium-crown">🏆 WINNER</div>
                        <div className="podium-amount">₹11,000</div>
                        <div className="podium-perks">Cash Prize + Mentorship & NGO Network</div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="card-bottom-cta">
                  <button 
                    className="btn btn-primary btn-compact"
                    onClick={() => handleUnstopClick('Ideathon')}
                  >
                    <span>Register Team for Ideathon on Unstop</span>
                    <ExternalLink size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. KALA-KRITI (CULTURAL SHOWCASE) */}
            <div className={`reg-event-card card-clean ${expandedTrack === 'kalakriti' ? 'expanded' : ''}`} style={{ marginTop: '20px' }}>
              <div className="event-card-header" onClick={() => setExpandedTrack(expandedTrack === 'kalakriti' ? null : 'kalakriti')}>
                <div className="event-title-group">
                  <div className="event-icon-box navy">
                    <Music size={22} />
                  </div>
                  <div>
                    <div className="event-meta-badges">
                      <span className="badge-pill">CULTURAL SHOWCASE</span>
                      <span className="badge-outline">STAGE PERFORMANCES</span>
                    </div>
                    <h2 className="event-card-title">Kala-Kriti — Cultural Showcase</h2>
                    <p className="text-muted" style={{ fontSize: '0.88rem' }}>
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
                  <button className="expand-toggle-btn">
                    {expandedTrack === 'kalakriti' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* EXPANDABLE DETAILS BODY */}
              <div className="event-card-details">
                <div className="details-grid">
                  
                  <div className="detail-box">
                    <h4 className="detail-heading">
                      <Sparkles size={16} /> Performance Categories
                    </h4>
                    <ul className="detail-list">
                      <li>Dance performances</li>
                      <li>Vocal & Instrumental Music</li>
                      <li>Other Performances</li>
                      <li>Auditions apply</li>
                    </ul>
                  </div>

                  <div className="detail-box">
                    <h4 className="detail-heading">
                      <CheckCircle2 size={16} /> Participant Benefits
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
                    className="btn btn-primary btn-compact"
                    onClick={() => handleUnstopClick('Kala-Kriti')}
                  >
                    <span>Register for Kala-Kriti Showcase</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STUDENT EVENT PASSES */}
        {activeTab === 'passes' && (
          <div className="passes-registration-view animate-fade-up">
            <div className="section-header" style={{ marginBottom: '24px' }}>
              <span className="section-tag">FOR COLLEGE STUDENTS</span>
              <h2 className="heading-1">Event Ticket Passes</h2>
              <p className="text-muted" style={{ fontSize: '0.92rem' }}>
                Select your pass to gain access to keynote sessions, TechTalks, Vishwakhyan, and cultural showcases.
              </p>
            </div>

            <div className="passes-grid">
              
              {/* Pass 1: Day 1 + Day 2 Combo Pass */}
              <div className="pass-card card-clean highlight-pass">
                <div className="pass-tag-strip">
                  <span className="badge-pill">STUDENT COMBO PASS</span>
                </div>
                <h3 className="pass-title">Combo Pass (Day 1 + Day 2)</h3>
                <p className="text-muted" style={{ fontSize: '0.88rem' }}>
                  Student ticket combo access to all events across both days.
                </p>
                <div className="pass-price-box">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">300</span>
                  <span className="price-period">/ Student</span>
                </div>

                {/* UPDATED EXACT COMBO PASS CONTENT AS REQUESTED */}
                <ul className="pass-features-list">
                  <li><Check size={16} className="check-icon" /> Access to inspiring NGO Talks and Guest Sessions</li>
                  <li><Check size={16} className="check-icon" /> Full access to TechTalks & Vishwakhyan</li>
                  <li><Check size={16} className="check-icon" /> Entry to Kala-Kriti Cultural Evening</li>
                  <li><Check size={16} className="check-icon" /> Exposure to social innovation, sustainability, and real-world problem-solving</li>
                  <li><Check size={16} className="check-icon" /> Certificates of participation for all attendees</li>
                </ul>

                <button 
                  className="btn btn-primary btn-compact pass-btn"
                  onClick={() => handleUnstopClick('Combo Pass')}
                >
                  <span>Register Now</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Pass 2: Only Day 2 Pass */}
              <div className="pass-card card-clean">
                <div className="pass-tag-strip">
                  <span className="badge-outline">ONLY DAY 2</span>
                </div>
                <h3 className="pass-title">Day 2 Pass</h3>
                <p className="text-muted" style={{ fontSize: '0.88rem' }}>
                  TechTalks + Vishwakhyan session pass for Day 2.
                </p>
                <div className="pass-price-box">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">200</span>
                  <span className="price-period">/ Student</span>
                </div>
                <ul className="pass-features-list">
                  <li><Check size={16} className="check-icon" /> Full access to TechTalks & Vishwakhyan</li>
                  <li><Check size={16} className="check-icon" /> Entry to Final Pitch & Award Showcase</li>
                  <li><Check size={16} className="check-icon" /> Certificate of Participation</li>
                </ul>
                <button 
                  className="btn btn-outline btn-compact pass-btn"
                  onClick={() => handleUnstopClick('Day 2 Pass')}
                >
                  <span>Register Now</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: BENEFITS AND PERKS */}
        {activeTab === 'perks' && (
          <div className="perks-view animate-fade-up">
            <div className="section-header" style={{ marginBottom: '24px' }}>
              <span className="section-tag">DELEGATE REWARDS</span>
              <h2 className="heading-1">Benefits & Perks</h2>
              <p className="text-muted" style={{ fontSize: '0.92rem' }}>
                Key benefits and opportunities for PRISM '26 participants.
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
                    <h3 className="heading-3">Sociothon</h3>
                    <span className="badge-outline">PRIZE POOL ₹50,000</span>
                  </div>
                </div>
                <ul className="perks-list">
                  <li>Certificates for all participants</li>
                  <li>National-level exposure & networking with NGOs, experts, and academicians</li>
                  <li>Recognition, mentorship, and learning opportunities through the PRISM platform</li>
                  <li>Prize Pool worth ₹50,000 (₹30,000 – Winner | ₹20,000 – First Runner Up)</li>
                </ul>
              </div>

              {/* Ideathon Perks Box */}
              <div className="perks-card card-clean">
                <div className="perks-card-header">
                  <div className="event-icon-box blue">
                    <Lightbulb size={22} />
                  </div>
                  <div>
                    <h3 className="heading-3">Ideathon</h3>
                    <span className="badge-outline">PRIZE POOL ₹17,000</span>
                  </div>
                </div>
                <ul className="perks-list">
                  <li>Certificates for all participants</li>
                  <li>National-level exposure & networking with NGOs, experts, and academicians</li>
                  <li>Recognition, mentorship, and learning opportunities through the PRISM platform</li>
                  <li>Prize Pool worth ₹17,000 (₹11,000 – Winner | ₹6,000 – First Runner Up)</li>
                </ul>
              </div>

            </div>

            {/* Overall Delegate Benefits Summary */}
            <div className="overall-perks-banner card-accent" style={{ marginTop: '24px' }}>
              <h3 className="heading-2" style={{ color: 'var(--primary-navy)', fontSize: '1.25rem' }}>
                Cumulative PRISM '26 Perks
              </h3>
              <div className="summary-badges-grid">
                <div className="summary-badge-item">
                  <Trophy size={18} />
                  <span>₹67,000 Total Prize Pool</span>
                </div>
                <div className="summary-badge-item">
                  <Award size={18} />
                  <span>National-Level Certification</span>
                </div>
                <div className="summary-badge-item">
                  <Users size={18} />
                  <span>NGO & Industry Exposure</span>
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
          border-bottom: 2px solid var(--light-blue);
          padding-top: 155px;
          padding-bottom: var(--space-xl);
          text-align: center;
        }

        .reg-hero-content {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* REALTIME CURRENT ANNOUNCEMENT BAR */
        .realtime-announcement-bar {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border: 1.5px solid var(--medium-blue);
          padding: 6px 16px;
          border-radius: var(--radius-pill);
          box-shadow: 0 4px 12px rgba(10, 25, 49, 0.08);
          margin-bottom: 14px;
          animation: floatGlow 3s ease-in-out infinite alternate;
        }

        @keyframes floatGlow {
          0% { box-shadow: 0 4px 12px rgba(10, 25, 49, 0.08); }
          100% { box-shadow: 0 6px 18px rgba(74, 127, 167, 0.3); }
        }

        .live-pulse-ring {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 10px;
          height: 10px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 8px #22c55e;
          animation: pulse 1.6s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { transform: scale(1.15); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        .announcement-tag {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary-navy);
          background-color: var(--light-blue);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          letter-spacing: 0.5px;
        }

        .announcement-text {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--deep-blue);
        }

        /* SINGLE LINE HEADING WITH REDUCED FONT SIZE */
        .reg-main-title {
          font-family: var(--font-heading);
          font-size: clamp(1.8rem, 3.8vw, 2.5rem);
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 8px;
          white-space: nowrap;
          letter-spacing: -0.5px;
        }

        .reg-hero-sub {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--deep-blue);
          line-height: 1.5;
          margin-bottom: var(--space-lg);
          max-width: 650px;
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
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .reg-tab-btn:hover {
          color: var(--primary-navy);
          background-color: rgba(179, 207, 229, 0.25);
          transform: translateY(-1px);
        }

        .reg-tab-btn.active {
          background-color: var(--primary-navy);
          color: var(--white);
          box-shadow: 0 4px 12px rgba(10, 25, 49, 0.25);
        }

        .reg-body-container {
          padding-top: var(--space-xl);
        }

        /* COMPACT BUTTON STYLING */
        .btn-compact {
          padding: 8px 16px !important;
          font-size: 0.85rem !important;
          border-radius: var(--radius-pill) !important;
          gap: 6px !important;
          transition: all 0.25s ease !important;
        }

        .btn-compact:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 16px rgba(10, 25, 49, 0.25);
        }

        /* EVENT CARDS */
        .reg-event-card {
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1.5px solid var(--light-blue);
          border-radius: var(--radius-lg);
          background: var(--white);
        }

        .reg-event-card:hover {
          border-color: var(--medium-blue);
          box-shadow: 0 8px 24px rgba(10, 25, 49, 0.08);
        }

        .event-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          gap: var(--space-md);
          padding: var(--space-md) var(--space-lg);
        }

        .event-title-group {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .event-icon-box {
          width: 46px;
          height: 46px;
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
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 2px;
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
          transition: background 0.2s ease;
        }

        .expand-toggle-btn:hover {
          background: var(--light-blue);
          color: var(--primary-navy);
        }

        /* DETAILS GRID */
        .event-card-details {
          display: none;
          padding: var(--space-md) var(--space-lg) var(--space-lg);
          border-top: 1.5px solid var(--light-blue);
          background-color: rgba(246, 250, 253, 0.5);
        }

        .reg-event-card.expanded .event-card-details {
          display: block;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-md);
        }

        .detail-box {
          background-color: var(--white);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        .detail-box.warning-box {
          background-color: rgba(26, 61, 99, 0.03);
          border-color: rgba(26, 61, 99, 0.18);
        }

        .detail-heading {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 8px;
        }

        .detail-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.86rem;
          color: var(--deep-blue);
        }

        .rule-alert {
          color: var(--primary-navy);
          font-weight: 700;
          background-color: rgba(179, 207, 229, 0.3);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
        }

        /* UNSTOP NOTICE PILL */
        .unstop-notice-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(74, 127, 167, 0.1);
          border: 1px solid var(--medium-blue);
          color: var(--primary-navy);
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.86rem;
          margin-top: 14px;
          margin-bottom: 18px;
        }

        /* CREATIVE VISUAL DELIVERABLES & PRIZE PODIUM */
        .visual-deliverables-wrapper {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: var(--space-md);
          margin-top: 16px;
        }

        .visual-section-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 12px;
        }

        .roadmap-container, .prize-visual-container {
          background: var(--white);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: var(--space-md);
        }

        .roadmap-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          position: relative;
        }

        .roadmap-steps-grid.two-steps {
          grid-template-columns: repeat(2, 1fr);
        }

        .roadmap-step-card {
          background-color: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-sm);
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .roadmap-step-card:hover {
          transform: translateY(-3px);
          border-color: var(--medium-blue);
        }

        .step-badge {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--white);
          background-color: var(--primary-navy);
          padding: 2px 6px;
          border-radius: 4px;
          align-self: flex-start;
          margin-bottom: 4px;
        }

        .step-title {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--primary-navy);
          margin-bottom: 2px;
        }

        .step-desc {
          font-size: 0.78rem;
          color: var(--deep-blue);
          line-height: 1.3;
          margin-bottom: 8px;
        }

        .step-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 4px;
          text-align: center;
        }

        .free-tag {
          background: #dcfce7;
          color: #15803d;
        }

        .price-tag {
          background: #e0f2fe;
          color: #0369a1;
        }

        .final-tag {
          background: #fef3c7;
          color: #b45309;
        }

        /* PRIZE PODIUM VISUAL */
        .prize-podium-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .podium-card {
          border-radius: var(--radius-sm);
          padding: 12px 10px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: transform 0.25s ease;
        }

        .podium-card:hover {
          transform: scale(1.03);
        }

        .podium-card.winner {
          background: linear-gradient(135deg, #0A1931 0%, #1A3D63 100%);
          color: var(--white);
          border: 1.5px solid var(--medium-blue);
          box-shadow: 0 4px 14px rgba(10, 25, 49, 0.2);
        }

        .podium-card.runner-up {
          background: var(--very-light-bg);
          color: var(--primary-navy);
          border: 1.5px solid var(--light-blue);
        }

        .podium-crown {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 800;
          color: #f59e0b;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .podium-rank {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--medium-blue);
          margin-bottom: 2px;
        }

        .podium-amount {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          margin-bottom: 2px;
        }

        .podium-card.winner .podium-amount {
          color: #ffffff;
        }

        .podium-perks {
          font-size: 0.72rem;
          opacity: 0.9;
        }

        .card-bottom-cta {
          margin-top: 16px;
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
          border: 1.5px solid var(--light-blue);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          background: var(--white);
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .pass-card:hover {
          transform: translateY(-3px);
          border-color: var(--medium-blue);
          box-shadow: 0 10px 30px rgba(10, 25, 49, 0.1);
        }

        .pass-card.highlight-pass {
          border-color: var(--primary-navy);
          border-width: 2px;
        }

        .pass-tag-strip {
          margin-bottom: 6px;
        }

        .pass-title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 4px;
        }

        .pass-price-box {
          display: flex;
          align-items: baseline;
          margin-top: 10px;
          margin-bottom: 14px;
        }

        .price-currency {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--primary-navy);
        }

        .price-amount {
          font-family: var(--font-heading);
          font-size: 2.6rem;
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
          font-size: 0.88rem;
          color: var(--deep-blue);
        }

        .pass-features-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.4;
        }

        .check-icon {
          color: var(--primary-navy);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .pass-btn {
          width: 100%;
          justify-content: center;
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
          font-size: 0.88rem;
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
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary-navy);
          background: var(--white);
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--light-blue);
        }

        @media (max-width: 900px) {
          .reg-main-title {
            white-space: normal;
          }
          .details-grid, .passes-grid, .perks-grid, .visual-deliverables-wrapper {
            grid-template-columns: 1fr;
          }
          .roadmap-steps-grid {
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
