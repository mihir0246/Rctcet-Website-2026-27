import { useState, useEffect, memo, useMemo, lazy, Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


const Chatbot = lazy(() => import("./Chatbot"));


const BG_DESKTOP = "f_auto,q_auto:low,w_1400,c_fill,g_auto";
const BG_MOBILE = "f_auto,q_auto:low,w_600,c_fill,g_auto";
const CARD = "f_auto,q_auto:eco,w_400,c_fill,g_auto";


const imagesData = [
  {
    title: "Jashn-E- 3141",
    id: "v1757943827/Copy_of_IMG_4190_ayzbil_lplixh_rd534g.webp"
  },
  {
    title: "Visual Velocity 2.0",
    id: "v1757943830/IMG_7581_xlm8wx_lnj4jq_ufiz7c.webp"
  },
  {
    title: "Aara night 25-26",
    id: "v1757943837/IMG_2044_h3kady_vbe8iv_s4bl9w.webp"
  },
  {
    title: "Rotaract's Day Out",
    id: "v1757943940/Copy_of_IMG_0420_wdpng4_gpbtct.webp"
  },
  {
    title: "Monsoon Match Day 2.0",
    id: "v1757943826/Copy_of_IMG_1446_1_zwesqm_g41sxi.webp"
  },
  {
    title: "Kalakriti 2.0",
    id: "v1757943987/Copy_of_IMG20250825165248_kvd3wk_w6imtn.webp"
  },
  {
    title: "Panache",
    id: "v1757943825/PXL_20250718_060353784_i7fthn_jxd25r.webp"
  }
];

export default function RotaractClubLayout() {
  const [bgIndex, setBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    setIsInitialRender(false);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount to catch any edge cases
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bgUrl = useMemo(() => {
    const transform = isMobile ? BG_MOBILE : BG_DESKTOP;
    return `https://res.cloudinary.com/dtc2xaeaf/image/upload/${transform}/${imagesData[bgIndex].id}`;
  }, [bgIndex, isMobile]);

  return (
    <div className="relative h-screen max-h-screen rounded-b-3xl w-full overflow-hidden">

      {/* Background */}
      {/* <motion.div
        key={bgIndex}
        initial={{ opacity: isInitialRender ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-cover bg-center z-0 will-change-opacity"
        style={{ backgroundImage: `url(${bgUrl})` }}
      /> */}
      <img
        key={bgIndex}
        src={bgUrl}
        alt=""
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 flex flex-col lg:flex-row h-full w-full items-center justify-center mt-[-50px] md:mt-0 px-6 gap-8">

        {/* Left Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center text-center">
          <img
            src="https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_400/v1756746594/logo_pdqctw.svg"
            alt="club logo"
            width="200"
            height="200"
            loading="eager"
            decoding="async"
            className="h-24 w-24 sm:h-32 sm:w-32 mb-4"
          />
          <h1 className="text-3xl sm:text-5xl font-bold text-white">
            Rotaract Club Of TCET
          </h1>
        </div>


        <div className="w-full lg:w-2/3 relative z-30">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
            slidesPerView={1}
            spaceBetween={16}
            observer={false}
            observeParents={false}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            onSlideChange={(s) => setBgIndex(s.realIndex)}
          >
            {imagesData.map((img, i) => (
              <SwiperSlide key={i}>
                <MemoCard title={img.title} id={img.id} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="prev-btn absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-40">
            <IconButton><ChevronLeft className="h-6 w-6 text-white" /></IconButton>
          </button>

          <button className="next-btn absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-40">
            <IconButton><ChevronRight className="h-6 w-6 text-white" /></IconButton>
          </button>
        </div>
      </div>

      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>

    </div>
  );
}


const MemoCard = memo(({ title, id }) => {
  const cardUrl = `https://res.cloudinary.com/dtc2xaeaf/image/upload/${CARD}/${id}`;
  return (
    <div className="rounded-2xl border border-white/20 bg-white/90 shadow-xl overflow-hidden">
      <img
        src={cardUrl}
        alt={title}
        width="400"
        height="300"
        loading="lazy"
        decoding="async"
        className="h-32 sm:h-40 w-full object-cover"
      />
      <div className="p-3 font-semibold">{title}</div>
    </div>
  );
});


const IconButton = memo(({ children }) => (
  <button className="h-12 w-12 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center">
    {children}
  </button>
));