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
  title: "ChrisOS — Chris Horn",
  description:
    "ChrisOS is an OS-inspired portfolio for Chris Horn, a product-focused software engineer building operational SaaS, dashboards, and full-stack web applications.",
  openGraph: {
    title: "ChrisOS — Chris Horn",
    description:
      "Explore ChrisOS, an operating-system style portfolio showcasing Chris Horn's work in operational SaaS, dashboards, and full-stack web applications.",
    type: "website",
    url: "https://chrisos.dev",
  },
  twitter: {
    card: "summary",
    title: "ChrisOS — Chris Horn",
    description:
      "ChrisOS is an OS-inspired portfolio for Chris Horn, focused on operational SaaS, dashboards, and full-stack web applications.",
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
