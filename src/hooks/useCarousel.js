import { useState, useEffect } from 'react';

export default function useCarousel(items, autoPlayTime = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayTime);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length, autoPlayTime]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    isAutoPlaying,
    setIsAutoPlaying
  };
}