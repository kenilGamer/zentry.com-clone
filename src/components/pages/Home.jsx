import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../partials/Navbar';
import Page1 from './page1';
import Bgvideo from '../partials/bgvideo';
import Page2 from './Page2';

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
    <div className='w-full  overflow-hidden '>
      <Bgvideo videoRef={videoRef} />
      <Navbar handlePlay={handlePlay} video={video} />
      <Page1 />
      <Page2 />
    </div>
  );
}

export default Home;
