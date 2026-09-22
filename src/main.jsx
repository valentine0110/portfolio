import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const GITHUB = 'https://github.com/valentine0110';
const INSTAGRAM = 'https://www.instagram.com/_nayan._.moni';
const EMAIL = 'nayanmoni010101@gmail.com';

const projects = [
  {
    number: '01',
    type: 'WEB APP',
    title: 'Real Estate Website',
    description: 'A full real estate site with a custom CMS. Not sharing the source — it took forever and AI alone couldn\'t save me. Screenshots on GitHub.',
    tags: ['React', 'Vite', 'Supabase', 'CSS'],
    href: GITHUB,
  },
  {
    number: '02',
    type: 'SECURITY TOOL',
    title: 'WPLogPose',
    description: 'A cheap, home-brewed WPScan clone built with me + AI. Does it actually work? Honestly, not sure. Pushed it anyway.',
    tags: ['Python', 'Security', 'AI', 'Automation'],
    href: 'https://github.com/valentine0110/WP_Log_Pose',
  },
  {
    number: '03',
    type: 'THIS SITE',
    title: 'Valentine Portfolio',
    description: 'The site you\'re on right now. Made it because everyone has one, and because I need clients. Powered by React and mild desperation.',
    tags: ['React', 'Vite', 'CSS', 'AI'],
    href: GITHUB,
  },
];

const focus = [
  { icon: '01', title: 'AI-Assisted Development', text: 'Using modern AI tools to write code faster so I have more free time.' },
  { icon: '02', title: 'Efficient Workflows', text: 'Why spend hours debugging when I can just ask an AI to fix it in seconds?' },
  { icon: '03', title: 'Code Curation', text: 'Expertly finding, copying, and adapting the best solutions from the internet.' },
  { icon: '04', title: 'Experimental Projects', text: 'I still like building random, slightly stupid stuff just for the fun of it.' },
];

