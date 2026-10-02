import React, { useState, useRef, useEffect } from 'react';
import {
  Play, Pause, Volume2, VolumeX, RotateCw, Maximize, Minimize,
  Film, CheckCircle2, Zap, Sparkles
} from 'lucide-react';

export default function AftermovieSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rotation, setRotation] = useState(-90); // browser auto-applies tkhd metadata rotation; CSS starts at 0
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideTimer = useRef(null);

  /* ---------- auto-hide controls ---------- */
  const resetHideTimer = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    resetHideTimer();
    return () => clearTimeout(hideTimer.current);
  }, [isPlaying]);

  /* ---------- fullscreen change listener ---------- */
  useEffect(() => {
    const onFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFSChange);
    return () => document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  /* ---------- handlers ---------- */
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
    else { videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error); }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRotate = () => setRotation(r => (r + 90) % 360);

  const toggleFullscreen = () => {
    if (!sectionRef.current) return;
    if (!document.fullscreenElement) {
      sectionRef.current.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  const handleSeek = (e) => {
    const t = parseFloat(e.target.value);
    if (videoRef.current) { videoRef.current.currentTime = t; setCurrentTime(t); }
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  /* ---------- progress width ---------- */
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="aftermovie"
      ref={sectionRef}
      className="aftermovie-fullscreen-section"
      onMouseMove={resetHideTimer}
      onTouchStart={resetHideTimer}
    >
      {/* ── Background dim overlay (always) ── */}
      <div className="aftermovie-bg-overlay" />

      {/* ── Video ── */}
      <video
        ref={videoRef}
        src="/videos/Prism_Aftermovie.mp4"
        className="aftermovie-video"
        style={{ transform: `rotate(${rotation}deg)` }}
        playsInline
        onClick={togglePlay}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* ── Header badge overlay (top-left) ── */}
      <div className={`aftermovie-top-bar ${showControls ? 'visible' : ''}`}>
        <div className="aftermovie-title-badge">
          <Film size={16} />
          <span>PRISM '25 Flagship Aftermovie</span>
        </div>
        <div className="rotation-badge">
          <RotateCw size={12} />
          <span>{rotation}°</span>
        </div>
      </div>

      {/* ── Big central play button (when paused) ── */}
      {!isPlaying && (
        <button className="big-center-play" onClick={togglePlay} aria-label="Play">
          <div className="big-play-ring">
            <Play size={44} fill="#fff" style={{ marginLeft: '5px' }} />
          </div>
          <span className="play-label">Watch Aftermovie</span>
        </button>
      )}

      {/* ── Bottom Controls bar ── */}
      <div className={`aftermovie-controls ${showControls ? 'visible' : ''}`}>
        {/* Progress */}
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          <input
            type="range"
            className="progress-range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
          />
        </div>

        {/* Control buttons row */}
        <div className="controls-row">
          <div className="controls-left">
            <button className="ctrl-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause size={22} /> : <Play size={22} fill="currentColor" />}
            </button>
            <button className="ctrl-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <span className="time-txt">{fmt(currentTime)} / {fmt(duration)}</span>
          </div>

          <div className="controls-right">
            <button className="ctrl-btn rotate-ctrl" onClick={handleRotate} title="Rotate 90°">
              <RotateCw size={18} />
              <span className="btn-label">Rotate</span>
            </button>
            <button className="ctrl-btn" onClick={toggleFullscreen} title="Toggle Fullscreen">
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* ===== CINEMATIC VIDEO BAND (embedded in About page) ===== */
        .aftermovie-fullscreen-section {
          position: relative;
          width: 100%;
          height: min(72vh, 520px);
          min-height: 320px;
          background: #040D1A;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: default;
          border-top: 3px solid rgba(179, 207, 229, 0.18);
          border-bottom: 3px solid rgba(179, 207, 229, 0.18);
        }

        /* Dark vignette around edges */
        .aftermovie-bg-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center, transparent 55%, rgba(4, 13, 26, 0.65) 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* ===== VIDEO ===== */
        .aftermovie-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          z-index: 1;
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
          background: #040D1A;
        }

        /* When video is rotated 90/270, we need to expand it so it fills the viewport */
        .aftermovie-video[style*="rotate(90deg)"],
        .aftermovie-video[style*="rotate(270deg)"] {
          width: 100vh;
          height: 100vw;
          max-width: none;
          max-height: none;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%) rotate(90deg) !important;
        }

        /* ===== TOP BAR ===== */
        .aftermovie-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          background: linear-gradient(180deg, rgba(4, 13, 26, 0.85) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .aftermovie-top-bar.visible {
          opacity: 1;
          pointer-events: auto;
        }

        .aftermovie-title-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.8);
        }

        .rotation-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(10, 25, 49, 0.7);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(179, 207, 229, 0.35);
          color: #B3CFE5;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 5px 11px;
          border-radius: var(--radius-pill);
        }

        /* ===== BIG PLAY BUTTON ===== */
        .big-center-play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .big-play-ring {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(26, 61, 99, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 2.5px solid rgba(179, 207, 229, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: transform 0.25s ease, background 0.25s ease;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
        }

        .big-center-play:hover .big-play-ring {
          transform: scale(1.1);
          background: rgba(10, 25, 49, 0.9);
        }

        .play-label {
          color: #fff;
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-shadow: 0 2px 12px rgba(0,0,0,0.9);
          text-transform: uppercase;
        }

        /* ===== BOTTOM CONTROLS ===== */
        .aftermovie-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 0 22px 18px;
          background: linear-gradient(0deg, rgba(4, 13, 26, 0.92) 0%, transparent 100%);
          display: flex;
          flex-direction: column;
          gap: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .aftermovie-controls.visible {
          opacity: 1;
          pointer-events: auto;
        }

        /* Progress bar */
        .progress-track {
          position: relative;
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.25);
          border-radius: 4px;
          overflow: visible;
          cursor: pointer;
        }
        .progress-fill {
          height: 100%;
          background: #B3CFE5;
          border-radius: 4px;
          pointer-events: none;
          transition: width 0.1s linear;
        }
        .progress-range {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          margin: 0;
        }
        .progress-track:hover .progress-fill { background: #fff; }

        /* Controls row */
        .controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .controls-left, .controls-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ctrl-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(179,207,229,0.25);
          color: #fff;
          border-radius: var(--radius-pill);
          padding: 8px 13px;
          cursor: pointer;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 700;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .ctrl-btn:hover {
          background: rgba(255,255,255,0.25);
          transform: translateY(-1px);
        }

        .rotate-ctrl { background: rgba(26,61,99,0.65); border-color: var(--medium-blue); }
        .rotate-ctrl:hover { background: var(--primary-navy); }

        .time-txt {
          color: #B3CFE5;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .btn-label { font-size: 0.78rem; }

        /* ===== MOBILE ===== */
        @media (max-width: 600px) {
          .aftermovie-fullscreen-section { height: min(60vh, 400px); min-height: 280px; }
          .big-play-ring { width: 72px; height: 72px; }
          .btn-label { display: none; }
          .controls-left, .controls-right { gap: 6px; }
          .ctrl-btn { padding: 7px 11px; }
          .aftermovie-top-bar { padding: 12px 14px; }
          .aftermovie-controls { padding: 0 14px 14px; }
        }
      `}</style>
    </section>
  );
}
