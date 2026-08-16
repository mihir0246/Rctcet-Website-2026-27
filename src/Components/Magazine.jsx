// 🔥 Move static data OUTSIDE component (prevents recreation every render)
const magazines = [
  {
    id: 1,
    title: "Valerie",
    tagline: "Stories of Service, Leadership & Fellowship",
    cover:
      "https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1771004255/Valerie_6_1_20260122_230656_0000_taiwh7_1_hsenuy.png",
    link: "https://heyzine.com/flip-book/4b3c042686.html",
    year: "2025-26",
  },
  {
    id: 2,
    title: "Ixlipse",
    tagline: "Ideas That Moved Communities",
    cover:
      "https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1771004320/Ixlipse_25-26_20260122_230410_0000_djrwqo_1_gib3k9.png",
    link: "https://heyzine.com/flip-book/e65c2c32d9.html",
    year: "2025-26",
  },
  {
    id: 3,
    title: "F1 More than a Race",
    tagline: "Pressure Pace, Pit Stops",
    cover:
      "https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1771004388/IMG-20260211-WA0022.jpg_jnpg4m_1_dvfouh.jpg",
    link: "https://heyzine.com/flip-book/9a613c4d89.html",
    year: "2025-26",
  },
];

export const Magazine = () => {
  // Duplicate array multiple times for a seamless infinite scroll on wide screens
  const scrollItems = [...magazines, ...magazines, ...magazines, ...magazines, ...magazines, ...magazines];

  return (
    <section className="py-20 bg-[#faf7f2] dark:bg-[#111111] transition-colors duration-500 overflow-hidden relative">
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }
          .marquee-container {
            display: flex;
            width: max-content;
            animation: scroll-left 35s linear infinite;
          }
          .marquee-container:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="text-center mb-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#F97316] dark:text-orange-400">
          The Rotaract Library
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          A curated archive of our journals and stories.
        </p>
      </div>

      <div className="marquee-container gap-8 px-4">
        {scrollItems.map((mag, idx) => (
          <div
            key={`${mag.id}-${idx}`}
            className="
              group
              w-[280px] sm:w-[300px] shrink-0
              bg-white dark:bg-[#1b1b1b]
              rounded-2xl
              shadow-md dark:shadow-lg
              hover:shadow-xl hover:-translate-y-2
              transition-all duration-300
            "
          >
            <div className="relative aspect-[3/4] p-4 rounded-[20px] overflow-hidden bg-white dark:bg-[#1b1b1b]">
              <img
                src={mag.cover}
                alt={mag.title}
                loading="lazy"
                decoding="async"
                className="
                  w-full h-full
                  object-contain
                  rounded-[20px]
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />
            </div>

            <div className="px-4 pb-6 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 tracking-widest">
                {mag.year}
              </span>

              <h2 className="mt-1 text-base font-semibold text-gray-800 dark:text-gray-200">
                {mag.title}
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 h-8">
                {mag.tagline}
              </p>

              <a
                href={mag.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 px-6 py-2 bg-orange-100 dark:bg-stone-800 rounded-full text-xs font-bold text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-colors"
              >
                Open Volume →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};