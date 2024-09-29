import React, { useRef, useEffect, useState } from 'react';

function Cards() {
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [isSticky, setIsSticky] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const tiltAngle = 6; // Reduced maximum tilt angle in degrees
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

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseMove = (e) => {
      if (!isZoomed && isVisible) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
      }
    };

    const handleTouchMove = (e) => {
      if (!isZoomed && isVisible) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left - rect.width / 2;
        const y = touch.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (!isZoomed) {
        const rect = container.getBoundingClientRect();
        setMousePosition({ x: 0, y: rect.height / 2 });
      }
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      setIsSticky(rect.top <= 0);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isZoomed, isVisible]);

  useEffect(() => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerY = rect.height / 2;
    
    if (!isZoomed && isVisible) {
      const moveX = mousePosition.x / (rect.width / 2);
      const moveY = (mousePosition.y - centerY) / centerY;

      requestAnimationFrame(() => {
        card.style.transition = 'transform 0.3s';
        card.style.transform = `
          perspective(1000px)
          rotateY(${moveX * tiltAngle}deg)
          rotateX(${-moveY * tiltAngle}deg)
          translateZ(0px)
        `;

        // Move videos
        videoRefs.current.forEach((video) => {
          if (video) {
            video.style.transform = `translate(${-moveX * 0.4}px, ${-moveY * 0.4}px)`;
          }
        });
      });
    } else {
      card.style.transform = 'none';
      videoRefs.current.forEach((video) => {
        if (video) {
          video.style.transform = 'none';
        }
      });
    }
  }, [mousePosition, isZoomed, isVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div 
      className={`flex items-center ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      } justify-center h-full duration-1000 w-full sticky top-0 ${isZoomed ? 'fixed inset-0 z-50' : ''}`} 
      ref={containerRef}
    >
      <div 
        className={`bg-white shadow-lg rounded-lg p-6 transform transition-all duration-300 relative overflow-hidden cursor-pointer ${
          isZoomed ? 'w-screen h-screen' : 'w-44 h-44'
        }`} 
        ref={cardRef}
        onClick={handleCardClick}
      >
        <div 
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-center overflow-hidden ${
            isZoomed ? 'scale-100' : 'scale-150'
          } ${isVisible ? 'scale-100' : 'scale-0'}`}
        >
          {videos.map((video, index) => (
            <video 
              key={index}
              ref={(el) => videoRefs.current[index] = el} 
              src={video.video} 
              className={`w-[100vw] h-full absolute top-0 left-0 object-cover transition-opacity duration-1000 ${
                index === activeVideoIndex ? 'opacity-100' : 'opacity-0'
              }`} 
              loop 
              muted 
              playsInline 
              autoPlay
            ></video>
          ))}
        </div>
        {isZoomed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white z-10">Welcome to Our Site</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;
