import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MADHORSE Game Arena',
  description: 'A 3D multiplayer browser game by MADHORSE Ltd.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-arena-bg text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}
