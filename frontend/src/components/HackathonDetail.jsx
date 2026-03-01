import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Users, Trophy, TrendingUp } from 'lucide-react';

// ── Paste your Apps Script Web App URL here ───────────────────────────────────
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxiw3aVaGeGXTi6UXbQHg0DfK-ZoBeImx4O2s9ehNVPWRjneC4aoP9sNfNNAynSO-2W/exec';
// ─────────────────────────────────────────────────────────────────────────────

function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    if (diff === 0) return;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(start + diff * e));
      if (p < 1) requestAnimationFrame(step);
      else prev.current = target;
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

export default function HackathonDetail({ onRegisterClick, isRegistered }) {
  const [activeTab, setActiveTab] = useState('overview');

  // ── Live counts from Google Sheets ─────────────────────────────────────────
  const [liveTeams, setLiveTeams] = useState(0);
  const [liveParticipants, setLiveParticipants] = useState(0);

  const fetchCounts = () => {
    fetch(`${SCRIPT_URL}?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.teams === 'number') setLiveTeams(data.teams);
        if (typeof data.participants === 'number') setLiveParticipants(data.participants);
      })
      .catch(() => {/* network error — keep last value */ });
  };

  useEffect(() => {
    fetchCounts();
    const id = setInterval(fetchCounts, 30_000);
    return () => clearInterval(id);
  }, []);

  const prevRegistered = useRef(false);
  useEffect(() => {
    if (isRegistered && !prevRegistered.current) fetchCounts();
    prevRegistered.current = isRegistered;
  }, [isRegistered]);

  const animatedTeams = useCountUp(liveTeams);
  const animatedParticipants = useCountUp(liveParticipants);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'Problem Statement' },
    { id: 'rules', label: 'Rules' },
    { id: 'timeline', label: 'Timeline' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="h-56 sm:h-80 bg-gradient-to-br from-[#003d82] to-[#0052a8] flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">HackStone 1.0</h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-100">
            Innovate. Code. Transform the Future.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-8 sm:-mt-16">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8">

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <InfoItem icon={<Calendar />} label="Date" value="March 14, 2026" />
            <InfoItem icon={<MapPin />} label="Location" value="Virtual & On-Campus" />
            <InfoItem icon={<Users />} label="Team Size" value="4-5 members" />
            <InfoItem icon={<Trophy />} label="Prize Pool" value="₹7,000" />
          </div>

          {/* ── Live counters — always visible to ALL users ── */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <StatCard
              icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
              value={animatedTeams}
              label="Teams Registered"
              color="from-[#003d82] to-[#0066cc]"
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
              value={animatedParticipants}
              label="Total Participants"
              color="from-[#0052a8] to-[#0080ff]"
            />
          </div>

          {/* Tabs */}
          <div className="border-b mb-6 sm:mb-8">
            <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 space-x-4 sm:space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                    ? 'text-[#003d82] border-b-2 border-[#003d82]'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="prose prose-sm sm:prose max-w-none">
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'problem' && <Problem />}
            {activeTab === 'rules' && <Rules />}
            {activeTab === 'timeline' && <Timeline />}
          </div>
        </div>

        {/* Register CTA */}
        {!isRegistered && (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to Join?</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
              Register your team now and be part of this exciting event!
            </p>
            <button
              onClick={onRegisterClick}
              className="bg-[#003d82] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#002d62] transition-colors font-semibold text-base sm:text-lg w-full sm:w-auto"
            >
              Register Your Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Stat Card — fully responsive layout ── */
function StatCard({ icon, value, label, color }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-3 sm:p-6 text-white shadow-md`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="bg-white/20 rounded-full p-2 sm:p-3 flex-shrink-0 w-fit">
          {icon}
        </div>
        <div className="min-w-0 w-full">
          <div className="text-3xl sm:text-4xl font-bold tabular-nums leading-none">{value}</div>
          <div className="text-xs sm:text-sm text-white/80 mt-1 leading-tight break-words">{label}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Info Item ── */
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start space-x-2 sm:space-x-3">
      <div className="text-[#003d82] w-4 h-4 sm:w-6 sm:h-6 mt-0.5 sm:mt-1 flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900 text-xs sm:text-base leading-tight">{value}</p>
      </div>
    </div>
  );
}

function Overview() {
  const highlights = [
    { icon: '🎓', title: 'College Students Only', desc: 'Open to all undergraduate & postgraduate students with a valid college ID.' },
    { icon: '🔀', title: 'Hybrid Format', desc: 'Build your solution online over 11 days, then present live on campus in the Grand Finale.' },
    { icon: '🧑‍🏫', title: 'Mentorship', desc: 'Get guidance from experienced faculty and industry professionals throughout the hacking period.' },
    { icon: '📜', title: 'Certificates for All', desc: 'Every participating team receives an official certificate of participation.' },
  ];

  const tracks = [
    {
      icon: '💻',
      name: 'Software',
      color: '#003d82',
      bg: '#eff6ff',
      border: '#bfdbfe',
      desc: 'Build apps, platforms, or tools — web, mobile, desktop, or cloud-based solutions.',
      examples: ['Web/Mobile Apps', 'AI & ML Solutions', 'SaaS Platforms', 'Automation Tools'],
    },
    {
      icon: '🔧',
      name: 'Hardware',
      color: '#b45309',
      bg: '#fffbeb',
      border: '#fde68a',
      desc: 'Design and prototype physical devices or embedded systems that solve real problems.',
      examples: ['IoT Devices', 'Embedded Systems', 'Robotics', 'Smart Sensors'],
    },
    {
      icon: '⚡',
      name: 'Software + Hardware',
      color: '#6d28d9',
      bg: '#f5f3ff',
      border: '#ddd6fe',
      desc: 'The ultimate challenge — combine physical hardware with a smart software layer.',
      examples: ['Smart Home Systems', 'Wearables + App', 'Edge AI Devices', 'Connected Prototypes'],
    },
  ];

  const prizes = [
    { rank: '1st', amount: '₹4,000', icon: '🥇', color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
    { rank: '2nd', amount: '₹3,000', icon: '🥈', color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb' },
  ];

  return (
    <>
      <style>{`
        @keyframes ov-fade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ov-card {
          animation: ov-fade 0.4s ease both;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ov-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.09);
        }
        .track-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .track-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 32px rgba(0,0,0,0.10);
        }
        .prize-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .prize-card:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 24px rgba(0,0,0,0.10);
        }
      `}</style>

      {/* ── Intro ── */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">About HackStone 1.0</h3>
        <p className="text-gray-600 leading-relaxed">
          HackStone 1.0 is Sunstone's first-ever inter-college hackathon — a platform where college
          students build, innovate, and compete across three exciting tracks. Over 11 days online,
          teams tackle a real-world problem statement, then the best teams face off in a Grand Finale
          on campus. Whether you're a coder, a maker, or both — there's a track for you.
        </p>
      </div>

      {/* ── Highlights ── */}
      <h4 className="text-lg font-bold text-gray-800 mb-4">✨ Highlights</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="ov-card flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="text-2xl flex-shrink-0">{h.icon}</div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{h.title}</p>
              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Problem Statement Tracks ── */}
      <h4 className="text-lg font-bold text-gray-800 mb-1">🎯 Problem Statement Tracks</h4>
      <p className="text-sm text-gray-500 mb-4">
        Choose your track when you register. The PS for each track releases on <strong>March 1 at 6:30 PM</strong>.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {tracks.map((t, i) => (
          <div
            key={i}
            className="track-card rounded-xl border p-5"
            style={{ background: t.bg, borderColor: t.border }}
          >
            <div className="text-3xl mb-2">{t.icon}</div>
            <h5 className="font-bold text-base mb-1" style={{ color: t.color }}>{t.name}</h5>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">{t.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {t.examples.map((ex) => (
                <span
                  key={ex}
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: `${t.color}18`, color: t.color }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Prize Pool ── */}
      <h4 className="text-lg font-bold text-gray-800 mb-1">🏆 Prize Pool — ₹7,000</h4>
      <p className="text-xs text-gray-400 mb-4">Prizes awarded per track · Winners announced on March 14</p>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {prizes.map((p, i) => (
          <div
            key={i}
            className="prize-card flex-1 flex items-center gap-4 rounded-xl border p-5"
            style={{ background: p.bg, borderColor: p.border }}
          >
            <div className="text-4xl">{p.icon}</div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: p.color }}>
                {p.rank} Place
              </p>
              <p className="text-3xl font-bold" style={{ color: p.color }}>{p.amount}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-xs text-blue-700 font-medium">
        💡 All participants receive a Certificate of Participation. Shortlisted finalists receive a Certificate of Merit.
      </div>
    </>
  );
}

function Problem() {
  const [activeTrack, setActiveTrack] = useState('software');

  const tracks = {
    software: {
      label: '💻 Software',
      color: '#003d82',
      bg: '#eff6ff',
      border: '#bfdbfe',
      badgeBg: '#dbeafe',
      badgeText: '#1d4ed8',
      techNote: '🛠️ Any tech stack is welcome — React, Flutter, Python, Node.js, Firebase, AI/ML frameworks, or anything else you\'re comfortable with. A working prototype or demo is sufficient for the online submission. A polished, production-ready build is expected only for the Grand Finale.',
      problems: [
        {
          id: 1,
          title: '"Local Connect": Multilingual Agri-Marketplace for Small Farmers',
          problem: 'Many farmers in states like Meghalaya or Mizoram struggle to sell organic produce (like Ginger or Turmeric) to larger markets due to language barriers and lack of digital presence.',
          goal: 'Build a multilingual web or mobile portal where farmers can list their harvest in local languages, set their own prices, and connect directly with buyers. The platform should support at least 2–3 regional languages, allow photo uploads of produce, include basic search/filter for buyers, and ideally integrate a simple WhatsApp or SMS notification system so farmers get alerts when someone is interested in their listing — no smartphone dependency required.',
        },
        {
          id: 2,
          title: '"NER-Tour": Eco-Tourism Hidden Gem Discoverer',
          problem: 'Tourism in the North East is often limited to a few popular spots, leaving beautiful remote villages without income.',
          goal: 'Create a crowdsourced discovery platform where users can submit "Hidden Gems" — uploading photos, GPS coordinates, travel tips, and short descriptions of less-visited locations. The platform should include an interactive map view, a community rating/review system, filtering by category (nature, culture, food, adventure), and a moderation layer to verify submissions. Bonus: offline access or a lightweight mobile-friendly version for areas with poor connectivity.',
        },
        {
          id: 3,
          title: 'Smart Community Health Tracker for Rural NER',
          problem: 'Remote hilly villages lack immediate access to specialists. Health records are mostly on paper and easily lost during monsoon seasons.',
          goal: 'Build a Digital Health Card system designed for offline-first use. Local health workers (ASHAs) should be able to create and update patient profiles, record vitals (blood pressure, temperature, weight, etc.), log vaccination history, and track pregnancy or chronic illness follow-ups — all without internet. Data should sync automatically to a central dashboard when connectivity is restored. A simple web dashboard for supervisors to view aggregated health trends across villages would make this solution truly impactful.',
        },
        {
          id: 4,
          title: 'Intelligent Cultural Tourism Experience Engine for Assam',
          problem: 'There is no unified digital platform that systematically documents and showcases micro-cultural experiences across Assam\'s districts, limiting community participation and balanced tourism growth.',
          goal: 'Develop a district-wise interactive cultural map of Assam where communities can document festivals, crafts, local cuisines, folk art, and heritage sites. The platform should support community contributions (with photo/video uploads and descriptions), allow tourists to plan immersive cultural itineraries, and include a structured tagging system for easy discovery. A key goal is to shift tourism away from only a few well-known spots and create economic opportunity for overlooked communities by putting them on the digital map.',
        },
        {
          id: 5,
          title: 'Smart Animal Rescue & Response System',
          problem: 'There is no centralized digital system that allows citizens to quickly report injured or distressed animals and connect them with nearby rescue teams in real time.',
          goal: 'Build a citizen-driven rescue coordination platform where users can report injured or distressed animals with photos, location (auto GPS or manual pin), and a brief description. The system should automatically notify the nearest registered rescue volunteer or NGO, allow responders to accept and track cases, and provide a live status feed so the reporter knows help is on the way. An admin dashboard showing rescue heatmaps, response time analytics, and volunteer availability would significantly enhance real-world impact.',
        },
        {
          id: 6,
          title: 'Intelligent Decision Support for Sustainable Farming',
          problem: 'Farmers face major challenges in accessing timely, accurate, and personalized agricultural support due to language barriers, limited technical knowledge, fragmented advisory systems, and poor internet connectivity in rural areas.',
          goal: 'Build an AI-powered, multilingual mobile decision-support system that delivers hyper-localized farming advice. The solution should integrate soil health data (via sensor input or manual entry), local weather forecasts, crop rotation history, and agri-market price trends to generate actionable recommendations. Farmers should be able to interact using voice commands, chat, or image uploads (e.g., photo of a diseased leaf for diagnosis) — even on low-bandwidth connections. The system should support at least 2 regional languages and be designed to work on basic Android smartphones.',
        },
        {
          id: 7,
          title: 'Multilingual Healthcare Assistant for Communities',
          problem: 'Rural and semi-urban populations often lack easy access to reliable, timely, and understandable healthcare information due to language barriers, limited medical infrastructure, and low digital literacy.',
          goal: 'Develop a multilingual AI-powered healthcare chatbot accessible via WhatsApp and SMS (no app download required). It should provide clear, accurate information on preventive care, common disease symptoms, vaccination schedules, and nearest health facilities. The system should integrate with government health databases for real-time outbreak alerts and advisories, support voice-based input for low-literacy users, and respond in at least 2–3 regional languages. The goal is to make reliable health guidance as accessible as a text message — available 24/7, even in areas with limited healthcare infrastructure.',
        },
      ],
    },
    hardware: {
      label: '🔧 Hardware',
      color: '#b45309',
      bg: '#fffbeb',
      border: '#fde68a',
      badgeBg: '#fef3c7',
      badgeText: '#92400e',
      techNote: '🔩 A working prototype is required for the Grand Finale, but for the online submission, a well-documented design — circuit diagrams, component list, simulation, or even a physical mock-up — is perfectly acceptable. You don\'t need a fully polished build to submit.',
      problems: [
        {
          id: 1,
          title: 'Portable Soil-Nutrient Tester for Hill Terrains',
          problem: 'Soil in the NE is often acidic. Testing in labs takes weeks due to the difficult terrain.',
          goal: 'Build a low-cost, handheld IoT device using NPK and pH sensors that delivers an instant reading of soil health on-site. The device should display results on a small screen or via LED indicators, run on battery power for field use, and suggest suitable crops for the detected soil conditions and elevation. Durability for humid, hilly terrain is key — the casing should be ruggedized and the sensor probes easy to clean and replace.',
        },
        {
          id: 2,
          title: 'Solar-Powered Smart Light for Rural Weaving Centers',
          problem: 'Handloom weaving is a major livelihood in the NE, but frequent power cuts in remote areas stop work after sunset.',
          goal: 'Design a portable, solar-charged lighting solution built specifically for use on traditional wooden looms. It should feature a high-intensity, adjustable LED that can be positioned for detailed weaving work, an integrated power bank for mobile phone charging, a charge indicator, and a battery life sufficient for at least 6–8 hours of use per day. The unit should be lightweight, easy to attach and detach from a loom, and cost-effective enough for individual weavers to own.',
        },
      ],
    },
    hybrid: {
      label: '⚡ Software + Hardware',
      color: '#6d28d9',
      bg: '#f5f3ff',
      border: '#ddd6fe',
      badgeBg: '#ede9fe',
      badgeText: '#5b21b6',
      techNote: '🛠️ Any tech stack is welcome for the software layer — web dashboards, mobile apps, cloud backends, or SMS gateways. For the hardware side, a normal prototype or even a simulation/mock-up is fine for the online submission. A more complete build will be expected for the Grand Finale.',
      problems: [
        {
          id: 1,
          title: '"Jal-Drishti": Low-Cost River Level Early Warning System',
          problem: 'Flash floods in the Brahmaputra and its tributaries happen rapidly. Current monitoring stations are too far apart.',
          goal: 'Hardware: Deploy an ultrasonic sensor unit under a local bridge or riverbank structure to continuously measure water height. It should transmit readings at regular intervals via GSM or LoRa to a central server. Software: Build a real-time dashboard that visualizes water level trends, sets customizable "Warning" and "Danger" thresholds, and automatically triggers SMS/WhatsApp alerts to registered villagers and local authorities when levels are crossed. A historical data view and a simple map showing sensor locations would make the system highly practical for disaster management teams.',
        },
        {
          id: 2,
          title: 'Smart Bamboo-Storage Monitor',
          problem: 'North East India is the bamboo hub of India, but stored bamboo is prone to fungal rot if humidity is too high.',
          goal: 'Hardware: Place a DHT11 (or DHT22 for better accuracy) temperature and humidity sensor node inside bamboo storage warehouses. The node should log readings continuously and communicate wirelessly (Wi-Fi, Bluetooth, or GSM) to a central system. Software: Build a mobile or web app that displays real-time and historical humidity/temperature data, sends push notifications or SMS alerts when moisture levels exceed safe thresholds, and recommends corrective actions (e.g., activate ventilation, use dehumidifier). A simple analytics view showing storage condition trends over time would help warehouse owners make proactive decisions.',
        },
        {
          id: 3,
          title: 'Automated Landslide "Vibration-Alert" for Hilly Roads',
          problem: 'Monsoon-induced landslides often block NH-37 and other vital roads, catching commuters off guard.',
          goal: 'Hardware: Bury an accelerometer/vibration sensor near high-risk slopes along key highways. The sensor should detect unusual ground vibrations (above a calibrated threshold) and transmit alerts via GSM to a central server in near real-time. Software: Build a live web map that marks road segments with colour-coded safety statuses — Green (Safe), Yellow (Vibrations Detected – Caution), and Red (Likely Blockage – Avoid). The system should send automated SMS alerts to transport departments and commuters, log all vibration events with timestamps, and allow road safety officers to manually update statuses after physical verification.',
        },
      ],
    },
  };

  const track = tracks[activeTrack];

  return (
    <>
      <style>{`
        @keyframes ps-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ps-card {
          animation: ps-fade 0.35s ease both;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ps-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.09);
        }
      `}</style>

      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Problem Statements</h3>
      <p className="text-sm text-gray-500 mb-6">Select your track to view the problem statements. Choose one PS to build your solution around.</p>

      {/* Track Switcher */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(tracks).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setActiveTrack(key)}
            className="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all"
            style={
              activeTrack === key
                ? { background: t.color, color: '#fff', borderColor: t.color }
                : { background: '#f9fafb', color: '#6b7280', borderColor: '#e5e7eb' }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* PS Count Badge */}
      <div
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
        style={{ background: track.badgeBg, color: track.badgeText }}
      >
        📋 {track.problems.length} Problem Statement{track.problems.length > 1 ? 's' : ''} in this track
      </div>

      {/* Tech Stack Note — only for software & hybrid */}
      {track.techNote && (
        <div className="mb-5 flex items-start gap-2 rounded-lg border px-4 py-3 text-xs font-medium"
          style={{ background: track.badgeBg, borderColor: track.border, color: track.badgeText }}
        >
          <span className="flex-shrink-0 mt-0.5">💡</span>
          <span>{track.techNote}</span>
        </div>
      )}

      {/* Problem Cards */}
      <div className="space-y-4">
        {track.problems.map((ps, i) => (
          <div
            key={ps.id}
            className="ps-card rounded-xl border p-5"
            style={{ background: track.bg, borderColor: track.border, animationDelay: `${i * 0.06}s` }}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                style={{ background: track.color }}
              >
                {ps.id}
              </span>
              <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug">{ps.title}</h4>
            </div>

            {/* Problem */}
            <div className="ml-10 space-y-2">
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: track.color }}
                >
                  🔴 The Problem
                </span>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{ps.problem}</p>
              </div>
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: track.color }}
                >
                  🎯 The Goal
                </span>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{ps.goal}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-xs text-blue-700 font-medium">
        💡 You must register under one track. Once registered, your team works on any <strong>one</strong> problem statement from your chosen track.
      </div>
    </>
  );
}

function Rules() {
  return (
    <>
      <h3 className="text-2xl font-bold mb-4">Rules & Guidelines</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Teams of 4–5 members</li>
        <li>All participants must be students from Sunstone</li>
        <li>Only original ideas and work are allowed</li>
        <li>Teams that submit their idea in the online round will receive participation certificates</li>
        <li>Please provide accurate team details in the registration form to receive timely updates about the hackathon</li>
        <li>Judges' decision will be final and binding</li>
      </ul>
    </>
  );
}

function Timeline() {
  const events = [
    {
      date: 'Mar 1, 2026',
      day: 'Day 1',
      title: 'Problem Statement Release',
      desc: 'The official problem statement goes live at 6:30 PM. Teams receive their challenge and the clock starts ticking.',
      icon: '🚀',
      color: '#003d82',
      badge: '6:30 PM',
    },
    {
      date: 'Mar 1–7, 2026',
      day: 'Days 1–7',
      title: 'Hacking Period',
      desc: 'Build your solution, iterate fast, and get mentorship. Online collaboration allowed. Use any tech stack.',
      icon: '💻',
      color: '#0052a8',
      badge: '11 Days',
    },
    {
      date: 'Mar 7, 2026',
      day: 'Deadline',
      title: 'Final Submission Deadline',
      desc: 'All project submissions must be uploaded by 11:59 PM. Late entries will not be considered.',
      icon: '📦',
      color: '#d97706',
      badge: '11:59 PM',
    },
    {
      date: 'Mar 12, 2026',
      day: 'Results',
      title: 'Shortlisted Teams Announced',
      desc: 'Shortlisted teams for the Final Round will be notified via email and announced on the portal.',
      icon: '🏅',
      color: '#059669',
      badge: 'Email + Portal',
    },
    {
      date: 'Mar 14, 2026',
      day: 'Final Day',
      title: 'Grand Finale — On Campus',
      desc: 'Shortlisted teams present their solutions to a panel of industry judges at the Sunstone campus. Winners announced on the same day.',
      icon: '🏆',
      color: '#7c3aed',
      badge: 'On Campus',
    },
  ];

  return (
    <>
      <style>{`
        @keyframes tl-fade-in {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .tl-item {
          animation: tl-fade-in 0.4s ease both;
        }
        .tl-item:nth-child(1) { animation-delay: 0.05s; }
        .tl-item:nth-child(2) { animation-delay: 0.12s; }
        .tl-item:nth-child(3) { animation-delay: 0.19s; }
        .tl-item:nth-child(4) { animation-delay: 0.26s; }
        .tl-item:nth-child(5) { animation-delay: 0.33s; }

        .tl-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .tl-card:hover {
          transform: translateX(6px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.10);
        }
      `}</style>

      <h3 className="text-2xl font-bold mb-8 text-gray-900">Event Timeline</h3>

      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-0.5"
          style={{ background: 'linear-gradient(to bottom, #003d82, #7c3aed)', opacity: 0.2 }}
        />

        <div className="space-y-6">
          {events.map((ev, i) => (
            <div key={i} className="tl-item relative flex gap-5">

              {/* Circle icon */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md border-2 border-white"
                  style={{ background: ev.color }}
                >
                  {ev.icon}
                </div>
              </div>

              {/* Card */}
              <div className="tl-card flex-1 bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-1">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: ev.color }}
                    >
                      {ev.day}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 mt-0.5">{ev.title}</h4>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      📅 {ev.date}
                    </span>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                      style={{ background: ev.color }}
                    >
                      {ev.badge}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{ev.desc}</p>

                {/* Final round special note */}
                {i === events.length - 1 && (
                  <div className="mt-3 flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-lg px-3 py-2">
                    <span className="text-purple-600 text-sm">📍</span>
                    <span className="text-xs font-medium text-purple-700">
                      Venue details will be shared with shortlisted teams via email
                    </span>
                  </div>
                )}

                {/* Submission deadline warning */}
                {i === 2 && (
                  <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    <span className="text-amber-600 text-sm">⚠️</span>
                    <span className="text-xs font-medium text-amber-700">
                      No extensions will be granted. Submit before the deadline!
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}