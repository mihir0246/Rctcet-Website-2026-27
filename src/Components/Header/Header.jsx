import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../themeButton";
import { Users, Compass, Award, MessageSquare, ChevronDown, Menu, X } from "lucide-react";

function Header() {
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClubDropdownOpen, setIsClubDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const clubDropdownRef = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActiveLink("Home");
    else if (path === "/about") setActiveLink("About us");
    else if (path === "/projects") setActiveLink("Projects");
    else if (path === "/events") setActiveLink("Upcoming Events");
    else if (
      [
        "/meet-the-team",
        "/achievement",
        "/club-insight",
        "/avenue",
        "/feedback",
      ].includes(path)
    ) {
      setActiveLink("Club hub");
    } else setActiveLink("");
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clubDropdownRef.current &&
        !clubDropdownRef.current.contains(event.target)
      ) {
        setIsClubDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About us", to: "/about" },
    { name: "Projects", to: "/projects" },
    { name: "Upcoming Events", to: "/events" },
  ];

  const clubLinks = [
    { name: "The Team", to: "/meet-the-team", icon: Users, desc: "See the faces behind the magic" },
    { name: "Avenues", to: "/avenue", icon: Compass, desc: "Explore our different departments" },
    { name: "Achievement", to: "/achievement", icon: Award, desc: "Our proudest moments & awards" },
    { name: "Get In Touch", to: "/feedback", icon: MessageSquare, desc: "Reach out to us directly" },
  ];

  return (
    <header
      className={`sticky z-[100] transition-all duration-500 ease-in-out ${isScrolled
        ? "top-4 mx-auto w-[95vw] lg:w-[90vw] xl:w-[85vw] rounded-full shadow-2xl py-2 px-6 md:px-8 lg:px-10 bg-card/80 backdrop-blur-2xl border border-primary/20"
        : "top-0 mx-auto w-full rounded-none shadow-md py-4 px-6 md:px-8 lg:px-10 bg-card/95 backdrop-blur-md border-b border-primary/10"
        }`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center relative">
        
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center group">
            <img
              src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757125056/logo_pdqctw_ztwsvl.png"
              alt="Rotaract Club of TCET Logo"
              className={`transition-all duration-500 ease-in-out drop-shadow-md group-hover:rotate-12 ${
                isScrolled ? "h-9 w-9" : "h-11 w-11"
              }`}
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex justify-center items-center space-x-2 xl:space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="relative px-3 py-2 rounded-full text-base font-bold tracking-wide group transition-colors"
            >
              {activeLink === link.name && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-primary/15 dark:bg-primary/25 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  activeLink === link.name ? "text-primary" : "text-foreground group-hover:text-primary"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}

          {/* Club Hub Dropdown */}
          <div
            className="relative flex items-center h-full"
            ref={clubDropdownRef}
            onMouseEnter={() => setIsClubDropdownOpen(true)}
            onMouseLeave={() => setIsClubDropdownOpen(false)}
          >
            <button
              onClick={() => setIsClubDropdownOpen(!isClubDropdownOpen)}
              className="relative px-3 py-2 rounded-full text-base font-bold tracking-wide group flex items-center gap-1.5 transition-colors"
            >
              {activeLink === "Club hub" && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-primary/15 dark:bg-primary/25 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 transition-colors duration-300 ${
                  activeLink === "Club hub" ? "text-primary" : "text-foreground group-hover:text-primary"
                }`}
              >
                Club Hub
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isClubDropdownOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </span>
            </button>

            {/* Premium Dropdown Card */}
            <AnimatePresence>
              {isClubDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 z-[200] w-[320px]"
                >
                  <div className="bg-card/95 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] rounded-2xl border border-primary/20 overflow-hidden p-2 grid grid-cols-1 gap-1">
                    {clubLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.to}
                        onClick={() => setIsClubDropdownOpen(false)}
                        className="group/item flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                      >
                        {/* Icons removed as per user request */}
                        <div>
                          <div className="text-foreground font-bold text-sm group-hover/item:text-primary transition-colors">
                            {link.name}
                          </div>
                          <div className="text-muted text-xs font-medium mt-0.5">
                            {link.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop Contact & Theme Toggle */}
        <div className="hidden lg:flex flex-1 justify-end space-x-3 items-center">
          <Link
            to="/join"
            className="relative group bg-gradient-to-br from-primary to-[#568181] text-white font-semibold py-2 px-5 rounded-full shadow-[0_0_15px_rgba(110,159,159,0.3)] hover:shadow-[0_0_25px_rgba(110,159,159,0.6)] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap overflow-hidden"
          >
            <span className="relative z-10 text-sm tracking-wide">Become a member</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </Link>
          <div className="p-1 bg-background rounded-full border border-primary/10 shadow-sm flex items-center justify-center h-10 w-10">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="lg:hidden flex flex-1 justify-end items-center space-x-3">
          <div className="p-1 bg-background rounded-full border border-primary/10 shadow-sm flex items-center justify-center h-10 w-10">
            <ThemeToggle />
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 bg-primary/10 text-primary rounded-full focus:outline-none hover:bg-primary/20 transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Nav (Glassmorphism Slide Down) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[calc(100%+1rem)] left-0 w-full overflow-hidden rounded-3xl z-[150]"
          >
            <div className="bg-card/95 backdrop-blur-3xl shadow-2xl border border-primary/20 rounded-3xl p-6 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-bold px-4 py-3 rounded-xl transition-colors ${
                    activeLink === link.name
                      ? "bg-primary/15 text-primary"
                      : "text-foreground hover:bg-background"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Club Hub in Mobile */}
              <div className="flex flex-col">
                <button
                  onClick={() => setIsClubDropdownOpen(!isClubDropdownOpen)}
                  className={`flex justify-between items-center text-lg font-bold px-4 py-3 rounded-xl transition-colors ${
                    activeLink === "Club hub" || isClubDropdownOpen
                      ? "bg-primary/15 text-primary"
                      : "text-foreground hover:bg-background"
                  }`}
                >
                  Club Hub
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isClubDropdownOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isClubDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 bg-background/50 rounded-2xl border border-primary/10 p-2 flex flex-col gap-1">
                        {clubLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.to}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsClubDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                          >
                            {/* Icons removed as per user request */}
                            <span className="font-bold text-[0.95rem] text-foreground">
                              {link.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 mt-2 border-t border-primary/10">
                <Link
                  to="/join"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex justify-center w-full bg-gradient-to-r from-primary to-[#568181] text-white font-bold py-3 px-4 rounded-xl shadow-[0_0_15px_rgba(110,159,159,0.3)] hover:shadow-[0_0_25px_rgba(110,159,159,0.6)] transition-all"
                >
                  Become a member!
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
