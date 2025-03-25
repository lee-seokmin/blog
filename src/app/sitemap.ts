import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MdxContent } from '@/types/MdxContent';

function readMdxFilesRecursively(dirPath: string, baseCategory: string, subPath: string = ''): MdxContent[] {
  const contents: MdxContent[] = [];
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const newSubPath = subPath ? path.join(subPath, item) : item;
      contents.push(...readMdxFilesRecursively(fullPath, baseCategory, newSubPath));
    } else if (item.endsWith('.mdx')) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      contents.push({
        title: data.title || 'Untitled',
        description: data.description,
        thumbnail: '',
        createAt: data.createAt || new Date().toISOString(),
        category: decodeURIComponent(baseCategory),
        subcategory: subPath ? decodeURIComponent(subPath) : undefined,
        tags: data.tags || decodeURIComponent(baseCategory),
        slug: data.slug || item.replace('.mdx', ''),
        best: data.best || false,
        content: ''
      });
    }
  });

  return contents;
}

function getAllPosts(): MdxContent[] {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const categories = fs.readdirSync(postsDirectory);
  
  let allPosts: MdxContent[] = [];
  
  categories.forEach(category => {
    const categoryPath = path.join(postsDirectory, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      allPosts = [...allPosts, ...readMdxFilesRecursively(categoryPath, category)];
    }
  });
  
  return allPosts;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
  ];
  
  const posts = getAllPosts();
  const postRoutes = posts.map((post) => {
    return {
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.createAt),
    };
  });
  
  return [...routes, ...postRoutes];
} 