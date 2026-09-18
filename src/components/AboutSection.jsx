import React from 'react';
import { Heart, Users, Target, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      title: 'Public Reform',
      sub: 'Grassroots Policy & Civic Awareness',
      desc: 'Enabling youth to research, debate, and advocate for civic improvements and public welfare reform.',
      icon: <Target size={24} />
    },
    {
      title: 'Innovation',
      sub: 'Human-Centered Solutions',
      desc: 'Applying practical technology and design thinking to address real-world community challenges.',
      icon: <Users size={24} />
    },
    {
      title: 'Sustainability',
      sub: 'Long-Term Ecological Impact',
      desc: 'Promoting circular systems, environmental responsibility, and sustainable community models.',
      icon: <Heart size={24} />
    },
    {
      title: 'Management',
      sub: 'Organized Social Execution',
      desc: 'Training student leaders in ethical project administration, field execution, and grant management.',
      icon: <ShieldCheck size={24} />
    }
  ];

  return (
    <section id="about" className="section-wrapper about-section">
      <div className="container-inner">
        
        <div className="section-header">
          <span className="section-tag">COMMITTEE BACKGROUND & FOUNDATION</span>
          <h2 className="heading-1">What is PRISM?</h2>
          <p className="text-muted" style={{ marginTop: '8px' }}>
            PRISM is the annual social-impact gathering organized by the Social Welfare & Development Committee at VIT Pune—bringing together passion, community action, and structured reform.
          </p>
        </div>

        {/* COMMITTEE MISSION BANNER CARD */}
        <div className="committee-mission-card">
          <div className="mission-badge">
            <HeartHandshake size={18} />
            <span>OUR COMMITTEE MISSION</span>
          </div>
          <h3 className="heading-2 mission-title">&quot;Empowering Society, Transforming Lives&quot;</h3>
          <p className="mission-copy">
            The Social Welfare &amp; Development Committee at VIT Pune is dedicated to facilitating civic awareness, student-led volunteerism, and sustainable community outreach. PRISM 2026 serves as our flagship stage to empower youth changemakers and engineer long-term social welfare solutions.
          </p>
        </div>

        <div className="about-pillars-grid">
          {pillars.map((item, idx) => (
            <div key={idx} className="pillar-card card-clean">
              <div className="pillar-icon-box">
                {item.icon}
              </div>
              <h3 className="heading-3 pillar-title">{item.title}</h3>
              <span className="pillar-sub">{item.sub}</span>
              <p className="text-muted pillar-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .about-section {
          background-color: var(--white);
          border-bottom: 1px solid var(--light-blue-alpha-50);
        }

        .committee-mission-card {
          margin-top: var(--space-xl);
          padding: clamp(24px, 4vw, 36px);
          background: linear-gradient(135deg, var(--primary-navy) 0%, var(--deep-blue) 100%);
          border: 2px solid var(--medium-blue);
          border-radius: var(--radius-xl);
          color: var(--white);
          box-shadow: 0 12px 35px rgba(10, 25, 49, 0.18);
        }

        .mission-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(179, 207, 229, 0.2);
          border: 1px solid var(--medium-blue);
          border-radius: var(--radius-pill);
          color: var(--light-blue);
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .mission-title {
          color: var(--white);
          font-size: clamp(1.4rem, 3vw, 1.85rem);
          margin-bottom: 10px;
        }

        .mission-copy {
          color: var(--light-blue);
          font-size: var(--font-size-body-lg);
          line-height: 1.65;
          max-width: 900px;
        }

        .about-pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: var(--space-lg);
          margin-top: var(--space-xl);
        }

        .pillar-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all var(--transition-base);
        }

        .pillar-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background-color: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          color: var(--deep-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-md);
        }

        .pillar-card:hover .pillar-icon-box {
          background-color: var(--primary-navy);
          color: var(--white);
        }

        .pillar-title {
          color: var(--primary-navy);
          margin-bottom: 2px;
        }

        .pillar-sub {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--medium-blue);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: var(--space-xs);
        }

        .pillar-desc {
          font-size: 0.925rem;
          line-height: 1.55;
        }
      `}</style>
    </section>
  );
}
