import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination, Autoplay } from "swiper/modules";
import Projectachievement from "./ProjectAchievement";
import { achievementSlides as slides, personalAchievements as Personal, heroImages } from "../data/achievements";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";

export const Achievement = () => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const years = ['2024-2025', '2025-2026', '2026-2027'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="bg-card dark:bg-card text-foreground transition-colors duration-300 relative overflow-hidden">
      {/* CINEMATIC HERO SECTION */}
      <div className="flex md:min-h-[80vh] justify-center items-center sm:p-8 relative mt-16 sm:mt-0 z-20">
        <div className="relative w-full sm:w-[95%] md:w-[90%] h-[70vh] sm:h-[85vh] rounded-none sm:rounded-[3rem] shadow-2xl">
          {/* Background and Image Wrapper */}
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-none sm:rounded-[3rem]">
            <img
              src={heroImages[selectedYear] || heroImages['2024-2025']}
              alt={`Achievements Hero ${selectedYear}`}
              className="absolute inset-0 h-full w-full object-cover object-[center_30%] scale-105 transition-all duration-700"
              style={{
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
              }}
            />
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10 pt-16 pointer-events-none">
            {/* Floating Badge (8th Best Club) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(254,112,17,0.3)]">
                <span className="text-3xl">🏆</span>
                <p className="text-sm md:text-base font-bold tracking-widest text-white uppercase drop-shadow-md">
                  <span className="text-secondary font-black">8th Best Club</span> in R.I.D 3141
                </p>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-[7rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter drop-shadow-sm select-none uppercase mb-6"
            >
              OUR <br className="md:hidden" />
              <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">
                LEGACY
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 text-sm md:text-xl max-w-3xl text-white/80 font-medium tracking-wide drop-shadow-md mb-8 px-4"
            >
              Celebrating the milestones, awards, and the relentless passion that has defined our journey of service and excellence.
            </motion.p>

            {/* Year Selector Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative z-20 mt-4 flex justify-center pointer-events-auto"
              ref={dropdownRef}
            >
              <div className="relative w-64">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-full py-3 px-6 text-lg border border-white/20 dark:border-white/10 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-xl text-white font-bold outline-none cursor-pointer hover:bg-white/20 transition-all shadow-xl shadow-primary/20 drop-shadow-sm uppercase tracking-widest"
                >
                  <span className="flex-1 text-center">{selectedYear}</span>
                  <ChevronDown
                    className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    size={20}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-3 w-full bg-black/60 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] origin-top z-50 flex flex-col"
                    >
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-center py-4 px-6 font-bold text-base transition-colors duration-300 uppercase tracking-wider
                            ${selectedYear === year
                              ? 'bg-primary/30 text-white shadow-inner'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }
                          `}
                        >
                          {year}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-[10px]">
        {selectedYear === '2026-2027' ? (
          /* COMING SOON SECTION FOR 2026-2027 */
          <div className="w-full flex flex-col items-center justify-center min-h-[50vh] py-20 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-12 md:p-20 shadow-2xl max-w-5xl mx-auto overflow-hidden group"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full z-0 pointer-events-none transition-transform duration-700 group-hover:scale-125" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-full z-0 pointer-events-none transition-transform duration-700 group-hover:scale-125" />

              <div className="relative z-10 flex flex-col items-center">
                <Sparkles className="text-primary mb-6 animate-pulse" size={60} />
                <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase tracking-tighter drop-shadow-lg mb-6 leading-none">
                  Coming Soon
                </h2>
                <div className="w-24 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mb-10 shadow-[0_0_15px_rgba(110,159,159,0.5)]" />

                <h3 className="text-2xl md:text-4xl font-bold text-foreground uppercase tracking-widest mb-4">
                  Wanna be part of RCTCET and write history?
                </h3>
                <p className="text-foreground/70 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12">
                  The achievements for this year are yet to be written. Join us and be the reason our legacy continues to shine brighter than ever.
                </p>

                <a
                  href="#"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white font-black text-xl rounded-full overflow-hidden shadow-[0_10px_30px_rgba(110,159,159,0.4)] hover:shadow-[0_15px_40px_rgba(110,159,159,0.6)] transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10 uppercase tracking-widest">BE A PART OF RC TCET!</span>
                  <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" size={24} />
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 z-0" />
                </a>
              </div>
            </motion.div>
          </div>
        ) : (
          /* REGULAR ACHIEVEMENT CONTENT FOR OTHER YEARS */
          <>
            {/* CLUB ACHIEVEMENT */}
            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] mt-[5vh] mb-16 font-black bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 bg-clip-text text-transparent text-center tracking-tighter uppercase drop-shadow-sm">
              CLUB ACHIEVEMENT
            </h2>
            <div
              className="w-full flex flex-col lg:flex-row items-center justify-around h-auto lg:h-[600px] bg-transparent p-6 relative max-w-7xl mx-auto"
            >
              <div className="w-full lg:w-[55%] mb-10 lg:mb-0 relative flex justify-center perspective-1000">
                <div className="w-full aspect-[16/9] rounded-3xl p-2 sm:p-3 bg-white/40 dark:bg-black/20 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:-translate-y-2">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    className="achievement-swiper w-full h-full rounded-2xl overflow-hidden"
                  >
                    {slides.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative w-full h-full group">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end">
                            <p className="text-center w-full text-white py-8 px-6 font-bold text-lg md:text-xl drop-shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="w-full lg:w-[40%] flex flex-col justify-center items-center lg:items-start p-6 lg:pl-16">
                <h2 className="text-5xl lg:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-center lg:text-left drop-shadow-sm uppercase">
                  Dashak
                </h2>

                <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mb-10 shadow-[0_0_15px_rgba(110,159,159,0.5)]" />

                <div className="flex flex-col items-center lg:items-start bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl rounded-3xl p-8 sm:p-10 max-w-lg transition-transform hover:-translate-y-2 w-full">
                  <p className="text-lg md:text-2xl font-medium text-foreground dark:text-foreground text-center lg:text-left leading-relaxed">
                    <span className="font-black text-primary block mb-3 text-3xl">10th District Assembly</span>
                    <span className="font-bold text-secondary block mb-3 text-xl">& Aara Night</span>
                    <span className="block font-bold">26th July 2025</span>
                    <span className="text-muted mt-4 block text-base font-semibold">by Rotaract District 3141 Dashak</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Achievement */}
            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] mt-[15vh] mb-16 font-black bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 bg-clip-text text-transparent text-center tracking-tighter uppercase drop-shadow-sm">
              Personal Achievement
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-7xl mx-auto px-4 md:px-8">
              {Personal.map((item, index) => (
                <div key={index} className="relative w-full aspect-video md:aspect-[4/3] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl shadow-primary/5 border border-white/40 dark:border-white/10">
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/40 z-0" />

                  {/* Full Bleed Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                  />

                  {/* Deep Bottom Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 z-10 pointer-events-none" />

                  {/* Glowing Border on Hover */}
                  <div className="absolute inset-0 rounded-[2.5rem] border-[3px] border-primary/0 group-hover:border-primary/50 transition-colors duration-500 z-20 pointer-events-none" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col justify-end z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 shadow-[0_0_10px_rgba(110,159,159,0.5)]" />
                    <h3 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight drop-shadow-lg uppercase tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-white/90 font-bold text-sm sm:text-base tracking-wide drop-shadow-md">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Projectachievement selectedYear={selectedYear} />
          </>
        )}
      </div>
    </section>
  );
};
