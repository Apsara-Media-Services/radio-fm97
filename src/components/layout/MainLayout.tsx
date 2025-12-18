import MobileBottomMenu from '@/components/layout/MobileBottomMenu';
import { IComponentProps } from '@/types/component';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

const MainLayout = ({ children }: IComponentProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <div className="sticky bottom-0 z-20 max-w-4xl mx-auto">
        <MobileBottomMenu />
      </div>
    </>
  );
};

export default MainLayout;
