import SEO from "../Components/SEO";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";


function Projects() {
  // This automatically finds all .js files inside the projects data folder!
  const projectFiles = import.meta.glob('../data/projects/*.js');

  // It extracts just the year names (like "2025-2026"), sorts them, and puts the newest first
  const academicYearOptions = Object.keys(projectFiles)
    .map(path => path.split('/').pop().replace('.js', ''))
    .sort()
    .reverse();
  const [selectedYear, setSelectedYear] = useState(academicYearOptions[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const [sections, setSections] = useState([]);
  const [activeTab, setActiveTab] = useState();
  const [heroImage, setHeroImage] = useState("https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_1200,c_limit/v1756821756/DSC02604_jmaoow.jpg");

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
    import(`../data/projects/${selectedYear}.js`)
      .then(module => {
        const newSections = module.projects || [];
        setSections(newSections);
        if (module.heroImage) setHeroImage(module.heroImage);
        if (newSections.length > 0) setActiveTab(newSections[0].id);
      })
      .catch(e => {
        console.error("No projects data found for year", selectedYear, e);
        setSections([]);
      });
  }, [selectedYear]);
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateArrows = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    };

    updateArrows();
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleWindowScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio (highest first) to prioritize the most visible section
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveTab(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-150px 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((sec) => {
      const sectionEl = document.getElementById(sec.id);
      if (sectionEl) observer.observe(sectionEl);
    });

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
      window.removeEventListener("scroll", handleWindowScroll);
      observer.disconnect();
    };
  }, [sections]);

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (activeTab && scrollRef.current) {
      const activeEl = scrollRef.current.querySelector(`[href="#${activeTab}"]`);
      if (activeEl) {
        const container = scrollRef.current;
        const scrollLeft = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeTab]);

  return (
    <div className="scroll-smooth bg-card dark:bg-card min-h-screen">
      <SEO title="Our Projects" description="Explore our latest endeavors and community service projects." />
      {/* HERO — UPDATED TO CHEF'S KISS AESTHETIC */}
      <div className="flex md:min-h-[70vh] justify-center items-center sm:p-8 relative">
        <div className="relative w-full sm:w-[95%] md:w-[90%] h-[60vh] sm:h-[80vh] overflow-hidden rounded-none sm:rounded-3xl shadow-2xl">
          <img
            src={heroImage}
            alt={`Projects ${selectedYear}`}
            className="absolute inset-0 h-full w-full object-cover object-[center_70%] scale-105 transition-all duration-700"
            style={{
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
            }}
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-[5rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter drop-shadow-sm select-none uppercase mb-4"
            >
              EXPLORE OUR <br className="md:hidden" />
              <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">
                PROJECTS
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-2 text-sm md:text-lg max-w-2xl text-white/80 font-medium tracking-wide drop-shadow-md mb-8"
            >
              Discover the transformative initiatives that define our commitment to positive change in the community.
            </motion.p>

            <div className="absolute top-6 right-6 sm:top-10 sm:right-10 z-20 flex justify-end" ref={dropdownRef}>
              <div className="relative w-48 sm:w-56">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-full py-2.5 px-5 text-sm sm:text-base border border-white/20 rounded-full bg-black/30 backdrop-blur-xl text-white font-bold outline-none cursor-pointer hover:bg-black/50 transition-all shadow-xl shadow-black/20 uppercase tracking-widest"
                >
                  <span className="flex-1 text-center">{selectedYear}</span>
                  <ChevronDown 
                    className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    size={18} 
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-2 w-full bg-black/60 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] origin-top-right z-50 flex flex-col max-h-64 overflow-y-auto custom-scrollbar"
                    >
                      {academicYearOptions.map((year) => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-center py-3 px-5 font-bold text-sm sm:text-base transition-colors duration-300 uppercase tracking-wider shrink-0
                            ${selectedYear === year 
                              ? 'bg-primary/40 text-white shadow-inner' 
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
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => {
                const element = document.getElementById('projects-list-start');
                if (element) {
                  const top = element.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-300 bg-primary/80 backdrop-blur-md rounded-full hover:bg-primary border border-white/20 shadow-[0_0_20px_rgba(110,159,159,0.3)] hover:shadow-[0_0_30px_rgba(110,159,159,0.6)] hover:-translate-y-1 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 flex items-center gap-2">
                View our Projects!
                <span className="transform transition-transform duration-300 group-hover:translate-y-1">
                  ↓
                </span>
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* LINKS — UPDATED TAB STYLE */}
      <div className="sticky top-[4.5rem] z-40 flex justify-center mt-6 mb-12 transition-all duration-300">
        <div className={`flex justify-center items-center relative bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500 overflow-hidden mx-auto ${isScrolled ? "rounded-b-3xl rounded-t-xl border-t-0 h-14 w-[90vw] md:w-[70vw]" : "rounded-full h-16 w-[95vw] md:w-[85vw]"}`}>
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-0 h-full px-4 bg-gradient-to-r from-white/90 dark:from-black/60 to-transparent z-30 flex items-center"
            >
              <span className={`text-muted transition-all ${isScrolled ? "text-xs" : "text-sm"}`}>
                ❮
              </span>
            </button>
          )}

          {/* Scroll Container */}
          <nav
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide font-medium px-8 space-x-8 h-full items-center w-full"
          >
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(sec.id).scrollIntoView({ behavior: 'smooth' });
                  setActiveTab(sec.id);
                }}
                className={`relative whitespace-nowrap h-full flex items-center transition-all duration-300 px-2 ${isScrolled ? "text-xs" : "text-sm md:text-base"}
            ${activeTab === sec.id
                    ? "text-primary dark:text-primary font-bold drop-shadow-sm"
                    : "text-muted hover:text-primary dark:text-white/60 dark:hover:text-white"
                  }
          `}
              >
                {sec.title}

                {activeTab === sec.id && (
                  <span className="absolute left-0 bottom-0 h-[3px] w-full bg-primary dark:bg-primary rounded-full shadow-[0_0_10px_rgba(110,159,159,0.5)]" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-0 h-full px-4 bg-gradient-to-l from-white/90 dark:from-black/60 to-transparent z-30 flex items-center"
            >
              <span className={`text-muted transition-all ${isScrolled ? "text-xs" : "text-sm"}`}>
                ❯
              </span>
            </button>
          )}
        </div>
      </div>

      {/* NEW SLIDER SECTIONS */}
      <div id="projects-list-start" className="p-6 space-y-20">
        {sections.map((section, index) => (
          <SliderSection key={section.id} section={section} index={index} />
        ))}
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tighter drop-shadow-sm uppercase mb-6 leading-tight">
          Wanna be a <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">part of RCTCET?</span>
        </h2>
        <p className="text-lg md:text-xl text-muted font-medium mb-10 max-w-2xl">
          Join us in making a difference! Get in touch with us to learn more about our upcoming initiatives and how you can contribute.
        </p>
        <Link
          to="/feedback"
          className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-black text-white transition-all duration-300 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_10px_30px_rgba(110,159,159,0.4)] hover:shadow-[0_15px_40px_rgba(110,159,159,0.6)] hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest drop-shadow-sm">
            Get in Touch With Us
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </span>
          <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 z-0" />
        </Link>
      </div>
    </div>
  );
}

