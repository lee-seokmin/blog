'use client';

import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import type { MdxContent } from '@/types/MdxContent';
import Link from "next/link";
import Header from './header';
import Footer from "./footer";

interface MainLayoutProps {
  posts: MdxContent[];
  bestPosts: MdxContent[];
  uniqueTags: string[];
  tagCounts: {[key: string]: number};
}

export default function MainLayout({ posts, bestPosts, uniqueTags, tagCounts }: MainLayoutProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>("Recent Posts.");

  const previousSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(bestPosts.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide === bestPosts.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const categories = posts.length > 0 ? [
    { name: "Recent Posts.", count: posts.length },
    ...uniqueTags.map(tag => ({ name: tag, count: tagCounts[tag] }))
  ] : [];

  return (
    <>
      <Header 
        categories={categories}
        currentCategory={currentCategory}
        onCategoryChange={setCurrentCategory}
      />
      <div className="flex flex-col gap-10 md:gap-5 w-full max-w-[900px] mx-auto p-3">
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
                    {Array(bestPosts.length).fill(null).map((_, index) => (
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
              slides={bestPosts} 
              currentSlide={currentSlide} 
              setCurrentSlide={setCurrentSlide}
              isPaused={isPaused}
            />
          </div>
          <div className="flex flex-col gap-3 w-full md:w-1/5 hidden md:flex">
            <h1 className="text-xl font-bold italic md:pr-5 cursor-pointer Categories">Categories.</h1>
            <ul className="flex cursor-pointer flex-col gap-2">
              <Link href={"#Recent Posts."}>
                <li className="hover:underline list-none" onClick={() => setCurrentCategory("Recent Posts.")}>
                  Recent Posts. ({posts.length})
                </li>
              </Link>
              {uniqueTags.map((tag, index) => (
                <Link key={index} href={`#${tag}`}>
                  <li className="hover:underline list-none" onClick={() => setCurrentCategory(tag)}>
                    {tag} ({tagCounts[tag]})
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-bold italic hover:underline cursor-pointer" id={currentCategory}>{currentCategory}</h1>
          <div className="grid md:grid-cols-2 gap-10 grid-cols-1 SlideInLeft">
            {posts
              .filter(post => 
                currentCategory === "Recent Posts." ? true : post.tags === currentCategory
              )
              .map((post, index) => (
                <Card key={index} content={post} isFirst={index === 0} />
              ))
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}