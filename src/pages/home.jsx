import SEO from "../components/SEO";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatsBar } from '../components/Stats';
import { MomentsFrame } from '../components/Moments';
import Legacy from '../components/legacy'
import EndeavorsCarousel from '../components/EndeavorsCarousel'
import Anantya from '../components/aboutSection';
import RotaractClubLayout from "../components/heroSection"
import { Magazine } from '../components/Magazine';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Home = () => {
  // Use session storage so it only plays once per browser session
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("introPlayed")) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroEnd = () => {
    setShowIntro(false);
    sessionStorage.setItem("introPlayed", "true");
  };

  return (
    <div className="min-h-screen relative">
      <SEO title="Home" description="Welcome to the Rotaract Club of TCET official website." />

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-video-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              autoPlay
              muted
              playsInline
              onEnded={handleIntroEnd}
              className="w-full h-full object-cover opacity-90"
              src="https://res.cloudinary.com/dtc2xaeaf/video/upload/v1757944468/freecompress-flame_am46ja_czoump.mp4"
            />

            {/* Subtle Skip Button */}
            <button
              onClick={handleIntroEnd}
              className="absolute bottom-10 right-10 text-white/40 hover:text-white text-sm font-semibold tracking-widest transition-colors z-[110]"
            >
              SKIP
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-0 left-0 w-full z-0">
        <RotaractClubLayout />
      </div>

      <div className="mt-[85vh] md:mt-[calc(100vh-5rem)] relative z-10 bg-white dark:bg-stone-900 pt-12 pb-20 rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <Anantya />
        </motion.div>
        <Suspense fallback={<div>Loading...</div>}>
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <Magazine />
          </motion.div>
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <Legacy />
          </motion.div>
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <EndeavorsCarousel />
          </motion.div>
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <MomentsFrame />
          </motion.div>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
