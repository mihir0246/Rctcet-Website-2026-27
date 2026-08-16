import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { journeyTimeline } from '../../data/aboutUs';

// Eager load all team data so it's instantly available without async fetching
const teamModules = import.meta.glob('../../data/team/*.js', { eager: true });

const getTeamForYear = (year) => {
    const key = `../../data/team/${year}.js`;
    if (teamModules[key]) {
        return teamModules[key].teamMembers || [];
    }
    return [];
}

const TeamGrid = ({ members }) => {
    if (!members || members.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full mt-6 md:mt-8 overflow-hidden"
        >
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-2 custom-scrollbar">
                {members.map((member, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + (i * 0.05), type: "spring" }}
                        key={i}
                        className="snap-center shrink-0 w-44 md:w-56 bg-white dark:bg-[#2a241f] p-3 pb-5 md:p-4 md:pb-6 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-stone-200 dark:border-stone-700 transform transition-transform duration-300 hover:scale-105 hover:-rotate-2 hover:z-10"
                    >
                        <div className="w-full aspect-square bg-stone-100 dark:bg-stone-900 mb-3 md:mb-4 overflow-hidden rounded-sm shadow-inner relative">
                            <img
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                className="w-full h-full object-cover filter sepia-[0.1] contrast-[1.05] hover:sepia-0 transition-all duration-500"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 border-[2px] border-black/5 dark:border-white/5 pointer-events-none rounded-sm"></div>
                        </div>
                        <div className="text-center font-sans px-2">
                            <h5 className="font-bold text-stone-800 dark:text-stone-100 text-sm md:text-lg line-clamp-1">{member.name}</h5>
                            <p className="text-orange-600 dark:text-orange-400 font-semibold text-[10px] md:text-xs mt-1 md:mt-2 uppercase tracking-[0.15em] line-clamp-1">
                                {member.role}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const TimelineNode = ({ item, index }) => {

    // We use a custom scroll tracker instead of useInView so it stays open when scrolling down
    const dotRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!dotRef.current) return;
            const rect = dotRef.current.getBoundingClientRect();
            // Window center line
            const centerLine = window.innerHeight / 2;

            // If the dot is above the center line, it means user has scrolled down past it (or to it)
            if (rect.top < centerLine) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const team = getTeamForYear(item.year);
    const nonPresidents = team.filter(m => m.role?.toLowerCase() !== 'president');

    const PresidentText = () => (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="flex flex-col text-left gap-1 w-full"
        >
            <h3 className="text-xl md:text-3xl font-bold text-stone-800 dark:text-stone-100 font-sans tracking-wide">
                {item.name}
            </h3>
            <p className="text-orange-600 dark:text-orange-400 font-bold text-lg md:text-xl">
                {item.year}
            </p>
            {item.rank && (
                <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base whitespace-pre-line mt-1">
                    {item.rank}
                </p>
            )}
        </motion.div>
    );

    const PresidentPhoto = () => (
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
            }}
            className="relative group cursor-pointer shrink-0"
        >
            <motion.div
                animate={{
                    borderColor: isOpen ? "#f97316" : "#ffffff",
                    scale: isOpen ? 1.05 : 1
                }}
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-orange-200 dark:bg-[#e49b6b] rounded-full flex items-center justify-center overflow-hidden border-4 shadow-xl transition-all duration-300 dark:border-stone-800"
                style={{ borderTopLeftRadius: "50%", borderTopRightRadius: "50%", borderBottomRightRadius: "50%", borderBottomLeftRadius: "5%" }}
            >
                <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-500 filter ${isOpen ? 'scale-110 brightness-105' : 'brightness-95'} group-hover:scale-110 group-hover:brightness-105`}
                />
            </motion.div>
        </motion.div>
    );

    return (
        <motion.div layout className="relative flex flex-col items-start w-full my-8 md:my-12">

            <div className="relative flex flex-col w-full z-10 pl-16 md:pl-32 pr-4 md:pr-12">

                {/* Center Dot & Ref for Tracking (Now on the left) */}
                <div className="absolute left-[20px] md:left-[40px] top-4 md:top-12 -translate-x-1/2 flex justify-center items-center z-20">
                    <div ref={dotRef} className="absolute w-10 h-10" />

                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        animate={{
                            backgroundColor: isOpen ? "#f97316" : "#e7e5e4",
                            scale: isOpen ? 1.3 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-white dark:border-stone-900 transition-shadow duration-300 ${isOpen ? 'shadow-[0_0_20px_rgba(249,115,22,0.8)]' : 'shadow-none'}`}
                    />
                </div>

                {/* Content Container */}
                <div className="flex flex-col w-full">
                    {/* President Info Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10">
                        <PresidentPhoto />
                        <PresidentText />
                    </div>

                    {/* Team Grid (Full Width on the right) */}
                    <AnimatePresence mode="wait">
                        {isOpen && <TeamGrid members={nonPresidents} />}
                    </AnimatePresence>
                </div>
            </div>

        </motion.div>
    );
};

export const OurJourney = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section className="py-20 bg-stone-50 dark:bg-stone-900 overflow-hidden relative font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

                <div className="text-center mb-20 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-stone-800 dark:text-stone-100"
                    >
                        Our Journey
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-stone-500 dark:text-stone-400 text-lg"
                    >
                        Scroll down to reveal the leaders and teams who shaped our legacy.
                    </motion.p>
                </div>

                <div className="relative" ref={containerRef}>
                    {/* The left vertical line */}
                    <div className="absolute left-[20px] md:left-[40px] top-0 bottom-0 w-[2px] bg-stone-200 dark:bg-stone-700 -translate-x-1/2 overflow-hidden">
                        <motion.div
                            className="w-full bg-orange-500 origin-top h-full"
                            style={{ scaleY }}
                        />
                    </div>

                    <div className="flex flex-col relative z-10 pt-8 pb-8">
                        {journeyTimeline.map((item, index) => (
                            <TimelineNode key={item.year} item={item} index={index} />
                        ))}
                    </div>
                </div>

            </div>

            {/* Global style for the horizontal scrollbar */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #f97316;
                    border-radius: 20px;
                    border: 2px solid transparent;
                    background-clip: padding-box;
                }
            `}</style>
        </section>
    );
}