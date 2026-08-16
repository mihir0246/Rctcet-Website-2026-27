import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { journeyTimeline } from '../../data/aboutUs';

export const OurJourney = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // The line grows downwards as you scroll
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section className="py-20 bg-white dark:bg-stone-900 overflow-hidden relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-stone-800 dark:text-stone-100"
                    >
                        Our Journey
                    </motion.h2>
                </div>

                <div className="relative" ref={containerRef}>
                    {/* The central dashed vertical line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-stone-200 dark:bg-stone-700 -translate-x-1/2 overflow-hidden">
                        <motion.div
                            className="w-full bg-orange-500 origin-top h-full"
                            style={{ scaleY }}
                        />
                    </div>

                    <div className="flex flex-col gap-12 md:gap-24 relative z-10 pt-8 pb-8">
                        {journeyTimeline.map((item, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div key={item.year} className="relative flex flex-col md:flex-row items-center w-full">

                                    {/* Mobile connector line to dot */}
                                    <div className="absolute left-[20px] top-[40px] w-6 h-[2px] bg-orange-500 md:hidden z-0" />

                                    {/* Desktop left side */}
                                    <div className={`w-full md:w-1/2 flex pl-16 pr-4 md:px-8 ${isEven ? 'md:justify-end' : 'md:justify-start md:order-last'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                                            className={`flex flex-col text-left ${isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} gap-1`}
                                        >
                                            <h3 className="text-xl md:text-2xl font-bold text-stone-800 dark:text-stone-100 font-sans tracking-wide">
                                                {item.name}
                                            </h3>
                                            <p className="text-orange-600 dark:text-orange-400 font-medium text-lg">
                                                {item.year}
                                            </p>
                                            {item.rank && (
                                                <p className="text-stone-500 dark:text-stone-400 text-sm whitespace-pre-line mt-1">
                                                    {item.rank}
                                                </p>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Center Dot & Image */}
                                    <div className="absolute left-[20px] md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 flex justify-center items-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="w-4 h-4 rounded-full bg-orange-500 z-20 shadow-[0_0_15px_rgba(249,115,22,0.5)] border-4 border-white dark:border-stone-900"
                                        />
                                    </div>

                                    {/* Desktop right side (Image Droplet) */}
                                    <div className={`w-full md:w-1/2 flex mt-6 md:mt-0 pl-16 pr-4 md:px-12 ${isEven ? 'md:justify-start md:order-last' : 'md:justify-end'}`}>
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: index * 0.5
                                            }}
                                            className="relative group cursor-pointer"
                                        >
                                            {/* Droplet Background Shape */}
                                            <div className="w-32 h-32 md:w-40 md:h-40 bg-orange-200 dark:bg-[#e49b6b] rounded-full flex items-center justify-center overflow-hidden border-4 border-white dark:border-stone-800 shadow-xl"
                                                style={{ borderTopLeftRadius: "50%", borderTopRightRadius: "50%", borderBottomRightRadius: "50%", borderBottomLeftRadius: "5%" }}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-95 group-hover:brightness-105"
                                                />
                                            </div>
                                        </motion.div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}