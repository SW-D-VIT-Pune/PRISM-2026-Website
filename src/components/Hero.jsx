import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, HeartHandshake, Camera, Sparkles, HelpCircle } from 'lucide-react';

export default function Hero({ onQuizClick }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const lastYearPhotos = [
    {
      id: 1,
      src: '/images/Prism_IMG2.jpg',
      tag: "GLIMPSES OF PRISM '25",
      title: 'Youth Social Development Stage Inauguration',
      desc: 'Over 2,500 college delegates collaborating on grassroots community welfare initiatives.'
    },
    {
      id: 2,
      src: '/images/Prism_IMG3.jpg',
      tag: "INNOVATION STAGE '25",
      title: 'Social Innovation Pitch Showcase',
      desc: 'Student teams presenting technology-driven solutions to civic leaders and domain mentors.'
    },
    {
      id: 3,
      src: '/images/Prism_IMG4.jpg',
      tag: "FIELDWORK DRIVE '25",
      title: 'Grassroots Community Outreach',
      desc: 'Hands-on digital literacy and educational volunteer campaigns conducted by student leaders.'
    },
    {
      id: 4,
      src: '/images/Prism_IMG5.jpg',
      tag: "LEADERSHIP FORUM '25",
      title: 'Empowering Student Changemakers',
      desc: 'Interactive workshops and panel discussions featuring pioneering social impact experts.'
    },
    {
      id: 5,
      src: '/images/Prism_IMG1.jpg',
      tag: "PANEL DIALOGUE '25",
      title: 'Civic Reform & Youth Policy Debate',
      desc: 'Keynote conversations on policy advocacy, public reform, and youth leadership.'
    },
    {
      id: 6,
      src: '/images/IMG6.jpg',
      tag: "COMPETITION ARENA '25",
      title: 'Social Project Exhibition & Mentorship',
      desc: 'Demonstrating prototype solutions to community challenges in front of expert judges.'
    },
    {
      id: 7,
      src: '/images/IMG7.jpg',
      tag: "DELEGATE CONCLAVE '25",
      title: 'Inter-College Leadership Summit',
      desc: 'Uniting passionate student volunteers across Maharashtra for structured social action.'
    },
    {
      id: 8,
      src: '/images/IMG8.jpg',
      tag: "ACTION DRIVE '25",
      title: 'Community Health & Awareness Initiative',
      desc: 'Organized field activities reinforcing social responsibility and civic involvement.'
    },
    {
      id: 9,
      src: '/images/Sociothon.jpg',
      tag: "SOCIOTHON '25",
      title: 'Sociothon 24-Hour Social Hackathon',
      desc: 'Intensive hackathon crafting actionable prototypes for real-world NGO and civic needs.'
    },
    {
      id: 10,
      src: '/images/NSS_unit.jpg',
      tag: "NSS SPECIAL CAMP '25",
      title: 'NSS Volunteer Camp & Social Service',
      desc: 'Rural development drives, blood donation initiatives, and Police Mitra volunteering.'
    }
  ];

  // Auto-advance photo carousel every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % lastYearPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [lastYearPhotos.length]);

  const currentPhoto = lastYearPhotos[activePhotoIndex];

  return (
    <section id="hero" className="hero-section-wrapper">
      
      {/* FLOWING ANIMATED SVG BACKGROUND WAVES */}
      <div className="hero-animated-waves-bg">
        <svg className="wave-path wave-path-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="rgba(179, 207, 229, 0.4)" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg className="wave-path wave-path-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="rgba(246, 250, 253, 0.9)" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,229.3C840,235,960,213,1080,202.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container-inner hero-inner">
        
        {/* Left Column: Brand Typography with Space Above PRISM '26 */}
        <div className="hero-text-block animate-fade-up">
          
          {/* PRISM '26 BRAND HEADING - SINGLE LINE */}
          <h1 className="hero-brand-heading animate-word-slide" style={{ marginTop: '28px' }}>
            PRISM <span className="brand-year-accent">'26</span>
          </h1>

          <p className="hero-description-paragraph animate-fade-up-delayed-2" style={{ marginTop: '14px' }}>
            The flagship social-impact platform uniting student changemakers, youth leaders, and community partners to engineer real-world welfare solutions.
          </p>

          {/* SOCIAL WELFARE & DEVELOPMENT COMMITTEE BADGE */}
          <div className="editorial-kicker animate-pulse-soft" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <HeartHandshake size={18} />
            <span>SOCIAL WELFARE & DEVELOPMENT COMMITTEE • VIT PUNE</span>
          </div>

          <div className="hero-cta-group animate-fade-up-delayed-3">
            {/* PROMINENT QUIZ BUTTON ON HOMEPAGE */}
            <button className="btn btn-quiz-home btn-lg" onClick={onQuizClick}>
              <HelpCircle size={20} />
              <span>Take PRISM Quiz</span>
            </button>
          </div>

          <div className="hero-proof-bar">
            <div className="proof-item">
              <Camera size={18} />
              <span>PRISM Flashback Showcase</span>
            </div>
            <div className="proof-sep"></div>
            <div className="proof-item">
              <Sparkles size={18} />
              <span>Youth Empowerment Action</span>
            </div>
          </div>

        </div>

        {/* Right Column: GLIMPSES BLOCK DIRECTLY UNDER NAVBAR */}
        <div className="hero-photo-gallery-container animate-float-card" style={{ marginTop: '0px', paddingTop: '0px' }}>
          <div className="editorial-photo-card-clean">
            
            {/* CLEAN LARGE PHOTO SLIDE FRAME */}
            <div className="photo-view-window-huge">
              <img 
                key={activePhotoIndex}
                src={currentPhoto.src} 
                alt="Glimpses of PRISM '25" 
                className="photo-main-img-huge photo-fade-in" 
              />

              {/* CAROUSEL PREV/NEXT CONTROLS */}
              <button 
                className="carousel-arrow carousel-arrow-left" 
                onClick={() => setActivePhotoIndex((prev) => (prev - 1 + lastYearPhotos.length) % lastYearPhotos.length)}
                aria-label="Previous Photo"
              >
                ‹
              </button>
              <button 
                className="carousel-arrow carousel-arrow-right" 
                onClick={() => setActivePhotoIndex((prev) => (prev + 1) % lastYearPhotos.length)}
                aria-label="Next Photo"
              >
                ›
              </button>

              {/* CONSTANT GLIMPSES HEADER ON PHOTOS */}
              <div className="photo-text-overlay-huge">
                <div className="photo-tag-row">
                  <h4 className="photo-title-huge">Glimpses of PRISM '25</h4>
                  <span className="photo-counter-pill">{activePhotoIndex + 1} / {lastYearPhotos.length}</span>
                </div>
              </div>
            </div>

            {/* THUMBNAIL DOTS INDICATOR */}
            <div className="carousel-dots-row">
              {lastYearPhotos.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot-pill ${idx === activePhotoIndex ? 'active' : ''}`}
                  onClick={() => setActivePhotoIndex(idx)}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .hero-section-wrapper {
          position: relative;
          background-color: #EAF2F8; /* Soft Lighter Theme Shade */
          color: var(--primary-navy);
          padding-top: 148px; /* DIRECTLY UNDER NAVBAR */
          padding-bottom: 90px;
          min-height: 85vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-animated-waves-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .wave-path {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 180px;
        }

        .wave-path-1 {
          animation: waveMove 12s ease-in-out infinite alternate;
        }

        .wave-path-2 {
          animation: waveMove 8s ease-in-out infinite alternate;
        }

        @keyframes waveMove {
          0% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.1) translateY(-6px); }
          100% { transform: scaleY(1) translateY(0); }
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          gap: var(--space-xl);
          align-items: flex-start;
        }

        .hero-text-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* ATTRACTIVE BRAND HEADING WITH TOP MARGIN SPACE ADDED */
        .hero-brand-heading {
          font-family: var(--font-heading);
          font-size: clamp(3.6rem, 5.8vw, 5.2rem);
          font-weight: 800;
          color: var(--primary-navy);
          letter-spacing: 0.08em;
          line-height: 1;
          margin-top: 28px;
          margin-bottom: 12px;
          text-transform: uppercase;
          white-space: nowrap;
          background: linear-gradient(135deg, var(--primary-navy) 0%, var(--deep-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 4px 10px rgba(10, 25, 49, 0.1));
        }

        .brand-year-accent {
          background: linear-gradient(135deg, var(--medium-blue) 0%, var(--deep-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .hero-acronym-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--deep-blue);
          margin-bottom: var(--space-lg);
          background: rgba(255, 255, 255, 0.85);
          padding: 8px 18px;
          border-radius: var(--radius-pill);
          border: 1.5px solid var(--light-blue);
          box-shadow: var(--shadow-sm);
        }

        .acronym-item {
          display: flex;
          align-items: center;
        }

        .letter {
          color: var(--primary-navy);
          font-weight: 800;
        }

        .dot {
          color: var(--medium-blue);
        }

        .hero-description-paragraph {
          font-family: var(--font-body);
          font-size: var(--font-size-body-lg);
          color: var(--deep-blue);
          line-height: 1.7;
          max-width: 600px;
        }

        .editorial-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 20px;
          border-radius: var(--radius-pill);
          background: var(--white);
          border: 1.5px solid var(--medium-blue);
          color: var(--primary-navy);
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          box-shadow: var(--shadow-sm);
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-2xl);
          flex-wrap: wrap;
        }

        .hero-btn-main {
          box-shadow: 0 8px 24px rgba(10, 25, 49, 0.25);
        }

        .btn-quiz-home {
          background-color: var(--deep-blue);
          color: var(--white);
          border: 2px solid var(--medium-blue);
          box-shadow: 0 6px 20px rgba(26, 61, 99, 0.25);
        }

        .btn-quiz-home:hover {
          background-color: var(--primary-navy);
          border-color: var(--primary-navy);
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(10, 25, 49, 0.35);
        }

        .hero-proof-bar {
          display: flex;
          align-items: center;
          gap: clamp(28px, 4vw, 56px);
          border-top: 1.5px solid var(--light-blue);
          padding-top: var(--space-md);
          width: 100%;
        }

        .proof-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-size: var(--font-size-sm);
          font-weight: 700;
          color: var(--deep-blue);
        }

        .proof-sep {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--medium-blue);
        }

        .hero-photo-gallery-container {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 0px !important;
          padding-top: 0px !important;
        }

        .editorial-photo-card-clean {
          width: 100%;
          max-width: 100%;
          background-color: var(--white);
          border: 2.5px solid var(--medium-blue);
          border-radius: var(--radius-lg);
          padding: 8px;
          box-shadow: 0 24px 60px rgba(10, 25, 49, 0.18);
        }

        .photo-view-window-huge {
          position: relative;
          width: 100%;
          height: clamp(420px, 34vw, 560px);
          border-radius: var(--radius-md);
          overflow: hidden;
          background: linear-gradient(135deg, #0A1931 0%, #15294A 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .photo-main-img-huge {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.6s ease;
        }

        .photo-view-window-huge:hover .photo-main-img-huge {
          transform: scale(1.02);
        }

        .photo-text-overlay-huge {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(10, 25, 49, 0.95) 100%);
          padding: 40px 24px 20px 24px;
        }

        .photo-tag-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .photo-overlay-tag {
          background: rgba(255, 255, 255, 0.95);
          color: var(--primary-navy);
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 3px 12px;
          border-radius: var(--radius-pill);
        }

        .photo-counter-pill {
          background: rgba(10, 25, 49, 0.75);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 3px 12px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(10, 25, 49, 0.65);
          color: #FFFFFF;
          border: 1.5px solid rgba(255, 255, 255, 0.6);
          font-size: 1.6rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          transition: all 0.25s ease;
          opacity: 0.8;
        }

        .carousel-arrow:hover {
          background: var(--primary-navy);
          border-color: #FFFFFF;
          opacity: 1;
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-arrow-left {
          left: 14px;
        }

        .carousel-arrow-right {
          right: 14px;
        }

        .carousel-dots-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 0 4px;
        }

        .dot-pill {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--light-blue);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot-pill.active {
          width: 24px;
          border-radius: 12px;
          background: var(--primary-navy);
        }

        .photo-fade-in {
          animation: photoFade 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes photoFade {
          from { opacity: 0.5; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }

        .photo-title-huge {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1.25;
        }

        .photo-desc-huge {
          font-size: 0.95rem;
          color: var(--light-blue);
          margin-top: 6px;
          line-height: 1.45;
        }

        .animate-float-card {
          animation: floatCard 6s ease-in-out infinite alternate;
        }

        @keyframes floatCard {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-word-slide {
          animation: wordSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes wordSlide {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-up {
          animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1180px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }
          .photo-view-window-huge {
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
}
