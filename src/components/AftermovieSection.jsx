import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, RotateCw, Maximize, 
  Sparkles, Film, CheckCircle2, RefreshCw, Zap
} from 'lucide-react';

export default function AftermovieSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rotation, setRotation] = useState(90); // 0, 90, 180, 270 (90 deg compensates for raw portrait recording)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Toggle Play / Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Playback error:", err);
        });
      }
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Cycle Rotation: 0° -> 90° -> 180° -> 270° -> 0°
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Toggle Browser Fullscreen
  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          console.log("Fullscreen error:", err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Time update listener
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Loaded metadata listener
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Seek handler
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Format time (mm:ss)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="aftermovie" className="section-wrapper aftermovie-section">
      <div className="container-inner">
        
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: '32px' }}>
          <span className="section-tag glow-tag">
            <Film size={14} /> FLAGSHIP VIDEO SHOWCASE
          </span>
          <h2 className="heading-1 aftermovie-title">
            PRISM '25 Flagship Aftermovie
          </h2>
          <p className="text-muted aftermovie-sub">
            Experience the energy, grassroots impact, and unforgettable memories of PRISM in full cinematic resolution.
          </p>
        </div>

        {/* Video Player Card Container */}
        <div 
          ref={containerRef}
          className="aftermovie-player-card card-clean"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Video Viewport Wrapper */}
          <div className="video-viewport-box">
            
            {/* The HTML5 Video Element */}
            <video
              ref={videoRef}
              src="/videos/Prism_Aftermovie.mp4"
              className="aftermovie-video-element"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
            />

            {/* Big Centered Overlay Play Button when Paused */}
            {!isPlaying && (
              <button 
                className="big-play-overlay-btn animate-pulse-glow"
                onClick={togglePlay}
                aria-label="Play Aftermovie Video"
              >
                <Play size={36} fill="#FFFFFF" style={{ marginLeft: '4px' }} />
              </button>
            )}

            {/* Rotation Badge Indicator */}
            <div className="rotation-badge-pill">
              <RotateCw size={13} />
              <span>Rotation: {rotation}°</span>
            </div>

          </div>

          {/* Custom Video Controls Bar */}
          <div className={`video-controls-bar ${isHovered || !isPlaying ? 'visible' : ''}`}>
            
            {/* Progress Slider */}
            <div className="progress-bar-wrapper">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="video-progress-slider"
              />
            </div>

            <div className="controls-row">
              {/* Left Controls: Play/Pause, Mute/Unmute, Time */}
              <div className="controls-left-group">
                <button className="control-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                </button>

                <button className="control-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <span className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Controls: Rotate & Fullscreen */}
              <div className="controls-right-group">
                <button 
                  className="control-btn rotate-btn"
                  onClick={handleRotate} 
                  title="Rotate Video 90°"
                  aria-label="Rotate Video"
                >
                  <RotateCw size={18} />
                  <span className="rotate-btn-text">Rotate {rotation}°</span>
                </button>

                <button 
                  className="control-btn" 
                  onClick={toggleFullscreen} 
                  title="Toggle Fullscreen"
                  aria-label="Fullscreen"
                >
                  <Maximize size={18} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Video Highlights & Stats Strip */}
        <div className="aftermovie-stats-strip" style={{ marginTop: '24px' }}>
          <div className="stat-pill-item">
            <CheckCircle2 size={16} />
            <span>Full Length HD Playback</span>
          </div>
          <div className="stat-pill-item">
            <Sparkles size={16} />
            <span>2,500+ Delegates &amp; Participants</span>
          </div>
          <div className="stat-pill-item">
            <Zap size={16} />
            <span>SWD Committee • VIT Pune Flagship</span>
          </div>
        </div>

      </div>

      <style>{`
        .aftermovie-section {
          background: linear-gradient(180deg, #EAF2F8 0%, #FFFFFF 100%);
          border-bottom: 1px solid var(--light-blue);
          padding-top: clamp(40px, 6vw, 70px);
          padding-bottom: clamp(40px, 6vw, 70px);
        }

        .aftermovie-title {
          color: var(--primary-navy);
          margin-top: 6px;
        }

        .aftermovie-sub {
          max-width: 680px;
          margin: 8px auto 0;
          font-size: 1rem;
        }

        .aftermovie-player-card {
          position: relative;
          background: #0A1931;
          border: 2px solid var(--medium-blue);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(10, 25, 49, 0.25);
          max-width: 960px;
          margin: 0 auto;
        }

        .video-viewport-box {
          position: relative;
          width: 100%;
          min-height: 520px;
          height: clamp(420px, 65vh, 650px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #040D1A;
          overflow: hidden;
        }

        .aftermovie-video-element {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          cursor: pointer;
        }

        .big-play-overlay-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(26, 61, 99, 0.85);
          backdrop-filter: blur(8px);
          border: 2px solid var(--light-blue);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.25s ease, background-color 0.25s ease;
          z-index: 5;
        }

        .big-play-overlay-btn:hover {
          transform: translate(-50%, -50%) scale(1.12);
          background: var(--primary-navy);
        }

        .rotation-badge-pill {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(10, 25, 49, 0.75);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(179, 207, 229, 0.4);
          color: var(--light-blue);
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: var(--radius-pill);
          z-index: 5;
        }

        .video-controls-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, rgba(10, 25, 49, 0) 0%, rgba(10, 25, 49, 0.95) 100%);
          padding: 16px 20px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 10;
          transition: opacity 0.3s ease;
        }

        .progress-bar-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
        }

        .video-progress-slider {
          width: 100%;
          height: 5px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          transition: height 0.2s ease;
        }

        .video-progress-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--light-blue);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
        }

        .controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .controls-left-group, .controls-right-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .control-btn {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(179, 207, 229, 0.3);
          color: var(--white);
          border-radius: var(--radius-pill);
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }

        .rotate-btn {
          background: var(--deep-blue);
          border-color: var(--medium-blue);
        }

        .rotate-btn:hover {
          background: var(--primary-navy);
        }

        .time-display {
          color: #B3CFE5;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          margin-left: 4px;
        }

        .aftermovie-stats-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .stat-pill-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--white);
          border: 1px solid var(--light-blue);
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          color: var(--primary-navy);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 768px) {
          .video-viewport-box {
            min-height: 380px;
            height: clamp(340px, 50vh, 480px);
          }
          .rotate-btn-text {
            display: none;
          }
          .big-play-overlay-btn {
            width: 64px;
            height: 64px;
          }
          .aftermovie-stats-strip {
            flex-direction: column;
            gap: 8px;
          }
          .stat-pill-item {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
