'use server'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MdxContent {
  title: string;
  description: string;
  thumbnail: string;
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
          
          // Create absolute thumbnail path
          const thumbnailPath = data.thumbnail
            ? `${path.join("/PostCover", category, data.thumbnail)}`
            : `${path.join("/PostCover", category, 'cover.jpg')}`;
          
          contents.push({
            title: data.title || 'Untitled',
            description: data.description,
            thumbnail: thumbnailPath,
            date: data.createAt || new Date().toISOString(),
            category: decodeURIComponent(category),
            tags: data.tags || decodeURIComponent(category),
            slug: data.slug || filename.replace('.mdx', ''),
            best: data.best || false,
            content
          });
        }
      });
    }
  });

  return contents;
}

