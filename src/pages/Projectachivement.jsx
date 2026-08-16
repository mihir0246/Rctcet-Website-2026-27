import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Keyboard, Pagination, Navigation } from "swiper/modules";

import { projectImages as images, projectAchievementsSlider as achievementsSlider } from "../data/achievements";

const Projectachievement = () => {
  return (
    <>
      {/* Project Achievement */}
 <h2 className="text-4xl font-extrabold 
               bg-gradient-to-r from-orange-600 to-orange-400 
               bg-clip-text text-transparent 
               text-center my-[20px]">
  Project Achievement
</h2>

<div className="w-full mt-[20px] 
                bg-white dark:bg-[#1a1410]
                bg-[url('https://www.rc.tcetmumbai.in/Achievement/Baseline%20grid%20bg.svg')] 
                bg-cover bg-center 
                p-6 flex justify-center mb-[40px] 
                transition-colors duration-300">

  <div className="grid grid-cols-1 gap-6 max-w-4xl w-full place-items-center">

    <div className="bg-[#FFEFD9] dark:bg-[#1a1410] 
                    p-4 rounded-lg 
                    shadow-[0_8px_20px_rgba(0,0,0,0.25)] 
                    dark:shadow-[0_8px_20px_rgba(0,0,0,0.6)] 
                    flex flex-col items-center text-center 
                    max-w-sm w-full 
                    transition-colors duration-300">

      {/* Image */}
      <div className="w-full h-[250px] flex items-center justify-center 
                      rounded-lg mb-4 overflow-hidden 
                      bg-white dark:bg-[#1f1813] 
                      transition-colors duration-300">
        <img
          src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756821844/DSC02741_oocb84.jpg"
          alt="Project Acer"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-orange-600">
        Project Acer
      </h3>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 mt-2">
        Outstanding Social Media Campaign – Young Entrepreneurs
      </p>

    </div>
  </div>
</div>

      {/* Crowns of Quarter */}
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent text-center my-[20px]">
        Crowns of Quarter & Nominations
      </h2>

      <div className="flex justify-center items-center w-full mb-16">
        <div className="md:w-[55vw] w-[90vw] relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            keyboard={{ enabled: true }}
            navigation
            modules={[Keyboard, Pagination, Navigation]}
            className="mySwiper w-full h-full"
          >
            {images.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`slide-${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation styles */}
          <style jsx global>{`
            .swiper-button-next,
            .swiper-button-prev {
              width: 35px !important;
              height: 35px !important;
              background: white !important;
              border-radius: 50% !important;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
            }
            .swiper-button-next:after,
            .swiper-button-prev:after {
              font-size: 16px !important;
              color: black !important;
              font-weight: bold;
            }
          `}</style>
        </div>
      </div>

      {/* Achievement Slider */}
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent text-center my-[20px]">
        Achievement Moments
      </h2>

      <div className="w-full py-10 bg-[url('https://www.rc.tcetmumbai.in/Achievement/Baseline%20grid%20bg.svg')] bg-cover bg-center">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-6xl mx-auto"
        >
          {achievementsSlider.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex items-center justify-center h-[250px] bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={`Achievement ${item.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export default Projectachievement
