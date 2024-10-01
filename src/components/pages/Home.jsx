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
      videoRef.current.play();
      setVideo(!video); 
    }
  }, [video]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % videos.length;
        setNextCardIndex((nextIndex + 1) % videos.length);
        return nextIndex;
      });
    }, 10000); // Change video and card every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  const videos = [
    {
      video: '/public/imgs/hero-cut-1.mp4',
      title: 'Video 1',
      description: 'Description 1',
    },
    {
      video: '/public/imgs/hero-cut-2.mp4',
      title: 'Video 2',
      description: 'Description 2',
    },
    {
      video: '/public/imgs/hero-cut-3.mp4',
      title: 'Video 3',
      description: 'Description 3',
    },
    {
      video: '/public/imgs/hero-cut-4.mp4',
      title: 'Video 4',
      description: 'Description 4',
    },
  ];

  const handleCardClick = useCallback((index) => {
    setCurrentVideoIndex(index);
    setNextCardIndex((index + 1) % videos.length);
    if (videoRef.current) {
      videoRef.current.src = videos[index].video;
      videoRef.current.play();
    }
  }, [videos]);

  return (
    <div className='w-full overflow-hidden text-white'>
      <Bgvideo videoRef={videoRef} videos={videos} currentVideoIndex={currentVideoIndex} />
      <Navbar handlePlay={handlePlay} video={video} user={user} onSignOut={handleSignOut} />
      <AnimatePresence mode="wait">
        <motion.div 
          key={nextCardIndex}
          className="w-full h-full flex items-center justify-center absolute top-0 z-[96] left-0 overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <Cards 
            videos={videos} 
            currentCardIndex={nextCardIndex} 
            onCardClick={handleCardClick}
          />
        </motion.div>
      </AnimatePresence>
      <Page1 />
      <Page2 />
    </div>
  );
}

export default Home;
