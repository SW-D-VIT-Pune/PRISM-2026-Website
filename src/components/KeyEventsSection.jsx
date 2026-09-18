import React, { useState } from 'react';
import { 
  Landmark, Lightbulb, Mic2, Sparkles, Music2, Theater, 
  CheckCircle2, Star, ShieldCheck, ArrowRight, Zap, Calendar, Users
} from 'lucide-react';

export default function KeyEventsSection() {
  const [selectedEventId, setSelectedEventId] = useState('youth-floor');

  const keyEvents = [
    {
      id: 'youth-floor',
      num: '01',
      title: 'The Youth Floor',
      tag: 'YOUTH PARLIAMENT',
      isExclusive: true,
      day: 'Day 1',
      audience: 'Youth & Social Units Only',
      desc: 'Youth parliament simulation where registered Youth & Social Units debate pressing civic, social, and public policy issues in a mock-parliamentary format.',
      highlights: [
        'Mock parliamentary debates & policy resolution drafting',
        'Direct evaluation by policy experts & civic mentors',
        'Exclusive to registered Youth & Social Units'
      ],
      icon: <Landmark size={22} />,
      accentColor: '#F59E0B'
    },
    {
      id: 'sociothon-ideathon',
      num: '02',
      title: 'Sociothon & Ideathon',
      tag: 'INNOVATION HACKATHON',
      isExclusive: false,
      day: 'Day 1 & Day 2',
      audience: 'Open to All College Delegates',
      desc: 'Two-day multi-track social innovation hackathon & idea pitching platform solving real-world community challenges with grant opportunities.',
      highlights: [
        'Multi-track PPT & prototype submission rounds',
        'Direct interaction with domain mentors & NGOs',
        'Cash prizes & seed funding support'
      ],
      icon: <Lightbulb size={22} />,
      accentColor: '#3B82F6'
    },
    {
      id: 'tedx-ngo-talks',
      num: '03',
      title: 'TEDx Talks & NGO Sessions',
      tag: 'KEYNOTE & FIELD INSIGHTS',
      isExclusive: false,
      day: 'Day 2',
      audience: 'All Event Pass Holders',
      desc: 'Curated speaker sessions featuring TEDx speakers, social pioneers, and leading NGOs sharing lived field experiences.',
      highlights: [
        'Speakers from NAAM Foundation, Teach for India, Vanarai, 1M1B',
        'Real-world grassroots impact stories',
        'Interactive Q&A & networking opportunities'
      ],
      icon: <Mic2 size={22} />,
      accentColor: '#6366F1'
    },
    {
      id: 'conclave-openmind',
      num: '04',
      title: 'Conclave / Open Mind',
      tag: 'OPEN THOUGHT EXCHANGE',
      isExclusive: false,
      day: 'Day 1 & Day 2',
      audience: 'Open Participation',
      desc: 'An interactive, open-floor dialogue platform for participants to voice perspectives on civic awareness, ethics, and social change.',
      highlights: [
        'Unfiltered student-led open floor discussions',
        'Topics spanning civic reform, sustainability, & tech ethics',
        'Inclusive facilitated sessions'
      ],
      icon: <Sparkles size={22} />,
      accentColor: '#10B981'
    },
    {
      id: 'kala-kriti',
      num: '05',
      title: 'Kala-Kriti',
      tag: 'CULTURAL SHOWCASE',
      isExclusive: false,
      day: 'Day 1 Evening',
      audience: 'All Attendees',
      desc: 'Vibrant cultural showcase highlighting student talent through dance, music performances, and creative artistic expression.',
      highlights: [
        'Live student musical & dance ensembles',
        'Celebration of creative youth expression',
        'Energetic evening delegate gathering'
      ],
      icon: <Music2 size={22} />,
      accentColor: '#EC4899'
    },
    {
      id: 'vishwa-akhyan',
      num: '06',
      title: 'Vishwa Akhyan',
      tag: 'GRAND CLOSING SHOWCASE',
      isExclusive: false,
      day: 'Day 2 Closing',
      audience: 'All Attendees',
      desc: 'The flagship closing segment celebrating Maharashtra’s rich heritage through Marathi music, theatrical narration, and awards ceremony.',
      highlights: [
        'Traditional Marathi music & dramatic narration',
        'Prize distribution & felicitation ceremony',
        'Memorable PRISM ’26 valedictory conclusion'
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
            <Zap size={14} /> PROGRAMME CIRCUIT &amp; TIMELINE
          </span>
          <h2 className="heading-1 events-section-title">
            Key Events &amp; Highlights
          </h2>
          <p className="text-muted events-section-sub">
            Explore the flagship programme pipeline for PRISM ’26. Tap any event node on the pathway to view details.
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
                    className={`circuit-node-capsule ${isSelected ? 'active-node' : ''} ${item.isExclusive ? 'exclusive-node' : ''}`}
                    onClick={() => setSelectedEventId(item.id)}
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
                      {item.isExclusive && (
                        <span className="node-exclusive-badge">
                          <Star size={12} /> EXCLUSIVE
                        </span>
                      )}
                      <span className="node-day-pill">{item.day}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Interactive Focus Stage */}
          <div className="circuit-focus-stage">
            <div className="focus-stage-card card-clean" style={{ '--active-accent': selectedEvent.accentColor }}>
              
              <div className="focus-header">
                <div className="focus-badge-strip">
                  <span className="badge-pill focus-num-pill">
                    EVENT {selectedEvent.num} OF 06
                  </span>
                  <span className="badge-outline focus-tag-pill">
                    {selectedEvent.tag}
                  </span>
                  {selectedEvent.isExclusive && (
                    <span className="badge-pill focus-gold-badge">
                      <Star size={13} /> YOUTH &amp; SOCIAL UNIT EXCLUSIVE
                    </span>
                  )}
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

              <div className="focus-footer-cta">
                <span className="cta-note">Ready to join this track at PRISM '26?</span>
                <a href="#registration" className="focus-action-btn">
                  <span>View Registration Passes</span>
                  <ArrowRight size={16} />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Youth & Social Unit Exclusives Floating Ribbon */}
        <div className="unit-exclusives-ribbon">
          <div className="ribbon-glow-mark">
            <ShieldCheck size={26} />
          </div>
          <div className="ribbon-text-body">
            <span className="ribbon-tag">SPECIAL NOTE FOR DELEGATE UNITS</span>
            <h4 className="ribbon-heading">
              Youth &amp; Social Unit-Exclusive Events
            </h4>
            <p className="ribbon-copy">
              <strong>The Youth Floor</strong> (Day 1 Youth Parliament simulation) and <strong>Tenure Presentations</strong> (Day 1 annual tenure activities showcase) are open specifically to registered Youth &amp; Social Units.
            </p>
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
          margin-bottom: 38px;
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

        .circuit-node-capsule.exclusive-node {
          border-color: rgba(217, 119, 6, 0.4);
        }

        .circuit-node-capsule.exclusive-node.active-node {
          background: linear-gradient(135deg, var(--primary-navy) 0%, #1E293B 100%);
          border-color: #F59E0B;
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

        .node-exclusive-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 800;
          color: #B45309;
          background: #FEF3C7;
          padding: 3px 9px;
          border-radius: var(--radius-pill);
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

        .focus-gold-badge {
          background: #FEF3C7;
          color: #B45309;
          font-weight: 800;
          font-size: 0.75rem;
        }

        .focus-event-title {
          color: var(--primary-navy);
          margin-bottom: 10px;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
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
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .focus-action-btn:hover {
          background: var(--deep-blue);
          transform: translateY(-2px);
        }

        /* RIBBON BANNER FOR EXCLUSIVES */
        .unit-exclusives-ribbon {
          display: flex;
          align-items: center;
          gap: 20px;
          background: linear-gradient(135deg, var(--primary-navy) 0%, #1E293B 100%);
          border: 2px solid var(--medium-blue);
          border-radius: var(--radius-lg);
          padding: 24px 30px;
          color: var(--white);
          box-shadow: 0 12px 35px rgba(10, 25, 49, 0.2);
        }

        .ribbon-glow-mark {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          border: 1.5px solid rgba(179, 207, 229, 0.4);
          color: #F59E0B;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .ribbon-tag {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--light-blue);
          letter-spacing: 0.08em;
        }

        .ribbon-heading {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--white);
          margin: 2px 0 4px 0;
        }

        .ribbon-copy {
          font-size: 0.93rem;
          color: var(--light-blue);
          margin: 0;
          line-height: 1.5;
        }

        .ribbon-copy strong {
          color: var(--white);
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
          .unit-exclusives-ribbon {
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
