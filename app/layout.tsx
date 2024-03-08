import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Image Restoration",
  icons: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Fbr%2Ficone-gratis%2Fperfil_4645949&psig=AOvVaw09DzpiHqZHPN_r40ZWUuA1&ust=1709945666177000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJiMhttps://i.pinimg.com/564x/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.jpg75G644QDFQAAAAAdAAAAABAE",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Head>
        <link rel="icon" href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Fbr%2Ficone-gratis%2Fperfil_4645949&psig=AOvVaw09DzpiHqZHPN_r40ZWUuA1&ust=1709945666177000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJiM75G644QDFQAAAAAdAAAAABAE" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
