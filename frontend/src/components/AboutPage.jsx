import { Target, Users, Lightbulb, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#003d82] to-[#0052a8] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            About Sunstone Hackathon
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Empowering students to innovate, collaborate, and build solutions for tomorrow
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Sunstone Hackathon is dedicated to fostering innovation and technical excellence among college
            students. We believe in creating platforms where young minds can showcase their creativity,
            learn from industry experts, and develop solutions that make a real impact on society.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Target className="w-8 h-8 text-[#003d82]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              Encouraging creative thinking and novel solutions to real-world problems
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-[#003d82]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h3>
            <p className="text-gray-600">
              Building teamwork skills and fostering connections among peers
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lightbulb className="w-8 h-8 text-[#003d82]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Learning</h3>
            <p className="text-gray-600">
              Providing hands-on experience and mentorship from industry professionals
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Award className="w-8 h-8 text-[#003d82]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Recognition</h3>
            <p className="text-gray-600">
              Celebrating excellence and providing opportunities for talented students
            </p>
          </div>
        </div>

        {/* Why Participate */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Participate?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                For Students
              </h3>
              <ul className="space-y-2 text-gray-600">
                {[
                  'Gain practical coding experience',
                  'Network with industry professionals',
                  'Win prizes and recognition',
                  'Build your portfolio with real projects',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#003d82] mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                For Teams
              </h3>
              <ul className="space-y-2 text-gray-600">
                {[
                  'Collaborate on challenging problems',
                  'Learn from diverse perspectives',
                  'Access to mentorship and guidance',
                  'Create lasting professional connections',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
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
  );
}