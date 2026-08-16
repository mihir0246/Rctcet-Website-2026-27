import SEO from "../components/SEO";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";


function Projects() {
  // This automatically finds all .js files inside the projects data folder!
  const projectFiles = import.meta.glob('../data/projects/*.js');

  // It extracts just the year names (like "2025-2026"), sorts them, and puts the newest first
  const academicYearOptions = Object.keys(projectFiles)
    .map(path => path.split('/').pop().replace('.js', ''))
    .sort()
    .reverse();
  const [selectedYear, setSelectedYear] = useState(academicYearOptions[0]);
  const [sections, setSections] = useState([]);
  const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    import(`../data/projects/${selectedYear}.js`)
      .then(module => {
        const newSections = module.projects || [];
        setSections(newSections);
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
    <div className="scroll-smooth bg-white dark:bg-stone-900 min-h-screen">
      <SEO title="Our Projects" description="Explore our latest endeavors and community service projects." />
      {/* HERO — UNCHANGED */}
      <div className="flex md:min-h-[60vh] justify-center items-center sm:p-8 relative">
        <div className="relative w-full sm:w-[90%] md:w-[80%] h-[60vh] sm:h-[90vh]">
          <img
            src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756821756/DSC02604_jmaoow.jpg"
            alt="Projects"
            className="h-full w-full object-cover object-[center_95%] rounded-xl"
          />
          <div className="absolute inset-0 bg-black/50 rounded-xl" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              EXPLORE OUR{" "}
              <span className="text-orange-500 dark:text-yellow-400">
                PROJECTS
              </span>
            </h2>
            <p className="mt-2 text-sm md:text-base max-w-lg">
              Discover the transformative initiatives that define our commitment
              to positive change in the community.
            </p>
            <div className="absolute top-4 right-4 z-10">
              <select
                className="p-2 border-2 border-orange-500 rounded-full bg-white/10 backdrop-blur-md text-white font-bold outline-none cursor-pointer hover:bg-white/20 transition appearance-none text-center px-4"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {academicYearOptions.map((year) => (
                  <option key={year} value={year} className="text-black">
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                const element = document.getElementById('projects-list-start');
                if (element) {
                  const top = element.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
              className="mt-6 bg-orange-500 dark:bg-yellow-600 hover:bg-orange-600 dark:hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition"
            >
              View our Projects!
            </button>
          </div>
        </div>
      </div>

      {/* LINKS — UPDATED TAB STYLE */}
      <div className="sticky top-[4.5rem] z-40 flex justify-center mt-2 mb-8 transition-all duration-300">
        <div className={`flex justify-center items-center relative bg-white/70 backdrop-blur-xl dark:bg-[#1A1612]/70 border border-stone-200 dark:border-stone-700/50 shadow-lg transition-all duration-500 overflow-hidden mx-auto ${isScrolled ? "rounded-b-3xl rounded-t-xl border-t-0 h-12 w-[90vw] md:w-[65vw]" : "rounded-full h-14 w-[95vw] md:w-[80vw]"}`}>
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-0 h-full px-4 bg-gradient-to-r from-white/90 dark:from-[#1A1612]/90 to-transparent z-30 flex items-center"
            >
              <span className={`text-stone-600 dark:text-stone-300 transition-all ${isScrolled ? "text-xs" : "text-sm"}`}>
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
                    ? "text-orange-600 dark:text-yellow-400 font-bold"
                    : "text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-yellow-400"
                  }
          `}
              >
                {sec.title}

                {activeTab === sec.id && (
                  <span className="absolute left-0 bottom-0 h-[3px] w-full bg-orange-500 dark:bg-yellow-400 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-0 h-full px-4 bg-gradient-to-l from-white/90 dark:from-[#1A1612]/90 to-transparent z-30 flex items-center"
            >
              <span className={`text-stone-600 dark:text-stone-300 transition-all ${isScrolled ? "text-xs" : "text-sm"}`}>
                ❯
              </span>
            </button>
          )}
        </div>
      </div>

      {/* NEW SLIDER SECTIONS */}
      <div id="projects-list-start" className="p-6 space-y-20">
        {sections.map((section) => (
          <SliderSection key={section.id} section={section} />
        ))}
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-800 dark:text-white">
          Wanna be a part of RCTCET?
        </h2>
        <p className="text-lg text-stone-600 dark:text-stone-300 mb-8 max-w-2xl">
          Join us in making a difference! Get in touch with us to learn more about our upcoming initiatives and how you can contribute.
        </p>
        <Link
          to="/feedback"
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-orange-600 rounded-full hover:bg-orange-700 hover:shadow-xl dark:bg-orange-500 dark:hover:bg-orange-600 shadow-orange-500/30 hover:-translate-y-1"
        >
          <span className="relative z-10 flex items-center gap-2">
            Get in Touch With Us
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Projects;

/* ---------------- Slider Component ---------------- */

function SliderSection({ section }) {
  const [current, setCurrent] = useState(0);
  const total = section.projects.length;
  const project = section.projects[current];

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section
      id={section.id}
      className="scroll-mt-[9rem]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-4xl text-center font-bold mb-8 text-orange-600 dark:text-yellow-400">
        {section.title}
      </h2>

      <div className="relative max-w-6xl mx-auto bg-stone-100 dark:bg-stone-800 rounded-3xl shadow-xl p-4 sm:p-8">
        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl text-orange-500 z-10"
            >
              ❮
            </button>
            <button
              onClick={next}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl text-orange-500 z-10"
            >
              ❯
            </button>
          </>
        )}

        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Left Image */}
          <div className="w-full md:w-1/2">
            <img
              src={project.image}
              alt={project.title}
              className="rounded-2xl w-full h-80 object-cover shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 bg-white dark:bg-stone-700 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-yellow-400">
              {project.title}
            </h3>

            <p className="font-semibold text-gray-900 dark:text-stone-100">
              Objective:
            </p>
            <p className="mb-4 text-[11px] md:text-[16px] text-gray-700 dark:text-stone-300">
              {project.objective}
            </p>

            <p className="font-semibold   text-gray-900 dark:text-stone-100">
              Impact:
            </p>
            <ul className="list-disc list-inside text-[11px] md:text-[15px] space-y-1 text-gray-700 dark:text-stone-300">
              {project.impact.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <div className="flex items-center justify-end">
              <a
                href={project.drivelink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors inline-block"
              >
                View Drive
              </a>
            </div>
          </div>
        </div>

        {/* Dots */}
        {total > 1 && (
          <div className="flex justify-center mt-8 space-x-3">
            {section.projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${current === index ? "bg-orange-500" : "bg-gray-400"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}