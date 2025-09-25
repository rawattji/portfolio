import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/gradual-blur.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rawattji.github.io/My_PortFolio'),
  title: "Aman Singh Rawat | Software Developer Portfolio",
  description: "Software Developer with hands-on internship experience at Amazon and GeoSolutions India. Proficient in Java, JavaScript, TypeScript, React.js, Node.js, PostgreSQL, MongoDB, and AWS microservices. Reduced verification overhead by 65% at Amazon, saving $80/sec.",
  keywords: "Aman Singh Rawat, Software Developer, Full Stack Developer, React, Next.js, TypeScript, Java, JavaScript, Node.js, PostgreSQL, MongoDB, AWS, Amazon Intern, Portfolio",
  authors: [{ name: "Aman Singh Rawat", url: "https://rawattji.github.io/My_PortFolio" }],
  creator: "Aman Singh Rawat",
  publisher: "Aman Singh Rawat",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Aman Singh Rawat | Software Developer Portfolio",
    description: "Software Developer with hands-on internship experience at Amazon and GeoSolutions India. Proficient in Java, JavaScript, TypeScript, React.js, Node.js, PostgreSQL, MongoDB, and AWS microservices.",
    url: "https://rawattji.github.io/My_PortFolio",
    siteName: "Aman Singh Rawat Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aman Singh Rawat - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Singh Rawat | Software Developer Portfolio",
    description: "Software Developer with hands-on internship experience at Amazon and GeoSolutions India.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://rawattji.github.io/My_PortFolio",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-olive-900 text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
