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

export default function Hero({ onRegisterClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {carouselSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`h-full w-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}
          >
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                {slide.title}
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                {slide.tagline}
              </p>

              <button
                onClick={onRegisterClick}
                className="bg-white text-[#003d82] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}