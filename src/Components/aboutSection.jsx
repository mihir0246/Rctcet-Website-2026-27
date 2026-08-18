import React from 'react';

const Anantya = () => {
  return (
    <>
      <div className="w-full flex justify-center mt-10 mb-10 bg-white dark:bg-stone-900">
        <div className="relative w-full lg:h-[400px] overflow-hidden">
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-[center_40%] opacity-10 dark:opacity-5"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1756840156/IMG_3032_2_ibiefc.jpg')",
            }}
          ></div>
          
          {/* Centered Content */}
          <div className="relative z-10 flex flex-col md:flex-row h-full p-6 lg:mx-24 justify-center items-center text-justify gap-8">
            <div className="flex-grow md:pr-4">
              <h2 className="text-2xl font-bold text-orange-500 dark:text-yellow-400 mb-4">Rotaract Club of TCET</h2>
              <p className="text-gray-800 dark:text-stone-200 mb-4">
                At Rotaract Club of TCET, wellbeing is at the forefront of what we're 
                working together towards. Our programs and activities are designed to 
                be a catalyst that helps community members reach their goals and fulfill 
                their potential. Learn more about the positive impact we have and join us 
                in bringing about positive change.
              </p>
              <p className="text-sm text-gray-600 dark:text-stone-400">
                Chartered on 15th September 2017
              </p>
            </div>
            
            <div className="lg:flex-shrink-0 lg:w-1/3 md:w-full">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <video autoPlay muted loop
                  src="https://res.cloudinary.com/dtc2xaeaf/video/upload/v1787043270/landing_intro_dsw7cj.mp4"             
                  type="video/mp4"
                  className="lg:w-full lg:h-[300px] md:h-[200px] w-full h-[300px] object-cover">
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start max-w-7xl mx-auto p-4 text-justify mt-10 mb-16 bg-white dark:bg-stone-900">
        <div className="md:w-1/3 flex items-center justify-center">
          <img 
            src='https://res.cloudinary.com/dtc2xaeaf/image/upload/f_auto,q_auto:eco,w_800,c_limit/v1787043285/Meraki_kvjeog.png'
            alt="Meraki" 
            className="w-full h-50 object-cover"
            loading={"lazy"}
          />
        </div>
        <div className="md:w-2/3 md:ml-8">
          <h2 className="text-2xl font-bold text-orange-500 dark:text-yellow-400 mb-4">MERAKI: INFINITE BY SOULS</h2>
          <div className="text-gray-700 dark:text-stone-300 space-y-4">
            <p>
              <strong>Meraki</strong>, meaning to do something with soul, creativity, and love, reflects the belief that everything becomes meaningful when a part of ourselves is poured into it. <strong>“Infinite by Souls”</strong> celebrates the people, connections, and efforts that make every Rotaract journey truly unforgettable.
            </p>
            <p>
              It reminds us that what we create is not measured only by its outcome, but by the hearts behind it the friendships we build, the lives we touch, and the moments we leave behind. Every act of service, every bond, and every shared experience carries a piece of the souls that shaped it.
            </p>
            <p>
              Because when something is created with soul, its impact does not end with the moment. It lives on through the people it touches, making our journey infinite.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Anantya;