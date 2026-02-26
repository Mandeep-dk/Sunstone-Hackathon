import { useState } from 'react';
import logo from '/sunstone.png';

export default function Navbar({ onNavigate, onRegisterClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img src={logo} alt="Sunstone Logo" className="h-6" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-700 hover:text-[#003d82] transition-colors font-medium"
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('events')}
              className="text-gray-700 hover:text-[#003d82] transition-colors font-medium"
            >
              Events
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="text-gray-700 hover:text-[#003d82] transition-colors font-medium"
            >
              About
            </button>

            <button
              onClick={onRegisterClick}
              className="bg-[#003d82] text-white px-6 py-2 rounded-lg hover:bg-[#002d62] transition-colors font-medium"
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-gray-700 hover:text-[#003d82] transition-colors font-medium"
            >
              Home
            </button>

            <button
              onClick={() => {
                onNavigate('events');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-gray-700 hover:text-[#003d82] transition-colors font-medium"
            >
              Events
            </button>

            <button
              onClick={() => {
                onNavigate('about');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-gray-700 hover:text-[#003d82] transition-colors font-medium"
            >
              About
            </button>

            <button
              onClick={() => {
                onRegisterClick();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full bg-[#003d82] text-white px-6 py-2 rounded-lg hover:bg-[#002d62] transition-colors font-medium"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
