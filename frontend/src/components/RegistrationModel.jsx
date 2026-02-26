import { useState } from 'react';
import { X } from 'lucide-react';

export default function RegistrationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    members: ['', '', '', ''],
    emails: ['', '', '', ''],
    phones: ['', '', '', ''],
  });

  if (!isOpen) return null;

  const handleChange = (index, field, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.members.some((m) => m === '')) {
      alert('All 4 members are required');
      return;
    }

    const payload = {
      teamName: formData.teamName,
      member1: formData.members[0], email1: formData.emails[0], phone1: formData.phones[0],
      member2: formData.members[1], email2: formData.emails[1], phone2: formData.phones[1],
      member3: formData.members[2], email3: formData.emails[2], phone3: formData.phones[2],
      member4: formData.members[3], email4: formData.emails[3], phone4: formData.phones[3],
    };

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbyJLeP7Q3Lh70nxm38esfgzKeyCotMmZzvu9CDglyurtl5Vhrt4MZpSK8-S3hx17010/exec',
        { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) }
      );
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Register Your Team</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Team Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Null Pointers"
            />
          </div>

          {/* Members */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Team Members <span className="text-red-500">*</span>
              <span className="text-gray-400 font-normal ml-1">(4 required)</span>
            </label>
            <div className="space-y-4">
              {formData.members.map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {i === 0 ? 'Team Leader' : `Member ${i + 1}`}
                  </p>
                  <input
                    type="text"
                    required
                    value={formData.members[i]}
                    onChange={(e) => handleChange(i, 'members', e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none transition-all"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="email"
                      value={formData.emails[i]}
                      onChange={(e) => handleChange(i, 'emails', e.target.value)}
                      placeholder="Email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none transition-all"
                    />
                    <input
                      type="tel"
                      value={formData.phones[i]}
                      onChange={(e) => handleChange(i, 'phones', e.target.value)}
                      placeholder="Phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 w-4 h-4 text-[#003d82] border-gray-300 rounded focus:ring-[#003d82]"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the hackathon rules and code of conduct, and confirm that
              all team members are current college students.
            </label>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitted}
              className={`flex-1 px-6 py-3 rounded-lg transition-colors font-semibold text-white ${
                submitted ? 'bg-green-500 cursor-default' : 'bg-[#003d82] hover:bg-[#002d62]'
              }`}
            >
              {submitted ? "You're registered ✓" : 'Submit Registration'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}