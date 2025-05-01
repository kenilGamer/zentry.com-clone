import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import Navbar from '../partials/Navbar';
import Page1 from './Page1';
import Bgvideo from '../partials/bgvideo';
import Page2 from './Page2';
import { signOut } from '../../services/authService';
import Cards from '../partials/Cards';
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
  const videoRef = useRef(null);
  const [video, setVideo] = useState(false); 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextCardIndex, setNextCardIndex] = useState(1);

  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !video; 
      videoRef.current.play().then(() => setVideo(!video)).catch(error => console.error("Error playing video:", error));
    }
  }, [video]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setVideo(true)).catch(error => console.error("Error playing video:", error));
    }
    dispatch(fetchUser());
  }, [dispatch]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  const videos = useRef([
    {
      video: '/public/imgs/hero-cut-1.mp4',
      title: 'gaming',
      description: '',
    },
    {
      video: '/public/imgs/hero-cut-2.mp4',
      title: 'indntity',
      description: 'Discover new opportunities',
    },
    {
      video: '/public/imgs/hero-cut-3.mp4',
      title: 'reality',
      description: 'Interact with our community',
    },
    {
      video: '/public/imgs/hero-cut-4.mp4',
      title: 'lifestyle',
      description: 'Join our community',
    }
   
  ]);

  const handleCardClick = useCallback((index) => {
    setCurrentVideoIndex(index);
    setNextCardIndex((index + 1) % videos.current.length);
    if (videoRef.current) {
      videoRef.current.src = videos.current[index].video;
      videoRef.current.load();
      videoRef.current.play().then(() => setVideo(true)).catch(error => console.error("Error playing video:", error));
    }
  }, [videos]);

  return (
    <div className='w-full overflow-hidden text-white relative '>
      <Bgvideo videoRef={videoRef} videos={videos.current} currentVideoIndex={currentVideoIndex} />
      <Navbar handlePlay={handlePlay} video={video} user={user} onSignOut={handleSignOut} />
      <AnimatePresence mode="wait">
        <motion.div 
          key={nextCardIndex}
          className="w-full h-full  absolute z-[96] top-0 overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <Cards 
            videos={videos.current} 
            currentCardIndex={nextCardIndex} 
            onCardClick={handleCardClick}
          />
        </motion.div>
      </AnimatePresence>
      <Page1 className="z-[98]" descriptions={videos.current.map(video => video.title)} currentVideoIndex={currentVideoIndex} />
      {/* <Page2  /> */}
    </div>
  );
}

export default Home;
