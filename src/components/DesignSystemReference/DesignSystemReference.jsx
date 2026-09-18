import React, { useState } from 'react';
import ColorTokens from './ColorTokens';
import TypographySpecimen from './TypographySpecimen';
import ComponentGallery from './ComponentGallery';
import DeveloperGuidelines from './DeveloperGuidelines';
import { Layers, CheckCircle, Sparkles, BookOpen } from 'lucide-react';

export default function DesignSystemReference({ onSwitchToPrototype }) {
  const [activeTab, setActiveTab] = useState('palette');
  const [toastMessage, setToastMessage] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`Copied "${text}" to clipboard!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="ds-ref-container">
      {/* Header Banner */}
      <div className="ds-hero-header">
        <div className="ds-hero-inner">
          <div className="badge badge-highlight" style={{ marginBottom: '12px' }}>
            <BookOpen size={13} /> MASTER UI REFERENCE DOCUMENTATION
          </div>
          <h1 className="heading-1" style={{ color: 'var(--color-white)' }}>
            PRISM '26 Design System & Tokens
          </h1>
          <p className="text-muted" style={{ color: 'var(--color-light-blue)', marginTop: '6px', maxWidth: '720px' }}>
            Central design system reference specification for PRISM '26. Created to ensure visual harmony and zero styling drift across all sub-pages built by multiple frontend developers.
          </p>
        </div>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="ds-nav-tabs">
        <button 
          className={`ds-tab-btn ${activeTab === 'palette' ? 'active' : ''}`}
          onClick={() => setActiveTab('palette')}
        >
          1. Color Palette System
        </button>
        <button 
          className={`ds-tab-btn ${activeTab === 'typography' ? 'active' : ''}`}
          onClick={() => setActiveTab('typography')}
        >
          2. Typography Scale
        </button>
        <button 
          className={`ds-tab-btn ${activeTab === 'components' ? 'active' : ''}`}
          onClick={() => setActiveTab('components')}
        >
          3. Reusable UI Components
        </button>
        <button 
          className={`ds-tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          4. Multi-Dev Rules
        </button>
      </div>

      {/* Main Tab Content Container */}
      <div className="section-container" style={{ paddingTop: '32px' }}>
        {activeTab === 'palette' && <ColorTokens onCopy={handleCopy} />}
        {activeTab === 'typography' && <TypographySpecimen />}
        {activeTab === 'components' && <ComponentGallery />}
        {activeTab === 'rules' && <DeveloperGuidelines />}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="ds-toast">
          <CheckCircle size={14} style={{ display: 'inline', marginRight: '6px' }} />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
