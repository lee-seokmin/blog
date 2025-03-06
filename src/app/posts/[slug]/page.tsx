import Header from '@/components/header';
import { MDXRemote } from 'next-mdx-remote/rsc';
import 'github-markdown-css';
import Image from 'next/image';
import Footer from '@/components/footer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/TableOfContents';
import RelatedPosts from '@/components/RelatedPosts';
import type { MdxContent } from '@/types/MdxContent';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = props.params;

  // Use proper URL construction
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/files`;
  
  const response = await fetch(apiUrl, {
    next: { revalidate: 60 }
  });
  const data = await response.json();
  const post = data.files.find((p: MdxContent) => p.slug === slug);
  
  return {
    title: post ? `${post.title} - Dev Blog` : 'Not Found',
  };
}

export default async function PostPage(props: Props) {
  const { slug } = props.params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/files`;

  const response = await fetch(apiUrl, {
    next: { revalidate: 60 }
  });
  const data = await response.json();
  const post = data.files.find((p: MdxContent) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Calculate categories
  const categories = Array.from(new Set(data.files.map((post: MdxContent) => post.tags))).map((tags: unknown) => ({
    name: tags as string,
    count: data.files.filter((post: MdxContent) => post.tags === tags).length
  }));

  return (
    <div>
      <Header categories={categories} />
      <div className="flex w-full max-w-[1000px] mx-auto p-4 md:p-4 sm:p-2 gap-8 SlideInLeft">
        <div className="flex flex-col gap-5 break-words overflow-hidden w-full md:w-4/5">
          <div className="flex items-end gap-5">
            <p className="break-words text-[2em] font-semibold">{post.title}</p>
            <p>{post.createAt}</p>
          </div>
          <div className="relative mb-8 aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              className="object-cover rounded-xl"
              src={post.thumbnail}
              alt={post.title}
              fill
              priority
            />
          </div>
          <div className="markdown-body prose max-w-none prose-pre:break-words prose-img:max-w-full">
            <MDXRemote source={post.content} />
          </div>
          <RelatedPosts 
            related_posts={data.files.filter((p: MdxContent) => p.tags === post.tags && p.slug != slug)} 
          />
        </div>
        <div className="hidden md:block md:w-1/5">
          <TableOfContents />
        </div>
      </div>
      <Footer />
    </div>
  );
}
