import { motion } from "framer-motion";
import { avenuesInfo as allinfo } from "../data/avenues";

export const Avenue = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="bg-card dark:bg-card text-foreground transition-colors duration-300 relative overflow-hidden min-h-screen pt-24 pb-20">
      <div className="flex flex-col items-center justify-center text-center px-4 mb-20 relative z-10 w-full max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl lg:text-[6rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/40 dark:from-white dark:to-white/30 tracking-tighter drop-shadow-sm uppercase mb-4"
        >
          Avenues of <span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">Service</span>
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 tracking-wide drop-shadow-sm"
        >
          Building Leaders, Serving Communities, Creating Impact
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-2xl h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full mb-8 shadow-[0_0_15px_rgba(110,159,159,0.3)]"
        />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg lg:text-xl text-foreground/80 dark:text-muted/90 max-w-2xl font-bold tracking-wide drop-shadow-sm"
        >
          Discover the avenues of service that inspire action and create lasting impact in our community
        </motion.p>
      </div>

      {/* AVENUES GRID */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {allinfo.map((item, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="group relative w-full h-auto min-h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl shadow-primary/5 border border-white/20 dark:border-white/10 bg-white/20 dark:bg-black/30 backdrop-blur-xl flex flex-col transition-transform duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="w-full h-[250px] p-4 relative overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-black/5 dark:bg-black/40 rounded-[2rem] flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
                   <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                   <img
                    src={item.img}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Glowing Border on Hover */}
              <div className="absolute inset-0 rounded-[2.5rem] border-[3px] border-primary/0 group-hover:border-primary/50 transition-colors duration-500 z-20 pointer-events-none" />

              {/* Content Area */}
              <div className="w-full flex-grow flex flex-col items-center p-6 text-center z-20 pt-2">
                <div className="w-12 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_rgba(110,159,159,0.5)]" />
                <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-3 uppercase tracking-tight drop-shadow-md">
                  {item.title}
                </h3>
                <p className="text-foreground/90 dark:text-muted/90 font-bold text-sm sm:text-base leading-relaxed drop-shadow-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
