import './globals.css';
import { AppProvider } from '@/components/AppContext';
import NextNProgress from '@/components/libs/NextProgressbar';
import { ThemeProvider } from '@/components/libs/NextTheme';
import { ToastContainer } from '@/components/libs/ReactToastify';
import { METADATA } from '@/constants/app';
import { Metadata } from 'next';
import { Kantumruy_Pro } from 'next/font/google';
import Script from 'next/script';
import 'react-toastify/dist/ReactToastify.css';

const kantumruy_pro = Kantumruy_Pro({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: METADATA.title,
  description: METADATA.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={kantumruy_pro.className}>
      <body className="bg-ams-light dark:bg-zinc-700">
        <AppProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
          <ToastContainer />
          <NextNProgress color="#cf0a10" options={{ showSpinner: false }} />
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
