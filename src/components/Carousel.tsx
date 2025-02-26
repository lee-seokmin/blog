import Card from "@/components/Card";
import { Dispatch, SetStateAction, useEffect, useCallback } from "react";

interface CarouselProps {
  slides: string[];
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  interval?: number;
  isPaused?: boolean;
}

export default function Carousel({ 
  slides, 
  currentSlide, 
  setCurrentSlide, 
  interval = 5000,
  isPaused = false 
}: CarouselProps) {
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [setCurrentSlide, slides.length]);

  useEffect(() => {
    if (isPaused) return;
    
    const slideTimer = setInterval(nextSlide, interval);
    return () => clearInterval(slideTimer);
  }, [interval, isPaused, nextSlide]);

  return (
    <div className="overflow-hidden relative group">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index: number) => (
          <div key={index} className="min-w-full">
            <Card url={slide} />
          </div>
        ))}
      </div>
    </div>
  )
}