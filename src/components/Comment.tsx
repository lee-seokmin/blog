'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from "@/context/ThemeContext";

const Comments = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', 'https://giscus.app/client.js');
    scriptElement.setAttribute('data-repo', 'lee-seokmin/blog');
    scriptElement.setAttribute('data-repo-id', 'R_kgDOOCQvBg');
    scriptElement.setAttribute('data-category', 'General');
    scriptElement.setAttribute('data-category-id', 'DIC_kwDOOCQvBs4CnwXH');
    scriptElement.setAttribute('data-mapping', 'pathname');
    scriptElement.setAttribute('data-strict', '0');
    scriptElement.setAttribute('data-reactions-enabled', '1');
    scriptElement.setAttribute('data-emit-metadata', '0');
    scriptElement.setAttribute('data-input-position', 'bottom');
    scriptElement.setAttribute('data-theme', `${isDark ? 'dark_dimmed' : 'light_protanopia'}`);
    scriptElement.setAttribute('data-lang', 'ko');
    scriptElement.setAttribute('crossorigin', 'anonymous');
    scriptElement.async = true;

    ref.current?.appendChild(scriptElement);
  }, [mounted]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (!iframe) return;
    
    const theme = isDark ? 'dark_dimmed' : 'light_protanopia';
    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    );
  }, [isDark]);

  if (!mounted) return null;

  return <div ref={ref} />;
};

export default Comments;