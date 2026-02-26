import { Target, Users, Lightbulb, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <style>{`
        @keyframes about-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-18px); }
        }
        @keyframes about-orb {
          0%, 100% { transform: translate(0, 0) scale(1);   opacity: 0.18; }
          50%       { transform: translate(25px, -20px) scale(1.1); opacity: 0.28; }
        }
        @keyframes about-grid {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes about-code {
          0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
          15%  { opacity: 0.3; }
          85%  { opacity: 0.15; }
          100% { opacity: 0; transform: translateY(-100px) rotate(8deg); }
        }

        /* Card hover lift */
        .value-card {
          transition: transform 0.3s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s ease, border-color 0.3s;
          border: 2px solid transparent;
        }
        .value-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,61,130,0.14);
          border-color: rgba(0,61,130,0.15);
        }
        .value-card:hover .value-icon {
          background-color: #003d82;
        }
        .value-card:hover .value-icon svg {
          color: white !important;
          stroke: white !important;
        }
        .value-icon {
          transition: background-color 0.3s;
        }

        /* Mission & Why Participate hover */
        .info-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0,61,130,0.12);
        }

        /* Checklist item hover */
        .check-item {
          transition: transform 0.2s ease, color 0.2s;
          cursor: default;
        }
        .check-item:hover {
          transform: translateX(5px);
          color: #003d82;
        }
        .check-item:hover span:first-child {
          font-weight: bold;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">

        {/* ── Hero ── */}
        <div className="relative bg-gradient-to-br from-[#003d82] to-[#0052a8] py-20 overflow-hidden">

          {/* Animated dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px',
              animation: 'about-grid 10s linear infinite',
            }}
          />

          {/* Glowing orbs */}
          {[
            { w: 340, h: 340, top: '-100px', left: '-100px', delay: '0s' },
            { w: 260, h: 260, top: '50%',    left: '75%',   delay: '3s' },
            { w: 200, h: 200, top: '10%',    left: '55%',   delay: '6s' },
          ].map((orb, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: orb.w,
                height: orb.h,
                top: orb.top,
                left: orb.left,
                background: 'radial-gradient(circle, rgba(255,255,255,0.13) 0%, transparent 70%)',
                animation: `about-orb 8s ease-in-out ${orb.delay} infinite`,
              }}
            />
          ))}

          {/* Floating code tags */}
          {['</>','{…}','01','&&','=>','[ ]','AI','ML','API','git'].map((tag, i) => (
            <div
              key={tag}
              className="absolute font-mono text-xs font-bold text-white pointer-events-none select-none"
              style={{
                left: `${5 + (i * 9.5) % 88}%`,
                top: `${15 + (i * 15) % 70}%`,
                opacity: 0,
                animation: `about-code ${9 + (i % 4)}s ease-in-out ${i * 0.8}s infinite`,
              }}
            >
              {tag}
            </div>
          ))}

          {/* Text */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <h1 className="text-5xl font-bold text-white mb-4">About Sunstone Hackathon</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Empowering students to innovate, collaborate, and build solutions for tomorrow
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Mission */}
          <div className="info-card bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sunstone Hackathon is dedicated to fostering innovation and technical excellence among college
              students. We believe in creating platforms where young minds can showcase their creativity,
              learn from industry experts, and develop solutions that make a real impact on society.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { Icon: Target,    title: 'Innovation',    desc: 'Encouraging creative thinking and novel solutions to real-world problems' },
              { Icon: Users,     title: 'Collaboration', desc: 'Building teamwork skills and fostering connections among peers' },
              { Icon: Lightbulb, title: 'Learning',      desc: 'Providing hands-on experience and mentorship from industry professionals' },
              { Icon: Award,     title: 'Recognition',   desc: 'Celebrating excellence and providing opportunities for talented students' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="value-card bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="value-icon inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-[#003d82]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>

          {/* Why Participate */}
          <div className="info-card bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Participate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">For Students</h3>
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Gain practical coding experience',
                    'Network with industry professionals',
                    'Win prizes and recognition',
                    'Build your portfolio with real projects',
                  ].map((item) => (
                    <li key={item} className="check-item flex items-start">
                      <span className="text-[#003d82] mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">For Teams</h3>
                <ul className="space-y-2 text-gray-600">
                  {[
                    'Collaborate on challenging problems',
                    'Learn from diverse perspectives',
                    'Access to mentorship and guidance',
                    'Create lasting professional connections',
                  ].map((item) => (
                    <li key={item} className="check-item flex items-start">
                      <span className="text-[#003d82] mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}