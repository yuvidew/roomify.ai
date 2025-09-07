import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TanstackQueryProvider } from "@/components/providers/tanstack-query-provider";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { LoadingFallback } from "@/components/LoadingFallback";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roomify.ai – Smart Floor Plan Visualizer",
  description:
    "Upload your floor plan and let Roomify.ai instantly extract layouts and generate realistic, high-quality room images with AI-powered precision.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<LoadingFallback/>}>
          <TanstackQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </TanstackQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
