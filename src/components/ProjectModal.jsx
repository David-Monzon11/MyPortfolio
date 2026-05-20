import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import SignalTag from './SignalTag';
import './ProjectModal.css';

const MODAL_DATA = {
  nola: {
    logo: 'https://app.nolasmspro.com/favicon.png',
    title: 'NOLA SMS Pro',
    subtitle: 'Full-Stack Web Development • API Integrations • Cloud Infrastructure',
    summaryParagraphs: [
      'NOLA SMS Pro is a full-stack SaaS integration platform that extends GoHighLevel (GHL) with custom SMS capabilities, enabling agencies to route messages through hybrid cloud APIs and private hardware SIM gateways for improved delivery control and scalability.',
      'Built specifically to overcome regional messaging limitations, the platform allows agencies to leverage high-performance cloud SMS gateways alongside physical SIM modules configured on-premise. This hybrid approach bridges modern cloud-based automated CRM workflows with low-latency physical telephony systems, keeping communication costs highly optimized and deliverability robust.'
    ],
    architectureHighlights: [
      {
        title: 'GHL SSO Integration',
        items: [
          'OAuth 2.0 multi-tenant authentication system',
          'Auto-provisioning token + location mapping',
          'React-based secure iframe Agency Panel',
          'Workflow webhook triggers inside GoHighLevel automation builder'
        ]
      },
      {
        title: 'Hybrid Messaging',
        items: [
          'Dual routing system (Semaphore + hardware SIM gateways)',
          'Async delivery tracking via Google Cloud Scheduler',
          'Real-time message sync back to GoHighLevel conversations'
        ]
      },
      {
        title: 'Scalable Infrastructure',
        items: [
          'Dockerized services deployed via Google Cloud Run',
          'Firestore-secured backend with JWT authentication',
          'Webhook signature validation for security',
          'Credit ledger + rate limiting per agency account'
        ]
      }
    ],
    techStack: [
      {
        heading: 'Frontend',
        tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Context API']
      },
      {
        heading: 'Backend',
        tags: ['Laravel 11', 'PHP 8.2', 'Composer', 'Guzzle HTTP']
      },
      {
        heading: 'Infrastructure',
        tags: ['Firestore', 'Cloud Run', 'Cloud Build', 'Cloud Scheduler', 'Artifact Registry', 'Docker', 'Vercel']
      },
      {
        heading: 'Integrations',
        tags: ['GoHighLevel v2', 'Semaphore API', 'Hardware API']
      }
    ]
  },
  safehito: {
    logo: 'CapsLogo.png',
    title: 'SafeHito',
    subtitle: 'IoT System Design • Artificial Intelligence • Aquaculture Health Monitoring',
    summaryParagraphs: [
      'SafeHito is an advanced cyber-physical system designed to automate water quality monitoring and detect fungal infections (such as Saprolegnia or other aquatic pathogens) in African Catfish (Clarias gariepinus) rearing environments.',
      'By integrating real-time telemetry from an on-premise analog sensor array with an edge-deployed computer vision model, the platform provides automated toxicity alerts and diagnostic reports. This enables fish farm operators to proactively mitigate disease outbreaks, reduce overall mortality rates, and optimize stock management.'
    ],
    architectureHighlights: [
      {
        title: 'IoT Edge & Telemetry',
        items: [
          'Multi-sensor array tracking pH, Temperature, Turbidity, and Dissolved Oxygen (DO)',
          'ESP32 microcontroller driving continuous ADC sensor calibration and low-power telemetry',
          'Robust MQTT data transmission pipeline with offline sensor data logging buffers'
        ]
      },
      {
        title: 'AI Computer Vision',
        items: [
          'Convolutional Neural Network (CNN) trained on high-resolution aquatic pathogen datasets',
          'Real-time edge video stream analysis with confidence threshold filtering',
          'Dynamic infection severity indexing and automated localized treatment output'
        ]
      },
      {
        title: 'Alert & Sync Infrastructure',
        items: [
          'Multi-channel warning pipeline pushing real-time SMS and Firebase Cloud Alerts',
          'Cross-platform mobile dashboard (compiled APK) displaying live health feeds and historic charts',
          'Secure Firebase backend providing real-time data synchronization and diagnostics history'
        ]
      }
    ],
    techStack: [
      {
        heading: 'Edge Hardware',
        tags: ['ESP32 MCU', 'RPi Camera', 'Analog pH Probe', 'DS18B20 Temp', 'Turbidity Sensor', 'DO Sensor']
      },
      {
        heading: 'AI & Analytics',
        tags: ['TensorFlow Lite', 'OpenCV', 'Python (PyTorch)', 'NumPy', 'Pandas']
      },
      {
        heading: 'Software Stack',
        tags: ['React Native', 'Android SDK', 'Firebase Firestore', 'Cloud Functions', 'Node.js', 'MQTT Broker']
      },
      {
        heading: 'Tools & Protocols',
        tags: ['Git', 'Docker', 'Postman', 'C++ / PlatformIO', 'Vercel']
      }
    ]
  }
};

export default function ProjectModal({ type = 'nola', onClose }) {
  const data = MODAL_DATA[type] || MODAL_DATA.nola;

  // Lock body scroll on mount and unlock on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClose}
    >
      <motion.div
        className="modal-container"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Subtle diagonal stripe aesthetic */}
        <div className="modal-stripe" aria-hidden="true" />

        {/* Sticky Header */}
        <header className="modal-header">
          <div className="modal-header-content">
            <img src={data.logo} alt={data.title} className="modal-logo" />
            <div className="modal-title-block">
              <h2 className="modal-title" id="modal-title">{data.title}</h2>
              <span className="modal-subtitle">{data.subtitle}</span>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </header>

        {/* Scrollable Body */}
        <div className="modal-body">
          
          {/* Section 1: Project Summary */}
          <section className="modal-section">
            <div className="modal-section-title-wrapper">
              <h3 className="modal-section-title">01 · Project Summary</h3>
              <div className="modal-section-line" />
            </div>
            {data.summaryParagraphs.map((para, i) => (
              <p key={i} className="modal-summary-text" style={i > 0 ? { marginTop: '-8px' } : {}}>
                {para}
              </p>
            ))}
          </section>

          {/* Section 2: Core Architecture & Engineering Highlights */}
          <section className="modal-section">
            <div className="modal-section-title-wrapper">
              <h3 className="modal-section-title">02 · Core Architecture &amp; Engineering</h3>
              <div className="modal-section-line" />
            </div>
            <div className="architecture-grid">
              {data.architectureHighlights.map((highlight, index) => (
                <div key={index} className="architecture-card">
                  <h4 className="architecture-card-title">{highlight.title}</h4>
                  <ul className="architecture-list">
                    {highlight.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="architecture-item">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Detailed Tech Stack */}
          <section className="modal-section">
            <div className="modal-section-title-wrapper">
              <h3 className="modal-section-title">03 · Technical Specifications</h3>
              <div className="modal-section-line" />
            </div>
            <div className="tech-stack-grid">
              {data.techStack.map((group, groupIdx) => (
                <div key={groupIdx} className="tech-group-card">
                  <h4 className="tech-group-title">{group.heading}</h4>
                  <div className="tech-tags-list">
                    {group.tags.map((tag) => (
                      <SignalTag key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </motion.div>
    </motion.div>
  );
}
