import { motion } from "framer-motion";

const LimelightIndicator = () => {
  const lampRatio = 0.55; // Lamp bar is 55% of the active item width
  const lampLeftPct = ((1 - lampRatio) / 2) * 100;
  const lampRightPct = (1 - (1 - lampRatio) / 2) * 100;

  return (
    <motion.div
      layoutId="limelight"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute -top-1 -inset-x-0 h-[calc(100%+4px)] pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* 1. Floor puddle: Ground spotlight reflection at the base */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[-3px] pointer-events-none rounded-full z-0"
        style={{
          width: "65%",
          height: "14px",
          background:
            "radial-gradient(ellipse at center, rgb(var(--primary) / 0.35) 0%, rgb(var(--primary) / 0.12) 55%, transparent 100%)",
          filter: "blur(3px)",
        }}
      />

      {/* 2. Spotlight cone: Clean downward trapezoid beam */}
      <div
        className="absolute left-0 top-[3px] w-full h-[calc(100%-4px)] pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgb(var(--primary) / 0.45) 0%, rgb(var(--primary) / 0.22) 40%, rgb(var(--primary) / 0.06) 80%, transparent 100%)",
          clipPath: `polygon(${lampLeftPct}% 0%, ${lampRightPct}% 0%, 100% 100%, 0% 100%)`,
          filter: "blur(1.5px)",
        }}
      />

      {/* 3. Soft ambient glow around the beam */}
      <div
        className="absolute -left-[6%] top-0 w-[112%] h-[calc(100%+2px)] pointer-events-none z-0 rounded-b-xl"
        style={{
          background:
            "radial-gradient(ellipse 65% 85% at 50% 0%, rgb(var(--primary) / 0.20) 0%, rgb(var(--primary) / 0.06) 60%, transparent 95%)",
          filter: "blur(4px)",
        }}
      />

      {/* 4. Top horizontal glowing lamp emitter bar */}
      <div className="flex justify-center w-full relative z-20">
        <div
          className="h-[3.5px] rounded-full bg-primary"
          style={{
            width: `${lampRatio * 100}%`,
            boxShadow:
              "0 0 8px rgb(var(--primary)), 0 0 16px rgb(var(--primary) / 0.8), 0 0 24px rgb(var(--primary) / 0.4)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default LimelightIndicator;
