import React from 'react';
import { Copy, Check } from 'lucide-react';

export default function ColorTokens({ onCopy }) {
  const colors = [
    {
      name: 'Primary Navy',
      token: '--color-primary-navy',
      hex: '#0A1931',
      rgb: 'rgb(10, 25, 49)',
      useCase: 'Hero backgrounds, primary buttons, headers, footer',
      contrast: 'AAA vs White'
    },
    {
      name: 'Dark Blue',
      token: '--color-dark-blue',
      hex: '#1A3D63',
      rgb: 'rgb(26, 61, 99)',
      useCase: 'Secondary buttons, dark card surfaces, accents',
      contrast: 'AAA vs White'
    },
    {
      name: 'Medium Blue',
      token: '--color-medium-blue',
      hex: '#4A7FA7',
      rgb: 'rgb(74, 127, 167)',
      useCase: 'Active states, outline borders, subtitles, links',
      contrast: 'AA vs White'
    },
    {
      name: 'Light Blue',
      token: '--color-light-blue',
      hex: '#B3CFE5',
      rgb: 'rgb(179, 207, 229)',
      useCase: 'Default badges, subtle borders, muted text on dark',
      contrast: 'AAA vs Navy'
    },
    {
      name: 'Very Light Background',
      token: '--color-very-light-bg',
      hex: '#F6FAFD',
      rgb: 'rgb(246, 250, 253)',
      useCase: 'Main page background, light sections',
      contrast: 'AAA vs Navy'
    },
    {
      name: 'White',
      token: '--color-white',
      hex: '#FFFFFF',
      rgb: 'rgb(255, 255, 255)',
      useCase: 'Card surfaces, clean white backgrounds, dark text',
      contrast: 'AAA vs Navy'
    },
    {
      name: 'Accent Electric Cyan',
      token: '--color-accent-cyan',
      hex: '#38BDF8',
      rgb: 'rgb(56, 189, 248)',
      useCase: 'Glow effects, highlight text gradients, active dots',
      contrast: 'High Glow'
    }
  ];

  return (
    <div className="ds-section">
      <div className="ds-section-header">
        <h3 className="heading-2" style={{ color: 'var(--color-primary-navy)' }}>1. Color Palette System</h3>
        <p className="text-muted">
          Strict 6-token primary palette with electric ice cyan accent. Do not introduce unrelated colors. Click any swatch to copy its CSS token or Hex code.
        </p>
      </div>

      <div className="color-swatch-grid">
        {colors.map((c, i) => (
          <div key={i} className="color-swatch-card">
            <div className="color-swatch-preview" style={{ backgroundColor: c.hex }}>
              <button className="copy-hex-btn" onClick={() => onCopy(c.hex)}>
                <Copy size={11} /> Copy {c.hex}
              </button>
            </div>
            <div className="color-swatch-info">
              <div className="color-swatch-name">{c.name}</div>
              <div className="color-swatch-meta">
                <code>{c.token}</code>
                <span>{c.contrast}</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {c.useCase}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
