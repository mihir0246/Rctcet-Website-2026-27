import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Chatbot = lazy(() => import("./Chatbot/Chatbot"));

const BG_DESKTOP = "f_auto,q_auto:low,w_1400,c_fill,g_auto";
const BG_MOBILE = "f_auto,q_auto:low,w_600,c_fill,g_auto";

const imagesData = [
  {
    title: "Jashn-E- 3141",
    id: "v1757943827/Copy_of_IMG_4190_ayzbil_lplixh_rd534g.webp"
  },
  {
    title: "Visual Velocity 2.0",
    id: "v1757943830/IMG_7581_xlm8wx_lnj4jq_ufiz7c.webp"
  },
  {
    title: "Aara night 25-26",
    id: "v1757943837/IMG_2044_h3kady_vbe8iv_s4bl9w.webp"
  },
  {
    title: "Rotaract's Day Out",
    id: "v1757943940/Copy_of_IMG_0420_wdpng4_gpbtct.webp"
  },
  {
    title: "Monsoon Match Day 2.0",
    id: "v1757943826/Copy_of_IMG_1446_1_zwesqm_g41sxi.webp"
  },
  {
    title: "Kalakriti 2.0",
    id: "v1757943987/Copy_of_IMG20250825165248_kvd3wk_w6imtn.webp"
  },
  {
    title: "Panache",
    id: "v1757943825/PXL_20250718_060353784_i7fthn_jxd25r.webp"
  }
];

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
        />
      </AnimatePresence>

      {/* Dark overlay to make text pop */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Center Content: Logo and Title */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_400/v1756746594/logo_pdqctw.svg"
          alt="Rotaract Club Logo"
          className="h-32 w-32 md:h-48 md:w-48 mb-6 drop-shadow-2xl"
        />
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl tracking-wide uppercase"
        >
          Rotaract Club of TCET
        </motion.h1>
      </div>

      {/* Top Right: Event Name */}
      <div className="absolute top-24 md:top-28 right-4 md:right-8 z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-2"
          >
            <h2 className="text-white text-xl md:text-2xl font-bold tracking-wider drop-shadow-lg">
              {imagesData[bgIndex].title}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>

    </div>
  );
}