"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/app/context/ThemeContext';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const { isDark, toggleDarkMode } = useTheme();
  const [isRotating, setIsRotating] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Set initial height
    setHeaderHeight(header.offsetHeight);

    // Create ResizeObserver to handle dynamic height changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeaderHeight((entry.target as HTMLElement).offsetHeight);
      }
    });

    resizeObserver.observe(header);

    // Update document padding
    document.body.style.paddingTop = `${headerHeight}px`;

    return () => {
      resizeObserver.disconnect();
      document.body.style.paddingTop = '0px';
    };
  }, [headerHeight]);

  const handleToggle = () => {
    setIsRotating(true);
    toggleDarkMode();
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-transform duration-300 bg-background text-foreground p-2 md:p-5 flex justify-between items-center ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Link href="/" className="flex">
        <p className="font-bold text-2xl italic blog-shine">
          Dev Blog.
        </p>
      </Link>
      <div className="flex gap-2 md:gap-10 items-center">
        <Link href="https://seokminfolio.netlify.app/" target="_blank" className="flex">
          <p className="hover:underline text-xl italic">
            Portfolio
          </p>
        </Link>
        <div className={`group fa-layers fa-fw fa-3x cursor-pointer ${isRotating ? 'icon-rotate' : ''}`} onClick={handleToggle}>
          <FontAwesomeIcon
            icon={faCircle}
            className="group-hover:text-tint text-background"
          />
          {isDark ? (
            <FontAwesomeIcon icon={faSun} transform="shrink-8" />
          ) : (
            <FontAwesomeIcon icon={faMoon} transform="shrink-8" />
          )}
        </div>
      </div>
    </header>
  );
}