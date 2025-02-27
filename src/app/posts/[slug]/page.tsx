import { getMdxContent } from '@/app/utils/getMdxContent';
import Header from '@/app/components/header';
import { MDXRemote } from 'next-mdx-remote/rsc';
import 'github-markdown-css';
import Image from 'next/image';
import Footer from '@/app/components/footer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getMdxContent();
  const post = posts.find(p => p.slug === slug);
  
  return {
    title: post ? `${post.title} - Dev Blog` : 'Not Found',
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getMdxContent();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Header />
      <div className="flex w-full max-w-[900px] mx-auto p-4 SlideInLeft">
        <div className="markdown-body w-full">
          <div className="flex items-end gap-5">
            <h1>{post.title}</h1>
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
          <div className="prose max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
