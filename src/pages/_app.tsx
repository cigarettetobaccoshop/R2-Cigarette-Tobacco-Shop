import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          /* registrasi gagal, abaikan agar tidak mengganggu UX */
        });
      });
    }
  }, []);

  return (
    <CartProvider>
      <Component {...pageProps} />
      <CartDrawer />
      <WhatsAppFloat />
      <Analytics />
    </CartProvider>
  );
}
