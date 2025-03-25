'use client';

import Card from "@/components/Card";
import { Dispatch, SetStateAction, useEffect, useCallback } from "react";
import type { MdxContent } from '../types/MdxContent';

interface CarouselProps {
  slides: MdxContent[];
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  interval?: number;
  isPaused?: boolean;
  isLoading?: boolean;
}

export default function Carousel({ 
  slides, 
  currentSlide, 
  setCurrentSlide, 
  interval = 5000,
  isPaused = false,
  isLoading = false
}: CarouselProps) {
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % (isLoading ? 3 : slides.length));
  }, [setCurrentSlide, slides.length, isLoading]);

  useEffect(() => {
    if (isPaused) return;
    
    const slideTimer = setInterval(nextSlide, interval);
    return () => clearInterval(slideTimer);
  }, [interval, isPaused, nextSlide]);

  return (
    <div className="overflow-hidden relative group SlideInLeft">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {isLoading ? (
          Array(3).fill(null).map((_, index) => (
            <div 
              key={index} 
              className="min-w-full transform will-change-transform"
            >
              <Card isLoading={true} />
            </div>
          ))
        ) : (
          slides.map((slide, index: number) => (
            <div 
              key={index} 
              className="min-w-full transform will-change-transform"
            >
              <Card content={slide} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}