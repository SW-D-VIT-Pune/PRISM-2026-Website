import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, HeartHandshake, Camera, Sparkles, HelpCircle } from 'lucide-react';

export default function Hero({ onExploreClick, onVisionClick, onQuizClick }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const lastYearPhotos = [
    {
      id: 2,
      src: '/images/Prism_IMG2.jpg',
      tag: "GLIMPSES OF PRISM '25",
      title: 'Youth Social Development Conference',
      desc: 'Over 2,500 college delegates collaborating on grassroots community welfare initiatives.'
    },
    {
      id: 3,
      src: '/images/Prism_IMG3.jpg',
      tag: "INNOVATION STAGE '25",
      title: 'Social Innovation Pitch Showcase',
      desc: 'Student teams presenting technology-driven solutions to civic leaders and domain mentors.'
    },
    {
      id: 4,
      src: '/images/Prism_IMG4.jpg',
      tag: "FIELDWORK DRIVE '25",
      title: 'Grassroots Community Outreach',
      desc: 'Hands-on digital literacy and educational volunteer campaigns conducted by student leaders.'
    },
    {
      id: 5,
      src: '/images/Prism_IMG5.jpg',
      tag: "LEADERSHIP FORUM '25",
      title: 'Empowering Student Changemakers',
      desc: 'Interactive workshops and panel discussions featuring pioneering social impact experts.'
    }
  ];

  // Auto-advance photo carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % lastYearPhotos.length);
    }, 5000);
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
          
          {/* PRISM '26 BRAND HEADING WITH ADDED TOP SPACE */}
          <h1 className="hero-brand-heading animate-word-slide" style={{ marginTop: '28px' }}>
            PRISM <span className="brand-year-accent">'26</span>
          </h1>

          <div className="hero-acronym-strip animate-fade-up-delayed">
            <span className="acronym-item"><span className="letter">P</span>ublic Reform</span>
            <span className="dot">•</span>
            <span className="acronym-item"><span className="letter">I</span>nnovation</span>
            <span className="dot">•</span>
            <span className="acronym-item"><span className="letter">S</span>ustainability</span>
            <span className="dot">•</span>
            <span className="acronym-item"><span className="letter">M</span>anagement</span>
          </div>

          <p className="hero-description-paragraph animate-fade-up-delayed-2">
            The flagship social-impact platform uniting student changemakers, youth leaders, and community partners to engineer real-world welfare solutions.
          </p>

          {/* SOCIAL WELFARE & DEVELOPMENT COMMITTEE BADGE */}
          <div className="editorial-kicker animate-pulse-soft" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <HeartHandshake size={18} />
            <span>SOCIAL WELFARE & DEVELOPMENT COMMITTEE • VIT PUNE</span>
          </div>

          <div className="hero-cta-group animate-fade-up-delayed-3">
            <button className="btn btn-primary btn-lg hero-btn-main" onClick={onExploreClick}>
              <span>Explore PRISM Journey</span>
              <ArrowRight size={20} />
            </button>

            {/* PROMINENT QUIZ BUTTON ON HOMEPAGE */}
            <button className="btn btn-quiz-home btn-lg" onClick={onQuizClick}>
              <HelpCircle size={20} />
              <span>Take PRISM Quiz</span>
            </button>

            <button className="btn btn-outline btn-lg" onClick={onVisionClick}>
              <Compass size={20} />
              <span>Committee Mission</span>
            </button>
          </div>

          <div className="hero-proof-bar">
            <div className="proof-item">
              <Camera size={18} />
              <span>PRISM '25 Flashback Showcase</span>
            </div>
            <div className="proof-sep"></div>
            <div className="proof-item">
              <Sparkles size={18} />
              <span>Youth Empowerment Action</span>
            </div>
          </div>

        </div>

        {/* Right Column: GLIMPSES BLOCK DIRECTLY UNDER NAVBAR - SPACE REMOVED ABOVE */}
        <div className="hero-photo-gallery-container animate-float-card" style={{ marginTop: '0px', paddingTop: '0px' }}>
          <div className="editorial-photo-card-clean">
            
            {/* CLEAN LARGE PHOTO SLIDE FRAME */}
            <div className="photo-view-window-huge">
              <img 
                src={currentPhoto.src} 
                alt={currentPhoto.title} 
                className="photo-main-img-huge" 
              />
              <div className="photo-text-overlay-huge">
                <span className="badge-pill photo-overlay-tag">{currentPhoto.tag}</span>
                <h4 className="photo-title-huge">{currentPhoto.title}</h4>
              </div>
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
          grid-template-columns: 1.05fr 0.95fr;
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
          font-size: clamp(4rem, 7.5vw, 6.2rem);
          font-weight: 800;
          color: var(--primary-navy);
          letter-spacing: 0.08em;
          line-height: 1;
          margin-top: 28px; /* SPACE ADDED ABOVE PRISM '26 */
          margin-bottom: 12px;
          text-transform: uppercase;
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
          gap: var(--space-md);
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

        /* GLIMPSES BLOCK DIRECTLY UNDER NAVBAR - SPACE REMOVED ABOVE */
        .hero-photo-gallery-container {
          display: flex;
          justify-content: center;
          margin-top: 0px !important; /* SPACE REMOVED ABOVE GLIMPSES */
          padding-top: 0px !important;
        }

        .editorial-photo-card-clean {
          width: 100%;
          max-width: 700px;
          background-color: var(--white);
          border: 2.5px solid var(--medium-blue);
          border-radius: var(--radius-lg);
          padding: 8px;
          box-shadow: 0 24px 60px rgba(10, 25, 49, 0.18);
        }

        .photo-view-window-huge {
          position: relative;
          width: 100%;
          height: 520px;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .photo-main-img-huge {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .photo-view-window-huge:hover .photo-main-img-huge {
          transform: scale(1.04);
        }

        .photo-text-overlay-huge {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(10, 25, 49, 0.95) 100%);
          padding: 40px 24px 24px 24px;
        }

        .photo-overlay-tag {
          background: rgba(255, 255, 255, 0.9);
          color: var(--primary-navy);
          font-size: 0.75rem;
          margin-bottom: 8px;
        }

        .photo-title-huge {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--white);
          line-height: 1.25;
        }

        .photo-desc-huge {
          font-size: 1rem;
          color: var(--light-blue);
          margin-top: 6px;
          line-height: 1.5;
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
