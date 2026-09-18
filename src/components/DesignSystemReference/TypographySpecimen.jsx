import React from 'react';

export default function TypographySpecimen() {
  const specimens = [
    {
      role: 'Display / Hero Title',
      class: 'heading-display',
      sample: 'Driving Social Impact Through Youth & Tech',
      details: 'Plus Jakarta Sans | 40px - 64px clamp | Weight 800 | Line-Height 1.1'
    },
    {
      role: 'Heading 1 (H1)',
      class: 'heading-1',
      sample: 'PRISM \'26 Flagship Event Showcase',
      details: 'Plus Jakarta Sans | 32px - 44px clamp | Weight 700 | Line-Height 1.2'
    },
    {
      role: 'Heading 2 (H2)',
      class: 'heading-2',
      sample: 'Quantifying Youth Impact & Reach',
      details: 'Plus Jakarta Sans | 24px - 32px clamp | Weight 700 | Line-Height 1.3'
    },
    {
      role: 'Heading 3 (H3)',
      class: 'heading-3',
      sample: 'Tech for Social Good Hackathon Track',
      details: 'Plus Jakarta Sans | 20px - 24px clamp | Weight 600 | Line-Height 1.35'
    },
    {
      role: 'Heading 4 (H4)',
      class: 'heading-4',
      sample: 'Collaborative Student Prototyping & Incubation',
      details: 'Plus Jakarta Sans | 17px - 19.2px clamp | Weight 600 | Line-Height 1.4'
    },
    {
      role: 'Body Large',
      class: 'text-body-lg',
      sample: 'PRISM \'26 is the premier social development initiative uniting student developers and civic leaders.',
      details: 'Inter | 18px (1.125rem) | Weight 400 | Line-Height 1.6'
    },
    {
      role: 'Body Regular',
      class: 'text-body-md',
      sample: 'Every track provides mentorship, resource grants, and public showcase opportunities.',
      details: 'Inter | 16px (1rem) | Weight 400 | Line-Height 1.6'
    },
    {
      role: 'Caption / Label',
      class: 'badge badge-primary',
      sample: 'OFFICIAL EVENT UI FOUNDATION',
      details: 'Plus Jakarta Sans | 12px UPPERCASE | Weight 600 | Letter-Spacing 0.05em'
    }
  ];

  return (
    <div className="ds-section">
      <div className="ds-section-header">
        <h3 className="heading-2" style={{ color: 'var(--color-primary-navy)' }}>2. Typography Hierarchy</h3>
        <p className="text-muted">
          Utilizing maximum 2 font families: <strong>Plus Jakarta Sans</strong> for headings and <strong>Inter</strong> for clean body text readability.
        </p>
      </div>

      <div className="specimen-list">
        {specimens.map((s, idx) => (
          <div key={idx} className="type-specimen-row">
            <span className="type-meta">{s.role} — {s.details}</span>
            <div className={s.class} style={{ color: 'var(--color-primary-navy)' }}>
              {s.sample}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
