import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import Home from './components/pages/Home';
import LocomotiveScroll from 'locomotive-scroll';
import store from './redux/store';

function App() {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) {
      scrollRef.current = new LocomotiveScroll({
        lenisOptions: {
          autoResize: true,
          smoothScrolling: true,
          lerp: 0.05,
          duration: 1.5,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          smoothTouch: false,
          wheelMultiplier: 0.8,
          touchMultiplier: 1.5,
          normalizeWheel: true,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        },
      });
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <div className=" overflow-hidden">
        <Home />
      </div>
    </Provider>
  );
}

export default App;