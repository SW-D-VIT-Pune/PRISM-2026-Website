import React from 'react';
import { ArrowRight, Sparkles, Code, CheckCircle, AlertCircle } from 'lucide-react';

export default function ComponentGallery() {
  return (
    <div className="ds-section">
      <div className="ds-section-header">
        <h3 className="heading-2" style={{ color: 'var(--color-primary-navy)' }}>3. Reusable UI Components</h3>
        <p className="text-muted">
          Standardized UI component matrix. Use these exact classes to maintain uniformity across all future PRISM sub-pages.
        </p>
      </div>

      {/* Button System */}
      <div className="component-group">
        <h4 className="heading-3" style={{ color: 'var(--color-dark-blue)', marginBottom: '12px' }}>Button Variants Matrix</h4>
        <div className="component-demo-box">
          <div className="demo-flex">
            <button className="btn btn-primary">
              <span>Primary Button</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-secondary">
              <span>Secondary Button</span>
            </button>
            <button className="btn btn-outline">
              <span>Outline Button</span>
            </button>
            <button className="btn btn-ghost">
              <span>Ghost Button</span>
            </button>
            <button className="btn btn-cta">
              <Sparkles size={16} />
              <span>CTA Button</span>
            </button>
          </div>
          <div className="demo-flex" style={{ marginTop: '16px' }}>
            <button className="btn btn-primary btn-sm">Small Size</button>
            <button className="btn btn-primary">Medium (Default)</button>
            <button className="btn btn-primary btn-lg">Large Size</button>
          </div>
        </div>
      </div>

      {/* Badges & Tags */}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h4 className="heading-3" style={{ color: 'var(--color-dark-blue)', marginBottom: '12px' }}>Badges & Event Status Tags</h4>
        <div className="component-demo-box">
          <div className="demo-flex">
            <span className="badge badge-default">DEFAULT BADGE</span>
            <span className="badge badge-primary">PRIMARY TAG</span>
            <span className="badge badge-highlight">HIGHLIGHT TAG</span>
            <span className="badge badge-live">LIVE STATUS</span>
          </div>
        </div>
      </div>

      {/* Card Variants */}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h4 className="heading-3" style={{ color: 'var(--color-dark-blue)', marginBottom: '12px' }}>Card Styles System</h4>
        <div className="card-demo-grid">
          <div className="card-standard">
            <span className="badge badge-primary" style={{ marginBottom: '8px' }}>STANDARD CARD</span>
            <h4 className="heading-4" style={{ color: 'var(--color-primary-navy)' }}>White Surface Card</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              Standard white background with subtle border and soft elevation hover.
            </p>
          </div>

          <div className="card-highlight">
            <span className="badge badge-highlight" style={{ marginBottom: '8px' }}>HIGHLIGHT CARD</span>
            <h4 className="heading-4" style={{ color: 'var(--color-white)' }}>Navy Dark Surface</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '4px', color: 'var(--color-light-blue)' }}>
              Deep Navy background with cyan gradient top accent and glow border on hover.
            </p>
          </div>

          <div className="card-glass-dark">
            <span className="badge badge-live" style={{ marginBottom: '8px' }}>GLASS TRANSLUCENT</span>
            <h4 className="heading-4" style={{ color: 'var(--color-white)' }}>Backdrop Blur Card</h4>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '4px', color: 'var(--color-light-blue)' }}>
              Translucent background with CSS backdrop blur and thin glass border.
            </p>
          </div>
        </div>
      </div>

      {/* Form Input Controls */}
      <div className="component-group" style={{ marginTop: '32px' }}>
        <h4 className="heading-3" style={{ color: 'var(--color-dark-blue)', marginBottom: '12px' }}>Form Input States</h4>
        <div className="component-demo-box">
          <div className="input-demo-grid">
            <div className="prism-input-group">
              <label className="prism-label">Normal State</label>
              <input type="text" className="prism-input" placeholder="e.g. Alex Morgan" />
              <span className="prism-input-hint">Default clean input field</span>
            </div>

            <div className="prism-input-group">
              <label className="prism-label">Focus State Ring</label>
              <input type="text" className="prism-input" style={{ borderColor: 'var(--color-medium-blue)', boxShadow: '0 0 0 3px rgba(74, 127, 167, 0.2)' }} defaultValue="Active user focus ring" />
              <span className="prism-input-hint">Glowing medium blue focus shadow</span>
            </div>

            <div className="prism-input-group">
              <label className="prism-label">Error State</label>
              <input type="text" className="prism-input error" defaultValue="invalid-email@" />
              <span className="prism-input-error-msg">Please enter a valid college email address</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .component-demo-box {
          background: white;
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-md);
          padding: var(--space-lg);
        }

        .demo-flex {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          flex-wrap: wrap;
        }

        .card-demo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--space-md);
        }

        .input-demo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: var(--space-lg);
        }
      `}</style>
    </div>
  );
}
