import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Users, Trophy, Clock, TrendingUp } from 'lucide-react';

// ── Paste your Apps Script Web App URL here ───────────────────────────────────
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyJLeP7Q3Lh70nxm38esfgzKeyCotMmZzvu9CDglyurtl5Vhrt4MZpSK8-S3hx17010/exec';
// ─────────────────────────────────────────────────────────────────────────────

/* Animated count-up hook */
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
      const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setCount(Math.round(start + diff * e));
      if (p < 1) requestAnimationFrame(step);
      else prev.current = target;
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

export default function HackathonDetail({
  onRegisterClick,
  isRegistered,
  registeredTeams,
}) {
  const [activeTab, setActiveTab] = useState('overview');

  // ── Live counts from Google Sheets ─────────────────────────────────────────
  const [liveTeams, setLiveTeams] = useState(0);
  const [liveParticipants, setLiveParticipants] = useState(0);

  const fetchCounts = () => {
    fetch(`${SCRIPT_URL}?t=${Date.now()}`) // cache-bust
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.teams === 'number') setLiveTeams(data.teams);
        if (typeof data.participants === 'number') setLiveParticipants(data.participants);
      })
      .catch(() => {/* network error — keep last value */ });
  };

  useEffect(() => {
    fetchCounts();                          // fetch immediately on mount
    const id = setInterval(fetchCounts, 30_000); // then every 30 s
    return () => clearInterval(id);
  }, []);

  // Re-fetch instantly when this user just registered (isRegistered flips true)
  const prevRegistered = useRef(false);
  useEffect(() => {
    if (isRegistered && !prevRegistered.current) fetchCounts();
    prevRegistered.current = isRegistered;
  }, [isRegistered]);
  // ───────────────────────────────────────────────────────────────────────────

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
      <div className="h-80 bg-gradient-to-br from-[#003d82] to-[#0052a8] flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">HackStone 1.0</h1>
          <p className="text-xl md:text-2xl text-gray-100">
            Innovate. Code. Transform the Future.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <InfoItem icon={<Calendar />} label="Date" value="March 14, 2026" />
            <InfoItem icon={<MapPin />} label="Location" value="Virtual & On-Campus" />
            <InfoItem icon={<Users />} label="Team Size" value="4-5 members" />
            <InfoItem icon={<Trophy />} label="Prize Pool" value="₹7,000" />
          </div>

          {/* ── Live counters — always visible to ALL users ── */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <StatCard
              icon={<Users className="w-6 h-6" />}
              value={animatedTeams}
              label="Teams Registered"
              color="from-[#003d82] to-[#0066cc]"
            />
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              value={animatedParticipants}
              label="Total Participants"
              color="from-[#0052a8] to-[#0080ff]"
            />
          </div>

          {/* Tabs */}
          <div className="border-b mb-8">
            <div className="flex space-x-8 overflow-x-auto">
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
          <div className="prose max-w-none">
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'problem' && <Problem />}
            {activeTab === 'rules' && <Rules />}
            {activeTab === 'timeline' && <Timeline />}
          </div>
        </div>

        {/* Register CTA */}
        {!isRegistered && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join?</h3>
            <p className="text-gray-600 mb-6">
              Register your team now and be part of this exciting event!
            </p>
            <button
              onClick={onRegisterClick}
              className="bg-[#003d82] text-white px-8 py-4 rounded-lg hover:bg-[#002d62] transition-colors font-semibold text-lg"
            >
              Register Your Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ icon, value, label, color }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white flex items-center space-x-4 shadow-md`}>
      <div className="bg-white/20 rounded-full p-3">{icon}</div>
      <div>
        <div className="text-4xl font-bold tabular-nums">{value}</div>
        <div className="text-sm text-white/80 mt-1">{label}</div>
      </div>
    </div>
  );
}

/* ── Info Item ── */
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="text-[#003d82] w-6 h-6 mt-1">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
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
  return (
    <>
      <h3 className="text-2xl font-bold mb-4">Problem Statement</h3>
      <div className="bg-blue-50 border-l-4 border-[#003d82] p-6">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-5 h-5 text-[#003d82]" />
          <p className="font-semibold">Will be released on March 1, 2026 at 9:00 AM</p>
        </div>
        <p className="text-gray-600">
          Problem statement will be revealed at the start of the hackathon.
        </p>
      </div>
    </>
  );
}

function Rules() {
  return (
    <>
      <h3 className="text-2xl font-bold mb-4">Rules & Guidelines</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Teams of 3–5 members</li>
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
      date: 'Mar 1–11, 2026',
      day: 'Days 1–11',
      title: 'Hacking Period',
      desc: 'Build your solution, iterate fast, and get mentorship. Online collaboration allowed. Use any tech stack.',
      icon: '💻',
      color: '#0052a8',
      badge: '11 Days',
    },
    {
      date: 'Mar 12, 2026',
      day: 'Deadline',
      title: 'Final Submission Deadline',
      desc: 'All project submissions must be uploaded by 11:59 PM. Late entries will not be considered.',
      icon: '📦',
      color: '#d97706',
      badge: '11:59 AM',
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