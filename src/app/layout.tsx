import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social",
  description: "Simple social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="max-h-screen">
            <Navbar />
            <main className="py-8">
              {/* container to center the content */}
              <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                  <div className="hidden lg:col-span-3 lg:block">
                    <Sidebar />
                  </div>
                  <div className="lg:col-span-9">{children}</div>
                  <Toaster />
                </div>
              </div>
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
