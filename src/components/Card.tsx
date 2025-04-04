'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { MdxContent } from '@/types/MdxContent';

interface CardProps {
  content?: MdxContent;
  isFirst?: boolean;
  isLoading?: boolean;
}

export default function Card({ content, isFirst, isLoading = false }: CardProps) {
  if (isLoading) {
    return (
      <div className="flex w-full aspect-square rounded-3xl cursor-pointer flex-col gap-3 animate-pulse">
        <div className="relative w-full aspect-[3/2] rounded-3xl bg-gray-200 dark:bg-gray-700" />
        <div className="flex">
          <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="w-3/4 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="w-1/4 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
    );
  }

  const cardContent = (
    <div className="flex w-full aspect-square rounded-3xl cursor-pointer flex-col gap-3 Card">
      <div className="relative w-full aspect-[3/2] rounded-3xl Card__imageHolder overflow-hidden" title={`${content?.description}`}>
        <Image
          className="object-cover rounded-3xl Card__image"
          src={`${content?.thumbnail}`}
          alt={content?.title || "Card image"}
          fill
          priority={isFirst} />
      </div>
      {content && (
        <>
          <div className="flex">
            <p className="text-m border-2 border-current pl-2 pr-2 pt-1 pb-1 rounded-full">{content.tags}</p>
          </div>
          <p className="text-2xl font-bold">{content.title}</p>
          <p className="text-m">{content.createAt}</p>
        </>
      )}
    </div>
  );

  if (content) {
    return (
      <Link href={`/posts/${content.slug}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}