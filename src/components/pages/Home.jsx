import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../partials/Navbar'
import Page1 from './page1'
import Bgvideo from '../partials/bgvideo'
function Home() {
  const videoRef = useRef(null);
  const [video, setVideo] = useState(false); // video state, false means muted

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = !video; // If video is true, unmute; if false, mute
      videoRef.current.play();
      setVideo(!video); // Toggle the video state
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);
  return (
    <div className='w-full h-screen overflow-hidden px-6'>
       <button 
        onClick={handlePlay}
        className="absolute md:top-[600px] md:left-[650px] z-50 bg-teal-300 rounded-full  p-2"
      >
        Play with Sound    {video ? "Mute" : "Unmute"}
      </button>
       {/* Your Home Page */}
       <Bgvideo videoRef={videoRef}/>
       <Navbar/>
       <Page1/>
    </div>
  )
}

export default Home