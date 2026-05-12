import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'StyleAI | Virtual Wardrobe & Outfit Recommender',
  description: 'AI-powered fashion assistant for your virtual wardrobe.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body">
        {/* FirebaseClientProvider ahora maneja internamente la inicialización en el cliente */}
        <FirebaseClientProvider>
          <main className="min-h-screen pb-24">
            {children}
          </main>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
