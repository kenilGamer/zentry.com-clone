import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import Navbar from '../partials/Navbar';
import Page1 from './Page1';
import Bgvideo from '../partials/Bgvideo';
import Page2 from './Page2';
import { signOut } from '../../services/authService';

function Home() {
  const videoRef = useRef(null);
  const [video, setVideo] = useState(false); // video state, false means muted
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
    dispatch(fetchUser());
  }, [dispatch]);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className='w-full overflow-hidden text-white'>
      <Bgvideo videoRef={videoRef} />
      <Navbar handlePlay={handlePlay} video={video} user={user} onSignOut={handleSignOut} />
      <Page1 />
      <Page2 />
    </div>
  );
}

export default Home;
