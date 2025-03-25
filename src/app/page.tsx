import MainLayout from "@/components/MainLayout";
import type { MdxContent } from '@/types/MdxContent';

async function getData() {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const apiUrl = new URL('/api/files', baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`).toString();
  
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const content = data.files;

  const sortedContent = content.sort((a: MdxContent, b: MdxContent) => 
    new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  const bestPosts = sortedContent.filter((post: MdxContent) => post.best);
  
  // Count posts per tag
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
