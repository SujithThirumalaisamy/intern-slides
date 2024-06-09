import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import '@repo/ui/globals.css'
import { cn } from "@repo/ui/lib/utils";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Not Gmail",
  description: "This is not a gmail clone fr!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}` + cn(
        "min-h-screen bg-background font-sans antialiased")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
