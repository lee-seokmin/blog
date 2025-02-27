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
          <div className="flex">
            <p className="text-m border-2 border-current pl-2 pr-2 pt-1 pb-1 rounded-full">{content.tags}</p>
          </div>
          <p className="text-2xl font-bold">{content.title}</p>
          <p className="text-m">{content.date}</p>
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