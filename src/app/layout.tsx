import type { Metadata } from "next";
import { Sour_Gummy } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ThemeProvider } from "@/app/context/ThemeContext";
config.autoAddCss = false

const sourgummy = Sour_Gummy({
  variable: "--font-sour-gummy",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "이석민 기술 블로그",
  description: "이석민 기술 블로그",
  icons: {
    icon: "/logo/favicon.ico",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${sourgummy.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
