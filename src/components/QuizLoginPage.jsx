import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function QuizLoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isParticipant, setIsParticipant] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
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
        border: '1px solid rgba(179, 207, 229, 0.2)',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(10, 25, 49, 0.5)'
      }}>
        <h1 style={{
          color: '#B3CFE5',
          fontSize: '2rem',
          fontWeight: '800',
          marginBottom: '8px',
          textAlign: 'center',
          fontFamily: 'var(--font-heading, sans-serif)'
        }}>
          PRISM Quiz
        </h1>
        <p style={{
          color: 'rgba(179, 207, 229, 0.7)',
          fontSize: '0.95rem',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Select your role to continue
        </p>

        {/* Role Toggle */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          background: 'rgba(10, 25, 49, 0.6)',
          borderRadius: '12px',
          padding: '6px'
        }}>
          <button
            onClick={() => setIsParticipant(false)}
            style={{
              flex: 1,
              padding: '12px',
              background: !isParticipant ? '#B3CFE5' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: !isParticipant ? '#0A1931' : '#B3CFE5',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Admin/Anchor
          </button>
          <button
            onClick={() => setIsParticipant(true)}
            style={{
              flex: 1,
              padding: '12px',
              background: isParticipant ? '#B3CFE5' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: isParticipant ? '#0A1931' : '#B3CFE5',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Participant
          </button>
        </div>

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

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              color: '#B3CFE5',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              {isParticipant ? 'Participant Email' : 'Staff / Admin Email'}
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
                placeholder={isParticipant ? "participant@prism26.dev" : "admin@prism26.dev"}
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  background: 'rgba(10, 25, 49, 0.6)',
                  border: '1px solid rgba(179, 207, 229, 0.2)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(179, 207, 229, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(179, 207, 229, 0.2)'}
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
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  background: 'rgba(10, 25, 49, 0.6)',
                  border: '1px solid rgba(179, 207, 229, 0.2)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(179, 207, 229, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(179, 207, 229, 0.2)'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '16px',
              background: loading ? 'rgba(179, 207, 229, 0.3)' : '#B3CFE5',
              border: 'none',
              borderRadius: '12px',
              color: '#0A1931',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-heading, sans-serif)'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = '#FFFFFF')}
            onMouseLeave={(e) => !loading && (e.target.style.background = '#B3CFE5')}
          >
            {loading
              ? 'Authenticating...'
              : isParticipant
                ? 'Join as Participant'
                : 'Sign In as Admin/Anchor'}
          </button>
        </form>

        <p style={{
          color: 'rgba(179, 207, 229, 0.5)',
          fontSize: '0.85rem',
          marginTop: '24px',
          textAlign: 'center'
        }}>
          {isParticipant ? 'Sign in with your participant credentials' : 'Contact system admin for staff credentials'}
        </p>
      </div>
    </div>
  );
}
