import SEO from "../Components/SEO";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { StatsBar } from '../Components/Stats';
import { MomentsFrame } from '../Components/Moments';
import Legacy from '../Components/legacy'
import EndeavorsCarousel from '../Components/EndeavorsCarousel'
import Anantya from '../Components/aboutSection';
import RotaractClubLayout from "../Components/heroSection"
import {Magazine} from '../Components/Magazine';


const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Home = () => {
  return (
    <div className="bg-white dark:bg-stone-900 min-h-screen">
      <SEO title="Home" description="Welcome to the Rotaract Club of TCET official website." />
      <RotaractClubLayout/>
      
      <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        <Anantya/>
      </motion.div>
      <Suspense fallback={<div>Loading...</div>}>
      <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        <Magazine/>
      </motion.div>
      <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        <Legacy/>
      </motion.div>
      <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        <EndeavorsCarousel/>
      </motion.div>
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        <MomentsFrame/>
      </motion.div>
      </Suspense>
    </div>
  );
};

export default Home;
