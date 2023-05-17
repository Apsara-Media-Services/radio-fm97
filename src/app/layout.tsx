import './globals.css';
import { AppProvider } from '@/components/AppContext';
import NextNProgress from '@/components/libs/NextProgressbar';
import { ThemeProvider } from '@/components/libs/NextTheme';
import { ToastContainer } from '@/components/libs/ReactToastify';
import { METADATA } from '@/constants/app';
import { Metadata } from 'next';
import { Kantumruy_Pro } from 'next/font/google';
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
      <body className="bg-ams-light dark:bg-zinc-800">
        <AppProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
          <ToastContainer />
          <NextNProgress color="#cf0a10" options={{ showSpinner: false }} />
        </AppProvider>
      </body>
    </html>
  );
}
