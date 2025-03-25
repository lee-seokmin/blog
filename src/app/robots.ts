import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.NEXT_PUBLIC_API_URL || 'https://yourwebsite.com';
  
  // URL에 프로토콜이 없으면 https://를 추가
  const formattedBaseUrl = baseUrl.startsWith('http') 
    ? baseUrl 
    : `https://${baseUrl}`;
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${formattedBaseUrl}/sitemap.xml`,
  };
} 