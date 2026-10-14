import React from 'react';

export default function SectionDivider({ label }) {
  return (
    <div className="section-transition-boundary" aria-hidden="true">
      <div className="boundary-glow-ambient" />
      <div className="boundary-line" />
      <div className="boundary-center-node">
        <span className="node-diamond" />
        {label && <span className="node-label">{label}</span>}
      </div>
    </div>
  );
}

