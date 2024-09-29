import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import Navbar from '../partials/Navbar';
import Page1 from './Page1';
import Bgvideo from '../partials/bgvideo';
import Page2 from './Page2';
import { signOut } from '../../services/authService';
import Cards from '../partials/Cards';

function Home() {
  const videoRef = useRef(null);
  const [video, setVideo] = useState(false); 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = !video; 
      videoRef.current.play();
      setVideo(!video); 
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    dispatch(fetchUser());
  }, [dispatch]);

  const handleSignOut = () => {
    signOut();
  };

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

  return (
    <div className='w-full overflow-hidden text-white'>
      <Bgvideo videoRef={videoRef} videos={videos} />
      <Navbar handlePlay={handlePlay} video={video} user={user} onSignOut={handleSignOut} />
      <div className="w-full h-full flex items-center justify-center absolute top-0 z-[96] left-0">
        <Cards videos={videos} />
      </div>
      <Page1 />
      <Page2 />
    </div>
  );
}

export default Home;
