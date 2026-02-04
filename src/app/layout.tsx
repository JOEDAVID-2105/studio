import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: "Joel David's Portfolio",
  description: 'Creative Developer & Designer',
  icons: {
    icon: 'https://cxecpvkwmuxrzkqzpgwd.supabase.co/storage/v1/object/public/webp_bucket/Whisk_226d7aa74fcf94b9b3048a44a6dd1758dr.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-background antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
