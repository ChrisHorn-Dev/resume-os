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
  title: "Chris Horn — Resume",
  description:
    "Product-focused software engineer. Operational SaaS, dashboards, and full-stack web applications.",
  openGraph: {
    title: "Chris Horn — Resume",
    description:
      "Product-focused software engineer. Operational SaaS, dashboards, and full-stack web applications.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Chris Horn — Resume",
    description:
      "Product-focused software engineer. Operational SaaS, dashboards, and full-stack web applications.",
  },
  robots: "index, follow",
  themeColor: "#16161a",
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
