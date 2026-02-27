import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/Hero';
import EventsSection from './components/EventsSection';
import HackathonDetail from './components/HackathonDetail';
import PostRegistration from './components/PostRegistration';
import RegistrationModel from './components/RegistrationModel';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function App() {
  const [currentPage, setCurrentPage]               = useState('home');
  const [isModalOpen, setIsModalOpen]               = useState(false);
  const [isRegistered, setIsRegistered]             = useState(() => load('hs_registered', false));
  const [registeredTeamName, setRegisteredTeamName] = useState(() => load('hs_teamName', ''));
  const [registeredTeams, setRegisteredTeams]       = useState(() => load('hs_teams', []));

  useEffect(() => { save('hs_registered', isRegistered); },     [isRegistered]);
  useEffect(() => { save('hs_teamName', registeredTeamName); }, [registeredTeamName]);
  useEffect(() => { save('hs_teams', registeredTeams); },       [registeredTeams]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterClick = () => setIsModalOpen(true);
  const handleModalClose    = () => setIsModalOpen(false);

  const handleRegistrationSubmit = (data) => {
    const filledMembers = data.members.filter((m) => m.trim() !== '');
    const totalMembers  = 1 + filledMembers.length;

    const newTeam = {
      teamName: data.teamName,
      leader:   data.teamLeader,
      members:  totalMembers,
    };

    setRegisteredTeams((prev) => [...prev, newTeam]);
    setRegisteredTeamName(data.teamName);
    setIsRegistered(true);
    setIsModalOpen(false);
    setCurrentPage('hackathon-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEventClick = () => {
    setCurrentPage('hackathon-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onNavigate={handleNavigate}
        onRegisterClick={handleRegisterClick}
      />

      {currentPage === 'home' && (
        <>
          <HomePage
            onRegisterClick={handleRegisterClick}
            onNavigate={handleNavigate}
          />
          <EventsSection
            onEventClick={handleEventClick}
            onRegisterClick={handleRegisterClick}
          />
        </>
      )}

      {currentPage === 'events' && (
        <div className="pt-16">
          <EventsSection
            onEventClick={handleEventClick}
            onRegisterClick={handleRegisterClick}
          />
        </div>
      )}

      {currentPage === 'about' && <AboutPage />}

      {currentPage === 'hackathon-detail' && (
        <>
          <HackathonDetail
            onRegisterClick={handleRegisterClick}
            isRegistered={isRegistered}
            registeredTeams={registeredTeams}
          />
          {isRegistered && (
            <PostRegistration teamName={registeredTeamName} />
          )}
        </>
      )}

      <RegistrationModel
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleRegistrationSubmit}
      />
      <Footer />
    </div>
  );
}

export default App;