import { useState } from 'react';

const EndeavorsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            "image": 'https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_1200,c_limit/v1757943827/Copy_of_IMG_4190_ayzbil_lplixh_rd534g.webp',
            "title": 'Jashn-E- 3141 International',
            "description": 'Jashn-E-3141 International was hosted by the Rotaract Club of TCET, where delegates from Germany and Paris experienced Mumbai’s spirit and Indian traditions, fostering cultural exchange and global fellowship.',
        },
        {
            "image": 'https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_1200,c_limit/v1756972379/IMG-20250829-WA0098_idzppp.jpg',
            "title": 'Jashn-E-3141 Domestic',
            "description": 'Jashn-E-3141 Domestic saw the Rotaract Club of TCET warmly host delegates from Districts 3192 and 3012, showcasing Mumbai’s vibrant culture through a city tour and Ganpati festival celebrations by visiting iconic pandals together.',
        },
        {
            "image": 'https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_1200,c_limit/v1757945121/Copy_of_IMG_9220_nbnwef_avwaq8.jpg',
            "title": 'Kalakriti 2.0',
            "description": 'Rotaract Club of TCET organized Kalakriti 2.0, celebrating Ganesh Chaturthi in an eco-friendly way with underprivileged children, cancer patients, and elderly residents through clay and paper-cup idol making, creating cherished moments and leaving a smile on their faces.',
        },
        {
            "image": 'https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_1200,c_limit/v1757945122/Copy_of_IMG_0479_hnf9df_k6na1u.jpg',
            "title": '.Rotract’s Day Out',
            "description": 'Rotaract’s Day Out held at Bandstand, Bandra, to foster fellowship and team bonding among members. The event featured a series of engaging outdoor games and activities, creating an atmosphere of joy, collaboration, and togetherness. It concluded with music, dance, and a spirit of camaraderie, setting a vibrant tone for the year ahead.',
        },
        {
            "image": 'https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_1200,c_limit/v1757945121/nin_4_vghiwb_hm4j1p.jpg',
            "title": 'Nation In Number',
            "description": 'Nations in Numbers, hosted by the Rotaract Club of TCET on World Population Day, engaged students through cultural pitches, buzzer rounds, and rapid-fire quizzes. The event blended statistics with storytelling, encouraging participants to analyze global demographic challenges. It fostered awareness, creativity, and a deeper understanding of cultural and population dynamics.',
        },
        {
            "image": 'https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_1200,c_limit/v1756974053/WhatsApp_Image_2025-09-04_at_13.50.06_0ec3e874_jm4h43.jpg',
            "title": 'Rotaract Rumble',
            "description": 'Rebrand Rumble was an inter-collegiate competition where participants reimagined brands with creative twists and showcased their entrepreneurial skills. The event combined fun, innovation, and learning through witty pitches and a high-energy quiz.',
        },
        {
            "image": 'https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_1200,c_limit/v1756785672/Copy_of_IMG_1577_1_qflxxv.jpg',
            "title": 'Monsoon match Day 2.0',
            "description": 'Monsoon Matchday 2.0 a football tournament,  brought together enthusiastic players and Rotaractors, carried out through structured knockout and final rounds, with Red Bull as the official energy partner.',
        },
        {
            "image": 'https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_1200,c_limit/v1757943825/PXL_20250718_060353784_i7fthn_jxd25r.jpg',
            "title": 'Panache',
            "description": 'Panache, organised by the Rotaract Club of TCET at Ramniwas Bajaj English High School, was an interschool fest celebrating creativity, leadership, and talent. With 14 diverse events ranging from debates and quizzes to dance, drama, and design challenges, students showcased their skills with confidence and joy. The fest not only nurtured young minds but also created cherished memories, leaving smiles on the faces of children, parents, and teachers alike.',
        },
      ]
      


    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
return (
  <div className="bg-white dark:bg-stone-900 flex flex-col items-center justify-center mt-10">
    <div className="w-full max-w-5xl flex max-sm:flex-col justify-center items-center gap-x-4 gap-y-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-amber-800 to-yellow-400 dark:from-yellow-600 dark:to-yellow-200">Our Latest Endeavours</h1>
      <div className="flex gap-x-2">
        <button onClick={prevSlide} className="bg-amber-50 dark:bg-stone-700 text-black dark:text-stone-200 p-1 md:p-3 rounded-full hover:bg-amber-100 dark:hover:bg-stone-600 transition-colors">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={nextSlide} className="bg-amber-50 dark:bg-stone-700 text-black dark:text-stone-200 p-1 md:p-3 rounded-full hover:bg-amber-100 dark:hover:bg-stone-600 transition-colors">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <div className="relative max-w-5xl overflow-hidden rounded-md shadow-lg m-4">
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-orange-500 dark:bg-yellow-400' : 'bg-gray-300 dark:bg-stone-600'}`}>
          </span>
        ))}
      </div>

      <div className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[32rem] object-cover"
              loading={"lazy"}
            />
            
            <div className="absolute bottom-4 md:bottom-12 lg:bottom-20 left-4 bg-black/60 dark:bg-black/80 p-2 md:p-4 rounded-lg mr-5 max-w-[90%] md:max-w-[70%]">
              <h3 className="text-sm md:text-lg xl:text-xl font-bold text-white">{slide.title}</h3>
              <p className="text-[0.65rem] md:text-sm xl:text-base text-white mt-1 md:mt-2">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default EndeavorsCarousel;
