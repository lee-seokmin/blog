import { getMdxContent } from '@/app/utils/getMdxContent';
import Header from '@/app/components/header';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface Props {
  params: {
    category: string;
    slug: string;
  };
}

export default async function PostPage({ params }: Props) {
  const posts = await getMdxContent();
  const post = posts.find(
    p => p.category === params.category && p.slug === params.slug
  );

  if (!post) {
    console.log(params);
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="max-w-[900px] mx-auto p-4">
        <article className="prose dark:prose-invert max-w-none mt-8">
          <h1>{post.title}</h1>
          <MDXRemote source={post.content} />
        </article>
      </div>
    </div>
  );
}
