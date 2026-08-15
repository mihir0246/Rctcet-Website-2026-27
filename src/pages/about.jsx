import SEO from "../Components/SEO";
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { OurJourney } from '../Components/aboutpage/AvenuesofService';
import AboutAvenue from '../Components/AboutAvenue';

const AboutSection = React.lazy(() => import('../Components/aboutpage/about'));
const Objectives = React.lazy(() => import('../Components/aboutpage/objective'));
// const AvenuesofService = React.lazy(() =>
//   import('../Components/aboutpage/AvenuesofService')
// );


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
        {/* <AvenuesofService /> */}
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        <OurJourney />
      </motion.div>
        {/* <AboutAvenue/> */}
      </Suspense>
    </div>
  );
};

export default About;
