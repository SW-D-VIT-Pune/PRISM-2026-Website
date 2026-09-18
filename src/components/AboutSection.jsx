import React from 'react';
import { Heart, Users, Target, ShieldCheck, CheckCircle2, HeartHandshake } from 'lucide-react';

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

        {/* COMMITTEE MISSION BANNER CARD */}
        <div className="committee-mission-card card-clean" style={{ marginTop: '36px', background: 'var(--very-light-bg)', border: '2px solid var(--medium-blue)', borderRadius: 'var(--radius-lg)', padding: '28px' }}>
          <div className="mission-card-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--primary-navy)', color: 'var(--white)', display: 'grid', placeItems: 'center' }}>
              <HeartHandshake size={22} />
            </div>
            <div>
              <span className="section-tag" style={{ margin: 0 }}>OFFICIAL MISSION &amp; VISION</span>
              <h3 className="heading-2" style={{ color: 'var(--primary-navy)', margin: 0 }}>Committee Mission</h3>
            </div>
          </div>
          <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--deep-blue)', margin: 0 }}>
            With the motto of <strong>&quot;Empowering Society, Transforming Lives&quot;</strong>, the Social Welfare and Development Committee at VIT Pune strives to foster empathy, civic responsibility, and sustainable youth leadership across campus, Maharashtra, and nationwide.
          </p>
        </div>

      </div>

      <style>{`
        .about-section {
          background-color: var(--white);
          border-bottom: 1px solid var(--light-blue-alpha-50);
        }

        .about-pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: var(--space-lg);
          margin-top: var(--space-lg);
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
