import { Calendar, MapPin, Users } from 'lucide-react';

export default function EventsSection({ onEventClick, onRegisterClick }) {
  return (
    <>
      <style>{`
        @keyframes grid-move {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(40px, -30px) scale(1.1); }
        }
        .event-card {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .event-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 48px rgba(0,61,130,0.18);
        }
        .event-card:hover .event-banner-overlay {
          opacity: 1;
        }
        .register-btn {
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,61,130,0.3);
        }
      `}</style>

      <div className="relative py-20 overflow-hidden" style={{ background: '#f0f4f8' }}>

        {/* ── Animated dot-grid background ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,61,130,0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '40px 40px',
            animation: 'grid-move 8s linear infinite',
          }}
        />

        {/* ── Soft glowing blobs ── */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 500,
            height: 500,
            top: '-150px',
            right: '-150px',
            background: 'radial-gradient(circle, rgba(0,82,168,0.10) 0%, transparent 70%)',
            animation: 'orb-drift 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 350,
            height: 350,
            bottom: '-100px',
            left: '-80px',
            background: 'radial-gradient(circle, rgba(0,61,130,0.08) 0%, transparent 70%)',
            animation: 'orb-drift 16s ease-in-out infinite reverse',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600">Join us in our exciting hackathon event</p>
          </div>

          {/* Event Card */}
          <div className="max-w-2xl mx-auto">
            <div
              className="event-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              onClick={onEventClick}
            >
              {/* Event Banner */}
              <div className="relative h-64 bg-gradient-to-br from-[#003d82] to-[#0052a8] flex items-center justify-center overflow-hidden">
                {/* Banner animated dots */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                {/* Hover shimmer overlay */}
                <div
                  className="event-banner-overlay absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
                  }}
                />
                <div className="relative text-center text-white z-10">
                  <h3 className="text-4xl font-bold mb-2">HackStone 1.0</h3>
                  <p className="text-xl">Innovation Challenge</p>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">HackStone 1.0</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-[#003d82]" />
                    <span>March 14, 2026</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-[#003d82]" />
                    <span>Virtual & On-Campus</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3 text-[#003d82]" />
                    <span>Team Size: 4-5 members</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  Join us for an exciting one-day hybrid hackathon on 14 March, where teams will tackle real-world problems with innovative ideas. The first round will be conducted online, allowing participants to submit and present their ideas remotely. Shortlisted teams will then compete in the on-campus final round, showcasing their solutions to industry experts and judges for a chance to win exciting prizes.
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick();
                  }}
                  className="register-btn w-full bg-[#003d82] text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Register for Hackathon
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}