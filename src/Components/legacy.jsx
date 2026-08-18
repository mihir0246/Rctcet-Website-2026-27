import PropTypes from "prop-types";

function FounderCard() {
  return (
    <div className="relative bg-[url('/bg-fcard.svg')] bg-cover bg-no-repeat h-full p-4 bg-white shadow-lg rounded-lg">
      <img
        src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756748768/founders_evg6h2.svg"
        alt="Founder and early members of Rotary International"
        className="w-full mb-4 rounded-xl"
        loading={"lazy"}
      />
      <h2 className="text-lg font-bold">FOUNDER</h2>
      <p className="text-md text-[#9D320F] font-bold mt-2">
        Personality has power to uplift, power to depress, power to curse, and
        power to bless.
      </p>
      <p className="mt-2 text-gray-600">- Paul P. Harris, Founder</p>
    </div>
  );
}


function Card({ title, image, description, isBig, url }) {
  return (
    <div className={`relative w-full rounded-lg shadow-lg overflow-hidden`}>
      <img src={image} alt={title} className="w-full lg:h-72 object-cover object-[center_10%]" loading={"lazy"} />
      <div className="hover:opacity-100 opacity-0 duration-500 flex">
        <div className="absolute top-[0%] p-0 left-0 w-full h-full flex blur-[2px] items-baseline text-left bg-black/50"></div>
        <div className="text-white absolute bottom-[7%]  blur-none pl-2 px-4 py-2 lg:pt-10">
          <h2 className="font-bold text-md">{title}</h2>
          <p className="text-xs max-md:max-h-[5vh] max-sm:hidden">{description}</p>
        </div>
      </div>
      {url && (
        <a
          href={url}
          className=" absolute bottom-2 right-2  inline-block px-2 py-1 sm:px-4 sm:py-2 bg-[#FE7011] text-white text-[0.5rem] sm:text-xs font-medium rounded hover:bg-[#98430A] transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Know More
        </a>
      )}
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
    <div className="p-8 bg-amber-50 dark:bg-stone-800 flex justify-center items-center relative">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none invert dark:invert-0" 
        style={{ 
          backgroundImage: `url('https://res.cloudinary.com/dtc2xaeaf/image/upload/v1787046705/rotary_lvjasx-removebg-preview_vn6ndx.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto'
        }}
      ></div>
      <div className="max-w-7xl">
        <h1 className="text-center text-xl md:text-4xl font-bold mb-6 bg-gradient-to-b from-amber-800 via-orange-500 to-yellow-400 dark:from-yellow-600 dark:via-yellow-400 dark:to-yellow-200 bg-clip-text text-transparent">Rotary & Rotaract</h1>
        <div className="flex max-sm:flex-col gap-y-4 gap-x-6 max-w-5xl">
          <div className="sm:basis-[40%]">
            <FounderCard />
          </div>
          <div className="sm:basis-[60%] flex flex-col gap-y-6">
            <Card
              title="Rotary International"
              image="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756759996/IMG-20250719-WA0061_kqc9tx.jpg"
              description="Rotary International is a global network of dedicated professionals and leaders committed to humanitarian service, peace, and goodwill. With over 1.4 million members across 46,000+ clubs worldwide, Rotary addresses critical issues like education, healthcare, clean water, and community development. Guided by the motto 'Service Above Self,' Rotary fosters international collaboration, ethical leadership, and sustainable impact to create a better world for future generations."
              isBig
              url="https://my.rotary.org/en/"
              className="bg-white dark:bg-stone-700 text-gray-800 dark:text-stone-200"
            />
            <Card
              title="District 3141"
              image="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756760931/689352456be4725a6261e0ae_jty8nv.jpg"
              description="Rotaract District 3141 is one of the most dynamic Rotaract districts, encompassing clubs across Mumbai and its suburbs. Committed to service, leadership, and professional development, the district actively engages in impactful projects. Through collaborations, social initiatives, and networking opportunities, Rotaract District 3141 empowers young individuals to create meaningful change while upholding the values of Rotary International."
              isBig
              url="https://www.instagram.com/rotaract_mumbai?igsh=MWlteDgwMG91dDA2eA=="
              className="bg-white dark:bg-stone-700 text-gray-800 dark:text-stone-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Legacy;