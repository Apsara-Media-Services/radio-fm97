// import Player from './Player';
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
      <div className="sticky bottom-0 z-10 max-w-4xl mx-auto">
        {/* <Player /> */}
        <MobileBottomMenu />
      </div>
    </>
  );
};

export default MainLayout;
