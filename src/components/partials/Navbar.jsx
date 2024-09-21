import React from "react";
import { IoIosMenu } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoVolumeMuteSharp } from "react-icons/io5";
import { VscUnmute } from "react-icons/vsc";
function Navbar({ handlePlay, video }) {
  return (
    <div className="navbar w-full h-[15vh] flex items-center justify-between z-10 px-6 relative">
      <div className="navbar-l flex items-center gap-20">
        <h1 className="font1 text-6xl tracking-wider">zentry</h1>
        <button className="hidden">products</button>
      </div>
      <div className="navbar-r flex gap-10 items-center">
        <button className="md:hidden flex items-center bg-white text-black px-5 py-1 text-center rounded-lg">
          Products
          <IoMdArrowDropdown />
        </button>
        <IoIosMenu size={50} className="cursor-pointer md:hidden" />
        <div className="uppercase flex items-center gap-8 text-sm">
          <a href="#">NEXUS</a>
          <a href="#">VAULT</a>
          <a href="#">prologue</a>
          <a href="#">about</a>
          <a href="#">contact</a>
        </div>
        <button 
          onClick={handlePlay} 
          className="bg-[#81e1e8] rounded-full p-2"
        >
          {video ? <IoVolumeMuteSharp/> : <VscUnmute/>}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
