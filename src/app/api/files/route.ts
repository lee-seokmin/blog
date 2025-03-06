import { NextResponse } from 'next/server';
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
      const { data, content } = matter(fileContents);
      
      const thumbnailPath = data.thumbnail
        ? `${path.join("/_posts", baseCategory, subPath, data.thumbnail)}`
        : `${path.join("/_posts", baseCategory, 'cover.jpg')}`;
      
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

export async function GET() {  // Add Request parameter
  try {
    const directoryPath = path.join(process.cwd(), '_posts');
    
    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
      return NextResponse.json({ 
        files: [],
        count: 0,
        error: 'Directory not found' 
      }, { status: 404 });  // Add proper status code
    }

    const categories = fs.readdirSync(directoryPath);
    const contents: MdxContent[] = [];

    categories.forEach(category => {
      const categoryPath = path.join(directoryPath, category);
      if(fs.statSync(categoryPath).isDirectory()) {
        contents.push(...readMdxFilesRecursively(categoryPath, category));
      }
    });

    return NextResponse.json({ 
      files: contents,
      count: contents.length 
    }, { status: 200 });  // Add proper status code
    
  } catch (error) {
    console.error('Files API Error:', error);
    return NextResponse.json(
      { 
        files: [],
        count: 0,
        error: 'Failed to read files' 
      },
      { status: 500 }
    );
  }
}
