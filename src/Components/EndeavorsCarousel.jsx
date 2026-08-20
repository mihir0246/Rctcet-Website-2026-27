import { useState, useEffect } from 'react';
import { endeavorSlides as slides } from "../data/endeavors";

const EndeavorsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, slides.length]);

  return (
    <div className="bg-card w-full flex flex-col items-center justify-center pt-24 pb-0 relative overflow-hidden">

      {/* Soft Organic SVG Divider at Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg className="relative block w-full h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-background"></path>
        </svg>
      </div>

      <div className="w-full text-center z-10 mb-12 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-5xl leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tighter drop-shadow-sm select-none uppercase">Our Latest Endeavours</h1>
        <p className="mt-4 text-muted font-medium text-lg">A glimpse into our recent impactful initiatives.</p>
      </div>

      <div
        className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Navigation Arrows inside the image */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 md:pl-10 z-20">
          <button onClick={prevSlide} className="p-3 md:p-4 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 hover:scale-110 transition-all border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 duration-500">
            <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-4 md:pr-10 z-20">
          <button onClick={nextSlide} className="p-3 md:p-4 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 hover:scale-110 transition-all border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-500">
            <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress Bar Indicators */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 overflow-hidden relative ${currentIndex === index ? 'w-8 bg-white/30' : 'w-2 bg-white/40 hover:bg-white/70'}`}>
              {currentIndex === index && !isHovered && (
                <div className="absolute top-0 left-0 h-full bg-white w-full animate-[progress_5s_linear]" />
              )}
            </button>
          ))}
        </div>

        <style>
          {`
            @keyframes progress {
                0% { transform: scaleX(0); transform-origin: left; }
                100% { transform: scaleX(1); transform-origin: left; }
            }
            `}
        </style>

        {/* Slides */}
        <div className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full shrink-0 relative overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[10000ms] ease-out"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Advanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 pointer-events-none" />

              {/* Hit Area & Group */}
              <div className="absolute bottom-20 md:bottom-32 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-20 group/card">
                  
                  {/* Stable Hit Box to prevent jitter during animation */}
                  <div className="absolute inset-0 -bottom-8 z-10" />

                  {/* Oversized Full Image Blur (reacts only to card hover) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] backdrop-blur-none group-hover/card:backdrop-blur-md bg-black/0 group-hover/card:bg-black/30 transition-all duration-700 ease-in-out pointer-events-none -z-10" />

                  {/* Content Overlay */}
                  <div className="relative w-full bg-black/20 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl transform translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-700 delay-100 pointer-events-auto text-center flex flex-col items-center z-20">
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-wide drop-shadow-lg">{slide.title}</h3>
                    <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
                    <p className="text-base md:text-xl text-gray-200 leading-relaxed font-medium">{slide.description}</p>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EndeavorsCarousel;
