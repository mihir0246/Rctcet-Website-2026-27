import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative z-20 bg-[#fae5d3] dark:bg-[#2D241C] w-full pt-16 pb-8 border-t border-[#f0d8c4] dark:border-[#3b2f25]">
      <div className="max-w-screen-xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        {/* Section 1: Logo & Address */}
        <div className="flex flex-col items-start space-y-6">
          <div className="flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1757125056/logo_pdqctw_ztwsvl.png"
              alt="RCTCET Logo"
              className="h-14 w-14 object-contain"
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-[#F7F0E1]">RCTCET</h1>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5l_wr6ryMS15d0K4FFoy2jayU2tOSlCUpw&s"
              alt="TCET Logo"
              className="h-14 w-14 object-contain"
            />
          </div>
          <p className="text-sm text-gray-800 dark:text-[#EBD7C1] leading-relaxed">
            <a href="https://www.tcetmumbai.in/" target="_blank" rel="noreferrer" className="hover:text-orange-600 dark:hover:text-[#D4A829] transition-colors font-medium">Thakur College of Engineering and Technology</a> <br />
            A Block, Thakur Educational Campus, Thakur Village, <br />
            Kandivali East, Mumbai 400101, MH-IN
          </p>
          <a href="mailto:tcetrotaract@gmail.com" className="text-[#6c6c6c] dark:text-[#B8860B] hover:text-[#555] dark:hover:text-[#D4A829] font-medium transition-colors">
            tcetrotaract@gmail.com
          </a>
        </div>

        {/* Section 2: Pages */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-[#F7F0E1] uppercase tracking-wider">Explore</h2>
          <ul className="flex flex-col space-y-3 text-gray-800 dark:text-[#EBD7C1] font-medium">
            <li><Link to="/" className="hover:text-orange-600 dark:hover:text-[#D4A829] transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-orange-600 dark:hover:text-[#D4A829] transition-colors">About Us</Link></li>
            <li><Link to="/projects" className="hover:text-orange-600 dark:hover:text-[#D4A829] transition-colors">Projects</Link></li>
            <li><Link to="/achievement" className="hover:text-orange-600 dark:hover:text-[#D4A829] transition-colors">Our Achievements</Link></li>
          </ul>
        </div>

        {/* Section 3: Call To Actions */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-[#F7F0E1] uppercase tracking-wider">Get Involved</h2>
          <ul className="flex flex-col space-y-3 text-gray-800 dark:text-[#EBD7C1] font-medium">
            <li><Link to="/meet-the-team" className="hover:text-orange-600 dark:hover:text-[#D4A829] transition-colors">Meet The Team</Link></li>
            <li><Link to="/avenue" className="hover:text-orange-600 dark:hover:text-[#D4A829] transition-colors">Avenues</Link></li>
            <li><Link to="/feedback" className="hover:text-orange-600 dark:hover:text-[#D4A829] transition-colors">Join RCTCET</Link></li>
          </ul>
        </div>

        {/* Section 4: Socials */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-[#F7F0E1] uppercase tracking-wider">Follow Us</h2>
          <p className="text-sm text-gray-800 dark:text-[#EBD7C1]">
            Stay updated with our latest events and initiatives!
          </p>
          <div className="flex gap-4">
            <a href="https://x.com/rc_tcet" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/50 dark:bg-[#3b2f25] rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-white/60 dark:border-[#4a3a2e]">
              <img
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1756746683/xIcon_xn4fbb.png"
                alt="Twitter"
                className="w-10 h-10 filter dark:invert dark:opacity-80"
              />
            </a>
            <a href="https://www.linkedin.com/in/rotaract-club-tcet-1158811b4/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/50 dark:bg-[#3b2f25] rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-white/60 dark:border-[#4a3a2e]">
              <img
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1756746683/linkedinIcon_cyydqx.png"
                alt="LinkedIn"
                className="w-10 h-10 filter dark:invert dark:opacity-80"
              />
            </a>
            <a href="https://www.instagram.com/rc_tcet/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/50 dark:bg-[#3b2f25] rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-white/60 dark:border-[#4a3a2e]">
              <img
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1757119301/47bd8384-8446-479d-9a42-485a28b09c09_zsozfe.png"
                alt="Instagram"
                className="w-10 h-10 filter dark:invert dark:opacity-80"
              />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-screen-xl mx-auto mt-16 px-8 flex flex-col items-center">
        <hr className="w-full border-black/20 dark:border-[#4A3B2F] mb-6" />
        <p className="text-sm font-medium text-gray-600 dark:text-[#C4A575] text-center">
          Copyright © {new Date().getFullYear()} by Rotaract Club of TCET. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;