export default Projects;

/* ---------------- Slider Component ---------------- */

function SliderSection({ section, index }) {
  const [current, setCurrent] = useState(0);
  const total = section.projects.length;
  const project = section.projects[current];

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));

  useEffect(() => {
    if (total <= 1) return;

    let intervalId;
    // offset each slider's initial interval start by 1.2s * index
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCurrent((prev) => (prev + 1) % total);
      }, 5000);
    }, (index || 0) * 1200);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [total, index]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section
      id={section.id}
      className="scroll-mt-[9rem] relative"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="absolute -top-20 left-0 w-full h-40 bg-gradient-to-b from-primary/5 to-transparent blur-3xl pointer-events-none" />

      <h2 className="text-4xl md:text-5xl lg:text-6xl text-center font-black mb-12 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 uppercase tracking-tight drop-shadow-sm">
        {section.title}
      </h2>

      <div className="relative max-w-6xl mx-auto group perspective-1000">
        <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-2xl shadow-primary/5 p-4 sm:p-8 transition-transform duration-500 hover:-translate-y-2">

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-card border border-white/40 dark:border-white/10 rounded-full shadow-lg text-primary z-20 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                ❮
              </button>
              <button
                onClick={next}
                className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-card border border-white/40 dark:border-white/10 rounded-full shadow-lg text-primary z-20 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                ❯
              </button>
            </>
          )}

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Image */}
            <div className="w-full md:w-1/2 overflow-hidden rounded-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none z-10 mix-blend-overlay" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="text-3xl lg:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight">
                {project.title}
              </h3>

              <div className="space-y-6 text-foreground/90 dark:text-muted">
                <div>
                  <p className="text-xs tracking-widest uppercase font-bold text-primary mb-2">Objective</p>
                  <p className="text-sm md:text-base leading-relaxed font-medium">
                    {project.objective}
                  </p>
                </div>

                <div>
                  <p className="text-xs tracking-widest uppercase font-bold text-primary mb-2">Impact</p>
                  <ul className="list-disc list-inside text-sm md:text-base space-y-1.5 font-medium marker:text-primary">
                    {project.impact.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-start mt-8">
                <a
                  href={project.drivelink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold rounded-xl transition-all duration-300"
                >
                  View Drive
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Dots */}
          {total > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              {section.projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${current === index
                    ? "w-8 bg-gradient-to-r from-primary to-secondary"
                    : "w-2.5 bg-muted/30 hover:bg-primary/50"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}