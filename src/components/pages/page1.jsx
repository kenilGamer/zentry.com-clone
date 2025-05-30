import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { motion } from 'framer-motion';

function Page1({ descriptions, currentVideoIndex }) {
  const description = descriptions[currentVideoIndex];

  return (
    <div className="w-full h-[85vh] px-3 py-2 flex flex-col items-center justify-center relative z-10">
      <div className="mt-20">
        <motion.h1 
          className="text-[8em] sm:text-[10em] md:text-[11em] md:-top-[10px] md:left-10 text-gray-100 absolute leading-[0.9] font1 font-black tracking-wide"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          REDEFINE
        </motion.h1>
        <motion.h1 
          className="text-[8em] sm:text-[10em] text-gray-100 md:text-[11em] absolute md:bottom-32 md:right-0 leading-[0.9] font1 font-black ml-40 tracking-wide"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {description}
        </motion.h1>
        <div className="page1-end flex flex-col justify-between gap-1 md:w-full mt-2">
          <div className="absolute top-44 left-10">
            <div className="page1-end-left mb-6">
              <p className="text-xl w-96 tracking-wide">
                
              </p>
            </div>
            <div className="page1-end-right">
              <button className="rounded-full px-10 py-2 text-sm gap-2 text-black bg-[#e4e86f] hover:bg-yellow-200 flex items-center justify-center">
                <FaLocationArrow /> WATCH Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="page1-end flex items-center justify-between md:hidden gap-12 md:w-full mt-20">
        <div className="page1-end-left">
          <p className="text-2xl w-96 tracking-wide">
           
          </p>
        </div>
        <div className="page1-end-right">
          <button className="rounded-md px-8 py-4 text-white bg-blue-500 hover:bg-blue-600">
            Trailer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page1;
