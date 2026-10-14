import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import ThreeBackground from './components/ThreeBackground';
import ThreeHeroCanvas from './components/ThreeHeroCanvas';
import TiltCard from './components/TiltCard';
import ProjectsShowcase from './components/ProjectsShowcase';
import SecurityDossier from './components/SecurityDossier';
import SkillsMatrix from './components/SkillsMatrix';
import ContactSection from './components/ContactSection';
import CyberHUD from './components/CyberHUD';
import ScrollRevealSection from './components/ScrollRevealSection';
import SectionDivider from './components/SectionDivider';

const focusItems = [
  {
    icon: '01',
    title: 'AI-Assisted Development',
    tag: 'WORKFLOW',
    text: 'Using modern AI tools alongside traditional development to prototype, debug and build products more efficiently.',
  },
  {
    icon: '02',
    title: 'Web Development',
    tag: 'REACT • VITE • SUPABASE',
    text: 'Building responsive and practical web applications using modern frontend technologies and backend services.',
  },
  {
    icon: '03',
    title: 'Security Research',
    tag: 'CERT-IN REPORTING',
    text: 'Exploring web security, identifying exposed infrastructure and responsibly reporting security issues.',
  },
  {
    icon: '04',
    title: 'Experimental Projects',
    tag: 'EXPLORATION',
    text: 'Building small tools and unconventional projects to learn new technologies and test ideas.',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  // Intersection observer for section tracking in HUD
  useEffect(() => {
    const sections = [...document.querySelectorAll('section[id]')];

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current) setActiveSection(current.target.id);
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.05, 0.2, 0.4, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Spotlight mouse tracker for ambient glow
  useEffect(() => {
    const move = (event) =>
      setSpotlight({
        x: event.clientX,
        y: event.clientY,
      });

    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div
      className={`app active-section-${activeSection}`}
      style={{
        '--mx': `${spotlight.x}px`,
        '--my': `${spotlight.y}px`,
      }}
    >
      {/* Three.js Background Stars with Parallax */}
      <ThreeBackground />

      {/* Cyber Grid Overlays */}
      <div className="ambient" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      {/* Modern HUD Navigation */}
      <CyberHUD
        activeSection={activeSection}
        onNavigate={scrollTo}
      />

      <main>
        {/* ─── HERO SECTION ─── */}
        <section id="home" className="hero page-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="live-badge" onClick={() => scrollTo('contact')}>
                <span className="pulse" />
                <span>AVAILABLE FOR FREELANCE WORK</span>
              </div>

              <div className="hero-kicker">
                HELLO, I'M <span>NAYAN MONI</span>
              </div>

              <h1 className="hero-glitch-title">
                Build.
                <br />
                <span className="hologram-text">Experiment.</span>
                <br />
                Deploy.
              </h1>

              <p className="hero-lead">
                I’m <strong>Nayan Moni</strong>, a computer science student and developer
                interested in web development, cybersecurity and building useful digital products.
              </p>

              <div className="hero-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => scrollTo('work')}
                >
                  View my work <span>↗</span>
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => scrollTo('security')}
                >
                  Security research <span>↓</span>
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => scrollTo('contact')}
                >
                  Contact <span>✉</span>
                </button>
              </div>

              <div className="micro-stats">
                <div>
                  <strong>03+</strong>
                  <span>Selected Projects</span>
                </div>
                <div>
                  <strong>02</strong>
                  <span>Security Disclosures</span>
                </div>
                <div>
                  <strong>∞</strong>
                  <span>Ideas to Explore</span>
                </div>
              </div>
            </div>

            {/* Earth with Defense Barrier */}
            <div className="hero-visual">
              <ThreeHeroCanvas />
            </div>
          </div>

          <button
            className="scroll-cue"
            onClick={() => scrollTo('about')}
          >
            SCROLL TO EXPLORE <span>↓</span>
          </button>
        </section>

        {/* ─── TRANSITION TO ABOUT ─── */}
        <SectionDivider label="01 // ABOUT" />

        {/* ─── ABOUT SECTION ─── */}
        <ScrollRevealSection id="about" className="compact-section">
          <SectionIntro
            index="01"
            label="ABOUT"
            title="A developer who likes building things."
          />

          <div className="about-layout section-body">
            <div className="about-copy">
              <p className="big-copy">
                I’m Nayan Moni, a computer science student with a strong interest in
                web development, cybersecurity and software engineering.
              </p>

              <p>
                Most of what I learn comes from building things myself —
                from client-style websites and web applications to security
                tools and experimental projects.
              </p>

              <p className="muted-copy">
                I enjoy taking an idea, figuring out how it should work,
                and turning it into something practical. AI-assisted
                development is also part of my workflow, helping me
                explore solutions and move from idea to implementation
                faster.
              </p>

              <div className="signature-line">
                <span>NAYAN MONI</span>
                <span>INDIA · 2026</span>
              </div>
            </div>

            <TiltCard className="profile-panel" maxTilt={8} perspective={1100}>
              <div className="panel-top">
                <span>PROFILE.SYS</span>
                <span className="live-verified-pill">● ONLINE</span>
              </div>

              <div className="profile-avatar">
                <img src="/pic.png" alt="Nayan Moni" />
              </div>

              <h3>Nayan Moni</h3>
              <p className="profile-role">Developer & Security Researcher</p>

              <div className="profile-row">
                <span>primary</span>
                <b>Web Development</b>
              </div>
              <div className="profile-row">
                <span>secondary</span>
                <b>Security Research</b>
              </div>
              <div className="profile-row">
                <span>learning</span>
                <b>New Technologies</b>
              </div>
              <div className="profile-row">
                <span>location</span>
                <b>India</b>
              </div>

              <div className="profile-quick-action">
                <button
                  className="btn btn-primary full-w-btn"
                  onClick={() => scrollTo('contact')}
                >
                  Get in touch ↗
                </button>
              </div>
            </TiltCard>
          </div>
        </ScrollRevealSection>

        {/* ─── TRANSITION TO FOCUS ─── */}
        <SectionDivider label="02 // FOCUS" />

        {/* ─── FOCUS SECTION ─── */}
        <ScrollRevealSection id="focus" className="focus-section">
          <SectionIntro
            index="02"
            label="CURRENT FOCUS"
            title="What I’m working on."
          />

          <div className="focus-grid section-body">
            {focusItems.map((item) => (
              <TiltCard key={item.title} className="focus-card" maxTilt={8}>
                <div className="focus-number">{item.icon}</div>
                <div>
                  <span className="focus-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <span className="card-arrow">↗</span>
              </TiltCard>
            ))}
          </div>
        </ScrollRevealSection>

        {/* ─── TRANSITION TO SKILLS ─── */}
        <SectionDivider label="03 // STACK" />

        {/* ─── SKILLS MATRIX SECTION ─── */}
        <ScrollRevealSection id="skills" className="skills-section">
          <SectionIntro
            index="03"
            label="TECH STACK"
            title="Tools & technologies."
          />

          <div className="section-body">
            <SkillsMatrix />
          </div>
        </ScrollRevealSection>

        {/* ─── TRANSITION TO WORK ─── */}
        <SectionDivider label="04 // WORK" />

        {/* ─── WORK / PROJECTS SECTION ─── */}
        <ScrollRevealSection id="work" className="work-section">
          <SectionIntro
            index="04"
            label="SELECTED WORK"
            title="Projects I’ve built."
          />

          <div className="section-body">
            <ProjectsShowcase />
          </div>
        </ScrollRevealSection>

        {/* ─── TRANSITION TO SECURITY ─── */}
        <SectionDivider label="05 // SECURITY" />

        {/* ─── SECURITY RESEARCH SECTION ─── */}
        <ScrollRevealSection id="security" className="security-section">
          <SectionIntro
            index="05"
            label="SECURITY RESEARCH"
            title="Responsible security research."
          />

          <div className="section-body">
            <SecurityDossier />
          </div>
        </ScrollRevealSection>

        {/* ─── TRANSITION TO CONTACT ─── */}
        <SectionDivider label="06 // CONTACT" />

        {/* ─── CONTACT SECTION ─── */}
        <ScrollRevealSection id="contact" className="contact-section">
          <SectionIntro
            index="06"
            label="CONTACT"
            title="Let’s connect."
          />

          <div className="section-body">
            <ContactSection />
          </div>
        </ScrollRevealSection>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div>
          <span className="footer-brand">
            nayan<span>.</span>
          </span>
          <span className="footer-copy">
            Web development · Security research · 2026
          </span>
        </div>

        <div className="footer-links-group">
          <a
            href="https://github.com/valentine0110"
            target="_blank"
            rel="noreferrer"
            className="ig-link"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.instagram.com/_nayan._.moni"
            target="_blank"
            rel="noreferrer"
            className="ig-link"
          >
            Instagram ↗
          </a>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <button
        className="back-top"
        onClick={() => scrollTo('home')}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}

function SectionIntro({ index, label, title }) {
  return (
    <div className="section-intro">
      <div className="intro-meta">
        <span>{index}</span>
        <span>// {label}</span>
      </div>
      <h2>{title}</h2>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
