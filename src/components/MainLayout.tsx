'use client';

import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function MainLayout() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dummyPosts = Array(10).fill(null);

  const slides: Array<string> = [
    "https://junghyeonsu.com/static/71dc23f96460c19de7bd460ee75ca3da/3dfe0/cover.webp",
    "https://junghyeonsu.com/static/1077d5b05b43f57b75000f91b1bde1f6/71d4d/cover.webp",
    "https://junghyeonsu.com/static/e7b47cc176352a2eb0d9a41620c070ac/67ded/cover.webp",
    "https://junghyeonsu.com/static/71dc23f96460c19de7bd460ee75ca3da/3dfe0/cover.webp",
    "https://junghyeonsu.com/static/1077d5b05b43f57b75000f91b1bde1f6/71d4d/cover.webp",
    "https://junghyeonsu.com/static/e7b47cc176352a2eb0d9a41620c070ac/67ded/cover.webp"
  ]

  const previousSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="flex flex-col gap-10 md:gap-5 w-full max-w-[900px] mx-auto p-2">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-5 w-full md:w-4/5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 justify-between align-center">
              <h1 className="text-xl font-bold italic hover:underline cursor-pointer">Best Posts.</h1>
              <div className="flex flex-col gap-2 items-center">
                <div className="flex gap-2">
                  <button onClick={previousSlide} className="transition">
                    <FontAwesomeIcon icon={faPlay} rotation={180} />
                  </button>
                  <button onClick={() => setIsPaused(!isPaused)} className="transition">
                    <FontAwesomeIcon icon={isPaused ? faCirclePlay : faCirclePause} />
                  </button>
                  <button onClick={nextSlide} className="transition">
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                </div>
                <div className="flex justify-end gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full ${
                        currentSlide === index 
                          ? 'bg-foreground scale-125'
                          : 'border border-foreground text-current hover:bg-tint'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Carousel 
            slides={slides} 
            currentSlide={currentSlide} 
            setCurrentSlide={setCurrentSlide}
            isPaused={isPaused} 
          />
        </div>
        <div className="flex flex-col gap-3 w-full md:w-1/5">
          <h1 className="text-xl font-bold italic md:pr-5 cursor-pointer Categories">Categories.</h1>
          <ul className="flex cursor-pointer flex-col gap-2">
            <li className="hover:underline">Python</li>
            <li className="hover:underline">일기</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-bold italic hover:underline cursor-pointer">Recent Posts.</h1>
        <div className="grid md:grid-cols-2 gap-10 grid-cols-1">
          {dummyPosts.map((_, index) => (
            <Card key={index} url={"https://junghyeonsu.com/static/71dc23f96460c19de7bd460ee75ca3da/3dfe0/cover.webp"} />
          ))}
        </div>
      </div>
    </div>
  );
}