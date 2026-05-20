import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Headphones, Send, X } from 'lucide-react';
import './BeatBot.css';

// Keyword matching dynamic response rules
const RESPONSES = {
  // Greetings & Intro
  hi: "Yo! 🎧 I'm David's Portfolio BeatBot—keeping the system groove alive. Tap a preset track below or drop a query, and let's mix it up! 🎚️",
  hello: "Yo! 🎧 I'm David's Portfolio BeatBot—keeping the system groove alive. Tap a preset track below or drop a query, and let's mix it up! 🎚️",
  yo: "Yo! 🎧 I'm David's Portfolio BeatBot—keeping the system groove alive. Tap a preset track below or drop a query, and let's mix it up! 🎚️",
  hey: "Yo! 🎧 I'm David's Portfolio BeatBot—keeping the system groove alive. Tap a preset track below or drop a query, and let's mix it up! 🎚️",
  sup: "Chillin' in the mix! 😎 CPU temperatures are cool, and beats are dropping in high fidelity. How's your signal today? Let's cue up a track! 🎛️",
  wassup: "Chillin' in the mix! 😎 CPU temperatures are cool, and beats are dropping in high fidelity. How's your signal today? Let's cue up a track! 🎛️",
  greet: "Yo! Welcome to the studio console. Dial in your inquiries and I'll spin the answers! 🎚️🎵",

  // How are you / Status
  "how are you": "System status: 100% operational! 🎛️ Frequency response is perfectly flat, and the dynamic range is wide open. Dropping hits all day long!",
  "how's it going": "System status: 100% operational! 🎛️ Frequency response is perfectly flat, and the dynamic range is wide open. Dropping hits all day long!",
  "status": "System status: 100% operational! 🎛️ Frequency response is perfectly flat, and the dynamic range is wide open. Dropping hits all day long!",

  // Who is David / About
  david: "David Monzon is a Junior Software Engineer from Pampanga, PH! 🇵🇭 He behaves like a backend producer—arranging databases, tuning APIs, and making sure the system infrastructure has a fat, punchy response! 🎚️💻",
  monzon: "David Monzon is a Junior Software Engineer from Pampanga, PH! 🇵🇭 He behaves like a backend producer—arranging databases, tuning APIs, and making sure the system infrastructure has a fat, punchy response! 🎚️💻",
  who: "David Monzon is a Junior Software Engineer from Pampanga, PH! 🇵🇭 He behaves like a backend producer—arranging databases, tuning APIs, and making sure the system infrastructure has a fat, punchy response! 🎚️💻",
  about: "David Monzon is a Junior Software Engineer from Pampanga, PH! 🇵🇭 He behaves like a backend producer—arranging databases, tuning APIs, and making sure the system infrastructure has a fat, punchy response! 🎚️💻",
  bio: "David Monzon is a Junior Software Engineer from Pampanga, PH! 🇵🇭 He behaves like a backend producer—arranging databases, tuning APIs, and making sure the system infrastructure has a fat, punchy response! 🎚️💻",

  // Core Tech Stack Details
  stack: "David's tech stack is a certified banger! 🎹 React & TypeScript on lead vocals, Node & PHP keeping the low-end groove steady, and Google Cloud holding down the production desk. A perfectly mixed track! 🎧",
  tech: "David's tech stack is a certified banger! 🎹 React & TypeScript on lead vocals, Node & PHP keeping the low-end groove steady, and Google Cloud holding down the production desk. A perfectly mixed track! 🎧",
  skills: "David's tech stack is a certified banger! 🎹 React & TypeScript on lead vocals, Node & PHP keeping the low-end groove steady, and Google Cloud holding down the production desk. A perfectly mixed track! 🎧",

  react: "React & React Native are David's main synthesizers on frontend! 🎹 They render dynamic signal interfaces with absolute responsiveness and modern styling templates.",
  javascript: "JavaScript & TypeScript run the main MIDI controllers! 🎶 They ensure every button tap and data payload triggers the perfect event handler in perfect key.",
  typescript: "JavaScript & TypeScript run the main MIDI controllers! 🎶 They ensure every button tap and data payload triggers the perfect event handler in perfect key.",
  ts: "JavaScript & TypeScript run the main MIDI controllers! 🎶 They ensure every button tap and data payload triggers the perfect event handler in perfect key.",
  js: "JavaScript & TypeScript run the main MIDI controllers! 🎶 They ensure every button tap and data payload triggers the perfect event handler in perfect key.",

  backend: "Backend is David's favorite production desk! 🎚️ Mixing Java, PHP, C#, C++, Node.js, and Python to create low-latency routes and reliable server channels.",
  php: "PHP and custom middleware are David's reliable workhorses! 🐴 He used them for webhook-driven SMS delivery in NOLA and POS status syncing for Laundroworks automation.",
  node: "Node.js is great for high-concurrency loops and fast API tracks. Keeps the flow running without skipping a single beat! ⚡🎧",
  api: "APIs are the patches that connect different instruments together! 🎹 David specializes in GHL Marketplace OAuth 2.0 integrations, RESTful services, and hardware SMS gateways.",
  webhook: "Webhooks are like instant trigger pads! 🟥 The moment an event fires (like a purchase or lead in GoHighLevel), a secure payload is shot straight to the server to run custom logic.",

  cloud: "Cloud power: Google Cloud Platform (GCP), Firebase, Docker containerization, and VPS hosting. Scaled up to handle high volumes without clipping the master channel! ☁️🔊",
  gcp: "Google Cloud Platform holds down the main server rack! ☁️ Docker containers running on Cloud Run keep NOLA SMS Pro live, secure, and ready to scale.",
  firebase: "Firebase is David's real-time synth database! 🔥 Perfect for instant synchronization, telemetry, and live data tracks like SafeHito and iReportPH.",

  database: "Data styling: MySQL, Firebase, and optimized relational schemas. Keep your records sorted and indexed so you can retrieve them at 128 BPM! 📀📁",
  sql: "Data styling: MySQL, Firebase, and optimized relational schemas. Keep your records sorted and indexed so you can retrieve them at 128 BPM! 📀📁",
  mysql: "Data styling: MySQL, Firebase, and optimized relational schemas. Keep your records sorted and indexed so you can retrieve them at 128 BPM! 📀📁",

  // Projects
  nola: "NOLA SMS Pro is a major hit single! 🚀 Multi-tenant GoHighLevel OAuth integration, dynamic cloud & private hardware SIM routing, and Google Cloud Run. It's basically a custom-engineered synthesizer for SMS deliverability! 🎛️",
  sms: "NOLA SMS Pro is a major hit single! 🚀 Multi-tenant GoHighLevel OAuth integration, dynamic cloud & private hardware SIM routing, and Google Cloud Run. It's basically a custom-engineered synthesizer for SMS deliverability! 🎛️",
  ghl: "NOLA SMS Pro is a major hit single! 🚀 Multi-tenant GoHighLevel OAuth integration, dynamic cloud & private hardware SIM routing, and Google Cloud Run. It's basically a custom-engineered synthesizer for SMS deliverability! 🎛️",
  gohighlevel: "NOLA SMS Pro is a major hit single! 🚀 Multi-tenant GoHighLevel OAuth integration, dynamic cloud & private hardware SIM routing, and Google Cloud Run. It's basically a custom-engineered synthesizer for SMS deliverability! 🎛️",

  capstone: "SafeHito is David's award-winning Capstone track! 🐟 IoT edge sensors tracking water variables (pH/Temp/DO) and a Convolutional Neural Network AI to detect catfish fungal infections. High-fidelity engineering! 🎻",
  safehito: "SafeHito is David's award-winning Capstone track! 🐟 IoT edge sensors tracking water variables (pH/Temp/DO) and a Convolutional Neural Network AI to detect catfish fungal infections. High-fidelity engineering! 🎻",
  fish: "SafeHito is David's award-winning Capstone track! 🐟 IoT edge sensors tracking water variables (pH/Temp/DO) and a Convolutional Neural Network AI to detect catfish fungal infections. High-fidelity engineering! 🎻",
  catfish: "SafeHito is David's award-winning Capstone track! 🐟 IoT edge sensors tracking water variables (pH/Temp/DO) and a Convolutional Neural Network AI to detect catfish fungal infections. High-fidelity engineering! 🎻",
  iot: "SafeHito is David's award-winning Capstone track! 🐟 IoT edge sensors tracking water variables (pH/Temp/DO) and a Convolutional Neural Network AI to detect catfish fungal infections. High-fidelity engineering! 🎻",

  laundroworks: "Laundroworks automation middleware! Suds Mgt POS connected to GHL using custom PHP automation webhooks. Keeping clean cycles in absolute tempo! 🧼🔄",
  suds: "Laundroworks automation middleware! Suds Mgt POS connected to GHL using custom PHP automation webhooks. Keeping clean cycles in absolute tempo! 🧼🔄",

  ireport: "iReportPH is a classic grassroots incident-reporting platform built in 2025. Vanilla JS and Firebase on the tracking console, letting citizens signal alerts in real time! 🏙️🚨",
  ireportph: "iReportPH is a classic grassroots incident-reporting platform built in 2025. Vanilla JS and Firebase on the tracking console, letting citizens signal alerts in real time! 🏙️🚨",

  vitaltrack: "VitalTrack is a 2024 health monitoring system. 🏃‍♂️ GPS integration, real-time vital telemetry, and interactive Recharts graphs. Smooth pacing for your health workouts!",

  // Education
  education: "For his educational track, David is currently jamming through a BS in Information Technology at Pampanga State University (2023-Present) and spent 2 semesters in CS at Holy Cross College. Constant practice makes perfect harmony! 🎹",
  school: "For his educational track, David is currently jamming through a BS in Information Technology at Pampanga State University (2023-Present) and spent 2 semesters in CS at Holy Cross College. Constant practice makes perfect harmony! 🎹",
  college: "For his educational track, David is currently jamming through a BS in Information Technology at Pampanga State University (2023-Present) and spent 2 semesters in CS at Holy Cross College. Constant practice makes perfect harmony! 🎹",
  psu: "For his educational track, David is currently jamming through a BS in Information Technology at Pampanga State University (2023-Present) and spent 2 semesters in CS at Holy Cross College. Constant practice makes perfect harmony! 🎹",

  // Contact / Bookings
  contact: "Want to book David for your next dev gig? Drop a mail at davidmonzon156@gmail.com or hit the 'SEND EMAIL' button on the hero track. Let's make some noise! 🎤",
  hire: "Want to book David for your next dev gig? Drop a mail at davidmonzon156@gmail.com or hit the 'SEND EMAIL' button on the hero track. Let's make some noise! 🎤",
  email: "Want to book David for your next dev gig? Drop a mail at davidmonzon156@gmail.com or hit the 'SEND EMAIL' button on the hero track. Let's make some noise! 🎤",
  book: "Want to book David for your next dev gig? Drop a mail at davidmonzon156@gmail.com or hit the 'SEND EMAIL' button on the hero track. Let's make some noise! 🎤",

  // Resume / PDF Downloads
  resume: "You can download David's professional CV directly using the button on the hero deck! Or grab his Capstone final paper PDF on the capstone card. Solid gold documentation! 📄🥇",
  cv: "You can download David's professional CV directly using the button on the hero deck! Or grab his Capstone final paper PDF on the capstone card. Solid gold documentation! 📄🥇",
  pdf: "You can download David's professional CV directly using the button on the hero deck! Or grab his Capstone final paper PDF on the capstone card. Solid gold documentation! 📄🥇",

  // Music & Jokes
  beat: "My favorite genre is Lo-Fi Synthwave! 🌌 Floating pads, heavy sidechains, and 808 subs matching our dark system vibe. Drop a fat beat in your next dev project! 🥁",
  music: "My favorite genre is Lo-Fi Synthwave! 🌌 Floating pads, heavy sidechains, and 808 subs matching our dark system vibe. Drop a fat beat in your next dev project! 🥁",
  song: "My favorite genre is Lo-Fi Synthwave! 🌌 Floating pads, heavy sidechains, and 808 subs matching our dark system vibe. Drop a fat beat in your next dev project! 🥁",
  genre: "My favorite genre is Lo-Fi Synthwave! 🌌 Floating pads, heavy sidechains, and 808 subs matching our dark system vibe. Drop a fat beat in your next dev project! 🥁",
  joke: "Why did the software engineer go to the nightclub? To check out the base (database) and catch the drop (packet drop)! 🥁 Badum-tss! 🎚️",
  funny: "Why did the software engineer go to the nightclub? To check out the base (database) and catch the drop (packet drop)! 🥁 Badum-tss! 🎚️",
  dance: "I can't dance, but I can make these LEDs pulse! 🟢✨ Let the synthesizer sweep wash over your screen!",
  sing: "I can't sing in actual notes, but my code compiles in perfect key! 🎵 'Hello World' in a high-fidelity major scale!",

  // Help
  help: "I'm tuned to respond to standard developer track controls! 🎚️ Ask me about David's projects, tech stack, capstone, education, contact details, or drop a query like 'tell me a joke'!",

  default: "That track sounds deep, but I couldn't catch the melody! 🎵 Ask me about David's projects, tech stack, education, or how to hire him for your next big gig! 🎚️"
};

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
    const textClean = userText.toLowerCase().trim();
    let replyText = RESPONSES.default;

    // Search keys for exact or partial matches
    const matchedKey = Object.keys(RESPONSES).find(key => {
      if (key === 'default') return false;
      return textClean.includes(key);
    });

    if (matchedKey) {
      replyText = RESPONSES[matchedKey];
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
