import SEO from "../Components/SEO";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { allProjectsData } from "../data/projectsData";

function Projects() {

  const academicYearOptions = ["2026-2027", "2025-2026"];
  const [selectedYear, setSelectedYear] = useState("2026-2027");
  const sections = allProjectsData[selectedYear] || [];

  const [activeTab, setActiveTab] = useState(sections[0]?.id);
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
            <a href="/">
              <button className="mt-6 bg-orange-500 dark:bg-yellow-600 hover:bg-orange-600 dark:hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition">
                Get Involved
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* LINKS — UPDATED TAB STYLE */}
      <div className={`flex justify-center items-center relative bg-white dark:bg-stone-900 border-b border-stone-300 dark:border-stone-700 sticky top-[4.5rem] z-20 transition-all duration-300 ${isScrolled ? "h-10" : "h-16"}`}>
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-0 h-full px-3 bg-gradient-to-r from-white dark:from-stone-900 to-transparent z-30 flex items-center"
          >
            <span className={`text-stone-600 dark:text-stone-300 transition-all ${isScrolled ? "text-sm" : "text-xl"}`}>
              ❮
            </span>
          </button>
        )}

        {/* Scroll Container */}
        <nav
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide font-medium px-10 space-x-8 h-full items-center"
        >
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={() => setActiveTab(sec.id)}
              className={`relative whitespace-nowrap h-full flex items-center transition-all duration-300 ${isScrolled ? "text-xs" : "text-base"}
          ${
            activeTab === sec.id
              ? "text-orange-600 dark:text-yellow-400"
              : "text-stone-700 dark:text-stone-200 hover:text-orange-600 dark:hover:text-yellow-400"
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
            className="absolute right-0 top-0 h-full px-3 bg-gradient-to-l from-white dark:from-stone-900 to-transparent z-30 flex items-center"
          >
            <span className={`text-stone-600 dark:text-stone-300 transition-all ${isScrolled ? "text-sm" : "text-xl"}`}>
              ❯
            </span>
          </button>
        )}
      </div>

      {/* NEW SLIDER SECTIONS */}
      <div className="p-6 space-y-20">
        {sections.map((section) => (
          <SliderSection key={section.id} section={section} />
        ))}
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

  return (
    const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

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
                className={`w-3 h-3 rounded-full ${
                  current === index ? "bg-orange-500" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}