import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Clock, Trophy } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const WS_URL = API_URL.startsWith('https://')
  ? API_URL.replace('https://', 'wss://')
  : API_URL.startsWith('http://')
    ? API_URL.replace('http://', 'ws://')
    : 'ws://localhost:8000';

export default function QuizParticipantView({ user, onLogout }) {
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [score, setScore] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [error, setError] = useState('');
  const [sessionName, setSessionName] = useState('');
  
  const participantName = localStorage.getItem('participant_name') || user?.name || user?.email || 'Participant';
  const wsRef = useRef(null);
  const selectedOptionRef = useRef(null);
  const isSubmittingRef = useRef(false);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimerRef = useRef(null);
  const isUnmountedRef = useRef(false);
  const targetSessionIdRef = useRef(null);

  // Keep selectedOptionRef in sync for async callbacks
  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);

  const tryRefreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }
        return data.access_token;
      }
    } catch {
      // Refresh network/parse failure
    }
    return null;
  };

  const connectWebSocket = (targetSessionId, authToken) => {
    if (isUnmountedRef.current) return;
    targetSessionIdRef.current = targetSessionId;

    // Prevent duplicate sockets
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const token = authToken || localStorage.getItem('access_token');
    if (!token) {
      setError('Session expired. Please log in again.');
      return;
    }

    const ws = new WebSocket(`${WS_URL}/ws?token=${encodeURIComponent(token)}`);
    wsRef.current = ws;

    ws.onopen = () => {
      if (isUnmountedRef.current) {
        ws.close();
        return;
      }
      reconnectAttemptsRef.current = 0;
      ws.send(JSON.stringify({ type: 'join_session', session_id: targetSessionId }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case 'question_broadcast':
            setCurrentQuestion(message.data);
            setSelectedOption(null);
            setSubmitted(Boolean(message.data.already_answered));
            isSubmittingRef.current = Boolean(message.data.already_answered);
            setAnswerResult(null);
            break;
          case 'answer_acknowledged':
            setSubmitted(true);
            isSubmittingRef.current = false;
            break;
          case 'question_ended':
            setSubmitted(true);
            isSubmittingRef.current = false;
            if (message.data?.correct_option_ids && selectedOptionRef.current) {
              const isCorrect = message.data.correct_option_ids.includes(selectedOptionRef.current);
              setAnswerResult({ is_correct: isCorrect });
              if (isCorrect) {
                setScore(prev => prev + 1);
              }
            }
            break;
          case 'session_ended':
            setSessionEnded(true);
            break;
          case 'error':
            setError(message.detail || 'Quiz error received');
            isSubmittingRef.current = false;
            break;
          default:
            break;
        }
      } catch {
        // Ignore unparseable frames
      }
    };

    ws.onclose = async (event) => {
      if (isUnmountedRef.current) return;
      wsRef.current = null;

      // Handle token expiration / policy violation
      if (event.code === 1008) {
        const newToken = await tryRefreshToken();
        if (newToken) {
          connectWebSocket(targetSessionId, newToken);
          return;
        }
        setError('Session expired. Please log in again.');
        return;
      }

      // Reconnect with capped exponential backoff (1s, 2s, 4s, 8s, max 10s)
      const backoffMs = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 10000);
      reconnectAttemptsRef.current += 1;
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = setTimeout(() => {
        if (!isUnmountedRef.current && targetSessionIdRef.current) {
          connectWebSocket(targetSessionIdRef.current);
        }
      }, backoffMs);
    };

    ws.onerror = () => {
      // onclose handles reconnect
    };
  };

  useEffect(() => {
    isUnmountedRef.current = false;
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Authentication token missing. Please log in.');
      return;
    }

    const initParticipantSession = async () => {
      try {
        const sessionsRes = await fetch(`${API_URL}/quiz/sessions`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!sessionsRes.ok) {
          if (sessionsRes.status === 401) {
            const newToken = await tryRefreshToken();
            if (newToken) {
              return initParticipantSession();
            }
            setError('Session expired. Please log in again.');
            return;
          }
          throw new Error('Failed to fetch available quiz sessions');
        }

        const sessions = await sessionsRes.json();
        if (!Array.isArray(sessions) || sessions.length === 0) {
          setError('No quiz session is currently available. Please wait for the host to start one.');
          return;
        }

        const targetSession = sessions.find(s => s.state === 'active') || sessions[0];
        setSessionId(targetSession.id);
        setSessionName(targetSession.name);

        const joinRes = await fetch(`${API_URL}/quiz/sessions/${targetSession.id}/join`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (joinRes.ok) {
          const joinData = await joinRes.json();
          setScore(joinData.score || 0);
          connectWebSocket(targetSession.id, token);
        } else {
          const errData = await joinRes.json().catch(() => ({}));
          setError(errData.detail || 'Failed to join quiz session');
        }
      } catch (err) {
        setError(err.message || 'Failed to initialize quiz session');
      }
    };

    initParticipantSession();

    return () => {
      isUnmountedRef.current = true;
      clearTimeout(reconnectTimerRef.current);
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [user]);

  const handleOptionSelect = (optionId) => {
    if (submitted || isSubmittingRef.current) return;
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentQuestion || submitted || isSubmittingRef.current) return;

    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      isSubmittingRef.current = true;
      setSubmitted(true);
      ws.send(JSON.stringify({
        type: 'submit_answer',
        session_id: sessionId,
        question_id: currentQuestion.question_id,
        option_id: selectedOption
      }));
    }
  };

  const handleLogout = () => {
    isUnmountedRef.current = true;
    clearTimeout(reconnectTimerRef.current);
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    localStorage.clear();
    onLogout();
  };

  if (sessionEnded) {
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
          padding: '48px',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <Trophy size={64} style={{ color: '#B3CFE5', marginBottom: '24px' }} />
          <h2 style={{ color: '#B3CFE5', fontSize: '2rem', marginBottom: '16px' }}>
            Quiz Complete!
          </h2>
          <p style={{ color: 'rgba(179, 207, 229, 0.8)', fontSize: '1.2rem', marginBottom: '8px' }}>
            {participantName || user?.email}
          </p>
          <p style={{ color: 'rgba(179, 207, 229, 0.8)', fontSize: '1.2rem', marginBottom: '32px' }}>
            Your Score: {score}
          </p>
          <button
            onClick={handleLogout}
            style={{
              padding: '14px 32px',
              background: '#B3CFE5',
              border: 'none',
              borderRadius: '12px',
              color: '#0A1931',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-view-page">
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div className="quiz-card-box" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '20px'
        }}>
          <div>
            <p style={{ color: 'rgba(179, 207, 229, 0.7)', fontSize: '0.9rem' }}>
              {participantName || user?.email}
            </p>
            <p style={{ color: '#B3CFE5', fontSize: '1.5rem', fontWeight: '700' }}>Score: {score}</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: 'rgba(220, 38, 38, 0.2)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '8px',
              color: '#FCA5A5',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Exit
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            color: '#FCA5A5'
          }}>
            {error}
          </div>
        )}

        {!currentQuestion ? (
          <div className="quiz-card-box quiz-waiting-card" style={{
            textAlign: 'center'
          }}>
            <Clock size={48} style={{ color: 'rgba(179, 207, 229, 0.5)', marginBottom: '16px' }} />
            <h2 style={{ color: '#B3CFE5', fontSize: '1.5rem', marginBottom: '8px' }}>
              Waiting for next question...
            </h2>
            <p style={{ color: 'rgba(179, 207, 229, 0.6)' }}>
              Stay tuned!
            </p>
          </div>
        ) : (
          <div className="quiz-card-box quiz-question-card">
            <h2 style={{
              color: '#B3CFE5',
              fontSize: '1.5rem',
              marginBottom: '32px',
              lineHeight: '1.4'
            }}>
              {currentQuestion.text}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={submitted}
                  style={{
                    padding: '18px 24px',
                    background: selectedOption === option.id
                      ? 'rgba(179, 207, 229, 0.3)'
                      : 'rgba(10, 25, 49, 0.6)',
                    border: selectedOption === option.id
                      ? '2px solid #B3CFE5'
                      : '1px solid rgba(179, 207, 229, 0.2)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    textAlign: 'left',
                    cursor: submitted ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: selectedOption === option.id
                      ? '#B3CFE5'
                      : 'rgba(179, 207, 229, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: selectedOption === option.id ? '#0A1931' : '#B3CFE5'
                  }}>
                    {option.order}
                  </span>
                  {option.text}
                </button>
              ))}
            </div>

            {submitted && !answerResult && (
              <div style={{
                marginTop: '24px',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(179, 207, 229, 0.1)',
                border: '1px solid rgba(179, 207, 229, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#B3CFE5'
              }}>
                <CheckCircle size={20} />
                Answer submitted. Waiting for question to conclude...
              </div>
            )}

            {answerResult && (
              <div style={{
                marginTop: '24px',
                padding: '16px',
                borderRadius: '12px',
                background: answerResult.is_correct
                  ? 'rgba(34, 197, 94, 0.15)'
                  : 'rgba(220, 38, 38, 0.15)',
                border: answerResult.is_correct
                  ? '1px solid rgba(34, 197, 94, 0.3)'
                  : '1px solid rgba(220, 38, 38, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: answerResult.is_correct ? '#86EFAC' : '#FCA5A5'
              }}>
                {answerResult.is_correct ? <CheckCircle size={20} /> : <XCircle size={20} />}
                {answerResult.is_correct ? 'Correct!' : 'Incorrect'}
              </div>
            )}

            {!submitted && selectedOption && (
              <button
                onClick={handleSubmitAnswer}
                style={{
                  marginTop: '24px',
                  padding: '16px 32px',
                  background: '#B3CFE5',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#0A1931',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  width: '100%',
                  minHeight: '48px'
                }}
              >
                Submit Answer
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        .quiz-view-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0A1931 0%, #1A3D63 100%);
          padding: 20px;
          padding-top: 150px;
        }
        .quiz-card-box {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(179, 207, 229, 0.2);
        }
        .quiz-waiting-card {
          padding: 64px;
        }
        .quiz-question-card {
          padding: 32px;
        }
        @media (max-width: 600px) {
          .quiz-view-page {
            padding: 14px;
            padding-top: 110px;
          }
          .quiz-waiting-card {
            padding: 32px 18px;
          }
          .quiz-question-card {
            padding: 22px 16px;
          }
        }
      `}</style>
    </div>
  );
}
