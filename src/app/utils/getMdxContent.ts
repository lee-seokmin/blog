'use server'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MdxContent {
  title: string;
  date: string;
  category: string;
  tags: string;
  slug: string;
  content: string;
  best: boolean;
}

export async function getMdxContent(): Promise<MdxContent[]> {
  const postsDirectory = path.join(process.cwd(), 'src/app/posts');
  const contents: MdxContent[] = [];

  const categories = fs.readdirSync(postsDirectory);
  
  categories.forEach(category => {
    const categoryPath = path.join(postsDirectory, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);
      
      files.forEach(filename => {
        if (filename.endsWith('.mdx')) {
          const fullPath = path.join(categoryPath, filename);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          
          contents.push({
            title: data.title || 'Untitled',
            date: data.createAt || new Date().toISOString(),
            category: decodeURIComponent(category),
            slug: data.slug || filename.replace('.mdx', ''),
            tags: data.tags || decodeURIComponent(category),
            best: data.best || false,
            content
          });
        }
      });
    }
  });

  return contents;
}

