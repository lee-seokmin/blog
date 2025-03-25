import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MdxContent } from '@/types/MdxContent';

// 서버 컴포넌트에서 직접 사용할 함수
export async function getPosts(): Promise<MdxContent[]> {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const categories = fs.readdirSync(postsDirectory);
  
  let allPosts: MdxContent[] = [];
  
  for (const category of categories) {
    const categoryPath = path.join(postsDirectory, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const posts = readMdxFilesRecursively(categoryPath, category);
      allPosts = [...allPosts, ...posts];
    }
  }
  
  // 날짜 기준으로 정렬 (최신순)
  return allPosts.sort((a, b) => 
    new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );
}

function readMdxFilesRecursively(dirPath: string, baseCategory: string, subPath: string = ''): MdxContent[] {
  // 기존 readMdxFilesRecursively 함수 구현 복사
  // src/app/api/files/route.ts에서 가져온 내용과 동일
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