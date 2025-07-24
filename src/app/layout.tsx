import { AppProvider } from '@/components/AppContext';
import { Metadata } from 'next';
import { Kantumruy_Pro } from 'next/font/google';
import Script from 'next/script';
import classNames from 'classnames';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import app from '@/configs/app';

const kantumruy_pro = Kantumruy_Pro({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: app.appName,
  description: app.appDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={classNames(kantumruy_pro.className)} suppressHydrationWarning>
      <body className="bg-ams-light dark:bg-zinc-700">
        <AppProvider>{children}</AppProvider>
        <Script
          strategy="afterInteractive"
          src="https://analytic.cloud.sovichetra.com/script.js"
          data-website-id="7135a9cf-d04f-4ccf-979a-4ca2205650a8"
        />
      </body>
    </html>
  );
}
