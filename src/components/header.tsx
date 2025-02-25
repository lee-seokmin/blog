"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/context/ThemeProvider';

export default function Header() {
  const { isDark, toggleDarkMode } = useTheme();
  const [isRotating, setIsRotating] = useState(false);

  const handleToggle = () => {
    setIsRotating(true);
    toggleDarkMode();
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <header className="flex bg-background text-foreground p-5 justify-between items-center">
      <Link href="/" className="flex">
        <p className="font-sourgummy font-bold text-2xl italic blog-shine">
          Dev Blog.
        </p>
      </Link>
      <div className="flex gap-10 items-center">
        <Link href="https://seokminfolio.netlify.app/" target="_blank" className="flex">
          <p className="hover:underline font-sourgummy text-xl italic">
            Portfolio
          </p>
        </Link>
        <div
          className={`group fa-layers fa-fw fa-3x cursor-pointer ${isRotating ? 'icon-rotate' : ''}`}
          onClick={handleToggle}
        >
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