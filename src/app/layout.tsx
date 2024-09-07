import type { Metadata } from "next";
import Head from 'next/head';
import Script from 'next/script';
import "../Styles/styles.css";
import Navbar from "./Components/Navbar/Navbar";
import FullscreenCover from "./Components/FullscreenCover/FullscreenCover";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
export const metadata: Metadata = {
  title: "Salem's Portfolio",
  description: "Front-end Developer with 2+ years of experience in building complex web apps. Proficient in React.js, Next.js, Node.js, and MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Salem&apos;s Portfolio| Front-end Developer Portfolio</title>
        <meta name="description" content={"Front-end Developer with 2+ years of experience in building complex web apps. Proficient in React.js, Next.js, Node.js, and MongoDB"} />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"/>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className='relative no-scroll'>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MTBZKLQVS6"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${process.env.NEXT_PUBLIC_CONFIG});
          `}
        </Script>

        <FullscreenCover />
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
