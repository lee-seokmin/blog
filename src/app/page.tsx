import MainLayout from "@/components/MainLayout";
import type { MdxContent } from '@/types/MdxContent';
import { Metadata } from 'next';
import { getPosts } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 5).map((post: MdxContent) => post.title).join(', ');
  
  return {
    title: '이석민 기술 블로그',
    description: `최신 포스트: ${recentPosts}`,
    openGraph: {
      title: '이석민 기술 블로그',
      description: `최신 포스트: ${recentPosts}`,
      type: 'website',
    },
  };
}

export default async function Home() {
  const data = await getPosts();

  const sortedContent = data.sort((a: MdxContent, b: MdxContent) => 
    new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  const bestPosts = sortedContent.filter((post: MdxContent) => post.best);
  
  const counts: {[key: string]: number} = {};
  sortedContent.forEach((post: MdxContent) => {
    const tag = post.tags.trim();
    counts[tag] = (counts[tag] || 0) + 1;
  });
  
  const uniqueTags = Object.keys(counts);

  return (
    <MainLayout 
      posts={sortedContent}
      bestPosts={bestPosts}
      uniqueTags={uniqueTags}
      tagCounts={counts}
    />
  );
}
