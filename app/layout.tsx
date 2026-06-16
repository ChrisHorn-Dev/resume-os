import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chris Horn — Senior Product Engineer",
  description:
    "Senior product engineer building multi-tenant SaaS, operational platforms, and production migrations. Portfolio and architecture case studies at ChrisOS (chrisos.dev).",
  openGraph: {
    title: "Chris Horn — Senior Product Engineer",
    description:
      "Multi-tenant SaaS, operational platforms, and architecture case studies for private flagship work. Interactive portfolio at chrisos.dev.",
    type: "website",
    url: "https://chrisos.dev",
  },
  twitter: {
    card: "summary",
    title: "Chris Horn — Senior Product Engineer",
    description:
      "Senior product engineer — multi-tenant SaaS, operational systems, production migrations. Portfolio at chrisos.dev.",
  },
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "overlays-content" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var k='chrisos-theme',t='dark';try{var r=localStorage.getItem(k);if(r){var p=JSON.parse(r);var pr=p&&p.state&&p.state.preference;if(pr==='light')t='light';else if(pr==='system')t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}}catch(e){}document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
