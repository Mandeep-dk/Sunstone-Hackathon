import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselSlides = [
  {
    id: 1,
    title: 'Sunstone Hackathon 2024',
    tagline: 'Innovate. Code. Transform the Future.',
    gradient: 'from-[#003d82] to-[#0052a8]',
  },
  {
    id: 2,
    title: 'Build Tomorrow Today',
    tagline: 'Join the brightest minds in solving real-world challenges.',
    gradient: 'from-[#0052a8] to-[#003d82]',
  },
  {
    id: 3,
    title: 'Your Ideas Matter',
    tagline: 'Showcase your talent and win amazing prizes.',
    gradient: 'from-[#002d62] to-[#003d82]',
  },
];

// Floating particle data — fixed so it doesn't regenerate on re-render
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 4,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: 6 + Math.random() * 10,
  delay: Math.random() * 6,
  opacity: 0.15 + Math.random() * 0.45,
}));

const CODE_TAGS = ['</>','{}','01','&&','=>','[ ]','def','git','npm','API','AI','ML'];

export default function Hero({ onRegisterClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <>
      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-120px) translateX(20px); opacity: 0; }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          33%       { transform: translate(30px, -20px); }
          66%       { transform: translate(-20px, 15px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 0.30; transform: scale(1.08); }
        }
        @keyframes code-float {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          15%  { opacity: 0.35; }
          85%  { opacity: 0.2; }
          100% { transform: translateY(-160px) rotate(12deg); opacity: 0; }
        }
        @keyframes slide-fade-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative h-[600px] overflow-hidden">
        {/* ── Slide backgrounds ── */}
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-br ${slide.gradient} ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* ── Dot-grid overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* ── Glowing orbs ── */}
        {[
          { w: 320, h: 320, top: '-80px', left: '-80px', delay: '0s' },
          { w: 260, h: 260, top: '60%',  left: '70%',   delay: '2s' },
          { w: 180, h: 180, top: '20%',  left: '50%',   delay: '4s' },
        ].map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orb.w,
              height: orb.h,
              top: orb.top,
              left: orb.left,
              background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
              animation: `pulse-glow 6s ease-in-out infinite, drift 14s ease-in-out infinite`,
              animationDelay: orb.delay,
            }}
          />
        ))}

        {/* ── Floating particles ── */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              animation: `float-up ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* ── Floating code tags ── */}
        {CODE_TAGS.map((tag, i) => (
          <div
            key={tag}
            className="absolute font-mono text-xs font-bold text-white pointer-events-none select-none"
            style={{
              left: `${5 + (i * 8.5) % 90}%`,
              top: `${20 + (i * 13) % 65}%`,
              opacity: 0,
              animation: `code-float ${8 + (i % 4) * 2}s ease-in-out ${i * 0.7}s infinite`,
            }}
          >
            {tag}
          </div>
        ))}

        {/* ── Slide content ── */}
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div
              className="text-center text-white px-4 max-w-4xl relative z-10"
              style={
                index === currentSlide
                  ? { animation: 'slide-fade-in 0.6s ease-out both' }
                  : {}
              }
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow">
                {slide.tagline}
              </p>
              <button
                onClick={onRegisterClick}
                className="bg-white text-[#003d82] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                Register Now
              </button>
            </div>
          </div>
        ))}

        {/* ── Navigation ── */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/35 text-white p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/35 text-white p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* ── Indicators ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}