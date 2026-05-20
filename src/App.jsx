import React, { useRef, useState } from 'react';
import { Mail, Download, MapPin, MessageSquare, Settings, Activity, Lock, CheckCircle, Server, Smartphone, Map, Heart, ArrowRight, Eye } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import SpineSocials from './components/SpineSocials';
import RackCard from './components/RackCard';
import ChannelLabel from './components/ChannelLabel';
import SignalTag from './components/SignalTag';
import SpotlightCard from './components/SpotlightCard';
import Carousel from './components/Carousel';
import ProjectModal from './components/ProjectModal';
import BeatBot from './components/BeatBot';


/* ── DATA ─────────────────────────────────────── */

const EXPERIENCES = [
  {
    id: 1,
    icon: <MessageSquare size={18} />,
    title: 'GHL Marketplace App',
    subtitle: 'NOLA SMS Pro · Intern 2026',
    description: 'Engineered a full GHL Marketplace App from scratch: Agency OAuth SSO, custom iframe Agency Panel, webhook-driven SMS delivery connected to Semaphore.',
  },
  {
    id: 2,
    icon: <Settings size={18} />,
    title: 'Laundroworks Automation',
    subtitle: 'Suds Mgt · Intern 2026',
    description: 'Architected custom PHP middleware to bridge Suds Mgt POS with GHL, automating contact tagging via secure webhooks.',
  },
  {
    id: 3,
    icon: <Activity size={18} />,
    title: 'SaaS & CRM Integration',
    subtitle: '2026',
    description: 'Optimizing high-volume data synchronization between GoHighLevel and custom middleware engines.',
  },
  {
    id: 4,
    icon: <Lock size={18} />,
    title: 'Secure API Auth',
    subtitle: 'JWT · 2026',
    description: 'Engineering robust security layers and JWT-based access control for multi-tenant Agency dashboard integrations.',
  },
  {
    id: 5,
    icon: <CheckCircle size={18} />,
    title: 'Deliverability Tracking',
    subtitle: '2026',
    description: 'Implementing advanced PHP status-sync services and logging frameworks to monitor real-time SMS delivery performance.',
  },
  {
    id: 6,
    icon: <Server size={18} />,
    title: 'Middleware Engineering',
    subtitle: 'PHP · 2026',
    description: 'Architecting efficient RESTful processing engines for handling large-scale API payloads with reliable system uptime.',
  },
  {
    id: 7,
    icon: <Smartphone size={18} />,
    title: 'SMS Gateway Infra',
    subtitle: '2026',
    description: 'Connecting specialized hardware gateways and Semaphore integrations for automated low-latency messaging flows.',
  },
  {
    id: 8,
    icon: <Map size={18} />,
    title: 'iReportPH',
    subtitle: 'Citizen Reporting · 2025',
    description: 'A community-focused incident reporting platform built with Vanilla JS and Firebase for real-time tracking.',
  },
  {
    id: 9,
    icon: <Heart size={18} />,
    title: 'VitalTrack',
    subtitle: 'Health Platform · 2024',
    description: 'A modern React & Firebase health dashboard featuring real-time GPS tracking and dynamic health analytics via Recharts.',
  },
];

const TECH_GROUPS = [
  {
    heading: 'Frontend',
    tags: ['React', 'React Native', 'TypeScript', 'Recharts', 'Leaflet.js', 'Bootstrap 5'],
  },
  {
    heading: 'Backend & Integration',
    tags: ['Java', 'C#', 'C++', 'PHP', 'Node.js', 'Python', 'JWT Auth', 'RESTful APIs', 'GoHighLevel', 'OAuth 2.0', 'Secure iframe', 'Webhooks', 'Semaphore SMS', 'VPS Hosting', 'Hardware API'],
  },
  {
    heading: 'Cloud & Infrastructure',
    tags: ['Google Cloud', 'Docker', 'Cloud Build', 'Firebase'],
  },
  {
    heading: 'Database & Tools',
    tags: ['MySQL', 'Git', 'GitHub', 'Postman', 'Vite'],
  },
];

const PROJECTS = [
  {
    id: 'nola-app',
    unit: 'P1',
    badge: 'FEATURED',
    title: 'NOLA SMS Pro',
    url: 'app.nolasmspro.com',
    href: 'https://app.nolasmspro.com',
    logo: 'https://app.nolasmspro.com/favicon.png',
    desc: 'NOLA SMS Pro is a full-stack SaaS integration platform that extends GoHighLevel (GHL) with custom SMS capabilities, enabling agencies to route messages through hybrid cloud APIs and private hardware SIM gateways for improved delivery control and scalability.',
    tags: ['GHL MKT', 'OAUTH', 'IFRAME', 'WBHK', 'SMS', 'FBASE', 'PHP', 'GCP', 'SUB-ACCT', 'RATE LMT', 'HWAPI', 'SMPH'],
  }
];

