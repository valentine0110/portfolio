import React, { useState, useMemo } from 'react';
import TiltCard from './TiltCard';

export const projectsData = [
  {
    id: 'real-estate',
    number: '01',
    category: 'Web App',
    type: 'WEB APPLICATION',
    title: 'Real Estate Website',
    shortDesc:
      'A modern real estate platform built with React, Vite and Supabase, featuring a custom CMS for managing property listings and website content.',
    architecture:
      'Built with a React and Vite frontend integrated with a Supabase PostgreSQL backend. Includes authentication and database schema for managing property details, pricing, and images.',
    features: [
      'Custom CMS to create, edit, and delete property listings',
      'Supabase database and media storage',
      'Responsive listing catalog with search and filters',
      'Property inquiry form for interested buyers',
    ],
    tags: ['React', 'Vite', 'Supabase', 'CSS'],
    github: 'https://github.com/valentine0110/haven-website',
    demo: 'https://haven-website-991.pages.dev',
  },
  {
    id: 'wplogpose',
    number: '02',
    category: 'Security Tool',
    type: 'SECURITY TOOL',
    title: 'WPLogPose',
    shortDesc:
      'A cheap, home-brewed WPScan clone built in python. Does it actually work? Honestly, not sure. Pushed it anyway.',
    architecture:
      'A lightweight Python script created to test and automate basic reconnaissance against WordPress targets, checking common endpoints and plugin directories.',
    features: [
      'Automated inspection of common WordPress paths',
      'Basic plugin and version detection checks',
      'Simple command-line interface with formatted output',
      'Exploration tool written for learning cybersecurity tooling',
    ],
    tags: ['Python', 'Security', 'Automation'],
    github: 'https://github.com/valentine0110/WP_Log_Pose',
    demo: null,
  },
  {
    id: 'event-planner',
    number: '03',
    category: 'Web App',
    type: 'EVENT PLANNER SITE',
    title: 'Event Planner Website',
    shortDesc:
      'A website for an event and wedding planning business, built with React, Vite, and Supabase. It also includes a custom CMS to manage the website content and events.',
    architecture:
      'Client project built with React, Vite, and Supabase for backend database and authentication. Allows the business owner to update events and gallery images.',
    features: [
      'Custom CMS for managing upcoming events and showcases',
      'Supabase Authentication for admin access',
      'Responsive design and image galleries',
      'Contact and booking inquiry section',
    ],
    tags: ['React', 'Vite', 'CSS', 'Supabase', 'Supabase Auth'],
    github: 'https://github.com/valentine0110/eventplanner-site/',
    demo: 'https://event-site-e5c.pages.dev/',
  },
  {
    id: 'portfolio-site',
    number: '04',
    category: 'This Site',
    type: 'THIS SITE',
    title: 'Personal Portfolio',
    shortDesc:
      "The site you're on right now. Built with React and Three.js to showcase web development projects, practical tooling, and security research.",
    architecture:
      'Built with React 18, Vite 5, and Three.js WebGL. Features an interactive Earth model enclosed in a geometric barrier, smooth perspective tilt cards, and genuine CERT-In responsible disclosure notes.',
    features: [
      'Interactive Earth model with rotatable defense barrier',
      'Responsive dark interface with perspective tilt',
      'Documented responsible disclosures to CERT-In',
      'Fast client-side build with zero bloat',
    ],
    tags: ['React', 'Vite', 'Three.js', 'CSS', 'JavaScript'],
    github: 'https://github.com/valentine0110',
    demo: '#home',
  },
];

export default function ProjectsShowcase() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web App', 'Security Tool', 'This Site'];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchCategory = activeTab === 'All' || p.category === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.type.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="projects-showcase-container">
      {/* Filter and Search Bar */}
      <div className="projects-controls-bar">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="project-search-box">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="filter projects"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid with 3D Tilt Cards */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <TiltCard
            key={project.id}
            className="project-tilt-card"
            maxTilt={8}
            perspective={1000}
          >
            <div className="card-top-bar">
              <span className="card-number">{project.number}</span>
              <span className="card-type-tag">{project.type}</span>
            </div>

            <div className="card-body-content">
              <h3 className="card-project-title">{project.title}</h3>
              <p className="card-project-desc">{project.shortDesc}</p>

              <div className="card-tags-cloud">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-action-bar">
              <button
                className="btn-inspect-dossier"
                onClick={() => setSelectedProject(project)}
              >
                <span>Details</span>
                <span className="btn-icon">→</span>
              </button>

              <div className="card-ext-links">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="card-ext-btn demo-btn"
                    title="Open Live Deployment"
                  >
                    Demo ↗
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="card-ext-btn git-btn"
                  title="Open GitHub Repository"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </TiltCard>
        ))}

        {filteredProjects.length === 0 && (
          <div className="no-projects-found">
            <p>No projects match your current search.</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setActiveTab('All');
                setSearchQuery('');
              }}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div
            className="modal-container dossier-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <div className="modal-header-meta">
                <span className="dossier-id">PROJECT // {selectedProject.number}</span>
                <span className="dossier-cat">{selectedProject.type}</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="modal-scroll-body">
              <h2>{selectedProject.title}</h2>
              <p className="dossier-lead">{selectedProject.shortDesc}</p>

              <div className="dossier-section">
                <h4>Overview & Stack</h4>
                <p>{selectedProject.architecture}</p>
              </div>

              <div className="dossier-section">
                <h4>What It Does</h4>
                <ul className="dossier-feature-list">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx}>
                      <span className="feat-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dossier-section">
                <h4>Tags</h4>
                <div className="card-tags-cloud">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="tech-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-actions-row">
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Live Demo ↗
                  </a>
                )}
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
