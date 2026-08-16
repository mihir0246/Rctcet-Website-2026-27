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
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, slides.length]);
  return (
    <div className="bg-white dark:bg-stone-900 flex flex-col items-center justify-center mt-10">
      <div className="w-full max-w-5xl flex max-sm:flex-col justify-center items-center gap-x-4 gap-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-amber-800 to-yellow-400 dark:from-yellow-600 dark:to-yellow-200">Our Latest Endeavours</h1>
        <div className="flex gap-x-2">
          <button onClick={prevSlide} className="bg-amber-50 dark:bg-stone-700 text-black dark:text-stone-200 p-1 md:p-3 rounded-full hover:bg-amber-100 dark:hover:bg-stone-600 transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={nextSlide} className="bg-amber-50 dark:bg-stone-700 text-black dark:text-stone-200 p-1 md:p-3 rounded-full hover:bg-amber-100 dark:hover:bg-stone-600 transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="relative max-w-5xl overflow-hidden rounded-md shadow-lg m-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-orange-500 dark:bg-yellow-400' : 'bg-gray-300 dark:bg-stone-600'}`}>
            </span>
          ))}
        </div>

        <div className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full relative group overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[32rem] object-cover transition-transform duration-700 group-hover:scale-105"
                loading={"lazy"}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-6 md:p-12 text-center backdrop-blur-[2px]">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">{slide.title}</h3>
                <p className="text-sm md:text-lg text-gray-200 max-w-4xl transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out leading-relaxed">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EndeavorsCarousel;
