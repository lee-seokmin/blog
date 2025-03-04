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
  subcategory?: string;
}

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
      const { data, content } = matter(fileContents);
      
      const thumbnailPath = data.thumbnail
        ? `${path.join("/contents", baseCategory, subPath, data.thumbnail)}`
        : `${path.join("/contents", baseCategory, 'cover.jpg')}`;
      
      contents.push({
        title: data.title || 'Untitled',
        description: data.description,
        thumbnail: thumbnailPath,
        createAt: data.createAt || new Date().toISOString(),
        category: decodeURIComponent(baseCategory),
        subcategory: subPath ? decodeURIComponent(subPath) : undefined,
        tags: data.tags || decodeURIComponent(baseCategory),
        slug: data.slug || item.replace('.mdx', ''),
        best: data.best || false,
        content
      });
    }
  });

  return contents;
}

export async function getCategoryMdxContent(category: string, subcategory?: string): Promise<MdxContent[]> {
  const postsDirectory = path.resolve(process.cwd(), 'public/contents');
  let categoryPath = path.join(postsDirectory, category);
  
  if (subcategory) {
    categoryPath = path.join(categoryPath, subcategory);
  }
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const contents = readMdxFilesRecursively(categoryPath, category, subcategory || '');
  return contents;
}

export async function getMdxContent(): Promise<MdxContent[]> {
  const postsDirectory = path.resolve(process.cwd(), 'public/contents');
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

