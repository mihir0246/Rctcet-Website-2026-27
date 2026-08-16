import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination, Autoplay } from "swiper/modules";
import Projectachievement from "./Projectachivement";

export const Achievement = () => {
  return (
    <section className="mx-[10px] mt-20 bg-white dark:bg-[#1a1410] text-black dark:text-white transition-colors duration-300">
      {/* Heading */}
      <div className="flex items-center justify-center mt-5 w-full">
        <h1 className="text-4xl font-extrabold bg-gradient-to-t from-orange-500 to-orange-600 bg-clip-text text-transparent tracking-wide uppercase">
          Achievements
        </h1>
      </div>

      {/* Highlight box */}
      <div className="flex justify-center my-[20px]">
        <div className="p-5 lg:p-10 rounded-[20px] bg-[#FFEFD9] flex justify-center items-center">
          <p className="md:text-md text-center font-poppins italic text-[rgba(254,112,17,1)] font-bold text-[28px]">
            8<sup>th</sup> Best Club in Rotaract District R.I.D 3141
          </p>
        </div>
      </div>

      <h2 className="text-4xl mt-[10vh] font-extrabold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent text-center ">
        CLUB ACHIEVEMENT
      </h2>
      <div
        className="w-full flex flex-col lg:flex-row items-center justify-around 
                    h-auto lg:h-[600px] 
                    bg-[url('https://www.rc.tcetmumbai.in/Achievement/Baseline%20grid%20bg.svg')] 
                    bg-cover bg-center p-6 
                  bg-white dark:bg-[#1a1410] "
      >
<div className="w-full lg:w-1/2 mb-6 lg:mb-0 relative flex justify-center">
  <div className="w-full max-w-2xl aspect-[16/9]">
<Swiper
  modules={[Pagination, Autoplay]}
  spaceBetween={20}
  slidesPerView={1}
  pagination={{
    clickable: true,
  }}
  autoplay={{ delay: 5000 }}
  className="achievement-swiper w-full h-full rounded-xl overflow-hidden shadow-xl"
>
      {slides.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute bottom-0 w-full bg-black/70">
              <p className="text-center text-white py-3 font-semibold text-lg">
                {item.desc}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>

        {/* Right div: Text / Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6">
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white text-center">
            Dashak
          </h2>

          <hr className="w-16 border-t-4 border-orange-600 rounded mb-6" />

          <div className="flex flex-col items-center">
            <p className="text-lg text-orange-600 mb-6  md:text-[25px] text-center">
              The 10th District Assembly & Aara night
              <br />
              26th July 2025 by
              <br />
              Rotract district 3141 Dashak
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent text-center ">
        Personal Achivement
      </h2>

      <div
        className="w-full mt-[30px] h-auto bg-white dark:bg-[#1a1410] 
                p-6 flex justify-center transition-colors duration-300"
      >
        <div className="grid grid-cols-1 items-center mx-auto md:grid-cols-2 gap-6">
          {Personal.map((item, index) => (
            <div
              key={index}
              className="bg-[#FFEFD9] dark:bg-[#1a1410] 
                   p-4 rounded-lg 
                   shadow-[0_8px_20px_rgba(0,0,0,0.25)] 
                   dark:shadow-[0_8px_20px_rgba(0,0,0,0.6)]
                   flex flex-col items-center text-center
                   transition-colors duration-300"
            >
              <div
                className="w-full h-[250px] flex items-center justify-center 
                        bg-white dark:dark:bg-[#1a1410] 
                        rounded-lg mb-4 transition-colors duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <h3 className="text-xl font-bold text-orange-600">{item.name}</h3>

              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-[10px]">
        <Projectachievement />
      </div>
    </section>
  );
};

import { achievementSlides as slides, personalAchievements as Personal } from "../data/achievements";
