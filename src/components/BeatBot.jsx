import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Headphones, Send, X } from 'lucide-react';
import './BeatBot.css';

// Keyword matching dynamic response rules
const RESPONSES_CONFIG = [
  {
    keys: ["hello", "hi", "yo", "hey", "sup", "wassup", "greetings", "good morning", "good afternoon", "good evening", "welcome"],
    response: "Yo! 🎧 I'm David's Portfolio BeatBot—keeping the system groove alive. Tap a preset track below or drop a query, and let's mix it up! 🎚️"
  },
  {
    keys: ["how are you", "how's it going", "how is it going", "system status", "status check", "operational status", "status"],
    response: "System status: 100% operational! 🎛️ Frequency response is perfectly flat, and the dynamic range is wide open. How's your signal today? Let's cue up a track! 🎛️"
  },
  {
    keys: ["who is david", "who is he", "about david", "about me", "who are you", "tell me about yourself", "david monzon", "david", "monzon", "who", "about", "bio", "biography", "background"],
    response: "David Monzon is a Junior Software Engineer from Pampanga, PH! 🇵🇭 He behaves like a backend producer—arranging databases, tuning APIs, and making sure the system infrastructure has a fat, punchy response! 🎚️💻"
  },
  {
    keys: ["where are you from", "where do you live", "where are you located", "location", "address", "pampanga", "philippines", "ph"],
    response: "David is based in Pampanga, Philippines! 🇵🇭 He orchestrates systems, bridges APIs, and deploys cloud services from his local studio console."
  },
  {
    keys: ["tech stack", "skills", "technologies", "languages", "tools", "programming languages", "stack"],
    response: "David's tech stack is a certified banger! 🎹 React & TypeScript on lead vocals, Node & PHP & Laravel keeping the low-end groove steady, and Google Cloud holding down the production desk. A perfectly mixed track! 🎧"
  },
  {
    keys: ["react native", "react", "frontend", "bootstrap", "recharts", "leaflet", "ui", "ux", "interface", "styling", "design", "css"],
    response: "React, React Native, and Bootstrap 5 are David's main synthesizers on frontend! 🎹 They render dynamic signal interfaces with absolute responsiveness. He also uses Recharts for health analytics and Leaflet.js for interactive map widgets."
  },
  {
    keys: ["javascript", "typescript", "js", "ts"],
    response: "JavaScript & TypeScript run the main MIDI controllers! 🎶 They ensure every button tap and data payload triggers the perfect event handler in perfect key."
  },
  {
    keys: ["backend", "server", "middleware", "express", "apis", "api", "restful api", "restful apis", "restful", "rest api"],
    response: "Backend is David's favorite production desk! 🎚️ Mixing Java, PHP, C#, C++, Node.js, and Python to create low-latency RESTful APIs, secure middleware, and high-performance server channels."
  },
  {
    keys: ["jwt auth", "jwt", "token auth", "token", "secure api auth", "secure api", "security", "access control"],
    response: "David engineers robust security layers using JWT (JSON Web Tokens) for multi-tenant Agency dashboard integrations, keeping data channels encrypted and authentications secure. 🔒"
  },
  {
    keys: ["php", "custom php", "semaphore sms", "semaphore", "sms gateway", "hardware gateway", "sms delivery"],
    response: "PHP and custom middleware are David's reliable workhorses! 🐴 He used them for webhook-driven SMS delivery in NOLA and POS status-sync automation for Laundroworks. He also integrates hardware SMS gateways and Semaphore SMS APIs."
  },
  {
    keys: ["node.js", "nodejs", "node"],
    response: "Node.js is great for high-concurrency loops and fast API tracks. It keeps data packages flowing smoothly without skipping a single beat! ⚡🎧"
  },
  {
    keys: ["java", "python", "c#", "c++", "cpp"],
    response: "David has strong software development fundamentals in Java, Python, C#, and C++! 🎹 Whether compiling desktop applications or scripting automation workflows, he keeps the processing rhythm tight."
  },
  {
    keys: ["webhooks", "webhook", "gohighlevel oauth", "ghl oauth", "oauth 2.0", "oauth", "secure iframe", "iframe panel", "iframe"],
    response: "Webhooks are like instant trigger pads! 🟥 David builds custom integrations using GoHighLevel OAuth 2.0, secure iframes for agency dashboards, and webhooks to synchronize POS transactions with CRM workflows in real-time."
  },
  {
    keys: ["google cloud platform", "google cloud", "gcp", "docker", "cloud run", "cloud build", "vps hosting", "vps", "hosting"],
    response: "Cloud power: Google Cloud Platform (GCP), Docker containerization, Cloud Run, Cloud Build, and VPS hosting. He packages code into clean containers and deploys them to scale without clipping the master channel! ☁️🔊"
  },
  {
    keys: ["firebase", "real-time database", "realtime database", "firestore"],
    response: "Firebase is David's real-time synth database! 🔥 Perfect for instant synchronization, telemetry, and live data tracks like SafeHito and iReportPH."
  },
  {
    keys: ["mysql", "sql", "database design", "database schema", "relational database", "database", "databases"],
    response: "Data styling: MySQL, Firebase, and optimized relational schemas. Keep your records sorted and indexed so you can retrieve them at 128 BPM! 📀📁"
  },
  {
    keys: ["nola sms pro", "nola sms", "nola pro", "nola app", "nola", "ghl", "gohighlevel", "go high level"],
    response: "NOLA SMS Pro is a major hit single! 🚀 A full-stack SaaS integration platform extending GoHighLevel (GHL) with custom SMS capabilities, routing messages through hybrid cloud APIs and private hardware SIM gateways for improved delivery control and scalability."
  },
  {
    keys: ["safehito", "catfish", "fish", "fungal detection", "fungal", "iot edge", "iot sensors", "iot", "convolutional neural network", "cnn", "capstone project", "capstone"],
    response: "SafeHito is David's award-winning Capstone track! 🐟 IoT edge sensors tracking water variables (pH, Temp, DO) and a Convolutional Neural Network AI model to detect & diagnose catfish fungal infections. High-fidelity engineering! 🎻"
  },
  {
    keys: ["laundroworks automation", "laundroworks middleware", "laundroworks", "suds mgt", "suds", "pos integration"],
    response: "Laundroworks automation middleware! Suds Mgt POS connected to GHL using custom PHP automation webhooks. Automatically tags contacts and syncs checkout cycles in absolute tempo! 🧼🔄"
  },
  {
    keys: ["ireportph", "ireport", "incident reporting", "citizen reporting"],
    response: "iReportPH is a classic grassroots incident-reporting platform built in 2025. Vanilla JS and Firebase on the tracking console, letting citizens signal alerts in real time! 🏙️🚨"
  },
  {
    keys: ["vitaltrack", "health platform", "health monitoring", "health dashboard"],
    response: "VitalTrack is a 2024 health monitoring system. 🏃‍♂️ GPS integration, real-time vital telemetry, and interactive Recharts graphs. Smooth pacing for your health workouts!"
  },
  {
    keys: ["work experience", "experience", "internship", "intern", "job", "career", "role", "work", "projects", "project"],
    response: "David has worked on real industry integrations! 🎚️ As a 2026 Intern, he engineered the GHL Marketplace App (NOLA SMS Pro) and built PHP middleware for Laundroworks POS-to-GHL automation. He also specializes in SaaS integrations and API security."
  },
  {
    keys: ["pampanga state university", "don honorio ventura", "dhvsu", "holy cross college", "hcc", "education", "school", "college", "university", "degree", "study", "studies", "graduate", "graduated", "graduation"],
    response: "For his educational track, David is currently jamming through a BS in Information Technology at Pampanga State University (2023-Present) and spent 2 semesters in CS at Holy Cross College (2022-2023). Constant practice makes perfect harmony! 🎹"
  },
  {
    keys: ["how to hire", "how to contact", "hire david", "contact david", "hire", "contact", "email", "book", "mail", "recruit", "email address", "get in touch"],
    response: "Want to book David for your next dev gig? Drop a mail at davidmonzon156@gmail.com or hit the 'SEND EMAIL' button on the hero track. Let's make some noise! 🎤"
  },
  {
    keys: ["download cv", "download resume", "download paper", "download pdf", "cv pdf", "resume pdf", "cv", "resume", "pdf", "download"],
    response: "You can download David's professional CV directly using the button on the hero deck! Or grab his Capstone final paper PDF on the capstone card. Solid gold documentation! 📄🥇"
  },
  {
    keys: ["lo-fi", "lo fi", "synthwave", "music genre", "favorite music", "beat", "music", "song", "genre", "play", "dance", "sing", "instrument"],
    response: "My favorite genre is Lo-Fi Synthwave! 🌌 Floating pads, heavy sidechains, and 808 subs matching our dark system vibe. Drop a fat beat in your next dev project! 🥁"
  },
  {
    keys: ["tell me a joke", "tell a joke", "joke", "funny", "laugh", "humor"],
    response: "Why did the software engineer go to the nightclub? To check out the base (database) and catch the drop (packet drop)! 🥁 Badum-tss! 🎚️"
  },
  {
    keys: ["help", "commands", "options", "preset", "how do you work", "what can you do"],
    response: "I'm tuned to respond to standard developer track controls! 🎚️ Ask me about David's projects, tech stack, capstone, education, contact details, or drop a query like 'tell me a joke'!"
  }
];

