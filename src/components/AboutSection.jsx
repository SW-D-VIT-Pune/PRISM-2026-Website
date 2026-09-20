import React from 'react';
import {
  Heart,
  Users,
  Target,
  ShieldCheck,
  UsersRound,
  GraduationCap,
  UserRound,
  Shield,
  Droplets,
  Handshake,
  UserRoundCheck,
  Sparkles,
  Building2,
  ExternalLink,
  Award
} from 'lucide-react';

export default function AboutSection() {

  const [activePillar, setActivePillar] = React.useState(0);

  // -----------------------------
  // P.R.I.S.M. ACRONYM CONNECTED FULL FORM
  // -----------------------------
  const prismAcronym = [
    {
      letter: 'P',
      word: 'Public',
      sub: 'Civic & Community Engagement',
      desc: 'Enabling youth to research, debate, and advocate for civic improvements and public welfare.',
      icon: <Target size={22} />,
      color: '#3B82F6'
    },
    {
      letter: 'R',
      word: 'Reform',
      sub: 'Policy & Social Transformation',
      desc: 'Driving systemic policy improvements, social equity, and grassroots welfare reform.',
      icon: <ShieldCheck size={22} />,
      color: '#10B981'
    },
    {
      letter: 'I',
      word: 'Innovation',
      sub: 'Human-Centered Solutions',
      desc: 'Applying practical technology and design thinking to address real-world community challenges.',
      icon: <Sparkles size={22} />,
      color: '#F59E0B'
    },
    {
      letter: 'S',
      word: 'Sustainability',
      sub: 'Long-Term Ecological Impact',
      desc: 'Promoting circular systems, environmental responsibility, and sustainable community models.',
      icon: <Heart size={22} />,
      color: '#EC4899'
    },
    {
      letter: 'M',
      word: 'Management',
      sub: 'Organized Social Execution',
      desc: 'Training student leaders in ethical project administration, field execution, and governance.',
      icon: <Users size={22} />,
      color: '#8B5CF6'
    }
  ];

  // -----------------------------
  // WHO IT'S FOR
  // -----------------------------
  const audiences = [
    {
      num: '01',
      title: 'Community Leaders',
      subtitle: '& Non-Profits',
      icon: <UsersRound size={24} />
    },
    {
      num: '02',
      title: 'Students & Young',
      subtitle: 'Professionals',
      icon: <GraduationCap size={24} />
    },
    {
      num: '03',
      title: 'Educators &',
      subtitle: 'Academic Leaders',
      icon: <UserRound size={24} />
    },
    {
      num: '04',
      title: 'Tech &',
      subtitle: 'Cybersecurity Experts',
      icon: <Shield size={24} />
    },
    {
      num: '05',
      title: 'Environmental',
      subtitle: 'Activists',
      icon: <Droplets size={24} />
    },
    {
      num: '06',
      title: 'Social',
      subtitle: 'Organisations',
      icon: <Handshake size={24} />
    },
    {
      num: '07',
      title: 'Social Youth &',
      subtitle: 'GenZ Crowd',
      icon: <UserRoundCheck size={24} />
    }
  ];

  return (
    <>
      {/* =========================================
          WHAT IS PRISM - GROUP PHOTO BACKGROUND WITH COMPACT HEIGHT
      ========================================= */}
      <section id="about" className="section-wrapper about-section">
        <div className="container-inner">

          <div className="section-header prism-header">
            <span className="section-eyebrow">
              COMMITTEE BACKGROUND &amp; FOUNDATION
            </span>

            <h2 className="heading-1">
              What is PRISM?
            </h2>

            <p className="text-muted prism-description">
              PRISM is the annual social-impact gathering organized by the
              Social Welfare &amp; Development Committee at VIT Pune—bringing
              together passion, community action, and structured reform.
            </p>
          </div>

          {/* SEPARATE COMPACT STAT CARDS */}
          <div className="about-stats-row">
            <div className="stat-card">
              <span className="stat-card-num">2026</span>
              <p className="stat-card-desc">
                Annual flagship platform for<br />Civic Dialogue &amp; Action
              </p>
            </div>

            <div className="stat-card">
              <span className="stat-card-num">13,400+</span>
              <p className="stat-card-desc">
                Students, NGOs, Institutions,<br />Community Leaders &amp; Social youth
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================
          PRISM PILLARS - P.R.I.S.M. ACRONYM CONNECTED FRAMEWORK
      ========================================= */}
      <section className="pillars-section">
        <div className="container-inner">

          <div className="who-header text-center">
            <span className="who-tag-badge">
              <Sparkles size={14} /> CORE ACRONYM &amp; FRAMEWORK
            </span>
            <h2 className="who-title">
              What P.R.I.S.M. Stands For
            </h2>
          </div>

          {/* INNOVATIVE CONNECTED ACRONYM SPECTRUM BANNER */}
          <div className="prism-acronym-banner">
            <div className="acronym-track-line"></div>
            {prismAcronym.map((item, idx) => (
              <div 
                key={idx} 
                className={`acronym-pill-item ${activePillar === idx ? 'active' : ''}`}
                onClick={() => setActivePillar(idx)}
              >
                <div className="acronym-circle-badge" style={{ '--accent-color': item.color }}>
                  <span>{item.letter}</span>
                </div>
                <div className="acronym-text-block">
                  <span className="acronym-letter-highlight">{item.letter}</span>
                  <span className="acronym-rest">{item.word.slice(1)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 5 CONNECTED PILLAR CARDS GRID */}
          <div className="prism-acronym-cards-grid">
            {prismAcronym.map((item, idx) => (
              <div 
                key={idx} 
                className={`acronym-card ${activePillar === idx ? 'highlighted' : ''}`}
                onMouseEnter={() => setActivePillar(idx)}
              >
                <div className="acronym-card-header">
                  <div className="acronym-letter-box" style={{ backgroundColor: item.color }}>
                    {item.letter}
                  </div>
                  <div className="acronym-card-icon">
                    {item.icon}
                  </div>
                </div>

                <div className="acronym-card-title">
                  <span className="letter-cap" style={{ color: item.color }}>{item.letter}</span>
                  <span>{item.word.slice(1)}</span>
                </div>

                <span className="acronym-card-sub">
                  {item.sub}
                </span>

                <p className="acronym-card-desc">
                  {item.desc}
                </p>

                <div className="acronym-card-connector-bottom" style={{ backgroundColor: item.color }}></div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================
          WHO IT'S FOR - UNIQUE ASYMMETRIC HEX-CAPSULE CARDS
      ========================================= */}
      <section className="who-section">

        {/* Decorative ambient light circles */}
        <div className="who-ambient-glow"></div>

        <div className="container-inner who-container">

          <div className="who-header text-center">
            <span className="who-tag-badge">
              <Sparkles size={14} /> DELEGATE AUDIENCE &amp; PARTICIPANTS
            </span>
            <h2 className="who-title">
              Who It's For
            </h2>
          </div>

          <div className="audience-grid">

            {audiences.map((item, idx) => (
              <div
                key={idx}
                className={`audience-card audience-card-${idx + 1}`}
              >

                <div className="audience-card-top">
                  <div className="audience-icon">
                    {item.icon}
                  </div>
                  <span className="audience-num-pill">{item.num}</span>
                </div>

                <div className="audience-card-body">
                  <h3>
                    {item.title}
                    <br />
                    {item.subtitle}
                  </h3>
                </div>

                <div className="audience-accent-strip"></div>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =========================================
          INSTITUTIONAL STEWARDSHIP & ORGANIZING BODY
      ========================================= */}
      <section className="stewardship-section">
        <div className="container-inner">

          <div className="stewardship-grid">
            
            {/* VIT PUNE CARD */}
            <div className="stewardship-card">
              <div className="stewardship-card-header">
                <div className="stewardship-icon-box">
                  <Building2 size={28} />
                </div>
                <div>
                  <div className="stewardship-pills">
                    <span className="naac-badge"><Award size={12} /> NAAC Grade 'A++'</span>
                    <span className="est-badge">Est. 1983</span>
                  </div>
                  <h3 className="stewardship-card-title">Vishwakarma Institute of Technology</h3>
                  <span className="stewardship-card-sub">Pune, Maharashtra</span>
                </div>
              </div>

              <p className="stewardship-card-desc">
                Part of Bansilal Ramnath Agrawal Charitable Trust, VIT Pune is a benchmark of academic excellence. The institute fosters student initiatives, social awareness, and holistic innovation across diverse conferences and events.
              </p>

              <a 
                href="https://www.vit.edu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="stewardship-link-btn"
              >
                <span>Visit Institute Website</span>
                <ExternalLink size={15} />
              </a>
            </div>

            {/* SWD COMMITTEE CARD */}
            <div className="stewardship-card">
              <div className="stewardship-card-header">
                <div className="stewardship-logo-box">
                  <img src="/images/SWD_logo.png" alt="SWD Committee Logo" className="swd-logo-img" />
                </div>
                <div>
                  <div className="stewardship-pills">
                    <span className="organizer-badge"><Sparkles size={12} /> Organizing Body</span>
                    <span className="est-badge">VIT Pune</span>
                  </div>
                  <h3 className="stewardship-card-title">Social Welfare &amp; Development Committee</h3>
                  <span className="stewardship-card-sub">Student Activity Committee</span>
                </div>
              </div>

              <p className="stewardship-card-desc">
                Dedicated to compassion and societal impact, SWD Committee leads youth empowerment programs and flagship initiatives like <strong>PRISM</strong>, <strong>Police Mitra</strong>, <strong>NSS Camps</strong>, and <strong>Blood Donation Drives</strong>.
              </p>

              <a 
                href="https://swd.vit.edu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="stewardship-link-btn"
              >
                <span>Visit SWD Portal</span>
                <ExternalLink size={15} />
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================
          STYLES
      ========================================= */}
      <style>{`

        /* ======================================
           ABOUT / PRISM SECTION - COMPACT BG HEIGHT & GLASS CARDS
        ====================================== */

        .about-section {
          background: linear-gradient(180deg, rgba(10, 25, 49, 0.70) 0%, rgba(10, 25, 49, 0.88) 100%), url('/images/Grp_photo.jpg') center top / 100% auto no-repeat, #0a1931;
          border-bottom: 3px solid var(--deep-blue);
          position: relative;
          overflow: hidden;
          padding-top: clamp(65px, 7.5vw, 105px);
          padding-bottom: clamp(32px, 4vw, 48px);
        }

        .prism-header {
          text-align: center;
          max-width: 1000px;
          margin: 0 auto;
        }

        .prism-header .heading-1 {
          color: #FFFFFF;
          font-weight: 800;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
        }

        .section-eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #B3CFE5;
          margin-bottom: 8px;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 14px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(179, 207, 229, 0.3);
        }

        .prism-description {
          max-width: 920px;
          margin: 8px auto 0;
          font-size: 1.02rem;
          line-height: 1.6;
          color: #F1F5F9;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
        }

        /* SEPARATE CLEAN FLOATING STATS */
        .about-stats-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          max-width: 820px;
          margin: 40px auto 48px;
        }

        .stat-card {
          flex: 1;
          max-width: 380px;
          background: none;
          border: none;
          box-shadow: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.25s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
        }

        .stat-card-num {
          font-family: var(--font-heading);
          font-size: clamp(1.6rem, 2.6vw, 2.2rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;
          margin-bottom: 3px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          letter-spacing: -0.01em;
        }

        .stat-card-desc {
          font-size: 0.85rem;
          color: #EAF2F8;
          line-height: 1.35;
          font-weight: 500;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
          margin: 0;
        }

        @media (max-width: 650px) {
          .about-stats-row {
            flex-direction: column;
            gap: 12px;
          }
          .stat-card {
            max-width: 100%;
            width: 100%;
            padding: 12px 16px;
          }
        }

        /* ======================================
           PRISM PILLARS - P.R.I.S.M. ACRONYM CONNECTED FRAMEWORK
        ====================================== */
        .pillars-section {
          background: var(--very-light-bg);
          padding: clamp(50px, 6vw, 80px) 0;
          border-bottom: 1px solid var(--light-blue);
        }

        /* CONNECTED SPECTRUM BANNER */
        .prism-acronym-banner {
          display: flex;
          align-items: center;
          justify-content: space-around;
          position: relative;
          max-width: 960px;
          margin: 0 auto 36px;
          padding: 14px 20px;
          background: #FFFFFF;
          border: 2px solid var(--light-blue);
          border-radius: 60px;
          box-shadow: 0 10px 30px rgba(10, 25, 49, 0.06);
        }

        .acronym-track-line {
          position: absolute;
          top: 50%;
          left: 50px;
          right: 50px;
          height: 3px;
          background: linear-gradient(90deg, #3B82F6 0%, #10B981 25%, #F59E0B 50%, #EC4899 75%, #8B5CF6 100%);
          transform: translateY(-50%);
          z-index: 1;
          opacity: 0.65;
        }

        .acronym-pill-item {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 2;
          cursor: pointer;
          background: #FFFFFF;
          padding: 6px 16px;
          border-radius: 30px;
          border: 1.5px solid transparent;
          transition: all 0.28s ease;
        }

        .acronym-pill-item:hover, .acronym-pill-item.active {
          border-color: var(--medium-blue);
          box-shadow: 0 6px 20px rgba(10, 25, 49, 0.1);
          transform: translateY(-2px);
        }

        .acronym-circle-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--accent-color, var(--primary-navy));
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .acronym-text-block {
          font-family: var(--font-heading);
          font-size: 1.02rem;
          font-weight: 800;
          color: var(--primary-navy);
        }

        .acronym-letter-highlight {
          color: var(--medium-blue);
          font-size: 1.15rem;
          margin-right: 1px;
        }

        /* 5 CARDS GRID */
        .prism-acronym-cards-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .acronym-card {
          background: #FFFFFF;
          border: 2px solid var(--light-blue);
          border-radius: 20px;
          padding: 24px 18px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 8px 24px rgba(10, 25, 49, 0.04);
          position: relative;
          overflow: hidden;
        }

        .acronym-card:hover, .acronym-card.highlighted {
          transform: translateY(-8px);
          border-color: var(--primary-navy);
          box-shadow: 0 16px 40px rgba(10, 25, 49, 0.14);
        }

        .acronym-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 16px;
        }

        .acronym-letter-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .acronym-card-icon {
          color: var(--medium-blue);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .acronym-card-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 4px;
        }

        .letter-cap {
          font-size: 1.45rem;
          font-weight: 900;
        }

        .acronym-card-sub {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--medium-blue);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 12px;
          line-height: 1.35;
        }

        .acronym-card-desc {
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--deep-blue);
        }

        .acronym-card-connector-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          opacity: 0.8;
        }


        /* ======================================
           WHO IT'S FOR - UNIQUE ASYMMETRIC HEX-CAPSULE CARDS
        ====================================== */

        .who-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #F8FAFC 0%, #EAF2F8 50%, #DBEAFE 100%);
          border-bottom: 1px solid var(--light-blue);
          padding: clamp(50px, 6vw, 80px) 0;
        }

        .who-ambient-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 350px;
          height: 350px;
          background: rgba(179, 207, 229, 0.35);
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .who-container {
          position: relative;
          z-index: 2;
        }

        .who-header {
          margin-bottom: 38px;
        }

        .who-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--primary-navy);
          color: var(--white);
          font-family: var(--font-heading);
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 5px 16px;
          border-radius: var(--radius-pill);
          margin-bottom: 10px;
        }

        .who-title {
          color: var(--primary-navy);
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 2.6rem);
          font-weight: 800;
          margin: 0 0 8px 0;
        }

        .who-subtitle-text {
          font-size: 1.02rem;
          color: var(--deep-blue);
          max-width: 600px;
          margin: 0 auto;
        }

        /* UNIQUE ASYMMETRIC HEX-CAPSULE AUDIENCE GRID */
        .audience-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        .audience-card {
          background: #FFFFFF;
          border: 2px solid var(--light-blue);
          border-radius: 32px 12px 32px 12px; /* UNIQUE ASYMMETRIC CAPSHAPE */
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 30px rgba(10, 25, 49, 0.06);
          transition: all 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
          min-height: 185px;
          position: relative;
          overflow: hidden;
        }

        .audience-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .audience-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--very-light-bg);
          border: 1.5px solid var(--medium-blue);
          color: var(--primary-navy);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .audience-num-pill {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--medium-blue);
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          padding: 3px 10px;
          border-radius: var(--radius-pill);
          transition: all 0.3s ease;
        }

        .audience-card h3 {
          color: var(--primary-navy);
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1.3;
          margin: 0;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .audience-accent-strip {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--medium-blue), var(--primary-navy));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .audience-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: #FFFFFF;
          border-color: var(--primary-navy);
          box-shadow: 0 20px 45px rgba(10, 25, 49, 0.16);
        }

        .audience-card:hover .audience-icon {
          background: var(--primary-navy);
          color: var(--white);
          border-color: var(--primary-navy);
          transform: rotate(6deg);
        }

        .audience-card:hover .audience-num-pill {
          background: var(--primary-navy);
          color: var(--white);
          border-color: var(--primary-navy);
        }

        .audience-card:hover .audience-accent-strip {
          opacity: 1;
        }

        @media (max-width: 1100px) {
          .about-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .audience-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .about-pillars-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .pillar-card {
            min-height: auto;
            padding: 22px 18px;
          }
          .audience-grid {
            grid-template-columns: 1fr;
          }
          .about-stats-banner {
            flex-direction: column;
            gap: 20px;
            padding: 20px 16px;
          }
          .stat-banner-divider {
            width: 80%;
            height: 1px;
            margin: 0 auto;
          }
        }

        /* ======================================
           INSTITUTIONAL STEWARDSHIP & ORGANIZING BODY
        ====================================== */
        .stewardship-section {
          background: linear-gradient(135deg, #F8FAFC 0%, #EAF2F8 50%, #DBEAFE 100%);
          padding: clamp(50px, 6vw, 80px) 0;
          color: var(--primary-navy);
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--light-blue);
        }

        .stewardship-header {
          margin-bottom: 40px;
        }

        .stewardship-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--primary-navy);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 5px 16px;
          border-radius: var(--radius-pill);
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .stewardship-title {
          color: var(--primary-navy);
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 2.6rem);
          font-weight: 800;
          margin: 0 0 10px 0;
        }

        .stewardship-subtitle-text {
          font-size: 1.02rem;
          color: var(--deep-blue);
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .stewardship-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .stewardship-card {
          background: #FFFFFF;
          border: 2px solid var(--light-blue);
          border-radius: 20px;
          padding: 30px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 10px 30px rgba(10, 25, 49, 0.06);
        }

        .stewardship-card:hover {
          transform: translateY(-6px);
          background: #FFFFFF;
          border-color: var(--primary-navy);
          box-shadow: 0 18px 45px rgba(10, 25, 49, 0.14);
        }

        .stewardship-card-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 18px;
        }

        .stewardship-icon-box {
          width: 58px;
          height: 58px;
          border-radius: 14px;
          background: var(--very-light-bg);
          border: 1.5px solid var(--medium-blue);
          color: var(--primary-navy);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .stewardship-card:hover .stewardship-icon-box {
          background: var(--primary-navy);
          color: var(--white);
          border-color: var(--primary-navy);
        }

        .stewardship-logo-box {
          width: 58px;
          height: 58px;
          border-radius: 14px;
          background: #FFFFFF;
          border: 1.5px solid var(--light-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(10, 25, 49, 0.06);
        }

        .swd-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .stewardship-pills {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }

        .naac-badge, .organizer-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 800;
          color: #D97706;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .organizer-badge {
          color: var(--primary-navy);
          background: rgba(74, 127, 167, 0.12);
          border-color: rgba(74, 127, 167, 0.3);
        }

        .est-badge {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--deep-blue);
          background: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .stewardship-card-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--primary-navy);
          margin: 0;
          line-height: 1.3;
        }

        .stewardship-card-sub {
          font-size: 0.8rem;
          color: var(--medium-blue);
          font-weight: 600;
        }

        .stewardship-card-desc {
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--deep-blue);
          margin-bottom: 22px;
        }

        .stewardship-card-desc strong {
          color: var(--primary-navy);
          font-weight: 700;
        }

        .stewardship-link-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: var(--primary-navy);
          color: #FFFFFF;
          border: 1px solid var(--primary-navy);
          padding: 10px 18px;
          border-radius: 10px;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
          width: fit-content;
        }

        .stewardship-link-btn:hover {
          background: var(--deep-blue);
          border-color: var(--deep-blue);
          color: #FFFFFF;
          transform: translateX(3px);
        }

        @media (max-width: 900px) {
          .prism-acronym-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .prism-acronym-banner {
            flex-wrap: wrap;
            border-radius: 24px;
            gap: 10px;
            padding: 14px;
          }
          .acronym-track-line {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .prism-acronym-cards-grid {
            grid-template-columns: 1fr;
          }
          .stewardship-card {
            padding: 20px 18px;
          }
          .stewardship-card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .stewardship-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }

      `}</style>
    </>
  );
}