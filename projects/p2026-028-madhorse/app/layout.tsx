import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { ToasterClient } from "@/components/toaster-client";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "MADHORSE HQ",
    template: "%s | MADHORSE HQ",
  },
  description: "MADHORSE Ltd. Internal Project Management HQ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>
          {children}
          <ToasterClient />
        </Providers>
      </body>
    </html>
  );
}
