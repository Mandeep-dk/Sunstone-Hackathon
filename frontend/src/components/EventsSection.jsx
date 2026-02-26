import { Calendar, MapPin, Users } from 'lucide-react';

export default function EventsSection({ onEventClick, onRegisterClick }) {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600">
            Join us in our exciting hackathon event
          </p>
        </div>

        {/* Event Card */}
        <div className="max-w-2xl mx-auto">
          <div
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={onEventClick}
          >
            {/* Event Banner */}
            <div className="h-64 bg-gradient-to-br from-[#003d82] to-[#0052a8] flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-4xl font-bold mb-2">
                  HackStone 1.0
                </h3>
                <p className="text-xl">
                  Innovation Challenge
                </p>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                HackStone 1.0
              </h3>

              {/* Event Meta */}
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
                  <span>Team Size: 2-4 members</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">
                Join us for an exciting 48-hour hackathon where you'll work with your team to solve
                real-world problems. Compete for amazing prizes and showcase your innovative solutions
                to industry experts.
              </p>

              {/* Register Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRegisterClick();
                }}
                className="w-full bg-[#003d82] text-white px-6 py-3 rounded-lg hover:bg-[#002d62] transition-colors font-semibold"
              >
                Register for Hackathon
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}