import React, { useRef, useEffect, useState } from 'react';

function Cards() {
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [isSticky, setIsSticky] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const moveSpeed = 0.05; // Reduced move speed for 3D effect
  const tiltAngle = 3; // Reduced maximum tilt angle in degrees

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;

    const handleMouseMove = (e) => {
      if (!isZoomed) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    const handleTouchMove = (e) => {
      if (!isZoomed) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    const handleMouseLeave = () => {
      if (!isZoomed) {
        const rect = container.getBoundingClientRect();
        setMousePosition({ x: rect.width / 2, y: rect.height / 2 });
      }
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      setIsSticky(rect.top <= 0);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isZoomed]);

  useEffect(() => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    if (!isZoomed) {
      const moveX = (mousePosition.x - centerX) / centerX;
      const moveY = (mousePosition.y - centerY) / centerY;

      requestAnimationFrame(() => {
        card.style.transition = 'transform 0.3s';
        card.style.transform = `
          perspective(1000px)
          rotateY(${moveX * tiltAngle}deg)
          rotateX(${-moveY * tiltAngle}deg)
          translateZ(5px)
        `;

        // Move videos
        videoRefs.current.forEach((video) => {
          video.style.transform = `translate(${-moveX * 0.4}%, ${-moveY * 0.4}%)`;
        });
      });
    } else {
      card.style.transform = 'none';
      videoRefs.current.forEach((video) => {
        video.style.transform = 'none';
      });
    }
  }, [mousePosition, isZoomed]);

  const handleCardClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className={`flex items-center justify-center h-full w-full sticky top-0 ${isZoomed ? 'fixed inset-0 z-50' : ''}`} ref={containerRef}>
      <div 
        className={`bg-white shadow-lg rounded-lg p-6 transform transition-all duration-300 relative overflow-hidden cursor-pointer ${
          isZoomed ? 'w-screen h-screen' : 'w-44 h-44'
        }`} 
        ref={cardRef}
        onClick={handleCardClick}
      >
        <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-center overflow-hidden ${
          isZoomed ? 'scale-100' : 'scale-150'
        }`}>
          <video ref={(el) => videoRefs.current[0] = el} src="/public/imgs/hero-cut-1.mp4" className="w-[100vw] h-full absolute top-0 left-0 opacity-0 object-cover" loop muted playsInline ></video>
          <video ref={(el) => videoRefs.current[1] = el} src="/public/imgs/hero-cut-2.mp4" className="w-[100vw] h-full absolute top-0 left-0 opacity-100 object-cover" loop muted playsInline ></video>
          <video ref={(el) => videoRefs.current[2] = el} src="/public/imgs/hero-cut-3.mp4" className="w-[100vw] h-full absolute top-0 left-0 opacity-0 object-cover" loop muted playsInline ></video>
          <video ref={(el) => videoRefs.current[3] = el} src="/public/imgs/hero-cut-4.mp4" className="w-[100vw] h-full absolute top-0 left-0 opacity-0 object-cover" loop muted playsInline ></video>
        </div>
      </div>
    </div>
  );
}

export default Cards;
