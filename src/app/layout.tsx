import type { Metadata } from "next";
import { Sour_Gummy } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ThemeProvider } from "@/context/ThemeContext";
import ProgressBar from "@/components/ProgressBar";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
config.autoAddCss = false

const sourgummy = Sour_Gummy({
  variable: "--font-sour-gummy",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seokmin-blog.kro.kr"),
  title: "이석민 기술 블로그",
  description: "이석민 기술 블로그",
  icons: {
    icon: "/logo/favicon.ico",
  },
  openGraph: {
    title: "이석민 기술 블로그",
    description: "이석민 기술 블로그",
    url: "https://seokmin-blog.kro.kr",
    siteName: "이석민 기술 블로그",
    locale: "ko",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "이석민 기술 블로그",
    description: "이석민 기술 블로그",
    images: "/logo/favicon.ico",
  },
  alternates: {
    canonical: "https://seokmin-blog.kro.kr",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${sourgummy.variable} antialiased`} suppressHydrationWarning>
        <ProgressBar />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
				) : null}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
