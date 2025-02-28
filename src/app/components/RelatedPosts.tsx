'use client';

import Card from './Card';
import { useState, useEffect } from 'react';
import { getMdxContent } from '../utils/getMdxContent';
import type { MdxContent } from '../utils/getMdxContent';

export default function RelatedPosts({ category, currentSlug }: { category: string, currentSlug: string }) {
  const [RelatedPosts, setRelatedPosts] = useState<MdxContent[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const content = await getMdxContent();
      const related_posts = content.filter(post => post.category === category && currentSlug !== post.slug);
      setRelatedPosts(related_posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="mt-16">
      <p className="text-2xl font-bold mb-4">관련된 포스트가 {RelatedPosts.length}개 있어요.</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {RelatedPosts
          .slice(0, 4)
          .map((post, index) => (
            <Card key={index} content={post} />
          ))}
      </div>
    </div>
  );
}