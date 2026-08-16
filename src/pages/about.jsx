import SEO from "../Components/SEO";
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { OurJourney } from '../Components/aboutpage/AvenuesofService';
import AboutAvenue from '../Components/AboutAvenue';
import { Link } from 'react-router-dom';
const AboutSection = React.lazy(() => import('../Components/aboutpage/about'));
const Objectives = React.lazy(() => import('../Components/aboutpage/objective'));



const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const About = () => {
  return (
    <div className="bg-white dark:bg-stone-900 min-h-screen">
      <SEO title="About Us" description="Learn about the objectives, history, and journey of the Rotaract Club of TCET." />
      <Suspense fallback={<div>Loading...</div>}>
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <AboutSection />
        </motion.div>
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <Objectives />
        </motion.div>

        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <OurJourney />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex justify-center pb-20 pt-10"
        >
          <Link
            to="/meet-the-team"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-white transition-all duration-300 bg-orange-600 rounded-full hover:bg-orange-700 hover:shadow-xl dark:bg-orange-500 dark:hover:bg-orange-600 shadow-orange-500/30 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              View the Whole Team
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </motion.div>
      </Suspense>
    </div>
  );
};

export default About;
