import React, { useState, useEffect } from 'react';
import TiltCard from './TiltCard';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const EMAIL = 'nayanmoni010101@gmail.com';
  const GITHUB = 'https://github.com/valentine0110';
  const INSTAGRAM = 'https://www.instagram.com/_nayan._.moni';

  // Live India Time (IST)
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const istStr = new Intl.DateTimeFormat('en-GB', options).format(new Date());
      setCurrentTime(`${istStr} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="contact-unified-wrapper">
      <div className="contact-grid-layout">
        {/* Main Contact Card */}
        <TiltCard className="contact-main-card" maxTilt={6} perspective={1200}>
          <div className="contact-badge-header">
            <span className="live-radar-dot" />
            <span className="radar-status-text">OPEN TO FREELANCE WORK</span>
          </div>

          <h2 className="contact-headline">
            Have a project in mind?
            <br />
            <span>Let’s build something useful.</span>
          </h2>

          <p className="contact-summary-text">
            I’m available for freelance web development and custom projects. Whether you need a business
            website, a web application, or something built around a specific idea, feel free to get in touch.
          </p>

          <div className="contact-primary-actions">
            <a
              href={`mailto:${EMAIL}`}
              className="btn btn-primary"
            >
              Email me ↗
            </a>

            <button
              className="btn btn-secondary"
              onClick={copyEmail}
            >
              {copied ? '✓ Copied to clipboard' : 'Copy email address'}
            </button>

            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              GitHub ↗
            </a>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              Instagram ↗
            </a>
          </div>
        </TiltCard>

        {/* Info Card */}
        <TiltCard className="telemetry-card" maxTilt={6} perspective={1200}>
          <div className="telemetry-head">
            <span className="telemetry-label">LOCATION & STATUS</span>
            <span className="telemetry-node">INDIA</span>
          </div>

          <div className="telemetry-stats-list">
            <div className="stat-row">
              <span className="stat-name">Name</span>
              <span className="stat-val">Nayan Moni (Valentine)</span>
            </div>

            <div className="stat-row">
              <span className="stat-name">Local Time</span>
              <span className="stat-val mono-glow">{currentTime || 'IST'}</span>
            </div>

            <div className="stat-row">
              <span className="stat-name">Timezone</span>
              <span className="stat-val">India (UTC+5:30)</span>
            </div>

            <div className="stat-row">
              <span className="stat-name">Email</span>
              <span className="stat-val">{EMAIL}</span>
            </div>

            <div className="stat-row">
              <span className="stat-name">Freelance</span>
              <span className="stat-val live-ready">
                <span className="stat-dot" />
                Available
              </span>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
