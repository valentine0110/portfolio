import React, { useState } from 'react';
import TiltCard from './TiltCard';

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend & Web',
    icon: '⚡',
    desc: 'Building responsive, modern user interfaces with React, Vite, and modern CSS.',
    items: [
      { name: 'React', desc: 'Component architecture, hooks, state management' },
      { name: 'Vite', desc: 'Fast bundling, development workflow, modern tooling' },
      { name: 'Three.js & WebGL', desc: '3D interactive scenes, procedural meshes, lighting' },
      { name: 'Modern CSS', desc: 'Flexbox, Grid, 3D transforms, responsive layouts' },
      { name: 'JavaScript', desc: 'ES6+, DOM APIs, async operations' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Database',
    icon: '🗄️',
    desc: 'Setting up databases, authentication, and content management workflows.',
    items: [
      { name: 'Supabase', desc: 'BaaS, storage buckets, database management' },
      { name: 'PostgreSQL', desc: 'Relational data modeling, queries, security rules' },
      { name: 'Supabase Auth', desc: 'User login, roles, access controls for CMS' },
      { name: 'Python', desc: 'Scripting, automation, experimental tools' },
    ],
  },
  {
    id: 'security',
    title: 'Security Research',
    icon: '🛡️',
    desc: 'Exploring web security, identifying exposed infrastructure, and reporting findings.',
    items: [
      { name: 'Passive Reconnaissance', desc: 'Identifying exposed configs and publicly open assets' },
      { name: 'Responsible Disclosure', desc: 'Documenting findings and reporting through CERT-In' },
      { name: 'Config Auditing', desc: 'Checking staging leaks, exposed buckets, and endpoint headers' },
      { name: 'Tool Building', desc: 'Writing lightweight Python scripts to test ideas' },
    ],
  },
  {
    id: 'workflow',
    title: 'Tools & Workflow',
    icon: '💻',
    desc: 'Day-to-day developer tooling and efficiency.',
    items: [
      { name: 'Git & GitHub', desc: 'Version control, repositories, collaboration' },
      { name: 'Linux / Bash', desc: 'Command line, shell scripts, environment setup' },
      { name: 'AI-Assisted Dev', desc: 'Using AI tools alongside development to build and learn faster' },
      { name: 'Prototyping', desc: 'Turning concepts into working web products' },
    ],
  },
];

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState('frontend');
  const activeCategory = skillCategories.find((c) => c.id === activeTab) || skillCategories[0];

  return (
    <div className="skills-matrix-wrapper">
      <div className="skills-tabs-row">
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            className={`skills-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            <span className="tab-icon">{cat.icon}</span>
            <span className="tab-text">{cat.title}</span>
          </button>
        ))}
      </div>

      <TiltCard className="skills-display-card" maxTilt={6} perspective={1200}>
        <div className="skills-card-header">
          <div className="cat-badge">
            <span className="cat-badge-dot" />
            <span>{activeCategory.title}</span>
          </div>
          <p className="cat-desc">{activeCategory.desc}</p>
        </div>

        <div className="skills-items-grid">
          {activeCategory.items.map((skill) => (
            <div key={skill.name} className="skill-meter-card">
              <div className="meter-head">
                <span className="skill-name">{skill.name}</span>
              </div>
              <p className="skill-sub-desc">{skill.desc}</p>
            </div>
          ))}
        </div>
      </TiltCard>
    </div>
  );
}