const securityCases = [
  {
    status: 'REGISTERED',
    date: 'JUL 2026',
    title: 'Government-affiliated ticketing platforms',
    summary: 'Responsible disclosure concerning publicly accessible production configuration across multiple ticketing platforms.',
    points: ['Passive reconnaissance + minimal verification', 'Production payment / webhook / scanner configuration exposure', 'CERT-In registered five related incident references'],
    refs: ['CERTIn-16447826', 'CERTIn-99592326', 'CERTIn-16635226', 'CERTIn-55864126', 'CERTIn-03101526'],
  },
  {
    status: 'REGISTERED',
    date: 'JUL 2026',
    title: 'APSRTC public-facing infrastructure',
    summary: 'Second responsible disclosure covering multiple security findings across publicly reachable transport infrastructure.',
    points: ['Exposed cloud storage and backend API surfaces', 'Credential / token exposure and unrestricted registration findings', 'CERT-In registered the incident under CERTIn-72247126'],
    refs: ['CERTIn-72247126'],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [query, setQuery] = useState('');
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const sections = [...document.querySelectorAll('section[id]')];
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(current.target.id);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0.05, 0.2, 0.4, 0.7] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const move = (event) => setSpotlight({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  const filteredProjects = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return projects;
    return projects.filter(project => `${project.title} ${project.type} ${project.tags.join(' ')}`.toLowerCase().includes(value));
  }, [query]);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app" style={{ '--mx': `${spotlight.x}px`, '--my': `${spotlight.y}px` }}>
      <div className="ambient" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />

      <header className="nav-shell">
        <div className="nav-inner">
          <button className="brand" onClick={() => go('home')}>
            <span className="brand-box"><img src="/pic.png" alt="Valentine" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></span>
            <span className="brand-text">valentine<span>.</span></span>
          </button>

          <nav className={`nav ${menuOpen ? 'is-open' : ''}`}>
            {['about', 'work', 'security', 'contact'].map(item => (
              <button key={item} onClick={() => go(item)} className={active === item ? 'active' : ''}>{item}</button>
            ))}
          </nav>

          <div className="nav-right">
            <a href={GITHUB} target="_blank" rel="noreferrer" className="github-pill">GitHub ↗</a>
            <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">{menuOpen ? '×' : '☰'}</button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero page-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="live-badge"><span className="pulse" /> PROFESSIONAL PROCRASTINATOR · LAZY + AI RELIANT</div>
              <div className="hero-kicker">HELLO, I'M <span>VALENTINE</span></div>
              <h1>Copy.<br /><span>Paste.</span><br />Deploy.</h1>
              <p className="hero-lead">I do stupid stuff for fun, rely entirely on AI to write my code, and have absolutely zero real skills to show off.</p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => go('work')}>View AI's work <span>↗</span></button>
                <button className="btn btn-secondary" onClick={() => go('security')}>Genuine research <span>↓</span></button>
              </div>
              <div className="micro-stats">
                <div><strong>00</strong><span>actual skills</span></div>
                <div><strong>99</strong><span>AI prompts today</span></div>
                <div><strong>∞</strong><span>hours on Netflix</span></div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="terminal-card">
                <div className="terminal-head"><span className="dots"><i /><i /><i /></span><span>valentine@couch</span><span>01</span></div>
                <div className="terminal-body">
                  <div className="line"><b>$</b> whoami</div>
                  <div className="value">lazy_guy<span>_</span>ai_reliant<span>_</span>no_skills</div>
                  <div className="line"><b>$</b> cat focus.txt</div>
                  <div className="value dim">sleeping<br />watching anime<br />avoiding work</div>
                  <div className="line"><b>$</b> status --now</div>
                  <div className="value accent-line">DOING ABSOLUTELY NOTHING</div>
                  <div className="cursor-line"><span>▋</span></div>
                </div>
              </div>
              <div className="code-card"><span>const</span> lazy = <b>true</b>;<br /><span>while</span>(lazy) promptAI();</div>
            </div>
          </div>
          <button className="scroll-cue" onClick={() => go('about')}>SCROLL TO EXPLORE <span>↓</span></button>
        </section>

        <section id="about" className="page-section compact-section">
          <SectionIntro index="01" label="ABOUT" title="A lazy guy, a prompt engineer, a master of none." />
          <div className="about-layout">
            <div className="about-copy">
              <p className="big-copy">I’m Nayan Moni . online I go by <em>Valentine</em>. I’m supposedly a computer science student, but mostly I just sit around doing stupid stuff for fun.</p>
              <p>I have basically zero skills to show off. I don't really want to work hard; I just want to copy-paste code from AI until it magically works without errors.</p>
              <p className="muted-copy">The goal is simple: avoid hard work at all costs, pretend I know what I'm doing, and try to make a lot of money.</p>
              <div className="signature-line"><span>VALENTINE / NAYAN MONI</span><span>INDIA · 2026</span></div>
            </div>
            <div className="profile-panel">
              <div className="panel-top"><span>PROFILE.SYS</span><span>OFFLINE</span></div>
              <div className="profile-avatar"><img src="/pic.png" alt="Valentine" /></div>
              <h3>Valentine</h3>
              <p>Professional Procrastinator</p>
              <div className="profile-row"><span>primary</span><b>Sleeping</b></div>
              <div className="profile-row"><span>secondary</span><b>Writing Prompts</b></div>
              <div className="profile-row"><span>learning</span><b>Nothing, actually</b></div>
            </div>
          </div>
        </section>

        <section className="page-section focus-section">
          <SectionIntro index="02" label="CURRENT FOCUS" title="Stuff I pretend to care about." />
          <div className="focus-grid">
            {focus.map(item => <article className="focus-card" key={item.title}><div className="focus-number">{item.icon}</div><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="card-arrow">↗</span></article>)}
          </div>
        </section>

        <section id="work" className="page-section work-section">
          <div className="section-heading-row">
            <SectionIntro index="03" label="SELECTED WORK" title="Stupid stuff I made for fun." />
            <div className="project-search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="filter projects" /></div>
          </div>
          <div className="projects-list">
            {filteredProjects.map(project => (
              <article className="project-row" key={project.title}>
                <div className="project-number">{project.number}</div>
                <div className="project-main"><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
                <a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><span>OPEN</span> ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section id="security" className="page-section security-section">
          <div className="security-head">
            <SectionIntro index="04" label="SECURITY RESEARCH" title="Okay fine, this part is genuine." />
            <p className="security-note">Sanitised public-facing summaries. I might be lazy, but I actually did these responsible disclosures.</p>
          </div>
          <div className="research-grid">
            {securityCases.map((item, idx) => (
              <article className="research-card" key={item.title}>
                <div className="research-top"><span className="case-num">0{idx + 1}</span><span className="registered">● {item.status}</span><span>{item.date}</span></div>
                <h3>{item.title}</h3>
                <p className="research-summary">{item.summary}</p>
                <div className="research-points">{item.points.map(point => <div key={point}><span>+</span>{point}</div>)}</div>
                <div className="ref-row"><span>CERT-In references</span><div>{item.refs.map(ref => <b key={ref}>{ref}</b>)}</div></div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="page-section contact-section">
          <div className="contact-panel">
            <div className="contact-stamp">OPEN TO FREELANCE WORK (SERIOUSLY)</div>
            <h2>Have a website to build?<br /><span>Please give me some work, I'm broke.</span></h2>
            <p>I might get a bit lazy when working on my own stuff, but I’m a good freelancer with bills to pay! Send me a message if you need something built I promise to do a great job (with a little help from AI).</p>
            <div className="contact-actions">
              <a className="btn btn-primary" href={`mailto:${EMAIL}`}>Email me ↗</a>
              <a className="btn btn-secondary" href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div><span className="footer-brand">valentine<span>.</span></span><span className="footer-copy">Generated by AI · 2026</span></div>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="ig-link">Instagram ↗</a>
      </footer>

      <button className="back-top" onClick={() => go('home')} aria-label="Back to top">↑</button>
    </div>
  );
}

function SectionIntro({ index, label, title }) {
  return <div className="section-intro"><div className="intro-meta"><span>{index}</span><span>{label}</span></div><h2>{title}</h2></div>;
}

createRoot(document.getElementById('root')).render(<App />);
