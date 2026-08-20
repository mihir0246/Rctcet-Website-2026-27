import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative z-20 w-full pt-16 pb-8 border-t border-primary/20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] bg-gradient-to-b from-white to-[#eef7f9] dark:from-[#1e293b] dark:to-[#0f172a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,159,159,0.05)_0%,transparent_100%)] pointer-events-none" />
      <div className="relative max-w-screen-xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 z-10">

        {/* Section 1: Logo & Address */}
        <div className="flex flex-col items-start space-y-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl text-foreground leading-relaxed font-bold">Rotaract Club</h1>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            <a href="https://www.tcetmumbai.in/" target="_blank" rel="noreferrer" className="text-foreground hover:text-primary transition-colors font-medium">Thakur College of Engineering and Technology</a> <br />
            A Block, Thakur Educational Campus, Thakur Village, <br />
            Kandivali East, Mumbai 400101, MH-IN
          </p>
          <a href="mailto:tcetrotaract@gmail.com" className="text-muted hover:text-primary font-medium transition-colors">
            tcetrotaract@gmail.com
          </a>
        </div>

        {/* Section 2: Pages */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wider">Explore</h2>
          <ul className="flex flex-col space-y-3 text-muted font-medium">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
            <li><Link to="/events" className="hover:text-primary transition-colors">Upcoming Events</Link></li>
            <li><Link to="/achievement" className="hover:text-primary transition-colors">Our Achievements</Link></li>
          </ul>
        </div>

        {/* Section 3: Call To Actions */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wider">Get Involved</h2>
          <ul className="flex flex-col space-y-3 text-muted font-medium">
            <li><Link to="/meet-the-team" className="hover:text-primary transition-colors">Meet The Team</Link></li>
            <li><Link to="/avenue" className="hover:text-primary transition-colors">Avenues</Link></li>
            <li><Link to="/feedback" className="hover:text-primary transition-colors">Feedback</Link></li>
            <li><Link to="/join" className="hover:text-primary transition-colors">Join RCTCET</Link></li>
          </ul>
        </div>

        {/* Section 4: Socials */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-lg font-bold text-foreground uppercase tracking-wider">Follow Us</h2>
          <p className="text-sm text-muted">
            Stay updated with our latest events and initiatives!
          </p>
          <div className="flex gap-4">
            <a href="https://x.com/rc_tcet" target="_blank" rel="noreferrer" className="w-12 h-12 bg-background/50 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-primary/20 hover:border-primary/50 group">
              <img
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1756746683/xIcon_xn4fbb.png"
                alt="Twitter"
                className="w-10 h-10 filter dark:invert opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </a>
            <a href="https://www.linkedin.com/in/rotaract-club-tcet-1158811b4/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-background/50 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-primary/20 hover:border-primary/50 group">
              <img
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1756746683/linkedinIcon_cyydqx.png"
                alt="LinkedIn"
                className="w-10 h-10 filter dark:invert opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </a>
            <a href="https://www.instagram.com/rc_tcet/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-background/50 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-primary/20 hover:border-primary/50 group">
              <img
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1757119301/47bd8384-8446-479d-9a42-485a28b09c09_zsozfe.png"
                alt="Instagram"
                className="w-10 h-10 filter dark:invert opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Centered Logos */}
      <div className="relative z-10 flex justify-center items-center gap-8 mt-12 mb-4">
        <img
          src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_100,c_limit/v1757125056/logo_pdqctw_ztwsvl.png"
          alt="RCTCET Logo"
          className="h-20 w-20 md:h-26 md:w-26 object-contain drop-shadow-md hover:scale-110 transition-transform"
        />
        <img
          src="https://res.cloudinary.com/aaqzfmzc/image/upload/v1787231323/TCET_new_logo.png"
          alt="TCET Logo"
          className="h-20 w-20 md:h-26 md:w-26 object-contain drop-shadow-md hover:scale-110 transition-transform"
        />
      </div>

      {/* Massive Footer Text */}
      <div className="relative w-full mt-16 pt-8 border-t border-primary/20 flex justify-center items-end overflow-hidden z-10 px-4">
        <h1 className="text-[18vw] leading-[0.75] font-black text-primary/25 dark:text-primary/5 select-none uppercase tracking-tighter w-full text-center">
          RC TCET
        </h1>
      </div>
    </footer>
  );
}

export default Footer;