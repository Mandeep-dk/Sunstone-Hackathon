import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Users, Trophy, Clock, TrendingUp } from 'lucide-react';

/* Animated counter hook */
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(step);
      else prev.current = target;
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return count;
}

export default function HackathonDetail({
  onRegisterClick,
  isRegistered,
  registeredTeams = [],
}) {
  const [activeTab, setActiveTab] = useState('overview');

  const totalTeams = registeredTeams.length;
  const totalParticipants = registeredTeams.reduce((sum, t) => sum + (t.memberCount ?? 4), 0);

  const animatedTeams = useCountUp(totalTeams);
  const animatedParticipants = useCountUp(totalParticipants);

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
            <InfoItem icon={<Users />} label="Team Size" value="2-4 members" />
            <InfoItem icon={<Trophy />} label="Prize Pool" value="₹15,000" />
          </div>

          {/* ── Live Stats Cards ── */}
          {totalTeams > 0 && (
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
          )}

          {/* Tabs */}
          <div className="border-b mb-8">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
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

        {/* Registered Teams Table */}
        {isRegistered && registeredTeams.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Registered Teams</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-semibold">#</th>
                    <th className="py-3 px-4 text-left font-semibold">Team Name</th>
                    <th className="py-3 px-4 text-left font-semibold">Team Leader</th>
                    <th className="py-3 px-4 text-left font-semibold">Members</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredTeams.map((team, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-400">{index + 1}</td>
                      <td className="py-3 px-4 font-medium">{team.teamName}</td>
                      <td className="py-3 px-4">{team.leader}</td>
                      <td className="py-3 px-4">{team.memberCount ?? 4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
  return (
    <>
      <h3 className="text-2xl font-bold mb-4">About the Hackathon</h3>
      <p className="text-gray-600 mb-4">
        The Sunstone Hackathon 2024 brings together bright minds to solve real-world problems in 48 hours.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Mentorship from industry professionals</li>
        <li>Networking opportunities</li>
        <li>Exciting prizes and certificates</li>
        <li>Real-world problem solving</li>
      </ul>
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
          <p className="font-semibold">Will be released on March 15, 2024 at 9:00 AM</p>
        </div>
        <p className="text-gray-600">Problem statement will be revealed at the start of the hackathon.</p>
      </div>
    </>
  );
}

function Rules() {
  return (
    <>
      <h3 className="text-2xl font-bold mb-4">Rules & Guidelines</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Teams of 2–4 members</li>
        <li>All participants must be students</li>
        <li>Original work only</li>
        <li>Judges' decision is final</li>
      </ul>
    </>
  );
}

function Timeline() {
  return (
    <>
      <h3 className="text-2xl font-bold mb-4">Event Timeline</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Day 1 – Kickoff & problem release</li>
        <li>Day 2 – Development & mentoring</li>
        <li>Day 3 – Submissions & awards</li>
      </ul>
    </>
  );
}