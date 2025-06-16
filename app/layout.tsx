import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/Providers";

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Calorie tracker",
  description: "Track Your Nutrition Smarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} antialiased w-full`}
      >
        <Providers>
          <div className="gradient-bg">
            <div className="gradient-blob blob-1"></div>
            <div className="gradient-blob blob-2"></div>
            <div className="gradient-blob blob-3"></div>
            <div className="gradient-blob blob-4"></div>
          </div>
          <div className="flex flex-col md:flex-row w-full">
            <Sidebar />
            {children}
            <Toaster position="top-center"  />
          </div>
        </Providers>
      </body>
    </html>
  );
}
