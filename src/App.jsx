import React, { useState } from 'react';
import './styles/tokens.css';
import './styles/components.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import KeyStats from './components/Infographics/KeyStats';
import EventTracks from './components/EventTracks';
import ConnectedJourney from './components/Infographics/ConnectedJourney';
import CommunitySection from './components/TimelineSection';
import HighlightCTA from './components/HighlightCTA';
import RegistrationPage from './components/RegistrationPage';
import NSSPage from './components/NSSPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

import { Clock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [upcomingToast, setUpcomingToast] = useState(null);

  const handleNavClick = (item) => {
    if (item.id === 'home') {
      setActiveTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.id === 'registration') {
      setActiveTab('registration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.id === 'nss') {
      setActiveTab('nss');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.id === 'contacts') {
      setActiveTab('contacts');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Trigger polished Upcoming interaction notification for unfinished sub-pages
      setUpcomingToast({
        title: `${item.label} Section Coming Soon`,
        message: `The ${item.label} section is currently being prepared by committee coordinators.`
      });

      setTimeout(() => {
        setUpcomingToast(null);
      }, 3200);
    }
  };

  const handleUnstopRedirect = (eventName) => {
    setUpcomingToast({
      title: `Redirecting to portal for ${eventName}`,
      message: `Registration link will be connected soon!`
    });
    setTimeout(() => setUpcomingToast(null), 3200);
  };

  const handleQuizClick = () => {
    handleNavClick({ id: 'quiz', label: 'Quiz' });
  };

  const handleExploreClick = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('process');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('process');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVisionClick = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="prism-app-wrapper">
      {/* 1. FINAL RESPONSIVE NAVBAR */}
      <Navbar 
        activeTab={activeTab}
        onNavClick={handleNavClick}
      />

      {/* Elegant Toast Interaction */}
      {upcomingToast && (
        <div className="upcoming-toast">
          <div className="toast-icon-box">
            <Clock size={20} />
          </div>
          <div>
            <div className="toast-title">{upcomingToast.title}</div>
            <div className="toast-sub">{upcomingToast.message}</div>
          </div>
        </div>
      )}

      {/* DYNAMIC VIEW SWITCHING */}
      {activeTab === 'home' && (
        <main className="home-page-content">
          {/* SECTION 1: HERO */}
          <Hero 
            onExploreClick={handleExploreClick}
            onVisionClick={handleVisionClick}
            onQuizClick={handleQuizClick}
          />

          {/* SECTION 2: WHAT IS PRISM? */}
          <AboutSection />

          {/* SECTION 3: IMPACT / STATISTICS INFOGRAPHIC */}
          <KeyStats />

          {/* SECTION 4: PRISM EXPERIENCE / HIGHLIGHTS & HOMEPAGE QUIZ BANNER CARD */}
          <EventTracks 
            onTrackClick={() => handleNavClick({ id: 'registration', label: 'Registration' })}
            onQuizClick={handleQuizClick}
          />

          {/* SECTION 5: VISUAL EVENT JOURNEY */}
          <ConnectedJourney />

          {/* SECTION 6: COMMUNITY / PARTICIPATION */}
          <CommunitySection />

          {/* SECTION 7: CALL TO ACTION */}
          <HighlightCTA 
            onExploreClick={handleExploreClick}
            onUpcomingClick={() => handleNavClick({ id: 'registration', label: 'Registration' })}
          />
        </main>
      )}

      {activeTab === 'registration' && (
        <RegistrationPage 
          onNavigateHome={() => setActiveTab('home')}
          onUnstopRedirect={handleUnstopRedirect}
        />
      )}

      {activeTab === 'nss' && (
        <NSSPage 
          onNavigateHome={() => setActiveTab('home')}
          onRegisterRedirect={handleUnstopRedirect}
        />
      )}

      {activeTab === 'contacts' && <ContactPage />}

      {/* SECTION 8: FOOTER */}
      <Footer onNavClick={handleNavClick} />
    </div>
  );
}
