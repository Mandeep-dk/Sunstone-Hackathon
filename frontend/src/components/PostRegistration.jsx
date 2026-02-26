import { useState, useEffect } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

// ── Fixed target: March 15, 2026 at 9:00 AM IST (UTC+5:30) ──────────────────
// Change this date to match your actual problem-statement release time.
const TARGET_DATE = new Date('2026-03-01T09:00:00+05:30');

function getTimeLeft() {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days:    Math.floor(totalSeconds / 86400),
    hours:   Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export default function PostRegistration({ teamName }) {
  // Initialise from real time — not a hardcoded 15d/8h/45m/30s
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Registration Successful!
            </h2>
            <p className="text-lg text-gray-600">
              Team{' '}
              <span className="font-semibold text-[#003d82]">{teamName}</span>{' '}
              has been registered
            </p>
          </div>

          {/* Countdown */}
          <div className="border-t border-b py-6 mb-6">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-[#003d82]" />
                <p className="font-semibold text-gray-900">
                  Problem Statement Release Countdown
                </p>
              </div>
              <p className="text-sm text-gray-600">March 1, 2026 at 9:00 AM</p>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div
                  key={unit}
                  className="bg-gradient-to-br from-[#003d82] to-[#0052a8] rounded-lg p-4 text-white text-center"
                >
                  <div className="text-3xl font-bold tabular-nums">
                    {pad(timeLeft[unit])}
                  </div>
                  <div className="text-sm opacity-90">
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4 text-gray-600">
            <h3 className="font-semibold text-gray-900 text-lg">What's Next?</h3>
            <ul className="space-y-2">
              {[
                'Check your email for registration confirmation and event details',
                'Join our Discord server for updates and communication',
                'Prepare your development environment and tools',
                'Review the rules and guidelines in the event details',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <span className="text-[#003d82] mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reminder */}
        <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-[#003d82]">
          <h3 className="font-semibold text-gray-900 mb-2">Important Reminder</h3>
          <p className="text-gray-700">
            Make sure all team members are available during the hackathon dates
            (March 15–17, 2026). The problem statement will be revealed at the
            opening ceremony.
          </p>
        </div>
      </div>
    </div>
  );
}