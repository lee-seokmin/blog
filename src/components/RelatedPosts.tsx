'use client';

import Card from './Card';
import type { MdxContent } from '@/types/MdxContent';

export default function RelatedPosts({ related_posts }: { related_posts: MdxContent[] }) {
  return (
    <div className="mt-16">
      <p className="text-2xl font-bold mb-4">관련된 포스트가 {RelatedPosts.length}개 있어요.</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {related_posts
          .slice(0, 4)
          .map((post, index) => (
            <Card key={index} content={post} />
          ))}
      </div>
    </div>
  );
}