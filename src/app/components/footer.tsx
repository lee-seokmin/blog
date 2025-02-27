import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import Tooltip from './tooltip';

export default function Footer() {
  return (
    <footer className="flex flex-col gap-5 justify-center items-center py-12 bg-background text-foreground">
      <div className="w-32 h-32 relative rounded-full overflow-hidden">
        <Image 
          className="object-cover"
          src={"/profile.jpg"}
          alt="profile"
          fill
          priority
        />
      </div>
      <p>이석민</p>
      <div className="flex gap-8">
        <Link href="https://github.com/lee-seokmin" target="_blank" className="relative cursor-pointer group">
          <span className="absolute right-0 bottom-0 inline-flex h-[8px] w-[8px] rounded-full bg-green-400 opacity-75"></span>
          <FontAwesomeIcon icon={faGithub} size="xl" />
          <Tooltip title='github' bgColor='white' textColor='black' />
        </Link>
        <Link href="https://www.instagram.com/lee_seokmin__" target="_blank" className="relative cursor-pointer group">
          <span className="absolute right-0 bottom-0 inline-flex h-[8px] w-[8px] rounded-full bg-green-400 opacity-75"></span>
          <FontAwesomeIcon icon={faInstagram} size="xl" />
          <Tooltip title='instagram' bgColor='white' textColor='black' />
        </Link>
        <Link href="mailto:dltjrals13@naver.com" className="relative cursor-pointer group">
          <span className="absolute right-0 bottom-0 inline-flex h-[8px] w-[8px] rounded-full bg-green-400 opacity-75"></span>
          <FontAwesomeIcon icon={faEnvelope} size="xl" />
          <Tooltip title='email' bgColor='white' textColor='black' />
        </Link>
      </div>
      <p>© {new Date().getFullYear()}. 이석민 all rights reserved.</p>
    </footer>
  );
}