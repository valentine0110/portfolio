import React, { useState, useEffect } from 'react';

export default function CyberHUD({ activeSection, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on click outside or Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e) => {
      if (!e.target.closest('.nav-inner')) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('pointerdown', handleOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('pointerdown', handleOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'focus', label: 'Focus' },
    { id: 'work', label: 'Work' },
    { id: 'security', label: 'Security' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar at the absolute top of the viewport */}
      <div
        className="scroll-progress-line"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Dimmed mobile overlay backdrop when menu is open */}
      {menuOpen && (
        <div
          className="nav-mobile-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="nav-shell">
        <div className="nav-inner">
        {/* Brand */}
        <button
          className="brand"
          onClick={() => {
            setMenuOpen(false);
            onNavigate('home');
          }}
          aria-label="Home"
        >
          <span className="brand-box">
            <img
              src="/pic.png"
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </span>

          <span className="brand-text">
            nayan<span>.</span>
          </span>
        </button>

        {/* Center Desktop Navigation / Mobile Dropdown Sheet */}
        <nav className={`nav ${menuOpen ? 'is-open' : ''}`}>
          <div className="nav-mobile-header" aria-hidden="true">
            <span>NAVIGATION</span>
            <button
              className="nav-mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setMenuOpen(false);
                onNavigate(item.id);
              }}
              className={activeSection === item.id ? 'active' : ''}
            >
              <span className="nav-item-text">{item.label}</span>
              <span className="nav-item-arrow" aria-hidden="true">↗</span>
            </button>
          ))}

          <a
            href="https://github.com/valentine0110"
            target="_blank"
            rel="noreferrer"
            className="mobile-github-link"
            onClick={() => setMenuOpen(false)}
          >
            <span>GitHub Profile</span>
            <span aria-hidden="true">↗</span>
          </a>
        </nav>

        {/* Right Action Tools */}
        <div className="nav-right">
          <a
            href="https://github.com/valentine0110"
            target="_blank"
            rel="noreferrer"
            className="github-pill"
          >
            GitHub ↗
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  </>
  );
}
