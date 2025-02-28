'use client';

import { useEffect, useState } from 'react';

interface HeadingInfo {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const headingInfo = elements.map((element, index) => ({
      id: element.id || `heading-${index}`,
      text: element.textContent || '',
      level: parseInt(element.tagName[1]),
    }));
    
    elements.forEach((element, index) => {
      if (!element.id) {
        element.id = `heading-${index}`;
      }
    });
    
    setHeadings(headingInfo);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-hidden break-words hidden md:block">
      <p className="font-semibold text-xl">Table Of Contents</p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={`toc-${heading.id}`}
            style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
            className={`cursor-pointer transition-all duration-200 text-sm
              prose max-w-none prose-pre:break-words ${
              activeId === heading.id 
                ? 'text-blue-500 scale-105 origin-left' 
                : 'text-gray-600 hover:text-blue-400'
            }`}
            onClick={() => handleClick(heading.id)}
          >
            {heading.text}
          </li>
        ))}
      </ul>
    </nav>
  );
}
