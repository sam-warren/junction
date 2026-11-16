import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const description =
  "Sam Warren designs and builds web software in Victoria, BC, from user research to production.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.junction-technologies.com"),
  title: "Junction Technologies",
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Junction Technologies",
    description,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Junction Technologies",
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafb" },
    { media: "(prefers-color-scheme: dark)", color: "#111113" },
  ],
};

const themeScript = `(function(){var s;try{s=localStorage.theme}catch(e){s=null}var l=s==="light"||(!s&&window.matchMedia("(prefers-color-scheme: light)").matches);var c=document.documentElement.classList;c.toggle("light",l);c.toggle("dark",!l)})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
