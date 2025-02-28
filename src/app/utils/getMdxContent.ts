'use server'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MdxContent {
  title: string;
  description: string;
  thumbnail: string;
  createAt: string;
  category: string;
  tags: string;
  slug: string;
  content: string;
  best: boolean;
}

function readMdxFilesRecursively(dirPath: string, category: string): MdxContent[] {
  const contents: MdxContent[] = [];
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      contents.push(...readMdxFilesRecursively(fullPath, category));
    } else if (item.endsWith('.mdx')) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const thumbnailPath = data.thumbnail
        ? `${path.join("/PostCover", category, data.thumbnail)}`
        : `${path.join("/PostCover", category, 'cover.jpg')}`;
      
      contents.push({
        title: data.title || 'Untitled',
        description: data.description,
        thumbnail: thumbnailPath,
        createAt: data.createAt || new Date().toISOString(),
        category: decodeURIComponent(category),
        tags: data.tags || decodeURIComponent(category),
        slug: data.slug || item.replace('.mdx', ''),
        best: data.best || false,
        content
      });
    }
  });

  return contents;
}

export async function getMdxContent(): Promise<MdxContent[]> {
  const postsDirectory = path.join(process.cwd(), 'contents');
  const contents: MdxContent[] = [];

  const categories = fs.readdirSync(postsDirectory);
  
  categories.forEach(category => {
    const categoryPath = path.join(postsDirectory, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      contents.push(...readMdxFilesRecursively(categoryPath, category));
    }
  });

  return contents;
}

