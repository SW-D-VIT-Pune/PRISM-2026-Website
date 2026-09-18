import React, { useState } from 'react';
import { Sparkles, Users, Globe, Leaf, ArrowUpRight, HelpCircle, Award } from 'lucide-react';

export default function EventTracks({ onTrackClick, onQuizClick }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const experiences = [
    {
      id: 1,
      category: 'innovation',
      title: 'Social Innovation Challenge',
      badge: 'IDEAS TO PROTOTYPE',
      desc: 'Collaborative student teams pitch human-centered models solving public sanitation, education, or healthcare gaps.',
      icon: <Sparkles size={24} />,
      tag: 'Grant Mentorship'
    },
    {
      id: 2,
      category: 'leadership',
      title: 'Youth Leadership & Policy Summit',
      badge: 'CIVIC ADVOCACY',
      desc: 'Interactive debates and roundtables drafting youth resolutions to submit to local civic representatives.',
      icon: <Globe size={24} />,
      tag: 'Policy Resolution'
    },
    {
      id: 3,
      category: 'community',
      title: 'Grassroots Community Outreach',
      badge: 'FIELD ACTION',
      icon: <Users size={24} />,
      desc: 'Direct volunteer drives in rural & urban centers focusing on digital literacy and health education.',
      tag: 'Direct Service'
    },
    {
      id: 4,
      category: 'sustainability',
      title: 'Sustainable Action Fair',
      badge: 'ECO INNOVATION',
      icon: <Leaf size={24} />,
      desc: 'Exhibiting student-led circular economy prototypes, waste reduction models, and clean water campaigns.',
      tag: 'Green Future'
    }
  ];

  const filtered = activeFilter === 'all'
    ? experiences
    : experiences.filter(e => e.category === activeFilter);

  return (
    <section id="tracks" className="section-wrapper experience-section">
      <div className="container-inner">
        
        <div className="section-header">
          <span className="section-tag">EVENT PARTICIPATION & TRACKS</span>
          <h2 className="heading-1">The PRISM Experience</h2>
          <p className="text-muted" style={{ marginTop: '8px' }}>
            Discover four distinct avenues where student creativity meets real community impact.
          </p>
        </div>

        {/* PROMINENT PRISM QUIZ FEATURE BANNER CARD ON HOMEPAGE */}
        <div className="homepage-quiz-banner-card card-clean" style={{ marginBottom: '40px', background: 'linear-gradient(135deg, var(--very-light-bg) 0%, var(--white) 100%)', border: '2px solid var(--medium-blue)' }}>
          <div className="quiz-banner-content">
            <div className="quiz-badge-strip">
              <span className="badge-pill" style={{ backgroundColor: 'var(--primary-navy)', color: 'var(--white)' }}>
                <HelpCircle size={14} /> INTERACTIVE QUIZ
              </span>
              <span className="badge-outline">Test Your Social Impact Awareness</span>
            </div>
            <h3 className="heading-2" style={{ color: 'var(--primary-navy)', marginTop: '12px' }}>
              Participate in the Official PRISM '26 Social Awareness Quiz
            </h3>
            <p className="text-muted" style={{ marginTop: '6px', maxWidth: '640px' }}>
              Challenge your knowledge on SDGs, public policy reform, and grassroots sustainability. Earn digital certificates and event delegate points!
            </p>
          </div>
          <div className="quiz-banner-action">
            <button className="btn btn-primary btn-lg" onClick={onQuizClick}>
              <HelpCircle size={20} />
              <span>Start PRISM Quiz</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="experience-filter-pills">
          <button
            className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Experiences
          </button>
          <button
            className={`filter-pill ${activeFilter === 'innovation' ? 'active' : ''}`}
            onClick={() => setActiveFilter('innovation')}
          >
            Innovation
          </button>
          <button
            className={`filter-pill ${activeFilter === 'leadership' ? 'active' : ''}`}
            onClick={() => setActiveFilter('leadership')}
          >
            Leadership
          </button>

          <button
            className={`filter-pill ${activeFilter === 'community' ? 'active' : ''}`}
            onClick={() => setActiveFilter('community')}
          >
            Community
          </button>

          <button
            className={`filter-pill ${activeFilter === 'sustainability' ? 'active' : ''}`}
            onClick={() => setActiveFilter('sustainability')}
          >
            Sustainability
          </button>
        </div>

        {/* Experience Cards Grid */}
        <div className="experience-cards-grid">
          {filtered.map(item => (
            <div key={item.id} className="experience-card card-clean">
              <div className="exp-card-header">
                <div className="exp-icon-box">
                  {item.icon}
                </div>
                <span className="badge-pill">{item.badge}</span>
              </div>

              <h3 className="heading-3 exp-title">{item.title}</h3>
              <p className="text-muted exp-desc">{item.desc}</p>

              <div className="exp-card-footer">
                <span className="exp-tag">{item.tag}</span>
                <button className="btn btn-outline btn-sm" onClick={onTrackClick}>
                  <span>Explore Track</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .experience-section {
          background-color: var(--white);
          border-bottom: 1px solid var(--light-blue-alpha-50);
        }

        .homepage-quiz-banner-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-xl);
          gap: var(--space-lg);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .quiz-badge-strip {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .experience-filter-pills {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: var(--space-xl);
          flex-wrap: wrap;
        }

        .filter-pill {
          background-color: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          color: var(--deep-blue);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: var(--radius-pill);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-pill:hover {
          color: var(--primary-navy);
          border-color: var(--medium-blue);
        }

        .filter-pill.active {
          background-color: var(--primary-navy);
          color: var(--white);
          border-color: var(--primary-navy);
        }

        .experience-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          gap: var(--space-lg);
        }

        .experience-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 280px;
        }

        .exp-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-md);
        }

        .exp-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background-color: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          color: var(--deep-blue);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .exp-title {
          color: var(--primary-navy);
          margin-bottom: 6px;
        }

        .exp-desc {
          font-size: 0.9rem;
          line-height: 1.55;
        }

        .exp-card-footer {
          border-top: 1px solid var(--light-blue-alpha-50);
          padding-top: var(--space-md);
          margin-top: var(--space-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .exp-tag {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--medium-blue);
        }

        @media (max-width: 900px) {
          .homepage-quiz-banner-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
