import SEO from "../Components/SEO";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatsBar } from '../Components/Stats';
import { MomentsFrame } from '../Components/Moments';
import Legacy from '../Components/legacy'
import EndeavorsCarousel from '../Components/EndeavorsCarousel'
import Anantya from '../Components/AboutSection';
import RotaractClubLayout from "../Components/HeroSection"
import { Magazine } from '../Components/Magazine';
import { lazy } from "react";

const Chatbot = lazy(() => import("../Components/Chatbot/Chatbot"));

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
              src="https://res.cloudinary.com/dtc2xaeaf/video/upload/v1787043270/landing_intro_dsw7cj.mp4"
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

      <div className="relative w-full z-0 h-screen">
        <RotaractClubLayout />
      </div>

      <div className="-mt-12 md:-mt-20 relative z-10 flex flex-col w-full">
        <Anantya />
        <Suspense fallback={<div>Loading...</div>}>
          <Magazine />
          <Legacy />
          <EndeavorsCarousel />
          <MomentsFrame />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
};

export default Home;
