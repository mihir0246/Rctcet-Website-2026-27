import SEO from "../Components/SEO";
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { OurJourney } from '../Components/aboutpage/OurJourney';
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
    <div className="bg-card dark:bg-card min-h-screen">
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
            className="relative group bg-gradient-to-br from-primary to-[#568181] text-white font-bold text-lg py-4 px-10 rounded-full shadow-[0_0_15px_rgba(110,159,159,0.4)] hover:shadow-[0_0_30px_rgba(110,159,159,0.7)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View the Whole Team
              <span className="transform transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </Link>
        </motion.div>
      </Suspense>
    </div>
  );
};

export default About;
