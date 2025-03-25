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
import Comment from '@/components/Comment';
import { getPosts } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const posts = await getPosts();
  const post = posts.find((p: MdxContent) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
      description: '요청하신 포스트를 찾을 수 없습니다.'
    };
  }

  return {
    title: `${post.title} | 이석민 기술 블로그`,
    description: post.description || `${post.title}에 대한 포스트입니다.`,
    openGraph: {
      title: post.title,
      description: post.description || `${post.title}에 대한 포스트입니다.`,
      images: [post.thumbnail],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || `${post.title}에 대한 포스트입니다.`,
      images: [post.thumbnail],
    },
  };
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const posts = await getPosts();
  const post = posts.find((p: MdxContent) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Calculate categories
  const categories = Array.from(new Set(posts.map((post: MdxContent) => post.tags))).map((tags: unknown) => ({
    name: tags as string,
    count: posts.filter((post: MdxContent) => post.tags === tags).length
  }));

  return (
    <div>
      <Header categories={categories} />
      <div className="flex w-full max-w-[1000px] mx-auto p-4 md:p-4 sm:p-2 gap-8 SlideInLeft">
        <div className="flex flex-col gap-10 break-words overflow-hidden w-full md:w-4/5">
          <div className="flex flex-col md:flex-row items-end gap-5">
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
            related_posts={posts.filter((p: MdxContent) => p.tags === post.tags && p.slug != slug)} 
          />
          <Comment />
        </div>
        <div className="hidden md:block md:w-1/5">
          <TableOfContents />
        </div>
      </div>
      <Footer />
    </div>
  );
}
