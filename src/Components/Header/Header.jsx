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
    else if (
      [
        "/meet-the-team",
        "/achievement",
        "/club-insight",
        "/get-involved",
        "/avenue",
        "/feedback",
      ].includes(path)
    ) {
      setActiveLink("Club hub");
    } else setActiveLink("");
  }, [location]);

  // scroll listener only for home
  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true); // default solid bg if not home
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

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
  ];

  const clubLinks = [
    { name: "Meet The Team", to: "/meet-the-team" },
    { name: "Avenues", to: "/avenue" },
    { name: "Achievement", to: "/achievement" },
    // { name: "Saa Fine", to: "/saa-fine" },
    { name: "FeedBack", to: "/feedback" },
    { name: "Get Involved", to: "/get-involved" },
  ];

  return (
    <header className="bg-white dark:bg-[#1A1612] w-full py-4 shadow-lg dark:shadow-black/30 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757125056/logo_pdqctw_ztwsvl.png"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`text-lg font-medium transition-colors ${
                activeLink === link.name
                  ? "text-orange-600 dark:text-[#D4A829]"
                  : "text-black dark:text-[#F7F0E1]"
              } hover:text-orange-600 dark:hover:text-[#D4A829]`}
            >
              {link.name}
            </Link>
          ))}

          {/* Club Hub Dropdown */}
          <div className="relative" ref={clubDropdownRef}>
            <button
              onClick={() => setIsClubDropdownOpen(!isClubDropdownOpen)}
              aria-expanded={isClubDropdownOpen}
              className={`text-lg font-medium transition-colors ${
                activeLink === "Club hub"
                  ? "text-orange-600 dark:text-[#D4A829]"
                  : "text-black dark:text-[#F7F0E1]"
              } hover:text-orange-600 dark:hover:text-[#D4A829]`}
            >
              Club Hub
            </button>
            {isClubDropdownOpen && (
              <div className="absolute mt-2 bg-white dark:bg-[#2D241C] shadow-lg dark:shadow-black/40 rounded-lg z-40 border dark:border-[#4A3B2F]">
                {clubLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="block px-4 py-2 text-black dark:text-[#F7F0E1] hover:bg-gray-100 dark:hover:bg-[#3D3027] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Contact & Theme Toggle */}
        <div className="hidden md:flex space-x-4 items-center justify-end">
          <Link
            to="/contact"
            className="bg-[#fae5d3] dark:bg-[#B8860B] text-black dark:text-[#F7F0E1] font-medium py-2 px-4 rounded-xl hover:bg-[#f9d3b5] dark:hover:bg-[#8B6914] transition-colors"
          >
            Contact us
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none text-black dark:text-[#F7F0E1]"
            aria-expanded={isMenuOpen}
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
                className={`text-lg font-medium transition-colors ${
                  activeLink === link.name
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
                className={`text-lg font-medium transition-colors ${
                  activeLink === "Club hub"
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
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#fae5d3] dark:bg-[#B8860B] text-black dark:text-[#F7F0E1] font-medium py-2 px-4 rounded-xl hover:bg-[#f9d3b5] dark:hover:bg-[#8B6914] transition-colors text-center"
            >
              Contact us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import ThemeToggle from "../themeButton";

// function Header() {
//   const [activeLink, setActiveLink] = useState("");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isClubDropdownOpen, setIsClubDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const location = useLocation();
//   const isHome = location.pathname === "/";

//   useEffect(() => {
//     const path = location.pathname;
//     if (path === "/") setActiveLink("Home");
//     else if (path === "/about") setActiveLink("About us");
//     else if (path === "/projects") setActiveLink("Projects");
//     else if (
//       [
//         "/meet-the-team",
//         "/achievement",
//         "/club-insight",
//         "/get-involved",
//         "/avenue",
//       ].includes(path)
//     ) {
//       setActiveLink("Club hub");
//     } else setActiveLink("");
//   }, [location]);

//   // scroll listener only for home
//   useEffect(() => {
//     if (!isHome) {
//       setIsScrolled(true); // default solid bg if not home
//       return;
//     }

//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isHome]);

//   const navLinks = [
//     { name: "Home", to: "/" },
//     { name: "About us", to: "/about" },
//     { name: "Projects", to: "/projects" },
//   ];

//   const clubLinks = [
//     { name: "Meet The Team", to: "/meet-the-team" },
//     { name: "Avenues", to: "/avenue" },
//     { name: "Achievement", to: "/achievement" },
//     { name: "Saa Fine", to: "/saa-fine" },
//     { name: "Get Involved", to: "/get-involved" },
//   ];

//   return (
//     <header className="bg-white dark:bg-[#1A1612] w-full py-4 shadow-lg dark:shadow-black/30">
//       <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8">
//         {/* Logo */}
//         <div className="flex items-center">
//           <img
//             src="/RcTcetLogo.svg"
//             alt="Logo"
//             className="h-10 w-10 rounded-full"
//           />
//         </div>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex space-x-8">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.to}
//               className={`text-lg font-medium transition-colors ${
//                 activeLink === link.name
//                   ? "text-orange-600 dark:text-[#D4A829]"
//                   : "text-black dark:text-[#F7F0E1]"
//               } hover:text-orange-600 dark:hover:text-[#D4A829]`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* Club Hub Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setIsClubDropdownOpen(!isClubDropdownOpen)}
//               aria-expanded={isClubDropdownOpen}
//               className={`text-lg font-medium transition-colors ${
//                 activeLink === "Club hub"
//                   ? "text-orange-600 dark:text-[#D4A829]"
//                   : "text-black dark:text-[#F7F0E1]"
//               } hover:text-orange-600 dark:hover:text-[#D4A829]`}
//             >
//               Club Hub
//             </button>
//             {isClubDropdownOpen && (
//               <div className="absolute mt-2 bg-white dark:bg-[#2D241C] shadow-lg dark:shadow-black/40 rounded-lg z-40 border dark:border-[#4A3B2F]">
//                 {clubLinks.map((link) => (
//                   <Link
//                     key={link.name}
//                     to={link.to}
//                     className="block px-4 py-2 text-black dark:text-[#F7F0E1] hover:bg-gray-100 dark:hover:bg-[#3D3027] transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         </nav>

//         {/* Desktop Contact & Theme Toggle */}
//         <div className="hidden md:flex space-x-4 items-center justify-end">
//           <Link
//             to="/contact"
//             className="bg-[#fae5d3] dark:bg-[#B8860B] text-black dark:text-[#F7F0E1] font-medium py-2 px-4 rounded-xl hover:bg-[#f9d3b5] dark:hover:bg-[#8B6914] transition-colors"
//           >
//             Contact us
//           </Link>
//           <ThemeToggle />
//         </div>

//         {/* Mobile Menu Button & Theme Toggle */}
//         <div className="md:hidden flex items-center space-x-2">
//           <ThemeToggle />
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="focus:outline-none text-black dark:text-[#F7F0E1]"
//             aria-expanded={isMenuOpen}
//           >
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d={
//                   isMenuOpen
//                     ? "M6 18L18 6M6 6l12 12"
//                     : "M4 6h16M4 12h16m-7 6h7"
//                 }
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Nav */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white dark:bg-[#2D241C] shadow-lg dark:shadow-black/30">
//           <nav className="flex flex-col space-y-4 py-4 px-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.to}
//                 className={`text-lg font-medium transition-colors ${
//                   activeLink === link.name 
//                     ? "text-orange-600 dark:text-[#D4A829]" 
//                     : "text-black dark:text-[#F7F0E1]"
//                 } hover:text-orange-600 dark:hover:text-[#D4A829]`}
//               >
//                 {link.name}
//               </Link>
//             ))}

//             {/* Club Hub in Mobile */}
//             <div>
//               <button
//                 onClick={() => setIsClubDropdownOpen(!isClubDropdownOpen)}
//                 className={`text-lg font-medium transition-colors ${
//                   activeLink === "Club hub" 
//                     ? "text-orange-600 dark:text-[#D4A829]" 
//                     : "text-black dark:text-[#F7F0E1]"
//                 } hover:text-orange-600 dark:hover:text-[#D4A829]`}
//                 aria-expanded={isClubDropdownOpen}
//               >
//                 Club Hub
//               </button>
//               {isClubDropdownOpen && (
//                 <div className="mt-2 bg-white dark:bg-[#3D3027] shadow-lg dark:shadow-black/40 rounded-lg border dark:border-[#4A3B2F]">
//                   {clubLinks.map((link) => (
//                     <Link
//                       key={link.name}
//                       to={link.to}
//                       className="block px-4 py-2 text-black dark:text-[#F7F0E1] hover:bg-gray-100 dark:hover:bg-[#5A4A3A] transition-colors"
//                     >
//                       {link.name}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <Link
//               to="/contact"
//               className="bg-[#fae5d3] dark:bg-[#B8860B] text-black dark:text-[#F7F0E1] font-medium py-2 px-4 rounded-xl hover:bg-[#f9d3b5] dark:hover:bg-[#8B6914] transition-colors"
//             >
//               Contact us
//             </Link>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;