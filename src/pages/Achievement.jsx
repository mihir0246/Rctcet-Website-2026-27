import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import Projectachievement from "./ProjectAchievement";
import {
  heroImages,
  achievementSlidesByYear,
  bestClubRankByYear,
  districtAssemblyByYear,
  districtEventNameByYear,
} from "../data/achievements";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, ChevronDown, Trophy } from "lucide-react";
import SEO from "../Components/SEO";

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
      <SEO 
        title="Our Legacy & Achievements" 
        description="Discover the legacy, awards, and milestones achieved by the Rotaract Club of TCET (R.I.D 3141). See our outstanding projects, best club ranks, and individual rotaractor achievements." 
      />
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
                <Trophy size={18} className="text-secondary flex-shrink-0" />
                <p className="text-sm md:text-base font-bold tracking-widest text-white uppercase drop-shadow-md">
                  <span className="text-secondary font-black">{bestClubRankByYear[selectedYear] || "Best Club"}</span> in R.I.D 3141
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-primary/10 dark:bg-[#0a0a0a]/80 backdrop-blur-3xl border border-primary/20 dark:border-white/5 rounded-[2.5rem] p-12 md:p-24 shadow-2xl max-w-4xl mx-auto overflow-hidden group"
            >
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-primary font-black text-xs md:text-sm tracking-[0.3em] uppercase mb-8 border border-primary/20 px-5 py-2.5 rounded-full bg-primary/10 dark:bg-primary/5">
                  Chapter 2026-2027
                </span>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground dark:text-white tracking-tighter leading-[1.1] mb-6">
                  Ready to write <br className="md:hidden" />
                  <span className="text-primary">history?</span>
                </h2>

                <p className="text-foreground/70 dark:text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                  The achievements for this year are yet to be written. Join Rotaract Club of TCET, step into the arena, and be the reason our legacy shines brighter than ever.
                </p>

                <a
                  href="#"
                  className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-primary text-white dark:bg-white dark:text-black font-black text-lg rounded-full overflow-hidden hover:scale-105 hover:shadow-[0_0_40px_rgba(254,112,17,0.3)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-500"
                >
                  <span className="relative z-10 uppercase tracking-widest">Be a part of us</span>
                  <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" size={20} />
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
                    {(achievementSlidesByYear[selectedYear] || []).map((item, index) => (
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
                  {districtEventNameByYear[selectedYear] || "Dashak"}
                </h2>

                <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mb-10 shadow-[0_0_15px_rgba(110,159,159,0.5)]" />

                <div className="flex flex-col items-center lg:items-start bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl rounded-3xl p-8 sm:p-10 max-w-lg transition-transform hover:-translate-y-2 w-full">
                  {(() => {
                    const da = districtAssemblyByYear[selectedYear];
                    if (!da) return null;
                    return (
                      <p className="text-lg md:text-2xl font-medium text-foreground dark:text-foreground text-center lg:text-left leading-relaxed">
                        <span className="font-black text-primary block mb-3 text-3xl">{da.title}</span>
                        {da.subtitle && <span className="font-bold text-secondary block mb-3 text-xl">{da.subtitle}</span>}
                        <span className="block font-bold">{da.date}</span>
                        <span className="text-muted mt-4 block text-base font-semibold">{da.by}</span>
                      </p>
                    );
                  })()}
                </div>
              </div>
            </div>

            <Projectachievement selectedYear={selectedYear} />
          </>
        )}
      </div>
    </section>
  );
};
