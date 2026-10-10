import React, { useState, useEffect } from 'react';
import QuizLoginPage from './QuizLoginPage';
import QuizParticipantView from './QuizParticipantView';
import QuizAdminView from './QuizAdminView';

export default function QuizPage({ isAdminPortal = false }) {
  const [user, setUser] = useState(null);
  const [participantName, setParticipantName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    const storedParticipantName = localStorage.getItem('participant_name');

    if (storedUser && token) {
      try {
        const parsed = JSON.parse(storedUser);
        if (isAdminPortal) {
          if (parsed.role === 'admin' || parsed.role === 'anchor') {
            setUser(parsed);
          } else {
            setUser(null);
          }
        } else {
          setUser(parsed);
        }
      } catch (err) {
        localStorage.clear();
      }
    } else {
      setUser(null);
    }

    if (storedParticipantName) {
      setParticipantName(storedParticipantName);
    }

    setLoading(false);
  }, [isAdminPortal]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setParticipantName(null);
    localStorage.clear();
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A1931 0%, #1A3D63 100%)',
        color: '#B3CFE5',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <QuizLoginPage onLogin={handleLogin} isAdminPortal={isAdminPortal} />;
  }

  // Route based on role
  if (user && (user.role === 'admin' || user.role === 'anchor')) {
    return <QuizAdminView user={user} onLogout={handleLogout} />;
  }

  // Participant view (authenticated participants)
  return <QuizParticipantView user={user} onLogout={handleLogout} />;
}
