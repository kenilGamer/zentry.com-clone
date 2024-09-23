import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Home from './components/pages/Home';
import LocomotiveScroll from 'locomotive-scroll';
import store from './redux/store';

function App() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        autoResize: true,
        smoothScrolling: true,
        // wrapper: window,
        // content: document.documentElement,
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

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;