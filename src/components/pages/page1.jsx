import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
function Page1() {
  return (
    <div className="w-full h-[80vh] px-3 py-2 flex flex-col items-center justify-center relative z-10">
      <div className=" mt-20 ">
        <h1 className="text-[8em] sm:text-[10em] md:text-[12em] md:-mt-[0.5em]  leading-[0.9] font1 font-black tracking-wide">
          REDEFINE
        </h1>
        <div className="page1-end flex flex-col justify-between  gap-1 md:w-full mt-2">
        <div className="page1-end-left">
          <p className="text-xl w-96 tracking-wide">
          Enter the Metagame Layer
          Unleash the Play Economy
          </p>
        </div>
        <div className="page1-end-right">
          <button className="rounded-full px-10 py-2 text-sm gap-2 text-black bg-[#e4e86f] hover:bg-yellow-200 flex items-center justify-center">
           <FaLocationArrow/> WATCH Trailer
          </button>
        </div>
      </div>
        <h1 className="text-[8em] sm:text-[10em] md:text-[12em] md:-mt-[0.4em] md:ml-[4em] leading-[0.9] font1 font-black ml-40 tracking-wide">
          GAMING
        </h1>
      </div>
      <div className="page1-end flex items-center justify-between md:hidden gap-12 md:w-full mt-20">
        <div className="page1-end-left">
          <p className="text-2xl w-96 tracking-wide">
          Enter the Metagame Layer
          Unleash the Play Economy
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
