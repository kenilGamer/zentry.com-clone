import React, { useState, useEffect } from 'react';

function Bgvideo({ videoRef, videos }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000); // Change video every 10 seconds

    return () => clearInterval(interval);
  }, [videos]);

  return (
    <div className='w-full absolute h-[100vh] left-0 z-0 '>
      {videos.map((video, index) => (
        <video
          key={index}
          ref={index === 0 ? videoRef : null}
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
            index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
          }`}
          loop
          playsInline
          preload="auto"
        >
          <source src={video.video} type="video/mp4" />
          
        </video>
      ))}
      <div className="overlay"></div>
    </div>
  );
}

export default Bgvideo;
