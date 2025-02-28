"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faCircle, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/app/context/ThemeContext';

interface HeaderProps {
  categories?: { name: string; count: number }[];
  currentCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function Header({ 
  categories = [], 
  currentCategory = "Recent Posts.", 
  onCategoryChange = () => {} 
}: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const { isDark, toggleDarkMode } = useTheme();
  const [isRotating, setIsRotating] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCategoryClick = (categoryName: string) => {
    onCategoryChange(categoryName);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed w-full top-0 z-50 transition-transform duration-300 bg-background text-foreground p-5 flex justify-between items-center ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Link href="/" className="flex">
          <p className="font-bold text-2xl italic blog-shine">
            Dev Blog.
          </p>
        </Link>
        <div className="flex gap-7 md:gap-10 items-center">
          <Link href="https://seokminfolio.netlify.app/" target="_blank" className="flex">
            <p className="hover:underline text-xl italic">
              Portfolio
            </p>
          </Link>
          {/* 데스크톱 버전의 다크모드 토글 */}
          <div className="hidden md:block">
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
          {/* 모바일 메뉴 버튼 */}
          <button className="md:hidden text-2xl" onClick={toggleDrawer}>
            <FontAwesomeIcon icon={isDrawerOpen ? faXmark : faBars} />
          </button>
        </div>
      </header>

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-2/5 bg-background text-foreground transform transition-transform duration-300 ease-in-out z-40 ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col p-5 pt-16 justify-between h-full">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold italic Categories">Categories.</h2>
            <ul className="flex flex-col gap-2">
              {categories && categories.length > 0 && categories.map((category, index) => (
                <Link 
                  href={`#${category.name}`} 
                  key={index}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <li className={`cursor-pointer hover:underline ${
                    currentCategory === category.name ? 'font-bold' : ''
                  }`}>
                    {category.name} ({category.count})
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className={`group fa-layers fa-fw fa-3x cursor-pointer self-end ${isRotating ? 'icon-rotate' : ''}`} onClick={handleToggle}>
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
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleDrawer}
        />
      )}
    </>
  );
}