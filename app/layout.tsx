import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Image Future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Head>
        <link rel="icon" href="https://th.bing.com/th/id/R.f725811e5ed26253868a1db03976d00d?rik=rfyUrfzeX3Ht2w&pid=ImgRaw&r=0" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