const EDUCATION = [
  {
    id: 'psu',
    logo: 'Don_Honorio_Ventura_State_University_logo.png',
    school: 'PAMPANGA STATE UNIVERSITY',
    year: '2023 – PRESENT',
    detail: 'Bachelor of Science in Information Technology',
  },
  {
    id: 'hcc-cs',
    logo: 'hcc.gif',
    school: 'HOLY CROSS COLLEGE',
    year: '2022 – 2023',
    detail: 'Bachelor of Science in Computer Science · 2 Semesters completed',
  },
  {
    id: 'hcc-stem',
    logo: 'hcc.gif',
    school: 'HOLY CROSS COLLEGE',
    year: '2020 – 2022',
    detail: 'Senior High School — STEM Strand',
  },
];

/* ── COMPONENT ────────────────────────────────── */

function AppInner() {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isNolaModalOpen, setIsNolaModalOpen] = useState(false);
  const [isSafeHitoModalOpen, setIsSafeHitoModalOpen] = useState(false);

  const handleDotClick = (index) => {
    setActiveSlide(index);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: sliderRef.current.clientWidth * index, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const index = Math.round(sliderRef.current.scrollLeft / sliderRef.current.clientWidth);
      setActiveSlide(index);
    }
  };

  return (
    <div className="site-wrapper">
      {/* Spine social sidebar */}
      <SpineSocials />

      {/* Sticky header */}
      <header className="site-header">
        <div className="site-header__inner">
          <span className="site-header__masthead">D A V I D · M O N Z O N</span>
          <div className="site-header__right">
            <nav className="site-header__nav" aria-label="Primary navigation">
              <a href="#about">ABOUT</a>
              <a href="#projects">PROJECTS</a>
              <a href="#stack">STACK</a>
              <a href="#education">EDU</a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="page-content">

        {/* ── HERO ────────────────────────────── */}
        <section className="hero" aria-label="Introduction">
          <p className="hero__role">Junior Software Engineer</p>
          <h1 className="hero__name">D A V I D&nbsp;&nbsp;D.&nbsp;&nbsp;M O N Z O N</h1>
          <div className="hero__meta">
            <span className="hero__location">
              <MapPin size={14} />
              PAMPANGA, PH
            </span>
          </div>
          <div className="hero__actions">
            <button
              className="hero__btn hero__btn--primary"
              onClick={() => window.location.href = 'mailto:davidmonzon156@gmail.com'}
              id="btn-send-email"
            >
              <Mail size={14} />
              SEND EMAIL
            </button>
            <a
              href="/David_Monzon_CV.pdf"
              download="David_Monzon_CV.pdf"
              className="hero__btn"
              id="btn-download-cv"
            >
              <Download size={14} />
              DOWNLOAD CV
            </a>
          </div>
        </section>

        {/* ── MAIN GRID ──────────────────────── */}
        <div className="main-grid">

          {/* LEFT COLUMN */}
          <div className="main-grid__left">

            {/* ABOUT */}
            <section className="section" id="about">
              <RackCard unit="U1" label="ABOUT" index="01" delay={0}>
                <ChannelLabel label="ABOUT ME" index="01" />
                <div className="rack-divider" />
                <p className="about-text">
                  I am a Junior Software Engineer focused on building backend systems and integrating APIs that help applications work smoothly and reliably. 
                </p>
                <p className="about-text">
                  I like building software that connects systems, solves real problems, and works reliably in real environments.
                </p>
                <p className="about-text">
                  I have worked on real projects where I helped build system logic, connect services, and improve how data flows across applications. These experiences gave me a deeper understanding of how software works beyond the interface, especially on the backend side of systems.
                </p>
                <p className="about-text">
                  I am actively building and expanding my skills in system design and backend development as I continue my path toward becoming a software engineer, while contributing to real and meaningful projects.
                </p>
              </RackCard>
            </section>

            {/* TECH STACK */}
            <section className="section" id="stack">
              <RackCard unit="U2" label="STACK" index="02" delay={0.05}>
                <ChannelLabel label="STACK" index="02" />
                <div className="rack-divider" />
                {TECH_GROUPS.map((group) => (
                  <div className="tech-group" key={group.heading}>
                    <p className="tech-group__heading">{group.heading}</p>
                    <div className="tech-group__tags">
                      {group.tags.map((tag) => (
                        <SignalTag key={tag} label={tag} />
                      ))}
                    </div>
                  </div>
                ))}
              </RackCard>
            </section>

            {/* EDUCATION */}
            <section className="section" id="education">
              <RackCard unit="U3" label="EDUCATION" index="03" delay={0.1}>
                <ChannelLabel label="EDUCATION" index="03" />
                <div className="rack-divider" />
                {EDUCATION.map((edu, i) => (
                  <React.Fragment key={edu.id}>
                    <div className="edu-entry">
                      <div className="edu-entry__header">
                        <div className="edu-entry__school">
                          <img src={edu.logo} alt="" className="edu-entry__logo" aria-hidden="true" />
                          <span className="edu-entry__name">{edu.school}</span>
                        </div>
                        <span className="edu-entry__year">{edu.year}</span>
                      </div>
                      <p className="edu-entry__detail">{edu.detail}</p>
                    </div>
                    {i < EDUCATION.length - 1 && <div className="edu-divider" />}
                  </React.Fragment>
                ))}
              </RackCard>
            </section>

            {/* EXPERIENCE CAROUSEL */}
            <section className="section" id="experience">
              <RackCard unit="U4" label="EXPERIENCE" index="04" delay={0.15} className="rack-card--flush">
                <Carousel
                  items={EXPERIENCES}
                  channelLabel="EXPERIENCE"
                  channelIndex="EXP"
                  baseWidth={290}
                  autoplay={true}
                  loop={true}
                  pauseOnHover={true}
                  autoplayDelay={3500}
                />
              </RackCard>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="main-grid__right">

            {/* PROJECTS */}
            <section className="section" id="projects">
              <ChannelLabel label="PROJECTS" index="03" />
              {PROJECTS.map((project) => (
                <SpotlightCard key={project.id} unit={project.unit} className="project-card">
                  <div className="project-header">
                    <span className="project-badge">{project.badge}</span>
                    <div className="project-logo-row">
                      <img src={project.logo} alt={project.title} className="project-logo" />
                      <div>
                        <p className="project-title">{project.title}</p>
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-url"
                        >
                          {project.url}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="rack-divider-line" style={{ margin: '0 0 12px' }} />
                  <p className="project-desc">{project.desc}</p>
                  <button
                    className="project-details-btn"
                    onClick={() => {
                      if (project.id === 'nola-app') {
                        setIsNolaModalOpen(true);
                      }
                    }}
                  >
                    View Full Details
                    <ArrowRight size={14} />
                  </button>
                </SpotlightCard>
              ))}

            </section>
                {/* CAPSTONE */}
            <section className="section" id="capstone">
              <RackCard unit="U6" label="CAPSTONE" index="06" delay={0.15}>
                <ChannelLabel label="CAPSTONE" index="06" />
                <div className="rack-divider" />
                <p className="capstone-title">SafeHito</p>
                <p className="capstone-meta">IOT · AI-Based Fungal Detection &amp; Diagnosis System — African Catfish</p>
                <img src="CapsLogo.png" alt="SafeHito Capstone Project" className="capstone-img" />
                <div className="capstone-actions">
                  <button
                    className="capstone-btn capstone-btn--primary"
                    onClick={() => setIsSafeHitoModalOpen(true)}
                  >
                    <Eye size={14} />
                    VIEW DETAILS
                  </button>
                  <a
                    href="/SafeHito_Final_Paper.pdf"
                    download="SafeHito_Final_Paper.pdf"
                    className="capstone-btn"
                    id="btn-download-pdf"
                  >
                    <Download size={14} />
                    DOWNLOAD PDF
                  </a>
                </div>
              </RackCard>
            </section>


            {/* CERTIFICATIONS */}
            <section className="section" id="certifications">
              <RackCard unit="U5" label="CERTIFICATIONS" index="05" delay={0.1}>
                <ChannelLabel label="CERTIFICATIONS" index="CERT" />
                <div className="rack-divider" />
                <div
                  className="cert-scroll"
                  ref={sliderRef}
                  onScroll={handleScroll}
                  id="certSlider"
                >
                  {['cert1.jpg', 'cert1.jpg', 'cert1.jpg', 'cert1.jpg'].map((src, i) => (
                    <img key={i} src={src} alt={`Certificate ${i + 1}`} className="cert-item" />
                  ))}
                </div>
              </RackCard>
            </section>

          </div>
        </div>
      </main>

      {/* Dynamic Case Study Modals */}
      <AnimatePresence>
        {isNolaModalOpen && (
          <ProjectModal
            type="nola"
            onClose={() => setIsNolaModalOpen(false)}
          />
        )}
        {isSafeHitoModalOpen && (
          <ProjectModal
            type="safehito"
            onClose={() => setIsSafeHitoModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <BeatBot />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
