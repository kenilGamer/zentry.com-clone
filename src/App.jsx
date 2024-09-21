import React from 'react'
import Home from './components/pages/Home'
import LocomotiveScroll from 'locomotive-scroll';

function App() {
  const locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
      autoResize: true,
      smoothScrolling: true,
      wrapper: window,
      content: document.documentElement,
      lerp: 0.1,
      duration: 4.5,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      normalizeWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    },
  });
  return (
    <div className='w-full bg-slate-700 text-white'>
      <Home/>
    </div>
  )
}

export default App