const RESPONSES_DEFAULT = "I couldn't quite decode that signal! 📡 Try asking me about one of these preset tracks:\n\n• 🎹 Tech Stack — David's skills & tools\n• 🚀 NOLA Pro — GHL SMS Marketplace SaaS\n• 🐟 SafeHito — AI IoT Capstone project\n• 📧 Book Gig — Direct contact & hire details\n\nOr select one of the preset mix channels below! 🎚️";

export default function BeatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Yo! 🎧 I'm David's Portfolio BeatBot—keeping the system groove alive. Tap a preset track below or drop a query, and let's mix it up! 🎚️"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  // Reply matcher
  const handleReply = (userText) => {
    // Strip common punctuation to prevent strict match failure on trailing characters (e.g. "safehito?")
    const textClean = userText
      .toLowerCase()
      .replace(/[?!.,;:"']/g, "")
      .trim();

    let replyText = null;

    // Define core intent keywords and their target responses
    const INTENTS = [
      {
        name: "greeting",
        keys: ["hello", "hi", "yo", "hey", "sup", "wassup", "greetings", "good morning", "good afternoon", "good evening", "welcome"],
        response: "Yo! 🎧 I'm David's Portfolio BeatBot—keeping the system groove alive. Tap a preset track below or drop a query, and let's mix it up! 🎚️"
      },
      {
        name: "nola_pro",
        keys: ["nola sms pro", "nola sms", "nola pro", "nola app", "nola", "ghl", "gohighlevel", "go high level"],
        response: "NOLA SMS Pro is a major hit single! 🚀 A full-stack SaaS integration platform extending GoHighLevel (GHL) with custom SMS capabilities, routing messages through hybrid cloud APIs and private hardware SIM gateways for improved delivery control and scalability."
      },
      {
        name: "safehito",
        keys: ["safehito", "catfish", "fish", "fungal detection", "fungal", "iot edge", "iot sensors", "iot", "convolutional neural network", "cnn", "capstone project", "capstone"],
        response: "SafeHito is David's award-winning Capstone track! 🐟 IoT edge sensors tracking water variables (pH, Temp, DO) and a Convolutional Neural Network AI model to detect & diagnose catfish fungal infections. High-fidelity engineering! 🎻"
      },
      {
        name: "tech_stack",
        keys: ["tech stack", "skills", "technologies", "languages", "tools", "programming languages", "stack"],
        response: "David's tech stack is a certified banger! 🎹 React & TypeScript on lead vocals, Node & PHP & Laravel keeping the low-end groove steady, and Google Cloud holding down the production desk. A perfectly mixed track! 🎧"
      },
      {
        name: "book_gig",
        keys: ["how to hire", "how to contact", "hire david", "contact david", "hire", "contact", "email", "book", "mail", "recruit", "email address", "get in touch", "book gig", "gig"],
        response: "Want to book David for your next dev gig? Drop a mail at davidmonzon156@gmail.com or hit the 'SEND EMAIL' button on the hero track. Let's make some noise! 🎤"
      }
    ];

    // 1. First attempt: match core intents explicitly by key phrasing.
    // We sort the keys by length descending to match the most specific phrases first
    for (const intent of INTENTS) {
      const sortedKeys = [...intent.keys].sort((a, b) => b.length - a.length);
      const matchedKey = sortedKeys.find(key => textClean.includes(key));
      if (matchedKey) {
        replyText = intent.response;
        break;
      }
    }

    // 2. Second attempt: match other keywords in RESPONSES_CONFIG (e.g. joke, status, location, etc.)
    if (!replyText) {
      const flatKeywords = [];
      RESPONSES_CONFIG.forEach(group => {
        group.keys.forEach(key => {
          flatKeywords.push({ key: key.toLowerCase(), response: group.response });
        });
      });
      flatKeywords.sort((a, b) => b.key.length - a.key.length);

      const match = flatKeywords.find(item => textClean.includes(item.key));
      if (match) {
        replyText = match.response;
      }
    }

    // 3. Fallback: options-based smarter menu
    if (!replyText) {
      replyText = RESPONSES_DEFAULT;
    }

    setIsTyping(true);

    // Simulate realistic studio mixing "typing" latency
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
    }, 700);
  };

  // Send message
  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    if (!textToSend) setInputVal('');

    handleReply(text);
  };

  const handleSuggestionClick = (label, queryText) => {
    handleSend(queryText);
  };

  return (
    <div className="beatbot-wrapper">
      
      {/* Floating Toggle Button */}
      <button
        className="beatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? <X size={20} /> : <Headphones size={20} />}
      </button>

      {/* Chat Window overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="beatbot-window"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
          >
            {/* Header */}
            <header className="beatbot-header">
              <h3 className="beatbot-header-title">
                <Music size={14} className="text-accent" />
                BEATBOT v1.0
              </h3>
              <div className="beatbot-status">
                <span className="beatbot-indicator" aria-hidden="true" />
                ON AIR
              </div>
            </header>

            {/* Message Body */}
            <div className="beatbot-body" ref={bodyRef}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`beatbot-message beatbot-message--${msg.sender}`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="beatbot-message beatbot-message--bot beatbot-typing">
                  <span className="beatbot-dot"></span>
                  <span className="beatbot-dot"></span>
                  <span className="beatbot-dot"></span>
                </div>
              )}
            </div>

            {/* Quick Suggestions Track Badges */}
            <div className="beatbot-suggestions">
              <button
                className="beatbot-suggestion-chip"
                onClick={() => handleSuggestionClick('🎹 Tech Stack', 'Tell me about David\'s tech stack')}
              >
                🎹 Tech Stack
              </button>
              <button
                className="beatbot-suggestion-chip"
                onClick={() => handleSuggestionClick('🚀 NOLA Pro', 'What is NOLA SMS Pro?')}
              >
                🚀 NOLA Pro
              </button>
              <button
                className="beatbot-suggestion-chip"
                onClick={() => handleSuggestionClick('🐟 SafeHito', 'Tell me about the SafeHito Capstone')}
              >
                🐟 SafeHito
              </button>
              <button
                className="beatbot-suggestion-chip"
                onClick={() => handleSuggestionClick('📧 Book Gig', 'How can I hire David for a role?')}
              >
                📧 Book Gig
              </button>
            </div>

            {/* Input Form */}
            <form
              className="beatbot-input-area"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                className="beatbot-input"
                placeholder="Type your query..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                maxLength={100}
              />
              <button
                type="submit"
                className="beatbot-send-btn"
                aria-label="Send query"
              >
                <Send size={12} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
