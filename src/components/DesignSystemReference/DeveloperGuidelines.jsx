import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Code2 } from 'lucide-react';

export default function DeveloperGuidelines() {
  const rules = [
    {
      title: 'Rule 1: Always Use CSS Design Tokens',
      desc: 'Never hardcode hex values like #0A1931 directly in CSS files. Always reference var(--color-primary-navy), var(--color-dark-blue), var(--radius-md), etc. from src/styles/tokens.css.',
      do: 'color: var(--color-primary-navy);',
      dont: 'color: #0A1931;'
    },
    {
      title: 'Rule 2: Restrict Font Families to 2 Max',
      desc: 'Headings must use Plus Jakarta Sans (var(--font-heading)) and body text must use Inter (var(--font-body)). Do not import secondary or handwritten fonts.',
      do: 'font-family: var(--font-heading);',
      dont: 'font-family: "Comic Sans", "Impact", cursive;'
    },
    {
      title: 'Rule 3: Follow Card Language & Elevation',
      desc: 'All cards must use predefined container classes (.card-standard, .card-highlight, .card-feature, .card-glass). Do not create custom card border-radii or random drop shadows.',
      do: 'className="card-standard"',
      dont: 'style={{ borderRadius: "33px", boxShadow: "10px 10px red" }}'
    },
    {
      title: 'Rule 4: Maintain Section Rhythm (Dark -> Light -> Light -> Dark)',
      desc: 'Hero is Dark Navy → Stats Section is Light White → Journey is Very Light BG → Highlights/CTA is Dark Navy → Footer is Dark Navy. Avoid making every section dark or all white.',
      do: 'Alternating high-contrast background rhythm',
      dont: 'Entire website rendered in pure dark mode or all white'
    },
    {
      title: 'Rule 5: Keep Animations Subdued (200ms - 500ms)',
      desc: 'All micro-interactions, hover lifts, and transitions must strictly use transition-base or transition-fast with prefers-reduced-motion support.',
      do: 'transition: transform var(--transition-base)',
      dont: 'animation: spin 5s infinite bounce'
    }
  ];

  return (
    <div className="ds-section">
      <div className="ds-section-header">
        <h3 className="heading-2" style={{ color: 'var(--color-primary-navy)' }}>4. Multi-Developer Consistency Rules</h3>
        <p className="text-muted">
          Mandatory guidelines for all developers building PRISM '26 sub-pages to prevent visual drift.
        </p>
      </div>

      <div className="guidelines-list">
        {rules.map((r, i) => (
          <div key={i} className="guideline-card">
            <h4 className="guideline-title">{r.title}</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '12px' }}>{r.desc}</p>

            <div className="code-comparison-grid">
              <div className="code-do">
                <div className="code-tag do-tag"><CheckCircle2 size={12} /> CORRECT</div>
                <code>{r.do}</code>
              </div>
              <div className="code-dont">
                <div className="code-tag dont-tag"><XCircle size={12} /> AVOID</div>
                <code>{r.dont}</code>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .guidelines-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .code-comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
          font-family: monospace;
          font-size: 0.85rem;
        }

        .code-do, .code-dont {
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          position: relative;
        }

        .code-do {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #065F46;
        }

        .code-dont {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #991B1B;
        }

        .code-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          font-size: 11px;
          margin-bottom: 4px;
        }

        .do-tag { color: #059669; }
        .dont-tag { color: #DC2626; }

        @media (max-width: 640px) {
          .code-comparison-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
