import React from 'react';
import { Lightbulb, Users, Compass, HeartHandshake } from 'lucide-react';

export default function ConnectedJourney() {
  const steps = [
    {
      num: '01',
      title: 'IDEAS',
      sub: 'Problem Discovery',
      desc: 'Students research grassroots social issues, environmental needs, and civic challenges submitted by community partners.',
      icon: <Lightbulb size={22} />
    },
    {
      num: '02',
      title: 'COLLABORATION',
      sub: 'Cross-Disciplinary Teams',
      desc: 'Forming interdisciplinary teams combining engineering, management, and humanities perspectives.',
      icon: <Users size={22} />
    },
    {
      num: '03',
      title: 'ACTION',
      sub: 'Fieldwork & Prototyping',
      desc: 'Executing rapid software development, community workshops, or physical welfare drives.',
      icon: <Compass size={22} />
    },
    {
      num: '04',
      title: 'IMPACT',
      sub: 'Sustainable Outcomes',
      desc: 'Presenting tangible results at the PRISM Showcase and receiving seed incubation grants for deployment.',
      icon: <HeartHandshake size={22} />
    }
  ];

  return (
    <section id="process" className="section-wrapper journey-section">
      <div className="container-inner">
        
        <div className="section-header">
          <span className="section-tag">CONNECTED INFOGRAPHIC PATH</span>
          <h2 className="heading-1">The PRISM Journey</h2>
          <p className="text-muted" style={{ marginTop: '8px' }}>
            A structured 4-step visual flow guiding delegates from early problem identification to sustainable social impact.
          </p>
        </div>

        <div className="journey-flow-container">
          <div className="journey-connector-bar"></div>

          <div className="journey-steps-grid">
            {steps.map((step) => (
              <div key={step.num} className="journey-card card-clean">
                <div className="journey-card-header">
                  <div className="journey-num-badge">{step.num}</div>
                  <div className="journey-icon-circle">
                    {step.icon}
                  </div>
                </div>

                <h3 className="heading-3 journey-title">{step.title}</h3>
                <span className="journey-sub">{step.sub}</span>
                <p className="text-muted journey-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .journey-section {
          background-color: var(--very-light-bg);
          border-bottom: 1px solid var(--light-blue-alpha-50);
        }

        .journey-flow-container {
          position: relative;
          margin-top: var(--space-xl);
        }

        .journey-connector-bar {
          position: absolute;
          top: 48px;
          left: 8%;
          right: 8%;
          height: 3px;
          background: linear-gradient(90deg, var(--light-blue) 0%, var(--medium-blue) 50%, var(--deep-blue) 100%);
          z-index: 1;
        }

        .journey-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
          position: relative;
          z-index: 2;
        }

        .journey-card {
          background-color: var(--white);
          display: flex;
          flex-direction: column;
          position: relative;
          min-height: 280px;
        }

        .journey-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-md);
        }

        .journey-num-badge {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--light-blue);
          line-height: 1;
        }

        .journey-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--primary-navy);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(10, 25, 49, 0.15);
        }

        .journey-title {
          color: var(--primary-navy);
          letter-spacing: 0.04em;
        }

        .journey-sub {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--medium-blue);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: var(--space-xs);
        }

        .journey-desc {
          font-size: 0.875rem;
          line-height: 1.55;
        }

        @media (max-width: 1024px) {
          .journey-connector-bar {
            display: none;
          }
          .journey-steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-lg);
          }
        }

        @media (max-width: 600px) {
          .journey-steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
