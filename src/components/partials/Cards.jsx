import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

function Cards({ videos, currentCardIndex, onCardClick }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const cardRef = useRef(null);
  const videoTextureRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const initThreeJS = useCallback(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current?.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(3, 2);
    const videoTexture = new THREE.VideoTexture(document.createElement('video'));
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTextureRef.current = videoTexture;

    const material = new THREE.MeshBasicMaterial({ map: videoTexture, transparent: true, opacity: 0 });
    const card = new THREE.Mesh(geometry, material);
    scene.add(card);
    cardRef.current = card;
  }, []);

  useEffect(() => {
    initThreeJS();

    const animate = () => {
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (rendererRef.current && containerRef.current) {
        rendererRef.current.dispose();
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [initThreeJS]);

  useEffect(() => {
    if (videoTextureRef.current && cardRef.current) {
      const videoElement = videoTextureRef.current.image;
      videoElement.src = videos[activeCardIndex].video;
      videoElement.loop = true;
      videoElement.muted = true;
      videoElement.playsInline = true;
      videoElement.play().catch(error => console.error("Error playing video:", error));

      cardRef.current.material.opacity = 1;
    }
  }, [videos, activeCardIndex]);

  const handleResize = useCallback(() => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  const handleMouseMove = useCallback((e) => {
    if (cardRef.current) {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      cardRef.current.rotation.y = mouseX * 0.3;
      cardRef.current.rotation.x = mouseY * 0.3;
    }
  }, []);

  const handleCardChange = useCallback(() => {
    setActiveCardIndex((prevIndex) => (prevIndex + 1) % videos.length);
  }, [videos.length]);

  return (
    <div 
      className={`absolute  ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } justify-center h-full duration-300 w-full overflow-hidden`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={() => {
        onCardClick(activeCardIndex);
        handleCardChange();
      }}
    />
  );
}

export default Cards;
