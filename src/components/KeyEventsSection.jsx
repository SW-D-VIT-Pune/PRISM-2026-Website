import React, { useState } from 'react';
import { 
  Landmark, Lightbulb, Mic2, Sparkles, Music2, Theater, 
  CheckCircle2, ArrowRight, Zap, Calendar, Users
} from 'lucide-react';

export default function KeyEventsSection({ onEventRegister }) {
  const [selectedEventId, setSelectedEventId] = useState('nss-events');

  const keyEvents = [
    {
      id: 'nss-events',
      num: '01',
      title: 'NSS Events',
      tag: 'NSS UNIT EVENTS',
      day: 'Day 1',
      audience: 'NSS Volunteers & Registered Units',
      regTarget: 'nss-unit-events',
      desc: 'Official competitive forums and showcase activities open to registered NSS & Social Units including The Youth Floor and Tenure Presentations.',
      highlights: [
        'The Youth Floor: Mock parliamentary debate & policy resolutions',
        'Tenure Presentations: Impact metrics & village project showcase',
        'Direct redirection to NSS Unit Events in NSS tab'
      ],
      icon: <Landmark size={22} />,
      accentColor: '#4A7FA7'
    },
    {
      id: 'ngo-talks',
      num: '02',
      title: 'NGO Talks',
      tag: 'FIELD INSIGHTS & DIALOGUE',
      day: 'Day 1',
      audience: 'All Attendees & Registered Delegates',
      regTarget: 'nss-unit-events',
      desc: 'Representatives from leading NGOs (NAAM Foundation, Teach for India, Vanarai, 1M1B) share field insights, grassroots impact stories, and social innovation realities.',
      highlights: [
        'Impact stories & grassroots field realities by NGO founders',
        'Interactive panel Q&A with social sector pioneers',
        'Access included for all registered attendees and delegates'
      ],
      icon: <Users size={22} />,
      accentColor: '#1A3D63'
    },
    {
      id: 'open-mind',
      num: '03',
      title: 'Open Mind',
      tag: 'OPEN THOUGHT EXCHANGE',
      day: 'Day 1',
      audience: 'Open Floor Dialogue',
      regTarget: 'ideathon',
      desc: 'An open-floor thought-exchange platform where participants from all backgrounds voice perspectives on social, civic, and innovation themes.',
      highlights: [
        'Facilitated open-floor dialogue without rigid formality',
        'Youth perspectives on civic governance & ethics',
        'Inclusive student & mentor interaction'
      ],
      icon: <Sparkles size={22} />,
      accentColor: '#10B981'
    },
    {
      id: 'kala-kriti',
      num: '04',
      title: 'Kala-Kriti',
      tag: 'CULTURAL SHOWCASE',
      day: 'Day 1',
      audience: 'All Registered Delegates',
      regTarget: 'kalakriti',
      desc: 'Vibrant cultural showcase of dance, music performances, and creative artistic expression celebrating student talent.',
      highlights: [
        'Live dance and music stage showcases',
        'Celebration of Marathi & Indian cultural heritage',
        'Energetic evening delegate gathering'
      ],
      icon: <Music2 size={22} />,
      accentColor: '#EC4899'
    },
    {
      id: 'sociothon-ideathon',
      num: '05',
      title: 'Sociothon & Ideathon',
      tag: 'INNOVATION TRACKS',
      day: 'Day 2',
      audience: 'Competition Delegates',
      regTarget: 'sociothon',
      desc: 'Multi-track social innovation hackathon & idea pitching platform running across Day 2 with prototype rounds and mentorship.',
      highlights: [
        'Sociothon Technical Track & Ideathon PPT pitches',
        'Direct evaluation by domain mentors & seed grant judges',
        '₹67,000 cash prize pool & trophy showcase'
      ],
      icon: <Lightbulb size={22} />,
      accentColor: '#3B82F6'
    },
    {
      id: 'ted-x-talks',
      num: '06',
      title: 'TED-x Talks',
      tag: 'CURATED SPEAKERS',
      day: 'Day 2',
      audience: 'All Event Pass Holders',
      regTarget: 'ideathon',
      desc: 'Curated speaker sessions running alongside Day 2 competition tracks featuring practitioners, changemakers, and domain experts.',
      highlights: [
        'Inspirational talks by domain experts & changemakers',
        'Actionable insights on technology & social impact',
        'Accessible via Student Event Passes'
      ],
      icon: <Mic2 size={22} />,
      accentColor: '#E11D48'
    },
    {
      id: 'vishwa-akhyan',
      num: '07',
      title: 'Vishwa Akhyan',
      tag: 'GRAND CLOSING SHOWCASE',
      day: 'Day 2',
      audience: 'All Attendees',
      regTarget: 'kalakriti',
      desc: 'The flagship closing segment celebrating Maharashtra’s heritage through Marathi music, theatrical narration, drama, and awards.',
      highlights: [
        'Traditional Marathi music, narration, & drama',
        'Valedictory felicitation & award distribution',
        'Memorable conclusion to PRISM ’26'
      ],
      icon: <Theater size={22} />,
      accentColor: '#8B5CF6'
    }
  ];

  const selectedEvent = keyEvents.find(e => e.id === selectedEventId) || keyEvents[0];

  return (
    <section id="key-events" className="section-wrapper key-events-circuit-section">
      <div className="container-inner">
        
        {/* Header */}
        <div className="section-header text-center" style={{ marginBottom: '44px' }}>
          <span className="section-tag glow-tag">
            <Zap size={14} /> PROGRAMME LINEUP &amp; TIMELINE
          </span>
          <h2 className="heading-1 events-section-title">
            Key Events &amp; Highlights
          </h2>
          <p className="text-muted events-section-sub">
            Explore the flagship programme lineup across Day 1 and Day 2. Tap any event node on the pathway to view details.
          </p>
        </div>

        {/* Brainstorming Interconnected Circuit Layout */}
        <div className="circuit-stage-layout">
          
          {/* Left Pathway Nodes */}
          <div className="circuit-nodes-column">
            {keyEvents.map((item, index) => {
              const isSelected = item.id === selectedEventId;
              return (
                <div key={item.id} className="node-item-wrapper">
                  {/* Connecting Line */}
                  {index < keyEvents.length - 1 && <div className="circuit-connector-line"></div>}

                  <button
                    type="button"
                    className={`circuit-node-capsule ${isSelected ? 'active-node' : ''}`}
                    onClick={() => {
                      setSelectedEventId(item.id);
                      if (window.innerWidth <= 850) {
                        setTimeout(() => {
                          const focusCard = document.getElementById('circuit-focus-card');
                          if (focusCard) {
                            const navHeight = 140;
                            const elementPosition = focusCard.getBoundingClientRect().top + window.pageYOffset;
                            window.scrollTo({
                              top: Math.max(0, elementPosition - navHeight),
                              behavior: 'smooth'
                            });
                          }
                        }, 80);
                      }
                    }}
                    aria-label={`Select ${item.title}`}
                  >
                    <div className="node-left-group">
                      <span className="node-num">{item.num}</span>
                      <div className="node-icon-wrapper" style={{ '--accent': item.accentColor }}>
                        {item.icon}
                      </div>
                      <div className="node-title-box">
                        <span className="node-category">{item.tag}</span>
                        <h4 className="node-name">{item.title}</h4>
                      </div>
                    </div>

                    <div className="node-right-group">
                      <span className="node-day-pill">{item.day}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Interactive Focus Stage */}
          <div className="circuit-focus-stage">
            <div className="focus-stage-card card-clean" id="circuit-focus-card" style={{ '--active-accent': selectedEvent.accentColor }}>
              
              <div className="focus-header">
                <div className="focus-badge-strip">
                  <span className="badge-pill focus-num-pill">
                    EVENT {selectedEvent.num} OF 07
                  </span>
                  <span className="badge-outline focus-tag-pill">
                    {selectedEvent.tag}
                  </span>
                </div>

                <h3 className="heading-1 focus-event-title">{selectedEvent.title}</h3>
                
                <div className="focus-meta-strip">
                  <span className="meta-item"><Calendar size={15} /> {selectedEvent.day}</span>
                  <span className="meta-sep">•</span>
                  <span className="meta-item"><Users size={15} /> {selectedEvent.audience}</span>
                </div>
              </div>

              <p className="focus-event-desc">{selectedEvent.desc}</p>

              {/* Highlights List */}
              <div className="focus-highlights-box">
                <h4 className="highlights-heading">Key Session Highlights</h4>
                <ul className="highlights-list">
                  {selectedEvent.highlights.map((h, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className="h-check-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Registration Connection Action Footer */}
              <div className="focus-footer-cta">
                {selectedEvent.regTarget ? (
                  <>
                    <span className="cta-note">Registration open for {selectedEvent.title}!</span>
                    <button 
                      type="button" 
                      className="focus-action-btn"
                      onClick={() => onEventRegister && onEventRegister(selectedEvent.regTarget)}
                    >
                      <span>Register for {selectedEvent.title}</span>
                      <ArrowRight size={16} />
                    </button>
                  </>
                ) : (
                  <div className="session-pass-info-pill">
                    <CheckCircle2 size={16} />
                    <span>Access included with Student Event Passes / General Delegate Entry</span>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

      <style>{`
        .key-events-circuit-section {
          background: linear-gradient(180deg, #F8FAFC 0%, #EAF2F8 100%);
          border-bottom: 1px solid var(--light-blue-alpha-50);
          padding-top: clamp(40px, 6vw, 70px);
          padding-bottom: clamp(40px, 6vw, 70px);
          overflow: hidden;
        }

        .glow-tag {
          background: var(--primary-navy);
          color: var(--white);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .events-section-title {
          color: var(--primary-navy);
          font-weight: 800;
        }

        .events-section-sub {
          max-width: 680px;
          margin: 8px auto 0;
          font-size: 1.05rem;
        }

        /* 2-COLUMN BRAINSTORMING CIRCUIT STAGE */
        .circuit-stage-layout {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 32px;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        /* LEFT COLUMN PATHWAY */
        .circuit-nodes-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
        }

        .node-item-wrapper {
          position: relative;
        }

        .circuit-connector-line {
          position: absolute;
          left: 36px;
          bottom: -14px;
          width: 2px;
          height: 16px;
          background: linear-gradient(180deg, var(--medium-blue), rgba(179, 207, 229, 0.4));
          z-index: 1;
        }

        .circuit-node-capsule {
          width: 100%;
          background: var(--white);
          border: 1.5px solid var(--light-blue);
          border-radius: 40px 14px 40px 14px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 4px 15px rgba(10, 25, 49, 0.04);
          text-align: left;
          position: relative;
          z-index: 2;
        }

        .circuit-node-capsule:hover {
          transform: translateX(6px);
          border-color: var(--medium-blue);
          box-shadow: 0 8px 25px rgba(10, 25, 49, 0.1);
        }

        .circuit-node-capsule.active-node {
          background: var(--primary-navy);
          border-color: var(--primary-navy);
          color: var(--white);
          transform: translateX(8px);
          box-shadow: 0 10px 30px rgba(10, 25, 49, 0.25);
          border-radius: 40px 14px 40px 14px;
        }

        .node-left-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .node-num {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--medium-blue);
          width: 26px;
        }

        .active-node .node-num {
          color: var(--light-blue);
        }

        .node-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          color: var(--primary-navy);
          display: grid;
          place-items: center;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .active-node .node-icon-wrapper {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          color: var(--white);
        }

        .node-title-box {
          display: flex;
          flex-direction: column;
        }

        .node-category {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--medium-blue);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .active-node .node-category {
          color: var(--light-blue);
        }

        .node-name {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--primary-navy);
          margin: 0;
        }

        .active-node .node-name {
          color: var(--white);
        }

        .node-right-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .node-day-pill {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--deep-blue);
          background: rgba(179, 207, 229, 0.22);
          padding: 3px 10px;
          border-radius: var(--radius-pill);
        }

        .active-node .node-day-pill {
          background: rgba(255, 255, 255, 0.15);
          color: var(--white);
        }

        /* RIGHT FOCUS STAGE */
        .circuit-focus-stage {
          position: sticky;
          top: 155px;
        }

        .focus-stage-card {
          background: var(--white);
          border: 2px solid var(--medium-blue);
          border-radius: var(--radius-xl);
          padding: clamp(24px, 4vw, 36px);
          box-shadow: 0 16px 45px rgba(10, 25, 49, 0.12);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }

        .focus-stage-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: var(--active-accent, var(--primary-navy));
        }

        .focus-badge-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .focus-num-pill {
          background: var(--primary-navy);
          color: var(--white);
          font-weight: 800;
          font-size: 0.75rem;
        }

        .focus-tag-pill {
          font-size: 0.75rem;
        }

        .focus-event-title {
          color: var(--primary-navy);
          margin-bottom: 10px;
          font-size: clamp(1.5rem, 2.8vw, 2.1rem);
        }

        .focus-meta-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--medium-blue);
          margin-bottom: 20px;
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .focus-event-desc {
          font-size: 1.02rem;
          color: var(--deep-blue);
          line-height: 1.65;
          margin-bottom: 24px;
        }

        .focus-highlights-box {
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          border-radius: var(--radius-md);
          padding: 18px;
          margin-bottom: 24px;
        }

        .highlights-heading {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--primary-navy);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 10px 0;
        }

        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .highlights-list li {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 0.92rem;
          color: var(--deep-blue);
          line-height: 1.45;
        }

        .h-check-icon {
          color: #10B981;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .focus-footer-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--light-blue);
          padding-top: 18px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cta-note {
          font-size: 0.85rem;
          color: var(--medium-blue);
          font-weight: 600;
        }

        .focus-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--primary-navy);
          color: var(--white);
          padding: 10px 20px;
          border-radius: var(--radius-pill);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .focus-action-btn:hover {
          background: var(--deep-blue);
          transform: translateY(-2px);
        }

        .session-pass-info-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(179, 207, 229, 0.25);
          color: var(--primary-navy);
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          width: 100%;
        }

        @media (max-width: 960px) {
          .circuit-stage-layout {
            grid-template-columns: 1fr;
          }
          .circuit-focus-stage {
            position: static;
          }
        }

        @media (max-width: 600px) {
          .circuit-node-capsule {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 14px;
            border-radius: var(--radius-md);
          }
          .focus-action-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
