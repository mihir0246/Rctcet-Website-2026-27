import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Crown, Trophy, Star, User, Layers } from "lucide-react";
import {
  personalAchievementsByYear,
  achievementMomentsByYear,
  crownsOfTheQuarterDataByYear,
} from "../data/achievements";

const SectionTitle = ({ children }) => (
  <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] mt-[12vh] mb-12 font-black bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 bg-clip-text text-transparent text-center tracking-tighter uppercase drop-shadow-sm">
    {children}
  </h2>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06 },
  }),
};

/* ── component ───────────────────────────────────── */
const Projectachievement = ({ selectedYear }) => {
  const Personal = personalAchievementsByYear[selectedYear] || [];
  const data =
    crownsOfTheQuarterDataByYear[selectedYear] ||
    crownsOfTheQuarterDataByYear["2024-2025"];

  /* project achievements (formerly acer projects) */
  const projectAchievements = data.projectAchievements || [];

  /* nominations state */
  const [nomTab, setNomTab] = useState("project");
  const [activeQuarter, setActiveQuarter] = useState("Quarter 1");

  /* quarter keys — Q1…Q4 + Annual always in same row */
  const quarterKeys = Object.keys(data.clubNominations);

  useEffect(() => {
    setActiveQuarter("Quarter 1");
    setNomTab("project");
  }, [selectedYear]);

  const currentNoms =
    nomTab === "project"
      ? data.clubNominations[activeQuarter] || []
      : data.individualNominations || [];

  return (
    <>
      {/* ════════════════════════════════════════
          1. PERSONAL ACHIEVEMENT
          - existing photo cards (outstanding VP etc.)
          - ACER individual name cards below
      ════════════════════════════════════════ */}
      <SectionTitle>Personal Achievement</SectionTitle>

      {/* photo cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-7xl mx-auto px-4 md:px-8">
        {Personal.filter(item => item.image).map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-full aspect-video md:aspect-[4/3] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl shadow-primary/5 border border-white/30 dark:border-white/10"
          >
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 z-10 pointer-events-none" />
            <div className="absolute inset-0 rounded-[2.5rem] border-[3px] border-primary/0 group-hover:border-primary/50 transition-colors duration-500 z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col justify-end z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="w-10 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-1 leading-tight drop-shadow-lg uppercase tracking-tight">
                {item.name}
              </h3>
              <p className="text-white/80 font-semibold text-sm sm:text-base tracking-wide drop-shadow-md">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ════════════════════════════════════════
          2. PROJECT ACHIEVEMENT
      ════════════════════════════════════════ */}
      {projectAchievements.length > 0 && (
        <>
          <SectionTitle>Project Achievement</SectionTitle>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-7xl mx-auto px-4 md:px-8">
            {projectAchievements.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative w-full md:w-[calc(50%-1.5rem)] max-w-2xl aspect-video md:aspect-[4/3] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl shadow-primary/5 border border-white/30 dark:border-white/10"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-white/5 flex items-center justify-center z-0">
                    <span className="text-white/20 text-sm uppercase tracking-widest">Image Pending</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 z-10 pointer-events-none" />
                <div className="absolute inset-0 rounded-[2.5rem] border-[3px] border-primary/0 group-hover:border-primary/50 transition-colors duration-500 z-20 pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col justify-end z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-10 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                  <h3 className="text-3xl sm:text-4xl font-black text-white mb-1 leading-tight drop-shadow-lg uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-semibold text-sm sm:text-base tracking-wide drop-shadow-md">
                    {item.desc || item.project}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* ════════════════════════════════════════
          3. CROWNS OF THE QUARTER
      ════════════════════════════════════════ */}
      <SectionTitle>Crowns of the Quarter</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4 sm:px-8">
        {data.crownOfQuarter.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group bg-gradient-to-br from-white/40 to-white/10 dark:from-black/40 dark:to-black/10 backdrop-blur-2xl border border-white/40 dark:border-white/10 p-10 rounded-[3rem] shadow-2xl hover:shadow-[0_20px_40px_rgba(110,159,159,0.2)] hover:-translate-y-3 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-8 -bottom-8 text-primary/5 group-hover:text-primary/10 transition-all duration-500 rotate-[-15deg] group-hover:rotate-0 group-hover:scale-110">
              <Crown size={160} strokeWidth={0.8} />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Crown className="text-primary" size={28} />
              </div>
              <p className="text-primary font-black text-xs tracking-[0.2em] uppercase mb-3">
                {item.title}
              </p>
              <p className="text-foreground text-2xl font-bold leading-snug">
                {item.project}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ════════════════════════════════════════
          4. NOMINATIONS  — minimal list
          Tabs: Project | Individual
          Quarter pills: Q1 Q2 Q3 Q4 Annual
      ════════════════════════════════════════ */}
      <SectionTitle>Nominations</SectionTitle>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8">
        {/* Project / Individual tab bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-full p-1.5 gap-1">
            {[
              { id: "project", label: "Project", icon: Trophy },
              { id: "individual", label: "Individual", icon: Star },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setNomTab(id);
                  setActiveQuarter("Quarter 1");
                }}
                className={`flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 ${
                  nomTab === id
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Quarter pills — only for Project tab, Annual in middle */}
        {nomTab === "project" && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {quarterKeys.map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuarter(q)}
                className={`px-5 py-2 rounded-2xl font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 border ${
                  activeQuarter === q
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/20 dark:border-white/10 text-foreground/50 hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${nomTab}-${activeQuarter}-${selectedYear}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col gap-2.5"
          >
            {currentNoms.length === 0 ? (
              <p className="text-center text-foreground/30 py-16 font-medium tracking-widest uppercase text-sm">
                No data for this selection
              </p>
            ) : (
              currentNoms.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 py-3.5 px-5 rounded-2xl bg-white/15 dark:bg-white/5 border border-white/15 dark:border-white/5 hover:border-primary/30 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-250 group"
                >
                  <div className="flex items-center gap-3 sm:w-2/5">
                    <span className="w-1 h-5 rounded-full bg-primary opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    <p className="text-primary font-bold text-[0.7rem] uppercase tracking-widest leading-tight">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-foreground font-semibold text-sm sm:text-base sm:text-right sm:w-3/5 leading-snug pl-4 sm:pl-0">
                    {nomTab === "project" ? item.project : item.name}
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ════════════════════════════════════════
          5. ACHIEVEMENT MOMENTS
      ════════════════════════════════════════ */}
      <SectionTitle>Achievement Moments</SectionTitle>

      <div className="w-full py-4 relative overflow-hidden mb-16">
        <div className="absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          className="max-w-7xl mx-auto px-4"
        >
          {(achievementMomentsByYear[selectedYear] || []).map((item) => (
            <SwiperSlide key={item.id}>
              <div className="h-[260px] rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden group shadow-lg">
                <img
                  src={item.image}
                  alt={`Moment ${item.id}`}
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
