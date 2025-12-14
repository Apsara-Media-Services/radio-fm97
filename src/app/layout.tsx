import { AppProvider } from '@/components/AppContext';
import SharedPlayer from '@/components/player/SharedPlayer';
import app from '@/configs/app';
import classNames from 'classnames';
import { Metadata } from 'next';
import { Kantumruy_Pro } from 'next/font/google';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css';

const kantumruy_pro = Kantumruy_Pro({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${app.name} | ${app.tag}`,
  description: app.description,
  icons: {
    icon: app.icons.icon,
    apple: app.icons.apple,
    shortcut: app.icons.shortcut,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={classNames(kantumruy_pro.className)}
      suppressHydrationWarning
    >
      <body className="bg-ams-light dark:bg-zinc-700">
        <NextTopLoader color={app.theme.colors.primary} />
        <AppProvider>
          {children}
          <div className="fixed bottom-16 sm:bottom-0 z-10 max-w-xl md:max-w-2xl container mx-auto left-1/2 transform -translate-x-1/2 w-full">
            <div className="sm:px-5">
              <SharedPlayer />
            </div>
          </div>
        </AppProvider>
        <Script
          strategy="afterInteractive"
          src="https://analytic.cloud.sovichetra.com/script.js"
          data-website-id="7135a9cf-d04f-4ccf-979a-4ca2205650a8"
        />
      </body>
    </html>
  );
}
