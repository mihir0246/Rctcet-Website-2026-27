import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <button 
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-full h-full rounded-full bg-transparent hover:bg-primary/10 text-primary transition-colors focus:outline-none group"
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500 ease-in-out drop-shadow-sm"
        style={{ transform: isDark ? 'rotate(-90deg)' : 'rotate(45deg)' }}
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          {/* 
            In Light Mode (Sun): Move mask circle completely out of view (cx=25, cy=0)
            In Dark Mode (Moon): Move mask circle to cut a sleek crescent (cx=17, cy=7) 
          */}
          <circle 
            cx={isDark ? "17" : "25"} 
            cy={isDark ? "7" : "0"} 
            r="9" 
            fill="black" 
            className="transition-all duration-500 ease-in-out" 
          />
        </mask>
        
        {/* 
          Main circle. 
          Use solid fill and no stroke to avoid the "watermelon rind" effect on the moon!
        */}
        <circle 
          cx="12" 
          cy="12" 
          r={isDark ? "9" : "5"} 
          mask="url(#moon-mask)" 
          className="fill-primary stroke-transparent group-hover:fill-primary/80 transition-all duration-500 ease-in-out" 
        />
        
        {/* Rays of the sun */}
        <g 
          className="stroke-primary group-hover:stroke-primary/80 transition-all duration-500 ease-in-out"
          style={{ 
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'scale(0.3)' : 'scale(1)',
            transformOrigin: 'center'
          }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
};

export default ThemeToggle;