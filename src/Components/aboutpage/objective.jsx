import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { objectivesList } from '../../data/aboutUs';

const Objectives = () => {
  return (
    <div className="bg-amber-50 dark:bg-stone-800 py-8 px-4 lg:px-16 w-full">
      <div className="w-full flex flex-col lg:flex-row lg:items-center">
        {/* Logo Section */}
        <div className="flex justify-center basis-[40%] place-items-center mb-4 lg:mb-0 lg:mr-8 xl:mr-10 2xl:mr-10 2xl:ml-10">
          <LazyLoadImage
            src="https://res.cloudinary.com/dtc2xaeaf/image/upload/v1756746594/logo_pdqctw.svg"
            alt="RC TCET Logo"
            className=""
          />
        </div>

        {/* Objectives Section */}
        <div className="bg-white dark:bg-stone-700 basis-[60%] rounded-lg p-4 sm:p-6 lg:p-8 xl:p-10 shadow-md dark:shadow-stone-900/50 w-full lg:w-3/4 mx-auto border dark:border-stone-600">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-gray-800 dark:text-stone-100 mb-4">
            Our Objectives
          </h2>
          <ol className="list-decimal list-inside space-y-2 sm:space-y-4 lg:space-y-6 xl:space-y-8 2xl:space-y-10 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-stone-200">
            {objectivesList.map((obj, index) => (
              <li key={index}>
                <strong className="text-gray-900 dark:text-stone-100">{obj.title}:</strong> {obj.description}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Objectives;
