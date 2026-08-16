import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { journeyTimeline } from '../../data/aboutUs';
import { FiX } from 'react-icons/fi';

// Team Group Photo Modal Placeholder
const TeamModal = ({ year, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-stone-100 dark:bg-stone-800 p-6 md:p-10 rounded-3xl max-w-5xl w-full shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-stone-200 dark:bg-stone-700 hover:bg-orange-500 hover:text-white rounded-full transition-colors z-10"
                >
                    <FiX size={24} />
                </button>
                <h3 className="text-3xl md:text-4xl font-bold font-serif text-stone-900 dark:text-stone-100 mb-6 text-center">
                    Core Team {year}
                </h3>
                <div className="w-full aspect-video bg-stone-300 dark:bg-stone-700 rounded-2xl flex flex-col items-center justify-center overflow-hidden border-4 border-white dark:border-stone-600 shadow-inner">
                    {/* Placeholder for the team photo */}
                    <div className="text-stone-500 dark:text-stone-400 font-medium text-lg flex flex-col items-center gap-3">
                        <svg className="w-20 h-20 opacity-50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-2xl font-bold">Team Photo Placeholder</span>
                        <span className="text-base font-normal opacity-80">Ink to be added later</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Desktop Squished Wavy Timeline (One View)
const DesktopJourney = ({ onSelectYear }) => {
    // Nodes configured to match the exact wavy layout requested
    const nodes = [
        { x: 150 / 19.2, y: 400 / 8, text: 'right' },
        { x: 330 / 19.2, y: 150 / 8, text: 'left' },
        { x: 510 / 19.2, y: 700 / 8, text: 'left' },
        { x: 690 / 19.2, y: 500 / 8, text: 'bottom' },
        { x: 870 / 19.2, y: 350 / 8, text: 'bottom' },
        { x: 1050 / 19.2, y: 150 / 8, text: 'right' },
        { x: 1230 / 19.2, y: 500 / 8, text: 'right' },
        { x: 1410 / 19.2, y: 700 / 8, text: 'left' },
        { x: 1590 / 19.2, y: 300 / 8, text: 'bottom' },
        { x: 1770 / 19.2, y: 450 / 8, text: 'right' }
    ];

    const pathData = "M 0 400 L 150 400 C 240 400, 240 150, 330 150 C 420 150, 420 700, 510 700 C 600 700, 600 500, 690 500 C 780 500, 780 350, 870 350 C 960 350, 960 150, 1050 150 C 1140 150, 1140 500, 1230 500 C 1320 500, 1320 700, 1410 700 C 1500 700, 1500 300, 1590 300 C 1680 300, 1680 450, 1770 450 L 1920 450";

    return (
        <div className="hidden lg:block w-full overflow-hidden aspect-[1920/1000] xl:aspect-[1920/800] relative">
            {/* Base Neutral Line (Black track) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1920 800" preserveAspectRatio="none">
                <path
                    d={pathData}
                    fill="none"
                    stroke="#78716c"
                    strokeWidth="8"
                    strokeDasharray="24 16"
                    className="opacity-40"
                />
                {/* Flowing Orange Pulse (Blood flow effect) */}
                <motion.path
                    d={pathData}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_12px_rgba(249,115,22,1)]"
                    initial={{ pathLength: 0, pathOffset: 0, opacity: 1 }}
                    whileInView={{
                        pathLength: [0, 1, 1, 1],
                        pathOffset: [0, 0, 0, 1],
                    }}
                    viewport={{ margin: "-100px" }}
                    transition={{
                        duration: 7,
                        times: [0, 0.57, 0.64, 1],
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 0.7
                    }}
                />
            </svg>

            {/* Nodes */}
            {journeyTimeline.map((item, index) => {
                const node = nodes[index];
                if (!node) return null;

                const bloodDelay = (node.x / 100) * 4;

                return (
                    <motion.div
                        key={item.year}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "2000px" }}
                        transition={{ duration: 0.5, delay: bloodDelay, type: "spring" }}
                        className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group z-10"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                        {/* The Circle Pin Container */}
                        <div
                            onClick={() => onSelectYear(item.year)}
                            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-transform duration-300 hover:scale-110 hover:z-30 w-20 h-20 xl:w-24 xl:h-24"
                        >
                            {/* The Circle Shape */}
                            <div className="w-full h-full bg-stone-900 border-4 border-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)] p-1 flex items-center justify-center">
                                <div className="w-full h-full rounded-full overflow-hidden border-2 border-stone-800 dark:border-stone-900 bg-stone-800">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Year and Name Labels */}
                            <div
                                className={`absolute min-w-[140px] xl:min-w-[180px] pointer-events-none ${node.text === 'left' ? 'right-[40px] xl:right-[60px] text-right' :
                                    node.text === 'right' ? 'left-[40px] xl:left-[60px] text-left' :
                                        node.text === 'bottom' ? 'top-[40px] xl:top-[60px] left-1/2 -translate-x-1/2 text-center' :
                                            'bottom-[40px] xl:bottom-[60px] left-1/2 -translate-x-1/2 text-center'
                                    }`}
                            >
                                <h3 className="text-sm xl:text-base font-bold text-stone-800 dark:text-stone-100 leading-tight drop-shadow-md">{item.name}</h3>
                                <p className="text-stone-600 dark:text-orange-400 font-semibold text-xs xl:text-sm drop-shadow-sm">{item.year}</p>
                                <p className="text-stone-500 dark:text-stone-400 text-[10px] xl:text-xs whitespace-pre-line leading-snug mt-0.5">{item.rank}</p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div >
    );
};

// Mobile Vertical Straight Timeline
const MobileJourney = ({ onSelectYear }) => {
    return (
        <div className="lg:hidden flex flex-col relative py-8 px-4 w-full max-w-lg mx-auto">
            {/* Center Timeline Base (Grey tube) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-stone-400 dark:bg-stone-600 opacity-40 -translate-x-1/2 z-0 overflow-hidden rounded-full">
                {/* Flowing Orange Pulse */}
                <motion.div
                    initial={{ top: "0%", height: "0%" }}
                    whileInView={{
                        top: ["0%", "0%", "0%", "100%"],
                        height: ["0%", "100%", "100%", "0%"],
                    }}
                    viewport={{ margin: "-100px" }}
                    transition={{
                        duration: 7,
                        times: [0, 0.57, 0.64, 1],
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                    className="absolute left-0 w-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,1)] rounded-full"
                />
            </div>

            {journeyTimeline.map((item, index) => {
                const isPhotoLeft = index % 2 === 0;
                const borderRadiusStyle = isPhotoLeft
                    ? { borderTopLeftRadius: "50%", borderTopRightRadius: "50%", borderBottomRightRadius: "5%", borderBottomLeftRadius: "50%" }
                    : { borderTopLeftRadius: "50%", borderTopRightRadius: "50%", borderBottomRightRadius: "50%", borderBottomLeftRadius: "5%" };

                return (
                    <motion.div
                        key={item.year}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="relative z-10 w-full mb-16 last:mb-0"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-500 border-4 border-white dark:border-stone-900 shadow-md z-20" />

                        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isPhotoLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                            <div
                                onClick={() => onSelectYear(item.year)}
                                className={`relative w-1/2 flex justify-center cursor-pointer group ${isPhotoLeft ? 'sm:justify-end' : 'sm:justify-start'}`}
                            >
                                <div
                                    className="w-24 h-24 sm:w-28 sm:h-28 bg-orange-200 dark:bg-[#e49b6b] overflow-hidden border-4 border-white dark:border-stone-800 shadow-lg transition-transform hover:scale-105 relative"
                                    style={borderRadiusStyle}
                                >
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <div className={`w-1/2 flex flex-col ${isPhotoLeft ? 'text-left items-start' : 'text-right items-end'}`}>
                                <h3 className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-100 leading-tight">
                                    {item.name}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-300 font-medium text-xs sm:text-sm">
                                    {item.year}
                                </p>
                                <p className="text-stone-500 dark:text-stone-400 text-xs mt-1 whitespace-pre-line">
                                    {item.rank}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export const OurJourney = () => {
    const [selectedYear, setSelectedYear] = useState(null);

    return (
        <section className="py-20 bg-transparent overflow-hidden relative font-sans">
            <div className="container mx-auto px-2 xl:px-4 max-w-[1600px] relative z-10 w-full">

                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-stone-800 dark:text-stone-100"
                    >
                        Our Journey
                    </motion.h2>
                </div>

                <DesktopJourney onSelectYear={setSelectedYear} />
                <MobileJourney onSelectYear={setSelectedYear} />

            </div>

            <AnimatePresence>
                {selectedYear && (
                    <TeamModal year={selectedYear} onClose={() => setSelectedYear(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};
