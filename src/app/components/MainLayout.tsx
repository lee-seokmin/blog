'use client';

import Card from "@/app/components/Card";
import Carousel from "@/app/components/Carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { getMdxContent } from '../utils/getMdxContent';
import type { MdxContent } from '../utils/getMdxContent';
import Link from "next/link";

export default function MainLayout() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [posts, setPosts] = useState<MdxContent[]>([]);
  const [bestPosts, setBestPosts] = useState<MdxContent[]>([]);
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("Recent Posts.");

  useEffect(() => {
    const fetchPosts = async () => {
      const content = await getMdxContent();
      setPosts(content);
      setBestPosts(content.filter(post => post.best));
      
      const tags = content.reduce((acc: string[], post) => {
        const postTags = post.tags.split(',').map(tag => tag.trim());
        return [...acc, ...postTags];
      }, []);
      setUniqueTags([...new Set(tags)]);
    };
    fetchPosts();
  }, []);

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
        <div className="flex flex-col gap-3 w-full md:w-1/5">
          <h1 className="text-xl font-bold italic md:pr-5 cursor-pointer Categories">Categories.</h1>
          <ul className="flex cursor-pointer flex-col gap-2">
            <Link href={"#Recent Posts."}>
              <li className="hover:underline" onClick={() => setCurrentCategory("Recent Posts.")}>Recent Posts.</li>
            </Link>
            {uniqueTags.map((tag, index) => (
              <Link key={index} href={`#${tag}`}>
                <li className="hover:underline" onClick={() => setCurrentCategory(tag)}>
                  {tag}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-bold italic hover:underline cursor-pointer" id={currentCategory}>{currentCategory}</h1>
        <div className="grid md:grid-cols-2 gap-10 grid-cols-1">
          {posts
            .filter(post => 
              currentCategory === "Recent Posts." ? true : post.tags === currentCategory
            )
            .map((post, index) => (
              <Card key={index} content={post} />
            ))}
        </div>
      </div>
    </div>
  );
}