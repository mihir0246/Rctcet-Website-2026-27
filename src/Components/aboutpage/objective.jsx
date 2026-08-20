import React from 'react';
import { motion } from 'framer-motion';
import { objectivesList } from '../../data/aboutUs';

const FloatingCard = ({ obj, index, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: delay }}
    className="w-full"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 4 + (index % 3), ease: "easeInOut", delay: delay }}
      className="group relative bg-white/20 dark:bg-black/30 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2.5rem] p-8 lg:p-10 hover:border-primary/60 hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl z-30"
    >
      {/* Giant Background Number */}
      <div className="absolute -bottom-8 -right-4 text-[10rem] md:text-[12rem] font-black text-black/5 dark:text-white/5 transition-colors duration-500 select-none leading-none pointer-events-none">
        {(index + 1).toString().padStart(2, '0')}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="w-14 h-14 bg-primary/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500 border border-primary/30 group-hover:scale-110">
          <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors duration-500">
            {(index + 1).toString().padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
          {obj.title}
        </h3>
        <p className="text-muted text-lg leading-relaxed">
          {obj.description}
        </p>
      </div>
    </motion.div>
  </motion.div>
);

const Objectives = () => {
  return (
    <div className="relative bg-background py-24 px-4 lg:px-16 w-full overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-[4.5rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tighter drop-shadow-sm select-none uppercase mb-6"
          >
            Our Objectives
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1.5 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(110,159,159,0.5)]"
          />
        </div>

        {/* Mobile & Tablet Layout (Stacked / Grid) */}
        <div className="lg:hidden flex flex-col md:grid md:grid-cols-2 gap-6 relative z-30">
          {/* Logo floats at the top for mobile */}
          <div className="flex justify-center mb-8 md:col-span-2">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="w-48 sm:w-64"
            >
              <img src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757125056/logo_pdqctw_ztwsvl.png" alt="Logo" className="w-full h-auto drop-shadow-2xl" />
            </motion.div>
          </div>

          {objectivesList.map((obj, index) => (
            <FloatingCard key={index} obj={obj} index={index} delay={index * 0.1} />
          ))}
        </div>

        {/* Desktop Layout (Cards Orbiting Logo) */}
        <div className="hidden lg:grid grid-cols-3 gap-8 xl:gap-12 relative items-center min-h-[800px]">
          
          {/* Left Column (Cards 1 & 3) */}
          <div className="flex flex-col gap-12 justify-center">
            <FloatingCard obj={objectivesList[0]} index={0} delay={0.1} />
            <FloatingCard obj={objectivesList[2]} index={2} delay={0.3} />
          </div>

          {/* Center Column (Logo & Card 5) */}
          <div className="flex flex-col gap-12 items-center justify-center h-full relative">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-full max-w-[320px] xl:max-w-[380px] relative z-20 mb-8"
            >
              <img 
                src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757125056/logo_pdqctw_ztwsvl.png" 
                alt="Logo" 
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
            
            <FloatingCard obj={objectivesList[4]} index={4} delay={0.5} />
          </div>

          {/* Right Column (Cards 2 & 4) */}
          <div className="flex flex-col gap-12 justify-center">
            <FloatingCard obj={objectivesList[1]} index={1} delay={0.2} />
            <FloatingCard obj={objectivesList[3]} index={3} delay={0.4} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Objectives;
