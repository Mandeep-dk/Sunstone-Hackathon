import { useState, useEffect } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

export default function PostRegistration({ teamName }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return {
            ...prev,
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
              <span className="font-semibold text-[#003d82]">
                {teamName}
              </span>{' '}
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
              <p className="text-sm text-gray-600">
                March 15, 2024 at 9:00 AM
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div
                  key={unit}
                  className="bg-gradient-to-br from-[#003d82] to-[#0052a8] rounded-lg p-4 text-white text-center"
                >
                  <div className="text-3xl font-bold">
                    {timeLeft[unit]}
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
            <h3 className="font-semibold text-gray-900 text-lg">
              What's Next?
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#003d82] mr-2">•</span>
                <span>
                  Check your email for registration confirmation and event details
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#003d82] mr-2">•</span>
                <span>
                  Join our Discord server for updates and communication
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#003d82] mr-2">•</span>
                <span>
                  Prepare your development environment and tools
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#003d82] mr-2">•</span>
                <span>
                  Review the rules and guidelines in the event details
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Reminder */}
        <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-[#003d82]">
          <h3 className="font-semibold text-gray-900 mb-2">
            Important Reminder
          </h3>
          <p className="text-gray-700">
            Make sure all team members are available during the hackathon dates
            (March 15–17, 2024). The problem statement will be revealed at the
            opening ceremony.
          </p>
        </div>
      </div>
    </div>
  );
}