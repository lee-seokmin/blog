'use server'

import { join } from 'path';
import { promises as fs } from 'fs';

async function countMdxInDirectory(directory: string): Promise<number> {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    let count = 0;

    for (const entry of entries) {
      if (entry.isDirectory()) {
        count += await countMdxInDirectory(join(directory, entry.name));
      } else if (
        entry.isFile() && 
        entry.name.toLowerCase().endsWith('.mdx') && 
        !entry.name.startsWith('.')
      ) {
        count++;
      }
    }
    return count;
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return 0;
  }
}

export async function countMdxFiles(): Promise<number> {
  const postsDirectory = join(process.cwd(), 'src', 'app', 'posts');
  
  try {
    await fs.access(postsDirectory);
    return await countMdxInDirectory(postsDirectory);
  } catch {
    console.error('Posts directory does not exist:', postsDirectory);
    return 0;
  }
}
