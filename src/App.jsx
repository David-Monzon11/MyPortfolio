import React, { useRef, useState } from 'react';
import { Mail, Download, MapPin, MessageSquare, Settings, Activity, Lock, CheckCircle, Server, Smartphone, Map, Heart, ArrowRight, Eye, Cloud, X } from 'lucide-react';
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
import CertificateModal from './components/CertificateModal';


/* ── DATA ─────────────────────────────────────── */

const EXPERIENCE = [
  {
    id: 1,
    icon: <Server size={18} />,
    title: 'Entry Level Software Engineer',
    subtitle: 'NOLA WEB SOLUTION · Feb 2026 – Present',
  },
  {
    id: 2,
    icon: <Cloud size={18} />,
    title: 'Full-Stack Developer & UI/UX Designer',
    subtitle: 'VoiceUp · 2025 – 2026',
  },
  {
    id: 3,
    icon: <Activity size={18} />,
    title: 'QA & Technical Documentation Support',
    subtitle: 'IoT-Based Fish Health Monitoring System (SafeHito) · 2024 – 2025'
  }
];

const TECH_GROUPS = [
  {
    heading: 'Frontend',
    tags: ['React', 'TypeScript', 'HTML5', 'CSS3', 'Figma', 'Bootsrap'],
  },
  {
    heading: 'Backend & Integration',
    tags: ['Java', 'C# Basics', 'C++', 'PHP / Laravel', 'Node.js', 'Python', 'JWT Auth', 'RESTful APIs', 'GoHighLevel', 'OAuth 2.0', 'Secure iframe', 'Webhooks', 'Semaphore SMS API', 'VPS Hosting'],
  },
  {
    heading: 'Cloud & Infrastructure',
    tags: ['Google Cloud Platform', 'Docker', 'Cloud Run', 'Firebase'],
  },
  {
    heading: 'Database & Tools',
    tags: ['MySQL', 'Git', 'GitHub', 'Postman', 'Vite', 'Firestore'],
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
    desc: 'NOLA SMS Pro is a full-stack SaaS integration platform that extends GoHighLevel (GHL) with custom SMS capabilities, enabling agencies to send one-way SMS notifications through hybrid cloud APIs for improved delivery control, reliability, and scalability.',
    tags: ['GoHighlevel', 'OAuth', 'IFrame', 'Webhooks', 'SemaphoreMS', 'Firebase (Firestore)', 'PHP', 'GCP', 'Raete Limit', 'Semaphore'],
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

const CERTIFICATES = [
  {
    id: 'intern-cert',
    src: 'internship.jpg',
    title: 'INTERNSHIP — NOLA WEB SOLUTION'
  },
  {
    id: 'cert1-cert',
    src: 'cert1.jpg',
    title: 'Certificate of Achievement'
  }
];

const GALLERY_IMAGES = [
  {
    id: 'Image 1',
    src: 'd8f99616-c916-4582-8cdd-38785dc4f67c.jpg',
  },
  {
    id: 'Image 2',
    src: '9ea80dac-af41-4b5a-b41d-d98b981cb924.jpg',
  },
  {
    id: 'Image 3',
    src: '63c64aa1-7a85-4294-a860-ed9d95c0ccf6.jpg',
  },
  {
    id: 'Image 4',
    src: '54433ad5-ff3a-4905-923c-4c887c89ef53.jpg',
  },
  {
    id: 'Image 5',
    src: '581339b8-443f-40e5-b3a2-77840b4fc29f.jpg',
  },
  {
    id: 'Image 6',
    src: '296194eb-3fcb-44d0-b44c-36596004dd6f.jpg',
  },
  {
    id: 'Image 7',
    src: 'd389da61-c8cc-4c72-a5c2-fd702a38b72b.jpg',
  },
   {
    id: 'Image 8',
    src: 'f2b215c3-8be3-49f8-b932-44300f374b2b.jpg',
  },
   {
    id: 'Image 9',
    src: 'd7017783-8379-4dba-8172-1b0fe8d7e8ca.jpg',
  },
];


/* ── COMPONENT ────────────────────────────────── */

function AppInner() {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isNolaModalOpen, setIsNolaModalOpen] = useState(false);
  const [isSafeHitoModalOpen, setIsSafeHitoModalOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState(null);

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
          <p className="hero__role">Entry Level Software Engineer</p>
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
              href="/DAVID_MONZON.pdf"
              download="DAVID_MONZON.pdf"
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
                  I am a Entry Level Software Engineer focused on building backend systems and integrating APIs that help applications work smoothly and reliably. 
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

            {/* GALLERY */}
            <section className="section" id="gallery">
              <RackCard unit="U7" label="GALLERY" index="07" delay={0.15}>
                <ChannelLabel label="GALLERY" index="07" />
                <div className="rack-divider" />
                <div className="gallery-scroll">
                  {GALLERY_IMAGES.map((img) => (
                    <img
                      key={img.id}
                      src={img.src}
                      alt={img.title}
                      className="gallery-item"
                      onClick={() => setActiveGalleryImage(img)}
                    />
                  ))}
                </div>
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
                  {CERTIFICATES.map((cert) => (
                    <img
                      key={cert.id}
                      src={cert.src}
                      alt={cert.title}
                      className="cert-item"
                      onClick={() => setActiveCert(cert)}
                    />
                  ))}
                </div>
              </RackCard>
            </section>

            {/* EXPERIENCE CAROUSEL */}
            <section className="section" id="experience">
              <RackCard unit="U4" label="EXPERIENCE" index="04" delay={0.15} className="rack-card--flush">
                <Carousel
                  items={EXPERIENCE}
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
        {activeCert && (
          <CertificateModal
            src={activeCert.src}
            alt={activeCert.title}
            onClose={() => setActiveCert(null)}
          />
        )}
        {activeGalleryImage && (
          <CertificateModal
            src={activeGalleryImage.src}
            alt={activeGalleryImage.title}
            onClose={() => setActiveGalleryImage(null)}
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
