import React from 'react';
import { Users, Lightbulb, HeartHandshake, Target } from 'lucide-react';

export default function KeyStats() {
  const stats = [
    {
      number: '100+',
      label: 'Youth Delegates',
      sub: 'Representing student action',
      icon: <Users size={24} />
    },
    {
      number: '20+',
      label: 'Ideas Introduced',
      sub: 'Grassroots welfare proposals',
      icon: <Lightbulb size={24} />
    },
    {
      number: '10+',
      label: 'Community Partners',
      sub: 'NGOs & civic organizations',
      icon: <HeartHandshake size={24} />
    },
    {
      number: '01',
      label: 'Shared Mission',
      sub: 'Sustainable social change',
      icon: <Target size={24} />
    }
  ];

  return (
    <section id="stats" className="section-wrapper stats-section">
      <div className="container-inner">
        
        <div className="section-header">
          <span className="section-tag">COMMUNITY METRICS & REACH</span>
          <h2 className="heading-1">Quantifying Social Impact</h2>
          <p className="text-muted" style={{ marginTop: '8px' }}>
            Empirical participation metrics demonstrating the reach of Social Welfare & Development Committee initiatives.
          </p>
        </div>

        <div className="stats-infographic-grid">
          {stats.map((item, idx) => (
            <div key={idx} className="stat-infographic-card card-accent">
              <div className="stat-card-header">
                <div className="stat-icon-circle">
                  {item.icon}
                </div>
                <span className="badge-outline">METRIC {idx + 1}</span>
              </div>

              <div className="stat-number-display">{item.number}</div>
              <div className="stat-label-title">{item.label}</div>
              <div className="stat-sub-info">{item.sub}</div>

              {/* Decorative SVG connected bar */}
              <div className="stat-bottom-bar">
                <div className="bar-fill"></div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .stats-section {
          background-color: var(--very-light-bg);
          border-bottom: 1px solid var(--light-blue-alpha-50);
        }

        .stats-infographic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--space-lg);
        }

        .stat-infographic-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .stat-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: var(--space-md);
        }

        .stat-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--white);
          border: 1px solid var(--light-blue);
          color: var(--deep-blue);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-number-display {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 4vw, 3.4rem);
          font-weight: 800;
          color: var(--primary-navy);
          line-height: 1;
        }

        .stat-label-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--deep-blue);
          margin-top: 6px;
        }

        .stat-sub-info {
          font-size: 0.85rem;
          color: var(--medium-blue);
          margin-top: 2px;
        }

        .stat-bottom-bar {
          width: 100%;
          height: 4px;
          background-color: var(--light-blue-alpha-50);
          border-radius: var(--radius-pill);
          margin-top: var(--space-md);
          overflow: hidden;
        }

        .bar-fill {
          width: 70%;
          height: 100%;
          background-color: var(--medium-blue);
          border-radius: var(--radius-pill);
        }
      `}</style>
    </section>
  );
}
