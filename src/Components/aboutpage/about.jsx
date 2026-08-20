import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

import { aboutImages, preloadImages as images } from "../../data/aboutUs";

const floatAnimation1 = {
  y: [0, -15, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
};
const floatAnimation2 = {
  y: [0, 15, 0],
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
};
const floatAnimation3 = {
  y: [0, -10, 0],
  transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
};

const AboutSection = () => {
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="relative bg-background min-h-[90vh] flex flex-col justify-center overflow-hidden pt-10 pb-20">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,159,159,0.08)_0%,transparent_100%)] pointer-events-none" />

      {/* Background Image (faded) */}
      <LazyLoadImage
        src={aboutImages.background}
        alt="Baseline Grid Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 dark:opacity-20 top-7 pointer-events-none mix-blend-overlay"
      />

      {/* Foreground */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center max-w-screen-2xl mx-auto px-4">
        
        {/* Massive Title */}
        <div className="mb-16 w-full mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-[9rem] xl:text-[10rem] leading-[0.9] font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tighter drop-shadow-sm select-none uppercase"
          >
            About Us
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-32 h-1.5 bg-primary mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(110,159,159,0.5)]"
          />
        </div>

        {/* Center area collage */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-10">
          
          {/* Left-most */}
          <motion.div animate={floatAnimation1} className="hidden md:block w-[14vw] flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <LazyLoadImage
              src={aboutImages.leftMost}
              alt="Side Logo Left"
              className="w-full h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500 relative z-10"
            />
          </motion.div>

          {/* Left stack */}
          <div className="hidden md:flex flex-row md:flex-col items-center gap-6 lg:gap-10">
            <motion.div animate={floatAnimation2} className="w-[18vw] flex-shrink-0 relative group">
              <LazyLoadImage
                src={aboutImages.leftStack1}
                alt="Side Logo Left 2"
                className="w-full h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div animate={floatAnimation3} className="w-[18vw] flex-shrink-0 relative group">
              <LazyLoadImage
                src={aboutImages.leftStack2}
                alt="Side Logo Left 3"
                className="w-full h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>

          {/* Center square (Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative rounded-[2.5rem] p-6 lg:p-10 aspect-square w-full max-w-[400px] md:max-w-none md:w-[28vw] overflow-visible flex-shrink-0 bg-white/40 dark:bg-card/40 backdrop-blur-3xl border border-primary/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] group hover:border-primary/40 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,159,159,0.1)_0%,transparent_70%)]" />
            <LazyLoadImage
              src={aboutImages.themeLogo}
              alt="Theme Logo Meraki"
              className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>

          {/* Right stack */}
          <div className="hidden md:flex flex-row md:flex-col items-center gap-6 lg:gap-10">
            <motion.div animate={floatAnimation3} className="w-[18vw] flex-shrink-0 relative group">
              <LazyLoadImage
                src={aboutImages.rightStack1}
                alt="Side Logo Right 2"
                className="w-full h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div animate={floatAnimation2} className="w-[18vw] flex-shrink-0 relative group">
              <LazyLoadImage
                src={aboutImages.rightStack2}
                alt="Handshake Graphic"
                className="w-full h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>

          {/* Right-most */}
          <motion.div animate={floatAnimation1} className="hidden md:block w-[14vw] flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <LazyLoadImage
              src={aboutImages.rightMost}
              alt="Side Logo Right"
              className="w-full h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500 relative z-10"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
