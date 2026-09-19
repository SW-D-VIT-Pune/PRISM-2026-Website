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
  UserRoundCheck
} from 'lucide-react';

export default function AboutSection() {

  // -----------------------------
  // PRISM PILLARS
  // -----------------------------
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

  // -----------------------------
  // WHO IT'S FOR
  // -----------------------------
  const audiences = [
    {
      title: 'Community Leaders',
      subtitle: '& Non-Profits',
      icon: <UsersRound size={25} />
    },
    {
      title: 'Students & Young',
      subtitle: 'Professionals',
      icon: <GraduationCap size={25} />
    },
    {
      title: 'Educators &',
      subtitle: 'Academic Leaders',
      icon: <UserRound size={25} />
    },
    {
      title: 'Tech &',
      subtitle: 'Cybersecurity Experts',
      icon: <Shield size={25} />
    },
    {
      title: 'Environmental',
      subtitle: 'Activists',
      icon: <Droplets size={25} />
    },
    {
      title: 'Social',
      subtitle: 'Organisations',
      icon: <Handshake size={25} />
    },
    {
      title: 'Social Youth &',
      subtitle: 'GenZ Crowd',
      icon: <UserRoundCheck size={25} />
    }
  ];

  return (
    <>
      {/* =========================================
          WHAT IS PRISM
      ========================================= */}
      <section id="about" className="section-wrapper about-section">
        <div className="container-inner">

          <div className="section-header prism-header">
            <span className="section-eyebrow">
              COMMITTEE BACKGROUND & FOUNDATION
            </span>

            <h2 className="heading-1">
              What is PRISM?
            </h2>

            <p className="text-muted prism-description">
              PRISM is the annual social-impact gathering organized by the
              Social Welfare & Development Committee at VIT Pune—bringing
              together passion, community action, and structured reform.
            </p>
          </div>

          {/* PILLARS */}
          <div className="about-pillars-grid">
            {pillars.map((item, idx) => (
              <div key={idx} className="pillar-card card-clean">

                <div className="pillar-icon-box">
                  {item.icon}
                </div>

                <h3 className="heading-3 pillar-title">
                  {item.title}
                </h3>

                <span className="pillar-sub">
                  {item.sub}
                </span>

                <p className="text-muted pillar-desc">
                  {item.desc}
                </p>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================
          WHO IT'S FOR
      ========================================= */}
      <section className="who-section">

        {/* Background decorative shape */}
        <div className="who-bg-shape"></div>

        <div className="container-inner who-container">

          <div className="who-header">
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

                <div className="audience-icon">
                  {item.icon}
                </div>

                <h3>
                  {item.title}
                  <br />
                  {item.subtitle}
                </h3>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =========================================
          STYLES
      ========================================= */}
      <style>{`

        /* ======================================
           ABOUT / PRISM SECTION
        ====================================== */

        .about-section {
          background-color: var(--white);
          border-bottom: 1px solid var(--light-blue-alpha-50);
          position: relative;
          overflow: hidden;
        }

        .prism-header {
          text-align: center;
          max-width: 1000px;
          margin: 0 auto;
        }

        .section-eyebrow {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--medium-blue);
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .prism-description {
          max-width: 950px;
          margin: 10px auto 0;
          font-size: 1rem;
          line-height: 1.7;
        }


        /* ======================================
           PILLARS
        ====================================== */

        .about-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 42px;
          margin-top: 65px;
        }

        .pillar-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 30px 28px;
          min-height: 410px;
          transition: all 0.3s ease;
          background: #ffffff;
          border: 1px solid #d9e5ef;
          border-radius: 20px;
        }

        .pillar-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(10, 39, 66, 0.10);
        }

        .pillar-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background-color: var(--very-light-bg);
          border: 1px solid var(--light-blue);
          color: var(--deep-blue);

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 30px;
        }

        .pillar-card:hover .pillar-icon-box {
          background-color: var(--primary-navy);
          color: var(--white);
        }

        .pillar-title {
          color: var(--primary-navy);
          margin-bottom: 5px;
          font-size: 1.7rem;
          line-height: 1.15;
        }

        .pillar-sub {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--medium-blue);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 20px;
          line-height: 1.45;
        }

        .pillar-desc {
          font-size: 0.95rem;
          line-height: 1.65;
        }


        /* ======================================
           WHO IT'S FOR
        ====================================== */

        .who-section {
          position: relative;
          overflow: hidden;
          background: #07192a;
          min-height: 500px;
          padding: 75px 0 85px;
        }

        /*
          Large decorative curved background
          similar to your screenshot.
        */

        .who-bg-shape {
          position: absolute;
          top: -170px;
          left: -12%;
          width: 125%;
          height: 430px;

          background: rgba(105, 133, 158, 0.28);

          border-radius: 50%;

          transform: rotate(8deg);
          pointer-events: none;
        }

        .who-bg-shape::after {
          content: "";
          position: absolute;

          top: 45px;
          left: 0;

          width: 100%;
          height: 100%;

          background: rgba(31, 68, 98, 0.45);

          border-radius: 50%;
        }

        .who-container {
          position: relative;
          z-index: 2;
        }

        .who-header {
          margin-bottom: 28px;
        }

        .who-title {
          color: #f5f7fa;
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 500;
          margin: 0;
        }


        /* ======================================
           AUDIENCE GRID
        ====================================== */

        .audience-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .audience-card {
          background: #273a4e;

          min-height: 195px;

          padding: 25px 22px;

          border-radius: 7px;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;

          border: 1px solid rgba(255,255,255,0.025);

          transition:
            transform 0.3s ease,
            background-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .audience-card:hover {
          transform: translateY(-7px);

          background: #2d445a;

          box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.25);
        }

        .audience-icon {
          width: 58px;
          height: 58px;

          border-radius: 50%;

          background: #07192a;

          color: #e4ebf1;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 26px;
        }

        .audience-card h3 {
          color: #f3f5f7;

          font-family: var(--font-heading);

          font-size: 1.4rem;
          font-weight: 500;

          line-height: 0.98;

          margin: 0;

          letter-spacing: -0.02em;
        }


        /* ======================================
           SECOND ROW
        ====================================== */

        .audience-card-5,
        .audience-card-6,
        .audience-card-7 {
          grid-column: span 1;
        }


        /* ======================================
           TABLET
        ====================================== */

        @media (max-width: 1000px) {

          .about-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .audience-grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }


        /* ======================================
           MOBILE
        ====================================== */

        @media (max-width: 650px) {

          .about-pillars-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-top: 40px;
          }

          .pillar-card {
            min-height: auto;
          }

          .audience-grid {
            grid-template-columns: 1fr;
          }

          .audience-card {
            min-height: 160px;
          }

          .who-section {
            padding: 55px 0 65px;
          }

          .who-title {
            font-size: 1.8rem;
          }

          .audience-card h3 {
            font-size: 1.35rem;
          }

        }

      `}</style>
    </>
  );
}