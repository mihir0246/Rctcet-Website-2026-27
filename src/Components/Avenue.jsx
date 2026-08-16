// https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757666593/Untitled_design_ocbq9f.png
export const Avenue = () => {
  return (
    <div className="bg-white dark:bg-stone-900 min-h-screen">
      {/* the hero header is image not text with curve bg */}
      <div>
        {/* <img
          src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1756820583/Frame_116_kxbhve.png"
          alt="avenue_page"
          className="w-full object-cover"
        /> */}
        <img
          src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1756820583/Frame_116_kxbhve.png"
          alt="avenue_page"
          className="w-full object-cover dark:hidden"
        />

        {/* Dark mode image */}
        <img
          src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757603396/Frame_5826_exnrgn.png"
          alt="avenue_page_dark"
          className="hidden w-full object-cover dark:block"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-2 sm:px-4 mb-4 mx-10 mt-[30px]">
        {allinfo.map((item, index) => (
          <div
            key={index}
            className="bg-[#FFEFD9] dark:bg-[#3D3027] flex flex-col items-center justify-start p-2 w-full h-[400px] 
                       relative rounded-[5px] shadow-[0_19px_38px_rgba(0,0,0,0.3),0_15px_12px_rgba(0,0,0,0.22)] 
                       dark:shadow-[0_19px_38px_rgba(0,0,0,0.5),0_15px_12px_rgba(0,0,0,0.4)]
                       transition-all duration-300 ease-in-out 
                       hover:scale-105 hover:shadow-[0_25px_50px_rgba(0,0,0,0.35),0_20px_15px_rgba(0,0,0,0.25)]
                       dark:hover:shadow-[0_25px_50px_rgba(0,0,0,0.6),0_20px_15px_rgba(0,0,0,0.45)]"
          >
            {/* Image Container */}
            <div className="flex items-end justify-center h-[300px] w-full bg-white dark:bg-[#2D241C] rounded-[5px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.35)] dark:shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
              <img
                src={item.img}
                alt={item.title}
                className={`max-h-full max-w-full object-contain ${item.className || ""}`}
              />
            </div>

            {/* Title */}
            <h3 className="text-sm text-red-500 dark:text-[#D4A829] font-bold mt-3 mb-1 text-center sm:text-[20px]">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-black-600 dark:text-[#C4A575] text-center">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

import { avenuesInfo as allinfo } from "../data/avenues";
