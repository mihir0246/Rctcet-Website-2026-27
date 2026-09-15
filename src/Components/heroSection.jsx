import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BG_DESKTOP = "f_auto,q_auto:good,w_1920,c_limit";
const BG_MOBILE = "f_auto,q_auto:good,w_1080,c_limit";

import { heroImages as imagesData } from "../data/heroImages";

export default function RotaractClubLayout() {
  const [bgIndex, setBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount to catch any edge cases
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % imagesData.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const bgUrl = useMemo(() => {
    const transform = isMobile ? BG_MOBILE : BG_DESKTOP;
    return `https://res.cloudinary.com/dtc2xaeaf/image/upload/${transform}/${imagesData[bgIndex].id}`;
  }, [bgIndex, isMobile]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      {/* Background Slideshow using Framer Motion for smooth crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={bgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={bgUrl}
          alt={imagesData[bgIndex].title}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ objectPosition: isMobile ? (imagesData[bgIndex].mobilePosition || "center") : "center" }}
        />
      </AnimatePresence>

      {/* Dark overlay to make text pop */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Center Content: Logo and Title */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center px-3 w-full max-w-[95vw] md:max-w-5xl">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_400/v1756746594/logo_pdqctw.svg"
          alt="Rotaract Club Logo"
          className="h-28 w-28 md:h-40 md:w-40 mb-4 md:mb-6 drop-shadow-2xl"
        />
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[12vw] sm:text-6xl md:text-[5.5rem] lg:text-[6rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-[0_0_25px_rgba(0,0,0,0.8)] uppercase leading-[1.05] tracking-tighter select-none"
        >
          <span className="whitespace-nowrap">ROTARACT CLUB</span> <br />
          <span className="whitespace-nowrap">OF TCET</span>
        </motion.h1>
      </div>

      {/* Top Right: Event Name */}
      <div className="absolute top-20 right-4 md:top-28 md:right-8 lg:top-12 z-30 max-w-[70vw] md:max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="py-2 flex justify-end"
          >
            <h2 className="text-white text-right text-lg md:text-2xl font-black tracking-widest drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] uppercase leading-tight">
              {imagesData[bgIndex].title}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}