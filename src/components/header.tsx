"use client";

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faCircle } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="flex bg-background text-foreground p-5 justify-between items-center">
      <Link href="/" className="flex">
        <p className="hover:underline font-sourgummy font-bold text-2xl italic">
          Blog.
        </p>
      </Link>
      <div className="flex gap-10 items-center">
        <Link href="https://seokminfolio.netlify.app/" target="_blank" className="flex">
          <p className="hover:underline font-sourgummy text-xl italic">
            Portfolio
          </p>
        </Link>
        <div className="group fa-layers fa-fw fa-3x cursor-pointer">
          <FontAwesomeIcon icon={faCircle} className="group-hover:text-tint text-background" />
          <FontAwesomeIcon icon={faMoon} transform="shrink-8" />
        </div>
      </div>
    </header>
  );
}