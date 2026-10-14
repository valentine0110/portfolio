import React, { useState } from 'react';
import TiltCard from './TiltCard';

export const securityData = [
  {
    id: 'case-01',
    status: 'REGISTERED',
    date: 'JUL 2026',
    title: 'Government-affiliated ticketing platforms',
    summary:
      'Responsible disclosure concerning publicly accessible production configuration across multiple ticketing platforms.',
    points: [
      'Passive reconnaissance with minimal verification',
      'Production payment, webhook and scanner configuration exposure',
      'CERT-In registered five related incident references',
    ],
    refs: [
      'CERTIn-16447826',
      'CERTIn-99592326',
      'CERTIn-16635226',
      'CERTIn-55864126',
      'CERTIn-03101526',
    ],
  },
  {
    id: 'case-02',
    status: 'REGISTERED',
    date: 'JUL 2026',
    title: 'APSRTC public-facing infrastructure',
    summary:
      'Responsible disclosure covering multiple security findings across publicly reachable transport infrastructure.',
    points: [
      'Exposed cloud storage and backend API surfaces',
      'Credential / token exposure and unrestricted registration findings',
      'CERT-In registered the incident under CERTIn-72247126',
    ],
    refs: ['CERTIn-72247126'],
  },
];

export default function SecurityDossier() {
  const [copiedRef, setCopiedRef] = useState(null);

  const copyRefText = (refText) => {
    navigator.clipboard?.writeText(refText);
    setCopiedRef(refText);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  return (
    <div className="security-dossier-wrapper">
      <div className="security-intel-banner">
        <p className="security-lead-text">
          Sanitised public-facing summaries of security research and responsible disclosures.
          Target hostnames, credentials, tokens, private screenshots and reproduction instructions are intentionally omitted.
        </p>
      </div>

      {/* Security Case Cards */}
      <div className="security-cards-grid">
        {securityData.map((item, idx) => (
          <TiltCard
            key={item.id}
            className="security-tilt-card"
            maxTilt={7}
            perspective={1000}
          >
            <div className="sec-card-header">
              <span className="sec-case-badge">0{idx + 1}</span>
              <span className="sec-status-tag">● {item.status}</span>
              <span className="sec-date">{item.date}</span>
            </div>

            <h3 className="sec-title">{item.title}</h3>
            <p className="sec-summary">{item.summary}</p>

            <div className="sec-points-list">
              {item.points.map((pt, pIdx) => (
                <div key={pIdx} className="sec-point-item">
                  <span className="point-marker">+</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="sec-refs-container">
              <span className="refs-label">CERT-In references</span>
              <div className="refs-pills">
                {item.refs.map((ref) => (
                  <button
                    key={ref}
                    className="ref-pill-btn"
                    onClick={() => copyRefText(ref)}
                    title="Click to copy CERT-In reference"
                  >
                    <span>{ref}</span>
                    <span className="copy-state">
                      {copiedRef === ref ? '✓ copied' : '⧉'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
