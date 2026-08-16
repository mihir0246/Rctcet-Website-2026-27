import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../themeButton";

function Header() {
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClubDropdownOpen, setIsClubDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  // 👇 Ref for Club Hub dropdown container
  const clubDropdownRef = useRef(null);

  // update active link on route change
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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Close Club Hub dropdown when clicking outside
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
    { name: "Meet The Team", to: "/meet-the-team" },
    { name: "Avenues", to: "/avenue" },
    { name: "Achievement", to: "/achievement" },
    // { name: "Saa Fine", to: "/saa-fine" },
    { name: "Get In Touch", to: "/feedback" },
  ];

  return (
    <header
      className={`sticky z-[100] transition-all duration-500 ease-in-out ${isScrolled
        ? "top-4 mx-auto w-[95vw] lg:w-[90vw] xl:w-[80vw] rounded-full shadow-2xl py-2 px-6 md:px-10 bg-white/60 backdrop-blur-xl dark:bg-[#1A1612]/70 border border-white/20 dark:border-[#3D3027]/50"
        : "top-0 mx-auto w-full rounded-none shadow-md py-4 px-6 md:px-10 bg-white dark:bg-[#1A1612] border border-transparent"
        }`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757125056/logo_pdqctw_ztwsvl.png"
              alt="Rotaract Club of TCET Logo"
              className={`transition-all duration-500 ease-in-out rounded-full ${isScrolled ? "h-8 w-8" : "h-10 w-10"}`}
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center items-center space-x-4 lg:space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`text-lg font-medium transition-colors ${activeLink === link.name
                ? "text-orange-600 dark:text-[#D4A829]"
                : "text-black dark:text-[#F7F0E1]"
                } hover:text-orange-600 dark:hover:text-[#D4A829]`}
            >
              {link.name}
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
              aria-expanded={isClubDropdownOpen}
              className={`text-lg font-medium transition-colors ${activeLink === "Club hub"
                ? "text-orange-600 dark:text-[#D4A829]"
                : "text-black dark:text-[#F7F0E1]"
                } hover:text-orange-600 dark:hover:text-[#D4A829]`}
            >
              Club Hub
            </button>
            {isClubDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 z-40 w-48">
                <div className="bg-white dark:bg-[#2D241C] shadow-lg dark:shadow-black/40 rounded-lg border dark:border-[#4A3B2F] overflow-hidden">
                  {clubLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.to}
                      onClick={() => setIsClubDropdownOpen(false)}
                      className="block px-4 py-3 text-black dark:text-[#F7F0E1] hover:bg-gray-100 dark:hover:bg-[#3D3027] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Contact & Theme Toggle */}
        <div className="hidden md:flex flex-1 justify-end space-x-4 items-center">
          <Link
            to="/join"
            className="bg-[#fae5d3] dark:bg-[#B8860B] text-black dark:text-[#F7F0E1] font-medium py-2 px-4 rounded-xl hover:bg-[#f9d3b5] dark:hover:bg-[#8B6914] transition-colors whitespace-nowrap"
          >
            Become a member!
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="md:hidden flex flex-1 justify-end items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none text-black dark:text-[#F7F0E1]"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#2D241C] shadow-lg dark:shadow-black/30">
          <nav className="flex flex-col space-y-4 py-4 px-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium transition-colors ${activeLink === link.name
                  ? "text-orange-600 dark:text-[#D4A829]"
                  : "text-black dark:text-[#F7F0E1]"
                  } hover:text-orange-600 dark:hover:text-[#D4A829]`}
              >
                {link.name}
              </Link>
            ))}

            {/* Club Hub in Mobile */}
            <div ref={clubDropdownRef}>
              <button
                onClick={() => setIsClubDropdownOpen(!isClubDropdownOpen)}
                className={`text-lg font-medium transition-colors ${activeLink === "Club hub"
                  ? "text-orange-600 dark:text-[#D4A829]"
                  : "text-black dark:text-[#F7F0E1]"
                  } hover:text-orange-600 dark:hover:text-[#D4A829]`}
                aria-expanded={isClubDropdownOpen}
              >
                Club Hub
              </button>
              {isClubDropdownOpen && (
                <div className="mt-2 bg-white dark:bg-[#3D3027] shadow-lg dark:shadow-black/40 rounded-lg border dark:border-[#4A3B2F]">
                  {clubLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.to}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsClubDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-black dark:text-[#F7F0E1] hover:bg-gray-100 dark:hover:bg-[#5A4A3A] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/join"
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#fae5d3] dark:bg-[#B8860B] text-black dark:text-[#F7F0E1] font-medium py-2 px-4 rounded-xl hover:bg-[#f9d3b5] dark:hover:bg-[#8B6914] transition-colors text-center"
            >
              Become a member!
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

