import React from 'react';
import { Users, Heart, Award, Shield } from 'lucide-react';

export default function CommunitySection() {
  const roles = [
    {
      title: 'Student Delegates',
      badge: 'YOUTH PARTICIPANTS',
      desc: 'College students bringing creative problem-solving, fresh perspectives, and passion for civic betterment.',
      icon: <Users size={24} />
    },
    {
      title: 'NGO & Civic Partners',
      badge: 'COMMUNITY LEADERS',
      desc: 'Grassroots organizations guiding student teams with authentic field insights and real community data.',
      icon: <Heart size={24} />
    },
    {
      title: 'Domain Mentors',
      badge: 'EXPERT GUIDANCE',
      desc: 'Faculty members, social entrepreneurs, and public policy leaders providing technical and ethical oversight.',
      icon: <Award size={24} />
    },
    {
      title: 'SW&D Committee Leadership',
      badge: 'EVENT STEWARDSHIP',
      desc: 'The Social Welfare & Development Committee organizing logistics, safety, evaluation, and seed grants.',
      icon: <Shield size={24} />
    }
  ];

  return (
    <section id="community" className="section-wrapper community-section">
      <div className="container-inner">
        
        <div className="section-header">
          <span className="section-tag">PEOPLE & COLLABORATION</span>
          <h2 className="heading-1">Community Participation</h2>
          <p className="text-muted" style={{ marginTop: '8px' }}>
            PRISM thrives on inclusive collaboration across students, civic partners, mentors, and social welfare leaders.
          </p>
        </div>

        <div className="community-roles-grid">
          {roles.map((item, idx) => (
            <div key={idx} className="role-card card-clean">
              <div className="role-icon-box">
                {item.icon}
              </div>
              <span className="badge-outline" style={{ marginBottom: '8px' }}>{item.badge}</span>
              <h3 className="heading-3 role-title">{item.title}</h3>
              <p className="text-muted role-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .community-section {
          background-color: var(--white);
          border-bottom: 1px solid var(--light-blue-alpha-50);
        }

        .community-roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-lg);
        }

        .role-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .role-icon-box {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-sm);
          background-color: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          color: var(--deep-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-md);
        }

        .role-title {
          color: var(--primary-navy);
          margin-bottom: 6px;
        }

        .role-desc {
          font-size: 0.9rem;
          line-height: 1.55;
        }
      `}</style>
    </section>
  );
}
