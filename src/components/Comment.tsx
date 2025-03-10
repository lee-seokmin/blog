'use client';

import Giscus from "@giscus/react";
import { useTheme } from "@/context/ThemeContext";

export default function Comment() {
  const { isDark } = useTheme();
  
  return (
    <>
      <Giscus
        id="comments"
        repo="lee-seokmin/blog"
        repoId="R_kgDOOCQvBg"
        category="General"
        categoryId="DIC_kwDOOCQvBs4CnwXK"
        mapping="pathname"
        term="Welcome to seokmin's blog!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={`${isDark ? 'dark_dimmed' : 'light_protanopia'}`}
        lang="ko"
      />
    </>
  )
}