"use client"

import SEO from "../Components/SEO";
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const TeamPage = () => {
  const [selectedYear, setSelectedYear] = useState("2026-2027")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [filteredMembers, setFilteredMembers] = useState([])
  const [filteredBoDs, setFilteredBoDs] = useState([])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    import(`../data/team/${selectedYear}.js`)
      .then(module => {
        setFilteredMembers(module.teamMembers || []);
        setFilteredBoDs(module.boardOfDirectors || []);
      })
      .catch((e) => {
        console.error("No team data found for year", selectedYear, e);
        setFilteredMembers([]);
        setFilteredBoDs([]);
      });
  }, [selectedYear]);

  const academicYearOptions = Array.from({ length: 2027 - 2017 }, (_, i) => {
    const startYear = 2017 + i
    const endYear = startYear + 1
    return `${startYear}-${endYear}`
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="bg-card dark:bg-card min-h-screen relative overflow-hidden text-foreground pt-24 pb-20">
      <SEO title="Meet the Team" description="Meet the core team and board of directors of the Rotaract Club of TCET." />

      <div className="max-w-[90%] mx-auto flex flex-col justify-center items-center relative z-10">
        
        {/* Cinematic Header & Dropdown */}
        <div className="flex flex-col items-center text-center mb-16 relative w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-[6rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tighter drop-shadow-sm uppercase mb-8"
          >
            OUR <br className="md:hidden" />
            <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">
              CORE TEAM
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-20 flex justify-center"
            ref={dropdownRef}
          >
            <div className="relative w-64">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full py-3 px-6 text-lg border border-white/20 dark:border-white/10 rounded-full bg-white/40 dark:bg-black/30 backdrop-blur-xl text-foreground font-bold outline-none cursor-pointer hover:bg-white/60 dark:hover:bg-black/50 transition-all shadow-xl shadow-primary/10 drop-shadow-sm uppercase tracking-widest"
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
                    className="absolute top-full left-0 mt-3 w-full bg-white/90 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] origin-top z-50 flex flex-col max-h-64 overflow-y-auto custom-scrollbar"
                  >
                    {academicYearOptions.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-center py-4 px-6 font-bold text-base transition-colors duration-300 uppercase tracking-wider shrink-0
                          ${selectedYear === year 
                            ? 'bg-primary/20 dark:bg-primary/30 text-primary dark:text-white shadow-inner' 
                            : 'text-foreground/80 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground'
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

        {/* CORE TEAM CARDS */}
        {filteredMembers.length > 0 && (
          <div className="w-full max-w-7xl">
            <motion.div 
              key={`core-${selectedYear}`} 
              variants={containerVariants} 
              initial="hidden" 
              animate="visible" 
              viewport={{ once: true, margin: "-50px" }} 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14"
            >
              {filteredMembers.map((member, index) => (
                <motion.div
                  variants={itemVariants}
                  key={index}
                  className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-primary/5 border border-white/40 dark:border-white/10"
                >
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/40 z-0" />
                  
                  {/* Full Bleed Image */}
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                    loading="lazy"
                  />
                  
                  {/* Deep Bottom Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10 pointer-events-none" />
                  
                  {/* Glowing Border on Hover */}
                  <div className="absolute inset-0 rounded-3xl border-[3px] border-primary/0 group-hover:border-primary/50 transition-colors duration-500 z-20 pointer-events-none" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col justify-end z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-center">
                    <div className="w-12 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 shadow-[0_0_10px_rgba(110,159,159,0.5)]" />
                    <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 uppercase drop-shadow-lg leading-tight tracking-tight">
                      {member.role}
                    </h2>
                    <p className="text-white/90 font-bold text-lg sm:text-xl tracking-wide drop-shadow-md">
                      {member.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* BOARD OF DIRECTORS */}
      {filteredBoDs.length > 0 && (
        <div className="mt-40 mb-10 w-full max-w-[90%] mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center text-4xl md:text-5xl lg:text-[4.5rem] font-black my-16 bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 bg-clip-text text-transparent uppercase tracking-tighter drop-shadow-sm leading-tight"
          >
            Board of <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">Directors</span>
          </motion.h1>

          <div className="w-full max-w-7xl mx-auto">
            <motion.div 
              key={`bod-${selectedYear}`} 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }} 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14"
            >
              {filteredBoDs.map((bod, index) => (
                <motion.div
                  variants={itemVariants}
                  key={index}
                  className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-primary/5 border border-white/40 dark:border-white/10"
                >
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/40 z-0" />
                  
                  {/* Full Bleed Image */}
                  <img
                    src={bod.image || "/placeholder.svg"}
                    alt={bod.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                  />
                  
                  {/* Deep Bottom Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10 pointer-events-none" />
                  
                  {/* Glowing Border on Hover */}
                  <div className="absolute inset-0 rounded-3xl border-[3px] border-primary/0 group-hover:border-primary/50 transition-colors duration-500 z-20 pointer-events-none" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col justify-end z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-center">
                    <div className="w-12 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 shadow-[0_0_10px_rgba(110,159,159,0.5)]" />
                    <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 uppercase drop-shadow-lg leading-tight tracking-tight">
                      {bod.role}
                    </h2>
                    <p className="text-white/90 font-bold text-lg sm:text-xl tracking-wide drop-shadow-md">
                      {bod.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamPage
