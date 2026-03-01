import { useState, useRef } from 'react';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none transition-all text-sm';

/* ── Moved OUTSIDE to prevent remount on every keystroke ── */
function MemberCard({ label, data, onChange, canRemove, onRemove }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3 relative">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      <input
        type="text"
        required
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
        placeholder="Full name"
        className={inputClass}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="email"
          required
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="Email address"
          className={inputClass}
        />
        <div className="relative">
          <input
            type="tel"
            required
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="WhatsApp number (10 digits)"
            maxLength={10}
            className={`${inputClass} pr-20`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
            {data.phone.length}/10
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RegistrationModel({ isOpen, onClose, onSubmit }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLock = useRef(false);

  const emptyMember = () => ({ name: '', email: '', phone: '' });

  const [teamName, setTeamName] = useState('');
  const [leader, setLeader] = useState(emptyMember());
  // Min 4 total = leader + 3 others → members starts with 3
  // Max 5 total = leader + 4 others → members capped at 4
  const [members, setMembers] = useState([emptyMember(), emptyMember(), emptyMember()]);

  if (!isOpen) return null;

  const sanitizePhone = (v) => v.replace(/\D/g, '').slice(0, 10);
  const sanitizeEmail = (v) => v.replace(/[^a-zA-Z0-9@._+\-]/g, '');

  const updateLeader = (field, value) => {
    const val = field === 'phone' ? sanitizePhone(value) : field === 'email' ? sanitizeEmail(value) : value;
    setLeader((p) => ({ ...p, [field]: val }));
  };

  const updateMember = (i, field, value) => {
    const val = field === 'phone' ? sanitizePhone(value) : field === 'email' ? sanitizeEmail(value) : value;
    setMembers((prev) => prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)));
  };

  // Max 4 extra members (5 total)
  const addMember = () => {
    if (members.length < 4) setMembers((p) => [...p, emptyMember()]);
  };

  // Can only remove if above min of 3 extra (4 total)
  const removeMember = (i) => {
    if (members.length > 3) setMembers((p) => p.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitLock.current || isSubmitting || submitted) return;

    const allMembers = [leader, ...members];
    for (let i = 0; i < allMembers.length; i++) {
      if (allMembers[i].phone && allMembers[i].phone.length !== 10) {
        alert(`Member ${i + 1}: Phone number must be exactly 10 digits.`);
        return;
      }
    }

    submitLock.current = true;
    setIsSubmitting(true);

    const payload = { teamName };
    allMembers.forEach((m, i) => {
      payload[`member${i + 1}`] = m.name;
      payload[`email${i + 1}`]  = m.email;
      payload[`phone${i + 1}`]  = m.phone;
    });

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbxiw3aVaGeGXTi6UXbQHg0DfK-ZoBeImx4O2s9ehNVPWRjneC4aoP9sNfNNAynSO-2W/exec',
        { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) }
      );
      setSubmitted(true);
      if (onSubmit) onSubmit({ teamName, teamLeader: leader.name, members: members.map((m) => m.name) });
    } catch (err) {
      console.error('Submission error:', err);
      alert('Submission failed. Please try again.');
      submitLock.current = false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Register Your Team</h2>
            <p className="text-xs text-gray-400 mt-0.5">Minimum 4 members · Maximum 5 members</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Team Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className={inputClass}
              placeholder="e.g. Null Pointers"
            />
          </div>

          {/* Team Leader */}
          <MemberCard
            label="Team Leader (Member 1)"
            data={leader}
            onChange={updateLeader}
            canRemove={false}
          />

          {/* Dynamic Members */}
          <div className="space-y-4">
            {members.map((m, i) => (
              <MemberCard
                key={i}
                label={`Member ${i + 2}`}
                data={m}
                onChange={(field, val) => updateMember(i, field, val)}
                canRemove={members.length > 3}
                onRemove={() => removeMember(i)}
              />
            ))}
          </div>

          {/* Add Member Button — visible only when below max of 4 extra (5 total) */}
          {members.length < 4 && (
            <button
              type="button"
              onClick={addMember}
              className="w-full py-3 border-2 border-dashed border-[#003d82]/30 text-[#003d82] rounded-lg hover:border-[#003d82]/60 hover:bg-blue-50 transition-all font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Member ({1 + members.length}/5)
            </button>
          )}

          {/* Member count indicator */}
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span>Total members: <strong className="text-gray-600">{1 + members.length}</strong></span>
            <span className={1 + members.length >= 4 ? 'text-green-500 font-medium' : 'text-red-400 font-medium'}>
              {1 + members.length >= 4 ? '✓ Minimum met' : '⚠ Need at least 4 members'}
            </span>
          </div>

          {/* WhatsApp note */}
          <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-xs text-green-700 flex items-center gap-2">
            <span className="text-base">💬</span>
            <span>Please provide active <strong>WhatsApp numbers</strong> — event updates will be sent via WhatsApp.</span>
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
          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                submitted
                  ? 'bg-green-500 cursor-default'
                  : isSubmitting
                  ? 'bg-[#003d82]/70 cursor-not-allowed'
                  : 'bg-[#003d82] hover:bg-[#002d62] active:scale-95'
              }`}
            >
              {submitted ? (
                <>✓ You're Registered!</>
              ) : isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Registration'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}