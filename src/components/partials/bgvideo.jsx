import React, { useRef } from 'react';

function Bgvideo({videoRef}) {


  return (
    <div className='w-full absolute h-full left-0 z-0'>
      <video
        ref={videoRef}
        className='w-full h-full object-cover'
        loop
        playsInline
        muted
        autoPlay
      >
        <source src="/imgs/zentry_trailer-md.mp4" type="video/mp4" />
      </video>
      <div className="overlay"></div>
    
    </div>
  );
}

export default Bgvideo;
