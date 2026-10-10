import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, User, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function QuizLoginPage({ onLogin, isAdminPortal = false }) {
  // Participant state (name + email only, no password)
  const [fullName, setFullName] = useState('');
  
  // Admin / shared credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ── PARTICIPANT LOGIN (Name + Email only) ───────────────────────────────────
  const handleParticipantSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setError('Please provide both your full name and email address.');
      return;
    }

    setLoading(true);

    try {
      // 1. Attempt specialized participant login / registration endpoint
      let response = await fetch(`${API_URL}/auth/participant-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail }),
      }).catch(() => null);

      // 2. If endpoint not found or returns 404, fallback to standard participant login
      if (!response || response.status === 404) {
        response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail, password: 'Participant@1234' }),
        }).catch(() => null);
      }

      if (response && response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.tokens.access_token);
        localStorage.setItem('refresh_token', data.tokens.refresh_token);
        localStorage.setItem('user', JSON.stringify({ ...data.user, name: trimmedName }));
        localStorage.setItem('participant_name', trimmedName);
        onLogin({ ...data.user, name: trimmedName });
        return;
      }

      // If backend response exists but returned an error
      if (response && !response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Could not join quiz. Please check your email.');
      }

      // If backend was completely unreachable, notify user clearly
      throw new Error('Quiz backend connection unavailable. Please ensure server is running.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── ADMIN / ANCHOR SECURE LOGIN (Email + Password) ─────────────────────────
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError('Email and password are required for admin authentication.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid administrative credentials');
      }

      // Enforce admin/anchor role access
      if (data.user.role !== 'admin' && data.user.role !== 'anchor') {
        throw new Error('Access denied: Only administrative accounts can access this portal.');
      }

      localStorage.setItem('access_token', data.tokens.access_token);
      localStorage.setItem('refresh_token', data.tokens.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── ADMIN PORTAL VIEW ───────────────────────────────────────────────────────
  if (isAdminPortal) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A1931 0%, #1A3D63 100%)',
        padding: '20px',
        paddingTop: '150px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(179, 207, 229, 0.25)',
          borderRadius: '24px',
          padding: '44px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 25px 70px rgba(10, 25, 49, 0.6)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(179, 207, 229, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(179, 207, 229, 0.3)'
            }}>
              <ShieldCheck size={32} style={{ color: '#B3CFE5' }} />
            </div>
          </div>

          <h1 style={{
            color: '#B3CFE5',
            fontSize: '1.8rem',
            fontWeight: '800',
            marginBottom: '8px',
            textAlign: 'center',
            fontFamily: 'var(--font-heading, sans-serif)'
          }}>
            Admin & Anchor Portal
          </h1>
          <p style={{
            color: 'rgba(179, 207, 229, 0.7)',
            fontSize: '0.9rem',
            marginBottom: '28px',
            textAlign: 'center'
          }}>
            Restricted Access — Enter your staff credentials
          </p>

          {error && (
            <div style={{
              background: 'rgba(220, 38, 38, 0.15)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#FCA5A5',
              fontSize: '0.9rem'
            }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                color: '#B3CFE5',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Administrator / Anchor Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(179, 207, 229, 0.5)'
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin/anchor-vitswd26@vit.edu"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 44px',
                    background: 'rgba(10, 25, 49, 0.6)',
                    border: '1px solid rgba(179, 207, 229, 0.2)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#B3CFE5',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(179, 207, 229, 0.5)'
                }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 44px',
                    background: 'rgba(10, 25, 49, 0.6)',
                    border: '1px solid rgba(179, 207, 229, 0.2)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '8px',
                padding: '16px',
                background: loading ? 'rgba(179, 207, 229, 0.3)' : '#B3CFE5',
                border: 'none',
                borderRadius: '12px',
                color: '#0A1931',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-heading, sans-serif)'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── PUBLIC PARTICIPANT QUIZ VIEW (Name + Email Only — No Password) ───────────
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0A1931 0%, #1A3D63 100%)',
      padding: '20px',
      paddingTop: '150px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(179, 207, 229, 0.25)',
        borderRadius: '24px',
        padding: '44px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 25px 70px rgba(10, 25, 49, 0.6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'rgba(179, 207, 229, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(179, 207, 229, 0.3)'
          }}>
            <Trophy size={32} style={{ color: '#B3CFE5' }} />
          </div>
        </div>

        <h1 style={{
          color: '#B3CFE5',
          fontSize: '2rem',
          fontWeight: '800',
          marginBottom: '8px',
          textAlign: 'center',
          fontFamily: 'var(--font-heading, sans-serif)'
        }}>
          PRISM '26 Live Quiz
        </h1>
        <p style={{
          color: 'rgba(179, 207, 229, 0.7)',
          fontSize: '0.95rem',
          marginBottom: '28px',
          textAlign: 'center'
        }}>
          Enter your name and email to join the live quiz
        </p>

        {error && (
          <div style={{
            background: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#FCA5A5',
            fontSize: '0.9rem'
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleParticipantSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              color: '#B3CFE5',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(179, 207, 229, 0.5)'
              }} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  background: 'rgba(10, 25, 49, 0.6)',
                  border: '1px solid rgba(179, 207, 229, 0.2)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              color: '#B3CFE5',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(179, 207, 229, 0.5)'
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@college.edu"
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  background: 'rgba(10, 25, 49, 0.6)',
                  border: '1px solid rgba(179, 207, 229, 0.2)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              padding: '16px',
              background: loading ? 'rgba(179, 207, 229, 0.3)' : '#B3CFE5',
              border: 'none',
              borderRadius: '12px',
              color: '#0A1931',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-heading, sans-serif)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={18} />
            {loading ? 'Joining Quiz...' : 'Join Quiz'}
          </button>
        </form>

        <p style={{
          color: 'rgba(179, 207, 229, 0.5)',
          fontSize: '0.85rem',
          marginTop: '24px',
          textAlign: 'center'
        }}>
          No password needed for participants. Join directly with your name and email.
        </p>
      </div>
    </div>
  );
}
