import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Keyboard, Pagination, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Crown, Trophy, Star, Sparkles, Medal } from "lucide-react";

import { projectAchievementsSlider as achievementsSlider, crownsOfTheQuarterDataByYear } from "../data/achievements";

const Projectachievement = ({ selectedYear }) => {
  const [activeTab, setActiveTab] = useState('club'); // 'crown', 'club', 'individual', 'acer'
  const [activeQuarter, setActiveQuarter] = useState('Quarter 1');

  const crownsOfTheQuarterData = crownsOfTheQuarterDataByYear[selectedYear] || crownsOfTheQuarterDataByYear["2024-2025"];

  // Reset tab when year changes, if current tab is acer but acer doesn't exist
  useEffect(() => {
    if (activeTab === 'acer' && !crownsOfTheQuarterData.acer) {
      setActiveTab('club');
    }
  }, [selectedYear, activeTab, crownsOfTheQuarterData]);

  // Tab Content Animations
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <>
      {/* Project Achievement Hero */}
      <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] mt-[15vh] mb-12 font-black bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 bg-clip-text text-transparent text-center tracking-tighter uppercase drop-shadow-sm">
        Project Achievement
      </h2>

      <div className="w-full h-auto bg-transparent p-4 md:p-6 flex justify-center mb-20 relative">
        <div className="grid grid-cols-1 place-items-center max-w-4xl w-full px-2 sm:px-4">
          <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl shadow-primary/5 border border-white/40 dark:border-white/10">
            {/* Full Bleed Image */}
            <div className="absolute inset-0 bg-black/10 dark:bg-black/40 z-0" />
            <img
              src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756821844/DSC02741_oocb84.jpg"
              alt="Project Acer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
            />
            
            {/* Deep Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 z-10 pointer-events-none" />
            
            {/* Glowing Border on Hover */}
            <div className="absolute inset-0 rounded-[2.5rem] border-[3px] border-primary/0 group-hover:border-primary/50 transition-colors duration-500 z-20 pointer-events-none" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col justify-end z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="w-12 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 shadow-[0_0_10px_rgba(110,159,159,0.5)]" />
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight drop-shadow-lg uppercase tracking-tight">
                Project Acer
              </h3>
              <p className="text-white/90 font-bold text-sm sm:text-base tracking-wide line-clamp-2 group-hover:line-clamp-none transition-all duration-500 drop-shadow-md">
                Outstanding Social Media Campaign – Young Entrepreneurs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Crowns of Quarter - Cinematic Tab Section */}
      <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] mt-[10vh] mb-12 font-black bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 bg-clip-text text-transparent text-center tracking-tighter uppercase drop-shadow-sm flex items-center justify-center gap-4">
        Crowns of Quarter
      </h2>

      <div className="w-full flex justify-center mb-16 px-4">
        <div className="flex flex-col items-center gap-4 bg-white/10 dark:bg-black/20 p-4 sm:p-6 rounded-[2.5rem] border border-white/20 backdrop-blur-xl w-fit mx-auto shadow-2xl">
          
          {/* Top Row: Club Nominations */}
          <div className="flex justify-center w-full">
            <button
              onClick={() => setActiveTab('club')}
              className={`relative flex items-center justify-center gap-3 px-8 py-4 rounded-3xl font-black text-sm sm:text-base uppercase tracking-widest transition-all duration-500 w-full sm:w-auto ${
                activeTab === 'club'
                  ? 'text-white'
                  : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
              }`}
            >
              {activeTab === 'club' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl shadow-[0_0_20px_rgba(110,159,159,0.4)] z-0"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Trophy size={22} />
                Club Nominations
              </span>
            </button>
          </div>

          {/* Bottom Row: Crown, Individual, Acer */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full">
            <button
              onClick={() => setActiveTab('crown')}
              className={`relative flex items-center justify-center gap-3 px-6 py-4 rounded-3xl font-bold text-sm sm:text-base uppercase tracking-widest transition-all duration-500 w-full sm:w-auto ${
                activeTab === 'crown'
                  ? 'text-white'
                  : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
              }`}
            >
              {activeTab === 'crown' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl shadow-[0_0_20px_rgba(110,159,159,0.4)] z-0"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Crown size={20} />
                Crown of Quarter
              </span>
            </button>

            <button
              onClick={() => setActiveTab('individual')}
              className={`relative flex items-center justify-center gap-3 px-6 py-4 rounded-3xl font-bold text-sm sm:text-base uppercase tracking-widest transition-all duration-500 w-full sm:w-auto ${
                activeTab === 'individual'
                  ? 'text-white'
                  : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
              }`}
            >
              {activeTab === 'individual' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl shadow-[0_0_20px_rgba(110,159,159,0.4)] z-0"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Star size={20} />
                Individual Nominations
              </span>
            </button>

            {crownsOfTheQuarterData.acer && (
              <button
                onClick={() => setActiveTab('acer')}
                className={`relative flex items-center justify-center gap-3 px-6 py-4 rounded-3xl font-bold text-sm sm:text-base uppercase tracking-widest transition-all duration-500 w-full sm:w-auto ${
                  activeTab === 'acer'
                    ? 'text-white'
                    : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
                }`}
              >
                {activeTab === 'acer' && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl shadow-[0_0_20px_rgba(110,159,159,0.4)] z-0"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Medal size={20} />
                  Acer
                </span>
              </button>
            )}
          </div>

        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 mb-24 min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* CROWN OF QUARTER CONTENT */}
          {activeTab === 'crown' && (
            <motion.div
              key={`crown-${selectedYear}`}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {crownsOfTheQuarterData.crownOfQuarter.map((item, idx) => (
                <motion.div 
                  variants={itemVariants}
                  key={idx} 
                  className="relative group bg-gradient-to-br from-white/40 to-white/10 dark:from-black/40 dark:to-black/10 backdrop-blur-2xl border border-white/40 dark:border-white/10 p-10 rounded-[3rem] shadow-2xl hover:shadow-[0_20px_40px_rgba(110,159,159,0.2)] hover:-translate-y-3 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -right-10 -bottom-10 text-primary/5 group-hover:text-primary/10 transition-all duration-500 rotate-[-15deg] group-hover:rotate-0 group-hover:scale-110">
                    <Crown size={200} strokeWidth={1} />
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between items-center text-center">
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <Crown className="text-primary" size={32} />
                    </div>
                    <div>
                      <h4 className="text-primary font-black text-sm tracking-[0.2em] uppercase mb-4">{item.title}</h4>
                      <p className="text-foreground text-3xl font-bold leading-tight">{item.project}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CLUB NOMINATIONS CONTENT */}
          {activeTab === 'club' && (
            <motion.div
              key={`club-${selectedYear}`}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-12"
            >
              {/* ANNUAL HIGHLIGHT */}
              {crownsOfTheQuarterData.clubNominations["Annual"] && (
                <motion.div 
                  variants={itemVariants}
                  className="w-full bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent backdrop-blur-2xl border border-yellow-500/30 rounded-[3rem] p-10 md:p-14 shadow-[0_0_50px_rgba(234,179,8,0.15)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-10 rotate-12 pointer-events-none">
                     <Trophy size={300} />
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 opacity-[0.03] dark:opacity-10 -rotate-12 pointer-events-none">
                     <Sparkles size={250} />
                  </div>
                  
                  <div className="flex flex-col items-center justify-center text-center mb-12 relative z-10">
                    <Sparkles className="text-yellow-500 mb-6 drop-shadow-md" size={48} />
                    <h4 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 uppercase tracking-[0.2em] drop-shadow-sm">Annual Accolades</h4>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-amber-600 mt-8 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 max-w-6xl mx-auto">
                    {crownsOfTheQuarterData.clubNominations["Annual"].map((item, idx) => (
                      <div key={idx} className="bg-white/60 dark:bg-black/40 backdrop-blur-md border border-yellow-500/20 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-xl hover:border-yellow-500/40 transition-all duration-300 flex flex-col justify-center items-center text-center group">
                        <p className="text-yellow-600 dark:text-yellow-500 font-black text-xs uppercase tracking-widest mb-4 group-hover:scale-105 transition-transform">{item.title}</p>
                        <p className="text-foreground font-bold text-2xl leading-tight">{item.project}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* QUARTERS SUB-TABS */}
              <div className="w-full max-w-5xl mx-auto bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full z-0 pointer-events-none" />
                
                {/* Quarter Navigation */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 relative z-10 border-b border-white/20 dark:border-white/5 pb-6">
                  {Object.keys(crownsOfTheQuarterData.clubNominations)
                    .filter((q) => q !== "Annual")
                    .map((quarter) => (
                    <button
                      key={quarter}
                      onClick={() => setActiveQuarter(quarter)}
                      className={`px-6 py-3 rounded-2xl font-bold text-sm sm:text-base tracking-widest uppercase transition-all duration-300 ${
                        activeQuarter === quarter
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-white/10 dark:bg-white/5 text-foreground/60 hover:bg-white/20 hover:text-foreground'
                      }`}
                    >
                      {quarter}
                    </button>
                  ))}
                </div>

                {/* Quarter Content */}
                <div className="relative z-10 min-h-[250px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeQuarter}-${selectedYear}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {crownsOfTheQuarterData.clubNominations[activeQuarter]?.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-transparent hover:border-primary/30 hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 group">
                          <div className="w-full sm:w-5/12 flex items-center gap-3">
                            <div className="w-2 h-8 bg-primary rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                            <p className="text-primary font-bold text-sm uppercase tracking-widest">{item.title}</p>
                          </div>
                          <div className="w-full sm:w-7/12 sm:text-right">
                            <p className="text-foreground font-bold text-lg sm:text-xl">{item.project}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* INDIVIDUAL NOMINATIONS CONTENT */}
          {activeTab === 'individual' && (
            <motion.div
              key={`individual-${selectedYear}`}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {crownsOfTheQuarterData.individualNominations.map((item, idx) => (
                <motion.div 
                  variants={itemVariants}
                  key={idx} 
                  className="relative bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2rem] p-8 shadow-lg hover:shadow-[0_15px_30px_rgba(110,159,159,0.15)] hover:border-primary/40 hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 relative z-10 shadow-inner">
                    <Star className="text-primary" size={28} />
                  </div>
                  
                  <div className="relative z-10 w-full flex flex-col h-full justify-center">
                    <p className="text-[0.65rem] font-black text-primary uppercase tracking-widest mb-3 flex items-center justify-center line-clamp-2 min-h-[2rem]">{item.title}</p>
                    <p className="text-foreground font-bold text-xl leading-tight">{item.name}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ACER NOMINATIONS CONTENT */}
          {activeTab === 'acer' && crownsOfTheQuarterData.acer && (
            <motion.div
              key={`acer-${selectedYear}`}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {crownsOfTheQuarterData.acer.map((item, idx) => (
                <motion.div 
                  variants={itemVariants}
                  key={idx} 
                  className="relative bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-xl border border-primary/20 rounded-[2rem] p-8 shadow-lg hover:shadow-[0_15px_30px_rgba(110,159,159,0.2)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500 relative z-10 shadow-inner group-hover:text-white text-primary">
                    <Medal size={28} />
                  </div>
                  
                  <div className="relative z-10 w-full flex flex-col h-full justify-center">
                    <p className="text-[0.7rem] font-black text-primary uppercase tracking-widest mb-3 flex items-center justify-center line-clamp-2 min-h-[2rem]">{item.title}</p>
                    <p className="text-foreground font-bold text-2xl leading-tight">{item.name || item.project}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>


      {/* Achievement Moments Slider */}
      <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] mt-[10vh] mb-16 font-black bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 bg-clip-text text-transparent text-center tracking-tighter uppercase drop-shadow-sm">
        Achievement Moments
      </h2>

      <div className="w-full py-12 relative overflow-hidden mb-12">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={30}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="max-w-7xl mx-auto px-4"
        >
          {achievementsSlider.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex items-center justify-center h-[280px] bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/10 shadow-xl overflow-hidden group">
                <img
                  src={item.image}
                  alt={`Achievement ${item.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export default Projectachievement;
