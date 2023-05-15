import MobileBottomMenu from '@/components/layout/MobileBottomMenu';
import { IComponentProps } from '@/types/component';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

const MainLayout = ({ children }: IComponentProps) => {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-black">{children}</main>
      <Footer />
      <MobileBottomMenu />
    </>
  );
};

export default MainLayout;
