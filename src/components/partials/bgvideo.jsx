import React, { useRef } from 'react';
import Cards from './Cards';

function Bgvideo({videoRef}) {


  return (
    <div className='w-full absolute h-[115vh] left-0 z-0'>
      <video
        ref={videoRef}
        className='w-full h-full object-cover'
        loop
        playsInline
        muted
        autoPlay
      >
        <source src="/imgs/9a1e8539-89e1-f918-9ba7-3c0289978d86_custom.mp4" type="video/mp4" />
      </video>
      <div className="overlay"></div>
     
    </div>
  );
}

export default Bgvideo;
