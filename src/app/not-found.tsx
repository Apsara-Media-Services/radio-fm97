import { Container } from '@/components/common';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <MainLayout>
      <Container>
        <div className="flex items-center justify-center flex-col py-20">
          <h1 className="text-[7rem] md:text-[10rem] mb-5 leading-none bg-gradient-title bg-clip-text text-transparent">
            404
          </h1>
          <h1 className="text-2xl md:text-4xl mb-5 text-title">
            Page Not Found
          </h1>
          <Link
            href="/"
            className="text-lg md:text-xl underline underline-offset-2 text-title text-hover"
          >
            ត្រឡប់ទៅទំព័រដើម
          </Link>
        </div>
      </Container>
    </MainLayout>
  );
};

export default NotFoundPage;
