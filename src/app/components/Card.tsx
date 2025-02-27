import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import type { MdxContent } from '../utils/getMdxContent';

interface CardProps {
  content?: MdxContent;
}

export default function Card({ content }: CardProps) {
  const cardContent = (
    <div className="flex w-full aspect-square rounded-3xl cursor-pointer flex-col gap-3 Card">
      <div className="relative w-full aspect-[3/2] rounded-3xl Card__imageHolder overflow-hidden" title={`${content?.description}`}>
        <Image
          className="object-cover rounded-3xl Card__image"
          src={`${content?.thumbnail}`}
          alt={content?.title || "Card image"}
          fill />
      </div>
      {content && (
        <>
          <div className="flex pl-2 pr-2 gap-3 align-center">
            <p className="text-m border-2 border-current pl-2 pr-2 pt-1 pb-1 rounded-full">{content.date}</p>
            <p className="text-m border-2 border-current pl-2 pr-2 pt-1 pb-1 rounded-full">{content.tags}</p>
          </div>
          <div className="pl-2 pr-2">
            <p className="text-2xl font-bold">{content.title}</p>
          </div>
          <div className="flex pl-2 pr-2 flex-row gap-3">
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faHeart} />
              <span>0</span>
            </div>
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faMessage} />
              <span>0</span>
            </div>
          </div>
        </>
      )}
    </div>
  );

  if (content) {
    return (
      <Link href={`/posts/${content.category}/${content.slug}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}