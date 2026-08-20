import PropTypes from "prop-types";

function FounderCard() {
  return (
    <div className="relative overflow-hidden group h-full rounded-[2rem] shadow-xl dark:shadow-black/50 border border-white/60 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
        <div className="w-full h-64 md:h-72 overflow-hidden rounded-2xl mb-6 shadow-inner relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 opacity-60" />
          <img
            src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756748768/founders_evg6h2.svg"
            alt="Founder and early members of Rotary International"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
            loading={"lazy"}
          />
          <h2 className="absolute bottom-4 left-4 z-20 text-2xl font-black text-white tracking-wide drop-shadow-md">THE FOUNDER</h2>
        </div>

        <div className="flex-grow flex flex-col justify-center">
          <p className="text-lg md:text-xl text-foreground font-semibold italic leading-relaxed">
            "Personality has power to uplift, power to depress, power to curse, and
            power to bless."
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-primary"></div>
            <p className="text-sm font-bold text-muted uppercase tracking-wider">Paul P. Harris</p>
          </div>
        </div>
      </div>
    </div>
  );
}


function Card({ title, image, description, isBig, url }) {
  return (
    <div className="relative w-full rounded-[2rem] shadow-lg overflow-hidden group h-full min-h-[350px]">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover object-[center_10%] transform group-hover:scale-105 transition-transform duration-1000" loading={"lazy"} />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 backdrop-blur-none group-hover:backdrop-blur-md bg-black/0 group-hover:bg-black/30 transition-all duration-700 ease-in-out pointer-events-none" />

      <div className="absolute inset-0 flex flex-col p-6 md:p-10 z-10 pointer-events-none">
        <div className="mt-auto pointer-events-auto">
          <h2 className="font-black text-3xl md:text-4xl text-white mb-0 group-hover:mb-4 drop-shadow-md transform transition-all duration-500 ease-out">{title}</h2>

          <div className="grid transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <div className="overflow-hidden">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed pr-8">
                {description}
              </p>

              {url && (
                <a
                  href={url}
                  className="mt-6 inline-flex items-center gap-2 w-max px-6 py-2.5 bg-primary/90 backdrop-blur-md text-white text-sm font-bold rounded-full hover:bg-primary transition-colors duration-300 shadow-lg shadow-primary/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discover More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isBig: PropTypes.bool,
  url: PropTypes.string
};

function Legacy() {
  return (
    <div className="bg-background relative overflow-hidden">

      {/* Soft Organic SVG Divider at Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg className="relative block w-full h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-card dark:fill-[#0c111c]"></path>
        </svg>
      </div>

      <div className="p-8 md:p-16 lg:py-24 flex justify-center items-center relative z-10">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none invert dark:invert-0"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dtc2xaeaf/image/upload/v1787046705/rotary_lvjasx-removebg-preview_vn6ndx.png')`,
            backgroundRepeat: 'repeat',
            backgroundSize: '150px'
          }}
        ></div>

        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl w-full relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-5xl leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/40 tracking-tighter drop-shadow-sm select-none uppercase">Rotary & Rotaract</h1>
            <p className="mt-4 text-muted text-lg font-medium max-w-2xl mx-auto">The foundation of service, leadership, and professional development.</p>
          </div>

          <div className="flex max-lg:flex-col gap-8 max-w-6xl mx-auto">
            <div className="lg:w-5/12">
              <FounderCard />
            </div>
            <div className="lg:w-7/12 flex flex-col gap-8">
              <Card
                title="Rotary International"
                image="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756759996/IMG-20250719-WA0061_kqc9tx.jpg"
                description="Rotary International is a global network of dedicated professionals and leaders committed to humanitarian service, peace, and goodwill. With over 1.4 million members across 46,000+ clubs worldwide, Rotary addresses critical issues like education, healthcare, clean water, and community development. Guided by the motto 'Service Above Self,' Rotary fosters international collaboration, ethical leadership, and sustainable impact to create a better world for future generations."
                isBig
                url="https://my.rotary.org/en/"
              />
              <Card
                title="District 3141"
                image="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1786984892/Nidhi_with_drr_hgbrjj.jpg"
                description="Rotaract District 3141 is one of the most dynamic Rotaract districts, encompassing clubs across Mumbai and its suburbs. Committed to service, leadership, and professional development, the district actively engages in impactful projects. Through collaborations, social initiatives, and networking opportunities, Rotaract District 3141 empowers young individuals to create meaningful change while upholding the values of Rotary International."
                isBig
                url="https://www.instagram.com/rotaract_mumbai?igsh=MWlteDgwMG91dDA2eA=="
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Legacy;