import React, { useState, useEffect, useRef } from 'react';
import { Play, Plus, Settings, Users, Trophy } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const WS_URL = import.meta.env.VITE_API_URL?.replace('http', 'ws') || 'ws://localhost:8000';

export default function QuizAdminView({ user, onLogout }) {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    order: 1,
    options: [
      { text: '', is_correct: false, order: 1 },
      { text: '', is_correct: false, order: 2 }
    ]
  });
  const wsRef = useRef(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const getResp = await fetch(`${API_URL}/quiz/sessions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (getResp.ok) {
        const sessionsList = await getResp.json();
        if (Array.isArray(sessionsList) && sessionsList.length > 0) {
          setSessions(sessionsList);
          setSelectedSession(sessionsList[0]);
          loadQuestions(sessionsList[0].id);
          return;
        }
      }

      // Create a session if none exists
      const response = await fetch(`${API_URL}/quiz/sessions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'PRISM Quiz Session' })
      });
      if (response.ok) {
        const session = await response.json();
        setSessions([session]);
        setSelectedSession(session);
        loadQuestions(session.id);
      }
    } catch (err) {
      console.error('Failed to load sessions');
    }
  };

  const loadQuestions = async (sessionId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/quiz/sessions/${sessionId}/questions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setQuestions(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load questions');
    }
  };

  const handleCreateQuestion = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/quiz/sessions/${selectedSession.id}/questions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuestion)
      });
      if (response.ok) {
        setShowQuestionForm(false);
        setNewQuestion({
          text: '',
          order: questions.length + 1,
          options: [
            { text: '', is_correct: false, order: 1 },
            { text: '', is_correct: false, order: 2 }
          ]
        });
        loadQuestions(selectedSession.id);
      }
    } catch (err) {
      console.error('Failed to create question');
    }
  };

  const handleStartSession = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await fetch(`${API_URL}/quiz/sessions/${selectedSession.id}/start`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Failed to start session');
    }
  };

  const handleBroadcastQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem('access_token');
      await fetch(`${API_URL}/quiz/sessions/${selectedSession.id}/next`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Failed to broadcast question');
    }
  };

  const handleEndSession = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await fetch(`${API_URL}/quiz/sessions/${selectedSession.id}/end`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Failed to end session');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A1931 0%, #1A3D63 100%)',
      padding: '20px',
      paddingTop: '150px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(179, 207, 229, 0.2)'
        }}>
          <div>
            <h1 style={{ color: '#B3CFE5', fontSize: '1.8rem', marginBottom: '4px' }}>
              Quiz Admin
            </h1>
            <p style={{ color: 'rgba(179, 207, 229, 0.6)', fontSize: '0.9rem' }}>
              {user.email} • {user.role}
            </p>
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
            Logout
          </button>
        </div>

        {/* Session Controls */}
        {selectedSession && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(179, 207, 229, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ color: '#B3CFE5', fontSize: '1.3rem' }}>
                {selectedSession.name}
              </h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleStartSession}
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(34, 197, 94, 0.2)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '8px',
                    color: '#86EFAC',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <Play size={16} /> Start
                </button>
                <button
                  onClick={handleEndSession}
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
                  End Session
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowQuestionForm(!showQuestionForm)}
              style={{
                padding: '12px 24px',
                background: '#B3CFE5',
                border: 'none',
                borderRadius: '8px',
                color: '#0A1931',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem',
                fontWeight: '600'
              }}
            >
              <Plus size={18} /> Add Question
            </button>
          </div>
        )}

        {/* Question Form */}
        {showQuestionForm && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(179, 207, 229, 0.2)'
          }}>
            <h3 style={{ color: '#B3CFE5', marginBottom: '20px' }}>New Question</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Question text"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                style={{
                  padding: '12px',
                  background: 'rgba(10, 25, 49, 0.6)',
                  border: '1px solid rgba(179, 207, 229, 0.2)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '1rem'
                }}
              />
              {newQuestion.options.map((opt, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder={`Option ${idx + 1}`}
                    value={opt.text}
                    onChange={(e) => {
                      const updated = [...newQuestion.options];
                      updated[idx].text = e.target.value;
                      setNewQuestion({ ...newQuestion, options: updated });
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'rgba(10, 25, 49, 0.6)',
                      border: '1px solid rgba(179, 207, 229, 0.2)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.95rem'
                    }}
                  />
                  <label style={{ color: '#B3CFE5', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input
                      type="checkbox"
                      checked={opt.is_correct}
                      onChange={(e) => {
                        const updated = [...newQuestion.options];
                        updated[idx].is_correct = e.target.checked;
                        setNewQuestion({ ...newQuestion, options: updated });
                      }}
                    />
                    Correct
                  </label>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleCreateQuestion}
                  style={{
                    padding: '12px 24px',
                    background: '#B3CFE5',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#0A1931',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Save Question
                </button>
                <button
                  onClick={() => setShowQuestionForm(false)}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(220, 38, 38, 0.2)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '8px',
                    color: '#FCA5A5',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(179, 207, 229, 0.2)'
        }}>
          <h3 style={{ color: '#B3CFE5', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={20} /> Questions ({questions.length})
          </h3>
          {questions.length === 0 ? (
            <p style={{ color: 'rgba(179, 207, 229, 0.5)' }}>No questions yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {questions.map((q) => (
                <div
                  key={q.id}
                  style={{
                    padding: '16px',
                    background: 'rgba(10, 25, 49, 0.4)',
                    borderRadius: '12px',
                    border: '1px solid rgba(179, 207, 229, 0.15)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <p style={{ color: '#B3CFE5', fontWeight: '600', marginBottom: '4px' }}>
                      Q{q.order}: {q.text}
                    </p>
                    <p style={{ color: 'rgba(179, 207, 229, 0.6)', fontSize: '0.85rem' }}>
                      {q.options.length} options
                    </p>
                  </div>
                  <button
                    onClick={() => handleBroadcastQuestion(q.id)}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(34, 197, 94, 0.2)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      borderRadius: '6px',
                      color: '#86EFAC',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Play size={14} /> Broadcast
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
